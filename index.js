
    "use strict";


    function EtchFlatten( node ) {

        var out = [];

        out.push( node );

        if ( node.childNodes ){
            node.childNodes.forEach(function( child ) {
                out = out.concat( EtchFlatten( child ) );
            }, this );
        }
        return out;
    }


    function filterId( id, el ){
        return el.tagName && el.id === id;
    }

    function GetElementById( id ){

        if ( typeof id !== "string"){
            return undefined;
        }
        return EtchFlatten( this ).filter( filterId.bind( null, id ) )[0];
    }


    function filter1( tagname, el ){
        return el.tagName && el.tagName === tagname;
    }

    function filter2( el ){
        return el.tagName;
    }

    function GetElementsByTagName( tag ){

        if ( typeof tag !== "string"){
            return [];
        }

        tag = (""+tag).toUpperCase();

        if ( tag === "*" ){
            return  EtchFlatten( this ).filter( filter2 );
        }

        return EtchFlatten( this ).filter( filter1.bind( null,tag ) );
    }

    function Selector(){
        this.name="EtchBasicSelectorEngine";

    }

    Selector.prototype.init = function(){

    };

    Selector.prototype.document = {
        getElementById:GetElementById,
        getElementsByTagName:GetElementsByTagName
    };

    module.exports = Selector;