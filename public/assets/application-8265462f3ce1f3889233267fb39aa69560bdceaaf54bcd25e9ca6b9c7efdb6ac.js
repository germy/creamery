/*!
 * jQuery JavaScript Library v1.12.0
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-01-08T19:56Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var deletedIds = [];

var document = window.document;

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.12.0",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type( obj ) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {

			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {

			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( !support.ownFirst ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {

			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data ); // jscs:ignore requireDotNotation
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {

				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[ j ] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = deletedIds[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// init accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt( 0 ) === "<" &&
				selector.charAt( selector.length - 1 ) === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {

						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[ 2 ] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof root.ready !== "undefined" ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter( function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[ 0 ], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.uniqueSort( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = true;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {

	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener ||
		window.event.type === "load" ||
		document.readyState === "complete" ) {

		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// we once tried to use readyState "interactive" here,
		// but it caused issues like the one
		// discovered by ChrisS here:
		// http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );

		// If IE event model is used
		} else {

			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch ( e ) {}

			if ( top && top.doScroll ) {
				( function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {

							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll( "left" );
						} catch ( e ) {
							return window.setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				} )();
			}
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownFirst = i === "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery( function() {

	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {

		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== "undefined" ) {

		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {

			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
} );


( function() {
	var div = document.createElement( "div" );

	// Support: IE<9
	support.deleteExpando = true;
	try {
		delete div.test;
	} catch ( e ) {
		support.deleteExpando = false;
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();
var acceptData = function( elem ) {
	var noData = jQuery.noData[ ( elem.nodeName + " " ).toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute( "classid" ) === noData;
};




var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[ name ] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( ( !id || !cache[ id ] || ( !pvt && !cache[ id ].data ) ) &&
		data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {

		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {

		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split( " " );
					}
				}
			} else {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[ i ] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject( thisCache ) : !jQuery.isEmptyObject( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, undefined
	} else {
		cache[ id ] = undefined;
	}
}

jQuery.extend( {
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,

		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[ jQuery.expando ] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				jQuery.data( this, key );
			} );
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each( function() {
				jQuery.data( this, key, value );
			} ) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each( function() {
			jQuery.removeData( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object,
	// or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );


( function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {

			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== "undefined" ) {

			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

} )();
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn(
					elems[ i ],
					key,
					raw ? value : value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[ 0 ], key ) : emptyGet;
};
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );

var rleadingWhitespace = ( /^\s+/ );

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|" +
		"details|dialog|figcaption|figure|footer|header|hgroup|main|" +
		"mark|meter|nav|output|picture|progress|section|summary|template|time|video";



function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}


( function() {
	var div = document.createElement( "div" ),
		fragment = document.createDocumentFragment(),
		input = document.createElement( "input" );

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );

	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input = document.createElement( "input" );
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Cloned elements keep attachEvent handlers, we use addEventListener on IE9+
	support.noCloneEvent = !!div.addEventListener;

	// Support: IE<9
	// Since attributes and properties are the same in IE,
	// cleanData must set properties to undefined rather than use removeAttribute
	div[ jQuery.expando ] = 1;
	support.attributes = !div.getAttribute( jQuery.expando );
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {
	option: [ 1, "<select multiple='multiple'>", "</select>" ],
	legend: [ 1, "<fieldset>", "</fieldset>" ],
	area: [ 1, "<map>", "</map>" ],

	// Support: IE8
	param: [ 1, "<object>", "</object>" ],
	thead: [ 1, "<table>", "</table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
	// unless wrapped in a div with non-breaking characters in front of it.
	_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
};

// Support: IE8-IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
				undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context;
			( elem = elems[ i ] ) != null;
			i++
		) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; ( elem = elems[ i ] ) != null; i++ ) {
		jQuery._data(
			elem,
			"globalEval",
			!refElements || jQuery._data( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/,
	rtbody = /<tbody/i;

function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

function buildFragment( elems, context, scripts, selection, ignored ) {
	var j, elem, contains,
		tmp, tag, tbody, wrap,
		l = elems.length,

		// Ensure a safe fragment
		safe = createSafeFragment( context ),

		nodes = [],
		i = 0;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || safe.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;

				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Manually add leading whitespace removed by IE
				if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
					nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[ 0 ] ) );
				}

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					elem = tag === "table" && !rtbody.test( elem ) ?
						tmp.firstChild :

						// String was a bare <thead> or <tfoot>
						wrap[ 1 ] === "<table>" && !rtbody.test( elem ) ?
							tmp :
							0;

					j = elem && elem.childNodes.length;
					while ( j-- ) {
						if ( jQuery.nodeName( ( tbody = elem.childNodes[ j ] ), "tbody" ) &&
							!tbody.childNodes.length ) {

							elem.removeChild( tbody );
						}
					}
				}

				jQuery.merge( nodes, tmp.childNodes );

				// Fix #12392 for WebKit and IE > 9
				tmp.textContent = "";

				// Fix #12392 for oldIE
				while ( tmp.firstChild ) {
					tmp.removeChild( tmp.firstChild );
				}

				// Remember the top-level container for proper cleanup
				tmp = safe.lastChild;
			}
		}
	}

	// Fix #11356: Clear elements from fragment
	if ( tmp ) {
		safe.removeChild( tmp );
	}

	// Reset defaultChecked for any radios and checkboxes
	// about to be appended to the DOM in IE 6/7 (#8060)
	if ( !support.appendChecked ) {
		jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
	}

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}

			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( safe.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	tmp = null;

	return safe;
}


( function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox (lack focus(in | out) events)
	for ( i in { submit: true, change: true, focusin: true } ) {
		eventName = "on" + i;

		if ( !( support[ i ] = eventName in window ) ) {

			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" &&
					( !e || jQuery.event.triggered !== e.type ) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};

			// Add elem as a property of the handle fn to prevent a memory leak
			// with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] &&
				jQuery._data( cur, "handle" );

			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if (
				( !special._default ||
				 special._default.apply( eventPath.pop(), data ) === false
				) && acceptData( elem )
			) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {

						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Safari 6-8+
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY fromElement offsetX offsetY " +
			"pageX pageY screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ?
					original.toElement :
					fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {

						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// Guard for simulated events was moved to jQuery.event.stopPropagation function
				// since `originalEvent` should point to the original event for the
				// constancy with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event,
			// to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( !e || this.isSimulated ) {
			return;
		}

		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

// IE submit delegation
if ( !support.submit ) {

	jQuery.event.special.submit = {
		setup: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {

				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ?

						// Support: IE <=8
						// We use jQuery.prop instead of elem.form
						// to allow fixing the IE8 delegated submit issue (gh-2332)
						// by 3rd party polyfills/workarounds.
						jQuery.prop( elem, "form" ) :
						undefined;

				if ( form && !jQuery._data( form, "submit" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submitBubble = true;
					} );
					jQuery._data( form, "submit", true );
				}
			} );

			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {

			// If form was submitted by the user, bubble the event up the tree
			if ( event._submitBubble ) {
				delete event._submitBubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event );
				}
			}
		},

		teardown: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.change ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {

				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._justChanged = true;
						}
					} );
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._justChanged && !event.isTrigger ) {
							this._justChanged = false;
						}

						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event );
					} );
				}
				return false;
			}

			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "change" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event );
						}
					} );
					jQuery._data( elem, "change", true );
				}
			} );
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger ||
				( elem.type !== "radio" && elem.type !== "checkbox" ) ) {

				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	} );
}

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	},

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp( "<(?:" + nodeNames + ")[\\s/>]", "i" ),
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement( "div" ) );

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( jQuery.find.attr( elem, "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}
	return elem;
}

function cloneCopyEvent( src, dest ) {
	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim( dest.innerHTML ) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {

		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var first, node, hasScripts,
		scripts, doc, fragment,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!jQuery._data( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval(
								( node.text || node.textContent || node.innerHTML || "" )
									.replace( rcleanScript, "" )
							);
						}
					}
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		elems = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = elems[ i ] ) != null; i++ ) {

		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc( elem ) ||
			!rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {

			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( ( !support.noCloneEvent || !support.noCloneChecked ) &&
				( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; ( node = srcElements[ i ] ) != null; ++i ) {

				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[ i ] ) {
					fixCloneNodeIssues( node, destElements[ i ] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; ( node = srcElements[ i ] ) != null; i++ ) {
					cloneCopyEvent( node, destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems, /* internal */ forceAcceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			attributes = support.attributes,
			special = jQuery.event.special;

		for ( ; ( elem = elems[ i ] ) != null; i++ ) {
			if ( forceAcceptData || acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// Support: IE<9
						// IE does not allow us to delete expando properties from nodes
						// IE creates expando attributes along with the property
						// IE does not have a removeAttribute function on Document nodes
						if ( !attributes && typeof elem.removeAttribute !== "undefined" ) {
							elem.removeAttribute( internalKey );

						// Webkit & Blink performance suffers when deleting properties
						// from DOM nodes, so set to undefined instead
						// https://code.google.com/p/chromium/issues/detail?id=378607
						} else {
							elem[ internalKey ] = undefined;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append(
					( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value )
				);
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {

			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {

						// Remove element nodes and prevent memory leaks
						elem = this[ i ] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, pixelMarginRightVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	div.style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = div.style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!div.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	div.innerHTML = "";
	container.appendChild( div );

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = div.style.boxSizing === "" || div.style.MozBoxSizing === "" ||
		div.style.WebkitBoxSizing === "";

	jQuery.extend( support, {
		reliableHiddenOffsets: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {

			// We're checking for pixelPositionVal here instead of boxSizingReliableVal
			// since that compresses better and they're computed together anyway.
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {

			// Support: Android 2.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		},

		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		}
	} );

	function computeStyleTests() {
		var contents, divStyle,
			documentElement = document.documentElement;

		// Setup
		documentElement.appendChild( container );

		div.style.cssText =

			// Support: Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = false;
		pixelMarginRightVal = reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			divStyle = window.getComputedStyle( div );
			pixelPositionVal = ( divStyle || {} ).top !== "1%";
			reliableMarginLeftVal = ( divStyle || {} ).marginLeft === "2px";
			boxSizingReliableVal = ( divStyle || { width: "4px" } ).width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = ( divStyle || { marginRight: "4px" } ).marginRight === "4px";

			// Support: Android 2.3 only
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE6-8
		// First check that getClientRects works as expected
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.style.display = "none";
		reliableHiddenOffsetsVal = div.getClientRects().length === 0;
		if ( reliableHiddenOffsetsVal ) {
			div.style.display = "";
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			contents = div.getElementsByTagName( "td" );
			contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			if ( reliableHiddenOffsetsVal ) {
				contents[ 0 ].style.display = "";
				contents[ 1 ].style.display = "none";
				reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			}
		}

		// Teardown
		documentElement.removeChild( container );
	}

} )();


var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value"
			// instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values,
			// but width seems to be reliably pixels
			// this is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are
		// proportional to the parent element instead
		// and we can't measure the parent instead because it
		// might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/i,

	// swappable if display is none or starts with table except
	// "table", "table-cell", or "table-caption"
	// see here for display values:
	// https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt( 0 ).toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] =
					jQuery._data( elem, "olddisplay", defaultDisplay( elem.nodeName ) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Support: IE11 only
	// In IE 11 fullscreen elements inside of an iframe have
	// 100x too small dimensions (gh-1764).
	if ( document.msFullscreenElement && window.top !== window ) {

		// Support: IE11 only
		// Running getBoundingClientRect on a disconnected node
		// in IE throws an error.
		if ( elem.getClientRects().length ) {
			val = Math.round( elem.getBoundingClientRect()[ name ] * 100 );
		}
	}

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {

		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight
			// (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch ( e ) {}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing &&
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
} );

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {

			// IE uses filters for opacity
			return ropacity.test( ( computed && elem.currentStyle ?
				elem.currentStyle.filter :
				elem.style.filter ) || "" ) ?
					( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
					computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist -
			// attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule
				// or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return (
				parseFloat( curCSS( elem, "marginLeft" ) ) ||

				// Support: IE<=11+
				// Running getBoundingClientRect on a disconnected node in IE throws an error
				// Support: IE8 only
				// getClientRects() errors on disconnected elems
				( jQuery.contains( elem.ownerDocument, elem ) ?
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} ) :
					0
				)
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var a,
		input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Support: Windows Web Apps (WWA)
	// `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "checkbox" );
	div.appendChild( input );

	a = div.getElementsByTagName( "a" )[ 0 ];

	// First batch of tests.
	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class.
	// If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute( "style" ) );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute( "href" ) === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement( "form" ).enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
} )();


var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if (
					hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// handle most common string cases
					ret.replace( rreturn, "" ) :

					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled :
								option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {

					// Setting the type on a radio button after the value resets the value in IE8-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;

					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {

			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		} else {

			// Support: IE<9
			// Use defaultChecked and defaultSelected for oldIE
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} else {
		attrHandle[ name ] = function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
	}
} );

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {

				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {

				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {

			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					( ret = elem.ownerDocument.createAttribute( name ) )
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return ( ret = elem.getAttributeNode( name ) ) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each( [ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	} );
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {

			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case sensitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each( function() {

			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch ( e ) {}
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each( [ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	} );
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return jQuery.attr( elem, "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// store className if set
					jQuery._data( this, "__className__", className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				jQuery.attr( this, "class",
					className || value === false ?
					"" :
					jQuery._data( this, "__className__" ) || ""
				);
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




// Return jQuery for attributes-only inclusion


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );


var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {

	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {

		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	} ) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new window.DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new window.ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch ( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,

	// IE leaves an \r character at EOL
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) { // jscs:ignore requireDotNotation
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var

			// Cross-domain detection vars
			parts,

			// Loop variable
			i,

			// URL without anti-cache param
			cacheURL,

			// Response headers as string
			responseHeadersString,

			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,

			// Response headers
			responseHeaders,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" )
			.replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			var wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


function getDisplay( elem ) {
	return elem.style && elem.style.display || jQuery.css( elem, "display" );
}

function filterHidden( elem ) {
	while ( elem && elem.nodeType === 1 ) {
		if ( getDisplay( elem ) === "none" || elem.type === "hidden" ) {
			return true;
		}
		elem = elem.parentNode;
	}
	return false;
}

jQuery.expr.filters.hidden = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return support.reliableHiddenOffsets() ?
		( elem.offsetWidth <= 0 && elem.offsetHeight <= 0 &&
			!elem.getClientRects().length ) :
			filterHidden( elem );
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?

	// Support: IE6-IE8
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		if ( this.isLocal ) {
			return createActiveXHR();
		}

		// Support: IE 9-11
		// IE seems to error on cross-domain PATCH requests when ActiveX XHR
		// is used. In IE 9+ always use the native XHR.
		// Note: this condition won't catch Edge as it doesn't define
		// document.documentMode but it also doesn't support ActiveX so it won't
		// reach this code.
		if ( document.documentMode > 8 ) {
			return createStandardXHR();
		}

		// Support: IE<9
		// oldIE XHR does not support non-RFC2616 methods (#13240)
		// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
		// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
		// Although this check for six methods instead of eight
		// since IE also does not support "trace" and "connect"
		return /^(get|post|head|put|delete|options)$/i.test( this.type ) &&
			createStandardXHR() || createActiveXHR();
	} :

	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	} );
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport( function( options ) {

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {

						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch ( e ) {

									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;

								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					// Do send the request
					// `xhr.send` may raise an exception, but it will be
					// handled in jQuery.ajax (so no try/catch here)
					if ( !options.async ) {

						// If we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {

						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						window.setTimeout( callback );
					} else {

						// Register the callback, but delay it in case `xhr.send` throws
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	} );
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch ( e ) {}
}




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery( "head" )[ 0 ] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8+
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	if ( !document.implementation.createHTMLDocument ) {
		return false;
	}
	var doc = document.implementation.createHTMLDocument( "" );
	doc.body.innerHTML = "<form></form><form></form>";
	return doc.body.childNodes.length === 2;
} )();


// data: string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	// document.implementation stops scripts or inline event handlers from
	// being executed immediately
	context = context || ( support.createHTMLDocument ?
		document.implementation.createHTMLDocument( "" ) :
		document );

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( self, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};





/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray( "auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left
		// is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== "undefined" ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			// Subtract offsetParent scroll positions
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true ) -
				offsetParent.scrollTop();
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true ) -
				offsetParent.scrollLeft();
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? ( prop in win ) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
	function( defaultExtra, funcName ) {

		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only,
					// but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]), textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // Make sure that all forms have actual up-to-date tokens (cached forms contain old ones)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.data('ujs:submit-button-formmethod') || element.attr('method');
          url = element.data('ujs:submit-button-formaction') || element.attr('action');
          data = $(element[0].elements).serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
          element.data('ujs:submit-button-formmethod', null);
          element.data('ujs:submit-button-formaction', null);
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element[method]());
        element[method](replacement);
      }

      element.prop('disabled', true);
      element.data('ujs:disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with') !== undefined) {
        element[method](element.data('ujs:enable-with'));
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.prop('disabled', false);
      element.removeData('ujs:disabled');
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var inputs = $(), input, valueToCheck,
          selector = specifiedSelector || 'input,textarea',
          allInputs = form.find(selector);

      allInputs.each(function() {
        input = $(this);
        valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
        if (valueToCheck === nonBlank) {

          // Don't count unchecked required radio if other radio with same name is checked
          if (input.is('input[type=radio]') && allInputs.filter('input[type=radio]:checked[name="' + input.attr('name') + '"]').length) {
            return true; // Skip to next input
          }

          inputs = inputs.add(input);
        }
      });
      return inputs.length ? inputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  Replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element.html()); // store enabled state
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
      element.data('ujs:disabled', true);
    },

    // Restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
      element.removeData('ujs:disabled');
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.delegate(rails.linkDisableSelector, 'ajax:complete', function() {
        rails.enableElement($(this));
    });

    $document.delegate(rails.buttonDisableSelector, 'ajax:complete', function() {
        rails.enableFormElement($(this));
    });

    $document.delegate(rails.linkClickSelector, 'click.rails', function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // Response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.delegate(rails.buttonClickSelector, 'click.rails', function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // Response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.delegate(rails.inputChangeSelector, 'change.rails', function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.delegate(rails.formSubmitSelector, 'submit.rails', function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // Skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        if (form.data('ujs:formnovalidate-button') === undefined) {
          blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
          if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
            return rails.stopEverything(e);
          }
        } else {
          // Clear the formnovalidate in case the next button click is not on a formnovalidate button
          // Not strictly necessary to do here, since it is also reset on each button click, but just to be certain
          form.data('ujs:formnovalidate-button', undefined);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // Slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // Re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // Slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.delegate(rails.formInputClickSelector, 'click.rails', function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // Register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      var form = button.closest('form');
      if (form.length === 0) {
        form = $('#' + button.attr('form'));
      }
      form.data('ujs:submit-button', data);

      // Save attributes from button
      form.data('ujs:formnovalidate-button', button.attr('formnovalidate'));
      form.data('ujs:submit-button-formaction', button.attr('formaction'));
      form.data('ujs:submit-button-formmethod', button.attr('formmethod'));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:send.rails', function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:complete.rails', function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
!function(t){"use strict";function e(t){if(void 0===Function.prototype.name){var e=/function\s([^(]{1,})\(/,i=e.exec(t.toString());return i&&i.length>1?i[1].trim():""}return void 0===t.prototype?t.constructor.name:t.prototype.constructor.name}function i(t){return/true/.test(t)?!0:/false/.test(t)?!1:isNaN(1*t)?t:parseFloat(t)}function n(t){return t.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()}var s="6.1.1",o={version:s,_plugins:{},_uuids:[],_activePlugins:{},rtl:function(){return"rtl"===t("html").attr("dir")},plugin:function(t,i){var s=i||e(t),o=n(s);this._plugins[o]=this[s]=t},registerPlugin:function(t,i){var s=i?n(i):e(t.constructor).toLowerCase();t.uuid=this.GetYoDigits(6,s),t.$element.attr("data-"+s)||t.$element.attr("data-"+s,t.uuid),t.$element.data("zfPlugin")||t.$element.data("zfPlugin",t),t.$element.trigger("init.zf."+s),this._uuids.push(t.uuid)},unregisterPlugin:function(t){var i=n(e(t.$element.data("zfPlugin").constructor));this._uuids.splice(this._uuids.indexOf(t.uuid),1),t.$element.removeAttr("data-"+i).removeData("zfPlugin").trigger("destroyed.zf."+i);for(var s in t)t[s]=null},reInit:function(e){var i=e instanceof t;try{if(i)e.each(function(){t(this).data("zfPlugin")._init()});else{var n=typeof e,s=this,o={object:function(e){e.forEach(function(e){t("[data-"+e+"]").foundation("_init")})},string:function(){t("[data-"+e+"]").foundation("_init")},undefined:function(){this.object(Object.keys(s._plugins))}};o[n](e)}}catch(a){console.error(a)}finally{return e}},GetYoDigits:function(t,e){return t=t||6,Math.round(Math.pow(36,t+1)-Math.random()*Math.pow(36,t)).toString(36).slice(1)+(e?"-"+e:"")},reflow:function(e,n){"undefined"==typeof n?n=Object.keys(this._plugins):"string"==typeof n&&(n=[n]);var s=this;t.each(n,function(n,o){var a=s._plugins[o],r=t(e).find("[data-"+o+"]").addBack("[data-"+o+"]");r.each(function(){var e=t(this),n={};if(e.data("zfPlugin"))return void console.warn("Tried to initialize "+o+" on an element that already has a Foundation plugin.");if(e.attr("data-options")){e.attr("data-options").split(";").forEach(function(t,e){var s=t.split(":").map(function(t){return t.trim()});s[0]&&(n[s[0]]=i(s[1]))})}try{e.data("zfPlugin",new a(t(this),n))}catch(s){console.error(s)}finally{return}})})},getFnName:e,transitionend:function(t){var e,i={transition:"transitionend",WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"otransitionend"},n=document.createElement("div");for(var s in i)"undefined"!=typeof n.style[s]&&(e=i[s]);return e?e:(e=setTimeout(function(){t.triggerHandler("transitionend",[t])},1),"transitionend")}};o.util={throttle:function(t,e){var i=null;return function(){var n=this,s=arguments;null===i&&(i=setTimeout(function(){t.apply(n,s),i=null},e))}}};var a=function(i){var n=typeof i,s=t("meta.foundation-mq"),a=t(".no-js");if(s.length||t('<meta class="foundation-mq">').appendTo(document.head),a.length&&a.removeClass("no-js"),"undefined"===n)o.MediaQuery._init(),o.reflow(this);else{if("string"!==n)throw new TypeError("We're sorry, '"+n+"' is not a valid parameter. You must use a string representing the method you wish to invoke.");var r=Array.prototype.slice.call(arguments,1),l=this.data("zfPlugin");if(void 0===l||void 0===l[i])throw new ReferenceError("We're sorry, '"+i+"' is not an available method for "+(l?e(l):"this element")+".");1===this.length?l[i].apply(l,r):this.each(function(e,n){l[i].apply(t(n).data("zfPlugin"),r)})}return this};window.Foundation=o,t.fn.foundation=a,function(){Date.now&&window.Date.now||(window.Date.now=Date.now=function(){return(new Date).getTime()});for(var t=["webkit","moz"],e=0;e<t.length&&!window.requestAnimationFrame;++e){var i=t[e];window.requestAnimationFrame=window[i+"RequestAnimationFrame"],window.cancelAnimationFrame=window[i+"CancelAnimationFrame"]||window[i+"CancelRequestAnimationFrame"]}if(/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent)||!window.requestAnimationFrame||!window.cancelAnimationFrame){var n=0;window.requestAnimationFrame=function(t){var e=Date.now(),i=Math.max(n+16,e);return setTimeout(function(){t(n=i)},i-e)},window.cancelAnimationFrame=clearTimeout}window.performance&&window.performance.now||(window.performance={start:Date.now(),now:function(){return Date.now()-this.start}})}(),Function.prototype.bind||(Function.prototype.bind=function(t){if("function"!=typeof this)throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var e=Array.prototype.slice.call(arguments,1),i=this,n=function(){},s=function(){return i.apply(this instanceof n?this:t,e.concat(Array.prototype.slice.call(arguments)))};return this.prototype&&(n.prototype=this.prototype),s.prototype=new n,s})}(jQuery),!function(t,e){var i=function(t,e,i,s){var o,a,r,l,d=n(t);if(e){var h=n(e);a=d.offset.top+d.height<=h.height+h.offset.top,o=d.offset.top>=h.offset.top,r=d.offset.left>=h.offset.left,l=d.offset.left+d.width<=h.width}else a=d.offset.top+d.height<=d.windowDims.height+d.windowDims.offset.top,o=d.offset.top>=d.windowDims.offset.top,r=d.offset.left>=d.windowDims.offset.left,l=d.offset.left+d.width<=d.windowDims.width;var u=[a,o,r,l];return i?r===l==!0:s?o===a==!0:-1===u.indexOf(!1)},n=function(t,i){if(t=t.length?t[0]:t,t===e||t===document)throw new Error("I'm sorry, Dave. I'm afraid I can't do that.");var n=t.getBoundingClientRect(),s=t.parentNode.getBoundingClientRect(),o=document.body.getBoundingClientRect(),a=e.pageYOffset,r=e.pageXOffset;return{width:n.width,height:n.height,offset:{top:n.top+a,left:n.left+r},parentDims:{width:s.width,height:s.height,offset:{top:s.top+a,left:s.left+r}},windowDims:{width:o.width,height:o.height,offset:{top:a,left:r}}}},s=function(t,e,i,s,o,a){var r=n(t),l=e?n(e):null;switch(i){case"top":return{left:l.offset.left,top:l.offset.top-(r.height+s)};case"left":return{left:l.offset.left-(r.width+o),top:l.offset.top};case"right":return{left:l.offset.left+l.width+o,top:l.offset.top};case"center top":return{left:l.offset.left+l.width/2-r.width/2,top:l.offset.top-(r.height+s)};case"center bottom":return{left:a?o:l.offset.left+l.width/2-r.width/2,top:l.offset.top+l.height+s};case"center left":return{left:l.offset.left-(r.width+o),top:l.offset.top+l.height/2-r.height/2};case"center right":return{left:l.offset.left+l.width+o+1,top:l.offset.top+l.height/2-r.height/2};case"center":return{left:r.windowDims.offset.left+r.windowDims.width/2-r.width/2,top:r.windowDims.offset.top+r.windowDims.height/2-r.height/2};case"reveal":return{left:(r.windowDims.width-r.width)/2,top:r.windowDims.offset.top+s};case"reveal full":return{left:r.windowDims.offset.left,top:r.windowDims.offset.top};default:return{left:l.offset.left,top:l.offset.top+l.height+s}}};t.Box={ImNotTouchingYou:i,GetDimensions:n,GetOffsets:s}}(window.Foundation,window),!function(t,e){"use strict";e.Keyboard={};var i={9:"TAB",13:"ENTER",27:"ESCAPE",32:"SPACE",37:"ARROW_LEFT",38:"ARROW_UP",39:"ARROW_RIGHT",40:"ARROW_DOWN"},n=function(t){var e={};for(var i in t)e[t[i]]=t[i];return e}(i);e.Keyboard.keys=n;var s=function(t){var e=i[t.which||t.keyCode]||String.fromCharCode(t.which).toUpperCase();return t.shiftKey&&(e="SHIFT_"+e),t.ctrlKey&&(e="CTRL_"+e),t.altKey&&(e="ALT_"+e),e};e.Keyboard.parseKey=s;var o={},a=function(i,n,a){var r,l,d,h=o[n],u=s(i);return h?(r="undefined"==typeof h.ltr?h:e.rtl()?t.extend({},h.ltr,h.rtl):t.extend({},h.rtl,h.ltr),l=r[u],d=a[l],void(d&&"function"==typeof d?(d.apply(),(a.handled||"function"==typeof a.handled)&&a.handled.apply()):(a.unhandled||"function"==typeof a.unhandled)&&a.unhandled.apply())):console.warn("Component not defined!")};e.Keyboard.handleKey=a;var r=function(e){return e.find("a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]").filter(function(){return!t(this).is(":visible")||t(this).attr("tabindex")<0?!1:!0})};e.Keyboard.findFocusable=r;var l=function(t,e){o[t]=e};e.Keyboard.register=l}(jQuery,window.Foundation),!function(t,e){function i(t){var e={};return"string"!=typeof t?e:(t=t.trim().slice(1,-1))?e=t.split("&").reduce(function(t,e){var i=e.replace(/\+/g," ").split("="),n=i[0],s=i[1];return n=decodeURIComponent(n),s=void 0===s?null:decodeURIComponent(s),t.hasOwnProperty(n)?Array.isArray(t[n])?t[n].push(s):t[n]=[t[n],s]:t[n]=s,t},{}):e}var n={queries:[],current:"",atLeast:function(t){var e=this.get(t);return e?window.matchMedia(e).matches:!1},get:function(t){for(var e in this.queries){var i=this.queries[e];if(t===i.name)return i.value}return null},_init:function(){var e,n=this,s=t(".foundation-mq").css("font-family");e=i(s);for(var o in e)n.queries.push({name:o,value:"only screen and (min-width: "+e[o]+")"});this.current=this._getCurrentSize(),this._watcher()},_getCurrentSize:function(){var t;for(var e in this.queries){var i=this.queries[e];window.matchMedia(i.value).matches&&(t=i)}return"object"==typeof t?t.name:t},_watcher:function(){var e=this;t(window).on("resize.zf.mediaquery",function(){var i=e._getCurrentSize();i!==e.current&&(t(window).trigger("changed.zf.mediaquery",[i,e.current]),e.current=i)})}};e.MediaQuery=n,window.matchMedia||(window.matchMedia=function(){"use strict";var t=window.styleMedia||window.media;if(!t){var e=document.createElement("style"),i=document.getElementsByTagName("script")[0],n=null;e.type="text/css",e.id="matchmediajs-test",i.parentNode.insertBefore(e,i),n="getComputedStyle"in window&&window.getComputedStyle(e,null)||e.currentStyle,t={matchMedium:function(t){var i="@media "+t+"{ #matchmediajs-test { width: 1px; } }";return e.styleSheet?e.styleSheet.cssText=i:e.textContent=i,"1px"===n.width}}}return function(e){return{matches:t.matchMedium(e||"all"),media:e||"all"}}}())}(jQuery,Foundation),!function(t,e){function i(i,o,a,r){function l(){i||o.hide(),d(),r&&r.apply(o)}function d(){o[0].style.transitionDuration=0,o.removeClass(h+" "+u+" "+a)}if(o=t(o).eq(0),o.length){var h=i?n[0]:n[1],u=i?s[0]:s[1];d(),o.addClass(a).css("transition","none"),requestAnimationFrame(function(){o.addClass(h),i&&o.show()}),requestAnimationFrame(function(){o[0].offsetWidth,o.css("transition",""),o.addClass(u)}),o.one(e.transitionend(o),l)}}var n=["mui-enter","mui-leave"],s=["mui-enter-active","mui-leave-active"],o={animateIn:function(t,e,n){i(!0,t,e,n)},animateOut:function(t,e,n){i(!1,t,e,n)}},a=function(t,e,i){function n(r){a||(a=window.performance.now()),o=r-a,i.apply(e),t>o?s=window.requestAnimationFrame(n,e):(window.cancelAnimationFrame(s),e.trigger("finished.zf.animate",[e]).triggerHandler("finished.zf.animate",[e]))}var s,o,a=null;s=window.requestAnimationFrame(n)};e.Move=a,e.Motion=o}(jQuery,Foundation),!function(t,e){"use strict";e.Nest={Feather:function(e,i){e.attr("role","menubar"),i=i||"zf";var n=e.find("li").attr({role:"menuitem"}),s="is-"+i+"-submenu",o=s+"-item",a="is-"+i+"-submenu-parent";e.find("a:first").attr("tabindex",0),n.each(function(){var e=t(this),i=e.children("ul");i.length&&(e.addClass("has-submenu "+a).attr({"aria-haspopup":!0,"aria-selected":!1,"aria-expanded":!1,"aria-label":e.children("a:first").text()}),i.addClass("submenu "+s).attr({"data-submenu":"","aria-hidden":!0,role:"menu"})),e.parent("[data-submenu]").length&&e.addClass("is-submenu-item "+o)})},Burn:function(t,e){var i=(t.find("li").removeAttr("tabindex"),"is-"+e+"-submenu"),n=i+"-item",s="is-"+e+"-submenu-parent";t.find("*").removeClass(i+" "+n+" "+s+" has-submenu is-submenu-item submenu is-active").removeAttr("data-submenu").css("display","")}}}(jQuery,window.Foundation),!function(t,e){"use strict";var i=function(t,e,i){var n,s,o=this,a=e.duration,r=Object.keys(t.data())[0]||"timer",l=-1;this.restart=function(){l=-1,clearTimeout(s),this.start()},this.start=function(){clearTimeout(s),l=0>=l?a:l,t.data("paused",!1),n=Date.now(),s=setTimeout(function(){e.infinite&&o.restart(),i()},l),t.trigger("timerstart.zf."+r)},this.pause=function(){clearTimeout(s),t.data("paused",!0);var e=Date.now();l-=e-n,t.trigger("timerpaused.zf."+r)}},n=function(e,i){var n=e.length;0===n&&i();var s=function(){n--,0===n&&i()};e.each(function(){this.complete?s():"undefined"!=typeof this.naturalWidth&&this.naturalWidth>0?s():t(this).one("load",function(){s()})})};e.Timer=i,e.onImagesLoaded=n}(jQuery,window.Foundation),function(t){function e(){this.removeEventListener("touchmove",i),this.removeEventListener("touchend",e),d=!1}function i(i){if(t.spotSwipe.preventDefault&&i.preventDefault(),d){var n,s=i.touches[0].pageX,a=(i.touches[0].pageY,o-s);l=(new Date).getTime()-r,Math.abs(a)>=t.spotSwipe.moveThreshold&&l<=t.spotSwipe.timeThreshold&&(n=a>0?"left":"right"),n&&(i.preventDefault(),e.call(this),t(this).trigger("swipe",n).trigger("swipe"+n))}}function n(t){1==t.touches.length&&(o=t.touches[0].pageX,a=t.touches[0].pageY,d=!0,r=(new Date).getTime(),this.addEventListener("touchmove",i,!1),this.addEventListener("touchend",e,!1))}function s(){this.addEventListener&&this.addEventListener("touchstart",n,!1)}t.spotSwipe={version:"1.0.0",enabled:"ontouchstart"in document.documentElement,preventDefault:!1,moveThreshold:75,timeThreshold:200};var o,a,r,l,d=!1;t.event.special.swipe={setup:s},t.each(["left","up","down","right"],function(){t.event.special["swipe"+this]={setup:function(){t(this).on("swipe",t.noop)}}})}(jQuery),!function(t){t.fn.addTouch=function(){this.each(function(i,n){t(n).bind("touchstart touchmove touchend touchcancel",function(){e(event)})});var e=function(t){var e=t.changedTouches,i=e[0],n={touchstart:"mousedown",touchmove:"mousemove",touchend:"mouseup"},s=n[t.type],o=document.createEvent("MouseEvent");o.initMouseEvent(s,!0,!0,window,1,i.screenX,i.screenY,i.clientX,i.clientY,!1,!1,!1,!1,0,null),i.target.dispatchEvent(o)}}}(jQuery),!function(t,e){"use strict";e(document).on("click.zf.trigger","[data-open]",function(){var t=e(this).data("open");e("#"+t).triggerHandler("open.zf.trigger",[e(this)])}),e(document).on("click.zf.trigger","[data-close]",function(){var t=e(this).data("close");t?e("#"+t).triggerHandler("close.zf.trigger",[e(this)]):e(this).trigger("close.zf.trigger")}),e(document).on("click.zf.trigger","[data-toggle]",function(){var t=e(this).data("toggle");e("#"+t).triggerHandler("toggle.zf.trigger",[e(this)])}),e(document).on("close.zf.trigger","[data-closable]",function(){var i=e(this).data("closable")||"fade-out";t.Motion?t.Motion.animateOut(e(this),i,function(){e(this).trigger("closed.zf")}):e(this).fadeOut().trigger("closed.zf")});var i=function(){for(var t=["WebKit","Moz","O","Ms",""],e=0;e<t.length;e++)if(t[e]+"MutationObserver"in window)return window[t[e]+"MutationObserver"];return!1}(),n=function(){r(),o(),a(),s()};e(window).load(function(){n()});var s=function(t){var i=e("[data-yeti-box]"),n=["dropdown","tooltip","reveal"];if(t&&("string"==typeof t?n.push(t):"object"==typeof t&&"string"==typeof t[0]?n.concat(t):console.error("Plugin names must be strings")),i.length){var s=n.map(function(t){return"closeme.zf."+t}).join(" ");e(window).off(s).on(s,function(t,i){var n=t.namespace.split(".")[0],s=e("[data-"+n+"]").not('[data-yeti-box="'+i+'"]');s.each(function(){var t=e(this);t.triggerHandler("close.zf.trigger",[t])})})}},o=function(t){var n,s=e("[data-resize]");s.length&&e(window).off("resize.zf.trigger").on("resize.zf.trigger",function(o){n&&clearTimeout(n),n=setTimeout(function(){i||s.each(function(){e(this).triggerHandler("resizeme.zf.trigger")}),s.attr("data-events","resize")},t||10)})},a=function(t){var n,s=e("[data-scroll]");s.length&&e(window).off("scroll.zf.trigger").on("scroll.zf.trigger",function(o){n&&clearTimeout(n),n=setTimeout(function(){i||s.each(function(){e(this).triggerHandler("scrollme.zf.trigger")}),s.attr("data-events","scroll")},t||10)})},r=function(){if(!i)return!1;var t=document.querySelectorAll("[data-resize], [data-scroll], [data-mutate]"),n=function(t){var i=e(t[0].target);switch(i.attr("data-events")){case"resize":i.triggerHandler("resizeme.zf.trigger",[i]);break;case"scroll":i.triggerHandler("scrollme.zf.trigger",[i,window.pageYOffset]);break;default:return!1}};if(t.length)for(var s=0;s<=t.length-1;s++){var o=new i(n);o.observe(t[s],{attributes:!0,childList:!1,characterData:!1,subtree:!1,attributeFilter:["data-events"]})}};t.IHearYou=n}(window.Foundation,window.jQuery),!function(t,e){"use strict";function i(n,s){this.$element=n,this.options=e.extend({},i.defaults,this.$element.data(),s),this._init(),t.registerPlugin(this,"Abide")}i.defaults={validateOn:"fieldChange",labelErrorClass:"is-invalid-label",inputErrorClass:"is-invalid-input",formErrorSelector:".form-error",formErrorClass:"is-visible",liveValidate:!1,patterns:{alpha:/^[a-zA-Z]+$/,alpha_numeric:/^[a-zA-Z0-9]+$/,integer:/^[-+]?\d+$/,number:/^[-+]?\d*(?:[\.\,]\d+)?$/,card:/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,cvv:/^([0-9]){3,4}$/,email:/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/,url:/^(https?|ftp|file|ssh):\/\/(((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/,domain:/^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,8}$/,datetime:/^([0-2][0-9]{3})\-([0-1][0-9])\-([0-3][0-9])T([0-5][0-9])\:([0-5][0-9])\:([0-5][0-9])(Z|([\-\+]([0-1][0-9])\:00))$/,date:/(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))$/,time:/^(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9]){2}$/,dateISO:/^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/,month_day_year:/^(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.]\d{4}$/,day_month_year:/^(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|1[012])[- \/.]\d{4}$/,color:/^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/},validators:{equalTo:function(t,i,n){return e("#"+t.attr("data-equalto")).val()===t.val()}}},i.prototype._init=function(){this.$inputs=this.$element.find("input, textarea, select").not("[data-abide-ignore]"),this._events()},i.prototype._events=function(){var t=this;this.$element.off(".abide").on("reset.zf.abide",function(e){t.resetForm()}).on("submit.zf.abide",function(e){return t.validateForm()}),"fieldChange"===this.options.validateOn&&this.$inputs.off("change.zf.abide").on("change.zf.abide",function(i){t.validateInput(e(this))}),this.options.liveValidate&&this.$inputs.off("input.zf.abide").on("input.zf.abide",function(i){t.validateInput(e(this))})},i.prototype._reflow=function(){this._init()},i.prototype.requiredCheck=function(t){if(!t.attr("required"))return!0;var e=!0;switch(t[0].type){case"checkbox":case"radio":e=t[0].checked;break;case"select":case"select-one":case"select-multiple":var i=t.find("option:selected");i.length&&i.val()||(e=!1);break;default:t.val()&&t.val().length||(e=!1)}return e},i.prototype.findFormError=function(t){var e=t.siblings(this.options.formErrorSelector);return e.length||(e=t.parent().find(this.options.formErrorSelector)),e},i.prototype.findLabel=function(t){var e=this.$element.find('label[for="'+t[0].id+'"]');return e.length?e:t.closest("label")},i.prototype.addErrorClasses=function(t){var e=this.findLabel(t),i=this.findFormError(t);e.length&&e.addClass(this.options.labelErrorClass),i.length&&i.addClass(this.options.formErrorClass),t.addClass(this.options.inputErrorClass).attr("data-invalid","")},i.prototype.removeErrorClasses=function(t){var e=this.findLabel(t),i=this.findFormError(t);e.length&&e.removeClass(this.options.labelErrorClass),i.length&&i.removeClass(this.options.formErrorClass),t.removeClass(this.options.inputErrorClass).removeAttr("data-invalid")},i.prototype.validateInput=function(t){var e=this.requiredCheck(t),i=!1,n=!0,s=t.attr("data-validator"),o=!0;switch(t[0].type){case"radio":i=this.validateRadio(t.attr("name"));break;case"checkbox":i=e;break;case"select":case"select-one":case"select-multiple":i=e;break;default:i=this.validateText(t)}s&&(n=this.matchValidation(t,s,t.attr("required"))),t.attr("data-equalto")&&(o=this.options.validators.equalTo(t));var a=-1===[e,i,n,o].indexOf(!1),r=(a?"valid":"invalid")+".zf.abide";return this[a?"removeErrorClasses":"addErrorClasses"](t),t.trigger(r,t[0]),a},i.prototype.validateForm=function(){var t=[],i=this;this.$inputs.each(function(){t.push(i.validateInput(e(this)))});var n=-1===t.indexOf(!1);return this.$element.find("[data-abide-error]").css("display",n?"none":"block"),this.$element.trigger((n?"formvalid":"forminvalid")+".zf.abide",[this.$element]),n},i.prototype.validateText=function(t,e){e=e||t.attr("pattern")||t.attr("type");var i=t.val();return i.length?this.options.patterns.hasOwnProperty(e)?this.options.patterns[e].test(i):e&&e!==t.attr("type")?new RegExp(e).test(i):!0:!0},i.prototype.validateRadio=function(t){var i=this.$element.find(':radio[name="'+t+'"]'),n=[],s=this;return i.each(function(){var t=e(this),i=s.requiredCheck(t);n.push(i),i&&s.removeErrorClasses(t)}),-1===n.indexOf(!1)},i.prototype.matchValidation=function(t,e,i){var n=this;i=i?!0:!1;var s=e.split(" ").map(function(e){return n.options.validators[e](t,i,t.parent())});return-1===s.indexOf(!1)},i.prototype.resetForm=function(){var t=this.$element,i=this.options;e("."+i.labelErrorClass,t).not("small").removeClass(i.labelErrorClass),e("."+i.inputErrorClass,t).not("small").removeClass(i.inputErrorClass),e(i.formErrorSelector+"."+i.formErrorClass).removeClass(i.formErrorClass),t.find("[data-abide-error]").css("display","none"),e(":input",t).not(":button, :submit, :reset, :hidden, [data-abide-ignore]").val("").removeAttr("data-invalid"),t.trigger("formreset.zf.abide",[t])},i.prototype.destroy=function(){var i=this;this.$element.off(".abide").find("[data-abide-error]").css("display","none"),this.$inputs.off(".abide").each(function(){i.removeErrorClasses(e(this))}),t.unregisterPlugin(this)},t.plugin(i,"Abide"),"undefined"!=typeof module&&"undefined"!=typeof module.exports&&(module.exports=i),"function"==typeof define&&define(["foundation"],function(){return i})}(Foundation,jQuery),!function(t,e){"use strict";function i(n,s){this.$element=n,this.options=t.extend({},i.defaults,this.$element.data(),s),this._init(),e.registerPlugin(this,"Accordion"),e.Keyboard.register("Accordion",{ENTER:"toggle",SPACE:"toggle",ARROW_DOWN:"next",ARROW_UP:"previous"})}i.defaults={slideSpeed:250,multiExpand:!1,allowAllClosed:!1},i.prototype._init=function(){this.$element.attr("role","tablist"),this.$tabs=this.$element.children("li"),0==this.$tabs.length&&(this.$tabs=this.$element.children("[data-accordion-item]")),this.$tabs.each(function(i,n){var s=t(n),o=s.find("[data-tab-content]"),a=o[0].id||e.GetYoDigits(6,"accordion"),r=n.id||a+"-label";s.find("a:first").attr({"aria-controls":a,role:"tab",id:r,"aria-expanded":!1,"aria-selected":!1}),o.attr({role:"tabpanel","aria-labelledby":r,"aria-hidden":!0,id:a})});var i=this.$element.find(".is-active").children("[data-tab-content]");i.length&&this.down(i,!0),this._events()},i.prototype._events=function(){var i=this;this.$tabs.each(function(){var n=t(this),s=n.children("[data-tab-content]");s.length&&n.children("a").off("click.zf.accordion keydown.zf.accordion").on("click.zf.accordion",function(t){t.preventDefault(),n.hasClass("is-active")?(i.options.allowAllClosed||n.siblings().hasClass("is-active"))&&i.up(s):i.down(s)}).on("keydown.zf.accordion",function(t){e.Keyboard.handleKey(t,"Accordion",{toggle:function(){i.toggle(s)},next:function(){n.next().find("a").focus().trigger("click.zf.accordion")},previous:function(){n.prev().find("a").focus().trigger("click.zf.accordion")},handled:function(){t.preventDefault(),t.stopPropagation()}})})})},i.prototype.toggle=function(t){if(t.parent().hasClass("is-active")){if(!this.options.allowAllClosed&&!t.parent().siblings().hasClass("is-active"))return;this.up(t)}else this.down(t)},i.prototype.down=function(e,i){var n=this;if(!this.options.multiExpand&&!i){var s=this.$element.find(".is-active").children("[data-tab-content]");s.length&&this.up(s)}e.attr("aria-hidden",!1).parent("[data-tab-content]").addBack().parent().addClass("is-active"),e.slideDown(n.options.slideSpeed),t("#"+e.attr("aria-labelledby")).attr({"aria-expanded":!0,"aria-selected":!0}),this.$element.trigger("down.zf.accordion",[e])},i.prototype.up=function(e){var i=e.parent().siblings(),n=this,s=this.options.multiExpand?i.hasClass("is-active"):e.parent().hasClass("is-active");(this.options.allowAllClosed||s)&&(e.slideUp(n.options.slideSpeed),e.attr("aria-hidden",!0).parent().removeClass("is-active"),t("#"+e.attr("aria-labelledby")).attr({"aria-expanded":!1,"aria-selected":!1}),this.$element.trigger("up.zf.accordion",[e]))},i.prototype.destroy=function(){this.$element.find("[data-tab-content]").slideUp(0).css("display",""),this.$element.find("a").off(".zf.accordion"),e.unregisterPlugin(this)},e.plugin(i,"Accordion")}(jQuery,window.Foundation),!function(t){"use strict";function e(i,n){this.$element=i,this.options=t.extend({},e.defaults,this.$element.data(),n),Foundation.Nest.Feather(this.$element,"accordion"),this._init(),Foundation.registerPlugin(this,"AccordionMenu"),Foundation.Keyboard.register("AccordionMenu",{ENTER:"toggle",SPACE:"toggle",ARROW_RIGHT:"open",ARROW_UP:"up",ARROW_DOWN:"down",ARROW_LEFT:"close",ESCAPE:"closeAll",TAB:"down",SHIFT_TAB:"up"})}e.defaults={slideSpeed:250,multiOpen:!0},e.prototype._init=function(){this.$element.find("[data-submenu]").not(".is-active").slideUp(0),this.$element.attr({role:"tablist","aria-multiselectable":this.options.multiOpen}),this.$menuLinks=this.$element.find(".has-submenu"),this.$menuLinks.each(function(){var e=this.id||Foundation.GetYoDigits(6,"acc-menu-link"),i=t(this),n=i.children("[data-submenu]"),s=n[0].id||Foundation.GetYoDigits(6,"acc-menu"),o=n.hasClass("is-active");i.attr({"aria-controls":s,"aria-expanded":o,"aria-selected":!1,role:"tab",id:e}),n.attr({"aria-labelledby":e,"aria-hidden":!o,role:"tabpanel",id:s})});var e=this.$element.find(".is-active");if(e.length){var i=this;e.each(function(){i.down(t(this))})}this._events()},e.prototype._events=function(){var e=this;this.$element.find("li").each(function(){var i=t(this).children("[data-submenu]");i.length&&t(this).children("a").off("click.zf.accordionmenu").on("click.zf.accordionmenu",function(t){t.preventDefault(),e.toggle(i)})}).on("keydown.zf.accordionmenu",function(i){var n,s,o=t(this),a=o.parent("ul").children("li"),r=o.children("[data-submenu]");a.each(function(e){return t(this).is(o)?(n=a.eq(Math.max(0,e-1)),s=a.eq(Math.min(e+1,a.length-1)),t(this).children("[data-submenu]:visible").length&&(s=o.find("li:first-child")),t(this).is(":first-child")?n=o.parents("li").first():n.children("[data-submenu]:visible").length&&(n=n.find("li:last-child")),void(t(this).is(":last-child")&&(s=o.parents("li").first().next("li")))):void 0}),Foundation.Keyboard.handleKey(i,"AccordionMenu",{open:function(){r.is(":hidden")&&(e.down(r),r.find("li").first().focus())},close:function(){r.length&&!r.is(":hidden")?e.up(r):o.parent("[data-submenu]").length&&(e.up(o.parent("[data-submenu]")),o.parents("li").first().focus())},up:function(){n.focus()},down:function(){s.focus()},toggle:function(){o.children("[data-submenu]").length&&e.toggle(o.children("[data-submenu]"))},closeAll:function(){e.hideAll()},handled:function(){i.preventDefault(),i.stopImmediatePropagation()}})})},e.prototype.hideAll=function(){this.$element.find("[data-submenu]").slideUp(this.options.slideSpeed)},e.prototype.toggle=function(t){t.is(":animated")||(t.is(":hidden")?this.down(t):this.up(t))},e.prototype.down=function(t){var e=this;this.options.multiOpen||this.up(this.$element.find(".is-active").not(t.parentsUntil(this.$element).add(t))),t.addClass("is-active").attr({"aria-hidden":!1}).parent(".has-submenu").attr({"aria-expanded":!0,"aria-selected":!0}),Foundation.Move(this.options.slideSpeed,t,function(){t.slideDown(e.options.slideSpeed)}),this.$element.trigger("down.zf.accordionMenu",[t])},e.prototype.up=function(t){var e=this;Foundation.Move(this.options.slideSpeed,t,function(){t.slideUp(e.options.slideSpeed)}),t.attr("aria-hidden",!0).find("[data-submenu]").slideUp(0).attr("aria-hidden",!0).end().parent(".has-submenu").attr({"aria-expanded":!1,"aria-selected":!1}),this.$element.trigger("up.zf.accordionMenu",[t])},e.prototype.destroy=function(){this.$element.find("[data-submenu]").slideDown(0).css("display",""),this.$element.find("a").off("click.zf.accordionMenu"),Foundation.Nest.Burn(this.$element,"accordion"),Foundation.unregisterPlugin(this)},Foundation.plugin(e,"AccordionMenu")}(jQuery,window.Foundation),!function(t,e){"use strict";function i(n,s){this.$element=n,this.options=t.extend({},i.defaults,this.$element.data(),s),e.Nest.Feather(this.$element,"drilldown"),this._init(),e.registerPlugin(this,"Drilldown"),e.Keyboard.register("Drilldown",{ENTER:"open",SPACE:"open",ARROW_RIGHT:"next",ARROW_UP:"up",ARROW_DOWN:"down",ARROW_LEFT:"previous",ESCAPE:"close",TAB:"down",SHIFT_TAB:"up"})}i.defaults={backButton:'<li class="js-drilldown-back"><a>Back</a></li>',wrapper:"<div></div>",closeOnClick:!1},i.prototype._init=function(){this.$submenuAnchors=this.$element.find("li.has-submenu"),this.$submenus=this.$submenuAnchors.children("[data-submenu]"),this.$menuItems=this.$element.find("li").not(".js-drilldown-back").attr("role","menuitem"),this._prepareMenu(),this._keyboardEvents()},i.prototype._prepareMenu=function(){var e=this;this.$submenuAnchors.each(function(){var i=t(this),n=i.find("a:first");n.data("savedHref",n.attr("href")).removeAttr("href"),i.children("[data-submenu]").attr({"aria-hidden":!0,tabindex:0,role:"menu"}),e._events(i)}),this.$submenus.each(function(){var i=t(this),n=i.find(".js-drilldown-back");n.length||i.prepend(e.options.backButton),e._back(i)}),this.$element.parent().hasClass("is-drilldown")||(this.$wrapper=t(this.options.wrapper).addClass("is-drilldown").css(this._getMaxDims()),this.$element.wrap(this.$wrapper))},i.prototype._events=function(e){var i=this;e.off("click.zf.drilldown").on("click.zf.drilldown",function(n){if(t(n.target).parentsUntil("ul","li").hasClass("is-drilldown-submenu-parent")&&(n.stopImmediatePropagation(),n.preventDefault()),i._show(e),i.options.closeOnClick){var s=t("body").not(i.$wrapper);s.off(".zf.drilldown").on("click.zf.drilldown",function(t){t.preventDefault(),i._hideAll(),s.off(".zf.drilldown")})}})},i.prototype._keyboardEvents=function(){var i=this;this.$menuItems.add(this.$element.find(".js-drilldown-back")).on("keydown.zf.drilldown",function(n){var s,o,a=t(this),r=a.parent("ul").children("li");r.each(function(e){return t(this).is(a)?(s=r.eq(Math.max(0,e-1)),void(o=r.eq(Math.min(e+1,r.length-1)))):void 0}),e.Keyboard.handleKey(n,"Drilldown",{next:function(){a.is(i.$submenuAnchors)&&(i._show(a),a.on(e.transitionend(a),function(){a.find("ul li").filter(i.$menuItems).first().focus()}))},previous:function(){i._hide(a.parent("ul")),a.parent("ul").on(e.transitionend(a),function(){setTimeout(function(){
a.parent("ul").parent("li").focus()},1)})},up:function(){s.focus()},down:function(){o.focus()},close:function(){i._back()},open:function(){a.is(i.$menuItems)?a.is(i.$submenuAnchors)&&(i._show(a),setTimeout(function(){a.find("ul li").filter(i.$menuItems).first().focus()},1)):(i._hide(a.parent("ul")),setTimeout(function(){a.parent("ul").parent("li").focus()},1))},handled:function(){n.preventDefault(),n.stopImmediatePropagation()}})})},i.prototype._hideAll=function(){var t=this.$element.find(".is-drilldown-sub.is-active").addClass("is-closing");t.one(e.transitionend(t),function(e){t.removeClass("is-active is-closing")}),this.$element.trigger("closed.zf.drilldown")},i.prototype._back=function(t){var e=this;t.off("click.zf.drilldown"),t.children(".js-drilldown-back").on("click.zf.drilldown",function(i){i.stopImmediatePropagation(),e._hide(t)})},i.prototype._menuLinkEvents=function(){var t=this;this.$menuItems.not(".has-submenu").off("click.zf.drilldown").on("click.zf.drilldown",function(e){setTimeout(function(){t._hideAll()},0)})},i.prototype._show=function(t){t.children("[data-submenu]").addClass("is-active"),this.$element.trigger("open.zf.drilldown",[t])},i.prototype._hide=function(t){t.addClass("is-closing").one(e.transitionend(t),function(){t.removeClass("is-active is-closing")}),t.trigger("hide.zf.drilldown",[t])},i.prototype._getMaxDims=function(){var e=0,i={};return this.$submenus.add(this.$element).each(function(){var i=t(this).children("li").length;e=i>e?i:e}),i.height=e*this.$menuItems[0].getBoundingClientRect().height+"px",i.width=this.$element[0].getBoundingClientRect().width+"px",i},i.prototype.destroy=function(){this._hideAll(),e.Nest.Burn(this.$element,"drilldown"),this.$element.unwrap().find(".js-drilldown-back").remove().end().find(".is-active, .is-closing, .is-drilldown-sub").removeClass("is-active is-closing is-drilldown-sub").end().find("[data-submenu]").removeAttr("aria-hidden tabindex role").off(".zf.drilldown").end().off("zf.drilldown"),this.$element.find("a").each(function(){var e=t(this);e.data("savedHref")&&e.attr("href",e.data("savedHref")).removeData("savedHref")}),e.unregisterPlugin(this)},e.plugin(i,"Drilldown")}(jQuery,window.Foundation),!function(t,e){"use strict";function i(n,s){this.$element=n,this.options=t.extend({},i.defaults,this.$element.data(),s),this._init(),e.registerPlugin(this,"Dropdown"),e.Keyboard.register("Dropdown",{ENTER:"open",SPACE:"open",ESCAPE:"close",TAB:"tab_forward",SHIFT_TAB:"tab_backward"})}i.defaults={hoverDelay:250,hover:!1,hoverPane:!1,vOffset:1,hOffset:1,positionClass:"",trapFocus:!1,autoFocus:!1,closeOnClick:!1},i.prototype._init=function(){var i=this.$element.attr("id");this.$anchor=t('[data-toggle="'+i+'"]')||t('[data-open="'+i+'"]'),this.$anchor.attr({"aria-controls":i,"data-is-focus":!1,"data-yeti-box":i,"aria-haspopup":!0,"aria-expanded":!1}),this.options.positionClass=this.getPositionClass(),this.counter=4,this.usedPositions=[],this.$element.attr({"aria-hidden":"true","data-yeti-box":i,"data-resize":i,"aria-labelledby":this.$anchor[0].id||e.GetYoDigits(6,"dd-anchor")}),this._events()},i.prototype.getPositionClass=function(){var t=this.$element[0].className.match(/(top|left|right)/g);return t=t?t[0]:""},i.prototype._reposition=function(t){this.usedPositions.push(t?t:"bottom"),!t&&this.usedPositions.indexOf("top")<0?this.$element.addClass("top"):"top"===t&&this.usedPositions.indexOf("bottom")<0?this.$element.removeClass(t):"left"===t&&this.usedPositions.indexOf("right")<0?this.$element.removeClass(t).addClass("right"):"right"===t&&this.usedPositions.indexOf("left")<0?this.$element.removeClass(t).addClass("left"):!t&&this.usedPositions.indexOf("top")>-1&&this.usedPositions.indexOf("left")<0?this.$element.addClass("left"):"top"===t&&this.usedPositions.indexOf("bottom")>-1&&this.usedPositions.indexOf("left")<0?this.$element.removeClass(t).addClass("left"):"left"===t&&this.usedPositions.indexOf("right")>-1&&this.usedPositions.indexOf("bottom")<0?this.$element.removeClass(t):"right"===t&&this.usedPositions.indexOf("left")>-1&&this.usedPositions.indexOf("bottom")<0?this.$element.removeClass(t):this.$element.removeClass(t),this.classChanged=!0,this.counter--},i.prototype._setPosition=function(){if("false"===this.$anchor.attr("aria-expanded"))return!1;var t=this.getPositionClass(),i=e.Box.GetDimensions(this.$element),n=(e.Box.GetDimensions(this.$anchor),"left"===t?"left":"right"===t?"left":"top"),s="top"===n?"height":"width";"height"===s?this.options.vOffset:this.options.hOffset;if(i.width>=i.windowDims.width||!this.counter&&!e.Box.ImNotTouchingYou(this.$element))return this.$element.offset(e.Box.GetOffsets(this.$element,this.$anchor,"center bottom",this.options.vOffset,this.options.hOffset,!0)).css({width:i.windowDims.width-2*this.options.hOffset,height:"auto"}),this.classChanged=!0,!1;for(this.$element.offset(e.Box.GetOffsets(this.$element,this.$anchor,t,this.options.vOffset,this.options.hOffset));!e.Box.ImNotTouchingYou(this.$element)&&this.counter;)this._reposition(t),this._setPosition()},i.prototype._events=function(){var i=this;this.$element.on({"open.zf.trigger":this.open.bind(this),"close.zf.trigger":this.close.bind(this),"toggle.zf.trigger":this.toggle.bind(this),"resizeme.zf.trigger":this._setPosition.bind(this)}),this.options.hover&&(this.$anchor.off("mouseenter.zf.dropdown mouseleave.zf.dropdown").on("mouseenter.zf.dropdown",function(){clearTimeout(i.timeout),i.timeout=setTimeout(function(){i.open(),i.$anchor.data("hover",!0)},i.options.hoverDelay)}).on("mouseleave.zf.dropdown",function(){clearTimeout(i.timeout),i.timeout=setTimeout(function(){i.close(),i.$anchor.data("hover",!1)},i.options.hoverDelay)}),this.options.hoverPane&&this.$element.off("mouseenter.zf.dropdown mouseleave.zf.dropdown").on("mouseenter.zf.dropdown",function(){clearTimeout(i.timeout)}).on("mouseleave.zf.dropdown",function(){clearTimeout(i.timeout),i.timeout=setTimeout(function(){i.close(),i.$anchor.data("hover",!1)},i.options.hoverDelay)})),this.$anchor.add(this.$element).on("keydown.zf.dropdown",function(n){var s=t(this),o=e.Keyboard.findFocusable(i.$element);e.Keyboard.handleKey(n,"Dropdown",{tab_forward:function(){i.$element.find(":focus").is(o.eq(-1))&&(i.options.trapFocus?(o.eq(0).focus(),n.preventDefault()):i.close())},tab_backward:function(){(i.$element.find(":focus").is(o.eq(0))||i.$element.is(":focus"))&&(i.options.trapFocus?(o.eq(-1).focus(),n.preventDefault()):i.close())},open:function(){s.is(i.$anchor)&&(i.open(),i.$element.attr("tabindex",-1).focus(),n.preventDefault())},close:function(){i.close(),i.$anchor.focus()}})})},i.prototype._addBodyHandler=function(){var e=t(document.body).not(this.$element),i=this;e.off("click.zf.dropdown").on("click.zf.dropdown",function(t){i.$anchor.is(t.target)||i.$anchor.find(t.target).length||i.$element.find(t.target).length||(i.close(),e.off("click.zf.dropdown"))})},i.prototype.open=function(){if(this.$element.trigger("closeme.zf.dropdown",this.$element.attr("id")),this.$anchor.addClass("hover").attr({"aria-expanded":!0}),this._setPosition(),this.$element.addClass("is-open").attr({"aria-hidden":!1}),this.options.autoFocus){var t=e.Keyboard.findFocusable(this.$element);t.length&&t.eq(0).focus()}this.options.closeOnClick&&this._addBodyHandler(),this.$element.trigger("show.zf.dropdown",[this.$element])},i.prototype.close=function(){if(!this.$element.hasClass("is-open"))return!1;if(this.$element.removeClass("is-open").attr({"aria-hidden":!0}),this.$anchor.removeClass("hover").attr("aria-expanded",!1),this.classChanged){var t=this.getPositionClass();t&&this.$element.removeClass(t),this.$element.addClass(this.options.positionClass).css({height:"",width:""}),this.classChanged=!1,this.counter=4,this.usedPositions.length=0}this.$element.trigger("hide.zf.dropdown",[this.$element])},i.prototype.toggle=function(){if(this.$element.hasClass("is-open")){if(this.$anchor.data("hover"))return;this.close()}else this.open()},i.prototype.destroy=function(){this.$element.off(".zf.trigger").hide(),this.$anchor.off(".zf.dropdown"),e.unregisterPlugin(this)},e.plugin(i,"Dropdown")}(jQuery,window.Foundation),!function(t,e){"use strict";function i(n,s){this.$element=n,this.options=t.extend({},i.defaults,this.$element.data(),s),e.Nest.Feather(this.$element,"dropdown"),this._init(),e.registerPlugin(this,"DropdownMenu"),e.Keyboard.register("DropdownMenu",{ENTER:"open",SPACE:"open",ARROW_RIGHT:"next",ARROW_UP:"up",ARROW_DOWN:"down",ARROW_LEFT:"previous",ESCAPE:"close"})}i.defaults={disableHover:!1,autoclose:!0,hoverDelay:50,clickOpen:!1,closingTime:500,alignment:"left",closeOnClick:!0,verticalClass:"vertical",rightClass:"align-right",forceFollow:!0},i.prototype._init=function(){var t=this.$element.find("li.is-dropdown-submenu-parent");this.$element.children(".is-dropdown-submenu-parent").children(".is-dropdown-submenu").addClass("first-sub"),this.$menuItems=this.$element.find('[role="menuitem"]'),this.$tabs=this.$element.children('[role="menuitem"]'),this.isVert=this.$element.hasClass(this.options.verticalClass),this.$tabs.find("ul.is-dropdown-submenu").addClass(this.options.verticalClass),this.$element.hasClass(this.options.rightClass)||"right"===this.options.alignment?(this.options.alignment="right",t.addClass("is-left-arrow opens-left")):t.addClass("is-right-arrow opens-right"),this.isVert||this.$tabs.filter(".is-dropdown-submenu-parent").removeClass("is-right-arrow is-left-arrow opens-right opens-left").addClass("is-down-arrow"),this.changed=!1,this._events()},i.prototype._events=function(){var i,n=this,s="ontouchstart"in window||"undefined"!=typeof window.ontouchstart,o="is-dropdown-submenu-parent";(this.options.clickOpen||s)&&this.$menuItems.on("click.zf.dropdownmenu touchstart.zf.dropdownmenu",function(e){var i=t(e.target).parentsUntil("ul","."+o),a=i.hasClass(o),r="true"===i.attr("data-is-click");i.children(".is-dropdown-submenu");if(a)if(r){if(!n.options.closeOnClick||!n.options.clickOpen&&!s||n.options.forceFollow&&s)return;e.stopImmediatePropagation(),e.preventDefault(),n._hide(i)}else e.preventDefault(),e.stopImmediatePropagation(),n._show(i.children(".is-dropdown-submenu")),i.add(i.parentsUntil(n.$element,"."+o)).attr("data-is-click",!0)}),this.options.disableHover||this.$menuItems.on("mouseenter.zf.dropdownmenu",function(e){e.stopImmediatePropagation();var s=t(this),a=s.hasClass(o);a&&(clearTimeout(i),i=setTimeout(function(){n._show(s.children(".is-dropdown-submenu"))},n.options.hoverDelay))}).on("mouseleave.zf.dropdownmenu",function(e){var s=t(this),a=s.hasClass(o);if(a&&n.options.autoclose){if("true"===s.attr("data-is-click")&&n.options.clickOpen)return!1;i=setTimeout(function(){n._hide(s)},n.options.closingTime)}}),this.$menuItems.on("keydown.zf.dropdownmenu",function(i){var s,o,a=t(i.target).parentsUntil("ul",'[role="menuitem"]'),r=n.$tabs.index(a)>-1,l=r?n.$tabs:a.siblings("li").add(a);l.each(function(e){return t(this).is(a)?(s=l.eq(e-1),void(o=l.eq(e+1))):void 0});var d=function(){a.is(":last-child")||o.children("a:first").focus()},h=function(){s.children("a:first").focus()},u=function(){var t=a.children("ul.is-dropdown-submenu");t.length&&(n._show(t),a.find("li > a:first").focus())},f=function(){var t=a.parent("ul").parent("li");t.children("a:first").focus(),n._hide(t)},c={open:u,close:function(){n._hide(n.$element),n.$menuItems.find("a:first").focus()},handled:function(){i.preventDefault(),i.stopImmediatePropagation()}};r?n.vertical?"left"===n.options.alignment?t.extend(c,{down:d,up:h,next:u,previous:f}):t.extend(c,{down:d,up:h,next:f,previous:u}):t.extend(c,{next:d,previous:h,down:u,up:f}):"left"===n.options.alignment?t.extend(c,{next:u,previous:f,down:d,up:h}):t.extend(c,{next:f,previous:u,down:d,up:h}),e.Keyboard.handleKey(i,"DropdownMenu",c)})},i.prototype._addBodyHandler=function(){var e=t(document.body),i=this;e.off("mouseup.zf.dropdownmenu touchend.zf.dropdownmenu").on("mouseup.zf.dropdownmenu touchend.zf.dropdownmenu",function(t){var n=i.$element.find(t.target);n.length||(i._hide(),e.off("mouseup.zf.dropdownmenu touchend.zf.dropdownmenu"))})},i.prototype._show=function(i){var n=this.$tabs.index(this.$tabs.filter(function(e,n){return t(n).find(i).length>0})),s=i.parent("li.is-dropdown-submenu-parent").siblings("li.is-dropdown-submenu-parent");this._hide(s,n),i.css("visibility","hidden").addClass("js-dropdown-active").attr({"aria-hidden":!1}).parent("li.is-dropdown-submenu-parent").addClass("is-active").attr({"aria-selected":!0,"aria-expanded":!0});var o=e.Box.ImNotTouchingYou(i,null,!0);if(!o){var a="left"===this.options.alignment?"-right":"-left",r=i.parent(".is-dropdown-submenu-parent");r.removeClass("opens"+a).addClass("opens-"+this.options.alignment),o=e.Box.ImNotTouchingYou(i,null,!0),o||r.removeClass("opens-"+this.options.alignment).addClass("opens-inner"),this.changed=!0}i.css("visibility",""),this.options.closeOnClick&&this._addBodyHandler(),this.$element.trigger("show.zf.dropdownmenu",[i])},i.prototype._hide=function(t,e){var i;i=t&&t.length?t:void 0!==e?this.$tabs.not(function(t,i){return t===e}):this.$element;var n=i.hasClass("is-active")||i.find(".is-active").length>0;if(n){if(i.find("li.is-active").add(i).attr({"aria-selected":!1,"aria-expanded":!1,"data-is-click":!1}).removeClass("is-active"),i.find("ul.js-dropdown-active").attr({"aria-hidden":!0}).removeClass("js-dropdown-active"),this.changed||i.find("opens-inner").length){var s="left"===this.options.alignment?"right":"left";i.find("li.is-dropdown-submenu-parent").add(i).removeClass("opens-inner opens-"+this.options.alignment).addClass("opens-"+s),this.changed=!1}this.$element.trigger("hide.zf.dropdownmenu",[i])}},i.prototype.destroy=function(){this.$menuItems.off(".zf.dropdownmenu").removeAttr("data-is-click").removeClass("is-right-arrow is-left-arrow is-down-arrow opens-right opens-left opens-inner"),e.Nest.Burn(this.$element,"dropdown"),e.unregisterPlugin(this)},e.plugin(i,"DropdownMenu")}(jQuery,window.Foundation),!function(t,e){"use strict";function i(n,s){this.$element=n,this.options=e.extend({},i.defaults,this.$element.data(),s),this._init(),t.registerPlugin(this,"Equalizer")}i.defaults={equalizeOnStack:!0,equalizeByRow:!1,equalizeOn:""},i.prototype._init=function(){var i=this.$element.attr("data-equalizer")||"",n=this.$element.find('[data-equalizer-watch="'+i+'"]');this.$watched=n.length?n:this.$element.find("[data-equalizer-watch]"),this.$element.attr("data-resize",i||t.GetYoDigits(6,"eq")),this.hasNested=this.$element.find("[data-equalizer]").length>0,this.isNested=this.$element.parentsUntil(document.body,"[data-equalizer]").length>0,this.isOn=!1;var s,o=this.$element.find("img");this.options.equalizeOn?(s=this._checkMQ(),e(window).on("changed.zf.mediaquery",this._checkMQ.bind(this))):this._events(),(void 0!==s&&s===!1||void 0===s)&&(o.length?t.onImagesLoaded(o,this._reflow.bind(this)):this._reflow())},i.prototype._pauseEvents=function(){this.isOn=!1,this.$element.off(".zf.equalizer resizeme.zf.trigger")},i.prototype._events=function(){var t=this;this._pauseEvents(),this.hasNested?this.$element.on("postequalized.zf.equalizer",function(e){e.target!==t.$element[0]&&t._reflow()}):this.$element.on("resizeme.zf.trigger",this._reflow.bind(this)),this.isOn=!0},i.prototype._checkMQ=function(){var e=!t.MediaQuery.atLeast(this.options.equalizeOn);return e?this.isOn&&(this._pauseEvents(),this.$watched.css("height","auto")):this.isOn||this._events(),e},i.prototype._killswitch=function(){},i.prototype._reflow=function(){return!this.options.equalizeOnStack&&this._isStacked()?(this.$watched.css("height","auto"),!1):void(this.options.equalizeByRow?this.getHeightsByRow(this.applyHeightByRow.bind(this)):this.getHeights(this.applyHeight.bind(this)))},i.prototype._isStacked=function(){return this.$watched[0].offsetTop!==this.$watched[1].offsetTop},i.prototype.getHeights=function(t){for(var e=[],i=0,n=this.$watched.length;n>i;i++)this.$watched[i].style.height="auto",e.push(this.$watched[i].offsetHeight);t(e)},i.prototype.getHeightsByRow=function(t){var i=this.$watched.first().offset().top,n=[],s=0;n[s]=[];for(var o=0,a=this.$watched.length;a>o;o++){this.$watched[o].style.height="auto";var r=e(this.$watched[o]).offset().top;r!=i&&(s++,n[s]=[],i=r),n[s].push([this.$watched[o],this.$watched[o].offsetHeight])}for(var o=0,a=n.length;a>o;o++){var l=e(n[o]).map(function(){return this[1]}).get(),d=Math.max.apply(null,l);n[o].push(d)}t(n)},i.prototype.applyHeight=function(t){var e=Math.max.apply(null,t);this.$element.trigger("preequalized.zf.equalizer"),this.$watched.css("height",e),this.$element.trigger("postequalized.zf.equalizer")},i.prototype.applyHeightByRow=function(t){this.$element.trigger("preequalized.zf.equalizer");for(var i=0,n=t.length;n>i;i++){var s=t[i].length,o=t[i][s-1];if(2>=s)e(t[i][0][0]).css({height:"auto"});else{this.$element.trigger("preequalizedrow.zf.equalizer");for(var a=0,r=s-1;r>a;a++)e(t[i][a][0]).css({height:o});this.$element.trigger("postequalizedrow.zf.equalizer")}}this.$element.trigger("postequalized.zf.equalizer")},i.prototype.destroy=function(){this._pauseEvents(),this.$watched.css("height","auto"),t.unregisterPlugin(this)},t.plugin(i,"Equalizer"),"undefined"!=typeof module&&"undefined"!=typeof module.exports&&(module.exports=i),"function"==typeof define&&define(["foundation"],function(){return i})}(Foundation,jQuery),!function(t,e){"use strict";function i(n,s){this.$element=n,this.options=e.extend({},i.defaults,s),this.rules=[],this.currentPath="",this._init(),this._events(),t.registerPlugin(this,"Interchange")}i.defaults={rules:null},i.SPECIAL_QUERIES={landscape:"screen and (orientation: landscape)",portrait:"screen and (orientation: portrait)",retina:"only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min--moz-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2/1), only screen and (min-device-pixel-ratio: 2), only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx)"},i.prototype._init=function(){this._addBreakpoints(),this._generateRules(),this._reflow()},i.prototype._events=function(){e(window).on("resize.zf.interchange",t.util.throttle(this._reflow.bind(this),50))},i.prototype._reflow=function(){var t;for(var e in this.rules){var i=this.rules[e];window.matchMedia(i.query).matches&&(t=i)}t&&this.replace(t.path)},i.prototype._addBreakpoints=function(){for(var e in t.MediaQuery.queries){var n=t.MediaQuery.queries[e];i.SPECIAL_QUERIES[n.name]=n.value}},i.prototype._generateRules=function(){var t,e=[];t=this.options.rules?this.options.rules:this.$element.data("interchange").match(/\[.*?\]/g);for(var n in t){var s=t[n].slice(1,-1).split(", "),o=s.slice(0,-1).join(""),a=s[s.length-1];i.SPECIAL_QUERIES[a]&&(a=i.SPECIAL_QUERIES[a]),e.push({path:o,query:a})}this.rules=e},i.prototype.replace=function(t){if(this.currentPath!==t){var i=this;"IMG"===this.$element[0].nodeName?this.$element.attr("src",t).load(function(){i.currentPath=t}):t.match(/\.(gif|jpg|jpeg|tiff|png)([?#].*)?/i)?this.$element.css({"background-image":"url("+t+")"}):e.get(t,function(n){i.$element.html(n),e(n).foundation(),i.currentPath=t}),this.$element.trigger("replaced.zf.interchange")}},i.prototype.destroy=function(){},t.plugin(i,"Interchange"),"undefined"!=typeof module&&"undefined"!=typeof module.exports&&(module.exports=i),"function"==typeof define&&define(["foundation"],function(){return i})}(Foundation,jQuery),!function(t,e){"use strict";function i(n,s){this.$element=n,this.options=e.extend({},i.defaults,this.$element.data(),s),this._init(),t.registerPlugin(this,"Magellan")}i.defaults={animationDuration:500,animationEasing:"linear",threshold:50,activeClass:"active",deepLinking:!1,barOffset:0},i.prototype._init=function(){var i=this.$element[0].id||t.GetYoDigits(6,"magellan");this.$targets=e("[data-magellan-target]"),this.$links=this.$element.find("a"),this.$element.attr({"data-resize":i,"data-scroll":i,id:i}),this.$active=e(),this.scrollPos=parseInt(window.pageYOffset,10),this._events()},i.prototype.calcPoints=function(){var t=this,i=document.body,n=document.documentElement;this.points=[],this.winHeight=Math.round(Math.max(window.innerHeight,n.clientHeight)),this.docHeight=Math.round(Math.max(i.scrollHeight,i.offsetHeight,n.clientHeight,n.scrollHeight,n.offsetHeight)),this.$targets.each(function(){var i=e(this),n=Math.round(i.offset().top-t.options.threshold);i.targetPoint=n,t.points.push(n)})},i.prototype._events=function(){var t=this,i=e("html, body"),n={duration:t.options.animationDuration,easing:t.options.animationEasing};e(window).one("load",function(){t.calcPoints(),t._updateActive()}),this.$element.on({"resizeme.zf.trigger":this.reflow.bind(this),"scrollme.zf.trigger":this._updateActive.bind(this)}).on("click.zf.magellan",'a[href^="#"]',function(s){s.preventDefault();var o=this.getAttribute("href"),a=e(o).offset().top-t.options.threshold/2-t.options.barOffset;i.stop(!0).animate({scrollTop:a},n)})},i.prototype.reflow=function(){this.calcPoints(),this._updateActive()},i.prototype._updateActive=function(){var t,e=parseInt(window.pageYOffset,10);if(e+this.winHeight===this.docHeight)t=this.points.length-1;else if(e<this.points[0])t=0;else{var i=this.scrollPos<e,n=this,s=this.points.filter(function(t,s){return i?e>=t:t-n.options.threshold<=e});t=s.length?s.length-1:0}if(this.$active.removeClass(this.options.activeClass),this.$active=this.$links.eq(t).addClass(this.options.activeClass),this.options.deepLinking){var o=this.$active[0].getAttribute("href");window.history.pushState?window.history.pushState(null,null,o):window.location.hash=o}this.scrollPos=e,this.$element.trigger("update.zf.magellan",[this.$active])},i.prototype.destroy=function(){if(this.$element.off(".zf.trigger .zf.magellan").find("."+this.options.activeClass).removeClass(this.options.activeClass),this.options.deepLinking){var e=this.$active[0].getAttribute("href");window.location.hash.replace(e,"")}t.unregisterPlugin(this)},t.plugin(i,"Magellan"),"undefined"!=typeof module&&"undefined"!=typeof module.exports&&(module.exports=i),"function"==typeof define&&define(["foundation"],function(){return i})}(Foundation,jQuery),!function(t,e){"use strict";function i(n,s){this.$element=n,this.options=t.extend({},i.defaults,this.$element.data(),s),this.$lastTrigger=t(),this._init(),this._events(),e.registerPlugin(this,"OffCanvas")}i.defaults={closeOnClick:!0,transitionTime:0,position:"left",forceTop:!0,isRevealed:!1,revealOn:null,autoFocus:!0,revealClass:"reveal-for-",trapFocus:!1},i.prototype._init=function(){var e=this.$element.attr("id");if(this.$element.attr("aria-hidden","true"),t(document).find('[data-open="'+e+'"], [data-close="'+e+'"], [data-toggle="'+e+'"]').attr("aria-expanded","false").attr("aria-controls",e),this.options.closeOnClick)if(t(".js-off-canvas-exit").length)this.$exiter=t(".js-off-canvas-exit");else{var i=document.createElement("div");i.setAttribute("class","js-off-canvas-exit"),t("[data-off-canvas-content]").append(i),this.$exiter=t(i)}this.options.isRevealed=this.options.isRevealed||new RegExp(this.options.revealClass,"g").test(this.$element[0].className),this.options.isRevealed&&(this.options.revealOn=this.options.revealOn||this.$element[0].className.match(/(reveal-for-medium|reveal-for-large)/g)[0].split("-")[2],this._setMQChecker()),this.options.transitionTime||(this.options.transitionTime=1e3*parseFloat(window.getComputedStyle(t("[data-off-canvas-wrapper]")[0]).transitionDuration))},i.prototype._events=function(){if(this.$element.off(".zf.trigger .zf.offcanvas").on({"open.zf.trigger":this.open.bind(this),"close.zf.trigger":this.close.bind(this),"toggle.zf.trigger":this.toggle.bind(this),"keydown.zf.offcanvas":this._handleKeyboard.bind(this)}),this.$exiter.length){this.$exiter.on({"click.zf.offcanvas":this.close.bind(this)})}},i.prototype._setMQChecker=function(){var i=this;t(window).on("changed.zf.mediaquery",function(){e.MediaQuery.atLeast(i.options.revealOn)?i.reveal(!0):i.reveal(!1)}).one("load.zf.offcanvas",function(){e.MediaQuery.atLeast(i.options.revealOn)&&i.reveal(!0)})},i.prototype.reveal=function(t){var e=this.$element.find("[data-close]");t?(this.close(),this.isRevealed=!0,this.$element.off("open.zf.trigger toggle.zf.trigger"),e.length&&e.hide()):(this.isRevealed=!1,this.$element.on({"open.zf.trigger":this.open.bind(this),"toggle.zf.trigger":this.toggle.bind(this)}),e.length&&e.show())},i.prototype.open=function(i,n){if(!this.$element.hasClass("is-open")&&!this.isRevealed){var s=this;t(document.body);t("body").scrollTop(0),e.Move(this.options.transitionTime,this.$element,function(){t("[data-off-canvas-wrapper]").addClass("is-off-canvas-open is-open-"+s.options.position),s.$element.addClass("is-open")}),this.$element.attr("aria-hidden","false").trigger("opened.zf.offcanvas"),n&&(this.$lastTrigger=n.attr("aria-expanded","true")),this.options.autoFocus&&this.$element.one("finished.zf.animate",function(){s.$element.find("a, button").eq(0).focus()}),this.options.trapFocus&&(t("[data-off-canvas-content]").attr("tabindex","-1"),this._trapFocus())}},i.prototype._trapFocus=function(){var t=e.Keyboard.findFocusable(this.$element),i=t.eq(0),n=t.eq(-1);t.off(".zf.offcanvas").on("keydown.zf.offcanvas",function(t){(9===t.which||9===t.keycode)&&(t.target!==n[0]||t.shiftKey||(t.preventDefault(),i.focus()),t.target===i[0]&&t.shiftKey&&(t.preventDefault(),n.focus()))})},i.prototype.close=function(e){if(this.$element.hasClass("is-open")&&!this.isRevealed){var i=this;t("[data-off-canvas-wrapper]").removeClass("is-off-canvas-open is-open-"+i.options.position),i.$element.removeClass("is-open"),this.$element.attr("aria-hidden","true").trigger("closed.zf.offcanvas"),this.$lastTrigger.attr("aria-expanded","false"),this.options.trapFocus&&t("[data-off-canvas-content]").removeAttr("tabindex")}},i.prototype.toggle=function(t,e){this.$element.hasClass("is-open")?this.close(t,e):this.open(t,e)},i.prototype._handleKeyboard=function(t){27===t.which&&(t.stopPropagation(),t.preventDefault(),this.close(),this.$lastTrigger.focus())},i.prototype.destroy=function(){this.close(),this.$element.off(".zf.trigger .zf.offcanvas"),this.$exiter.off(".zf.offcanvas"),e.unregisterPlugin(this)},e.plugin(i,"OffCanvas")}(jQuery,Foundation),!function(t,e){"use strict";function i(n,s){this.$element=n,this.options=t.extend({},i.defaults,this.$element.data(),s),this._init(),e.registerPlugin(this,"Orbit"),e.Keyboard.register("Orbit",{ltr:{ARROW_RIGHT:"next",ARROW_LEFT:"previous"},rtl:{ARROW_LEFT:"next",ARROW_RIGHT:"previous"}})}i.defaults={bullets:!0,navButtons:!0,animInFromRight:"slide-in-right",animOutToRight:"slide-out-right",animInFromLeft:"slide-in-left",animOutToLeft:"slide-out-left",autoPlay:!0,timerDelay:5e3,infiniteWrap:!0,swipe:!0,pauseOnHover:!0,accessible:!0,containerClass:"orbit-container",slideClass:"orbit-slide",boxOfBullets:"orbit-bullets",nextClass:"orbit-next",prevClass:"orbit-previous",useMUI:!0},i.prototype._init=function(){this.$wrapper=this.$element.find("."+this.options.containerClass),this.$slides=this.$element.find("."+this.options.slideClass);var t=this.$element.find("img"),i=this.$slides.filter(".is-active");i.length||this.$slides.eq(0).addClass("is-active"),this.options.useMUI||this.$slides.addClass("no-motionui"),t.length?e.onImagesLoaded(t,this._prepareForOrbit.bind(this)):this._prepareForOrbit(),this.options.bullets&&this._loadBullets(),this._events(),this.options.autoPlay&&this.geoSync(),this.options.accessible&&this.$wrapper.attr("tabindex",0)},i.prototype._loadBullets=function(){this.$bullets=this.$element.find("."+this.options.boxOfBullets).find("button")},i.prototype.geoSync=function(){var t=this;this.timer=new e.Timer(this.$element,{duration:this.options.timerDelay,infinite:!1},function(){t.changeSlide(!0)}),this.timer.start()},i.prototype._prepareForOrbit=function(){var t=this;this._setWrapperHeight(function(e){t._setSlideHeight(e)})},i.prototype._setWrapperHeight=function(e){var i,n=0,s=0;this.$slides.each(function(){i=this.getBoundingClientRect().height,t(this).attr("data-slide",s),s&&t(this).css({position:"relative",display:"none"}),n=i>n?i:n,s++}),s===this.$slides.length&&(this.$wrapper.css({height:n}),e(n))},i.prototype._setSlideHeight=function(e){this.$slides.each(function(){t(this).css("max-height",e)})},i.prototype._events=function(){var i=this;if(this.options.swipe&&this.$slides.off("swipeleft.zf.orbit swiperight.zf.orbit").on("swipeleft.zf.orbit",function(t){t.preventDefault(),i.changeSlide(!0)}).on("swiperight.zf.orbit",function(t){t.preventDefault(),i.changeSlide(!1)}),this.options.autoPlay&&(this.$slides.on("click.zf.orbit",function(){i.$element.data("clickedOn",i.$element.data("clickedOn")?!1:!0),i.timer[i.$element.data("clickedOn")?"pause":"start"]()}),this.options.pauseOnHover&&this.$element.on("mouseenter.zf.orbit",function(){i.timer.pause()}).on("mouseleave.zf.orbit",function(){i.$element.data("clickedOn")||i.timer.start()})),this.options.navButtons){var n=this.$element.find("."+this.options.nextClass+", ."+this.options.prevClass);n.attr("tabindex",0).on("click.zf.orbit touchend.zf.orbit",function(){i.changeSlide(t(this).hasClass(i.options.nextClass))})}this.options.bullets&&this.$bullets.on("click.zf.orbit touchend.zf.orbit",function(){if(/is-active/g.test(this.className))return!1;var e=t(this).data("slide"),n=e>i.$slides.filter(".is-active").data("slide"),s=i.$slides.eq(e);i.changeSlide(n,s,e)}),this.$wrapper.add(this.$bullets).on("keydown.zf.orbit",function(n){e.Keyboard.handleKey(n,"Orbit",{next:function(){i.changeSlide(!0)},previous:function(){i.changeSlide(!1)},handled:function(){t(n.target).is(i.$bullets)&&i.$bullets.filter(".is-active").focus()}})})},i.prototype.changeSlide=function(t,i,n){var s=this.$slides.filter(".is-active").eq(0);if(/mui/g.test(s[0].className))return!1;var o,a=this.$slides.first(),r=this.$slides.last(),l=t?"Right":"Left",d=t?"Left":"Right",h=this;o=i?i:t?this.options.infiniteWrap?s.next("."+this.options.slideClass).length?s.next("."+this.options.slideClass):a:s.next("."+this.options.slideClass):this.options.infiniteWrap?s.prev("."+this.options.slideClass).length?s.prev("."+this.options.slideClass):r:s.prev("."+this.options.slideClass),o.length&&(this.options.bullets&&(n=n||this.$slides.index(o),this._updateBullets(n)),this.options.useMUI?(e.Motion.animateIn(o.addClass("is-active").css({position:"absolute",top:0}),this.options["animInFrom"+l],function(){o.css({position:"relative",display:"block"}).attr("aria-live","polite")}),e.Motion.animateOut(s.removeClass("is-active"),this.options["animOutTo"+d],function(){s.removeAttr("aria-live"),h.options.autoPlay&&h.timer.restart()})):(s.removeClass("is-active is-in").removeAttr("aria-live").hide(),o.addClass("is-active is-in").attr("aria-live","polite").show(),this.options.autoPlay&&this.timer.restart()),this.$element.trigger("slidechange.zf.orbit",[o]))},i.prototype._updateBullets=function(t){var e=this.$element.find("."+this.options.boxOfBullets).find(".is-active").removeClass("is-active").blur(),i=e.find("span:last").detach();this.$bullets.eq(t).addClass("is-active").append(i)},i.prototype.destroy=function(){delete this.timer,this.$element.off(".zf.orbit").find("*").off(".zf.orbit").end().hide(),e.unregisterPlugin(this)},e.plugin(i,"Orbit")}(jQuery,window.Foundation),!function(t,e){"use strict";function i(i){this.$element=e(i),this.rules=this.$element.data("responsive-menu"),this.currentMq=null,this.currentPlugin=null,this._init(),this._events(),t.registerPlugin(this,"ResponsiveMenu")}var n={dropdown:{cssClass:"dropdown",plugin:t._plugins["dropdown-menu"]||null},drilldown:{cssClass:"drilldown",plugin:t._plugins.drilldown||null},accordion:{cssClass:"accordion-menu",plugin:t._plugins["accordion-menu"]||null}};i.defaults={},i.prototype._init=function(){for(var t={},i=this.rules.split(" "),s=0;s<i.length;s++){var o=i[s].split("-"),a=o.length>1?o[0]:"small",r=o.length>1?o[1]:o[0];null!==n[r]&&(t[a]=n[r])}this.rules=t,e.isEmptyObject(t)||this._checkMediaQueries()},i.prototype._events=function(){var t=this;e(window).on("changed.zf.mediaquery",function(){
t._checkMediaQueries()})},i.prototype._checkMediaQueries=function(){var i,s=this;e.each(this.rules,function(e){t.MediaQuery.atLeast(e)&&(i=e)}),i&&(this.currentPlugin instanceof this.rules[i].plugin||(e.each(n,function(t,e){s.$element.removeClass(e.cssClass)}),this.$element.addClass(this.rules[i].cssClass),this.currentPlugin&&this.currentPlugin.destroy(),this.currentPlugin=new this.rules[i].plugin(this.$element,{})))},i.prototype.destroy=function(){this.currentPlugin.destroy(),e(window).off(".zf.ResponsiveMenu"),t.unregisterPlugin(this)},t.plugin(i,"ResponsiveMenu")}(Foundation,jQuery),!function(t,e){"use strict";function i(n,s){this.$element=t(n),this.options=t.extend({},i.defaults,this.$element.data(),s),this._init(),this._events(),e.registerPlugin(this,"ResponsiveToggle")}i.defaults={hideFor:"medium"},i.prototype._init=function(){var e=this.$element.data("responsive-toggle");e||console.error("Your tab bar needs an ID of a Menu as the value of data-tab-bar."),this.$targetMenu=t("#"+e),this.$toggler=this.$element.find("[data-toggle]"),this._update()},i.prototype._events=function(){t(window).on("changed.zf.mediaquery",this._update.bind(this)),this.$toggler.on("click.zf.responsiveToggle",this.toggleMenu.bind(this))},i.prototype._update=function(){e.MediaQuery.atLeast(this.options.hideFor)?(this.$element.hide(),this.$targetMenu.show()):(this.$element.show(),this.$targetMenu.hide())},i.prototype.toggleMenu=function(){e.MediaQuery.atLeast(this.options.hideFor)||(this.$targetMenu.toggle(0),this.$element.trigger("toggled.zf.responsiveToggle"))},i.prototype.destroy=function(){},e.plugin(i,"ResponsiveToggle")}(jQuery,Foundation),!function(t,e){"use strict";function i(n,s){this.$element=n,this.options=e.extend({},i.defaults,this.$element.data(),s),this._init(),t.registerPlugin(this,"Reveal"),t.Keyboard.register("Reveal",{ENTER:"open",SPACE:"open",ESCAPE:"close",TAB:"tab_forward",SHIFT_TAB:"tab_backward"})}i.defaults={animationIn:"",animationOut:"",showDelay:0,hideDelay:0,closeOnClick:!0,closeOnEsc:!0,multipleOpened:!1,vOffset:100,hOffset:0,fullScreen:!1,btmOffsetPct:10,overlay:!0,resetOnClose:!1},i.prototype._init=function(){if(this.id=this.$element.attr("id"),this.isActive=!1,this.$anchor=e(e('[data-open="'+this.id+'"]').length?'[data-open="'+this.id+'"]':'[data-toggle="'+this.id+'"]'),this.$anchor.length){var i=this.$anchor[0].id||t.GetYoDigits(6,"reveal");this.$anchor.attr({"aria-controls":this.id,id:i,"aria-haspopup":!0,tabindex:0}),this.$element.attr({"aria-labelledby":i})}(this.options.fullScreen||this.$element.hasClass("full"))&&(this.options.fullScreen=!0,this.options.overlay=!1),this.options.overlay&&!this.$overlay&&(this.$overlay=this._makeOverlay(this.id)),this.$element.attr({role:"dialog","aria-hidden":!0,"data-yeti-box":this.id,"data-resize":this.id}),this._events()},i.prototype._makeOverlay=function(t){var i=e("<div></div>").addClass("reveal-overlay").attr({tabindex:-1,"aria-hidden":!0}).appendTo("body");return this.options.closeOnClick&&i.attr({"data-close":t}),i},i.prototype._events=function(){var t=this;this.$element.on({"open.zf.trigger":this.open.bind(this),"close.zf.trigger":this.close.bind(this),"toggle.zf.trigger":this.toggle.bind(this),"resizeme.zf.trigger":function(){t.$element.is(":visible")&&t._setPosition(function(){})}}),this.$anchor.length&&this.$anchor.on("keydown.zf.reveal",function(e){(13===e.which||32===e.which)&&(e.stopPropagation(),e.preventDefault(),t.open())}),this.options.closeOnClick&&this.options.overlay&&this.$overlay.off(".zf.reveal").on("click.zf.reveal",this.close.bind(this))},i.prototype._setPosition=function(e){var i=t.Box.GetDimensions(this.$element),n=this.options.fullScreen?"reveal full":i.height>=.5*i.windowDims.height?"reveal":"center";"reveal full"===n?this.$element.offset(t.Box.GetOffsets(this.$element,null,n,this.options.vOffset)).css({height:i.windowDims.height,width:i.windowDims.width}):t.MediaQuery.atLeast("medium")&&t.Box.ImNotTouchingYou(this.$element,null,!0,!1)?this.$element.css({"max-height":i.windowDims.height-this.options.vOffset*(this.options.btmOffsetPct/100+1),width:""}).offset(t.Box.GetOffsets(this.$element,null,n,this.options.vOffset)):(this.$element.css({width:i.windowDims.width-2*this.options.hOffset}).offset(t.Box.GetOffsets(this.$element,null,"center",this.options.vOffset,this.options.hOffset)),this.changedSize=!0),e()},i.prototype.open=function(){var i=this;this.isActive=!0,this.$element.css({visibility:"hidden"}).show().scrollTop(0),this._setPosition(function(){i.$element.hide().css({visibility:""}),i.options.multipleOpened||i.$element.trigger("closeme.zf.reveal",i.id),i.options.animationIn?i.options.overlay?t.Motion.animateIn(i.$overlay,"fade-in",function(){t.Motion.animateIn(i.$element,i.options.animationIn,function(){i.focusableElements=t.Keyboard.findFocusable(i.$element)})}):t.Motion.animateIn(i.$element,i.options.animationIn,function(){i.focusableElements=t.Keyboard.findFocusable(i.$element)}):i.options.overlay?i.$overlay.show(0,function(){i.$element.show(i.options.showDelay,function(){})}):i.$element.show(i.options.showDelay,function(){})}),this.$element.attr({"aria-hidden":!1}).attr("tabindex",-1).focus().trigger("open.zf.reveal"),e("body").addClass("is-reveal-open").attr({"aria-hidden":this.options.overlay||this.options.fullScreen?!0:!1}),setTimeout(function(){i._extraHandlers()},0)},i.prototype._extraHandlers=function(){var i=this;this.focusableElements=t.Keyboard.findFocusable(this.$element),this.options.overlay||!this.options.closeOnClick||this.options.fullScreen||e("body").on("click.zf.reveal",function(t){i.close()}),this.options.closeOnEsc&&e(window).on("keydown.zf.reveal",function(e){t.Keyboard.handleKey(e,"Reveal",{close:function(){i.options.closeOnEsc&&(i.close(),i.$anchor.focus())}}),0===i.focusableElements.length&&e.preventDefault()}),this.$element.on("keydown.zf.reveal",function(n){var s=e(this);t.Keyboard.handleKey(n,"Reveal",{tab_forward:function(){i.$element.find(":focus").is(i.focusableElements.eq(-1))&&(i.focusableElements.eq(0).focus(),n.preventDefault())},tab_backward:function(){(i.$element.find(":focus").is(i.focusableElements.eq(0))||i.$element.is(":focus"))&&(i.focusableElements.eq(-1).focus(),n.preventDefault())},open:function(){i.$element.find(":focus").is(i.$element.find("[data-close]"))?setTimeout(function(){i.$anchor.focus()},1):s.is(i.focusableElements)&&i.open()},close:function(){i.options.closeOnEsc&&(i.close(),i.$anchor.focus())}})})},i.prototype.close=function(){if(!this.isActive||!this.$element.is(":visible"))return!1;var i=this;this.options.animationOut?t.Motion.animateOut(this.$element,this.options.animationOut,function(){i.options.overlay&&t.Motion.animateOut(i.$overlay,"fade-out",function(){})}):this.$element.hide(i.options.hideDelay,function(){i.options.overlay&&i.$overlay.hide(0,function(){})}),this.options.closeOnEsc&&e(window).off("keydown.zf.reveal"),!this.options.overlay&&this.options.closeOnClick&&e("body").off("click.zf.reveal"),this.$element.off("keydown.zf.reveal"),this.changedSize&&this.$element.css({height:"",width:""}),e("body").removeClass("is-reveal-open").attr({"aria-hidden":!1,tabindex:""}),this.options.resetOnClose&&this.$element.html(this.$element.html()),this.isActive=!1,this.$element.attr({"aria-hidden":!0}).trigger("closed.zf.reveal")},i.prototype.toggle=function(){this.isActive?this.close():this.open()},i.prototype.destroy=function(){this.options.overlay&&this.$overlay.hide().off().remove(),this.$element.hide(),this.$anchor.off(),t.unregisterPlugin(this)},t.plugin(i,"Reveal"),"undefined"!=typeof module&&"undefined"!=typeof module.exports&&(module.exports=i),"function"==typeof define&&define(["foundation"],function(){return i})}(Foundation,jQuery),!function(t,e){"use strict";function i(n,s){this.$element=n,this.options=t.extend({},i.defaults,this.$element.data(),s),this._init(),e.registerPlugin(this,"Slider"),e.Keyboard.register("Slider",{ltr:{ARROW_RIGHT:"increase",ARROW_UP:"increase",ARROW_DOWN:"decrease",ARROW_LEFT:"decrease",SHIFT_ARROW_RIGHT:"increase_fast",SHIFT_ARROW_UP:"increase_fast",SHIFT_ARROW_DOWN:"decrease_fast",SHIFT_ARROW_LEFT:"decrease_fast"},rtl:{ARROW_LEFT:"increase",ARROW_RIGHT:"decrease",SHIFT_ARROW_LEFT:"increase_fast",SHIFT_ARROW_RIGHT:"decrease_fast"}})}function n(t,e){return t/e}function s(t,e,i,n){return Math.abs(t.position()[e]+t[n]()/2-i)}i.defaults={start:0,end:100,step:1,initialStart:0,initialEnd:100,binding:!1,clickSelect:!0,vertical:!1,draggable:!0,disabled:!1,doubleSided:!1,decimal:2,moveTime:200,disabledClass:"disabled"},i.prototype._init=function(){this.inputs=this.$element.find("input"),this.handles=this.$element.find("[data-slider-handle]"),this.$handle=this.handles.eq(0),this.$input=this.inputs.length?this.inputs.eq(0):t("#"+this.$handle.attr("aria-controls")),this.$fill=this.$element.find("[data-slider-fill]").css(this.options.vertical?"height":"width",0);var e=!1,i=this;(this.options.disabled||this.$element.hasClass(this.options.disabledClass))&&(this.options.disabled=!0,this.$element.addClass(this.options.disabledClass)),this.inputs.length||(this.inputs=t().add(this.$input),this.options.binding=!0),this._setInitAttr(0),this._events(this.$handle),this.handles[1]&&(this.options.doubleSided=!0,this.$handle2=this.handles.eq(1),this.$input2=this.inputs.length>1?this.inputs.eq(1):t("#"+this.$handle2.attr("aria-controls")),this.inputs[1]||(this.inputs=this.inputs.add(this.$input2)),e=!0,this._setHandlePos(this.$handle,this.options.initialStart,!0,function(){i._setHandlePos(i.$handle2,i.options.initialEnd)}),this._setInitAttr(1),this._events(this.$handle2)),e||this._setHandlePos(this.$handle,this.options.initialStart,!0)},i.prototype._setHandlePos=function(t,i,s,o){i=parseFloat(i),i<this.options.start?i=this.options.start:i>this.options.end&&(i=this.options.end);var a=this.options.doubleSided;if(a)if(0===this.handles.index(t)){var r=parseFloat(this.$handle2.attr("aria-valuenow"));i=i>=r?r-this.options.step:i}else{var l=parseFloat(this.$handle.attr("aria-valuenow"));i=l>=i?l+this.options.step:i}this.options.vertical&&!s&&(i=this.options.end-i);var d=this,h=this.options.vertical,u=h?"height":"width",f=h?"top":"left",c=t[0].getBoundingClientRect()[u]/2,p=this.$element[0].getBoundingClientRect()[u],m=n(i,this.options.end).toFixed(2),g=(p-c)*m,v=(100*n(g,p)).toFixed(this.options.decimal),i=i>0?parseFloat(i.toFixed(this.options.decimal)):0,w={};if(this._setValues(t,i),this.options.doubleSided){var y,$=0===this.handles.index(t);this.handles.index(t);if($)w[f]=(m>0?100*m:0)+"%",y=(100*(n(this.$handle2.position()[f]+c,p)-parseFloat(m))).toFixed(this.options.decimal)+"%",w["min-"+u]=y,o&&"function"==typeof o&&o();else{var b=parseFloat(this.$handle[0].style.left);i=(100>i?i:100)-(isNaN(b)?this.options.end-i:b),w["min-"+u]=i+"%"}}this.$element.one("finished.zf.animate",function(){d.animComplete=!0,d.$element.trigger("moved.zf.slider",[t])});var C=d.$element.data("dragging")?1e3/60:d.options.moveTime;e.Move(C,t,function(){t.css(f,v+"%"),d.options.doubleSided?d.$fill.css(w):d.$fill.css(u,100*m+"%")})},i.prototype._setInitAttr=function(t){var i=this.inputs.eq(t).attr("id")||e.GetYoDigits(6,"slider");this.inputs.eq(t).attr({id:i,max:this.options.end,min:this.options.start}),this.handles.eq(t).attr({role:"slider","aria-controls":i,"aria-valuemax":this.options.end,"aria-valuemin":this.options.start,"aria-valuenow":0===t?this.options.initialStart:this.options.initialEnd,"aria-orientation":this.options.vertical?"vertical":"horizontal",tabindex:0})},i.prototype._setValues=function(t,e){var i=this.options.doubleSided?this.handles.index(t):0;this.inputs.eq(i).val(e),t.attr("aria-valuenow",e)},i.prototype._handleEvent=function(t,e,i){var o,a;if(i)o=i,a=!0;else{t.preventDefault();var r=this.options.vertical,l=r?"height":"width",d=r?"top":"left",h=r?t.pageY:t.pageX,u=this.$handle[0].getBoundingClientRect()[l]/2,f=this.$element[0].getBoundingClientRect()[l],c=this.$element.offset()[d]-h,p=c>0?-u:-f>c-u?f:Math.abs(c),m=n(p,f);if(o=(this.options.end-this.options.start)*m,a=!1,!e){var g=s(this.$handle,d,p,l),v=s(this.$handle2,d,p,l);e=v>=g?this.$handle:this.$handle2}}this._setHandlePos(e,o,a)},i.prototype._events=function(i){if(this.options.disabled)return!1;var n,s=this;if(this.inputs.off("change.zf.slider").on("change.zf.slider",function(e){var i=s.inputs.index(t(this));s._handleEvent(e,s.handles.eq(i),t(this).val())}),this.options.clickSelect&&this.$element.off("click.zf.slider").on("click.zf.slider",function(t){return s.$element.data("dragging")?!1:(s.animComplete=!1,void(s.options.doubleSided?s._handleEvent(t):s._handleEvent(t,s.$handle)))}),this.options.draggable){this.handles.addTouch();var o=t("body");i.off("mousedown.zf.slider").on("mousedown.zf.slider",function(e){i.addClass("is-dragging"),s.$fill.addClass("is-dragging"),s.$element.data("dragging",!0),s.animComplete=!1,n=t(e.currentTarget),o.on("mousemove.zf.slider",function(t){t.preventDefault(),s._handleEvent(t,n)}).on("mouseup.zf.slider",function(t){s.animComplete=!0,s._handleEvent(t,n),i.removeClass("is-dragging"),s.$fill.removeClass("is-dragging"),s.$element.data("dragging",!1),o.off("mousemove.zf.slider mouseup.zf.slider")})})}i.off("keydown.zf.slider").on("keydown.zf.slider",function(i){var n,o=s.options.doubleSided?s.handles.index(t(this)):0,a=parseFloat(s.inputs.eq(o).val()),r=t(this);e.Keyboard.handleKey(i,"Slider",{decrease:function(){n=a-s.options.step},increase:function(){n=a+s.options.step},decrease_fast:function(){n=a-10*s.options.step},increase_fast:function(){n=a+10*s.options.step},handled:function(){i.preventDefault(),s._setHandlePos(r,n,!0)}})})},i.prototype.destroy=function(){this.handles.off(".zf.slider"),this.inputs.off(".zf.slider"),this.$element.off(".zf.slider"),e.unregisterPlugin(this)},e.plugin(i,"Slider")}(jQuery,window.Foundation),!function(t,e){"use strict";function i(n,s){this.$element=n,this.options=t.extend({},i.defaults,this.$element.data(),s),this._init(),e.registerPlugin(this,"Sticky")}function n(t){return parseInt(window.getComputedStyle(document.body,null).fontSize,10)*t}i.defaults={container:"<div data-sticky-container></div>",stickTo:"top",anchor:"",topAnchor:"",btmAnchor:"",marginTop:1,marginBottom:1,stickyOn:"medium",stickyClass:"sticky",containerClass:"sticky-container",checkEvery:-1},i.prototype._init=function(){var i=this.$element.parent("[data-sticky-container]"),n=this.$element[0].id||e.GetYoDigits(6,"sticky"),s=this;i.length||(this.wasWrapped=!0),this.$container=i.length?i:t(this.options.container).wrapInner(this.$element),this.$container.addClass(this.options.containerClass),this.$element.addClass(this.options.stickyClass).attr({"data-resize":n}),this.scrollCount=this.options.checkEvery,this.isStuck=!1,""!==this.options.anchor?this.$anchor=t("#"+this.options.anchor):this._parsePoints(),this._setSizes(function(){s._calc(!1)}),this._events(n.split("-").reverse().join("-"))},i.prototype._parsePoints=function(){var e=this.options.topAnchor,i=this.options.btmAnchor,n=[e,i],s={};if(e&&i)for(var o=0,a=n.length;a>o&&n[o];o++){var r;if("number"==typeof n[o])r=n[o];else{var l=n[o].split(":"),d=t("#"+l[0]);r=d.offset().top,l[1]&&"bottom"===l[1].toLowerCase()&&(r+=d[0].getBoundingClientRect().height)}s[o]=r}else s={0:1,1:document.documentElement.scrollHeight};this.points=s},i.prototype._events=function(e){var i=this,n=this.scrollListener="scroll.zf."+e;this.isOn||(this.canStick&&(this.isOn=!0,t(window).off(n).on(n,function(t){0===i.scrollCount?(i.scrollCount=i.options.checkEvery,i._setSizes(function(){i._calc(!1,window.pageYOffset)})):(i.scrollCount--,i._calc(!1,window.pageYOffset))})),this.$element.off("resizeme.zf.trigger").on("resizeme.zf.trigger",function(t,s){i._setSizes(function(){i._calc(!1),i.canStick?i.isOn||i._events(e):i.isOn&&i._pauseListeners(n)})}))},i.prototype._pauseListeners=function(e){this.isOn=!1,t(window).off(e),this.$element.trigger("pause.zf.sticky")},i.prototype._calc=function(t,e){return t&&this._setSizes(),this.canStick?(e||(e=window.pageYOffset),void(e>=this.topPoint?e<=this.bottomPoint?this.isStuck||this._setSticky():this.isStuck&&this._removeSticky(!1):this.isStuck&&this._removeSticky(!0))):(this.isStuck&&this._removeSticky(!0),!1)},i.prototype._setSticky=function(){var t=this.options.stickTo,e="top"===t?"marginTop":"marginBottom",i="top"===t?"bottom":"top",n={};n[e]=this.options[e]+"em",n[t]=0,n[i]="auto",n.left=this.$container.offset().left+parseInt(window.getComputedStyle(this.$container[0])["padding-left"],10),this.isStuck=!0,this.$element.removeClass("is-anchored is-at-"+i).addClass("is-stuck is-at-"+t).css(n).trigger("sticky.zf.stuckto:"+t)},i.prototype._removeSticky=function(t){var e=this.options.stickTo,i="top"===e,n={},s=(this.points?this.points[1]-this.points[0]:this.anchorHeight)-this.elemHeight,o=i?"marginTop":"marginBottom",a=i?"bottom":"top",r=t?"top":"bottom";n[o]=0,t&&!i||i&&!t?(n[e]=s,n[a]=0):(n[e]=0,n[a]=s),n.left="",this.isStuck=!1,this.$element.removeClass("is-stuck is-at-"+e).addClass("is-anchored is-at-"+r).css(n).trigger("sticky.zf.unstuckfrom:"+r)},i.prototype._setSizes=function(t){this.canStick=e.MediaQuery.atLeast(this.options.stickyOn),this.canStick||t();var i=this.$container[0].getBoundingClientRect().width,n=window.getComputedStyle(this.$container[0]),s=parseInt(n["padding-right"],10);this.$anchor&&this.$anchor.length?this.anchorHeight=this.$anchor[0].getBoundingClientRect().height:this._parsePoints(),this.$element.css({"max-width":i-s+"px"});var o=this.$element[0].getBoundingClientRect().height||this.containerHeight;this.containerHeight=o,this.$container.css({height:o}),this.elemHeight=o,this.isStuck&&this.$element.css({left:this.$container.offset().left+parseInt(n["padding-left"],10)}),this._setBreakPoints(o,function(){t&&t()})},i.prototype._setBreakPoints=function(t,e){if(!this.canStick){if(!e)return!1;e()}var i=n(this.options.marginTop),s=n(this.options.marginBottom),o=this.points?this.points[0]:this.$anchor.offset().top,a=this.points?this.points[1]:o+this.anchorHeight,r=window.innerHeight;"top"===this.options.stickTo?(o-=i,a-=t+i):"bottom"===this.options.stickTo&&(o-=r-(t+s),a-=r-s),this.topPoint=o,this.bottomPoint=a,e&&e()},i.prototype.destroy=function(){this._removeSticky(!0),this.$element.removeClass(this.options.stickyClass+" is-anchored is-at-top").css({height:"",top:"",bottom:"","max-width":""}).off("resizeme.zf.trigger"),this.$anchor.off("change.zf.sticky"),t(window).off(this.scrollListener),this.wasWrapped?this.$element.unwrap():this.$container.removeClass(this.options.containerClass).css({height:""}),e.unregisterPlugin(this)},e.plugin(i,"Sticky")}(jQuery,window.Foundation),!function(t,e){"use strict";function i(n,s){this.$element=n,this.options=t.extend({},i.defaults,this.$element.data(),s),this._init(),e.registerPlugin(this,"Tabs"),e.Keyboard.register("Tabs",{ENTER:"open",SPACE:"open",ARROW_RIGHT:"next",ARROW_UP:"previous",ARROW_DOWN:"next",ARROW_LEFT:"previous"})}i.defaults={autoFocus:!1,wrapOnKeys:!0,matchHeight:!1,linkClass:"tabs-title",panelClass:"tabs-panel"},i.prototype._init=function(){var i=this;if(this.$tabTitles=this.$element.find("."+this.options.linkClass),this.$tabContent=t('[data-tabs-content="'+this.$element[0].id+'"]'),this.$tabTitles.each(function(){var e=t(this),n=e.find("a"),s=e.hasClass("is-active"),o=n.attr("href").slice(1),a=o+"-label",r=t(o);e.attr({role:"presentation"}),n.attr({role:"tab","aria-controls":o,"aria-selected":s,id:a}),r.attr({role:"tabpanel","aria-hidden":!s,"aria-labelledby":a}),s&&i.options.autoFocus&&n.focus()}),this.options.matchHeight){var n=this.$tabContent.find("img");n.length?e.onImagesLoaded(n,this._setHeight.bind(this)):this._setHeight()}this._events()},i.prototype._events=function(){this._addKeyHandler(),this._addClickHandler(),this.options.matchHeight&&t(window).on("changed.zf.mediaquery",this._setHeight.bind(this))},i.prototype._addClickHandler=function(){var e=this;this.$element.off("click.zf.tabs").on("click.zf.tabs","."+this.options.linkClass,function(i){i.preventDefault(),i.stopPropagation(),t(this).hasClass("is-active")||e._handleTabChange(t(this))})},i.prototype._addKeyHandler=function(){var i=this;i.$element.find("li:first-of-type"),i.$element.find("li:last-of-type");this.$tabTitles.off("keydown.zf.tabs").on("keydown.zf.tabs",function(n){if(9!==n.which){n.stopPropagation(),n.preventDefault();var s,o,a=t(this),r=a.parent("ul").children("li");r.each(function(e){return t(this).is(a)?void(i.options.wrapOnKeys?(s=0===e?r.last():r.eq(e-1),o=e===r.length-1?r.first():r.eq(e+1)):(s=r.eq(Math.max(0,e-1)),o=r.eq(Math.min(e+1,r.length-1)))):void 0}),e.Keyboard.handleKey(n,"Tabs",{open:function(){a.find('[role="tab"]').focus(),i._handleTabChange(a)},previous:function(){s.find('[role="tab"]').focus(),i._handleTabChange(s)},next:function(){o.find('[role="tab"]').focus(),i._handleTabChange(o)}})}})},i.prototype._handleTabChange=function(e){var i=e.find('[role="tab"]'),n=i.attr("href"),s=t(n),o=this.$element.find("."+this.options.linkClass+".is-active").removeClass("is-active").find('[role="tab"]').attr({"aria-selected":"false"}).attr("href");t(o).removeClass("is-active").attr({"aria-hidden":"true"}),e.addClass("is-active"),i.attr({"aria-selected":"true"}),s.addClass("is-active").attr({"aria-hidden":"false"}),this.$element.trigger("change.zf.tabs",[e])},i.prototype.selectTab=function(t){var e;e="object"==typeof t?t[0].id:t,e.indexOf("#")<0&&(e="#"+e);var i=this.$tabTitles.find('[href="'+e+'"]').parent("."+this.options.linkClass);this._handleTabChange(i)},i.prototype._setHeight=function(){var e=0;this.$tabContent.find("."+this.options.panelClass).css("height","").each(function(){var i=t(this),n=i.hasClass("is-active");n||i.css({visibility:"hidden",display:"block"});var s=this.getBoundingClientRect().height;n||i.css({visibility:"",display:""}),e=s>e?s:e}).css("height",e+"px")},i.prototype.destroy=function(){this.$element.find("."+this.options.linkClass).off(".zf.tabs").hide().end().find("."+this.options.panelClass).hide(),this.options.matchHeight&&t(window).off("changed.zf.mediaquery"),e.unregisterPlugin(this)},e.plugin(i,"Tabs")}(jQuery,window.Foundation),!function(t,e){"use strict";function i(n,s){this.$element=n,this.options=e.extend({},i.defaults,n.data(),s),this.className="",this._init(),this._events(),t.registerPlugin(this,"Toggler")}i.defaults={animate:!1},i.prototype._init=function(){var t;this.options.animate?(t=this.options.animate.split(" "),this.animationIn=t[0],this.animationOut=t[1]||null):(t=this.$element.data("toggler"),this.className="."===t[0]?t.slice(1):t);var i=this.$element[0].id;e('[data-open="'+i+'"], [data-close="'+i+'"], [data-toggle="'+i+'"]').attr("aria-controls",i),this.$element.attr("aria-expanded",this.$element.is(":hidden")?!1:!0)},i.prototype._events=function(){this.$element.off("toggle.zf.trigger").on("toggle.zf.trigger",this.toggle.bind(this))},i.prototype.toggle=function(){this[this.options.animate?"_toggleAnimate":"_toggleClass"]()},i.prototype._toggleClass=function(){this.$element.toggleClass(this.className);var t=this.$element.hasClass(this.className);t?this.$element.trigger("on.zf.toggler"):this.$element.trigger("off.zf.toggler"),this._updateARIA(t)},i.prototype._toggleAnimate=function(){var e=this;this.$element.is(":hidden")?t.Motion.animateIn(this.$element,this.animationIn,function(){this.trigger("on.zf.toggler"),e._updateARIA(!0)}):t.Motion.animateOut(this.$element,this.animationOut,function(){this.trigger("off.zf.toggler"),e._updateARIA(!1)})},i.prototype._updateARIA=function(t){this.$element.attr("aria-expanded",t?!0:!1)},i.prototype.destroy=function(){this.$element.off(".zf.toggler"),t.unregisterPlugin(this)},t.plugin(i,"Toggler"),"undefined"!=typeof module&&"undefined"!=typeof module.exports&&(module.exports=i),"function"==typeof define&&define(["foundation"],function(){return i})}(Foundation,jQuery),!function(t,e,i){"use strict";function n(e,s){this.$element=e,this.options=t.extend({},n.defaults,this.$element.data(),s),this.isActive=!1,this.isClick=!1,this._init(),i.registerPlugin(this,"Tooltip")}n.defaults={disableForTouch:!1,hoverDelay:200,fadeInDuration:150,fadeOutDuration:150,disableHover:!1,templateClasses:"",tooltipClass:"tooltip",triggerClass:"has-tip",showOn:"small",template:"",tipText:"",touchCloseText:"Tap to close.",clickOpen:!0,positionClass:"",vOffset:10,hOffset:12},n.prototype._init=function(){var n=this.$element.attr("aria-describedby")||i.GetYoDigits(6,"tooltip");this.options.positionClass=this._getPositionClass(this.$element),this.options.tipText=this.options.tipText||this.$element.attr("title"),this.template=this.options.template?t(this.options.template):this._buildTemplate(n),this.template.appendTo(e.body).text(this.options.tipText).hide(),this.$element.attr({title:"","aria-describedby":n,"data-yeti-box":n,"data-toggle":n,"data-resize":n}).addClass(this.triggerClass),this.usedPositions=[],this.counter=4,this.classChanged=!1,this._events()},n.prototype._getPositionClass=function(t){if(!t)return"";var e=t[0].className.match(/(top|left|right)/g);return e=e?e[0]:""},n.prototype._buildTemplate=function(e){var i=(this.options.tooltipClass+" "+this.options.positionClass).trim(),n=t("<div></div>").addClass(i).attr({role:"tooltip","aria-hidden":!0,"data-is-active":!1,"data-is-focus":!1,id:e});return n},n.prototype._reposition=function(t){this.usedPositions.push(t?t:"bottom"),!t&&this.usedPositions.indexOf("top")<0?this.template.addClass("top"):"top"===t&&this.usedPositions.indexOf("bottom")<0?this.template.removeClass(t):"left"===t&&this.usedPositions.indexOf("right")<0?this.template.removeClass(t).addClass("right"):"right"===t&&this.usedPositions.indexOf("left")<0?this.template.removeClass(t).addClass("left"):!t&&this.usedPositions.indexOf("top")>-1&&this.usedPositions.indexOf("left")<0?this.template.addClass("left"):"top"===t&&this.usedPositions.indexOf("bottom")>-1&&this.usedPositions.indexOf("left")<0?this.template.removeClass(t).addClass("left"):"left"===t&&this.usedPositions.indexOf("right")>-1&&this.usedPositions.indexOf("bottom")<0?this.template.removeClass(t):"right"===t&&this.usedPositions.indexOf("left")>-1&&this.usedPositions.indexOf("bottom")<0?this.template.removeClass(t):this.template.removeClass(t),this.classChanged=!0,this.counter--},n.prototype._setPosition=function(){var t=this._getPositionClass(this.template),e=i.Box.GetDimensions(this.template),n=i.Box.GetDimensions(this.$element),s="left"===t?"left":"right"===t?"left":"top",o="top"===s?"height":"width";"height"===o?this.options.vOffset:this.options.hOffset;if(e.width>=e.windowDims.width||!this.counter&&!i.Box.ImNotTouchingYou(this.template))return this.template.offset(i.Box.GetOffsets(this.template,this.$element,"center bottom",this.options.vOffset,this.options.hOffset,!0)).css({width:n.windowDims.width-2*this.options.hOffset,height:"auto"}),!1;for(this.template.offset(i.Box.GetOffsets(this.template,this.$element,"center "+(t||"bottom"),this.options.vOffset,this.options.hOffset));!i.Box.ImNotTouchingYou(this.template)&&this.counter;)this._reposition(t),this._setPosition()},n.prototype.show=function(){if("all"!==this.options.showOn&&!i.MediaQuery.atLeast(this.options.showOn))return!1;var t=this;this.template.css("visibility","hidden").show(),this._setPosition(),this.$element.trigger("closeme.zf.tooltip",this.template.attr("id")),this.template.attr({"data-is-active":!0,"aria-hidden":!1}),t.isActive=!0,this.template.stop().hide().css("visibility","").fadeIn(this.options.fadeInDuration,function(){}),this.$element.trigger("show.zf.tooltip")},n.prototype.hide=function(){var t=this;this.template.stop().attr({"aria-hidden":!0,"data-is-active":!1}).fadeOut(this.options.fadeOutDuration,function(){t.isActive=!1,t.isClick=!1,t.classChanged&&(t.template.removeClass(t._getPositionClass(t.template)).addClass(t.options.positionClass),t.usedPositions=[],t.counter=4,t.classChanged=!1)}),this.$element.trigger("hide.zf.tooltip")},n.prototype._events=function(){var t=this,e=(this.template,!1);this.options.disableHover||this.$element.on("mouseenter.zf.tooltip",function(e){t.isActive||(t.timeout=setTimeout(function(){t.show()},t.options.hoverDelay))}).on("mouseleave.zf.tooltip",function(i){clearTimeout(t.timeout),(!e||!t.isClick&&t.options.clickOpen)&&t.hide()}),this.options.clickOpen&&this.$element.on("mousedown.zf.tooltip",function(e){e.stopImmediatePropagation(),t.isClick?t.hide():(t.isClick=!0,!t.options.disableHover&&t.$element.attr("tabindex")||t.isActive||t.show())}),this.options.disableForTouch||this.$element.on("tap.zf.tooltip touchend.zf.tooltip",function(e){t.isActive?t.hide():t.show()}),this.$element.on({"close.zf.trigger":this.hide.bind(this)}),this.$element.on("focus.zf.tooltip",function(i){return e=!0,t.isClick?!1:void t.show()}).on("focusout.zf.tooltip",function(i){e=!1,t.isClick=!1,t.hide()}).on("resizeme.zf.trigger",function(){t.isActive&&t._setPosition()})},n.prototype.toggle=function(){this.isActive?this.hide():this.show()},n.prototype.destroy=function(){this.$element.attr("title",this.template.text()).off(".zf.trigger .zf.tootip").removeAttr("aria-describedby").removeAttr("data-yeti-box").removeAttr("data-toggle").removeAttr("data-resize"),this.template.remove(),i.unregisterPlugin(this)},i.plugin(n,"Tooltip")}(jQuery,window.document,window.Foundation);
;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.abide = {
    name : 'abide',

    version : '5.5.3',

    settings : {
      live_validate : true, // validate the form as you go
      validate_on_blur : true, // validate whenever you focus/blur on an input field
      // validate_on: 'tab', // tab (when user tabs between fields), change (input changes), manual (call custom events)

      focus_on_invalid : true, // automatically bring the focus to an invalid input field
      error_labels : true, // labels with a for="inputId" will receive an `error` class
      error_class : 'error', // labels with a for="inputId" will receive an `error` class
      // the amount of time Abide will take before it validates the form (in ms).
      // smaller time will result in faster validation
      timeout : 1000,
      patterns : {
        alpha : /^[a-zA-Z]+$/,
        alpha_numeric : /^[a-zA-Z0-9]+$/,
        integer : /^[-+]?\d+$/,
        number : /^[-+]?\d*(?:[\.\,]\d+)?$/,

        // amex, visa, diners
        card : /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
        cvv : /^([0-9]){3,4}$/,

        // http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#valid-e-mail-address
        email : /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/,

        // http://blogs.lse.ac.uk/lti/2008/04/23/a-regular-expression-to-match-any-url/
        url: /^(https?|ftp|file|ssh):\/\/([-;:&=\+\$,\w]+@{1})?([-A-Za-z0-9\.]+)+:?(\d+)?((\/[-\+~%\/\.\w]+)?\??([-\+=&;%@\.\w]+)?#?([\w]+)?)?/,
        // abc.de
        domain : /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,8}$/,

        datetime : /^([0-2][0-9]{3})\-([0-1][0-9])\-([0-3][0-9])T([0-5][0-9])\:([0-5][0-9])\:([0-5][0-9])(Z|([\-\+]([0-1][0-9])\:00))$/,
        // YYYY-MM-DD
        date : /(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))$/,
        // HH:MM:SS
        time : /^(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9]){2}$/,
        dateISO : /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/,
        // MM/DD/YYYY
        month_day_year : /^(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.]\d{4}$/,
        // DD/MM/YYYY
        day_month_year : /^(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|1[012])[- \/.]\d{4}$/,

        // #FFF or #FFFFFF
        color : /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/
      },
      validators : {
        equalTo : function (el, required, parent) {
          var from  = document.getElementById(el.getAttribute(this.add_namespace('data-equalto'))).value,
              to    = el.value,
              valid = (from === to);

          return valid;
        }
      }
    },

    timer : null,

    init : function (scope, method, options) {
      this.bindings(method, options);
    },

    events : function (scope) {
      var self = this,
          form = self.S(scope).attr('novalidate', 'novalidate'),
          settings = form.data(this.attr_name(true) + '-init') || {};

      this.invalid_attr = this.add_namespace('data-invalid');

      function validate(originalSelf, e) {
        clearTimeout(self.timer);
        self.timer = setTimeout(function () {
          self.validate([originalSelf], e);
        }.bind(originalSelf), settings.timeout);
      }

      form
        .off('.abide')
        .on('submit.fndtn.abide', function (e) {
          var is_ajax = /ajax/i.test(self.S(this).attr(self.attr_name()));
          return self.validate(self.S(this).find('input, textarea, select').not(":hidden, [data-abide-ignore]").get(), e, is_ajax);
        })
        .on('validate.fndtn.abide', function (e) {
          if (settings.validate_on === 'manual') {
            self.validate([e.target], e);
          }
        })
        .on('reset', function (e) {
          return self.reset($(this), e);
        })
        .find('input, textarea, select').not(":hidden, [data-abide-ignore]")
          .off('.abide')
          .on('blur.fndtn.abide change.fndtn.abide', function (e) {
              var id = this.getAttribute('id'),
                  eqTo = form.find('[data-equalto="'+ id +'"]');
            // old settings fallback
            // will be deprecated with F6 release
            if (settings.validate_on_blur && settings.validate_on_blur === true) {
              validate(this, e);
            }
            // checks if there is an equalTo equivalent related by id
            if(typeof eqTo.get(0) !== "undefined" && eqTo.val().length){
              validate(eqTo.get(0),e);
            }
            // new settings combining validate options into one setting
            if (settings.validate_on === 'change') {
              validate(this, e);
            }
          })
          .on('keydown.fndtn.abide', function (e) {
            var id = this.getAttribute('id'),
                eqTo = form.find('[data-equalto="'+ id +'"]');
            // old settings fallback
            // will be deprecated with F6 release
            if (settings.live_validate && settings.live_validate === true && e.which != 9) {
              validate(this, e);
            }
            // checks if there is an equalTo equivalent related by id
            if(typeof eqTo.get(0) !== "undefined" && eqTo.val().length){
              validate(eqTo.get(0),e);
            }
            // new settings combining validate options into one setting
            if (settings.validate_on === 'tab' && e.which === 9) {
              validate(this, e);
            }
            else if (settings.validate_on === 'change') {
              validate(this, e);
            }
          })
          .on('focus', function (e) {
            if (navigator.userAgent.match(/iPad|iPhone|Android|BlackBerry|Windows Phone|webOS/i)) {
              $('html, body').animate({
                  scrollTop: $(e.target).offset().top
              }, 100);
            }
          });
    },

    reset : function (form, e) {
      var self = this;
      form.removeAttr(self.invalid_attr);

      $('[' + self.invalid_attr + ']', form).removeAttr(self.invalid_attr);
      $('.' + self.settings.error_class, form).not('small').removeClass(self.settings.error_class);
      $(':input', form).not(':button, :submit, :reset, :hidden, [data-abide-ignore]').val('').removeAttr(self.invalid_attr);
    },

    validate : function (els, e, is_ajax) {
      var validations = this.parse_patterns(els),
          validation_count = validations.length,
          form = this.S(els[0]).closest('form'),
          submit_event = /submit/.test(e.type);

      // Has to count up to make sure the focus gets applied to the top error
      for (var i = 0; i < validation_count; i++) {
        if (!validations[i] && (submit_event || is_ajax)) {
          if (this.settings.focus_on_invalid) {
            els[i].focus();
          }
          form.trigger('invalid.fndtn.abide');
          this.S(els[i]).closest('form').attr(this.invalid_attr, '');
          return false;
        }
      }

      if (submit_event || is_ajax) {
        form.trigger('valid.fndtn.abide');
      }

      form.removeAttr(this.invalid_attr);

      if (is_ajax) {
        return false;
      }

      return true;
    },

    parse_patterns : function (els) {
      var i = els.length,
          el_patterns = [];

      while (i--) {
        el_patterns.push(this.pattern(els[i]));
      }

      return this.check_validation_and_apply_styles(el_patterns);
    },

    pattern : function (el) {
      var type = el.getAttribute('type'),
          required = typeof el.getAttribute('required') === 'string';

      var pattern = el.getAttribute('pattern') || '';

      if (this.settings.patterns.hasOwnProperty(pattern) && pattern.length > 0) {
        return [el, this.settings.patterns[pattern], required];
      } else if (pattern.length > 0) {
        return [el, new RegExp(pattern), required];
      }

      if (this.settings.patterns.hasOwnProperty(type)) {
        return [el, this.settings.patterns[type], required];
      }

      pattern = /.*/;

      return [el, pattern, required];
    },

    // TODO: Break this up into smaller methods, getting hard to read.
    check_validation_and_apply_styles : function (el_patterns) {
      var i = el_patterns.length,
          validations = [];
      if (i == 0) {
        return validations;
      }
      var form = this.S(el_patterns[0][0]).closest('[data-' + this.attr_name(true) + ']'),
          settings = form.data(this.attr_name(true) + '-init') || {};
      while (i--) {
        var el = el_patterns[i][0],
            required = el_patterns[i][2],
            value = el.value.trim(),
            direct_parent = this.S(el).parent(),
            validator = el.getAttribute(this.add_namespace('data-abide-validator')),
            is_radio = el.type === 'radio',
            is_checkbox = el.type === 'checkbox',
            label = this.S('label[for="' + el.getAttribute('id') + '"]'),
            valid_length = (required) ? (el.value.length > 0) : true,
            el_validations = [];

        var parent, valid;

        // support old way to do equalTo validations
        if (el.getAttribute(this.add_namespace('data-equalto'))) { validator = 'equalTo' }

        if (!direct_parent.is('label')) {
          parent = direct_parent;
        } else {
          parent = direct_parent.parent();
        }

        if (is_radio && required) {
          el_validations.push(this.valid_radio(el, required));
        } else if (is_checkbox && required) {
          el_validations.push(this.valid_checkbox(el, required));

        } else if (validator) {
          // Validate using each of the specified (space-delimited) validators.
          var validators = validator.split(' ');
          var last_valid = true, all_valid = true;
          for (var iv = 0; iv < validators.length; iv++) {
              valid = this.settings.validators[validators[iv]].apply(this, [el, required, parent])
              el_validations.push(valid);
              all_valid = valid && last_valid;
              last_valid = valid;
          }
          if (all_valid) {
              this.S(el).removeAttr(this.invalid_attr);
              parent.removeClass('error');
              if (label.length > 0 && this.settings.error_labels) {
                label.removeClass(this.settings.error_class).removeAttr('role');
              }
              $(el).triggerHandler('valid');
          } else {
              this.S(el).attr(this.invalid_attr, '');
              parent.addClass('error');
              if (label.length > 0 && this.settings.error_labels) {
                label.addClass(this.settings.error_class).attr('role', 'alert');
              }
              $(el).triggerHandler('invalid');
          }
        } else {

          if (el_patterns[i][1].test(value) && valid_length ||
            !required && el.value.length < 1 || $(el).attr('disabled')) {
            el_validations.push(true);
          } else {
            el_validations.push(false);
          }

          el_validations = [el_validations.every(function (valid) {return valid;})];
          if (el_validations[0]) {
            this.S(el).removeAttr(this.invalid_attr);
            el.setAttribute('aria-invalid', 'false');
            el.removeAttribute('aria-describedby');
            parent.removeClass(this.settings.error_class);
            if (label.length > 0 && this.settings.error_labels) {
              label.removeClass(this.settings.error_class).removeAttr('role');
            }
            $(el).triggerHandler('valid');
          } else {
            this.S(el).attr(this.invalid_attr, '');
            el.setAttribute('aria-invalid', 'true');

            // Try to find the error associated with the input
            var errorElem = parent.find('small.' + this.settings.error_class, 'span.' + this.settings.error_class);
            var errorID = errorElem.length > 0 ? errorElem[0].id : '';
            if (errorID.length > 0) {
              el.setAttribute('aria-describedby', errorID);
            }

            // el.setAttribute('aria-describedby', $(el).find('.error')[0].id);
            parent.addClass(this.settings.error_class);
            if (label.length > 0 && this.settings.error_labels) {
              label.addClass(this.settings.error_class).attr('role', 'alert');
            }
            $(el).triggerHandler('invalid');
          }
        }
        validations = validations.concat(el_validations);
      }

      return validations;
    },

    valid_checkbox : function (el, required) {
      var el = this.S(el),
          valid = (el.is(':checked') || !required || el.get(0).getAttribute('disabled'));

      if (valid) {
        el.removeAttr(this.invalid_attr).parent().removeClass(this.settings.error_class);
        $(el).triggerHandler('valid');
      } else {
        el.attr(this.invalid_attr, '').parent().addClass(this.settings.error_class);
        $(el).triggerHandler('invalid');
      }

      return valid;
    },

    valid_radio : function (el, required) {
      var name = el.getAttribute('name'),
          group = this.S(el).closest('[data-' + this.attr_name(true) + ']').find("[name='" + name + "']"),
          count = group.length,
          valid = false,
          disabled = false;

      // Has to count up to make sure the focus gets applied to the top error
      for (var i=0; i < count; i++) {
        if( group[i].getAttribute('disabled') ){
          disabled=true;
          valid=true;
        } else {
          if (group[i].checked){
            valid = true;
          } else {
            if( disabled ){
              valid = false;
            }
          }
        }
      }

      // Has to count up to make sure the focus gets applied to the top error
      for (var i = 0; i < count; i++) {
        if (valid) {
          this.S(group[i]).removeAttr(this.invalid_attr).parent().removeClass(this.settings.error_class);
          $(group[i]).triggerHandler('valid');
        } else {
          this.S(group[i]).attr(this.invalid_attr, '').parent().addClass(this.settings.error_class);
          $(group[i]).triggerHandler('invalid');
        }
      }

      return valid;
    },

    valid_equal : function (el, required, parent) {
      var from  = document.getElementById(el.getAttribute(this.add_namespace('data-equalto'))).value,
          to    = el.value,
          valid = (from === to);

      if (valid) {
        this.S(el).removeAttr(this.invalid_attr);
        parent.removeClass(this.settings.error_class);
        if (label.length > 0 && settings.error_labels) {
          label.removeClass(this.settings.error_class);
        }
      } else {
        this.S(el).attr(this.invalid_attr, '');
        parent.addClass(this.settings.error_class);
        if (label.length > 0 && settings.error_labels) {
          label.addClass(this.settings.error_class);
        }
      }

      return valid;
    },

    valid_oneof : function (el, required, parent, doNotValidateOthers) {
      var el = this.S(el),
        others = this.S('[' + this.add_namespace('data-oneof') + ']'),
        valid = others.filter(':checked').length > 0;

      if (valid) {
        el.removeAttr(this.invalid_attr).parent().removeClass(this.settings.error_class);
      } else {
        el.attr(this.invalid_attr, '').parent().addClass(this.settings.error_class);
      }

      if (!doNotValidateOthers) {
        var _this = this;
        others.each(function () {
          _this.valid_oneof.call(_this, this, null, null, true);
        });
      }

      return valid;
    },

    reflow : function(scope, options) {
      var self = this,
          form = self.S('[' + this.attr_name() + ']').attr('novalidate', 'novalidate');
          self.S(form).each(function (idx, el) {
            self.events(el);
          });
    }
  };
}(jQuery, window, window.document));
;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.accordion = {
    name : 'accordion',

    version : '5.5.3',

    settings : {
      content_class : 'content',
      active_class : 'active',
      multi_expand : false,
      toggleable : true,
      callback : function () {}
    },

    init : function (scope, method, options) {
      this.bindings(method, options);
    },

    events : function (instance) {
      var self = this;
      var S = this.S;
      self.create(this.S(instance));

      S(this.scope)
      .off('.fndtn.accordion')
      .on('click.fndtn.accordion', '[' + this.attr_name() + '] > dd > a, [' + this.attr_name() + '] > li > a', function (e) {
        var accordion = S(this).closest('[' + self.attr_name() + ']'),
            groupSelector = self.attr_name() + '=' + accordion.attr(self.attr_name()),
            settings = accordion.data(self.attr_name(true) + '-init') || self.settings,
            target = S('#' + this.href.split('#')[1]),
            aunts = $('> dd, > li', accordion),
            siblings = aunts.children('.' + settings.content_class),
            active_content = siblings.filter('.' + settings.active_class);

        e.preventDefault();

        if (accordion.attr(self.attr_name())) {
          siblings = siblings.add('[' + groupSelector + '] dd > ' + '.' + settings.content_class + ', [' + groupSelector + '] li > ' + '.' + settings.content_class);
          aunts = aunts.add('[' + groupSelector + '] dd, [' + groupSelector + '] li');
        }

        if (settings.toggleable && target.is(active_content)) {
          target.parent('dd, li').toggleClass(settings.active_class, false);
          target.toggleClass(settings.active_class, false);
          S(this).attr('aria-expanded', function(i, attr){
              return attr === 'true' ? 'false' : 'true';
          });
          settings.callback(target);
          target.triggerHandler('toggled', [accordion]);
          accordion.triggerHandler('toggled', [target]);
          return;
        }

        if (!settings.multi_expand) {
          siblings.removeClass(settings.active_class);
          aunts.removeClass(settings.active_class);
          aunts.children('a').attr('aria-expanded','false');
        }

        target.addClass(settings.active_class).parent().addClass(settings.active_class);
        settings.callback(target);
        target.triggerHandler('toggled', [accordion]);
        accordion.triggerHandler('toggled', [target]);
        S(this).attr('aria-expanded','true');
      });
    },

    create: function($instance) {
      var self = this,
          accordion = $instance,
          aunts = $('> .accordion-navigation', accordion),
          settings = accordion.data(self.attr_name(true) + '-init') || self.settings;

      aunts.children('a').attr('aria-expanded','false');
      aunts.has('.' + settings.content_class + '.' + settings.active_class).addClass(settings.active_class).children('a').attr('aria-expanded','true');

      if (settings.multi_expand) {
        $instance.attr('aria-multiselectable','true');
      }
    },
	
  	toggle : function(options) {
  		var options = typeof options !== 'undefined' ? options : {};
  		var selector = typeof options.selector !== 'undefined' ? options.selector : '';
  		var toggle_state = typeof options.toggle_state !== 'undefined' ? options.toggle_state : '';
  		var $accordion = typeof options.$accordion !== 'undefined' ? options.$accordion : this.S(this.scope).closest('[' + this.attr_name() + ']');
  
  		var $items = $accordion.find('> dd' + selector + ', > li' + selector);
  		if ( $items.length < 1 ) {
  			if ( window.console ) {
  				console.error('Selection not found.', selector);
  			}
  			return false;
  		}
  
  		var S = this.S;
  		var active_class = this.settings.active_class;
  		$items.each(function() {
  			var $item = S(this);
  			var is_active = $item.hasClass(active_class);
  			if ( ( is_active && toggle_state === 'close' ) || ( !is_active && toggle_state === 'open' ) || toggle_state === '' ) {
  				$item.find('> a').trigger('click.fndtn.accordion');
  			}
  		});
  	},
  
  	open : function(options) {
  		var options = typeof options !== 'undefined' ? options : {};
  		options.toggle_state = 'open';
  		this.toggle(options);
  	},
  
  	close : function(options) {
  		var options = typeof options !== 'undefined' ? options : {};
  		options.toggle_state = 'close';
  		this.toggle(options);
  	},	

    off : function () {},

    reflow : function () {}
  };
}(jQuery, window, window.document));
;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.alert = {
    name : 'alert',

    version : '5.5.3',

    settings : {
      callback : function () {}
    },

    init : function (scope, method, options) {
      this.bindings(method, options);
    },

    events : function () {
      var self = this,
          S = this.S;

      $(this.scope).off('.alert').on('click.fndtn.alert', '[' + this.attr_name() + '] .close', function (e) {
        var alertBox = S(this).closest('[' + self.attr_name() + ']'),
            settings = alertBox.data(self.attr_name(true) + '-init') || self.settings;

        e.preventDefault();
        if (Modernizr.csstransitions) {
          alertBox.addClass('alert-close');
          alertBox.on('transitionend webkitTransitionEnd oTransitionEnd', function (e) {
            S(this).trigger('close.fndtn.alert').remove();
            settings.callback();
          });
        } else {
          alertBox.fadeOut(300, function () {
            S(this).trigger('close.fndtn.alert').remove();
            settings.callback();
          });
        }
      });
    },

    reflow : function () {}
  };
}(jQuery, window, window.document));
;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.clearing = {
    name : 'clearing',

    version : '5.5.3',

    settings : {
      templates : {
        viewing : '<a href="#" class="clearing-close">&times;</a>' +
          '<div class="visible-img" style="display: none"><div class="clearing-touch-label"></div><img src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D" alt="" />' +
          '<p class="clearing-caption"></p><a href="#" class="clearing-main-prev"><span></span></a>' +
          '<a href="#" class="clearing-main-next"><span></span></a></div>' +
          '<img class="clearing-preload-next" style="display: none" src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D" alt="" />' +
          '<img class="clearing-preload-prev" style="display: none" src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D" alt="" />'
      },

      // comma delimited list of selectors that, on click, will close clearing,
      // add 'div.clearing-blackout, div.visible-img' to close on background click
      close_selectors : '.clearing-close, div.clearing-blackout',

      // Default to the entire li element.
      open_selectors : '',

      // Image will be skipped in carousel.
      skip_selector : '',

      touch_label : '',

      // event initializer and locks
      init : false,
      locked : false
    },

    init : function (scope, method, options) {
      var self = this;
      Foundation.inherit(this, 'throttle image_loaded');

      this.bindings(method, options);

      if (self.S(this.scope).is('[' + this.attr_name() + ']')) {
        this.assemble(self.S('li', this.scope));
      } else {
        self.S('[' + this.attr_name() + ']', this.scope).each(function () {
          self.assemble(self.S('li', this));
        });
      }
    },

    events : function (scope) {
      var self = this,
          S = self.S,
          $scroll_container = $('.scroll-container');

      if ($scroll_container.length > 0) {
        this.scope = $scroll_container;
      }

      S(this.scope)
        .off('.clearing')
        .on('click.fndtn.clearing', 'ul[' + this.attr_name() + '] li ' + this.settings.open_selectors,
          function (e, current, target) {
            var current = current || S(this),
                target = target || current,
                next = current.next('li'),
                settings = current.closest('[' + self.attr_name() + ']').data(self.attr_name(true) + '-init'),
                image = S(e.target);

            e.preventDefault();

            if (!settings) {
              self.init();
              settings = current.closest('[' + self.attr_name() + ']').data(self.attr_name(true) + '-init');
            }

            // if clearing is open and the current image is
            // clicked, go to the next image in sequence
            if (target.hasClass('visible') &&
              current[0] === target[0] &&
              next.length > 0 && self.is_open(current)) {
              target = next;
              image = S('img', target);
            }

            // set current and target to the clicked li if not otherwise defined.
            self.open(image, current, target);
            self.update_paddles(target);
          })

        .on('click.fndtn.clearing', '.clearing-main-next',
          function (e) { self.nav(e, 'next') })
        .on('click.fndtn.clearing', '.clearing-main-prev',
          function (e) { self.nav(e, 'prev') })
        .on('click.fndtn.clearing', this.settings.close_selectors,
          function (e) { Foundation.libs.clearing.close(e, this) });

      $(document).on('keydown.fndtn.clearing',
          function (e) { self.keydown(e) });

      S(window).off('.clearing').on('resize.fndtn.clearing',
        function () { self.resize() });

      this.swipe_events(scope);
    },

    swipe_events : function (scope) {
      var self = this,
      S = self.S;

      S(this.scope)
        .on('touchstart.fndtn.clearing', '.visible-img', function (e) {
          if (!e.touches) { e = e.originalEvent; }
          var data = {
                start_page_x : e.touches[0].pageX,
                start_page_y : e.touches[0].pageY,
                start_time : (new Date()).getTime(),
                delta_x : 0,
                is_scrolling : undefined
              };

          S(this).data('swipe-transition', data);
          e.stopPropagation();
        })
        .on('touchmove.fndtn.clearing', '.visible-img', function (e) {
          if (!e.touches) {
            e = e.originalEvent;
          }
          // Ignore pinch/zoom events
          if (e.touches.length > 1 || e.scale && e.scale !== 1) {
            return;
          }

          var data = S(this).data('swipe-transition');

          if (typeof data === 'undefined') {
            data = {};
          }

          data.delta_x = e.touches[0].pageX - data.start_page_x;

          if (Foundation.rtl) {
            data.delta_x = -data.delta_x;
          }

          if (typeof data.is_scrolling === 'undefined') {
            data.is_scrolling = !!( data.is_scrolling || Math.abs(data.delta_x) < Math.abs(e.touches[0].pageY - data.start_page_y) );
          }

          if (!data.is_scrolling && !data.active) {
            e.preventDefault();
            var direction = (data.delta_x < 0) ? 'next' : 'prev';
            data.active = true;
            self.nav(e, direction);
          }
        })
        .on('touchend.fndtn.clearing', '.visible-img', function (e) {
          S(this).data('swipe-transition', {});
          e.stopPropagation();
        });
    },

    assemble : function ($li) {
      var $el = $li.parent();

      if ($el.parent().hasClass('carousel')) {
        return;
      }

      $el.after('<div id="foundationClearingHolder"></div>');

      var grid = $el.detach(),
          grid_outerHTML = '';

      if (grid[0] == null) {
        return;
      } else {
        grid_outerHTML = grid[0].outerHTML;
      }

      var holder = this.S('#foundationClearingHolder'),
          settings = $el.data(this.attr_name(true) + '-init'),
          data = {
            grid : '<div class="carousel">' + grid_outerHTML + '</div>',
            viewing : settings.templates.viewing
          },
          wrapper = '<div class="clearing-assembled"><div>' + data.viewing +
            data.grid + '</div></div>',
          touch_label = this.settings.touch_label;

      if (Modernizr.touch) {
        wrapper = $(wrapper).find('.clearing-touch-label').html(touch_label).end();
      }

      holder.after(wrapper).remove();
    },

    open : function ($image, current, target) {
      var self = this,
          body = $(document.body),
          root = target.closest('.clearing-assembled'),
          container = self.S('div', root).first(),
          visible_image = self.S('.visible-img', container),
          image = self.S('img', visible_image).not($image),
          label = self.S('.clearing-touch-label', container),
          error = false,
          loaded = {};

      // Event to disable scrolling on touch devices when Clearing is activated
      $('body').on('touchmove', function (e) {
        e.preventDefault();
      });

      image.error(function () {
        error = true;
      });

      function startLoad() {
        setTimeout(function () {
          this.image_loaded(image, function () {
            if (image.outerWidth() === 1 && !error) {
              startLoad.call(this);
            } else {
              cb.call(this, image);
            }
          }.bind(this));
        }.bind(this), 100);
      }

      function cb (image) {
        var $image = $(image);
        $image.css('visibility', 'visible');
        $image.trigger('imageVisible');
        // toggle the gallery
        body.css('overflow', 'hidden');
        root.addClass('clearing-blackout');
        container.addClass('clearing-container');
        visible_image.show();
        this.fix_height(target)
          .caption(self.S('.clearing-caption', visible_image), self.S('img', target))
          .center_and_label(image, label)
          .shift(current, target, function () {
            target.closest('li').siblings().removeClass('visible');
            target.closest('li').addClass('visible');
          });
        visible_image.trigger('opened.fndtn.clearing')
      }

      if (!this.locked()) {
        visible_image.trigger('open.fndtn.clearing');
        // set the image to the selected thumbnail
        loaded = this.load($image);
        if (loaded.interchange) {
          image
            .attr('data-interchange', loaded.interchange)
            .foundation('interchange', 'reflow');
        } else {
          image
            .attr('src', loaded.src)
            .attr('data-interchange', '');
        }
        image.css('visibility', 'hidden');

        startLoad.call(this);
      }
    },

    close : function (e, el) {
      e.preventDefault();

      var root = (function (target) {
            if (/blackout/.test(target.selector)) {
              return target;
            } else {
              return target.closest('.clearing-blackout');
            }
          }($(el))),
          body = $(document.body), container, visible_image;

      if (el === e.target && root) {
        body.css('overflow', '');
        container = $('div', root).first();
        visible_image = $('.visible-img', container);
        visible_image.trigger('close.fndtn.clearing');
        this.settings.prev_index = 0;
        $('ul[' + this.attr_name() + ']', root)
          .attr('style', '').closest('.clearing-blackout')
          .removeClass('clearing-blackout');
        container.removeClass('clearing-container');
        visible_image.hide();
        visible_image.trigger('closed.fndtn.clearing');
      }

      // Event to re-enable scrolling on touch devices
      $('body').off('touchmove');

      return false;
    },

    is_open : function (current) {
      return current.parent().prop('style').length > 0;
    },

    keydown : function (e) {
      var clearing = $('.clearing-blackout ul[' + this.attr_name() + ']'),
          NEXT_KEY = this.rtl ? 37 : 39,
          PREV_KEY = this.rtl ? 39 : 37,
          ESC_KEY = 27;

      if (e.which === NEXT_KEY) {
        this.go(clearing, 'next');
      }
      if (e.which === PREV_KEY) {
        this.go(clearing, 'prev');
      }
      if (e.which === ESC_KEY) {
        this.S('a.clearing-close').trigger('click.fndtn.clearing');
      }
    },

    nav : function (e, direction) {
      var clearing = $('ul[' + this.attr_name() + ']', '.clearing-blackout');

      e.preventDefault();
      this.go(clearing, direction);
    },

    resize : function () {
      var image = $('img', '.clearing-blackout .visible-img'),
          label = $('.clearing-touch-label', '.clearing-blackout');

      if (image.length) {
        this.center_and_label(image, label);
        image.trigger('resized.fndtn.clearing')
      }
    },

    // visual adjustments
    fix_height : function (target) {
      var lis = target.parent().children(),
          self = this;

      lis.each(function () {
        var li = self.S(this),
            image = li.find('img');

        if (li.height() > image.outerHeight()) {
          li.addClass('fix-height');
        }
      })
      .closest('ul')
      .width(lis.length * 100 + '%');

      return this;
    },

    update_paddles : function (target) {
      target = target.closest('li');
      var visible_image = target
        .closest('.carousel')
        .siblings('.visible-img');

      if (target.next().length > 0) {
        this.S('.clearing-main-next', visible_image).removeClass('disabled');
      } else {
        this.S('.clearing-main-next', visible_image).addClass('disabled');
      }

      if (target.prev().length > 0) {
        this.S('.clearing-main-prev', visible_image).removeClass('disabled');
      } else {
        this.S('.clearing-main-prev', visible_image).addClass('disabled');
      }
    },

    center_and_label : function (target, label) {
      if (!this.rtl && label.length > 0) {
        label.css({
          marginLeft : -(label.outerWidth() / 2),
          marginTop : -(target.outerHeight() / 2)-label.outerHeight()-10
        });
      } else {
        label.css({
          marginRight : -(label.outerWidth() / 2),
          marginTop : -(target.outerHeight() / 2)-label.outerHeight()-10,
          left: 'auto',
          right: '50%'
        });
      }
      return this;
    },

    // image loading and preloading

    load : function ($image) {
      var href,
          interchange,
          closest_a;

      if ($image[0].nodeName === 'A') {
        href = $image.attr('href');
        interchange = $image.data('clearing-interchange');
      } else {
        closest_a = $image.closest('a');
        href = closest_a.attr('href');
        interchange = closest_a.data('clearing-interchange');
      }

      this.preload($image);

      return {
        'src': href ? href : $image.attr('src'),
        'interchange': href ? interchange : $image.data('clearing-interchange')
      }
    },

    preload : function ($image) {
      this
        .img($image.closest('li').next(), 'next')
        .img($image.closest('li').prev(), 'prev');
    },

    img : function (img, sibling_type) {
      if (img.length) {
        var preload_img = $('.clearing-preload-' + sibling_type),
            new_a = this.S('a', img),
            src,
            interchange,
            image;

        if (new_a.length) {
          src = new_a.attr('href');
          interchange = new_a.data('clearing-interchange');
        } else {
          image = this.S('img', img);
          src = image.attr('src');
          interchange = image.data('clearing-interchange');
        }

        if (interchange) {
          preload_img.attr('data-interchange', interchange);
        } else {
          preload_img.attr('src', src);
          preload_img.attr('data-interchange', '');
        }
      }
      return this;
    },

    // image caption

    caption : function (container, $image) {
      var caption = $image.attr('data-caption');

      if (caption) {
      	var containerPlain = container.get(0);
      	containerPlain.innerHTML = caption;
        container.show();
      } else {
        container
          .text('')
          .hide();
      }
      return this;
    },

    // directional methods

    go : function ($ul, direction) {
      var current = this.S('.visible', $ul),
          target = current[direction]();

      // Check for skip selector.
      if (this.settings.skip_selector && target.find(this.settings.skip_selector).length != 0) {
        target = target[direction]();
      }

      if (target.length) {
        this.S('img', target)
          .trigger('click.fndtn.clearing', [current, target])
          .trigger('change.fndtn.clearing');
      }
    },

    shift : function (current, target, callback) {
      var clearing = target.parent(),
          old_index = this.settings.prev_index || target.index(),
          direction = this.direction(clearing, current, target),
          dir = this.rtl ? 'right' : 'left',
          left = parseInt(clearing.css('left'), 10),
          width = target.outerWidth(),
          skip_shift;

      var dir_obj = {};

      // we use jQuery animate instead of CSS transitions because we
      // need a callback to unlock the next animation
      // needs support for RTL **
      if (target.index() !== old_index && !/skip/.test(direction)) {
        if (/left/.test(direction)) {
          this.lock();
          dir_obj[dir] = left + width;
          clearing.animate(dir_obj, 300, this.unlock());
        } else if (/right/.test(direction)) {
          this.lock();
          dir_obj[dir] = left - width;
          clearing.animate(dir_obj, 300, this.unlock());
        }
      } else if (/skip/.test(direction)) {
        // the target image is not adjacent to the current image, so
        // do we scroll right or not
        skip_shift = target.index() - this.settings.up_count;
        this.lock();

        if (skip_shift > 0) {
          dir_obj[dir] = -(skip_shift * width);
          clearing.animate(dir_obj, 300, this.unlock());
        } else {
          dir_obj[dir] = 0;
          clearing.animate(dir_obj, 300, this.unlock());
        }
      }

      callback();
    },

    direction : function ($el, current, target) {
      var lis = this.S('li', $el),
          li_width = lis.outerWidth() + (lis.outerWidth() / 4),
          up_count = Math.floor(this.S('.clearing-container').outerWidth() / li_width) - 1,
          target_index = lis.index(target),
          response;

      this.settings.up_count = up_count;

      if (this.adjacent(this.settings.prev_index, target_index)) {
        if ((target_index > up_count) && target_index > this.settings.prev_index) {
          response = 'right';
        } else if ((target_index > up_count - 1) && target_index <= this.settings.prev_index) {
          response = 'left';
        } else {
          response = false;
        }
      } else {
        response = 'skip';
      }

      this.settings.prev_index = target_index;

      return response;
    },

    adjacent : function (current_index, target_index) {
      for (var i = target_index + 1; i >= target_index - 1; i--) {
        if (i === current_index) {
          return true;
        }
      }
      return false;
    },

    // lock management

    lock : function () {
      this.settings.locked = true;
    },

    unlock : function () {
      this.settings.locked = false;
    },

    locked : function () {
      return this.settings.locked;
    },

    off : function () {
      this.S(this.scope).off('.fndtn.clearing');
      this.S(window).off('.fndtn.clearing');
    },

    reflow : function () {
      this.init();
    }
  };

}(jQuery, window, window.document));
;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.dropdown = {
    name : 'dropdown',

    version : '5.5.3',

    settings : {
      active_class : 'open',
      disabled_class : 'disabled',
      mega_class : 'mega',
      align : 'bottom',
      is_hover : false,
      hover_timeout : 150,
      opened : function () {},
      closed : function () {}
    },

    init : function (scope, method, options) {
      Foundation.inherit(this, 'throttle');

      $.extend(true, this.settings, method, options);
      this.bindings(method, options);
    },

    events : function (scope) {
      var self = this,
          S = self.S;

      S(this.scope)
        .off('.dropdown')
        .on('click.fndtn.dropdown', '[' + this.attr_name() + ']', function (e) {
          var settings = S(this).data(self.attr_name(true) + '-init') || self.settings;
          if (!settings.is_hover || Modernizr.touch) {
            e.preventDefault();
            if (S(this).parent('[data-reveal-id]').length) {
              e.stopPropagation();
            }
            self.toggle($(this));
          }
        })
        .on('mouseenter.fndtn.dropdown', '[' + this.attr_name() + '], [' + this.attr_name() + '-content]', function (e) {
          var $this = S(this),
              dropdown,
              target;

          clearTimeout(self.timeout);

          if ($this.data(self.data_attr())) {
            dropdown = S('#' + $this.data(self.data_attr()));
            target = $this;
          } else {
            dropdown = $this;
            target = S('[' + self.attr_name() + '="' + dropdown.attr('id') + '"]');
          }

          var settings = target.data(self.attr_name(true) + '-init') || self.settings;

          if (S(e.currentTarget).data(self.data_attr()) && settings.is_hover) {
            self.closeall.call(self);
          }

          if (settings.is_hover) {
            self.open.apply(self, [dropdown, target]);
          }
        })
        .on('mouseleave.fndtn.dropdown', '[' + this.attr_name() + '], [' + this.attr_name() + '-content]', function (e) {
          var $this = S(this);
          var settings;

          if ($this.data(self.data_attr())) {
              settings = $this.data(self.data_attr(true) + '-init') || self.settings;
          } else {
              var target   = S('[' + self.attr_name() + '="' + S(this).attr('id') + '"]'),
                  settings = target.data(self.attr_name(true) + '-init') || self.settings;
          }

          self.timeout = setTimeout(function () {
            if ($this.data(self.data_attr())) {
              if (settings.is_hover) {
                self.close.call(self, S('#' + $this.data(self.data_attr())));
              }
            } else {
              if (settings.is_hover) {
                self.close.call(self, $this);
              }
            }
          }.bind(this), settings.hover_timeout);
        })
        .on('click.fndtn.dropdown', function (e) {
          var parent = S(e.target).closest('[' + self.attr_name() + '-content]');
          var links  = parent.find('a');

          if (links.length > 0 && parent.attr('aria-autoclose') !== 'false') {
              self.close.call(self, S('[' + self.attr_name() + '-content]'));
          }

          if (e.target !== document && !$.contains(document.documentElement, e.target)) {
            return;
          }

          if (S(e.target).closest('[' + self.attr_name() + ']').length > 0) {
            return;
          }

          if (!(S(e.target).data('revealId')) &&
            (parent.length > 0 && (S(e.target).is('[' + self.attr_name() + '-content]') ||
              $.contains(parent.first()[0], e.target)))) {
            e.stopPropagation();
            return;
          }

          self.close.call(self, S('[' + self.attr_name() + '-content]'));
        })
        .on('opened.fndtn.dropdown', '[' + self.attr_name() + '-content]', function () {
          self.settings.opened.call(this);
        })
        .on('closed.fndtn.dropdown', '[' + self.attr_name() + '-content]', function () {
          self.settings.closed.call(this);
        });

      S(window)
        .off('.dropdown')
        .on('resize.fndtn.dropdown', self.throttle(function () {
          self.resize.call(self);
        }, 50));

      this.resize();
    },

    close : function (dropdown) {
      var self = this;
      dropdown.each(function (idx) {
        var original_target = $('[' + self.attr_name() + '=' + dropdown[idx].id + ']') || $('aria-controls=' + dropdown[idx].id + ']');
        original_target.attr('aria-expanded', 'false');
        if (self.S(this).hasClass(self.settings.active_class)) {
          self.S(this)
            .css(Foundation.rtl ? 'right' : 'left', '-99999px')
            .attr('aria-hidden', 'true')
            .removeClass(self.settings.active_class)
            .prev('[' + self.attr_name() + ']')
            .removeClass(self.settings.active_class)
            .removeData('target');

          self.S(this).trigger('closed.fndtn.dropdown', [dropdown]);
        }
      });
      dropdown.removeClass('f-open-' + this.attr_name(true));
    },

    closeall : function () {
      var self = this;
      $.each(self.S('.f-open-' + this.attr_name(true)), function () {
        self.close.call(self, self.S(this));
      });
    },

    open : function (dropdown, target) {
      this
        .css(dropdown
        .addClass(this.settings.active_class), target);
      dropdown.prev('[' + this.attr_name() + ']').addClass(this.settings.active_class);
      dropdown.data('target', target.get(0)).trigger('opened.fndtn.dropdown', [dropdown, target]);
      dropdown.attr('aria-hidden', 'false');
      target.attr('aria-expanded', 'true');
      dropdown.focus();
      dropdown.addClass('f-open-' + this.attr_name(true));
    },

    data_attr : function () {
      if (this.namespace.length > 0) {
        return this.namespace + '-' + this.name;
      }

      return this.name;
    },

    toggle : function (target) {
      if (target.hasClass(this.settings.disabled_class)) {
        return;
      }
      var dropdown = this.S('#' + target.data(this.data_attr()));
      if (dropdown.length === 0) {
        // No dropdown found, not continuing
        return;
      }

      this.close.call(this, this.S('[' + this.attr_name() + '-content]').not(dropdown));

      if (dropdown.hasClass(this.settings.active_class)) {
        this.close.call(this, dropdown);
        if (dropdown.data('target') !== target.get(0)) {
          this.open.call(this, dropdown, target);
        }
      } else {
        this.open.call(this, dropdown, target);
      }
    },

    resize : function () {
      var dropdown = this.S('[' + this.attr_name() + '-content].open');
      var target = $(dropdown.data("target"));

      if (dropdown.length && target.length) {
        this.css(dropdown, target);
      }
    },

    css : function (dropdown, target) {
      var left_offset = Math.max((target.width() - dropdown.width()) / 2, 8),
          settings = target.data(this.attr_name(true) + '-init') || this.settings,
          parentOverflow = dropdown.parent().css('overflow-y') || dropdown.parent().css('overflow');

      this.clear_idx();



      if (this.small()) {
        var p = this.dirs.bottom.call(dropdown, target, settings);

        dropdown.attr('style', '').removeClass('drop-left drop-right drop-top').css({
          position : 'absolute',
          width : '95%',
          'max-width' : 'none',
          top : p.top
        });

        dropdown.css(Foundation.rtl ? 'right' : 'left', left_offset);
      }
      // detect if dropdown is in an overflow container
      else if (parentOverflow !== 'visible') {
        var offset = target[0].offsetTop + target[0].offsetHeight;

        dropdown.attr('style', '').css({
          position : 'absolute',
          top : offset
        });

        dropdown.css(Foundation.rtl ? 'right' : 'left', left_offset);
      }
      else {

        this.style(dropdown, target, settings);
      }

      return dropdown;
    },

    style : function (dropdown, target, settings) {
      var css = $.extend({position : 'absolute'},
        this.dirs[settings.align].call(dropdown, target, settings));

      dropdown.attr('style', '').css(css);
    },

    // return CSS property object
    // `this` is the dropdown
    dirs : {
      // Calculate target offset
      _base : function (t, s) {
        var o_p = this.offsetParent(),
            o = o_p.offset(),
            p = t.offset();

        p.top -= o.top;
        p.left -= o.left;

        //set some flags on the p object to pass along
        p.missRight = false;
        p.missTop = false;
        p.missLeft = false;
        p.leftRightFlag = false;

        //lets see if the panel will be off the screen
        //get the actual width of the page and store it
        var actualBodyWidth;
        var windowWidth = window.innerWidth;
        
        if (document.getElementsByClassName('row')[0]) {
          actualBodyWidth = document.getElementsByClassName('row')[0].clientWidth;
        } else {
          actualBodyWidth = windowWidth;
        }

        var actualMarginWidth = (windowWidth - actualBodyWidth) / 2;
        var actualBoundary = actualBodyWidth;

        if (!this.hasClass('mega') && !s.ignore_repositioning) {
          var outerWidth = this.outerWidth();
          var o_left = t.offset().left;
		  
          //miss top
          if (t.offset().top <= this.outerHeight()) {
            p.missTop = true;
            actualBoundary = windowWidth - actualMarginWidth;
            p.leftRightFlag = true;
          }

          //miss right
          if (o_left + outerWidth > o_left + actualMarginWidth && o_left - actualMarginWidth > outerWidth) {
            p.missRight = true;
            p.missLeft = false;
          }

          //miss left
          if (o_left - outerWidth <= 0) {
            p.missLeft = true;
            p.missRight = false;
          }
        }

        return p;
      },

      top : function (t, s) {
        var self = Foundation.libs.dropdown,
            p = self.dirs._base.call(this, t, s);

        this.addClass('drop-top');

        if (p.missTop == true) {
          p.top = p.top + t.outerHeight() + this.outerHeight();
          this.removeClass('drop-top');
        }

        if (p.missRight == true) {
          p.left = p.left - this.outerWidth() + t.outerWidth();
        }

        if (t.outerWidth() < this.outerWidth() || self.small() || this.hasClass(s.mega_menu)) {
          self.adjust_pip(this, t, s, p);
        }

        if (Foundation.rtl) {
          return {left : p.left - this.outerWidth() + t.outerWidth(),
            top : p.top - this.outerHeight()};
        }

        return {left : p.left, top : p.top - this.outerHeight()};
      },

      bottom : function (t, s) {
        var self = Foundation.libs.dropdown,
            p = self.dirs._base.call(this, t, s);

        if (p.missRight == true) {
          p.left = p.left - this.outerWidth() + t.outerWidth();
        }

        if (t.outerWidth() < this.outerWidth() || self.small() || this.hasClass(s.mega_menu)) {
          self.adjust_pip(this, t, s, p);
        }

        if (self.rtl) {
          return {left : p.left - this.outerWidth() + t.outerWidth(), top : p.top + t.outerHeight()};
        }

        return {left : p.left, top : p.top + t.outerHeight()};
      },

      left : function (t, s) {
        var p = Foundation.libs.dropdown.dirs._base.call(this, t, s);

        this.addClass('drop-left');

        if (p.missLeft == true) {
          p.left =  p.left + this.outerWidth();
          p.top = p.top + t.outerHeight();
          this.removeClass('drop-left');
        }

        return {left : p.left - this.outerWidth(), top : p.top};
      },

      right : function (t, s) {
        var p = Foundation.libs.dropdown.dirs._base.call(this, t, s);

        this.addClass('drop-right');

        if (p.missRight == true) {
          p.left = p.left - this.outerWidth();
          p.top = p.top + t.outerHeight();
          this.removeClass('drop-right');
        } else {
          p.triggeredRight = true;
        }

        var self = Foundation.libs.dropdown;

        if (t.outerWidth() < this.outerWidth() || self.small() || this.hasClass(s.mega_menu)) {
          self.adjust_pip(this, t, s, p);
        }

        return {left : p.left + t.outerWidth(), top : p.top};
      }
    },

    // Insert rule to style psuedo elements
    adjust_pip : function (dropdown, target, settings, position) {
      var sheet = Foundation.stylesheet,
          pip_offset_base = 8;

      if (dropdown.hasClass(settings.mega_class)) {
        pip_offset_base = position.left + (target.outerWidth() / 2) - 8;
      } else if (this.small()) {
        pip_offset_base += position.left - 8;
      }

      this.rule_idx = sheet.cssRules.length;

      //default
      var sel_before = '.f-dropdown.open:before',
          sel_after  = '.f-dropdown.open:after',
          css_before = 'left: ' + pip_offset_base + 'px;',
          css_after  = 'left: ' + (pip_offset_base - 1) + 'px;';

      if (position.missRight == true) {
        pip_offset_base = dropdown.outerWidth() - 23;
        sel_before = '.f-dropdown.open:before',
        sel_after  = '.f-dropdown.open:after',
        css_before = 'left: ' + pip_offset_base + 'px;',
        css_after  = 'left: ' + (pip_offset_base - 1) + 'px;';
      }

      //just a case where right is fired, but its not missing right
      if (position.triggeredRight == true) {
        sel_before = '.f-dropdown.open:before',
        sel_after  = '.f-dropdown.open:after',
        css_before = 'left:-12px;',
        css_after  = 'left:-14px;';
      }

      if (sheet.insertRule) {
        sheet.insertRule([sel_before, '{', css_before, '}'].join(' '), this.rule_idx);
        sheet.insertRule([sel_after, '{', css_after, '}'].join(' '), this.rule_idx + 1);
      } else {
        sheet.addRule(sel_before, css_before, this.rule_idx);
        sheet.addRule(sel_after, css_after, this.rule_idx + 1);
      }
    },

    // Remove old dropdown rule index
    clear_idx : function () {
      var sheet = Foundation.stylesheet;

      if (typeof this.rule_idx !== 'undefined') {
        sheet.deleteRule(this.rule_idx);
        sheet.deleteRule(this.rule_idx);
        delete this.rule_idx;
      }
    },

    small : function () {
      return matchMedia(Foundation.media_queries.small).matches &&
        !matchMedia(Foundation.media_queries.medium).matches;
    },

    off : function () {
      this.S(this.scope).off('.fndtn.dropdown');
      this.S('html, body').off('.fndtn.dropdown');
      this.S(window).off('.fndtn.dropdown');
      this.S('[data-dropdown-content]').off('.fndtn.dropdown');
    },

    reflow : function () {}
  };
}(jQuery, window, window.document));
;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.equalizer = {
    name : 'equalizer',

    version : '5.5.3',

    settings : {
      use_tallest : true,
      before_height_change : $.noop,
      after_height_change : $.noop,
      equalize_on_stack : false,
      act_on_hidden_el: false
    },

    init : function (scope, method, options) {
      Foundation.inherit(this, 'image_loaded');
      this.bindings(method, options);
      this.reflow();
    },

    events : function () {
      this.S(window).off('.equalizer').on('resize.fndtn.equalizer', function (e) {
        this.reflow();
      }.bind(this));
    },

    equalize : function (equalizer) {
      var isStacked = false,
          group = equalizer.data('equalizer'),
          settings = equalizer.data(this.attr_name(true)+'-init') || this.settings,
          vals,
          firstTopOffset;

      if (settings.act_on_hidden_el) {
        vals = group ? equalizer.find('['+this.attr_name()+'-watch="'+group+'"]') : equalizer.find('['+this.attr_name()+'-watch]');
      }
      else {
        vals = group ? equalizer.find('['+this.attr_name()+'-watch="'+group+'"]:visible') : equalizer.find('['+this.attr_name()+'-watch]:visible');
      }
      
      if (vals.length === 0) {
        return;
      }

      settings.before_height_change();
      equalizer.trigger('before-height-change.fndth.equalizer');
      vals.height('inherit');

      if (settings.equalize_on_stack === false) {
        firstTopOffset = vals.first().offset().top;
        vals.each(function () {
          if ($(this).offset().top !== firstTopOffset) {
            isStacked = true;
            return false;
          }
        });
        if (isStacked) {
          return;
        }
      }

      var heights = vals.map(function () { return $(this).outerHeight(false) }).get();

      if (settings.use_tallest) {
        var max = Math.max.apply(null, heights);
        vals.css('height', max);
      } else {
        var min = Math.min.apply(null, heights);
        vals.css('height', min);
      }

      settings.after_height_change();
      equalizer.trigger('after-height-change.fndtn.equalizer');
    },

    reflow : function () {
      var self = this;

      this.S('[' + this.attr_name() + ']', this.scope).each(function () {
        var $eq_target = $(this),
            media_query = $eq_target.data('equalizer-mq'),
            ignore_media_query = true;

        if (media_query) {
          media_query = 'is_' + media_query.replace(/-/g, '_');
          if (Foundation.utils.hasOwnProperty(media_query)) {
            ignore_media_query = false;
          }
        }

        self.image_loaded(self.S('img', this), function () {
          if (ignore_media_query || Foundation.utils[media_query]()) {
            self.equalize($eq_target)
          } else {
            var vals = $eq_target.find('[' + self.attr_name() + '-watch]:visible');
            vals.css('height', 'auto');
          }
        });
      });
    }
  };
})(jQuery, window, window.document);
;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.interchange = {
    name : 'interchange',

    version : '5.5.3',

    cache : {},

    images_loaded : false,
    nodes_loaded : false,

    settings : {
      load_attr : 'interchange',

      named_queries : {
        'default'     : 'only screen',
        'small'       : Foundation.media_queries['small'],
        'small-only'  : Foundation.media_queries['small-only'],
        'medium'      : Foundation.media_queries['medium'],
        'medium-only' : Foundation.media_queries['medium-only'],
        'large'       : Foundation.media_queries['large'],
        'large-only'  : Foundation.media_queries['large-only'],
        'xlarge'      : Foundation.media_queries['xlarge'],
        'xlarge-only' : Foundation.media_queries['xlarge-only'],
        'xxlarge'     : Foundation.media_queries['xxlarge'],
        'landscape'   : 'only screen and (orientation: landscape)',
        'portrait'    : 'only screen and (orientation: portrait)',
        'retina'      : 'only screen and (-webkit-min-device-pixel-ratio: 2),' +
          'only screen and (min--moz-device-pixel-ratio: 2),' +
          'only screen and (-o-min-device-pixel-ratio: 2/1),' +
          'only screen and (min-device-pixel-ratio: 2),' +
          'only screen and (min-resolution: 192dpi),' +
          'only screen and (min-resolution: 2dppx)'
      },

      directives : {
        replace : function (el, path, trigger) {
          // The trigger argument, if called within the directive, fires
          // an event named after the directive on the element, passing
          // any parameters along to the event that you pass to trigger.
          //
          // ex. trigger(), trigger([a, b, c]), or trigger(a, b, c)
          //
          // This allows you to bind a callback like so:
          // $('#interchangeContainer').on('replace', function (e, a, b, c) {
          //   console.log($(this).html(), a, b, c);
          // });

          if (el !== null && /IMG/.test(el[0].nodeName)) {
            var orig_path = $.each(el, function(){this.src = path;});
            // var orig_path = el[0].src;

            if (new RegExp(path, 'i').test(orig_path)) {
              return;
            }

            el.attr("src", path);

            return trigger(el[0].src);
          }
          var last_path = el.data(this.data_attr + '-last-path'),
              self = this;

          if (last_path == path) {
            return;
          }

          if (/\.(gif|jpg|jpeg|tiff|png)([?#].*)?/i.test(path)) {
            $(el).css('background-image', 'url(' + path + ')');
            el.data('interchange-last-path', path);
            return trigger(path);
          }

          return $.get(path, function (response) {
            el.html(response);
            el.data(self.data_attr + '-last-path', path);
            trigger();
          });

        }
      }
    },

    init : function (scope, method, options) {
      Foundation.inherit(this, 'throttle random_str');

      this.data_attr = this.set_data_attr();
      $.extend(true, this.settings, method, options);
      this.bindings(method, options);
      this.reflow();
    },

    get_media_hash : function () {
        var mediaHash = '';
        for (var queryName in this.settings.named_queries ) {
            mediaHash += matchMedia(this.settings.named_queries[queryName]).matches.toString();
        }
        return mediaHash;
    },

    events : function () {
      var self = this, prevMediaHash;

      $(window)
        .off('.interchange')
        .on('resize.fndtn.interchange', self.throttle(function () {
            var currMediaHash = self.get_media_hash();
            if (currMediaHash !== prevMediaHash) {
                self.resize();
            }
            prevMediaHash = currMediaHash;
        }, 50));

      return this;
    },

    resize : function () {
      var cache = this.cache;

      if (!this.images_loaded || !this.nodes_loaded) {
        setTimeout($.proxy(this.resize, this), 50);
        return;
      }

      for (var uuid in cache) {
        if (cache.hasOwnProperty(uuid)) {
          var passed = this.results(uuid, cache[uuid]);
          if (passed) {
            this.settings.directives[passed
              .scenario[1]].call(this, passed.el, passed.scenario[0], (function (passed) {
                if (arguments[0] instanceof Array) {
                  var args = arguments[0];
                } else {
                  var args = Array.prototype.slice.call(arguments, 0);
                }

                return function() {
                  passed.el.trigger(passed.scenario[1], args);
                }
              }(passed)));
          }
        }
      }

    },

    results : function (uuid, scenarios) {
      var count = scenarios.length;

      if (count > 0) {
        var el = this.S('[' + this.add_namespace('data-uuid') + '="' + uuid + '"]');

        while (count--) {
          var mq, rule = scenarios[count][2];
          if (this.settings.named_queries.hasOwnProperty(rule)) {
            mq = matchMedia(this.settings.named_queries[rule]);
          } else {
            mq = matchMedia(rule);
          }
          if (mq.matches) {
            return {el : el, scenario : scenarios[count]};
          }
        }
      }

      return false;
    },

    load : function (type, force_update) {
      if (typeof this['cached_' + type] === 'undefined' || force_update) {
        this['update_' + type]();
      }

      return this['cached_' + type];
    },

    update_images : function () {
      var images = this.S('img[' + this.data_attr + ']'),
          count = images.length,
          i = count,
          loaded_count = 0,
          data_attr = this.data_attr;

      this.cache = {};
      this.cached_images = [];
      this.images_loaded = (count === 0);

      while (i--) {
        loaded_count++;
        if (images[i]) {
          var str = images[i].getAttribute(data_attr) || '';

          if (str.length > 0) {
            this.cached_images.push(images[i]);
          }
        }

        if (loaded_count === count) {
          this.images_loaded = true;
          this.enhance('images');
        }
      }

      return this;
    },

    update_nodes : function () {
      var nodes = this.S('[' + this.data_attr + ']').not('img'),
          count = nodes.length,
          i = count,
          loaded_count = 0,
          data_attr = this.data_attr;

      this.cached_nodes = [];
      this.nodes_loaded = (count === 0);

      while (i--) {
        loaded_count++;
        var str = nodes[i].getAttribute(data_attr) || '';

        if (str.length > 0) {
          this.cached_nodes.push(nodes[i]);
        }

        if (loaded_count === count) {
          this.nodes_loaded = true;
          this.enhance('nodes');
        }
      }

      return this;
    },

    enhance : function (type) {
      var i = this['cached_' + type].length;

      while (i--) {
        this.object($(this['cached_' + type][i]));
      }

      return $(window).trigger('resize.fndtn.interchange');
    },

    convert_directive : function (directive) {

      var trimmed = this.trim(directive);

      if (trimmed.length > 0) {
        return trimmed;
      }

      return 'replace';
    },

    parse_scenario : function (scenario) {
      // This logic had to be made more complex since some users were using commas in the url path
      // So we cannot simply just split on a comma

      var directive_match = scenario[0].match(/(.+),\s*(\w+)\s*$/),
      // getting the mq has gotten a bit complicated since we started accounting for several use cases
      // of URLs. For now we'll continue to match these scenarios, but we may consider having these scenarios
      // as nested objects or arrays in F6.
      // regex: match everything before close parenthesis for mq
      media_query         = scenario[1].match(/(.*)\)/);

      if (directive_match) {
        var path  = directive_match[1],
        directive = directive_match[2];

      } else {
        var cached_split = scenario[0].split(/,\s*$/),
        path             = cached_split[0],
        directive        = '';
      }

      return [this.trim(path), this.convert_directive(directive), this.trim(media_query[1])];
    },

    object : function (el) {
      var raw_arr = this.parse_data_attr(el),
          scenarios = [],
          i = raw_arr.length;

      if (i > 0) {
        while (i--) {
          // split array between comma delimited content and mq
          // regex: comma, optional space, open parenthesis
          var scenario = raw_arr[i].split(/,\s?\(/);

          if (scenario.length > 1) {
            var params = this.parse_scenario(scenario);
            scenarios.push(params);
          }
        }
      }

      return this.store(el, scenarios);
    },

    store : function (el, scenarios) {
      var uuid = this.random_str(),
          current_uuid = el.data(this.add_namespace('uuid', true));

      if (this.cache[current_uuid]) {
        return this.cache[current_uuid];
      }

      el.attr(this.add_namespace('data-uuid'), uuid);
      return this.cache[uuid] = scenarios;
    },

    trim : function (str) {

      if (typeof str === 'string') {
        return $.trim(str);
      }

      return str;
    },

    set_data_attr : function (init) {
      if (init) {
        if (this.namespace.length > 0) {
          return this.namespace + '-' + this.settings.load_attr;
        }

        return this.settings.load_attr;
      }

      if (this.namespace.length > 0) {
        return 'data-' + this.namespace + '-' + this.settings.load_attr;
      }

      return 'data-' + this.settings.load_attr;
    },

    parse_data_attr : function (el) {
      var raw = el.attr(this.attr_name()).split(/\[(.*?)\]/),
          i = raw.length,
          output = [];

      while (i--) {
        if (raw[i].replace(/[\W\d]+/, '').length > 4) {
          output.push(raw[i]);
        }
      }

      return output;
    },

    reflow : function () {
      this.load('images', true);
      this.load('nodes', true);
    }

  };

}(jQuery, window, window.document));
;(function ($, window, document, undefined) {
  'use strict';

  var Modernizr = Modernizr || false;

  Foundation.libs.joyride = {
    name : 'joyride',

    version : '5.5.3',

    defaults : {
      expose                   : false,     // turn on or off the expose feature
      modal                    : true,      // Whether to cover page with modal during the tour
      keyboard                 : true,      // enable left, right and esc keystrokes
      tip_location             : 'bottom',  // 'top', 'bottom', 'left' or 'right' in relation to parent
      nub_position             : 'auto',    // override on a per tooltip bases
      scroll_speed             : 1500,      // Page scrolling speed in milliseconds, 0 = no scroll animation
      scroll_animation         : 'linear',  // supports 'swing' and 'linear', extend with jQuery UI.
      timer                    : 0,         // 0 = no timer , all other numbers = timer in milliseconds
      start_timer_on_click     : true,      // true or false - true requires clicking the first button start the timer
      start_offset             : 0,         // the index of the tooltip you want to start on (index of the li)
      next_button              : true,      // true or false to control whether a next button is used
      prev_button              : true,      // true or false to control whether a prev button is used
      tip_animation            : 'fade',    // 'pop' or 'fade' in each tip
      pause_after              : [],        // array of indexes where to pause the tour after
      exposed                  : [],        // array of expose elements
      tip_animation_fade_speed : 300,       // when tipAnimation = 'fade' this is speed in milliseconds for the transition
      cookie_monster           : false,     // true or false to control whether cookies are used
      cookie_name              : 'joyride', // Name the cookie you'll use
      cookie_domain            : false,     // Will this cookie be attached to a domain, ie. '.notableapp.com'
      cookie_expires           : 365,       // set when you would like the cookie to expire.
      tip_container            : 'body',    // Where will the tip be attached
      abort_on_close           : true,      // When true, the close event will not fire any callback
      tip_location_patterns    : {
        top : ['bottom'],
        bottom : [], // bottom should not need to be repositioned
        left : ['right', 'top', 'bottom'],
        right : ['left', 'top', 'bottom']
      },
      post_ride_callback     : function () {},    // A method to call once the tour closes (canceled or complete)
      post_step_callback     : function () {},    // A method to call after each step
      pre_step_callback      : function () {},    // A method to call before each step
      pre_ride_callback      : function () {},    // A method to call before the tour starts (passed index, tip, and cloned exposed element)
      post_expose_callback   : function () {},    // A method to call after an element has been exposed
      template : { // HTML segments for tip layout
        link          : '<a href="#close" class="joyride-close-tip">&times;</a>',
        timer         : '<div class="joyride-timer-indicator-wrap"><span class="joyride-timer-indicator"></span></div>',
        tip           : '<div class="joyride-tip-guide"><span class="joyride-nub"></span></div>',
        wrapper       : '<div class="joyride-content-wrapper"></div>',
        button        : '<a href="#" class="small button joyride-next-tip"></a>',
        prev_button   : '<a href="#" class="small button joyride-prev-tip"></a>',
        modal         : '<div class="joyride-modal-bg"></div>',
        expose        : '<div class="joyride-expose-wrapper"></div>',
        expose_cover  : '<div class="joyride-expose-cover"></div>'
      },
      expose_add_class : '' // One or more space-separated class names to be added to exposed element
    },

    init : function (scope, method, options) {
      Foundation.inherit(this, 'throttle random_str');

      this.settings = this.settings || $.extend({}, this.defaults, (options || method));

      this.bindings(method, options)
    },

    go_next : function () {
      if (this.settings.$li.next().length < 1) {
        this.end();
      } else if (this.settings.timer > 0) {
        clearTimeout(this.settings.automate);
        this.hide();
        this.show();
        this.startTimer();
      } else {
        this.hide();
        this.show();
      }
    },

    go_prev : function () {
      if (this.settings.$li.prev().length < 1) {
        // Do nothing if there are no prev element
      } else if (this.settings.timer > 0) {
        clearTimeout(this.settings.automate);
        this.hide();
        this.show(null, true);
        this.startTimer();
      } else {
        this.hide();
        this.show(null, true);
      }
    },

    events : function () {
      var self = this;

      $(this.scope)
        .off('.joyride')
        .on('click.fndtn.joyride', '.joyride-next-tip, .joyride-modal-bg', function (e) {
          e.preventDefault();
          this.go_next()
        }.bind(this))
        .on('click.fndtn.joyride', '.joyride-prev-tip', function (e) {
          e.preventDefault();
          this.go_prev();
        }.bind(this))

        .on('click.fndtn.joyride', '.joyride-close-tip', function (e) {
          e.preventDefault();
          this.end(this.settings.abort_on_close);
        }.bind(this))

        .on('keyup.fndtn.joyride', function (e) {
          // Don't do anything if keystrokes are disabled
          // or if the joyride is not being shown
          if (!this.settings.keyboard || !this.settings.riding) {
            return;
          }

          switch (e.which) {
            case 39: // right arrow
              e.preventDefault();
              this.go_next();
              break;
            case 37: // left arrow
              e.preventDefault();
              this.go_prev();
              break;
            case 27: // escape
              e.preventDefault();
              this.end(this.settings.abort_on_close);
          }
        }.bind(this));

      $(window)
        .off('.joyride')
        .on('resize.fndtn.joyride', self.throttle(function () {
          if ($('[' + self.attr_name() + ']').length > 0 && self.settings.$next_tip && self.settings.riding) {
            if (self.settings.exposed.length > 0) {
              var $els = $(self.settings.exposed);

              $els.each(function () {
                var $this = $(this);
                self.un_expose($this);
                self.expose($this);
              });
            }

            if (self.is_phone()) {
              self.pos_phone();
            } else {
              self.pos_default(false);
            }
          }
        }, 100));
    },

    start : function () {
      var self = this,
          $this = $('[' + this.attr_name() + ']', this.scope),
          integer_settings = ['timer', 'scrollSpeed', 'startOffset', 'tipAnimationFadeSpeed', 'cookieExpires'],
          int_settings_count = integer_settings.length;

      if (!$this.length > 0) {
        return;
      }

      if (!this.settings.init) {
        this.events();
      }

      this.settings = $this.data(this.attr_name(true) + '-init');

      // non configureable settings
      this.settings.$content_el = $this;
      this.settings.$body = $(this.settings.tip_container);
      this.settings.body_offset = $(this.settings.tip_container).position();
      this.settings.$tip_content = this.settings.$content_el.find('> li');
      this.settings.paused = false;
      this.settings.attempts = 0;
      this.settings.riding = true;

      // can we create cookies?
      if (typeof $.cookie !== 'function') {
        this.settings.cookie_monster = false;
      }

      // generate the tips and insert into dom.
      if (!this.settings.cookie_monster || this.settings.cookie_monster && !$.cookie(this.settings.cookie_name)) {
        this.settings.$tip_content.each(function (index) {
          var $this = $(this);
          this.settings = $.extend({}, self.defaults, self.data_options($this));

          // Make sure that settings parsed from data_options are integers where necessary
          var i = int_settings_count;
          while (i--) {
            self.settings[integer_settings[i]] = parseInt(self.settings[integer_settings[i]], 10);
          }
          self.create({$li : $this, index : index});
        });

        // show first tip
        if (!this.settings.start_timer_on_click && this.settings.timer > 0) {
          this.show('init');
          this.startTimer();
        } else {
          this.show('init');
        }

      }
    },

    resume : function () {
      this.set_li();
      this.show();
    },

    tip_template : function (opts) {
      var $blank, content;

      opts.tip_class = opts.tip_class || '';

      $blank = $(this.settings.template.tip).addClass(opts.tip_class);
      content = $.trim($(opts.li).html()) +
        this.prev_button_text(opts.prev_button_text, opts.index) +
        this.button_text(opts.button_text) +
        this.settings.template.link +
        this.timer_instance(opts.index);

      $blank.append($(this.settings.template.wrapper));
      $blank.first().attr(this.add_namespace('data-index'), opts.index);
      $('.joyride-content-wrapper', $blank).append(content);

      return $blank[0];
    },

    timer_instance : function (index) {
      var txt;

      if ((index === 0 && this.settings.start_timer_on_click && this.settings.timer > 0) || this.settings.timer === 0) {
        txt = '';
      } else {
        txt = $(this.settings.template.timer)[0].outerHTML;
      }
      return txt;
    },

    button_text : function (txt) {
      if (this.settings.tip_settings.next_button) {
        txt = $.trim(txt) || 'Next';
        txt = $(this.settings.template.button).append(txt)[0].outerHTML;
      } else {
        txt = '';
      }
      return txt;
    },

    prev_button_text : function (txt, idx) {
      if (this.settings.tip_settings.prev_button) {
        txt = $.trim(txt) || 'Previous';

        // Add the disabled class to the button if it's the first element
        if (idx == 0) {
          txt = $(this.settings.template.prev_button).append(txt).addClass('disabled')[0].outerHTML;
        } else {
          txt = $(this.settings.template.prev_button).append(txt)[0].outerHTML;
        }
      } else {
        txt = '';
      }
      return txt;
    },

    create : function (opts) {
      this.settings.tip_settings = $.extend({}, this.settings, this.data_options(opts.$li));
      var buttonText = opts.$li.attr(this.add_namespace('data-button')) || opts.$li.attr(this.add_namespace('data-text')),
          prevButtonText = opts.$li.attr(this.add_namespace('data-button-prev')) || opts.$li.attr(this.add_namespace('data-prev-text')),
        tipClass = opts.$li.attr('class'),
        $tip_content = $(this.tip_template({
          tip_class : tipClass,
          index : opts.index,
          button_text : buttonText,
          prev_button_text : prevButtonText,
          li : opts.$li
        }));

      $(this.settings.tip_container).append($tip_content);
    },

    show : function (init, is_prev) {
      var $timer = null;

      // are we paused?
      if (this.settings.$li === undefined || ($.inArray(this.settings.$li.index(), this.settings.pause_after) === -1)) {

        // don't go to the next li if the tour was paused
        if (this.settings.paused) {
          this.settings.paused = false;
        } else {
          this.set_li(init, is_prev);
        }

        this.settings.attempts = 0;

        if (this.settings.$li.length && this.settings.$target.length > 0) {
          if (init) { //run when we first start
            this.settings.pre_ride_callback(this.settings.$li.index(), this.settings.$next_tip);
            if (this.settings.modal) {
              this.show_modal();
            }
          }

          this.settings.pre_step_callback(this.settings.$li.index(), this.settings.$next_tip);

          if (this.settings.modal && this.settings.expose) {
            this.expose();
          }

          this.settings.tip_settings = $.extend({}, this.settings, this.data_options(this.settings.$li));

          this.settings.timer = parseInt(this.settings.timer, 10);

          this.settings.tip_settings.tip_location_pattern = this.settings.tip_location_patterns[this.settings.tip_settings.tip_location];

          // scroll and hide bg if not modal and not expose
          if (!/body/i.test(this.settings.$target.selector) && !this.settings.expose) {
            var joyridemodalbg = $('.joyride-modal-bg');
            if (/pop/i.test(this.settings.tipAnimation)) {
                joyridemodalbg.hide();
            } else {
                joyridemodalbg.fadeOut(this.settings.tipAnimationFadeSpeed);
            }
            this.scroll_to();
          }

          if (this.is_phone()) {
            this.pos_phone(true);
          } else {
            this.pos_default(true);
          }

          $timer = this.settings.$next_tip.find('.joyride-timer-indicator');

          if (/pop/i.test(this.settings.tip_animation)) {

            $timer.width(0);

            if (this.settings.timer > 0) {

              this.settings.$next_tip.show();

              setTimeout(function () {
                $timer.animate({
                  width : $timer.parent().width()
                }, this.settings.timer, 'linear');
              }.bind(this), this.settings.tip_animation_fade_speed);

            } else {
              this.settings.$next_tip.show();

            }

          } else if (/fade/i.test(this.settings.tip_animation)) {

            $timer.width(0);

            if (this.settings.timer > 0) {

              this.settings.$next_tip
                .fadeIn(this.settings.tip_animation_fade_speed)
                .show();

              setTimeout(function () {
                $timer.animate({
                  width : $timer.parent().width()
                }, this.settings.timer, 'linear');
              }.bind(this), this.settings.tip_animation_fade_speed);

            } else {
              this.settings.$next_tip.fadeIn(this.settings.tip_animation_fade_speed);
            }
          }

          this.settings.$current_tip = this.settings.$next_tip;

        // skip non-existant targets
        } else if (this.settings.$li && this.settings.$target.length < 1) {

          this.show(init, is_prev);

        } else {

          this.end();

        }
      } else {

        this.settings.paused = true;

      }

    },

    is_phone : function () {
      return matchMedia(Foundation.media_queries.small).matches &&
        !matchMedia(Foundation.media_queries.medium).matches;
    },

    hide : function () {
      if (this.settings.modal && this.settings.expose) {
        this.un_expose();
      }

      if (!this.settings.modal) {
        $('.joyride-modal-bg').hide();
      }

      // Prevent scroll bouncing...wait to remove from layout
      this.settings.$current_tip.css('visibility', 'hidden');
      setTimeout($.proxy(function () {
        this.hide();
        this.css('visibility', 'visible');
      }, this.settings.$current_tip), 0);
      this.settings.post_step_callback(this.settings.$li.index(),
        this.settings.$current_tip);
    },

    set_li : function (init, is_prev) {
      if (init) {
        this.settings.$li = this.settings.$tip_content.eq(this.settings.start_offset);
        this.set_next_tip();
        this.settings.$current_tip = this.settings.$next_tip;
      } else {
        if (is_prev) {
          this.settings.$li = this.settings.$li.prev();
        } else {
          this.settings.$li = this.settings.$li.next();
        }
        this.set_next_tip();
      }

      this.set_target();
    },

    set_next_tip : function () {
      this.settings.$next_tip = $('.joyride-tip-guide').eq(this.settings.$li.index());
      this.settings.$next_tip.data('closed', '');
    },

    set_target : function () {
      var cl = this.settings.$li.attr(this.add_namespace('data-class')),
          id = this.settings.$li.attr(this.add_namespace('data-id')),
          $sel = function () {
            if (id) {
              return $(document.getElementById(id));
            } else if (cl) {
              return $('.' + cl).first();
            } else {
              return $('body');
            }
          };

      this.settings.$target = $sel();
    },

    scroll_to : function () {
      var window_half, tipOffset;

      window_half = $(window).height() / 2;
      tipOffset = Math.ceil(this.settings.$target.offset().top - window_half + this.settings.$next_tip.outerHeight());

      if (tipOffset != 0) {
        $('html, body').stop().animate({
          scrollTop : tipOffset
        }, this.settings.scroll_speed, 'swing');
      }
    },

    paused : function () {
      return ($.inArray((this.settings.$li.index() + 1), this.settings.pause_after) === -1);
    },

    restart : function () {
      this.hide();
      this.settings.$li = undefined;
      this.show('init');
    },

    pos_default : function (init) {
      var $nub = this.settings.$next_tip.find('.joyride-nub'),
          nub_width = Math.ceil($nub.outerWidth() / 2),
          nub_height = Math.ceil($nub.outerHeight() / 2),
          toggle = init || false;

      // tip must not be "display: none" to calculate position
      if (toggle) {
        this.settings.$next_tip.css('visibility', 'hidden');
        this.settings.$next_tip.show();
      }

      if (!/body/i.test(this.settings.$target.selector)) {
        var topAdjustment = this.settings.tip_settings.tipAdjustmentY ? parseInt(this.settings.tip_settings.tipAdjustmentY) : 0,
            leftAdjustment = this.settings.tip_settings.tipAdjustmentX ? parseInt(this.settings.tip_settings.tipAdjustmentX) : 0;

        if (this.bottom()) {
          if (this.rtl) {
            this.settings.$next_tip.css({
              top : (this.settings.$target.offset().top + nub_height + this.settings.$target.outerHeight() + topAdjustment),
              left : this.settings.$target.offset().left + this.settings.$target.outerWidth() - this.settings.$next_tip.outerWidth() + leftAdjustment});
          } else {
            this.settings.$next_tip.css({
              top : (this.settings.$target.offset().top + nub_height + this.settings.$target.outerHeight() + topAdjustment),
              left : this.settings.$target.offset().left + leftAdjustment});
          }

          this.nub_position($nub, this.settings.tip_settings.nub_position, 'top');

        } else if (this.top()) {
          if (this.rtl) {
            this.settings.$next_tip.css({
              top : (this.settings.$target.offset().top - this.settings.$next_tip.outerHeight() - nub_height + topAdjustment),
              left : this.settings.$target.offset().left + this.settings.$target.outerWidth() - this.settings.$next_tip.outerWidth()});
          } else {
            this.settings.$next_tip.css({
              top : (this.settings.$target.offset().top - this.settings.$next_tip.outerHeight() - nub_height + topAdjustment),
              left : this.settings.$target.offset().left + leftAdjustment});
          }

          this.nub_position($nub, this.settings.tip_settings.nub_position, 'bottom');

        } else if (this.right()) {

          this.settings.$next_tip.css({
            top : this.settings.$target.offset().top + topAdjustment,
            left : (this.settings.$target.outerWidth() + this.settings.$target.offset().left + nub_width + leftAdjustment)});

          this.nub_position($nub, this.settings.tip_settings.nub_position, 'left');

        } else if (this.left()) {

          this.settings.$next_tip.css({
            top : this.settings.$target.offset().top + topAdjustment,
            left : (this.settings.$target.offset().left - this.settings.$next_tip.outerWidth() - nub_width + leftAdjustment)});

          this.nub_position($nub, this.settings.tip_settings.nub_position, 'right');

        }

        if (!this.visible(this.corners(this.settings.$next_tip)) && this.settings.attempts < this.settings.tip_settings.tip_location_pattern.length) {

          $nub.removeClass('bottom')
            .removeClass('top')
            .removeClass('right')
            .removeClass('left');

          this.settings.tip_settings.tip_location = this.settings.tip_settings.tip_location_pattern[this.settings.attempts];

          this.settings.attempts++;

          this.pos_default();

        }

      } else if (this.settings.$li.length) {

        this.pos_modal($nub);

      }

      if (toggle) {
        this.settings.$next_tip.hide();
        this.settings.$next_tip.css('visibility', 'visible');
      }

    },

    pos_phone : function (init) {
      var tip_height = this.settings.$next_tip.outerHeight(),
          tip_offset = this.settings.$next_tip.offset(),
          target_height = this.settings.$target.outerHeight(),
          $nub = $('.joyride-nub', this.settings.$next_tip),
          nub_height = Math.ceil($nub.outerHeight() / 2),
          toggle = init || false;

      $nub.removeClass('bottom')
        .removeClass('top')
        .removeClass('right')
        .removeClass('left');

      if (toggle) {
        this.settings.$next_tip.css('visibility', 'hidden');
        this.settings.$next_tip.show();
      }

      if (!/body/i.test(this.settings.$target.selector)) {

        if (this.top()) {

            this.settings.$next_tip.offset({top : this.settings.$target.offset().top - tip_height - nub_height});
            $nub.addClass('bottom');

        } else {

          this.settings.$next_tip.offset({top : this.settings.$target.offset().top + target_height + nub_height});
          $nub.addClass('top');

        }

      } else if (this.settings.$li.length) {
        this.pos_modal($nub);
      }

      if (toggle) {
        this.settings.$next_tip.hide();
        this.settings.$next_tip.css('visibility', 'visible');
      }
    },

    pos_modal : function ($nub) {
      this.center();
      $nub.hide();

      this.show_modal();
    },

    show_modal : function () {
      if (!this.settings.$next_tip.data('closed')) {
        var joyridemodalbg =  $('.joyride-modal-bg');
        if (joyridemodalbg.length < 1) {
          var joyridemodalbg = $(this.settings.template.modal);
          joyridemodalbg.appendTo('body');
        }

        if (/pop/i.test(this.settings.tip_animation)) {
            joyridemodalbg.show();
        } else {
            joyridemodalbg.fadeIn(this.settings.tip_animation_fade_speed);
        }
      }
    },

    expose : function () {
      var expose,
          exposeCover,
          el,
          origCSS,
          origClasses,
          randId = 'expose-' + this.random_str(6);

      if (arguments.length > 0 && arguments[0] instanceof $) {
        el = arguments[0];
      } else if (this.settings.$target && !/body/i.test(this.settings.$target.selector)) {
        el = this.settings.$target;
      } else {
        return false;
      }

      if (el.length < 1) {
        if (window.console) {
          console.error('element not valid', el);
        }
        return false;
      }

      expose = $(this.settings.template.expose);
      this.settings.$body.append(expose);
      expose.css({
        top : el.offset().top,
        left : el.offset().left,
        width : el.outerWidth(true),
        height : el.outerHeight(true)
      });

      exposeCover = $(this.settings.template.expose_cover);

      origCSS = {
        zIndex : el.css('z-index'),
        position : el.css('position')
      };

      origClasses = el.attr('class') == null ? '' : el.attr('class');

      el.css('z-index', parseInt(expose.css('z-index')) + 1);

      if (origCSS.position == 'static') {
        el.css('position', 'relative');
      }

      el.data('expose-css', origCSS);
      el.data('orig-class', origClasses);
      el.attr('class', origClasses + ' ' + this.settings.expose_add_class);

      exposeCover.css({
        top : el.offset().top,
        left : el.offset().left,
        width : el.outerWidth(true),
        height : el.outerHeight(true)
      });

      if (this.settings.modal) {
        this.show_modal();
      }

      this.settings.$body.append(exposeCover);
      expose.addClass(randId);
      exposeCover.addClass(randId);
      el.data('expose', randId);
      this.settings.post_expose_callback(this.settings.$li.index(), this.settings.$next_tip, el);
      this.add_exposed(el);
    },

    un_expose : function () {
      var exposeId,
          el,
          expose,
          origCSS,
          origClasses,
          clearAll = false;

      if (arguments.length > 0 && arguments[0] instanceof $) {
        el = arguments[0];
      } else if (this.settings.$target && !/body/i.test(this.settings.$target.selector)) {
        el = this.settings.$target;
      } else {
        return false;
      }

      if (el.length < 1) {
        if (window.console) {
          console.error('element not valid', el);
        }
        return false;
      }

      exposeId = el.data('expose');
      expose = $('.' + exposeId);

      if (arguments.length > 1) {
        clearAll = arguments[1];
      }

      if (clearAll === true) {
        $('.joyride-expose-wrapper,.joyride-expose-cover').remove();
      } else {
        expose.remove();
      }

      origCSS = el.data('expose-css');

      if (origCSS.zIndex == 'auto') {
        el.css('z-index', '');
      } else {
        el.css('z-index', origCSS.zIndex);
      }

      if (origCSS.position != el.css('position')) {
        if (origCSS.position == 'static') {// this is default, no need to set it.
          el.css('position', '');
        } else {
          el.css('position', origCSS.position);
        }
      }

      origClasses = el.data('orig-class');
      el.attr('class', origClasses);
      el.removeData('orig-classes');

      el.removeData('expose');
      el.removeData('expose-z-index');
      this.remove_exposed(el);
    },

    add_exposed : function (el) {
      this.settings.exposed = this.settings.exposed || [];
      if (el instanceof $ || typeof el === 'object') {
        this.settings.exposed.push(el[0]);
      } else if (typeof el == 'string') {
        this.settings.exposed.push(el);
      }
    },

    remove_exposed : function (el) {
      var search, i;
      if (el instanceof $) {
        search = el[0]
      } else if (typeof el == 'string') {
        search = el;
      }

      this.settings.exposed = this.settings.exposed || [];
      i = this.settings.exposed.length;

      while (i--) {
        if (this.settings.exposed[i] == search) {
          this.settings.exposed.splice(i, 1);
          return;
        }
      }
    },

    center : function () {
      var $w = $(window);

      this.settings.$next_tip.css({
        top : ((($w.height() - this.settings.$next_tip.outerHeight()) / 2) + $w.scrollTop()),
        left : ((($w.width() - this.settings.$next_tip.outerWidth()) / 2) + $w.scrollLeft())
      });

      return true;
    },

    bottom : function () {
      return /bottom/i.test(this.settings.tip_settings.tip_location);
    },

    top : function () {
      return /top/i.test(this.settings.tip_settings.tip_location);
    },

    right : function () {
      return /right/i.test(this.settings.tip_settings.tip_location);
    },

    left : function () {
      return /left/i.test(this.settings.tip_settings.tip_location);
    },

    corners : function (el) {
      if (el.length === 0) {
         return [false, false, false, false];   
      }
      
      var w = $(window),
          window_half = w.height() / 2,
          //using this to calculate since scroll may not have finished yet.
          tipOffset = Math.ceil(this.settings.$target.offset().top - window_half + this.settings.$next_tip.outerHeight()),
          right = w.width() + w.scrollLeft(),
          offsetBottom =  w.height() + tipOffset,
          bottom = w.height() + w.scrollTop(),
          top = w.scrollTop();

      if (tipOffset < top) {
        if (tipOffset < 0) {
          top = 0;
        } else {
          top = tipOffset;
        }
      }

      if (offsetBottom > bottom) {
        bottom = offsetBottom;
      }

      return [
        el.offset().top < top,
        right < el.offset().left + el.outerWidth(),
        bottom < el.offset().top + el.outerHeight(),
        w.scrollLeft() > el.offset().left
      ];
    },

    visible : function (hidden_corners) {
      var i = hidden_corners.length;

      while (i--) {
        if (hidden_corners[i]) {
          return false;
        }
      }

      return true;
    },

    nub_position : function (nub, pos, def) {
      if (pos === 'auto') {
        nub.addClass(def);
      } else {
        nub.addClass(pos);
      }
    },

    startTimer : function () {
      if (this.settings.$li.length) {
        this.settings.automate = setTimeout(function () {
          this.hide();
          this.show();
          this.startTimer();
        }.bind(this), this.settings.timer);
      } else {
        clearTimeout(this.settings.automate);
      }
    },

    end : function (abort) {
      if (this.settings.cookie_monster) {
        $.cookie(this.settings.cookie_name, 'ridden', {expires : this.settings.cookie_expires, domain : this.settings.cookie_domain});
      }

      if (this.settings.timer > 0) {
        clearTimeout(this.settings.automate);
      }

      if (this.settings.modal && this.settings.expose) {
        this.un_expose();
      }

      // Unplug keystrokes listener
      $(this.scope).off('keyup.joyride')

      this.settings.$next_tip.data('closed', true);
      this.settings.riding = false;

      $('.joyride-modal-bg').hide();
      this.settings.$current_tip.hide();

      if (typeof abort === 'undefined' || abort === false) {
        this.settings.post_step_callback(this.settings.$li.index(), this.settings.$current_tip);
        this.settings.post_ride_callback(this.settings.$li.index(), this.settings.$current_tip);
      }

      $('.joyride-tip-guide').remove();
    },

    off : function () {
      $(this.scope).off('.joyride');
      $(window).off('.joyride');
      $('.joyride-close-tip, .joyride-next-tip, .joyride-modal-bg').off('.joyride');
      $('.joyride-tip-guide, .joyride-modal-bg').remove();
      clearTimeout(this.settings.automate);
    },

    reflow : function () {}
  };
}(jQuery, window, window.document));
/*
 * Foundation Responsive Library
 * http://foundation.zurb.com
 * Copyright 2015, ZURB
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/


(function ($, window, document, undefined) {
  'use strict';

  var header_helpers = function (class_array) {
    var head = $('head');
    head.prepend($.map(class_array, function (class_name) {
      if (head.has('.' + class_name).length === 0) {
        return '<meta class="' + class_name + '" />';
      }
    }));
  };

  header_helpers([
    'foundation-mq-small',
    'foundation-mq-small-only',
    'foundation-mq-medium',
    'foundation-mq-medium-only',
    'foundation-mq-large',
    'foundation-mq-large-only',
    'foundation-mq-xlarge',
    'foundation-mq-xlarge-only',
    'foundation-mq-xxlarge',
    'foundation-data-attribute-namespace']);

  // Enable FastClick if present

  $(function () {
    if (typeof FastClick !== 'undefined') {
      // Don't attach to body if undefined
      if (typeof document.body !== 'undefined') {
        FastClick.attach(document.body);
      }
    }
  });

  // private Fast Selector wrapper,
  // returns jQuery object. Only use where
  // getElementById is not available.
  var S = function (selector, context) {
    if (typeof selector === 'string') {
      if (context) {
        var cont;
        if (context.jquery) {
          cont = context[0];
          if (!cont) {
            return context;
          }
        } else {
          cont = context;
        }
        return $(cont.querySelectorAll(selector));
      }

      return $(document.querySelectorAll(selector));
    }

    return $(selector, context);
  };

  // Namespace functions.

  var attr_name = function (init) {
    var arr = [];
    if (!init) {
      arr.push('data');
    }
    if (this.namespace.length > 0) {
      arr.push(this.namespace);
    }
    arr.push(this.name);

    return arr.join('-');
  };

  var add_namespace = function (str) {
    var parts = str.split('-'),
        i = parts.length,
        arr = [];

    while (i--) {
      if (i !== 0) {
        arr.push(parts[i]);
      } else {
        if (this.namespace.length > 0) {
          arr.push(this.namespace, parts[i]);
        } else {
          arr.push(parts[i]);
        }
      }
    }

    return arr.reverse().join('-');
  };

  // Event binding and data-options updating.

  var bindings = function (method, options) {
    var self = this,
        bind = function(){
          var $this = S(this),
              should_bind_events = !$this.data(self.attr_name(true) + '-init');
          $this.data(self.attr_name(true) + '-init', $.extend({}, self.settings, (options || method), self.data_options($this)));

          if (should_bind_events) {
            self.events(this);
          }
        };

    if (S(this.scope).is('[' + this.attr_name() +']')) {
      bind.call(this.scope);
    } else {
      S('[' + this.attr_name() +']', this.scope).each(bind);
    }
    // # Patch to fix #5043 to move this *after* the if/else clause in order for Backbone and similar frameworks to have improved control over event binding and data-options updating.
    if (typeof method === 'string') {
      return this[method].call(this, options);
    }

  };

  var single_image_loaded = function (image, callback) {
    function loaded () {
      callback(image[0]);
    }

    function bindLoad () {
      this.one('load', loaded);

      if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
        var src = this.attr( 'src' ),
            param = src.match( /\?/ ) ? '&' : '?';

        param += 'random=' + (new Date()).getTime();
        this.attr('src', src + param);
      }
    }

    if (!image.attr('src')) {
      loaded();
      return;
    }

    if (image[0].complete || image[0].readyState === 4) {
      loaded();
    } else {
      bindLoad.call(image);
    }
  };

  /*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license */

  window.matchMedia || (window.matchMedia = function() {
      "use strict";

      // For browsers that support matchMedium api such as IE 9 and webkit
      var styleMedia = (window.styleMedia || window.media);

      // For those that don't support matchMedium
      if (!styleMedia) {
          var style       = document.createElement('style'),
              script      = document.getElementsByTagName('script')[0],
              info        = null;

          style.type  = 'text/css';
          style.id    = 'matchmediajs-test';

          script.parentNode.insertBefore(style, script);

          // 'style.currentStyle' is used by IE <= 8 and 'window.getComputedStyle' for all other browsers
          info = ('getComputedStyle' in window) && window.getComputedStyle(style, null) || style.currentStyle;

          styleMedia = {
              matchMedium: function(media) {
                  var text = '@media ' + media + '{ #matchmediajs-test { width: 1px; } }';

                  // 'style.styleSheet' is used by IE <= 8 and 'style.textContent' for all other browsers
                  if (style.styleSheet) {
                      style.styleSheet.cssText = text;
                  } else {
                      style.textContent = text;
                  }

                  // Test if media query is true or false
                  return info.width === '1px';
              }
          };
      }

      return function(media) {
          return {
              matches: styleMedia.matchMedium(media || 'all'),
              media: media || 'all'
          };
      };
  }());

  /*
   * jquery.requestAnimationFrame
   * https://github.com/gnarf37/jquery-requestAnimationFrame
   * Requires jQuery 1.8+
   *
   * Copyright (c) 2012 Corey Frang
   * Licensed under the MIT license.
   */

  (function(jQuery) {


  // requestAnimationFrame polyfill adapted from Erik Möller
  // fixes from Paul Irish and Tino Zijdel
  // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
  // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

  var animating,
      lastTime = 0,
      vendors = ['webkit', 'moz'],
      requestAnimationFrame = window.requestAnimationFrame,
      cancelAnimationFrame = window.cancelAnimationFrame,
      jqueryFxAvailable = 'undefined' !== typeof jQuery.fx;

  for (; lastTime < vendors.length && !requestAnimationFrame; lastTime++) {
    requestAnimationFrame = window[ vendors[lastTime] + 'RequestAnimationFrame' ];
    cancelAnimationFrame = cancelAnimationFrame ||
      window[ vendors[lastTime] + 'CancelAnimationFrame' ] ||
      window[ vendors[lastTime] + 'CancelRequestAnimationFrame' ];
  }

  function raf() {
    if (animating) {
      requestAnimationFrame(raf);

      if (jqueryFxAvailable) {
        jQuery.fx.tick();
      }
    }
  }

  if (requestAnimationFrame) {
    // use rAF
    window.requestAnimationFrame = requestAnimationFrame;
    window.cancelAnimationFrame = cancelAnimationFrame;

    if (jqueryFxAvailable) {
      jQuery.fx.timer = function (timer) {
        if (timer() && jQuery.timers.push(timer) && !animating) {
          animating = true;
          raf();
        }
      };

      jQuery.fx.stop = function () {
        animating = false;
      };
    }
  } else {
    // polyfill
    window.requestAnimationFrame = function (callback) {
      var currTime = new Date().getTime(),
        timeToCall = Math.max(0, 16 - (currTime - lastTime)),
        id = window.setTimeout(function () {
          callback(currTime + timeToCall);
        }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };

    window.cancelAnimationFrame = function (id) {
      clearTimeout(id);
    };

  }

  }( $ ));

  function removeQuotes (string) {
    if (typeof string === 'string' || string instanceof String) {
      string = string.replace(/^['\\/"]+|(;\s?})+|['\\/"]+$/g, '');
    }

    return string;
  }

  function MediaQuery(selector) {
    this.selector = selector;
    this.query = '';
  }

  MediaQuery.prototype.toString = function () {
    return this.query || (this.query = S(this.selector).css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ''));
  };

  window.Foundation = {
    name : 'Foundation',

    version : '5.5.3',

    media_queries : {
      'small'       : new MediaQuery('.foundation-mq-small'),
      'small-only'  : new MediaQuery('.foundation-mq-small-only'),
      'medium'      : new MediaQuery('.foundation-mq-medium'),
      'medium-only' : new MediaQuery('.foundation-mq-medium-only'),
      'large'       : new MediaQuery('.foundation-mq-large'),
      'large-only'  : new MediaQuery('.foundation-mq-large-only'),
      'xlarge'      : new MediaQuery('.foundation-mq-xlarge'),
      'xlarge-only' : new MediaQuery('.foundation-mq-xlarge-only'),
      'xxlarge'     : new MediaQuery('.foundation-mq-xxlarge')
    },

    stylesheet : $('<style></style>').appendTo('head')[0].sheet,

    global : {
      namespace : undefined
    },

    init : function (scope, libraries, method, options, response) {
      var args = [scope, method, options, response],
          responses = [];

      // check RTL
      this.rtl = /rtl/i.test(S('html').attr('dir'));

      // set foundation global scope
      this.scope = scope || this.scope;

      this.set_namespace();

      if (libraries && typeof libraries === 'string' && !/reflow/i.test(libraries)) {
        if (this.libs.hasOwnProperty(libraries)) {
          responses.push(this.init_lib(libraries, args));
        }
      } else {
        for (var lib in this.libs) {
          responses.push(this.init_lib(lib, libraries));
        }
      }

      S(window).load(function () {
        S(window)
          .trigger('resize.fndtn.clearing')
          .trigger('resize.fndtn.dropdown')
          .trigger('resize.fndtn.equalizer')
          .trigger('resize.fndtn.interchange')
          .trigger('resize.fndtn.joyride')
          .trigger('resize.fndtn.magellan')
          .trigger('resize.fndtn.topbar')
          .trigger('resize.fndtn.slider');
      });

      return scope;
    },

    init_lib : function (lib, args) {
      if (this.libs.hasOwnProperty(lib)) {
        this.patch(this.libs[lib]);

        if (args && args.hasOwnProperty(lib)) {
            if (typeof this.libs[lib].settings !== 'undefined') {
              $.extend(true, this.libs[lib].settings, args[lib]);
            } else if (typeof this.libs[lib].defaults !== 'undefined') {
              $.extend(true, this.libs[lib].defaults, args[lib]);
            }
          return this.libs[lib].init.apply(this.libs[lib], [this.scope, args[lib]]);
        }

        args = args instanceof Array ? args : new Array(args);
        return this.libs[lib].init.apply(this.libs[lib], args);
      }

      return function () {};
    },

    patch : function (lib) {
      lib.scope = this.scope;
      lib.namespace = this.global.namespace;
      lib.rtl = this.rtl;
      lib['data_options'] = this.utils.data_options;
      lib['attr_name'] = attr_name;
      lib['add_namespace'] = add_namespace;
      lib['bindings'] = bindings;
      lib['S'] = this.utils.S;
    },

    inherit : function (scope, methods) {
      var methods_arr = methods.split(' '),
          i = methods_arr.length;

      while (i--) {
        if (this.utils.hasOwnProperty(methods_arr[i])) {
          scope[methods_arr[i]] = this.utils[methods_arr[i]];
        }
      }
    },

    set_namespace : function () {

      // Description:
      //    Don't bother reading the namespace out of the meta tag
      //    if the namespace has been set globally in javascript
      //
      // Example:
      //    Foundation.global.namespace = 'my-namespace';
      // or make it an empty string:
      //    Foundation.global.namespace = '';
      //
      //

      // If the namespace has not been set (is undefined), try to read it out of the meta element.
      // Otherwise use the globally defined namespace, even if it's empty ('')
      var namespace = ( this.global.namespace === undefined ) ? $('.foundation-data-attribute-namespace').css('font-family') : this.global.namespace;

      // Finally, if the namsepace is either undefined or false, set it to an empty string.
      // Otherwise use the namespace value.
      this.global.namespace = ( namespace === undefined || /false/i.test(namespace) ) ? '' : namespace;
    },

    libs : {},

    // methods that can be inherited in libraries
    utils : {

      // Description:
      //    Fast Selector wrapper returns jQuery object. Only use where getElementById
      //    is not available.
      //
      // Arguments:
      //    Selector (String): CSS selector describing the element(s) to be
      //    returned as a jQuery object.
      //
      //    Scope (String): CSS selector describing the area to be searched. Default
      //    is document.
      //
      // Returns:
      //    Element (jQuery Object): jQuery object containing elements matching the
      //    selector within the scope.
      S : S,

      // Description:
      //    Executes a function a max of once every n milliseconds
      //
      // Arguments:
      //    Func (Function): Function to be throttled.
      //
      //    Delay (Integer): Function execution threshold in milliseconds.
      //
      // Returns:
      //    Lazy_function (Function): Function with throttling applied.
      throttle : function (func, delay) {
        var timer = null;

        return function () {
          var context = this, args = arguments;

          if (timer == null) {
            timer = setTimeout(function () {
              func.apply(context, args);
              timer = null;
            }, delay);
          }
        };
      },

      // Description:
      //    Executes a function when it stops being invoked for n seconds
      //    Modified version of _.debounce() http://underscorejs.org
      //
      // Arguments:
      //    Func (Function): Function to be debounced.
      //
      //    Delay (Integer): Function execution threshold in milliseconds.
      //
      //    Immediate (Bool): Whether the function should be called at the beginning
      //    of the delay instead of the end. Default is false.
      //
      // Returns:
      //    Lazy_function (Function): Function with debouncing applied.
      debounce : function (func, delay, immediate) {
        var timeout, result;
        return function () {
          var context = this, args = arguments;
          var later = function () {
            timeout = null;
            if (!immediate) {
              result = func.apply(context, args);
            }
          };
          var callNow = immediate && !timeout;
          clearTimeout(timeout);
          timeout = setTimeout(later, delay);
          if (callNow) {
            result = func.apply(context, args);
          }
          return result;
        };
      },

      // Description:
      //    Parses data-options attribute
      //
      // Arguments:
      //    El (jQuery Object): Element to be parsed.
      //
      // Returns:
      //    Options (Javascript Object): Contents of the element's data-options
      //    attribute.
      data_options : function (el, data_attr_name) {
        data_attr_name = data_attr_name || 'options';
        var opts = {}, ii, p, opts_arr,
            data_options = function (el) {
              var namespace = Foundation.global.namespace;

              if (namespace.length > 0) {
                return el.data(namespace + '-' + data_attr_name);
              }

              return el.data(data_attr_name);
            };

        var cached_options = data_options(el);

        if (typeof cached_options === 'object') {
          return cached_options;
        }

        opts_arr = (cached_options || ':').split(';');
        ii = opts_arr.length;

        function isNumber (o) {
          return !isNaN (o - 0) && o !== null && o !== '' && o !== false && o !== true;
        }

        function trim (str) {
          if (typeof str === 'string') {
            return $.trim(str);
          }
          return str;
        }

        while (ii--) {
          p = opts_arr[ii].split(':');
          p = [p[0], p.slice(1).join(':')];

          if (/true/i.test(p[1])) {
            p[1] = true;
          }
          if (/false/i.test(p[1])) {
            p[1] = false;
          }
          if (isNumber(p[1])) {
            if (p[1].indexOf('.') === -1) {
              p[1] = parseInt(p[1], 10);
            } else {
              p[1] = parseFloat(p[1]);
            }
          }

          if (p.length === 2 && p[0].length > 0) {
            opts[trim(p[0])] = trim(p[1]);
          }
        }

        return opts;
      },

      // Description:
      //    Adds JS-recognizable media queries
      //
      // Arguments:
      //    Media (String): Key string for the media query to be stored as in
      //    Foundation.media_queries
      //
      //    Class (String): Class name for the generated <meta> tag
      register_media : function (media, media_class) {
        if (Foundation.media_queries[media] === undefined) {
          $('head').append('<meta class="' + media_class + '"/>');
          Foundation.media_queries[media] = removeQuotes($('.' + media_class).css('font-family'));
        }
      },

      // Description:
      //    Add custom CSS within a JS-defined media query
      //
      // Arguments:
      //    Rule (String): CSS rule to be appended to the document.
      //
      //    Media (String): Optional media query string for the CSS rule to be
      //    nested under.
      add_custom_rule : function (rule, media) {
        if (media === undefined && Foundation.stylesheet) {
          Foundation.stylesheet.insertRule(rule, Foundation.stylesheet.cssRules.length);
        } else {
          var query = Foundation.media_queries[media];

          if (query !== undefined) {
            Foundation.stylesheet.insertRule('@media ' +
              Foundation.media_queries[media] + '{ ' + rule + ' }', Foundation.stylesheet.cssRules.length);
          }
        }
      },

      // Description:
      //    Performs a callback function when an image is fully loaded
      //
      // Arguments:
      //    Image (jQuery Object): Image(s) to check if loaded.
      //
      //    Callback (Function): Function to execute when image is fully loaded.
      image_loaded : function (images, callback) {
        var self = this,
            unloaded = images.length;

        function pictures_has_height(images) {
          var pictures_number = images.length;

          for (var i = pictures_number - 1; i >= 0; i--) {
            if(images.attr('height') === undefined) {
              return false;
            };
          };

          return true;
        }

        if (unloaded === 0 || pictures_has_height(images)) {
          callback(images);
        }

        images.each(function () {
          single_image_loaded(self.S(this), function () {
            unloaded -= 1;
            if (unloaded === 0) {
              callback(images);
            }
          });
        });
      },

      // Description:
      //    Returns a random, alphanumeric string
      //
      // Arguments:
      //    Length (Integer): Length of string to be generated. Defaults to random
      //    integer.
      //
      // Returns:
      //    Rand (String): Pseudo-random, alphanumeric string.
      random_str : function () {
        if (!this.fidx) {
          this.fidx = 0;
        }
        this.prefix = this.prefix || [(this.name || 'F'), (+new Date).toString(36)].join('-');

        return this.prefix + (this.fidx++).toString(36);
      },

      // Description:
      //    Helper for window.matchMedia
      //
      // Arguments:
      //    mq (String): Media query
      //
      // Returns:
      //    (Boolean): Whether the media query passes or not
      match : function (mq) {
        return window.matchMedia(mq).matches;
      },

      // Description:
      //    Helpers for checking Foundation default media queries with JS
      //
      // Returns:
      //    (Boolean): Whether the media query passes or not

      is_small_up : function () {
        return this.match(Foundation.media_queries.small);
      },

      is_medium_up : function () {
        return this.match(Foundation.media_queries.medium);
      },

      is_large_up : function () {
        return this.match(Foundation.media_queries.large);
      },

      is_xlarge_up : function () {
        return this.match(Foundation.media_queries.xlarge);
      },

      is_xxlarge_up : function () {
        return this.match(Foundation.media_queries.xxlarge);
      },

      is_small_only : function () {
        return !this.is_medium_up() && !this.is_large_up() && !this.is_xlarge_up() && !this.is_xxlarge_up();
      },

      is_medium_only : function () {
        return this.is_medium_up() && !this.is_large_up() && !this.is_xlarge_up() && !this.is_xxlarge_up();
      },

      is_large_only : function () {
        return this.is_medium_up() && this.is_large_up() && !this.is_xlarge_up() && !this.is_xxlarge_up();
      },

      is_xlarge_only : function () {
        return this.is_medium_up() && this.is_large_up() && this.is_xlarge_up() && !this.is_xxlarge_up();
      },

      is_xxlarge_only : function () {
        return this.is_medium_up() && this.is_large_up() && this.is_xlarge_up() && this.is_xxlarge_up();
      }
    }
  };

  $.fn.foundation = function () {
    var args = Array.prototype.slice.call(arguments, 0);

    return this.each(function () {
      Foundation.init.apply(Foundation, [this].concat(args));
      return this;
    });
  };

}(jQuery, window, window.document));
;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs['magellan-expedition'] = {
    name : 'magellan-expedition',

    version : '5.5.3',

    settings : {
      active_class : 'active',
      threshold : 0, // pixels from the top of the expedition for it to become fixes
      destination_threshold : 20, // pixels from the top of destination for it to be considered active
      throttle_delay : 30, // calculation throttling to increase framerate
      fixed_top : 0, // top distance in pixels assigend to the fixed element on scroll
      offset_by_height : true,  // whether to offset the destination by the expedition height. Usually you want this to be true, unless your expedition is on the side.
      duration : 700, // animation duration time
      easing : 'swing' // animation easing
    },

    init : function (scope, method, options) {
      Foundation.inherit(this, 'throttle');
      this.bindings(method, options);
    },

    events : function () {
      var self = this,
          S = self.S,
          settings = self.settings;

      // initialize expedition offset
      self.set_expedition_position();

      S(self.scope)
        .off('.magellan')
        .on('click.fndtn.magellan', '[' + self.add_namespace('data-magellan-arrival') + '] a[href*=#]', function (e) {
          var sameHost = ((this.hostname === location.hostname) || !this.hostname),
              samePath = self.filterPathname(location.pathname) === self.filterPathname(this.pathname),
              testHash = this.hash.replace(/(:|\.|\/)/g, '\\$1'),
              anchor = this;

          if (sameHost && samePath && testHash) {
            e.preventDefault();
            var expedition = $(this).closest('[' + self.attr_name() + ']'),
                settings = expedition.data('magellan-expedition-init'),
                hash = this.hash.split('#').join(''),
                target = $('a[name="' + hash + '"]');

            if (target.length === 0) {
              target = $('#' + hash);

            }

            // Account for expedition height if fixed position
            var scroll_top = target.offset().top - settings.destination_threshold + 1;
            if (settings.offset_by_height) {
              scroll_top = scroll_top - expedition.outerHeight();
            }
            $('html, body').stop().animate({
              'scrollTop' : scroll_top
            }, settings.duration, settings.easing, function () {
              if (history.pushState) {
                history.pushState(null, null, anchor.pathname + anchor.search + '#' + hash);
              } else {
                location.hash = anchor.pathname + anchor.search + '#' + hash;
              }
            });
          }
        })
        .on('scroll.fndtn.magellan', self.throttle(this.check_for_arrivals.bind(this), settings.throttle_delay));
    },

    check_for_arrivals : function () {
      var self = this;
      self.update_arrivals();
      self.update_expedition_positions();
    },

    set_expedition_position : function () {
      var self = this;
      $('[' + this.attr_name() + '=fixed]', self.scope).each(function (idx, el) {
        var expedition = $(this),
            settings = expedition.data('magellan-expedition-init'),
            styles = expedition.attr('styles'), // save styles
            top_offset, fixed_top;

        expedition.attr('style', '');
        top_offset = expedition.offset().top + settings.threshold;

        //set fixed-top by attribute
        fixed_top = parseInt(expedition.data('magellan-fixed-top'));
        if (!isNaN(fixed_top)) {
          self.settings.fixed_top = fixed_top;
        }

        expedition.data(self.data_attr('magellan-top-offset'), top_offset);
        expedition.attr('style', styles);
      });
    },

    update_expedition_positions : function () {
      var self = this,
          window_top_offset = $(window).scrollTop();

      $('[' + this.attr_name() + '=fixed]', self.scope).each(function () {
        var expedition = $(this),
            settings = expedition.data('magellan-expedition-init'),
            styles = expedition.attr('style'), // save styles
            top_offset = expedition.data('magellan-top-offset');

        //scroll to the top distance
        if (window_top_offset + self.settings.fixed_top >= top_offset) {
          // Placeholder allows height calculations to be consistent even when
          // appearing to switch between fixed/non-fixed placement
          var placeholder = expedition.prev('[' + self.add_namespace('data-magellan-expedition-clone') + ']');
          if (placeholder.length === 0) {
            placeholder = expedition.clone();
            placeholder.removeAttr(self.attr_name());
            placeholder.attr(self.add_namespace('data-magellan-expedition-clone'), '');
            expedition.before(placeholder);
          }
          expedition.css({position :'fixed', top : settings.fixed_top}).addClass('fixed');
        } else {
          expedition.prev('[' + self.add_namespace('data-magellan-expedition-clone') + ']').remove();
          expedition.attr('style', styles).css('position', '').css('top', '').removeClass('fixed');
        }
      });
    },

    update_arrivals : function () {
      var self = this,
          window_top_offset = $(window).scrollTop();

      $('[' + this.attr_name() + ']', self.scope).each(function () {
        var expedition = $(this),
            settings = expedition.data(self.attr_name(true) + '-init'),
            offsets = self.offsets(expedition, window_top_offset),
            arrivals = expedition.find('[' + self.add_namespace('data-magellan-arrival') + ']'),
            active_item = false;
        offsets.each(function (idx, item) {
          if (item.viewport_offset >= item.top_offset) {
            var arrivals = expedition.find('[' + self.add_namespace('data-magellan-arrival') + ']');
            arrivals.not(item.arrival).removeClass(settings.active_class);
            item.arrival.addClass(settings.active_class);
            active_item = true;
            return true;
          }
        });

        if (!active_item) {
          arrivals.removeClass(settings.active_class);
        }
      });
    },

    offsets : function (expedition, window_offset) {
      var self = this,
          settings = expedition.data(self.attr_name(true) + '-init'),
          viewport_offset = window_offset;

      return expedition.find('[' + self.add_namespace('data-magellan-arrival') + ']').map(function (idx, el) {
        var name = $(this).data(self.data_attr('magellan-arrival')),
            dest = $('[' + self.add_namespace('data-magellan-destination') + '=' + name + ']');
        if (dest.length > 0) {
          var top_offset = dest.offset().top - settings.destination_threshold;
          if (settings.offset_by_height) {
            top_offset = top_offset - expedition.outerHeight();
          }
          top_offset = Math.floor(top_offset);
          return {
            destination : dest,
            arrival : $(this),
            top_offset : top_offset,
            viewport_offset : viewport_offset
          }
        }
      }).sort(function (a, b) {
        if (a.top_offset < b.top_offset) {
          return -1;
        }
        if (a.top_offset > b.top_offset) {
          return 1;
        }
        return 0;
      });
    },

    data_attr : function (str) {
      if (this.namespace.length > 0) {
        return this.namespace + '-' + str;
      }

      return str;
    },

    off : function () {
      this.S(this.scope).off('.magellan');
      this.S(window).off('.magellan');
    },

    filterPathname : function (pathname) {
      pathname = pathname || '';
      return pathname
          .replace(/^\//,'')
          .replace(/(?:index|default).[a-zA-Z]{3,4}$/,'')
          .replace(/\/$/,'');
    },

    reflow : function () {
      var self = this;
      // remove placeholder expeditions used for height calculation purposes
      $('[' + self.add_namespace('data-magellan-expedition-clone') + ']', self.scope).remove();
    }
  };
}(jQuery, window, window.document));
;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.offcanvas = {
    name : 'offcanvas',

    version : '5.5.3',

    settings : {
      open_method : 'move',
      close_on_click : false
    },

    init : function (scope, method, options) {
      this.bindings(method, options);
    },

    events : function () {
      var self = this,
          S = self.S,
          move_class = '',
          right_postfix = '',
          left_postfix = '',
          top_postfix = '',
          bottom_postfix = '';

      if (this.settings.open_method === 'move') {
        move_class = 'move-';
        right_postfix = 'right';
        left_postfix = 'left';
        top_postfix = 'top';
        bottom_postfix = 'bottom';
      } else if (this.settings.open_method === 'overlap_single') {
        move_class = 'offcanvas-overlap-';
        right_postfix = 'right';
        left_postfix = 'left';
        top_postfix = 'top';
        bottom_postfix = 'bottom';
      } else if (this.settings.open_method === 'overlap') {
        move_class = 'offcanvas-overlap';
      }

      S(this.scope).off('.offcanvas')
        .on('click.fndtn.offcanvas', '.left-off-canvas-toggle', function (e) {
          self.click_toggle_class(e, move_class + right_postfix);
          if (self.settings.open_method !== 'overlap') {
            S('.left-submenu').removeClass(move_class + right_postfix);
          }
          $('.left-off-canvas-toggle').attr('aria-expanded', 'true');
        })
        .on('click.fndtn.offcanvas', '.left-off-canvas-menu a', function (e) {
          var settings = self.get_settings(e);
          var parent = S(this).parent();

          if (settings.close_on_click && !parent.hasClass('has-submenu') && !parent.hasClass('back')) {
            self.hide.call(self, move_class + right_postfix, self.get_wrapper(e));
            parent.parent().removeClass(move_class + right_postfix);
          } else if (S(this).parent().hasClass('has-submenu')) {
            e.preventDefault();
            S(this).siblings('.left-submenu').toggleClass(move_class + right_postfix);
          } else if (parent.hasClass('back')) {
            e.preventDefault();
            parent.parent().removeClass(move_class + right_postfix);
          }
          $('.left-off-canvas-toggle').attr('aria-expanded', 'true');
        })
        //end of left canvas
        .on('click.fndtn.offcanvas', '.right-off-canvas-toggle', function (e) {
          self.click_toggle_class(e, move_class + left_postfix);
          if (self.settings.open_method !== 'overlap') {
            S('.right-submenu').removeClass(move_class + left_postfix);
          }
          $('.right-off-canvas-toggle').attr('aria-expanded', 'true');
        })
        .on('click.fndtn.offcanvas', '.right-off-canvas-menu a', function (e) {
          var settings = self.get_settings(e);
          var parent = S(this).parent();

          if (settings.close_on_click && !parent.hasClass('has-submenu') && !parent.hasClass('back')) {
            self.hide.call(self, move_class + left_postfix, self.get_wrapper(e));
            parent.parent().removeClass(move_class + left_postfix);
          } else if (S(this).parent().hasClass('has-submenu')) {
            e.preventDefault();
            S(this).siblings('.right-submenu').toggleClass(move_class + left_postfix);
          } else if (parent.hasClass('back')) {
            e.preventDefault();
            parent.parent().removeClass(move_class + left_postfix);
          }
          $('.right-off-canvas-toggle').attr('aria-expanded', 'true');
        })
        //end of right canvas
        .on('click.fndtn.offcanvas', '.top-off-canvas-toggle', function (e) {
          self.click_toggle_class(e, move_class + bottom_postfix);
          if (self.settings.open_method !== 'overlap') {
            S('.top-submenu').removeClass(move_class + bottom_postfix);
          }
          $('.top-off-canvas-toggle').attr('aria-expanded', 'true');
        })
        .on('click.fndtn.offcanvas', '.top-off-canvas-menu a', function (e) {
          var settings = self.get_settings(e);
          var parent = S(this).parent();

          if (settings.close_on_click && !parent.hasClass('has-submenu') && !parent.hasClass('back')) {
            self.hide.call(self, move_class + bottom_postfix, self.get_wrapper(e));
            parent.parent().removeClass(move_class + bottom_postfix);
          } else if (S(this).parent().hasClass('has-submenu')) {
            e.preventDefault();
            S(this).siblings('.top-submenu').toggleClass(move_class + bottom_postfix);
          } else if (parent.hasClass('back')) {
            e.preventDefault();
            parent.parent().removeClass(move_class + bottom_postfix);
          }
          $('.top-off-canvas-toggle').attr('aria-expanded', 'true');
        })
        //end of top canvas
        .on('click.fndtn.offcanvas', '.bottom-off-canvas-toggle', function (e) {
          self.click_toggle_class(e, move_class + top_postfix);
          if (self.settings.open_method !== 'overlap') {
            S('.bottom-submenu').removeClass(move_class + top_postfix);
          }
          $('.bottom-off-canvas-toggle').attr('aria-expanded', 'true');
        })
        .on('click.fndtn.offcanvas', '.bottom-off-canvas-menu a', function (e) {
          var settings = self.get_settings(e);
          var parent = S(this).parent();

          if (settings.close_on_click && !parent.hasClass('has-submenu') && !parent.hasClass('back')) {
            self.hide.call(self, move_class + top_postfix, self.get_wrapper(e));
            parent.parent().removeClass(move_class + top_postfix);
          } else if (S(this).parent().hasClass('has-submenu')) {
            e.preventDefault();
            S(this).siblings('.bottom-submenu').toggleClass(move_class + top_postfix);
          } else if (parent.hasClass('back')) {
            e.preventDefault();
            parent.parent().removeClass(move_class + top_postfix);
          }
          $('.bottom-off-canvas-toggle').attr('aria-expanded', 'true');
        })
        //end of bottom
        .on('click.fndtn.offcanvas', '.exit-off-canvas', function (e) {
          self.click_remove_class(e, move_class + left_postfix);
          S('.right-submenu').removeClass(move_class + left_postfix);
          if (right_postfix) {
            self.click_remove_class(e, move_class + right_postfix);
            S('.left-submenu').removeClass(move_class + left_postfix);
          }
          $('.right-off-canvas-toggle').attr('aria-expanded', 'true');
        })
        .on('click.fndtn.offcanvas', '.exit-off-canvas', function (e) {
          self.click_remove_class(e, move_class + left_postfix);
          $('.left-off-canvas-toggle').attr('aria-expanded', 'false');
          if (right_postfix) {
            self.click_remove_class(e, move_class + right_postfix);
            $('.right-off-canvas-toggle').attr('aria-expanded', 'false');
          }
        })
        .on('click.fndtn.offcanvas', '.exit-off-canvas', function (e) {
          self.click_remove_class(e, move_class + top_postfix);
          S('.bottom-submenu').removeClass(move_class + top_postfix);
          if (bottom_postfix) {
            self.click_remove_class(e, move_class + bottom_postfix);
            S('.top-submenu').removeClass(move_class + top_postfix);
          }
          $('.bottom-off-canvas-toggle').attr('aria-expanded', 'true');
        })
        .on('click.fndtn.offcanvas', '.exit-off-canvas', function (e) {
          self.click_remove_class(e, move_class + top_postfix);
          $('.top-off-canvas-toggle').attr('aria-expanded', 'false');
          if (bottom_postfix) {
            self.click_remove_class(e, move_class + bottom_postfix);
            $('.bottom-off-canvas-toggle').attr('aria-expanded', 'false');
          }
        });
    },

    toggle : function (class_name, $off_canvas) {
      $off_canvas = $off_canvas || this.get_wrapper();
      if ($off_canvas.is('.' + class_name)) {
        this.hide(class_name, $off_canvas);
      } else {
        this.show(class_name, $off_canvas);
      }
    },

    show : function (class_name, $off_canvas) {
      $off_canvas = $off_canvas || this.get_wrapper();
      $off_canvas.trigger('open.fndtn.offcanvas');
      $off_canvas.addClass(class_name);
    },

    hide : function (class_name, $off_canvas) {
      $off_canvas = $off_canvas || this.get_wrapper();
      $off_canvas.trigger('close.fndtn.offcanvas');
      $off_canvas.removeClass(class_name);
    },

    click_toggle_class : function (e, class_name) {
      e.preventDefault();
      var $off_canvas = this.get_wrapper(e);
      this.toggle(class_name, $off_canvas);
    },

    click_remove_class : function (e, class_name) {
      e.preventDefault();
      var $off_canvas = this.get_wrapper(e);
      this.hide(class_name, $off_canvas);
    },

    get_settings : function (e) {
      var offcanvas  = this.S(e.target).closest('[' + this.attr_name() + ']');
      return offcanvas.data(this.attr_name(true) + '-init') || this.settings;
    },

    get_wrapper : function (e) {
      var $off_canvas = this.S(e ? e.target : this.scope).closest('.off-canvas-wrap');

      if ($off_canvas.length === 0) {
        $off_canvas = this.S('.off-canvas-wrap');
      }
      return $off_canvas;
    },

    reflow : function () {}
  };
}(jQuery, window, window.document));
;(function ($, window, document, undefined) {
  'use strict';

  var noop = function () {};

  var Orbit = function (el, settings) {
    // Don't reinitialize plugin
    if (el.hasClass(settings.slides_container_class)) {
      return this;
    }

    var self = this,
        container,
        slides_container = el,
        number_container,
        bullets_container,
        timer_container,
        idx = 0,
        animate,
        timer,
        locked = false,
        adjust_height_after = false;

    self.slides = function () {
      return slides_container.children(settings.slide_selector);
    };

    self.slides().first().addClass(settings.active_slide_class);

    self.update_slide_number = function (index) {
      if (settings.slide_number) {
        number_container.find('span:first').text(parseInt(index) + 1);
        number_container.find('span:last').text(self.slides().length);
      }
      if (settings.bullets) {
        bullets_container.children().removeClass(settings.bullets_active_class);
        $(bullets_container.children().get(index)).addClass(settings.bullets_active_class);
      }
    };

    self.update_active_link = function (index) {
      var link = $('[data-orbit-link="' + self.slides().eq(index).attr('data-orbit-slide') + '"]');
      link.siblings().removeClass(settings.bullets_active_class);
      link.addClass(settings.bullets_active_class);
    };

    self.build_markup = function () {
      slides_container.wrap('<div class="' + settings.container_class + '"></div>');
      container = slides_container.parent();
      slides_container.addClass(settings.slides_container_class);

      if (settings.stack_on_small) {
        container.addClass(settings.stack_on_small_class);
      }

      if (settings.navigation_arrows) {
        container.append($('<a href="#"><span></span></a>').addClass(settings.prev_class));
        container.append($('<a href="#"><span></span></a>').addClass(settings.next_class));
      }

      if (settings.timer) {
        timer_container = $('<div>').addClass(settings.timer_container_class);
        timer_container.append('<span>');
        timer_container.append($('<div>').addClass(settings.timer_progress_class));
        timer_container.addClass(settings.timer_paused_class);
        container.append(timer_container);
      }

      if (settings.slide_number) {
        number_container = $('<div>').addClass(settings.slide_number_class);
        number_container.append('<span></span> ' + settings.slide_number_text + ' <span></span>');
        container.append(number_container);
      }

      if (settings.bullets) {
        bullets_container = $('<ol>').addClass(settings.bullets_container_class);
        container.append(bullets_container);
        bullets_container.wrap('<div class="orbit-bullets-container"></div>');
        self.slides().each(function (idx, el) {
          var bullet = $('<li>').attr('data-orbit-slide', idx).on('click', self.link_bullet);;
          bullets_container.append(bullet);
        });
      }

    };

    self._goto = function (next_idx, start_timer) {
      // if (locked) {return false;}
      if (next_idx === idx) {return false;}
      if (typeof timer === 'object') {timer.restart();}
      var slides = self.slides();

      var dir = 'next';
      locked = true;
      if (next_idx < idx) {dir = 'prev';}
      if (next_idx >= slides.length) {
        if (!settings.circular) {
          return false;
        }
        next_idx = 0;
      } else if (next_idx < 0) {
        if (!settings.circular) {
          return false;
        }
        next_idx = slides.length - 1;
      }

      var current = $(slides.get(idx));
      var next = $(slides.get(next_idx));

      current.css('zIndex', 2);
      current.removeClass(settings.active_slide_class);
      next.css('zIndex', 4).addClass(settings.active_slide_class);

      slides_container.trigger('before-slide-change.fndtn.orbit');
      settings.before_slide_change();
      self.update_active_link(next_idx);

      var callback = function () {
        var unlock = function () {
          idx = next_idx;
          locked = false;
          if (start_timer === true) {timer = self.create_timer(); timer.start();}
          self.update_slide_number(idx);
          slides_container.trigger('after-slide-change.fndtn.orbit', [{slide_number : idx, total_slides : slides.length}]);
          settings.after_slide_change(idx, slides.length);
        };
        if (slides_container.outerHeight() != next.outerHeight() && settings.variable_height) {
          slides_container.animate({'height': next.outerHeight()}, 250, 'linear', unlock);
        } else {
          unlock();
        }
      };

      if (slides.length === 1) {callback(); return false;}

      var start_animation = function () {
        if (dir === 'next') {animate.next(current, next, callback);}
        if (dir === 'prev') {animate.prev(current, next, callback);}
      };

      if (next.outerHeight() > slides_container.outerHeight() && settings.variable_height) {
        slides_container.animate({'height': next.outerHeight()}, 250, 'linear', start_animation);
      } else {
        start_animation();
      }
    };

    self.next = function (e) {
      e.stopImmediatePropagation();
      e.preventDefault();
      self._goto(idx + 1);
    };

    self.prev = function (e) {
      e.stopImmediatePropagation();
      e.preventDefault();
      self._goto(idx - 1);
    };

    self.link_custom = function (e) {
      e.preventDefault();
      var link = $(this).attr('data-orbit-link');
      if ((typeof link === 'string') && (link = $.trim(link)) != '') {
        var slide = container.find('[data-orbit-slide=' + link + ']');
        if (slide.index() != -1) {self._goto(slide.index());}
      }
    };

    self.link_bullet = function (e) {
      var index = $(this).attr('data-orbit-slide');
      if ((typeof index === 'string') && (index = $.trim(index)) != '') {
        if (isNaN(parseInt(index))) {
          var slide = container.find('[data-orbit-slide=' + index + ']');
          if (slide.index() != -1) {self._goto(slide.index() + 1);}
        } else {
          self._goto(parseInt(index));
        }
      }

    }

    self.timer_callback = function () {
      self._goto(idx + 1, true);
    }

    self.compute_dimensions = function () {
      var current = $(self.slides().get(idx));
      var h = current.outerHeight();
      if (!settings.variable_height) {
        self.slides().each(function(){
          if ($(this).outerHeight() > h) { h = $(this).outerHeight(); }
        });
      }
      slides_container.height(h);
    };

    self.create_timer = function () {
      var t = new Timer(
        container.find('.' + settings.timer_container_class),
        settings,
        self.timer_callback
      );
      return t;
    };

    self.stop_timer = function () {
      if (typeof timer === 'object') {
        timer.stop();
      }
    };

    self.toggle_timer = function () {
      var t = container.find('.' + settings.timer_container_class);
      if (t.hasClass(settings.timer_paused_class)) {
        if (typeof timer === 'undefined') {timer = self.create_timer();}
        timer.start();
      } else {
        if (typeof timer === 'object') {timer.stop();}
      }
    };

    self.init = function () {
      self.build_markup();
      if (settings.timer) {
        timer = self.create_timer();
        Foundation.utils.image_loaded(this.slides().children('img'), timer.start);
      }
      animate = new FadeAnimation(settings, slides_container);
      if (settings.animation === 'slide') {
        animate = new SlideAnimation(settings, slides_container);
      }

      container.on('click', '.' + settings.next_class, self.next);
      container.on('click', '.' + settings.prev_class, self.prev);

      if (settings.next_on_click) {
        container.on('click', '.' + settings.slides_container_class + ' [data-orbit-slide]', self.link_bullet);
      }

      container.on('click', self.toggle_timer);
      if (settings.swipe) {
        container.on('touchstart.fndtn.orbit', function (e) {
          if (!e.touches) {e = e.originalEvent;}
          var data = {
            start_page_x : e.touches[0].pageX,
            start_page_y : e.touches[0].pageY,
            start_time : (new Date()).getTime(),
            delta_x : 0,
            is_scrolling : undefined
          };
          container.data('swipe-transition', data);
          e.stopPropagation();
        })
        .on('touchmove.fndtn.orbit', function (e) {
          if (!e.touches) {
            e = e.originalEvent;
          }
          // Ignore pinch/zoom events
          if (e.touches.length > 1 || e.scale && e.scale !== 1) {
            return;
          }

          var data = container.data('swipe-transition');
          if (typeof data === 'undefined') {data = {};}

          data.delta_x = e.touches[0].pageX - data.start_page_x;

          if ( typeof data.is_scrolling === 'undefined') {
            data.is_scrolling = !!( data.is_scrolling || Math.abs(data.delta_x) < Math.abs(e.touches[0].pageY - data.start_page_y) );
          }

          if (!data.is_scrolling && !data.active) {
            e.preventDefault();
            var direction = (data.delta_x < 0) ? (idx + 1) : (idx - 1);
            data.active = true;
            self._goto(direction);
          }
        })
        .on('touchend.fndtn.orbit', function (e) {
          container.data('swipe-transition', {});
          e.stopPropagation();
        })
      }
      container.on('mouseenter.fndtn.orbit', function (e) {
        if (settings.timer && settings.pause_on_hover) {
          self.stop_timer();
        }
      })
      .on('mouseleave.fndtn.orbit', function (e) {
        if (settings.timer && settings.resume_on_mouseout) {
          timer.start();
        }
      });

      $(document).on('click', '[data-orbit-link]', self.link_custom);
      $(window).on('load resize', self.compute_dimensions);
      Foundation.utils.image_loaded(this.slides().children('img'), self.compute_dimensions);
      Foundation.utils.image_loaded(this.slides().children('img'), function () {
        container.prev('.' + settings.preloader_class).css('display', 'none');
        self.update_slide_number(0);
        self.update_active_link(0);
        slides_container.trigger('ready.fndtn.orbit');
      });
    };

    self.init();
  };

  var Timer = function (el, settings, callback) {
    var self = this,
        duration = settings.timer_speed,
        progress = el.find('.' + settings.timer_progress_class),
        start,
        timeout,
        left = -1;

    this.update_progress = function (w) {
      var new_progress = progress.clone();
      new_progress.attr('style', '');
      new_progress.css('width', w + '%');
      progress.replaceWith(new_progress);
      progress = new_progress;
    };

    this.restart = function () {
      clearTimeout(timeout);
      el.addClass(settings.timer_paused_class);
      left = -1;
      self.update_progress(0);
    };

    this.start = function () {
      if (!el.hasClass(settings.timer_paused_class)) {return true;}
      left = (left === -1) ? duration : left;
      el.removeClass(settings.timer_paused_class);
      start = new Date().getTime();
      progress.animate({'width' : '100%'}, left, 'linear');
      timeout = setTimeout(function () {
        self.restart();
        callback();
      }, left);
      el.trigger('timer-started.fndtn.orbit')
    };

    this.stop = function () {
      if (el.hasClass(settings.timer_paused_class)) {return true;}
      clearTimeout(timeout);
      el.addClass(settings.timer_paused_class);
      var end = new Date().getTime();
      left = left - (end - start);
      var w = 100 - ((left / duration) * 100);
      self.update_progress(w);
      el.trigger('timer-stopped.fndtn.orbit');
    };
  };

  var SlideAnimation = function (settings, container) {
    var duration = settings.animation_speed;
    var is_rtl = ($('html[dir=rtl]').length === 1);
    var margin = is_rtl ? 'marginRight' : 'marginLeft';
    var animMargin = {};
    animMargin[margin] = '0%';

    this.next = function (current, next, callback) {
      current.animate({marginLeft : '-100%'}, duration);
      next.animate(animMargin, duration, function () {
        current.css(margin, '100%');
        callback();
      });
    };

    this.prev = function (current, prev, callback) {
      current.animate({marginLeft : '100%'}, duration);
      prev.css(margin, '-100%');
      prev.animate(animMargin, duration, function () {
        current.css(margin, '100%');
        callback();
      });
    };
  };

  var FadeAnimation = function (settings, container) {
    var duration = settings.animation_speed;
    var is_rtl = ($('html[dir=rtl]').length === 1);
    var margin = is_rtl ? 'marginRight' : 'marginLeft';

    this.next = function (current, next, callback) {
      next.css({'margin' : '0%', 'opacity' : '0.01'});
      next.animate({'opacity' :'1'}, duration, 'linear', function () {
        current.css('margin', '100%');
        callback();
      });
    };

    this.prev = function (current, prev, callback) {
      prev.css({'margin' : '0%', 'opacity' : '0.01'});
      prev.animate({'opacity' : '1'}, duration, 'linear', function () {
        current.css('margin', '100%');
        callback();
      });
    };
  };

  Foundation.libs = Foundation.libs || {};

  Foundation.libs.orbit = {
    name : 'orbit',

    version : '5.5.3',

    settings : {
      animation : 'slide',
      timer_speed : 10000,
      pause_on_hover : true,
      resume_on_mouseout : false,
      next_on_click : true,
      animation_speed : 500,
      stack_on_small : false,
      navigation_arrows : true,
      slide_number : true,
      slide_number_text : 'of',
      container_class : 'orbit-container',
      stack_on_small_class : 'orbit-stack-on-small',
      next_class : 'orbit-next',
      prev_class : 'orbit-prev',
      timer_container_class : 'orbit-timer',
      timer_paused_class : 'paused',
      timer_progress_class : 'orbit-progress',
      slides_container_class : 'orbit-slides-container',
      preloader_class : 'preloader',
      slide_selector : '*',
      bullets_container_class : 'orbit-bullets',
      bullets_active_class : 'active',
      slide_number_class : 'orbit-slide-number',
      caption_class : 'orbit-caption',
      active_slide_class : 'active',
      orbit_transition_class : 'orbit-transitioning',
      bullets : true,
      circular : true,
      timer : true,
      variable_height : false,
      swipe : true,
      before_slide_change : noop,
      after_slide_change : noop
    },

    init : function (scope, method, options) {
      var self = this;
      this.bindings(method, options);
    },

    events : function (instance) {
      var orbit_instance = new Orbit(this.S(instance), this.S(instance).data('orbit-init'));
      this.S(instance).data(this.name + '-instance', orbit_instance);
    },

    reflow : function () {
      var self = this;

      if (self.S(self.scope).is('[data-orbit]')) {
        var $el = self.S(self.scope);
        var instance = $el.data(self.name + '-instance');
        instance.compute_dimensions();
      } else {
        self.S('[data-orbit]', self.scope).each(function (idx, el) {
          var $el = self.S(el);
          var opts = self.data_options($el);
          var instance = $el.data(self.name + '-instance');
          instance.compute_dimensions();
        });
      }
    }
  };

}(jQuery, window, window.document));
;(function ($, window, document, undefined) {
  'use strict';

  var openModals = [];

  Foundation.libs.reveal = {
    name : 'reveal',

    version : '5.5.3',

    locked : false,

    settings : {
      animation : 'fadeAndPop',
      animation_speed : 250,
      close_on_background_click : true,
      close_on_esc : true,
      dismiss_modal_class : 'close-reveal-modal',
      multiple_opened : false,
      bg_class : 'reveal-modal-bg',
      root_element : 'body',
      open : function(){},
      opened : function(){},
      close : function(){},
      closed : function(){},
      on_ajax_error: $.noop,
      bg : $('.reveal-modal-bg'),
      css : {
        open : {
          'opacity' : 0,
          'visibility' : 'visible',
          'display' : 'block'
        },
        close : {
          'opacity' : 1,
          'visibility' : 'hidden',
          'display' : 'none'
        }
      }
    },

    init : function (scope, method, options) {
      $.extend(true, this.settings, method, options);
      this.bindings(method, options);
    },

    events : function (scope) {
      var self = this,
          S = self.S;

      S(this.scope)
        .off('.reveal')
        .on('click.fndtn.reveal', '[' + this.add_namespace('data-reveal-id') + ']:not([disabled])', function (e) {
          e.preventDefault();

          if (!self.locked) {
            var element = S(this),
                ajax = element.data(self.data_attr('reveal-ajax')),
                replaceContentSel = element.data(self.data_attr('reveal-replace-content'));

            self.locked = true;

            if (typeof ajax === 'undefined') {
              self.open.call(self, element);
            } else {
              var url = ajax === true ? element.attr('href') : ajax;
              self.open.call(self, element, {url : url}, { replaceContentSel : replaceContentSel });
            }
          }
        });

      S(document)
        .on('click.fndtn.reveal', this.close_targets(), function (e) {
          e.preventDefault();
          if (!self.locked) {
            var settings = S('[' + self.attr_name() + '].open').data(self.attr_name(true) + '-init') || self.settings,
                bg_clicked = S(e.target)[0] === S('.' + settings.bg_class)[0];

            if (bg_clicked) {
              if (settings.close_on_background_click) {
                e.stopPropagation();
              } else {
                return;
              }
            }

            self.locked = true;
            self.close.call(self, bg_clicked ? S('[' + self.attr_name() + '].open:not(.toback)') : S(this).closest('[' + self.attr_name() + ']'));
          }
        });

      if (S('[' + self.attr_name() + ']', this.scope).length > 0) {
        S(this.scope)
          // .off('.reveal')
          .on('open.fndtn.reveal', this.settings.open)
          .on('opened.fndtn.reveal', this.settings.opened)
          .on('opened.fndtn.reveal', this.open_video)
          .on('close.fndtn.reveal', this.settings.close)
          .on('closed.fndtn.reveal', this.settings.closed)
          .on('closed.fndtn.reveal', this.close_video);
      } else {
        S(this.scope)
          // .off('.reveal')
          .on('open.fndtn.reveal', '[' + self.attr_name() + ']', this.settings.open)
          .on('opened.fndtn.reveal', '[' + self.attr_name() + ']', this.settings.opened)
          .on('opened.fndtn.reveal', '[' + self.attr_name() + ']', this.open_video)
          .on('close.fndtn.reveal', '[' + self.attr_name() + ']', this.settings.close)
          .on('closed.fndtn.reveal', '[' + self.attr_name() + ']', this.settings.closed)
          .on('closed.fndtn.reveal', '[' + self.attr_name() + ']', this.close_video);
      }

      return true;
    },

    // PATCH #3: turning on key up capture only when a reveal window is open
    key_up_on : function (scope) {
      var self = this;

      // PATCH #1: fixing multiple keyup event trigger from single key press
      self.S('body').off('keyup.fndtn.reveal').on('keyup.fndtn.reveal', function ( event ) {
        var open_modal = self.S('[' + self.attr_name() + '].open'),
            settings = open_modal.data(self.attr_name(true) + '-init') || self.settings ;
        // PATCH #2: making sure that the close event can be called only while unlocked,
        //           so that multiple keyup.fndtn.reveal events don't prevent clean closing of the reveal window.
        if ( settings && event.which === 27  && settings.close_on_esc && !self.locked) { // 27 is the keycode for the Escape key
          self.close.call(self, open_modal);
        }
      });

      return true;
    },

    // PATCH #3: turning on key up capture only when a reveal window is open
    key_up_off : function (scope) {
      this.S('body').off('keyup.fndtn.reveal');
      return true;
    },

    open : function (target, ajax_settings) {
      var self = this,
          modal;

      if (target) {
        if (typeof target.selector !== 'undefined') {
          // Find the named node; only use the first one found, since the rest of the code assumes there's only one node
          modal = self.S('#' + target.data(self.data_attr('reveal-id'))).first();
        } else {
          modal = self.S(this.scope);

          ajax_settings = target;
        }
      } else {
        modal = self.S(this.scope);
      }

      var settings = modal.data(self.attr_name(true) + '-init');
      settings = settings || this.settings;


      if (modal.hasClass('open') && target !== undefined && target.attr('data-reveal-id') == modal.attr('id')) {
        return self.close(modal);
      }

      if (!modal.hasClass('open')) {
        var open_modal = self.S('[' + self.attr_name() + '].open');

        if (typeof modal.data('css-top') === 'undefined') {
          modal.data('css-top', parseInt(modal.css('top'), 10))
            .data('offset', this.cache_offset(modal));
        }

        modal.attr('tabindex','0').attr('aria-hidden','false');

        this.key_up_on(modal);    // PATCH #3: turning on key up capture only when a reveal window is open

        // Prevent namespace event from triggering twice
        modal.on('open.fndtn.reveal', function(e) {
          if (e.namespace !== 'fndtn.reveal') return;
        });

        modal.on('open.fndtn.reveal').trigger('open.fndtn.reveal');

        if (open_modal.length < 1) {
          this.toggle_bg(modal, true);
        }

        if (typeof ajax_settings === 'string') {
          ajax_settings = {
            url : ajax_settings
          };
        }

        var openModal = function() {
          if(open_modal.length > 0) {
            if(settings.multiple_opened) {
              self.to_back(open_modal);
            } else {
              self.hide(open_modal, settings.css.close);
            }
          }

          // bl: add the open_modal that isn't already in the background to the openModals array
          if(settings.multiple_opened) {
            openModals.push(modal);
          }

          self.show(modal, settings.css.open);
        };

        if (typeof ajax_settings === 'undefined' || !ajax_settings.url) {
          openModal();
        } else {
          var old_success = typeof ajax_settings.success !== 'undefined' ? ajax_settings.success : null;
          $.extend(ajax_settings, {
            success : function (data, textStatus, jqXHR) {
              if ( $.isFunction(old_success) ) {
                var result = old_success(data, textStatus, jqXHR);
                if (typeof result == 'string') {
                  data = result;
                }
              }

              if (typeof options !== 'undefined' && typeof options.replaceContentSel !== 'undefined') {
                modal.find(options.replaceContentSel).html(data);
              } else {
                modal.html(data);
              }

              self.S(modal).foundation('section', 'reflow');
              self.S(modal).children().foundation();

              openModal();
            }
          });

          // check for if user initalized with error callback
          if (settings.on_ajax_error !== $.noop) {
            $.extend(ajax_settings, {
              error : settings.on_ajax_error
            });
          }

          $.ajax(ajax_settings);
        }
      }
      self.S(window).trigger('resize');
    },

    close : function (modal) {
      var modal = modal && modal.length ? modal : this.S(this.scope),
          open_modals = this.S('[' + this.attr_name() + '].open'),
          settings = modal.data(this.attr_name(true) + '-init') || this.settings,
          self = this;

      if (open_modals.length > 0) {

        modal.removeAttr('tabindex','0').attr('aria-hidden','true');

        this.locked = true;
        this.key_up_off(modal);   // PATCH #3: turning on key up capture only when a reveal window is open

        modal.trigger('close.fndtn.reveal');

        if ((settings.multiple_opened && open_modals.length === 1) || !settings.multiple_opened || modal.length > 1) {
          self.toggle_bg(modal, false);
          self.to_front(modal);
        }

        if (settings.multiple_opened) {
          var isCurrent = modal.is(':not(.toback)');
          self.hide(modal, settings.css.close, settings);
          if(isCurrent) {
            // remove the last modal since it is now closed
            openModals.pop();
          } else {
            // if this isn't the current modal, then find it in the array and remove it
            openModals = $.grep(openModals, function(elt) {
              var isThis = elt[0]===modal[0];
              if(isThis) {
                // since it's not currently in the front, put it in the front now that it is hidden
                // so that if it's re-opened, it won't be .toback
                self.to_front(modal);
              }
              return !isThis;
            });
          }
          // finally, show the next modal in the stack, if there is one
          if(openModals.length>0) {
            self.to_front(openModals[openModals.length - 1]);
          }
        } else {
          self.hide(open_modals, settings.css.close, settings);
        }
      }
    },

    close_targets : function () {
      var base = '.' + this.settings.dismiss_modal_class;

      if (this.settings.close_on_background_click) {
        return base + ', .' + this.settings.bg_class;
      }

      return base;
    },

    toggle_bg : function (modal, state) {
      if (this.S('.' + this.settings.bg_class).length === 0) {
        this.settings.bg = $('<div />', {'class': this.settings.bg_class})
          .appendTo('body').hide();
      }

      var visible = this.settings.bg.filter(':visible').length > 0;
      if ( state != visible ) {
        if ( state == undefined ? visible : !state ) {
          this.hide(this.settings.bg);
        } else {
          this.show(this.settings.bg);
        }
      }
    },

    show : function (el, css) {
      // is modal
      if (css) {
        var settings = el.data(this.attr_name(true) + '-init') || this.settings,
            root_element = settings.root_element,
            context = this;

        if (el.parent(root_element).length === 0) {
          var placeholder = el.wrap('<div style="display: none;" />').parent();

          el.on('closed.fndtn.reveal.wrapped', function () {
            el.detach().appendTo(placeholder);
            el.unwrap().unbind('closed.fndtn.reveal.wrapped');
          });

          el.detach().appendTo(root_element);
        }

        var animData = getAnimationData(settings.animation);
        if (!animData.animate) {
          this.locked = false;
        }
        if (animData.pop) {
          css.top = $(window).scrollTop() - el.data('offset') + 'px';
          var end_css = {
            top: $(window).scrollTop() + el.data('css-top') + 'px',
            opacity: 1
          };

          return setTimeout(function () {
            return el
              .css(css)
              .animate(end_css, settings.animation_speed, 'linear', function () {
                context.locked = false;
                el.trigger('opened.fndtn.reveal');
              })
              .addClass('open');
          }, settings.animation_speed / 2);
        }

        css.top = $(window).scrollTop() + el.data('css-top') + 'px';

        if (animData.fade) {
          var end_css = {opacity: 1};

          return setTimeout(function () {
            return el
              .css(css)
              .animate(end_css, settings.animation_speed, 'linear', function () {
                context.locked = false;
                el.trigger('opened.fndtn.reveal');
              })
              .addClass('open');
          }, settings.animation_speed / 2);
        }

        return el.css(css).show().css({opacity : 1}).addClass('open').trigger('opened.fndtn.reveal');
      }

      var settings = this.settings;

      // should we animate the background?
      if (getAnimationData(settings.animation).fade) {
        return el.fadeIn(settings.animation_speed / 2);
      }

      this.locked = false;

      return el.show();
    },

    to_back : function(el) {
      el.addClass('toback');
    },

    to_front : function(el) {
      el.removeClass('toback');
    },

    hide : function (el, css) {
      // is modal
      if (css) {
        var settings = el.data(this.attr_name(true) + '-init'),
            context = this;
        settings = settings || this.settings;

        var animData = getAnimationData(settings.animation);
        if (!animData.animate) {
          this.locked = false;
        }
        if (animData.pop) {
          var end_css = {
            top: - $(window).scrollTop() - el.data('offset') + 'px',
            opacity: 0
          };

          return setTimeout(function () {
            return el
              .animate(end_css, settings.animation_speed, 'linear', function () {
                context.locked = false;
                el.css(css).trigger('closed.fndtn.reveal');
              })
              .removeClass('open');
          }, settings.animation_speed / 2);
        }

        if (animData.fade) {
          var end_css = {opacity : 0};

          return setTimeout(function () {
            return el
              .animate(end_css, settings.animation_speed, 'linear', function () {
                context.locked = false;
                el.css(css).trigger('closed.fndtn.reveal');
              })
              .removeClass('open');
          }, settings.animation_speed / 2);
        }

        return el.hide().css(css).removeClass('open').trigger('closed.fndtn.reveal');
      }

      var settings = this.settings;

      // should we animate the background?
      if (getAnimationData(settings.animation).fade) {
        return el.fadeOut(settings.animation_speed / 2);
      }

      return el.hide();
    },

    close_video : function (e) {
      var video = $('.flex-video', e.target),
          iframe = $('iframe', video);

      if (iframe.length > 0) {
        iframe.attr('data-src', iframe[0].src);
        iframe.attr('src', iframe.attr('src'));
        video.hide();
      }
    },

    open_video : function (e) {
      var video = $('.flex-video', e.target),
          iframe = video.find('iframe');

      if (iframe.length > 0) {
        var data_src = iframe.attr('data-src');
        if (typeof data_src === 'string') {
          iframe[0].src = iframe.attr('data-src');
        } else {
          var src = iframe[0].src;
          iframe[0].src = undefined;
          iframe[0].src = src;
        }
        video.show();
      }
    },

    data_attr : function (str) {
      if (this.namespace.length > 0) {
        return this.namespace + '-' + str;
      }

      return str;
    },

    cache_offset : function (modal) {
      var offset = modal.show().height() + parseInt(modal.css('top'), 10) + modal.scrollY;

      modal.hide();

      return offset;
    },

    off : function () {
      $(this.scope).off('.fndtn.reveal');
    },

    reflow : function () {}
  };

  /*
   * getAnimationData('popAndFade') // {animate: true,  pop: true,  fade: true}
   * getAnimationData('fade')       // {animate: true,  pop: false, fade: true}
   * getAnimationData('pop')        // {animate: true,  pop: true,  fade: false}
   * getAnimationData('foo')        // {animate: false, pop: false, fade: false}
   * getAnimationData(null)         // {animate: false, pop: false, fade: false}
   */
  function getAnimationData(str) {
    var fade = /fade/i.test(str);
    var pop = /pop/i.test(str);
    return {
      animate : fade || pop,
      pop : pop,
      fade : fade
    };
  }
}(jQuery, window, window.document));
;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.slider = {
    name : 'slider',

    version : '5.5.3',

    settings : {
      start : 0,
      end : 100,
      step : 1,
      precision : 2,
      initial : null,
      display_selector : '',
      vertical : false,
      trigger_input_change : false,
      on_change : function () {}
    },

    cache : {},

    init : function (scope, method, options) {
      Foundation.inherit(this, 'throttle');
      this.bindings(method, options);
      this.reflow();
    },

    events : function () {
      var self = this;
      $(this.scope)
        .off('.slider')
        .on('mousedown.fndtn.slider touchstart.fndtn.slider pointerdown.fndtn.slider',
        '[' + self.attr_name() + ']:not(.disabled, [disabled]) .range-slider-handle', function (e) {
          if (!self.cache.active) {
            e.preventDefault();
            self.set_active_slider($(e.target));
          }
        })
        .on('mousemove.fndtn.slider touchmove.fndtn.slider pointermove.fndtn.slider', function (e) {
          if (!!self.cache.active) {
            e.preventDefault();
            if ($.data(self.cache.active[0], 'settings').vertical) {
              var scroll_offset = 0;
              if (!e.pageY) {
                scroll_offset = window.scrollY;
              }
              self.calculate_position(self.cache.active, self.get_cursor_position(e, 'y') + scroll_offset);
            } else {
              self.calculate_position(self.cache.active, self.get_cursor_position(e, 'x'));
            }
          }
        })
        .on('mouseup.fndtn.slider touchend.fndtn.slider pointerup.fndtn.slider', function (e) {
          if(!self.cache.active) {
            // if the user has just clicked into the slider without starting to drag the handle
            var slider = $(e.target).attr('role') === 'slider' ? $(e.target) : $(e.target).closest('.range-slider').find("[role='slider']");

            if (slider.length && (!slider.parent().hasClass('disabled') && !slider.parent().attr('disabled'))) {
              self.set_active_slider(slider);
              if ($.data(self.cache.active[0], 'settings').vertical) {
                var scroll_offset = 0;
                if (!e.pageY) {
                  scroll_offset = window.scrollY;
                }
                self.calculate_position(self.cache.active, self.get_cursor_position(e, 'y') + scroll_offset);
              } else {
                self.calculate_position(self.cache.active, self.get_cursor_position(e, 'x'));
              }
            }
          }
          self.remove_active_slider();
        })
        .on('change.fndtn.slider', function (e) {
          self.settings.on_change();
        });

      self.S(window)
        .on('resize.fndtn.slider', self.throttle(function (e) {
          self.reflow();
        }, 300));

      // update slider value as users change input value
      this.S('[' + this.attr_name() + ']').each(function () {
        var slider = $(this),
            handle = slider.children('.range-slider-handle')[0],
            settings = self.initialize_settings(handle);

        if (settings.display_selector != '') {
          $(settings.display_selector).each(function(){
            if ($(this).attr('value')) {
              $(this).off('change').on('change', function () {
                slider.foundation("slider", "set_value", $(this).val());
              });
            }
          });
        }
      });
    },

    get_cursor_position : function (e, xy) {
      var pageXY = 'page' + xy.toUpperCase(),
          clientXY = 'client' + xy.toUpperCase(),
          position;

      if (typeof e[pageXY] !== 'undefined') {
        position = e[pageXY];
      } else if (typeof e.originalEvent[clientXY] !== 'undefined') {
        position = e.originalEvent[clientXY];
      } else if (e.originalEvent.touches && e.originalEvent.touches[0] && typeof e.originalEvent.touches[0][clientXY] !== 'undefined') {
        position = e.originalEvent.touches[0][clientXY];
      } else if (e.currentPoint && typeof e.currentPoint[xy] !== 'undefined') {
        position = e.currentPoint[xy];
      }

      return position;
    },

    set_active_slider : function ($handle) {
      this.cache.active = $handle;
    },

    remove_active_slider : function () {
      this.cache.active = null;
    },

    calculate_position : function ($handle, cursor_x) {
      var self = this,
          settings = $.data($handle[0], 'settings'),
          handle_l = $.data($handle[0], 'handle_l'),
          handle_o = $.data($handle[0], 'handle_o'),
          bar_l = $.data($handle[0], 'bar_l'),
          bar_o = $.data($handle[0], 'bar_o');

      requestAnimationFrame(function () {
        var pct;

        if (Foundation.rtl && !settings.vertical) {
          pct = self.limit_to(((bar_o + bar_l - cursor_x) / bar_l), 0, 1);
        } else {
          pct = self.limit_to(((cursor_x - bar_o) / bar_l), 0, 1);
        }

        pct = settings.vertical ? 1 - pct : pct;

        var norm = self.normalized_value(pct, settings.start, settings.end, settings.step, settings.precision);

        self.set_ui($handle, norm);
      });
    },

    set_ui : function ($handle, value) {
      var settings = $.data($handle[0], 'settings'),
          handle_l = $.data($handle[0], 'handle_l'),
          bar_l = $.data($handle[0], 'bar_l'),
          norm_pct = this.normalized_percentage(value, settings.start, settings.end),
          handle_offset = norm_pct * (bar_l - handle_l) - 1,
          progress_bar_length = norm_pct * 100,
          $handle_parent = $handle.parent(),
          $hidden_inputs = $handle.parent().children('input[type=hidden]');

      if (Foundation.rtl && !settings.vertical) {
        handle_offset = -handle_offset;
      }

      handle_offset = settings.vertical ? -handle_offset + bar_l - handle_l + 1 : handle_offset;
      this.set_translate($handle, handle_offset, settings.vertical);

      if (settings.vertical) {
        $handle.siblings('.range-slider-active-segment').css('height', progress_bar_length + '%');
      } else {
        $handle.siblings('.range-slider-active-segment').css('width', progress_bar_length + '%');
      }

      $handle_parent.attr(this.attr_name(), value).trigger('change.fndtn.slider');

      $hidden_inputs.val(value);
      if (settings.trigger_input_change) {
          $hidden_inputs.trigger('change.fndtn.slider');
      }

      if (!$handle[0].hasAttribute('aria-valuemin')) {
        $handle.attr({
          'aria-valuemin' : settings.start,
          'aria-valuemax' : settings.end
        });
      }
      $handle.attr('aria-valuenow', value);

      if (settings.display_selector != '') {
        $(settings.display_selector).each(function () {
          if (this.hasAttribute('value')) {
            $(this).val(value);
          } else {
            $(this).text(value);
          }
        });
      }

    },

    normalized_percentage : function (val, start, end) {
      return Math.min(1, (val - start) / (end - start));
    },

    normalized_value : function (val, start, end, step, precision) {
      var range = end - start,
          point = val * range,
          mod = (point - (point % step)) / step,
          rem = point % step,
          round = ( rem >= step * 0.5 ? step : 0);
      return ((mod * step + round) + start).toFixed(precision);
    },

    set_translate : function (ele, offset, vertical) {
      if (vertical) {
        $(ele)
          .css('-webkit-transform', 'translateY(' + offset + 'px)')
          .css('-moz-transform', 'translateY(' + offset + 'px)')
          .css('-ms-transform', 'translateY(' + offset + 'px)')
          .css('-o-transform', 'translateY(' + offset + 'px)')
          .css('transform', 'translateY(' + offset + 'px)');
      } else {
        $(ele)
          .css('-webkit-transform', 'translateX(' + offset + 'px)')
          .css('-moz-transform', 'translateX(' + offset + 'px)')
          .css('-ms-transform', 'translateX(' + offset + 'px)')
          .css('-o-transform', 'translateX(' + offset + 'px)')
          .css('transform', 'translateX(' + offset + 'px)');
      }
    },

    limit_to : function (val, min, max) {
      return Math.min(Math.max(val, min), max);
    },

    initialize_settings : function (handle) {
      var settings = $.extend({}, this.settings, this.data_options($(handle).parent())),
          decimal_places_match_result;

      if (settings.precision === null) {
        decimal_places_match_result = ('' + settings.step).match(/\.([\d]*)/);
        settings.precision = decimal_places_match_result && decimal_places_match_result[1] ? decimal_places_match_result[1].length : 0;
      }

      if (settings.vertical) {
        $.data(handle, 'bar_o', $(handle).parent().offset().top);
        $.data(handle, 'bar_l', $(handle).parent().outerHeight());
        $.data(handle, 'handle_o', $(handle).offset().top);
        $.data(handle, 'handle_l', $(handle).outerHeight());
      } else {
        $.data(handle, 'bar_o', $(handle).parent().offset().left);
        $.data(handle, 'bar_l', $(handle).parent().outerWidth());
        $.data(handle, 'handle_o', $(handle).offset().left);
        $.data(handle, 'handle_l', $(handle).outerWidth());
      }

      $.data(handle, 'bar', $(handle).parent());
      return $.data(handle, 'settings', settings);
    },

    set_initial_position : function ($ele) {
      var settings = $.data($ele.children('.range-slider-handle')[0], 'settings'),
          initial = ((typeof settings.initial == 'number' && !isNaN(settings.initial)) ? settings.initial : Math.floor((settings.end - settings.start) * 0.5 / settings.step) * settings.step + settings.start),
          $handle = $ele.children('.range-slider-handle');
      this.set_ui($handle, initial);
    },

    set_value : function (value) {
      var self = this;
      $('[' + self.attr_name() + ']', this.scope).each(function () {
        $(this).attr(self.attr_name(), value);
      });
      if (!!$(this.scope).attr(self.attr_name())) {
        $(this.scope).attr(self.attr_name(), value);
      }
      self.reflow();
    },

    reflow : function () {
      var self = this;
      self.S('[' + this.attr_name() + ']').each(function () {
        var handle = $(this).children('.range-slider-handle')[0],
            val = $(this).attr(self.attr_name());
        self.initialize_settings(handle);

        if (val) {
          self.set_ui($(handle), parseFloat(val));
        } else {
          self.set_initial_position($(this));
        }
      });
    }
  };

}(jQuery, window, window.document));
;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.tab = {
    name : 'tab',

    version : '5.5.3',

    settings : {
      active_class : 'active',
      callback : function () {},
      deep_linking : false,
      scroll_to_content : true,
      is_hover : false
    },

    default_tab_hashes : [],

    init : function (scope, method, options) {
      var self = this,
          S = this.S;

  	  // Store the default active tabs which will be referenced when the
  	  // location hash is absent, as in the case of navigating the tabs and
  	  // returning to the first viewing via the browser Back button.
  	  S('[' + this.attr_name() + '] > .active > a', this.scope).each(function () {
  	    self.default_tab_hashes.push(this.hash);
  	  });

      this.bindings(method, options);
      this.handle_location_hash_change();
    },

    events : function () {
      var self = this,
          S = this.S;

      var usual_tab_behavior =  function (e, target) {
        var settings = S(target).closest('[' + self.attr_name() + ']').data(self.attr_name(true) + '-init');
        if (!settings.is_hover || Modernizr.touch) {
          // if user did not pressed tab key, prevent default action
          var keyCode = e.keyCode || e.which;
          if (keyCode !== 9) { 
            e.preventDefault();
            e.stopPropagation();
          }
          self.toggle_active_tab(S(target).parent());
          
        }
      };

      S(this.scope)
        .off('.tab')
        // Key event: focus/tab key
        .on('keydown.fndtn.tab', '[' + this.attr_name() + '] > * > a', function(e) {
          var keyCode = e.keyCode || e.which;
          // if user pressed tab key
          if (keyCode === 13 || keyCode === 32) { // enter or space
            var el = this;
            usual_tab_behavior(e, el);
          } 
        })
        // Click event: tab title
        .on('click.fndtn.tab', '[' + this.attr_name() + '] > * > a', function(e) {
          var el = this;
          usual_tab_behavior(e, el);
        })
        // Hover event: tab title
        .on('mouseenter.fndtn.tab', '[' + this.attr_name() + '] > * > a', function (e) {
          var settings = S(this).closest('[' + self.attr_name() + ']').data(self.attr_name(true) + '-init');
          if (settings.is_hover) {
            self.toggle_active_tab(S(this).parent());
          }
        });

      // Location hash change event
      S(window).on('hashchange.fndtn.tab', function (e) {
        e.preventDefault();
        self.handle_location_hash_change();
      });
    },

    handle_location_hash_change : function () {

      var self = this,
          S = this.S;

      S('[' + this.attr_name() + ']', this.scope).each(function () {
        var settings = S(this).data(self.attr_name(true) + '-init');
        if (settings.deep_linking) {
          // Match the location hash to a label
          var hash;
          if (settings.scroll_to_content) {
            hash = self.scope.location.hash;
          } else {
            // prefix the hash to prevent anchor scrolling
            hash = self.scope.location.hash.replace('fndtn-', '');
          }
          if (hash != '') {
            // Check whether the location hash references a tab content div or
            // another element on the page (inside or outside the tab content div)
            var hash_element = S(hash);
            if (hash_element.hasClass('content') && hash_element.parent().hasClass('tabs-content')) {
              // Tab content div
              self.toggle_active_tab($('[' + self.attr_name() + '] > * > a[href=' + hash + ']').parent());
            } else {
              // Not the tab content div. If inside the tab content, find the
              // containing tab and toggle it as active.
              var hash_tab_container_id = hash_element.closest('.content').attr('id');
              if (hash_tab_container_id != undefined) {
                self.toggle_active_tab($('[' + self.attr_name() + '] > * > a[href=#' + hash_tab_container_id + ']').parent(), hash);
              }
            }
          } else {
            // Reference the default tab hashes which were initialized in the init function
            for (var ind = 0; ind < self.default_tab_hashes.length; ind++) {
              self.toggle_active_tab($('[' + self.attr_name() + '] > * > a[href=' + self.default_tab_hashes[ind] + ']').parent());
            }
          }
        }
       });
     },

    toggle_active_tab : function (tab, location_hash) {
      var self = this,
          S = self.S,
          tabs = tab.closest('[' + this.attr_name() + ']'),
          tab_link = tab.find('a'),
          anchor = tab.children('a').first(),
          target_hash = '#' + anchor.attr('href').split('#')[1],
          target = S(target_hash),
          siblings = tab.siblings(),
          settings = tabs.data(this.attr_name(true) + '-init'),
          interpret_keyup_action = function (e) {
            // Light modification of Heydon Pickering's Practical ARIA Examples: http://heydonworks.com/practical_aria_examples/js/a11y.js

            // define current, previous and next (possible) tabs

            var $original = $(this);
            var $prev = $(this).parents('li').prev().children('[role="tab"]');
            var $next = $(this).parents('li').next().children('[role="tab"]');
            var $target;

            // find the direction (prev or next)

            switch (e.keyCode) {
              case 37:
                $target = $prev;
                break;
              case 39:
                $target = $next;
                break;
              default:
                $target = false
                  break;
            }

            if ($target.length) {
              $original.attr({
                'tabindex' : '-1',
                'aria-selected' : null
              });
              $target.attr({
                'tabindex' : '0',
                'aria-selected' : true
              }).focus();
            }

            // Hide panels

            $('[role="tabpanel"]')
              .attr('aria-hidden', 'true');

            // Show panel which corresponds to target

            $('#' + $(document.activeElement).attr('href').substring(1))
              .attr('aria-hidden', null);

          },
          go_to_hash = function(hash) {
            // This function allows correct behaviour of the browser's back button when deep linking is enabled. Without it
            // the user would get continually redirected to the default hash.
            var default_hash = settings.scroll_to_content ? self.default_tab_hashes[0] : 'fndtn-' + self.default_tab_hashes[0].replace('#', '');

            if (hash !== default_hash || window.location.hash) {
              window.location.hash = hash;
            }
          };

      // allow usage of data-tab-content attribute instead of href
      if (anchor.data('tab-content')) {
        target_hash = '#' + anchor.data('tab-content').split('#')[1];
        target = S(target_hash);
      }

      if (settings.deep_linking) {

        if (settings.scroll_to_content) {

          // retain current hash to scroll to content
          go_to_hash(location_hash || target_hash);

          if (location_hash == undefined || location_hash == target_hash) {
            tab.parent()[0].scrollIntoView();
          } else {
            S(target_hash)[0].scrollIntoView();
          }
        } else {
          // prefix the hashes so that the browser doesn't scroll down
          if (location_hash != undefined) {
            go_to_hash('fndtn-' + location_hash.replace('#', ''));
          } else {
            go_to_hash('fndtn-' + target_hash.replace('#', ''));
          }
        }
      }

      // WARNING: The activation and deactivation of the tab content must
      // occur after the deep linking in order to properly refresh the browser
      // window (notably in Chrome).
      // Clean up multiple attr instances to done once
      tab.addClass(settings.active_class).triggerHandler('opened');
      tab_link.attr({'aria-selected' : 'true',  tabindex : 0});
      siblings.removeClass(settings.active_class)
      siblings.find('a').attr({'aria-selected' : 'false'/*,  tabindex : -1*/});
      target.siblings().removeClass(settings.active_class).attr({'aria-hidden' : 'true'/*,  tabindex : -1*/});
      target.addClass(settings.active_class).attr('aria-hidden', 'false').removeAttr('tabindex');
      settings.callback(tab);
      target.triggerHandler('toggled', [target]);
      tabs.triggerHandler('toggled', [tab]);

      tab_link.off('keydown').on('keydown', interpret_keyup_action );
    },

    data_attr : function (str) {
      if (this.namespace.length > 0) {
        return this.namespace + '-' + str;
      }

      return str;
    },

    off : function () {},

    reflow : function () {}
  };
}(jQuery, window, window.document));
;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.tooltip = {
    name : 'tooltip',

    version : '5.5.3',

    settings : {
      additional_inheritable_classes : [],
      tooltip_class : '.tooltip',
      append_to : 'body',
      touch_close_text : 'Tap To Close',
      disable_for_touch : false,
      hover_delay : 200,
      fade_in_duration : 150,
      fade_out_duration : 150,
      show_on : 'all',
      tip_template : function (selector, content) {
        return '<span data-selector="' + selector + '" id="' + selector + '" class="'
          + Foundation.libs.tooltip.settings.tooltip_class.substring(1)
          + '" role="tooltip">' + content + '<span class="nub"></span></span>';
      }
    },

    cache : {},

    init : function (scope, method, options) {
      Foundation.inherit(this, 'random_str');
      this.bindings(method, options);
    },

    should_show : function (target, tip) {
      var settings = $.extend({}, this.settings, this.data_options(target));

      if (settings.show_on === 'all') {
        return true;
      } else if (this.small() && settings.show_on === 'small') {
        return true;
      } else if (this.medium() && settings.show_on === 'medium') {
        return true;
      } else if (this.large() && settings.show_on === 'large') {
        return true;
      }
      return false;
    },

    medium : function () {
      return matchMedia(Foundation.media_queries['medium']).matches;
    },

    large : function () {
      return matchMedia(Foundation.media_queries['large']).matches;
    },

    events : function (instance) {
      var self = this,
          S = self.S;

      self.create(this.S(instance));

      function _startShow(elt, $this, immediate) {
        if (elt.timer) {
          return;
        }

        if (immediate) {
          elt.timer = null;
          self.showTip($this);
        } else {
          elt.timer = setTimeout(function () {
            elt.timer = null;
            self.showTip($this);
          }.bind(elt), self.settings.hover_delay);
        }
      }

      function _startHide(elt, $this) {
        if (elt.timer) {
          clearTimeout(elt.timer);
          elt.timer = null;
        }

        self.hide($this);
      }

      $(this.scope)
        .off('.tooltip')
        .on('mouseenter.fndtn.tooltip mouseleave.fndtn.tooltip touchstart.fndtn.tooltip MSPointerDown.fndtn.tooltip',
          '[' + this.attr_name() + ']', function (e) {
          var $this = S(this),
              settings = $.extend({}, self.settings, self.data_options($this)),
              is_touch = false;

          if (Modernizr.touch && /touchstart|MSPointerDown/i.test(e.type) && S(e.target).is('a')) {
            return false;
          }

          if (/mouse/i.test(e.type) && self.ie_touch(e)) {
            return false;
          }
          
          if ($this.hasClass('open')) {
            if (Modernizr.touch && /touchstart|MSPointerDown/i.test(e.type)) {
              e.preventDefault();
            }
            self.hide($this);
          } else {
            if (settings.disable_for_touch && Modernizr.touch && /touchstart|MSPointerDown/i.test(e.type)) {
              return;
            } else if (!settings.disable_for_touch && Modernizr.touch && /touchstart|MSPointerDown/i.test(e.type)) {
              e.preventDefault();
              S(settings.tooltip_class + '.open').hide();
              is_touch = true;
              // close other open tooltips on touch
              if ($('.open[' + self.attr_name() + ']').length > 0) {
               var prevOpen = S($('.open[' + self.attr_name() + ']')[0]);
               self.hide(prevOpen);
              }
            }

            if (/enter|over/i.test(e.type)) {
              _startShow(this, $this);

            } else if (e.type === 'mouseout' || e.type === 'mouseleave') {
              _startHide(this, $this);
            } else {
              _startShow(this, $this, true);
            }
          }
        })
        .on('mouseleave.fndtn.tooltip touchstart.fndtn.tooltip MSPointerDown.fndtn.tooltip', '[' + this.attr_name() + '].open', function (e) {
          if (/mouse/i.test(e.type) && self.ie_touch(e)) {
            return false;
          }

          if ($(this).data('tooltip-open-event-type') == 'touch' && e.type == 'mouseleave') {
            return;
          } else if ($(this).data('tooltip-open-event-type') == 'mouse' && /MSPointerDown|touchstart/i.test(e.type)) {
            self.convert_to_touch($(this));
          } else {
            _startHide(this, $(this));
          }
        })
        .on('DOMNodeRemoved DOMAttrModified', '[' + this.attr_name() + ']:not(a)', function (e) {
          _startHide(this, S(this));
        });
    },

    ie_touch : function (e) {
      // How do I distinguish between IE11 and Windows Phone 8?????
      return false;
    },

    showTip : function ($target) {
      var $tip = this.getTip($target);
      if (this.should_show($target, $tip)) {
        return this.show($target);
      }
      return;
    },

    getTip : function ($target) {
      var selector = this.selector($target),
          settings = $.extend({}, this.settings, this.data_options($target)),
          tip = null;

      if (selector) {
        tip = this.S('span[data-selector="' + selector + '"]' + settings.tooltip_class);
      }

      return (typeof tip === 'object') ? tip : false;
    },

    selector : function ($target) {
      var dataSelector = $target.attr(this.attr_name()) || $target.attr('data-selector');

      if (typeof dataSelector != 'string') {
        dataSelector = this.random_str(6);
        $target
          .attr('data-selector', dataSelector)
          .attr('aria-describedby', dataSelector);
      }

      return dataSelector;
    },

    create : function ($target) {
      var self = this,
          settings = $.extend({}, this.settings, this.data_options($target)),
          tip_template = this.settings.tip_template;

      if (typeof settings.tip_template === 'string' && window.hasOwnProperty(settings.tip_template)) {
        tip_template = window[settings.tip_template];
      }

      var $tip = $(tip_template(this.selector($target), $('<div></div>').html($target.attr('title')).html())),
          classes = this.inheritable_classes($target);

      $tip.addClass(classes).appendTo(settings.append_to);

      if (Modernizr.touch) {
        $tip.append('<span class="tap-to-close">' + settings.touch_close_text + '</span>');
        $tip.on('touchstart.fndtn.tooltip MSPointerDown.fndtn.tooltip', function (e) {
          self.hide($target);
        });
      }

      $target.removeAttr('title').attr('title', '');
    },

    reposition : function (target, tip, classes) {
      var width, nub, nubHeight, nubWidth, objPos;

      tip.css('visibility', 'hidden').show();

      width = target.data('width');
      nub = tip.children('.nub');
      nubHeight = nub.outerHeight();
      nubWidth = nub.outerWidth();

      if (this.small()) {
        tip.css({'width' : '100%'});
      } else {
        tip.css({'width' : (width) ? width : 'auto'});
      }

      objPos = function (obj, top, right, bottom, left, width) {
        return obj.css({
          'top' : (top) ? top : 'auto',
          'bottom' : (bottom) ? bottom : 'auto',
          'left' : (left) ? left : 'auto',
          'right' : (right) ? right : 'auto'
        }).end();
      };
      
      var o_top = target.offset().top;
      var o_left = target.offset().left;
      var outerHeight = target.outerHeight();

      objPos(tip, (o_top + outerHeight + 10), 'auto', 'auto', o_left);

      if (this.small()) {
        objPos(tip, (o_top + outerHeight + 10), 'auto', 'auto', 12.5, $(this.scope).width());
        tip.addClass('tip-override');
        objPos(nub, -nubHeight, 'auto', 'auto', o_left);
      } else {
        
        if (Foundation.rtl) {
          nub.addClass('rtl');
          o_left = o_left + target.outerWidth() - tip.outerWidth();
        }

        objPos(tip, (o_top + outerHeight + 10), 'auto', 'auto', o_left);
        // reset nub from small styles, if they've been applied
        if (nub.attr('style')) {
          nub.removeAttr('style');
        }
        
        tip.removeClass('tip-override');
        
        var tip_outerHeight = tip.outerHeight();
        
        if (classes && classes.indexOf('tip-top') > -1) {
          if (Foundation.rtl) {
            nub.addClass('rtl');
          }
          objPos(tip, (o_top - tip_outerHeight), 'auto', 'auto', o_left)
            .removeClass('tip-override');
        } else if (classes && classes.indexOf('tip-left') > -1) {
          objPos(tip, (o_top + (outerHeight / 2) - (tip_outerHeight / 2)), 'auto', 'auto', (o_left - tip.outerWidth() - nubHeight))
            .removeClass('tip-override');
          nub.removeClass('rtl');
        } else if (classes && classes.indexOf('tip-right') > -1) {
          objPos(tip, (o_top + (outerHeight / 2) - (tip_outerHeight / 2)), 'auto', 'auto', (o_left + target.outerWidth() + nubHeight))
            .removeClass('tip-override');
          nub.removeClass('rtl');
        }
      }

      tip.css('visibility', 'visible').hide();
    },

    small : function () {
      return matchMedia(Foundation.media_queries.small).matches &&
        !matchMedia(Foundation.media_queries.medium).matches;
    },

    inheritable_classes : function ($target) {
      var settings = $.extend({}, this.settings, this.data_options($target)),
          inheritables = ['tip-top', 'tip-left', 'tip-bottom', 'tip-right', 'radius', 'round'].concat(settings.additional_inheritable_classes),
          classes = $target.attr('class'),
          filtered = classes ? $.map(classes.split(' '), function (el, i) {
            if ($.inArray(el, inheritables) !== -1) {
              return el;
            }
          }).join(' ') : '';

      return $.trim(filtered);
    },

    convert_to_touch : function ($target) {
      var self = this,
          $tip = self.getTip($target),
          settings = $.extend({}, self.settings, self.data_options($target));

      if ($tip.find('.tap-to-close').length === 0) {
        $tip.append('<span class="tap-to-close">' + settings.touch_close_text + '</span>');
        $tip.on('click.fndtn.tooltip.tapclose touchstart.fndtn.tooltip.tapclose MSPointerDown.fndtn.tooltip.tapclose', function (e) {
          self.hide($target);
        });
      }

      $target.data('tooltip-open-event-type', 'touch');
    },

    show : function ($target) {
      var $tip = this.getTip($target);
      if ($target.data('tooltip-open-event-type') == 'touch') {
        this.convert_to_touch($target);
      }

      this.reposition($target, $tip, $target.attr('class'));
      $target.addClass('open');
      $tip.fadeIn(this.settings.fade_in_duration);
    },

    hide : function ($target) {
      var $tip = this.getTip($target);

      $tip.fadeOut(this.settings.fade_out_duration, function () {
        $tip.find('.tap-to-close').remove();
        $tip.off('click.fndtn.tooltip.tapclose MSPointerDown.fndtn.tapclose');
        $target.removeClass('open');
      });
    },

    off : function () {
      var self = this;
      this.S(this.scope).off('.fndtn.tooltip');
      this.S(this.settings.tooltip_class).each(function (i) {
        $('[' + self.attr_name() + ']').eq(i).attr('title', $(this).text());
      }).remove();
    },

    reflow : function () {}
  };
}(jQuery, window, window.document));
;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.topbar = {
    name : 'topbar',

    version : '5.5.3',

    settings : {
      index : 0,
      start_offset : 0,
      sticky_class : 'sticky',
      custom_back_text : true,
      back_text : 'Back',
      mobile_show_parent_link : true,
      is_hover : true,
      scrolltop : true, // jump to top when sticky nav menu toggle is clicked
      sticky_on : 'all',
      dropdown_autoclose: true
    },

    init : function (section, method, options) {
      Foundation.inherit(this, 'add_custom_rule register_media throttle');
      var self = this;

      self.register_media('topbar', 'foundation-mq-topbar');

      this.bindings(method, options);

      self.S('[' + this.attr_name() + ']', this.scope).each(function () {
        var topbar = $(this),
            settings = topbar.data(self.attr_name(true) + '-init'),
            section = self.S('section, .top-bar-section', this);
        topbar.data('index', 0);
        var topbarContainer = topbar.parent();
        if (topbarContainer.hasClass('fixed') || self.is_sticky(topbar, topbarContainer, settings) ) {
          self.settings.sticky_class = settings.sticky_class;
          self.settings.sticky_topbar = topbar;
          topbar.data('height', topbarContainer.outerHeight());
          topbar.data('stickyoffset', topbarContainer.offset().top);
        } else {
          topbar.data('height', topbar.outerHeight());
        }

        if (!settings.assembled) {
          self.assemble(topbar);
        }

        if (settings.is_hover) {
          self.S('.has-dropdown', topbar).addClass('not-click');
        } else {
          self.S('.has-dropdown', topbar).removeClass('not-click');
        }

        // Pad body when sticky (scrolled) or fixed.
        self.add_custom_rule('.f-topbar-fixed { padding-top: ' + topbar.data('height') + 'px }');

        if (topbarContainer.hasClass('fixed')) {
          self.S('body').addClass('f-topbar-fixed');
        }
      });

    },

    is_sticky : function (topbar, topbarContainer, settings) {
      var sticky     = topbarContainer.hasClass(settings.sticky_class);
      var smallMatch = matchMedia(Foundation.media_queries.small).matches;
      var medMatch   = matchMedia(Foundation.media_queries.medium).matches;
      var lrgMatch   = matchMedia(Foundation.media_queries.large).matches;

      if (sticky && settings.sticky_on === 'all') {
        return true;
      }
      if (sticky && this.small() && settings.sticky_on.indexOf('small') !== -1) {
        if (smallMatch && !medMatch && !lrgMatch) { return true; }
      }
      if (sticky && this.medium() && settings.sticky_on.indexOf('medium') !== -1) {
        if (smallMatch && medMatch && !lrgMatch) { return true; }
      }
      if (sticky && this.large() && settings.sticky_on.indexOf('large') !== -1) {
        if (smallMatch && medMatch && lrgMatch) { return true; }
      }

       return false;
    },

    toggle : function (toggleEl) {
      var self = this,
          topbar;

      if (toggleEl) {
        topbar = self.S(toggleEl).closest('[' + this.attr_name() + ']');
      } else {
        topbar = self.S('[' + this.attr_name() + ']');
      }

      var settings = topbar.data(this.attr_name(true) + '-init');

      var section = self.S('section, .top-bar-section', topbar);

      if (self.breakpoint()) {
        if (!self.rtl) {
          section.css({left : '0%'});
          $('>.name', section).css({left : '100%'});
        } else {
          section.css({right : '0%'});
          $('>.name', section).css({right : '100%'});
        }

        self.S('li.moved', section).removeClass('moved');
        topbar.data('index', 0);

        topbar
          .toggleClass('expanded')
          .css('height', '');
      }

      if (settings.scrolltop) {
        if (!topbar.hasClass('expanded')) {
          if (topbar.hasClass('fixed')) {
            topbar.parent().addClass('fixed');
            topbar.removeClass('fixed');
            self.S('body').addClass('f-topbar-fixed');
          }
        } else if (topbar.parent().hasClass('fixed')) {
          if (settings.scrolltop) {
            topbar.parent().removeClass('fixed');
            topbar.addClass('fixed');
            self.S('body').removeClass('f-topbar-fixed');

            window.scrollTo(0, 0);
          } else {
            topbar.parent().removeClass('expanded');
          }
        }
      } else {
        if (self.is_sticky(topbar, topbar.parent(), settings)) {
          topbar.parent().addClass('fixed');
        }

        if (topbar.parent().hasClass('fixed')) {
          if (!topbar.hasClass('expanded')) {
            topbar.removeClass('fixed');
            topbar.parent().removeClass('expanded');
            self.update_sticky_positioning();
          } else {
            topbar.addClass('fixed');
            topbar.parent().addClass('expanded');
            self.S('body').addClass('f-topbar-fixed');
          }
        }
      }
    },

    timer : null,

    events : function (bar) {
      var self = this,
          S = this.S;

      S(this.scope)
        .off('.topbar')
        .on('click.fndtn.topbar', '[' + this.attr_name() + '] .toggle-topbar', function (e) {
          e.preventDefault();
          self.toggle(this);
        })
        .on('click.fndtn.topbar contextmenu.fndtn.topbar', '.top-bar .top-bar-section li a[href^="#"],[' + this.attr_name() + '] .top-bar-section li a[href^="#"]', function (e) {
          var li = $(this).closest('li'),
              topbar = li.closest('[' + self.attr_name() + ']'),
              settings = topbar.data(self.attr_name(true) + '-init');

          if (settings.dropdown_autoclose && settings.is_hover) {
            var hoverLi = $(this).closest('.hover');
            hoverLi.removeClass('hover');
          }
          if (self.breakpoint() && !li.hasClass('back') && !li.hasClass('has-dropdown')) {
            self.toggle();
          }

        })
        .on('click.fndtn.topbar', '[' + this.attr_name() + '] li.has-dropdown', function (e) {
          var li = S(this),
              target = S(e.target),
              topbar = li.closest('[' + self.attr_name() + ']'),
              settings = topbar.data(self.attr_name(true) + '-init');

          if (target.data('revealId')) {
            self.toggle();
            return;
          }

          if (self.breakpoint()) {
            return;
          }

          if (settings.is_hover && !Modernizr.touch) {
            return;
          }

          e.stopImmediatePropagation();

          if (li.hasClass('hover')) {
            li
              .removeClass('hover')
              .find('li')
              .removeClass('hover');

            li.parents('li.hover')
              .removeClass('hover');
          } else {
            li.addClass('hover');

            $(li).siblings().removeClass('hover');

            if (target[0].nodeName === 'A' && target.parent().hasClass('has-dropdown')) {
              e.preventDefault();
            }
          }
        })
        .on('click.fndtn.topbar', '[' + this.attr_name() + '] .has-dropdown>a', function (e) {
          if (self.breakpoint()) {

            e.preventDefault();

            var $this = S(this),
                topbar = $this.closest('[' + self.attr_name() + ']'),
                section = topbar.find('section, .top-bar-section'),
                dropdownHeight = $this.next('.dropdown').outerHeight(),
                $selectedLi = $this.closest('li');

            topbar.data('index', topbar.data('index') + 1);
            $selectedLi.addClass('moved');

            if (!self.rtl) {
              section.css({left : -(100 * topbar.data('index')) + '%'});
              section.find('>.name').css({left : 100 * topbar.data('index') + '%'});
            } else {
              section.css({right : -(100 * topbar.data('index')) + '%'});
              section.find('>.name').css({right : 100 * topbar.data('index') + '%'});
            }

            topbar.css('height', $this.siblings('ul').outerHeight(true) + topbar.data('height'));
          }
        });

      S(window).off('.topbar').on('resize.fndtn.topbar', self.throttle(function () {
          self.resize.call(self);
      }, 50)).trigger('resize.fndtn.topbar').load(function () {
          // Ensure that the offset is calculated after all of the pages resources have loaded
          S(this).trigger('resize.fndtn.topbar');
      });

      S('body').off('.topbar').on('click.fndtn.topbar', function (e) {
        var parent = S(e.target).closest('li').closest('li.hover');

        if (parent.length > 0) {
          return;
        }

        S('[' + self.attr_name() + '] li.hover').removeClass('hover');
      });

      // Go up a level on Click
      S(this.scope).on('click.fndtn.topbar', '[' + this.attr_name() + '] .has-dropdown .back', function (e) {
        e.preventDefault();

        var $this = S(this),
            topbar = $this.closest('[' + self.attr_name() + ']'),
            section = topbar.find('section, .top-bar-section'),
            settings = topbar.data(self.attr_name(true) + '-init'),
            $movedLi = $this.closest('li.moved'),
            $previousLevelUl = $movedLi.parent();

        topbar.data('index', topbar.data('index') - 1);

        if (!self.rtl) {
          section.css({left : -(100 * topbar.data('index')) + '%'});
          section.find('>.name').css({left : 100 * topbar.data('index') + '%'});
        } else {
          section.css({right : -(100 * topbar.data('index')) + '%'});
          section.find('>.name').css({right : 100 * topbar.data('index') + '%'});
        }

        if (topbar.data('index') === 0) {
          topbar.css('height', '');
        } else {
          topbar.css('height', $previousLevelUl.outerHeight(true) + topbar.data('height'));
        }

        setTimeout(function () {
          $movedLi.removeClass('moved');
        }, 300);
      });

      // Show dropdown menus when their items are focused
      S(this.scope).find('.dropdown a')
        .focus(function () {
          $(this).parents('.has-dropdown').addClass('hover');
        })
        .blur(function () {
          $(this).parents('.has-dropdown').removeClass('hover');
        });
    },

    resize : function () {
      var self = this;
      self.S('[' + this.attr_name() + ']').each(function () {
        var topbar = self.S(this),
            settings = topbar.data(self.attr_name(true) + '-init');

        var stickyContainer = topbar.parent('.' + self.settings.sticky_class);
        var stickyOffset;

        if (!self.breakpoint()) {
          var doToggle = topbar.hasClass('expanded');
          topbar
            .css('height', '')
            .removeClass('expanded')
            .find('li')
            .removeClass('hover');

            if (doToggle) {
              self.toggle(topbar);
            }
        }

        if (self.is_sticky(topbar, stickyContainer, settings)) {
          if (stickyContainer.hasClass('fixed')) {
            // Remove the fixed to allow for correct calculation of the offset.
            stickyContainer.removeClass('fixed');

            stickyOffset = stickyContainer.offset().top;
            if (self.S(document.body).hasClass('f-topbar-fixed')) {
              stickyOffset -= topbar.data('height');
            }

            topbar.data('stickyoffset', stickyOffset);
            stickyContainer.addClass('fixed');
          } else {
            stickyOffset = stickyContainer.offset().top;
            topbar.data('stickyoffset', stickyOffset);
          }
        }

      });
    },

    breakpoint : function () {
      return !matchMedia(Foundation.media_queries['topbar']).matches;
    },

    small : function () {
      return matchMedia(Foundation.media_queries['small']).matches;
    },

    medium : function () {
      return matchMedia(Foundation.media_queries['medium']).matches;
    },

    large : function () {
      return matchMedia(Foundation.media_queries['large']).matches;
    },

    assemble : function (topbar) {
      var self = this,
          settings = topbar.data(this.attr_name(true) + '-init'),
          section = self.S('section, .top-bar-section', topbar);

      // Pull element out of the DOM for manipulation
      section.detach();

      self.S('.has-dropdown>a', section).each(function () {
        var $link = self.S(this),
            $dropdown = $link.siblings('.dropdown'),
            url = $link.attr('href'),
            $titleLi;

        if (!$dropdown.find('.title.back').length) {

          if (settings.mobile_show_parent_link == true && url) {
            $titleLi = $('<li class="title back js-generated"><h5><a href="javascript:void(0)"></a></h5></li><li class="parent-link hide-for-medium-up"><a class="parent-link js-generated" href="' + url + '">' + $link.html() +'</a></li>');
          } else {
            $titleLi = $('<li class="title back js-generated"><h5><a href="javascript:void(0)"></a></h5>');
          }

          // Copy link to subnav
          if (settings.custom_back_text == true) {
            $('h5>a', $titleLi).html(settings.back_text);
          } else {
            $('h5>a', $titleLi).html('&laquo; ' + $link.html());
          }
          $dropdown.prepend($titleLi);
        }
      });

      // Put element back in the DOM
      section.appendTo(topbar);

      // check for sticky
      this.sticky();

      this.assembled(topbar);
    },

    assembled : function (topbar) {
      topbar.data(this.attr_name(true), $.extend({}, topbar.data(this.attr_name(true)), {assembled : true}));
    },

    height : function (ul) {
      var total = 0,
          self = this;

      $('> li', ul).each(function () {
        total += self.S(this).outerHeight(true);
      });

      return total;
    },

    sticky : function () {
      var self = this;

      this.S(window).on('scroll', function () {
        self.update_sticky_positioning();
      });
    },

    update_sticky_positioning : function () {
      var klass = '.' + this.settings.sticky_class,
          $window = this.S(window),
          self = this;

      if (self.settings.sticky_topbar && self.is_sticky(this.settings.sticky_topbar,this.settings.sticky_topbar.parent(), this.settings)) {
        var distance = this.settings.sticky_topbar.data('stickyoffset') + this.settings.start_offset;
        if (!self.S(klass).hasClass('expanded')) {
          if ($window.scrollTop() > (distance)) {
            if (!self.S(klass).hasClass('fixed')) {
              self.S(klass).addClass('fixed');
              self.S('body').addClass('f-topbar-fixed');
            }
          } else if ($window.scrollTop() <= distance) {
            if (self.S(klass).hasClass('fixed')) {
              self.S(klass).removeClass('fixed');
              self.S('body').removeClass('f-topbar-fixed');
            }
          }
        }
      }
    },

    off : function () {
      this.S(this.scope).off('.fndtn.topbar');
      this.S(window).off('.fndtn.topbar');
    },

    reflow : function () {}
  };
}(jQuery, window, window.document));
(function($) {
  window.NestedFormEvents = function() {
    this.addFields = $.proxy(this.addFields, this);
    this.removeFields = $.proxy(this.removeFields, this);
  };

  NestedFormEvents.prototype = {
    addFields: function(e) {
      // Setup
      var link      = e.currentTarget;
      var assoc     = $(link).data('association');                // Name of child
      var blueprint = $('#' + $(link).data('blueprint-id'));
      var content   = blueprint.data('blueprint');                // Fields template

      // Make the context correct by replacing <parents> with the generated ID
      // of each of the parent objects
      var context = ($(link).closest('.fields').closestChild('input, textarea, select').eq(0).attr('name') || '').replace(new RegExp('\[[a-z_]+\]$'), '');

      // context will be something like this for a brand new form:
      // project[tasks_attributes][1255929127459][assignments_attributes][1255929128105]
      // or for an edit form:
      // project[tasks_attributes][0][assignments_attributes][1]
      if (context) {
        var parentNames = context.match(/[a-z_]+_attributes(?=\]\[(new_)?\d+\])/g) || [];
        var parentIds   = context.match(/[0-9]+/g) || [];

        for(var i = 0; i < parentNames.length; i++) {
          if(parentIds[i]) {
            content = content.replace(
              new RegExp('(_' + parentNames[i] + ')_.+?_', 'g'),
              '$1_' + parentIds[i] + '_');

            content = content.replace(
              new RegExp('(\\[' + parentNames[i] + '\\])\\[.+?\\]', 'g'),
              '$1[' + parentIds[i] + ']');
          }
        }
      }

      // Make a unique ID for the new child
      var regexp  = new RegExp('new_' + assoc, 'g');
      var new_id  = this.newId();
      content     = $.trim(content.replace(regexp, new_id));

      var field = this.insertFields(content, assoc, link);
      // bubble up event upto document (through form)
      field
        .trigger({ type: 'nested:fieldAdded', field: field })
        .trigger({ type: 'nested:fieldAdded:' + assoc, field: field });
      return false;
    },
    newId: function() {
      return new Date().getTime();
    },
    insertFields: function(content, assoc, link) {
      var target = $(link).data('target');
      if (target) {
        return $(content).appendTo($(target));
      } else {
        return $(content).insertBefore(link);
      }
    },
    removeFields: function(e) {
      var $link = $(e.currentTarget),
          assoc = $link.data('association'); // Name of child to be removed
      
      var hiddenField = $link.prev('input[type=hidden]');
      hiddenField.val('1');
      
      var field = $link.closest('.fields');
      field.hide();
      
      field
        .trigger({ type: 'nested:fieldRemoved', field: field })
        .trigger({ type: 'nested:fieldRemoved:' + assoc, field: field });
      return false;
    }
  };

  window.nestedFormEvents = new NestedFormEvents();
  $(document)
    .delegate('form a.add_nested_fields',    'click', nestedFormEvents.addFields)
    .delegate('form a.remove_nested_fields', 'click', nestedFormEvents.removeFields);
})(jQuery);

// http://plugins.jquery.com/project/closestChild
/*
 * Copyright 2011, Tobias Lindig
 *
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 */
(function($) {
        $.fn.closestChild = function(selector) {
                // breadth first search for the first matched node
                if (selector && selector != '') {
                        var queue = [];
                        queue.push(this);
                        while(queue.length > 0) {
                                var node = queue.shift();
                                var children = node.children();
                                for(var i = 0; i < children.length; ++i) {
                                        var child = $(children[i]);
                                        if (child.is(selector)) {
                                                return child; //well, we found one
                                        }
                                        queue.push(child);
                                }
                        }
                }
                return $();//nothing found
        };
})(jQuery);
/* =========================================================
 * bootstrap-datetimepicker.js
 * =========================================================
 * Copyright 2012 Stefan Petre
 * Improvements by Andrew Rowls
 * Improvements by Sébastien Malot
 * Improvements by Yun Lai
 * Project URL : http://www.malot.fr/bootstrap-datetimepicker
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */



!function ($) {

	function UTCDate() {
		return new Date(Date.UTC.apply(Date, arguments));
	}

	function UTCToday() {
		var today = new Date();
		return UTCDate(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), today.getUTCHours(), today.getUTCMinutes(), today.getUTCSeconds(), 0);
	}

	// Picker object

	var Datetimepicker = function (element, options) {
		var that = this;

		this.element = $(element);

		this.language = options.language || this.element.data('date-language') || "en";
		this.language = this.language in dates ? this.language : "en";
		this.isRTL = dates[this.language].rtl || false;
		this.formatType = options.formatType || this.element.data('format-type') || 'standard';
		this.format = DPGlobal.parseFormat(options.format || this.element.data('date-format') || dates[this.language].format || DPGlobal.getDefaultFormat(this.formatType, 'input'), this.formatType);
		this.isInline = false;
		this.isVisible = false;
		this.isInput = this.element.is('input');

		this.bootcssVer = this.isInput ? (this.element.is('.form-control') ? 3 : 2) : ( this.bootcssVer = this.element.is('.input-group') ? 3 : 2 );

		this.component = this.element.is('.date') ? ( this.bootcssVer == 3 ? this.element.find('.input-group-addon .glyphicon-th, .input-group-addon .glyphicon-time, .input-group-addon .glyphicon-calendar').parent() : this.element.find('.add-on .icon-th, .add-on .icon-time, .add-on .icon-calendar').parent()) : false;
		this.componentReset = this.element.is('.date') ? ( this.bootcssVer == 3 ? this.element.find('.input-group-addon .glyphicon-remove').parent() : this.element.find('.add-on .icon-remove').parent()) : false;
		this.hasInput = this.component && this.element.find('input').length;
		if (this.component && this.component.length === 0) {
			this.component = false;
		}
		this.linkField = options.linkField || this.element.data('link-field') || false;
		this.linkFormat = DPGlobal.parseFormat(options.linkFormat || this.element.data('link-format') || DPGlobal.getDefaultFormat(this.formatType, 'link'), this.formatType);
		this.minuteStep = options.minuteStep || this.element.data('minute-step') || 5;
		this.pickerPosition = options.pickerPosition || this.element.data('picker-position') || 'bottom-right';
		this.showMeridian = options.showMeridian || this.element.data('show-meridian') || false;
		this.initialDate = options.initialDate || new Date();

		this._attachEvents();

		this.formatViewType = "datetime";
		if ('formatViewType' in options) {
			this.formatViewType = options.formatViewType;
		} else if ('formatViewType' in this.element.data()) {
			this.formatViewType = this.element.data('formatViewType');
		}

		this.minView = 0;
		if ('minView' in options) {
			this.minView = options.minView;
		} else if ('minView' in this.element.data()) {
			this.minView = this.element.data('min-view');
		}
		this.minView = DPGlobal.convertViewMode(this.minView);

		this.maxView = DPGlobal.modes.length - 1;
		if ('maxView' in options) {
			this.maxView = options.maxView;
		} else if ('maxView' in this.element.data()) {
			this.maxView = this.element.data('max-view');
		}
		this.maxView = DPGlobal.convertViewMode(this.maxView);

		this.wheelViewModeNavigation = false;
		if ('wheelViewModeNavigation' in options) {
			this.wheelViewModeNavigation = options.wheelViewModeNavigation;
		} else if ('wheelViewModeNavigation' in this.element.data()) {
			this.wheelViewModeNavigation = this.element.data('view-mode-wheel-navigation');
		}

		this.wheelViewModeNavigationInverseDirection = false;

		if ('wheelViewModeNavigationInverseDirection' in options) {
			this.wheelViewModeNavigationInverseDirection = options.wheelViewModeNavigationInverseDirection;
		} else if ('wheelViewModeNavigationInverseDirection' in this.element.data()) {
			this.wheelViewModeNavigationInverseDirection = this.element.data('view-mode-wheel-navigation-inverse-dir');
		}

		this.wheelViewModeNavigationDelay = 100;
		if ('wheelViewModeNavigationDelay' in options) {
			this.wheelViewModeNavigationDelay = options.wheelViewModeNavigationDelay;
		} else if ('wheelViewModeNavigationDelay' in this.element.data()) {
			this.wheelViewModeNavigationDelay = this.element.data('view-mode-wheel-navigation-delay');
		}

		this.startViewMode = 2;
		if ('startView' in options) {
			this.startViewMode = options.startView;
		} else if ('startView' in this.element.data()) {
			this.startViewMode = this.element.data('start-view');
		}
		this.startViewMode = DPGlobal.convertViewMode(this.startViewMode);
		this.viewMode = this.startViewMode;

		this.viewSelect = this.minView;
		if ('viewSelect' in options) {
			this.viewSelect = options.viewSelect;
		} else if ('viewSelect' in this.element.data()) {
			this.viewSelect = this.element.data('view-select');
		}
		this.viewSelect = DPGlobal.convertViewMode(this.viewSelect);

		this.forceParse = true;
		if ('forceParse' in options) {
			this.forceParse = options.forceParse;
		} else if ('dateForceParse' in this.element.data()) {
			this.forceParse = this.element.data('date-force-parse');
		}

		this.picker = $((this.bootcssVer == 3) ? DPGlobal.templateV3 : DPGlobal.template)
			.appendTo(this.isInline ? this.element : 'body')
			.on({
				click:     $.proxy(this.click, this),
				mousedown: $.proxy(this.mousedown, this)
			});

		if (this.wheelViewModeNavigation) {
			if ($.fn.mousewheel) {
				this.picker.on({mousewheel: $.proxy(this.mousewheel, this)});
			} else {
				console.log("Mouse Wheel event is not supported. Please include the jQuery Mouse Wheel plugin before enabling this option");
			}
		}

		if (this.isInline) {
			this.picker.addClass('datetimepicker-inline');
		} else {
			this.picker.addClass('datetimepicker-dropdown-' + this.pickerPosition + ' dropdown-menu');
		}
		if (this.isRTL) {
			this.picker.addClass('datetimepicker-rtl');
			if (this.bootcssVer == 3) {
				this.picker.find('.prev span, .next span')
					.toggleClass('glyphicon-arrow-left glyphicon-arrow-right');
			} else {
				this.picker.find('.prev i, .next i')
					.toggleClass('icon-arrow-left icon-arrow-right');
			}
			;

		}
		$(document).on('mousedown', function (e) {
			// Clicked outside the datetimepicker, hide it
			if ($(e.target).closest('.datetimepicker').length === 0) {
				that.hide();
			}
		});

		this.autoclose = false;
		if ('autoclose' in options) {
			this.autoclose = options.autoclose;
		} else if ('dateAutoclose' in this.element.data()) {
			this.autoclose = this.element.data('date-autoclose');
		}

		this.keyboardNavigation = true;
		if ('keyboardNavigation' in options) {
			this.keyboardNavigation = options.keyboardNavigation;
		} else if ('dateKeyboardNavigation' in this.element.data()) {
			this.keyboardNavigation = this.element.data('date-keyboard-navigation');
		}

		this.todayBtn = (options.todayBtn || this.element.data('date-today-btn') || false);
		this.todayHighlight = (options.todayHighlight || this.element.data('date-today-highlight') || false);

		this.weekStart = ((options.weekStart || this.element.data('date-weekstart') || dates[this.language].weekStart || 0) % 7);
		this.weekEnd = ((this.weekStart + 6) % 7);
		this.startDate = -Infinity;
		this.endDate = Infinity;
		this.daysOfWeekDisabled = [];
		this.setStartDate(options.startDate || this.element.data('date-startdate'));
		this.setEndDate(options.endDate || this.element.data('date-enddate'));
		this.setDaysOfWeekDisabled(options.daysOfWeekDisabled || this.element.data('date-days-of-week-disabled'));
		this.fillDow();
		this.fillMonths();
		this.update();
		this.showMode();

		if (this.isInline) {
			this.show();
		}
	};

	Datetimepicker.prototype = {
		constructor: Datetimepicker,

		_events:       [],
		_attachEvents: function () {
			this._detachEvents();
			if (this.isInput) { // single input
				this._events = [
					[this.element, {
						focus:   $.proxy(this.show, this),
						keyup:   $.proxy(this.update, this),
						keydown: $.proxy(this.keydown, this)
					}]
				];
			}
			else if (this.component && this.hasInput) { // component: input + button
				this._events = [
					// For components that are not readonly, allow keyboard nav
					[this.element.find('input'), {
						focus:   $.proxy(this.show, this),
						keyup:   $.proxy(this.update, this),
						keydown: $.proxy(this.keydown, this)
					}],
					[this.component, {
						click: $.proxy(this.show, this)
					}]
				];
				if (this.componentReset) {
					this._events.push([
						this.componentReset,
						{click: $.proxy(this.reset, this)}
					]);
				}
			}
			else if (this.element.is('div')) {  // inline datetimepicker
				this.isInline = true;
			}
			else {
				this._events = [
					[this.element, {
						click: $.proxy(this.show, this)
					}]
				];
			}
			for (var i = 0, el, ev; i < this._events.length; i++) {
				el = this._events[i][0];
				ev = this._events[i][1];
				el.on(ev);
			}
		},

		_detachEvents: function () {
			for (var i = 0, el, ev; i < this._events.length; i++) {
				el = this._events[i][0];
				ev = this._events[i][1];
				el.off(ev);
			}
			this._events = [];
		},

		show: function (e) {
			this.picker.show();
			this.height = this.component ? this.component.outerHeight() : this.element.outerHeight();
			if (this.forceParse) {
				this.update();
			}
			this.place();
			$(window).on('resize', $.proxy(this.place, this));
			if (e) {
				e.stopPropagation();
				e.preventDefault();
			}
			this.isVisible = true;
			this.element.trigger({
				type: 'show',
				date: this.date
			});
		},

		hide: function (e) {
			if (!this.isVisible) return;
			if (this.isInline) return;
			this.picker.hide();
			$(window).off('resize', this.place);
			this.viewMode = this.startViewMode;
			this.showMode();
			if (!this.isInput) {
				$(document).off('mousedown', this.hide);
			}

			if (
				this.forceParse &&
					(
						this.isInput && this.element.val() ||
							this.hasInput && this.element.find('input').val()
						)
				)
				this.setValue();
			this.isVisible = false;
			this.element.trigger({
				type: 'hide',
				date: this.date
			});
		},

		remove: function () {
			this._detachEvents();
			this.picker.remove();
			delete this.picker;
			delete this.element.data().datetimepicker;
		},

		getDate: function () {
			var d = this.getUTCDate();
			return new Date(d.getTime() + (d.getTimezoneOffset() * 60000));
		},

		getUTCDate: function () {
			return this.date;
		},

		setDate: function (d) {
			this.setUTCDate(new Date(d.getTime() - (d.getTimezoneOffset() * 60000)));
		},

		setUTCDate: function (d) {
			if (d >= this.startDate && d <= this.endDate) {
				this.date = d;
				this.setValue();
				this.viewDate = this.date;
				this.fill();
			} else {
				this.element.trigger({
					type:      'outOfRange',
					date:      d,
					startDate: this.startDate,
					endDate:   this.endDate
				});
			}
		},

		setFormat: function (format) {
			this.format = DPGlobal.parseFormat(format, this.formatType);
			var element;
			if (this.isInput) {
				element = this.element;
			} else if (this.component) {
				element = this.element.find('input');
			}
			if (element && element.val()) {
				this.setValue();
			}
		},

		setValue: function () {
			var formatted = this.getFormattedDate();
			if (!this.isInput) {
				if (this.component) {
					this.element.find('input').val(formatted);
				}
				this.element.data('date', formatted);
			} else {
				this.element.val(formatted);
			}
			if (this.linkField) {
				$('#' + this.linkField).val(this.getFormattedDate(this.linkFormat));
			}
		},

		getFormattedDate: function (format) {
			if (format == undefined) format = this.format;
			return DPGlobal.formatDate(this.date, format, this.language, this.formatType);
		},

		setStartDate: function (startDate) {
			this.startDate = startDate || -Infinity;
			if (this.startDate !== -Infinity) {
				this.startDate = DPGlobal.parseDate(this.startDate, this.format, this.language, this.formatType);
			}
			this.update();
			this.updateNavArrows();
		},

		setEndDate: function (endDate) {
			this.endDate = endDate || Infinity;
			if (this.endDate !== Infinity) {
				this.endDate = DPGlobal.parseDate(this.endDate, this.format, this.language, this.formatType);
			}
			this.update();
			this.updateNavArrows();
		},

		setDaysOfWeekDisabled: function (daysOfWeekDisabled) {
			this.daysOfWeekDisabled = daysOfWeekDisabled || [];
			if (!$.isArray(this.daysOfWeekDisabled)) {
				this.daysOfWeekDisabled = this.daysOfWeekDisabled.split(/,\s*/);
			}
			this.daysOfWeekDisabled = $.map(this.daysOfWeekDisabled, function (d) {
				return parseInt(d, 10);
			});
			this.update();
			this.updateNavArrows();
		},

		place: function () {
			if (this.isInline) return;

			var index_highest = 0;
			$('div').each(function () {
				var index_current = parseInt($(this).css("zIndex"), 10);
				if (index_current > index_highest) {
					index_highest = index_current;
				}
			});
			var zIndex = index_highest + 10;

			var offset, top, left;
			if (this.component) {
				offset = this.component.offset();
				left = offset.left;
				if (this.pickerPosition == 'bottom-left' || this.pickerPosition == 'top-left') {
					left += this.component.outerWidth() - this.picker.outerWidth();
				}
			} else {
				offset = this.element.offset();
				left = offset.left;
			}
			if (this.pickerPosition == 'top-left' || this.pickerPosition == 'top-right') {
				top = offset.top - this.picker.outerHeight();
			} else {
				top = offset.top + this.height;
			}
			this.picker.css({
				top:    top,
				left:   left,
				zIndex: zIndex
			});
		},

		update: function () {
			var date, fromArgs = false;
			if (arguments && arguments.length && (typeof arguments[0] === 'string' || arguments[0] instanceof Date)) {
				date = arguments[0];
				fromArgs = true;
			} else {
				date = this.element.data('date') || (this.isInput ? this.element.val() : this.element.find('input').val()) || this.initialDate;
				if (typeof date == 'string' || date instanceof String) {
				  date = date.replace(/^\s+|\s+$/g,'');
				}
			}

			if (!date) {
				date = new Date();
				fromArgs = false;
			}

			this.date = DPGlobal.parseDate(date, this.format, this.language, this.formatType);

			if (fromArgs) this.setValue();

			if (this.date < this.startDate) {
				this.viewDate = new Date(this.startDate);
			} else if (this.date > this.endDate) {
				this.viewDate = new Date(this.endDate);
			} else {
				this.viewDate = new Date(this.date);
			}
			this.fill();
		},

		fillDow: function () {
			var dowCnt = this.weekStart,
				html = '<tr>';
			while (dowCnt < this.weekStart + 7) {
				html += '<th class="dow">' + dates[this.language].daysMin[(dowCnt++) % 7] + '</th>';
			}
			html += '</tr>';
			this.picker.find('.datetimepicker-days thead').append(html);
		},

		fillMonths: function () {
			var html = '',
				i = 0;
			while (i < 12) {
				html += '<span class="month">' + dates[this.language].monthsShort[i++] + '</span>';
			}
			this.picker.find('.datetimepicker-months td').html(html);
		},

		fill: function () {
			if (this.date == null || this.viewDate == null) {
				return;
			}
			var d = new Date(this.viewDate),
				year = d.getUTCFullYear(),
				month = d.getUTCMonth(),
				dayMonth = d.getUTCDate(),
				hours = d.getUTCHours(),
				minutes = d.getUTCMinutes(),
				startYear = this.startDate !== -Infinity ? this.startDate.getUTCFullYear() : -Infinity,
				startMonth = this.startDate !== -Infinity ? this.startDate.getUTCMonth() : -Infinity,
				endYear = this.endDate !== Infinity ? this.endDate.getUTCFullYear() : Infinity,
				endMonth = this.endDate !== Infinity ? this.endDate.getUTCMonth() : Infinity,
				currentDate = (new UTCDate(this.date.getUTCFullYear(), this.date.getUTCMonth(), this.date.getUTCDate())).valueOf(),
				today = new Date();
			this.picker.find('.datetimepicker-days thead th:eq(1)')
				.text(dates[this.language].months[month] + ' ' + year);
			if (this.formatViewType == "time") {
				var hourConverted = hours % 12 ? hours % 12 : 12;
				var hoursDisplay = (hourConverted < 10 ? '0' : '') + hourConverted;
				var minutesDisplay = (minutes < 10 ? '0' : '') + minutes;
				var meridianDisplay = dates[this.language].meridiem[hours < 12 ? 0 : 1];
				this.picker.find('.datetimepicker-hours thead th:eq(1)')
					.text(hoursDisplay + ':' + minutesDisplay + ' ' + meridianDisplay.toUpperCase());
				this.picker.find('.datetimepicker-minutes thead th:eq(1)')
					.text(hoursDisplay + ':' + minutesDisplay + ' ' + meridianDisplay.toUpperCase());
			} else {
				this.picker.find('.datetimepicker-hours thead th:eq(1)')
					.text(dayMonth + ' ' + dates[this.language].months[month] + ' ' + year);
				this.picker.find('.datetimepicker-minutes thead th:eq(1)')
					.text(dayMonth + ' ' + dates[this.language].months[month] + ' ' + year);
			}
			this.picker.find('tfoot th.today')
				.text(dates[this.language].today)
				.toggle(this.todayBtn !== false);
			this.updateNavArrows();
			this.fillMonths();
			/*var prevMonth = UTCDate(year, month, 0,0,0,0,0);
			 prevMonth.setUTCDate(prevMonth.getDate() - (prevMonth.getUTCDay() - this.weekStart + 7)%7);*/
			var prevMonth = UTCDate(year, month - 1, 28, 0, 0, 0, 0),
				day = DPGlobal.getDaysInMonth(prevMonth.getUTCFullYear(), prevMonth.getUTCMonth());
			prevMonth.setUTCDate(day);
			prevMonth.setUTCDate(day - (prevMonth.getUTCDay() - this.weekStart + 7) % 7);
			var nextMonth = new Date(prevMonth);
			nextMonth.setUTCDate(nextMonth.getUTCDate() + 42);
			nextMonth = nextMonth.valueOf();
			var html = [];
			var clsName;
			while (prevMonth.valueOf() < nextMonth) {
				if (prevMonth.getUTCDay() == this.weekStart) {
					html.push('<tr>');
				}
				clsName = '';
				if (prevMonth.getUTCFullYear() < year || (prevMonth.getUTCFullYear() == year && prevMonth.getUTCMonth() < month)) {
					clsName += ' old';
				} else if (prevMonth.getUTCFullYear() > year || (prevMonth.getUTCFullYear() == year && prevMonth.getUTCMonth() > month)) {
					clsName += ' new';
				}
				// Compare internal UTC date with local today, not UTC today
				if (this.todayHighlight &&
					prevMonth.getUTCFullYear() == today.getFullYear() &&
					prevMonth.getUTCMonth() == today.getMonth() &&
					prevMonth.getUTCDate() == today.getDate()) {
					clsName += ' today';
				}
				if (prevMonth.valueOf() == currentDate) {
					clsName += ' active';
				}
				if ((prevMonth.valueOf() + 86400000) <= this.startDate || prevMonth.valueOf() > this.endDate ||
					$.inArray(prevMonth.getUTCDay(), this.daysOfWeekDisabled) !== -1) {
					clsName += ' disabled';
				}
				html.push('<td class="day' + clsName + '">' + prevMonth.getUTCDate() + '</td>');
				if (prevMonth.getUTCDay() == this.weekEnd) {
					html.push('</tr>');
				}
				prevMonth.setUTCDate(prevMonth.getUTCDate() + 1);
			}
			this.picker.find('.datetimepicker-days tbody').empty().append(html.join(''));

			html = [];
			var txt = '', meridian = '', meridianOld = '';
			for (var i = 0; i < 24; i++) {
				var actual = UTCDate(year, month, dayMonth, i);
				clsName = '';
				// We want the previous hour for the startDate
				if ((actual.valueOf() + 3600000) <= this.startDate || actual.valueOf() > this.endDate) {
					clsName += ' disabled';
				} else if (hours == i) {
					clsName += ' active';
				}
				if (this.showMeridian && dates[this.language].meridiem.length == 2) {
					meridian = (i < 12 ? dates[this.language].meridiem[0] : dates[this.language].meridiem[1]);
					if (meridian != meridianOld) {
						if (meridianOld != '') {
							html.push('</fieldset>');
						}
						html.push('<fieldset class="hour"><legend>' + meridian.toUpperCase() + '</legend>');
					}
					meridianOld = meridian;
					txt = (i % 12 ? i % 12 : 12);
					html.push('<span class="hour' + clsName + ' hour_' + (i < 12 ? 'am' : 'pm') + '">' + txt + '</span>');
					if (i == 23) {
						html.push('</fieldset>');
					}
				} else {
					txt = i + ':00';
					html.push('<span class="hour' + clsName + '">' + txt + '</span>');
				}
			}
			this.picker.find('.datetimepicker-hours td').html(html.join(''));

			html = [];
			txt = '', meridian = '', meridianOld = '';
			for (var i = 0; i < 60; i += this.minuteStep) {
				var actual = UTCDate(year, month, dayMonth, hours, i, 0);
				clsName = '';
				if (actual.valueOf() < this.startDate || actual.valueOf() > this.endDate) {
					clsName += ' disabled';
				} else if (Math.floor(minutes / this.minuteStep) == Math.floor(i / this.minuteStep)) {
					clsName += ' active';
				}
				if (this.showMeridian && dates[this.language].meridiem.length == 2) {
					meridian = (hours < 12 ? dates[this.language].meridiem[0] : dates[this.language].meridiem[1]);
					if (meridian != meridianOld) {
						if (meridianOld != '') {
							html.push('</fieldset>');
						}
						html.push('<fieldset class="minute"><legend>' + meridian.toUpperCase() + '</legend>');
					}
					meridianOld = meridian;
					txt = (hours % 12 ? hours % 12 : 12);
					//html.push('<span class="minute'+clsName+' minute_'+(hours<12?'am':'pm')+'">'+txt+'</span>');
					html.push('<span class="minute' + clsName + '">' + txt + ':' + (i < 10 ? '0' + i : i) + '</span>');
					if (i == 59) {
						html.push('</fieldset>');
					}
				} else {
					txt = i + ':00';
					//html.push('<span class="hour'+clsName+'">'+txt+'</span>');
					html.push('<span class="minute' + clsName + '">' + hours + ':' + (i < 10 ? '0' + i : i) + '</span>');
				}
			}
			this.picker.find('.datetimepicker-minutes td').html(html.join(''));

			var currentYear = this.date.getUTCFullYear();
			var months = this.picker.find('.datetimepicker-months')
				.find('th:eq(1)')
				.text(year)
				.end()
				.find('span').removeClass('active');
			if (currentYear == year) {
				months.eq(this.date.getUTCMonth()).addClass('active');
			}
			if (year < startYear || year > endYear) {
				months.addClass('disabled');
			}
			if (year == startYear) {
				months.slice(0, startMonth).addClass('disabled');
			}
			if (year == endYear) {
				months.slice(endMonth + 1).addClass('disabled');
			}

			html = '';
			year = parseInt(year / 10, 10) * 10;
			var yearCont = this.picker.find('.datetimepicker-years')
				.find('th:eq(1)')
				.text(year + '-' + (year + 9))
				.end()
				.find('td');
			year -= 1;
			for (var i = -1; i < 11; i++) {
				html += '<span class="year' + (i == -1 || i == 10 ? ' old' : '') + (currentYear == year ? ' active' : '') + (year < startYear || year > endYear ? ' disabled' : '') + '">' + year + '</span>';
				year += 1;
			}
			yearCont.html(html);
			this.place();
		},

		updateNavArrows: function () {
			var d = new Date(this.viewDate),
				year = d.getUTCFullYear(),
				month = d.getUTCMonth(),
				day = d.getUTCDate(),
				hour = d.getUTCHours();
			switch (this.viewMode) {
				case 0:
					if (this.startDate !== -Infinity && year <= this.startDate.getUTCFullYear()
						&& month <= this.startDate.getUTCMonth()
						&& day <= this.startDate.getUTCDate()
						&& hour <= this.startDate.getUTCHours()) {
						this.picker.find('.prev').css({visibility: 'hidden'});
					} else {
						this.picker.find('.prev').css({visibility: 'visible'});
					}
					if (this.endDate !== Infinity && year >= this.endDate.getUTCFullYear()
						&& month >= this.endDate.getUTCMonth()
						&& day >= this.endDate.getUTCDate()
						&& hour >= this.endDate.getUTCHours()) {
						this.picker.find('.next').css({visibility: 'hidden'});
					} else {
						this.picker.find('.next').css({visibility: 'visible'});
					}
					break;
				case 1:
					if (this.startDate !== -Infinity && year <= this.startDate.getUTCFullYear()
						&& month <= this.startDate.getUTCMonth()
						&& day <= this.startDate.getUTCDate()) {
						this.picker.find('.prev').css({visibility: 'hidden'});
					} else {
						this.picker.find('.prev').css({visibility: 'visible'});
					}
					if (this.endDate !== Infinity && year >= this.endDate.getUTCFullYear()
						&& month >= this.endDate.getUTCMonth()
						&& day >= this.endDate.getUTCDate()) {
						this.picker.find('.next').css({visibility: 'hidden'});
					} else {
						this.picker.find('.next').css({visibility: 'visible'});
					}
					break;
				case 2:
					if (this.startDate !== -Infinity && year <= this.startDate.getUTCFullYear()
						&& month <= this.startDate.getUTCMonth()) {
						this.picker.find('.prev').css({visibility: 'hidden'});
					} else {
						this.picker.find('.prev').css({visibility: 'visible'});
					}
					if (this.endDate !== Infinity && year >= this.endDate.getUTCFullYear()
						&& month >= this.endDate.getUTCMonth()) {
						this.picker.find('.next').css({visibility: 'hidden'});
					} else {
						this.picker.find('.next').css({visibility: 'visible'});
					}
					break;
				case 3:
				case 4:
					if (this.startDate !== -Infinity && year <= this.startDate.getUTCFullYear()) {
						this.picker.find('.prev').css({visibility: 'hidden'});
					} else {
						this.picker.find('.prev').css({visibility: 'visible'});
					}
					if (this.endDate !== Infinity && year >= this.endDate.getUTCFullYear()) {
						this.picker.find('.next').css({visibility: 'hidden'});
					} else {
						this.picker.find('.next').css({visibility: 'visible'});
					}
					break;
			}
		},

		mousewheel: function (e) {

			e.preventDefault();
			e.stopPropagation();

			if (this.wheelPause) {
				return;
			}

			this.wheelPause = true;

			var originalEvent = e.originalEvent;

			var delta = originalEvent.wheelDelta;

			var mode = delta > 0 ? 1 : (delta === 0) ? 0 : -1;

			if (this.wheelViewModeNavigationInverseDirection) {
				mode = -mode;
			}

			this.showMode(mode);

			setTimeout($.proxy(function () {

				this.wheelPause = false

			}, this), this.wheelViewModeNavigationDelay);

		},

		click: function (e) {
			e.stopPropagation();
			e.preventDefault();
			var target = $(e.target).closest('span, td, th, legend');
			if (target.length == 1) {
				if (target.is('.disabled')) {
					this.element.trigger({
						type:      'outOfRange',
						date:      this.viewDate,
						startDate: this.startDate,
						endDate:   this.endDate
					});
					return;
				}
				switch (target[0].nodeName.toLowerCase()) {
					case 'th':
						switch (target[0].className) {
							case 'switch':
								this.showMode(1);
								break;
							case 'prev':
							case 'next':
								var dir = DPGlobal.modes[this.viewMode].navStep * (target[0].className == 'prev' ? -1 : 1);
								switch (this.viewMode) {
									case 0:
										this.viewDate = this.moveHour(this.viewDate, dir);
										break;
									case 1:
										this.viewDate = this.moveDate(this.viewDate, dir);
										break;
									case 2:
										this.viewDate = this.moveMonth(this.viewDate, dir);
										break;
									case 3:
									case 4:
										this.viewDate = this.moveYear(this.viewDate, dir);
										break;
								}
								this.fill();
								break;
							case 'today':
								var date = new Date();
								date = UTCDate(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), 0);

								// Respect startDate and endDate.
								if (date < this.startDate) date = this.startDate;
								else if (date > this.endDate) date = this.endDate;

								this.viewMode = this.startViewMode;
								this.showMode(0);
								this._setDate(date);
								this.fill();
								if (this.autoclose) {
									this.hide();
								}
								break;
						}
						break;
					case 'span':
						if (!target.is('.disabled')) {
							var year = this.viewDate.getUTCFullYear(),
								month = this.viewDate.getUTCMonth(),
								day = this.viewDate.getUTCDate(),
								hours = this.viewDate.getUTCHours(),
								minutes = this.viewDate.getUTCMinutes(),
								seconds = this.viewDate.getUTCSeconds();

							if (target.is('.month')) {
								this.viewDate.setUTCDate(1);
								month = target.parent().find('span').index(target);
								day = this.viewDate.getUTCDate();
								this.viewDate.setUTCMonth(month);
								this.element.trigger({
									type: 'changeMonth',
									date: this.viewDate
								});
								if (this.viewSelect >= 3) {
									this._setDate(UTCDate(year, month, day, hours, minutes, seconds, 0));
								}
							} else if (target.is('.year')) {
								this.viewDate.setUTCDate(1);
								year = parseInt(target.text(), 10) || 0;
								this.viewDate.setUTCFullYear(year);
								this.element.trigger({
									type: 'changeYear',
									date: this.viewDate
								});
								if (this.viewSelect >= 4) {
									this._setDate(UTCDate(year, month, day, hours, minutes, seconds, 0));
								}
							} else if (target.is('.hour')) {
								hours = parseInt(target.text(), 10) || 0;
								if (target.hasClass('hour_am') || target.hasClass('hour_pm')) {
									if (hours == 12 && target.hasClass('hour_am')) {
										hours = 0;
									} else if (hours != 12 && target.hasClass('hour_pm')) {
										hours += 12;
									}
								}
								this.viewDate.setUTCHours(hours);
								this.element.trigger({
									type: 'changeHour',
									date: this.viewDate
								});
								if (this.viewSelect >= 1) {
									this._setDate(UTCDate(year, month, day, hours, minutes, seconds, 0));
								}
							} else if (target.is('.minute')) {
								minutes = parseInt(target.text().substr(target.text().indexOf(':') + 1), 10) || 0;
								this.viewDate.setUTCMinutes(minutes);
								this.element.trigger({
									type: 'changeMinute',
									date: this.viewDate
								});
								if (this.viewSelect >= 0) {
									this._setDate(UTCDate(year, month, day, hours, minutes, seconds, 0));
								}
							}
							if (this.viewMode != 0) {
								var oldViewMode = this.viewMode;
								this.showMode(-1);
								this.fill();
								if (oldViewMode == this.viewMode && this.autoclose) {
									this.hide();
								}
							} else {
								this.fill();
								if (this.autoclose) {
									this.hide();
								}
							}
						}
						break;
					case 'td':
						if (target.is('.day') && !target.is('.disabled')) {
							var day = parseInt(target.text(), 10) || 1;
							var year = this.viewDate.getUTCFullYear(),
								month = this.viewDate.getUTCMonth(),
								hours = this.viewDate.getUTCHours(),
								minutes = this.viewDate.getUTCMinutes(),
								seconds = this.viewDate.getUTCSeconds();
							if (target.is('.old')) {
								if (month === 0) {
									month = 11;
									year -= 1;
								} else {
									month -= 1;
								}
							} else if (target.is('.new')) {
								if (month == 11) {
									month = 0;
									year += 1;
								} else {
									month += 1;
								}
							}
							this.viewDate.setUTCFullYear(year);
							this.viewDate.setUTCMonth(month, day);
							this.element.trigger({
								type: 'changeDay',
								date: this.viewDate
							});
							if (this.viewSelect >= 2) {
								this._setDate(UTCDate(year, month, day, hours, minutes, seconds, 0));
							}
						}
						var oldViewMode = this.viewMode;
						this.showMode(-1);
						this.fill();
						if (oldViewMode == this.viewMode && this.autoclose) {
							this.hide();
						}
						break;
				}
			}
		},

		_setDate: function (date, which) {
			if (!which || which == 'date')
				this.date = date;
			if (!which || which == 'view')
				this.viewDate = date;
			this.fill();
			this.setValue();
			var element;
			if (this.isInput) {
				element = this.element;
			} else if (this.component) {
				element = this.element.find('input');
			}
			if (element) {
				element.change();
				if (this.autoclose && (!which || which == 'date')) {
					//this.hide();
				}
			}
			this.element.trigger({
				type: 'changeDate',
				date: this.date
			});
		},

		moveMinute: function (date, dir) {
			if (!dir) return date;
			var new_date = new Date(date.valueOf());
			//dir = dir > 0 ? 1 : -1;
			new_date.setUTCMinutes(new_date.getUTCMinutes() + (dir * this.minuteStep));
			return new_date;
		},

		moveHour: function (date, dir) {
			if (!dir) return date;
			var new_date = new Date(date.valueOf());
			//dir = dir > 0 ? 1 : -1;
			new_date.setUTCHours(new_date.getUTCHours() + dir);
			return new_date;
		},

		moveDate: function (date, dir) {
			if (!dir) return date;
			var new_date = new Date(date.valueOf());
			//dir = dir > 0 ? 1 : -1;
			new_date.setUTCDate(new_date.getUTCDate() + dir);
			return new_date;
		},

		moveMonth: function (date, dir) {
			if (!dir) return date;
			var new_date = new Date(date.valueOf()),
				day = new_date.getUTCDate(),
				month = new_date.getUTCMonth(),
				mag = Math.abs(dir),
				new_month, test;
			dir = dir > 0 ? 1 : -1;
			if (mag == 1) {
				test = dir == -1
					// If going back one month, make sure month is not current month
					// (eg, Mar 31 -> Feb 31 == Feb 28, not Mar 02)
					? function () {
					return new_date.getUTCMonth() == month;
				}
					// If going forward one month, make sure month is as expected
					// (eg, Jan 31 -> Feb 31 == Feb 28, not Mar 02)
					: function () {
					return new_date.getUTCMonth() != new_month;
				};
				new_month = month + dir;
				new_date.setUTCMonth(new_month);
				// Dec -> Jan (12) or Jan -> Dec (-1) -- limit expected date to 0-11
				if (new_month < 0 || new_month > 11)
					new_month = (new_month + 12) % 12;
			} else {
				// For magnitudes >1, move one month at a time...
				for (var i = 0; i < mag; i++)
					// ...which might decrease the day (eg, Jan 31 to Feb 28, etc)...
					new_date = this.moveMonth(new_date, dir);
				// ...then reset the day, keeping it in the new month
				new_month = new_date.getUTCMonth();
				new_date.setUTCDate(day);
				test = function () {
					return new_month != new_date.getUTCMonth();
				};
			}
			// Common date-resetting loop -- if date is beyond end of month, make it
			// end of month
			while (test()) {
				new_date.setUTCDate(--day);
				new_date.setUTCMonth(new_month);
			}
			return new_date;
		},

		moveYear: function (date, dir) {
			return this.moveMonth(date, dir * 12);
		},

		dateWithinRange: function (date) {
			return date >= this.startDate && date <= this.endDate;
		},

		keydown: function (e) {
			if (this.picker.is(':not(:visible)')) {
				if (e.keyCode == 27) // allow escape to hide and re-show picker
					this.show();
				return;
			}
			var dateChanged = false,
				dir, day, month,
				newDate, newViewDate;
			switch (e.keyCode) {
				case 27: // escape
					this.hide();
					e.preventDefault();
					break;
				case 37: // left
				case 39: // right
					if (!this.keyboardNavigation) break;
					dir = e.keyCode == 37 ? -1 : 1;
					viewMode = this.viewMode;
					if (e.ctrlKey) {
						viewMode += 2;
					} else if (e.shiftKey) {
						viewMode += 1;
					}
					if (viewMode == 4) {
						newDate = this.moveYear(this.date, dir);
						newViewDate = this.moveYear(this.viewDate, dir);
					} else if (viewMode == 3) {
						newDate = this.moveMonth(this.date, dir);
						newViewDate = this.moveMonth(this.viewDate, dir);
					} else if (viewMode == 2) {
						newDate = this.moveDate(this.date, dir);
						newViewDate = this.moveDate(this.viewDate, dir);
					} else if (viewMode == 1) {
						newDate = this.moveHour(this.date, dir);
						newViewDate = this.moveHour(this.viewDate, dir);
					} else if (viewMode == 0) {
						newDate = this.moveMinute(this.date, dir);
						newViewDate = this.moveMinute(this.viewDate, dir);
					}
					if (this.dateWithinRange(newDate)) {
						this.date = newDate;
						this.viewDate = newViewDate;
						this.setValue();
						this.update();
						e.preventDefault();
						dateChanged = true;
					}
					break;
				case 38: // up
				case 40: // down
					if (!this.keyboardNavigation) break;
					dir = e.keyCode == 38 ? -1 : 1;
					viewMode = this.viewMode;
					if (e.ctrlKey) {
						viewMode += 2;
					} else if (e.shiftKey) {
						viewMode += 1;
					}
					if (viewMode == 4) {
						newDate = this.moveYear(this.date, dir);
						newViewDate = this.moveYear(this.viewDate, dir);
					} else if (viewMode == 3) {
						newDate = this.moveMonth(this.date, dir);
						newViewDate = this.moveMonth(this.viewDate, dir);
					} else if (viewMode == 2) {
						newDate = this.moveDate(this.date, dir * 7);
						newViewDate = this.moveDate(this.viewDate, dir * 7);
					} else if (viewMode == 1) {
						if (this.showMeridian) {
							newDate = this.moveHour(this.date, dir * 6);
							newViewDate = this.moveHour(this.viewDate, dir * 6);
						} else {
							newDate = this.moveHour(this.date, dir * 4);
							newViewDate = this.moveHour(this.viewDate, dir * 4);
						}
					} else if (viewMode == 0) {
						newDate = this.moveMinute(this.date, dir * 4);
						newViewDate = this.moveMinute(this.viewDate, dir * 4);
					}
					if (this.dateWithinRange(newDate)) {
						this.date = newDate;
						this.viewDate = newViewDate;
						this.setValue();
						this.update();
						e.preventDefault();
						dateChanged = true;
					}
					break;
				case 13: // enter
					if (this.viewMode != 0) {
						var oldViewMode = this.viewMode;
						this.showMode(-1);
						this.fill();
						if (oldViewMode == this.viewMode && this.autoclose) {
							this.hide();
						}
					} else {
						this.fill();
						if (this.autoclose) {
							this.hide();
						}
					}
					e.preventDefault();
					break;
				case 9: // tab
					this.hide();
					break;
			}
			if (dateChanged) {
				var element;
				if (this.isInput) {
					element = this.element;
				} else if (this.component) {
					element = this.element.find('input');
				}
				if (element) {
					element.change();
				}
				this.element.trigger({
					type: 'changeDate',
					date: this.date
				});
			}
		},

		showMode: function (dir) {
			if (dir) {
				var newViewMode = Math.max(0, Math.min(DPGlobal.modes.length - 1, this.viewMode + dir));
				if (newViewMode >= this.minView && newViewMode <= this.maxView) {
					this.element.trigger({
						type:        'changeMode',
						date:        this.viewDate,
						oldViewMode: this.viewMode,
						newViewMode: newViewMode
					});

					this.viewMode = newViewMode;
				}
			}
			/*
			 vitalets: fixing bug of very special conditions:
			 jquery 1.7.1 + webkit + show inline datetimepicker in bootstrap popover.
			 Method show() does not set display css correctly and datetimepicker is not shown.
			 Changed to .css('display', 'block') solve the problem.
			 See https://github.com/vitalets/x-editable/issues/37

			 In jquery 1.7.2+ everything works fine.
			 */
			//this.picker.find('>div').hide().filter('.datetimepicker-'+DPGlobal.modes[this.viewMode].clsName).show();
			this.picker.find('>div').hide().filter('.datetimepicker-' + DPGlobal.modes[this.viewMode].clsName).css('display', 'block');
			this.updateNavArrows();
		},

		reset: function (e) {
			this._setDate(null, 'date');
		}
	};

	$.fn.fdatetimepicker = function (option) {
		var args = Array.apply(null, arguments);
		args.shift();
		return this.each(function () {
			var $this = $(this),
				data = $this.data('datetimepicker'),
				options = typeof option == 'object' && option;
			if (!data) {
				$this.data('datetimepicker', (data = new Datetimepicker(this, $.extend({}, $.fn.fdatetimepicker.defaults, options))));
			}
			if (typeof option == 'string' && typeof data[option] == 'function') {
				data[option].apply(data, args);
			}
		});
	};

	$.fn.fdatetimepicker.defaults = {
	};
	$.fn.fdatetimepicker.Constructor = Datetimepicker;
	var dates = $.fn.fdatetimepicker.dates = {
		en: {
			days:        ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
			daysShort:   ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
			daysMin:     ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
			months:      ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
			monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			meridiem:    ["am", "pm"],
			suffix:      ["st", "nd", "rd", "th"],
			today:       "Today"

        },

        zh: {
          days: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
          daysShort: ["日", "一", "二", "三", "四", "五", "六", "日"],
          daysMin: ["日", "一", "二", "三", "四", "五", "六", "日"],
          months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
          monthsShort: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
          meridiem: ["上午", "下午"],
          suffix: ["", "", "", ""],
          today: "今天"
        }
	};

	var DPGlobal = {
		modes:            [
			{
				clsName: 'minutes',
				navFnc:  'Hours',
				navStep: 1
			},
			{
				clsName: 'hours',
				navFnc:  'Date',
				navStep: 1
			},
			{
				clsName: 'days',
				navFnc:  'Month',
				navStep: 1
			},
			{
				clsName: 'months',
				navFnc:  'FullYear',
				navStep: 1
			},
			{
				clsName: 'years',
				navFnc:  'FullYear',
				navStep: 10
			}
		],
		isLeapYear:       function (year) {
			return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0))
		},
		getDaysInMonth:   function (year, month) {
			return [31, (DPGlobal.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month]
		},
		getDefaultFormat: function (type, field) {
			if (type == "standard") {
				if (field == 'input')
					return 'yyyy-mm-dd hh:ii';
				else
					return 'yyyy-mm-dd hh:ii:ss';
			} else if (type == "php") {
				if (field == 'input')
					return 'Y-m-d H:i';
				else
					return 'Y-m-d H:i:s';
			} else {
				throw new Error("Invalid format type.");
			}
		},
		validParts:       function (type) {
			if (type == "standard") {
				return /hh?|HH?|p|P|ii?|ss?|dd?|DD?|mm?|MM?|yy(?:yy)?/g;
			} else if (type == "php") {
				return /[dDjlNwzFmMnStyYaABgGhHis]/g;
			} else {
				throw new Error("Invalid format type.");
			}
		},
		nonpunctuation:   /[^ -\/:-@\[-`{-~\t\n\rTZ]+/g,
		parseFormat:      function (format, type) {
			// IE treats \0 as a string end in inputs (truncating the value),
			// so it's a bad format delimiter, anyway
			var separators = format.replace(this.validParts(type), '\0').split('\0'),
				parts = format.match(this.validParts(type));
			if (!separators || !separators.length || !parts || parts.length == 0) {
				throw new Error("Invalid date format.");
			}
			return {separators: separators, parts: parts};
		},
		parseDate:        function (date, format, language, type) {
			if (date instanceof Date) {
				var dateUTC = new Date(date.valueOf() - date.getTimezoneOffset() * 60000);
				dateUTC.setMilliseconds(0);
				return dateUTC;
			}
			if (/^\d{4}\-\d{1,2}\-\d{1,2}$/.test(date)) {
				format = this.parseFormat('yyyy-mm-dd', type);
			}
			if (/^\d{4}\-\d{1,2}\-\d{1,2}[T ]\d{1,2}\:\d{1,2}$/.test(date)) {
				format = this.parseFormat('yyyy-mm-dd hh:ii', type);
			}
			if (/^\d{4}\-\d{1,2}\-\d{1,2}[T ]\d{1,2}\:\d{1,2}\:\d{1,2}[Z]{0,1}$/.test(date)) {
				format = this.parseFormat('yyyy-mm-dd hh:ii:ss', type);
			}
			if (/^[-+]\d+[dmwy]([\s,]+[-+]\d+[dmwy])*$/.test(date)) {
				var part_re = /([-+]\d+)([dmwy])/,
					parts = date.match(/([-+]\d+)([dmwy])/g),
					part, dir;
				date = new Date();
				for (var i = 0; i < parts.length; i++) {
					part = part_re.exec(parts[i]);
					dir = parseInt(part[1]);
					switch (part[2]) {
						case 'd':
							date.setUTCDate(date.getUTCDate() + dir);
							break;
						case 'm':
							date = Datetimepicker.prototype.moveMonth.call(Datetimepicker.prototype, date, dir);
							break;
						case 'w':
							date.setUTCDate(date.getUTCDate() + dir * 7);
							break;
						case 'y':
							date = Datetimepicker.prototype.moveYear.call(Datetimepicker.prototype, date, dir);
							break;
					}
				}
				return UTCDate(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), 0);
			}
			var parts = date && date.match(this.nonpunctuation) || [],
				date = new Date(0, 0, 0, 0, 0, 0, 0),
				parsed = {},
				setters_order = ['hh', 'h', 'ii', 'i', 'ss', 's', 'yyyy', 'yy', 'M', 'MM', 'm', 'mm', 'D', 'DD', 'd', 'dd', 'H', 'HH', 'p', 'P'],
				setters_map = {
					hh:   function (d, v) {
						return d.setUTCHours(v);
					},
					h:    function (d, v) {
						return d.setUTCHours(v);
					},
					HH:   function (d, v) {
						return d.setUTCHours(v == 12 ? 0 : v);
					},
					H:    function (d, v) {
						return d.setUTCHours(v == 12 ? 0 : v);
					},
					ii:   function (d, v) {
						return d.setUTCMinutes(v);
					},
					i:    function (d, v) {
						return d.setUTCMinutes(v);
					},
					ss:   function (d, v) {
						return d.setUTCSeconds(v);
					},
					s:    function (d, v) {
						return d.setUTCSeconds(v);
					},
					yyyy: function (d, v) {
						return d.setUTCFullYear(v);
					},
					yy:   function (d, v) {
						return d.setUTCFullYear(2000 + v);
					},
					m:    function (d, v) {
						v -= 1;
						while (v < 0) v += 12;
						v %= 12;
						d.setUTCMonth(v);
						while (d.getUTCMonth() != v)
							d.setUTCDate(d.getUTCDate() - 1);
						return d;
					},
					d:    function (d, v) {
						return d.setUTCDate(v);
					},
					p:    function (d, v) {
						return d.setUTCHours(v == 1 ? d.getUTCHours() + 12 : d.getUTCHours());
					}
				},
				val, filtered, part;
			setters_map['M'] = setters_map['MM'] = setters_map['mm'] = setters_map['m'];
			setters_map['dd'] = setters_map['d'];
			setters_map['P'] = setters_map['p'];
			date = UTCDate(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
			if (parts.length == format.parts.length) {
				for (var i = 0, cnt = format.parts.length; i < cnt; i++) {
					val = parseInt(parts[i], 10);
					part = format.parts[i];
					if (isNaN(val)) {
						switch (part) {
							case 'MM':
								filtered = $(dates[language].months).filter(function () {
									var m = this.slice(0, parts[i].length),
										p = parts[i].slice(0, m.length);
									return m == p;
								});
								val = $.inArray(filtered[0], dates[language].months) + 1;
								break;
							case 'M':
								filtered = $(dates[language].monthsShort).filter(function () {
									var m = this.slice(0, parts[i].length),
										p = parts[i].slice(0, m.length);
									return m == p;
								});
								val = $.inArray(filtered[0], dates[language].monthsShort) + 1;
								break;
							case 'p':
							case 'P':
								val = $.inArray(parts[i].toLowerCase(), dates[language].meridiem);
								break;
						}
					}
					parsed[part] = val;
				}
				for (var i = 0, s; i < setters_order.length; i++) {
					s = setters_order[i];
					if (s in parsed && !isNaN(parsed[s]))
						setters_map[s](date, parsed[s])
				}
			}
			return date;
		},
		formatDate:       function (date, format, language, type) {
			if (date == null) {
				return '';
			}
			var val;
			if (type == 'standard') {
				val = {
					// year
					yy:   date.getUTCFullYear().toString().substring(2),
					yyyy: date.getUTCFullYear(),
					// month
					m:    date.getUTCMonth() + 1,
					M:    dates[language].monthsShort[date.getUTCMonth()],
					MM:   dates[language].months[date.getUTCMonth()],
					// day
					d:    date.getUTCDate(),
					D:    dates[language].daysShort[date.getUTCDay()],
					DD:   dates[language].days[date.getUTCDay()],
					p:    (dates[language].meridiem.length == 2 ? dates[language].meridiem[date.getUTCHours() < 12 ? 0 : 1] : ''),
					// hour
					h:    date.getUTCHours(),
					// minute
					i:    date.getUTCMinutes(),
					// second
					s:    date.getUTCSeconds()
				};

				if (dates[language].meridiem.length == 2) {
					val.H = (val.h % 12 == 0 ? 12 : val.h % 12);
				}
				else {
					val.H = val.h;
				}
				val.HH = (val.H < 10 ? '0' : '') + val.H;
				val.P = val.p.toUpperCase();
				val.hh = (val.h < 10 ? '0' : '') + val.h;
				val.ii = (val.i < 10 ? '0' : '') + val.i;
				val.ss = (val.s < 10 ? '0' : '') + val.s;
				val.dd = (val.d < 10 ? '0' : '') + val.d;
				val.mm = (val.m < 10 ? '0' : '') + val.m;
			} else if (type == 'php') {
				// php format
				val = {
					// year
					y: date.getUTCFullYear().toString().substring(2),
					Y: date.getUTCFullYear(),
					// month
					F: dates[language].months[date.getUTCMonth()],
					M: dates[language].monthsShort[date.getUTCMonth()],
					n: date.getUTCMonth() + 1,
					t: DPGlobal.getDaysInMonth(date.getUTCFullYear(), date.getUTCMonth()),
					// day
					j: date.getUTCDate(),
					l: dates[language].days[date.getUTCDay()],
					D: dates[language].daysShort[date.getUTCDay()],
					w: date.getUTCDay(), // 0 -> 6
					N: (date.getUTCDay() == 0 ? 7 : date.getUTCDay()),       // 1 -> 7
					S: (date.getUTCDate() % 10 <= dates[language].suffix.length ? dates[language].suffix[date.getUTCDate() % 10 - 1] : ''),
					// hour
					a: (dates[language].meridiem.length == 2 ? dates[language].meridiem[date.getUTCHours() < 12 ? 0 : 1] : ''),
					g: (date.getUTCHours() % 12 == 0 ? 12 : date.getUTCHours() % 12),
					G: date.getUTCHours(),
					// minute
					i: date.getUTCMinutes(),
					// second
					s: date.getUTCSeconds()
				};
				val.m = (val.n < 10 ? '0' : '') + val.n;
				val.d = (val.j < 10 ? '0' : '') + val.j;
				val.A = val.a.toString().toUpperCase();
				val.h = (val.g < 10 ? '0' : '') + val.g;
				val.H = (val.G < 10 ? '0' : '') + val.G;
				val.i = (val.i < 10 ? '0' : '') + val.i;
				val.s = (val.s < 10 ? '0' : '') + val.s;
			} else {
				throw new Error("Invalid format type.");
			}
			var date = [],
				seps = $.extend([], format.separators);
			for (var i = 0, cnt = format.parts.length; i < cnt; i++) {
				if (seps.length) {
					date.push(seps.shift());
				}
				date.push(val[format.parts[i]]);
			}
			if (seps.length) {
				date.push(seps.shift());
			}
			return date.join('');
		},
		convertViewMode:  function (viewMode) {
			switch (viewMode) {
				case 4:
				case 'decade':
					viewMode = 4;
					break;
				case 3:
				case 'year':
					viewMode = 3;
					break;
				case 2:
				case 'month':
					viewMode = 2;
					break;
				case 1:
				case 'day':
					viewMode = 1;
					break;
				case 0:
				case 'hour':
					viewMode = 0;
					break;
			}

			return viewMode;
		},
		headTemplate:     '<thead>' +
							  '<tr>' +
							  '<th class="prev"><i class="fi-arrow-left"/></th>' +
							  '<th colspan="5" class="switch"></th>' +
							  '<th class="next"><i class="fi-arrow-right"/></th>' +
							  '</tr>' +
			'</thead>',
		headTemplateV3:   '<thead>' +
							  '<tr>' +
							  '<th class="prev"><i class="icon-arrow-left"></i> </th>' +
							  '<th colspan="5" class="switch"></th>' +
							  '<th class="next"><i class="icon-arrow-right"></i> </th>' +
							  '</tr>' +
			'</thead>',
		contTemplate:     '<tbody><tr><td colspan="7"></td></tr></tbody>',
		footTemplate:     '<tfoot><tr><th colspan="7" class="today"></th></tr></tfoot>'
	};
	DPGlobal.template = '<div class="datetimepicker">' +
		'<div class="datetimepicker-minutes">' +
		'<table class=" table-condensed">' +
		DPGlobal.headTemplate +
		DPGlobal.contTemplate +
		DPGlobal.footTemplate +
		'</table>' +
		'</div>' +
		'<div class="datetimepicker-hours">' +
		'<table class=" table-condensed">' +
		DPGlobal.headTemplate +
		DPGlobal.contTemplate +
		DPGlobal.footTemplate +
		'</table>' +
		'</div>' +
		'<div class="datetimepicker-days">' +
		'<table class=" table-condensed">' +
		DPGlobal.headTemplate +
		'<tbody></tbody>' +
		DPGlobal.footTemplate +
		'</table>' +
		'</div>' +
		'<div class="datetimepicker-months">' +
		'<table class="table-condensed">' +
		DPGlobal.headTemplate +
		DPGlobal.contTemplate +
		DPGlobal.footTemplate +
		'</table>' +
		'</div>' +
		'<div class="datetimepicker-years">' +
		'<table class="table-condensed">' +
		DPGlobal.headTemplate +
		DPGlobal.contTemplate +
		DPGlobal.footTemplate +
		'</table>' +
		'</div>' +
		'</div>';
	DPGlobal.templateV3 = '<div class="datetimepicker">' +
		'<div class="datetimepicker-minutes">' +
		'<table class=" table-condensed">' +
		DPGlobal.headTemplateV3 +
		DPGlobal.contTemplate +
		DPGlobal.footTemplate +
		'</table>' +
		'</div>' +
		'<div class="datetimepicker-hours">' +
		'<table class=" table-condensed">' +
		DPGlobal.headTemplateV3 +
		DPGlobal.contTemplate +
		DPGlobal.footTemplate +
		'</table>' +
		'</div>' +
		'<div class="datetimepicker-days">' +
		'<table class=" table-condensed">' +
		DPGlobal.headTemplateV3 +
		'<tbody></tbody>' +
		DPGlobal.footTemplate +
		'</table>' +
		'</div>' +
		'<div class="datetimepicker-months">' +
		'<table class="table-condensed">' +
		DPGlobal.headTemplateV3 +
		DPGlobal.contTemplate +
		DPGlobal.footTemplate +
		'</table>' +
		'</div>' +
		'<div class="datetimepicker-years">' +
		'<table class="table-condensed">' +
		DPGlobal.headTemplateV3 +
		DPGlobal.contTemplate +
		DPGlobal.footTemplate +
		'</table>' +
		'</div>' +
		'</div>';
	$.fn.fdatetimepicker.DPGlobal = DPGlobal;

	/* DATETIMEPICKER NO CONFLICT
	 * =================== */

	$.fn.fdatetimepicker.noConflict = function () {
		$.fn.fdatetimepicker = old;
		return this;
	};

	/* DATETIMEPICKER DATA-API
	 * ================== */

	$(document).on(
		'focus.datetimepicker.data-api click.datetimepicker.data-api',
		'[data-provide="datetimepicker"]',
		function (e) {
			var $this = $(this);
			if ($this.data('datetimepicker')) return;
			e.preventDefault();
			// component click requires us to explicitly show it
			$this.fdatetimepicker('show');
		}
	);
	$(function () {
		$('[data-provide="datetimepicker-inline"]').fdatetimepicker();
	});

}(window.jQuery);

// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//







$(function() {
  $(document).foundation('topbar', 'reflow');
});

$(function(){
  $('#employeedatepicker').fdatetimepicker({
      minView: '2',
      initialDate: '01-01-1995',
      format: 'mm-dd-yyyy'
  });
});