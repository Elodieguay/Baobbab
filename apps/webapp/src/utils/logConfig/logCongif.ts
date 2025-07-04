import log from 'loglevel';

export const configureLogs = (): void => {
    log.setLevel('debug');
    if (process.env.NODE_ENV == 'production') {
        log.setLevel('error');
    } else {
        log.setLevel('debug');
    }
};
// On voit les niveau plus bas  debug, info, warn et error
// log.trace('Ceci est un message de trace');
// log.debug('Ceci est un message de debug');
// log.info("Ceci est un message d'info");
// log.warn("Ceci est un message d'avertissement");
// log.error('Ceci est une erreur');
