var pmx = require('pmx');
var pm2 = require('pm2');
var moment  = require('moment');

/******************************
 *    ______ _______ ______
 *   |   __ \   |   |__    |
 *   |    __/       |    __|
 *   |___|  |__|_|__|______|
 *
 *      PM2 Module Sample
 *
 ******************************/

pmx.initModule({

    // Options related to the display style on Keymetrics
    widget: {

        // Logo displayed
        logo: 'https://app.keymetrics.io/img/logo/keymetrics-300.png',

        // Module colors
        // 0 = main element
        // 1 = secondary
        // 2 = main border
        // 3 = secondary border
        theme: ['#141A1F', '#222222', '#3ff', '#3ff'],

        // Section to show / hide
        el: {
            probes: true,
            actions: true
        },

        // Main block to show / hide
        block: {
            actions: false,
            issues: true,
            meta: true,

            // Custom metrics to put in BIG
            main_probes: ['test-probe']
        }

    }

}, function (err, conf) {

    if (err) return console.error(err.stack || err);

    console.log(conf);
});

var WORKER_INTERVAL = moment.duration(1, 'seconds').asMilliseconds();

pm2.connect(function (err) {
    if (err) return console.error(err.stack || err);
    function worker() {
        // Get process list managed by PM2
        pm2.list(function (err, apps) {
            if (err) return console.error(err.stack || err);

            // console.log(apps);

            apps.forEach(function(app) {
                // console.log(app);
                console.log(app.name, app.pm2_env.instances,app.pm2_env.exec_mode);
            });

        });
    };


    setTimeout(function () {
        setInterval(function () {
            gl_file_list = [];
            worker();
        }, WORKER_INTERVAL);
    }, (WORKER_INTERVAL - (Date.now() % WORKER_INTERVAL)));


});


