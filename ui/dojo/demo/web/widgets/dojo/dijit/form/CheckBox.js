/*
	Copyright (c) 2004-2008, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit.form.CheckBox"]){dojo._hasResource["dijit.form.CheckBox"]=true;dojo.provide("dijit.form.CheckBox");dojo.require("dijit.form.Button");dojo.declare("dijit.form.CheckBox",dijit.form.ToggleButton,{templateString:"<div class=\"dijitReset dijitInline\" waiRole=\"presentation\"\n\t><input\n\t \ttype=\"${type}\" name=\"${name}\"\n\t\tclass=\"dijitReset dijitCheckBoxInput\"\n\t\tdojoAttachPoint=\"focusNode\"\n\t \tdojoAttachEvent=\"onmouseover:_onMouse,onmouseout:_onMouse,onclick:_onClick\"\n/></div>\n",baseClass:"dijitCheckBox",type:"checkbox",value:"on",setValue:function(_1){if(typeof _1=="string"){this.setAttribute("value",_1);_1=true;}this.setAttribute("checked",_1);},_getValueDeprecated:false,getValue:function(){return (this.checked?this.value:false);},reset:function(){this.inherited(arguments);this.setAttribute("value",this._resetValueAttr);},postCreate:function(){this.inherited(arguments);this._resetValueAttr=this.value;}});dojo.declare("dijit.form.RadioButton",dijit.form.CheckBox,{type:"radio",baseClass:"dijitRadio",_groups:{},postCreate:function(){(this._groups[this.name]=this._groups[this.name]||[]).push(this);this.inherited(arguments);},uninitialize:function(){dojo.forEach(this._groups[this.name],function(_2,i,_4){if(_2===this){_4.splice(i,1);return;}},this);},setAttribute:function(_5,_6){this.inherited(arguments);switch(_5){case "checked":if(this.checked){dojo.forEach(this._groups[this.name],function(_7){if(_7!=this&&_7.checked){_7.setAttribute("checked",false);}},this);}}},_clicked:function(e){if(!this.checked){this.setAttribute("checked",true);}}});}