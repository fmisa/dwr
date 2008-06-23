/*
	Copyright (c) 2004-2008, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit._TimePicker"]){dojo._hasResource["dijit._TimePicker"]=true;dojo.provide("dijit._TimePicker");dojo.require("dijit.form._FormWidget");dojo.require("dojo.date.locale");dojo.declare("dijit._TimePicker",[dijit._Widget,dijit._Templated],{templateString:"<div id=\"widget_${id}\" class=\"dijitMenu\"\n    ><div dojoAttachPoint=\"upArrow\" class=\"dijitButtonNode\"><span class=\"dijitTimePickerA11yText\">&#9650;</span></div\n    ><div dojoAttachPoint=\"timeMenu,focusNode\" dojoAttachEvent=\"onclick:_onOptionSelected,onmouseover,onmouseout\"></div\n    ><div dojoAttachPoint=\"downArrow\" class=\"dijitButtonNode\"><span class=\"dijitTimePickerA11yText\">&#9660;</span></div\n></div>\n",baseClass:"dijitTimePicker",clickableIncrement:"T00:15:00",visibleIncrement:"T01:00:00",visibleRange:"T05:00:00",value:new Date(),_visibleIncrement:2,_clickableIncrement:1,_totalIncrements:10,constraints:{},serialize:dojo.date.stamp.toISOString,setValue:function(_1,_2){this.value=_1;this._showText();},isDisabledDate:function(_3,_4){return false;},_showText:function(){this.timeMenu.innerHTML="";var _5=dojo.date.stamp.fromISOString;this._clickableIncrementDate=_5(this.clickableIncrement);this._visibleIncrementDate=_5(this.visibleIncrement);this._visibleRangeDate=_5(this.visibleRange);var _6=function(_7){return _7.getHours()*60*60+_7.getMinutes()*60+_7.getSeconds();};var _8=_6(this._clickableIncrementDate);var _9=_6(this._visibleIncrementDate);var _a=_6(this._visibleRangeDate);var _b=this.value.getTime();this._refDate=new Date(_b-_b%(_9*1000));this._refDate.setFullYear(1970,0,1);this._clickableIncrement=1;this._totalIncrements=_a/_8;this._visibleIncrement=_9/_8;for(var i=-(this._totalIncrements>>1);i<(this._totalIncrements>>1);i+=this._clickableIncrement){this.timeMenu.appendChild(this._createOption(i));}},postCreate:function(){if(this.constraints===dijit._TimePicker.prototype.constraints){this.constraints={};}dojo.mixin(this,this.constraints);if(!this.constraints.locale){this.constraints.locale=this.lang;}this.connect(this.timeMenu,dojo.isIE?"onmousewheel":"DOMMouseScroll","_mouseWheeled");var _d=dijit.typematic.addMouseListener;_d(this.upArrow,this,this._onArrowUp,0.8,500);_d(this.downArrow,this,this._onArrowDown,0.8,500);this.inherited(arguments);this.setValue(this.value);},_createOption:function(_e){var _f=dojo.doc.createElement("div");var _10=(_f.date=new Date(this._refDate));_f.index=_e;var _11=this._clickableIncrementDate;_10.setHours(_10.getHours()+_11.getHours()*_e,_10.getMinutes()+_11.getMinutes()*_e,_10.getSeconds()+_11.getSeconds()*_e);var _12=dojo.doc.createElement("div");dojo.addClass(_f,this.baseClass+"Item");dojo.addClass(_12,this.baseClass+"ItemInner");_12.innerHTML=dojo.date.locale.format(_10,this.constraints);_f.appendChild(_12);if(_e%this._visibleIncrement<1&&_e%this._visibleIncrement>-1){dojo.addClass(_f,this.baseClass+"Marker");}else{if(!(_e%this._clickableIncrement)){dojo.addClass(_f,this.baseClass+"Tick");}}if(this.isDisabledDate(_10)){dojo.addClass(_f,this.baseClass+"ItemDisabled");}if(!dojo.date.compare(this.value,_10,this.constraints.selector)){_f.selected=true;dojo.addClass(_f,this.baseClass+"ItemSelected");}return _f;},_onOptionSelected:function(tgt){var _14=tgt.target.date||tgt.target.parentNode.date;if(!_14||this.isDisabledDate(_14)){return;}this.setValue(_14);this.onValueSelected(_14);},onValueSelected:function(_15){},onmouseover:function(e){var tgr=(e.target.parentNode===this.timeMenu)?e.target:e.target.parentNode;this._highlighted_option=tgr;dojo.addClass(tgr,this.baseClass+"ItemHover");},onmouseout:function(e){var tgr=(e.target.parentNode===this.timeMenu)?e.target:e.target.parentNode;if(this._highlighted_option===tgr){dojo.removeClass(tgr,this.baseClass+"ItemHover");}},_mouseWheeled:function(e){dojo.stopEvent(e);var _1b=(dojo.isIE?e.wheelDelta:-e.detail);this[(_1b>0?"_onArrowUp":"_onArrowDown")]();},_onArrowUp:function(){var _1c=this.timeMenu.childNodes[0].index-1;var div=this._createOption(_1c);this.timeMenu.removeChild(this.timeMenu.childNodes[this.timeMenu.childNodes.length-1]);this.timeMenu.insertBefore(div,this.timeMenu.childNodes[0]);},_onArrowDown:function(){var _1e=this.timeMenu.childNodes[this.timeMenu.childNodes.length-1].index+1;var div=this._createOption(_1e);this.timeMenu.removeChild(this.timeMenu.childNodes[0]);this.timeMenu.appendChild(div);}});}