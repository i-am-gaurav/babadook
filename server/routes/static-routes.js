/**
 * This module will map all the static routes available in the application.
 */

var staticRouteMapper = function( app, baseDirectory ) {

    // Serving Resources.
    app.get( '/resources/*' , function( req, res ) {
        res.sendFile( baseDirectory + '/client/' + req.originalUrl );
    });

    app.get( '/', function( req, res ) {
        res.sendFile( baseDirectory + '/client/' + 'index.html' );
    });

};

module.exports = staticRouteMapper;
