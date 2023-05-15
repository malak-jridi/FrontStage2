const Stream = require('stream-browserify');
const zlib = require('browserify-zlib');

module.exports = {
  connect: function(options, connectListener) {
    const socket = new WebSocket(options.url);
    const stream = new Stream.Duplex({
      write: function(chunk, encoding, next) {
        socket.send(chunk);
        next();
      }
    });

    socket.onopen = function(event) {
      const headers = {
        'accept-version': '1.1,1.0',
        'heart-beat': '10000,10000'
      };

      for (let key in options.headers) {
        headers[key] = options.headers[key];
      }

      const frame = {
        command: 'CONNECT',
        headers: headers
      };

      socket.send(JSON.stringify(frame));
      connectListener(null, stream);
    };

    socket.onmessage = function(event) {
      const message = event.data;
      const frame = JSON.parse(message);

      if (frame.command === 'CONNECTED') {
        return;
      }

      if (frame.command === 'MESSAGE' && frame.body) {
        stream.push(frame.body);
      }
    };

    socket.onerror = function(event) {
      connectListener(event);
    };

    socket.onclose = function(event) {
      stream.push(null);
    };

    return stream;
  },

  Socket: function(url, options) {
    this._url = url;
    this._options = options || {};
    this._socket = null;
  },

  createConnection: function(options, connectListener) {
    const socket = new WebSocket(options.url);

    socket.onopen = function(event) {
      connectListener(null, socket);
    };

    socket.onerror = function(event) {
      connectListener(event);
    };

    socket.onclose = function(event) {
      // do nothing
    };

    return socket;
  },

  // Add any other methods or logic as needed
};
