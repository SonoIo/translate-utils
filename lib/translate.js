;(function (root, factory) {

	if (typeof define === 'function' && define.amd) {
		define(['backbone', 'underscore', 'unserscore.string'], function (Backbone, _, s) {
			return factory(root, Backbone, _, s);
		});
	}
	else if (typeof exports !== 'undefined') {
		var Backbone = require('backbone');
		var _ = require('underscore');
		var s = require('underscore.string');
		module.exports = factory(root, Backbone, _, s);
	}
	else {
		root.translate = factory(root, root.Backbone, root._, root.s);
	}

}(this, function (root, Backbone, _, _s) {

	var _currentLocale = 'en_EN';
	var _translations = {};
	var _defaultNamespace = 'default';

	var translate = _.extend({}, Backbone.Events);

	translate.setTranslations = function setTranslations(locale, translation, namespace) {
		if (typeof namespace === 'undefined')
			namespace = _defaultNamespace;

		if (typeof locale === 'object') {
			_translations = locale;
		}
		else {
			_translations[namespace]['locale'] = translation;
		}
	};

	translate.setLocale = function setLocale(newLocale) {
		_currentLocale = newLocale;
		translate.trigger('change:locale', _currentLocale);
	};

	translate.__ = function __(msg) {
		var args = _.toArray(arguments);
		args.unshift(_defaultNamespace);
		return translate.__n.apply(translate, args);
	};

	translate.__n = function __n(namespace, msg) {
		var args = _.toArray(arguments).slice(2);
		var trans = _translations[namespace];
		var translatedMsg;

		if (trans[_currentLocale] && trans[_currentLocale][msg]) {
			translatedMsg = trans[_currentLocale][msg];
		}
		else {
			// console.warn('Translate does not exists:', msg);
			translatedMsg = msg;
		}

		if (args.length == 0)
			return translatedMsg;

		args.unshift(translatedMsg);
		return _s.sprintf.apply(_s, args);
	};

	return translate;

}));