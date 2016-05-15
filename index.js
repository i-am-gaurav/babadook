/**
 * Setting up requirements.
 */
var express = require( 'express' );
var bodyParser = require( 'body-parser' );
var methodOverride = require( 'method-override' );
var errorHandler = require( 'error-handler' );
var moment = require( 'moment' );

var app = module.exports = express();

/**
 * Primary MiddleWare to log all requests.
 */
app.use( function( req, res, next ) {
    var msg = ( req.headers['x-forwarded-for'] || req.connection.remoteAddress ) + ' user from ' +
        req.headers['user-agent'] +
        ' at ' +
        moment( Date.now() ) ;

    console.log( msg );

    res.header( 'Acess-Control-Allow-Origin', '*' );
    next();
});

/**
 * Running at port 3000.
 */
app.set( 'port', 3000 );

/* App Configuration */
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( {
    extended : true
} ) );
app.use( methodOverride() );

if( 'development' === app.get( 'env' ) ) {
    app.use( errorHandler( {
        dumpExceptions : true,
        showStack : true
    } ) );
}

if( 'production' === app.get( 'env' ) ) {
    app.use( errorHandler() );
}

app.listen( app.get( 'port'), function(){
    var msgString = 'Magic Happens at port' + app.get( 'port' );
    console.info( msgString );
});
