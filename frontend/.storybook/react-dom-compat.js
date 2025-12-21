// Compatibility shim to provide legacy ReactDOM.render and unmountComponentAtNode
// for Storybook internals/addons that still call the old API when running
// against React 18/19 (which use react-dom/client).

const ReactDOM = require('react-dom');
let client;
try {
  client = require('react-dom/client');
} catch (err) {
  // If react-dom/client isn't present, nothing we can do.
  // Older react-dom will already have render/unmount.
  client = null;
}

if (client && (!ReactDOM.render || !ReactDOM.unmountComponentAtNode)) {
  const roots = new WeakMap();

  function render(element, container, callback) {
    let root = roots.get(container);
    if (!root) {
      root = client.createRoot(container);
      roots.set(container, root);
    }
    root.render(element);
    if (typeof callback === 'function') {
      // ensure callback runs after render
      Promise.resolve().then(callback);
    }
  }

  function unmountComponentAtNode(container) {
    const root = roots.get(container);
    if (root) {
      root.unmount();
      roots.delete(container);
      return true;
    }
    return false;
  }

  // Attach to moduleExports so require('react-dom') returns an object
  // with the legacy API for consumers that expect it.
  try {
    ReactDOM.render = ReactDOM.render || render;
    ReactDOM.unmountComponentAtNode = ReactDOM.unmountComponentAtNode || unmountComponentAtNode;
  } catch (err) {
    // ignore
  }
}
