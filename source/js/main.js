/**
 * @employSchema
 * @eventListeners
 * @sensibleDefaults
 * @svgSrc
 * @documentation
 * @documentationApi
 * @iconUniformNames
 * @minimizeProperties
 * @objectifyEventListeners
 * @parentElementSelector
 * @distinctEventListeners
 * @propertiesElemUnderscore
 * @propertify
 * @methodNamingConventions
 * @propertyNamingConventions
 */




/**
 * A module to handle the possible translations for the app
 */
function Translate() {

    /**
     * 
     * @property
     */
    this.language = 'el';

};




/**
 * 
 * @returns string 'el' or 'en'
 */
Translate.prototype.getValue = function() {

    return this.language;

};

/**
 * 
 * @returns {Translate}
 */
Translate.prototype.initialize = function() {

    var localStorageLanguage = localStorage.getItem( 'language' );

    if ( localStorageLanguage !== null ) {

        this.language = localStorageLanguage;

        return this;

    }

    var queryString     = window.location.search;
    var urlParams       = new URLSearchParams( queryString );
    var languageQuery   = urlParams.get( 'language' );

    if ( languageQuery !== null && ( languageQuery === 'el' || languageQuery === 'en' ) ) {

        this.language = languageQuery;

        localStorage.setItem( 'language', this.language );

        return this;       

    }

    var languageNav = navigator.language.substring( 0, 2 );

    if ( languageNav === 'el' || languageNav === 'en' ) {

        this.language = languageNav;

    } else {

        this.language = 'en';

    }

    return this;

};

/**
 * 
 * @requires dictionary
 * @param {String} text 
 * @returns {String}
 */
Translate.prototype.late = function( text ) {

    if ( this.language === 'el' ) {

        return text;

    }

    var textToSearch = text;

    var result = dictionary.find(function( obj ){

        return obj.el === textToSearch;

    });

    if ( typeof result !== 'undefined' ) {

        return result[ this.language ];

    } else {

        return textToSearch;

    }

};

/**
 * 
 * @param {Element} elem 
 */
Translate.prototype.lateTextContent = function( elem ) {

    elem.textContent = this.late( elem.getAttribute( 'data-translatetextcontent' ) );

};




/**
 * 
 * @method
 * @public
 * @returns string
 */
Translate.prototype.getLocale = function() {

    if ( this.language === 'el' ) {

        return 'el-GR';

    } else if ( this.language === 'en' ) {

        return 'en-US';

    }

};




var trans = new Translate();

trans.initialize();