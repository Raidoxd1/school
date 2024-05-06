class Framework {
  constructor() {
    this.routes = {};
    this.currentRoute = '';
  }

  addRoute(path, handler) {
    this.routes[path] = handler;
  }

  handleHashChange() {
    const path = window.location.hash.slice(1);
    const handler = this.routes[path];
    if (handler) {
      handler();
      this.currentRoute = path;
    } else {
      this.routes['']();
      this.currentRoute = '';
    }
  }

  handleEvent(element, eventType, handler) {
    element['on' + eventType] = handler;
  }

  handleStateChange(property, value) {
    this[property] = value;
  }

  createElement(tagName, attributes = {}, textContent = '') {
    const element = document.createElement(tagName);
    for (const attribute in attributes) {
      element.setAttribute(attribute, attributes[attribute]);
    }
    element.textContent = textContent;
    return element;
  }

  addAttributes(element, attributes) {
    for (const attribute in attributes) {
      element.setAttribute(attribute, attributes[attribute]);
    }
  }
  nestElements(parentElement, childElements) {
    childElements.forEach((child) => {
      parentElement.appendChild(child);
    });
  }
    
}

