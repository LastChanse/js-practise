class MessageService {
    send(text = '', title = false, interval = 3000) {
        new Toast({
            title: title,
            text: text,
            theme: 'default',
            autohide: true,
            interval: interval
          });
    }

    sendOnSuccess(text = '', title = false, interval = 3000) {
        new Toast({
            title: title,
            text: text,
            theme: 'success',
            autohide: true,
            interval: interval
          });
    }

    sendOnError(text = '', title = false) {
        new Toast({
            title: title,
            text: text,
            theme: 'danger',
            autohide: false
          });
    }

    sendOnWarning(text = '', title = false, interval = 3000) {
        new Toast({
            title: title,
            text: text,
            theme: 'warning',
            autohide: true,
            interval: interval
          });
    }
}