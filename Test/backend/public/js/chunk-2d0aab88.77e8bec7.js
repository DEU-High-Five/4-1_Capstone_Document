(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0aab88"],{"11e7":function(o,r,t){"use strict";t.r(r);var e=function(){var o=this,r=o.$createElement,t=o._self._c||r;return t("div",[t("CCard",[t("CCardHeader",[t("CIcon",{attrs:{name:"cil-drop"}}),o._v(" Theme colors ")],1),t("CCardBody",[t("CRow",[t("ColorTheme",{attrs:{color:"bg-primary"}},[t("h6",[o._v("Brand Primary Color")])]),t("ColorTheme",{attrs:{color:"bg-secondary"}},[t("h6",[o._v("Brand Secondary Color")])]),t("ColorTheme",{attrs:{color:"bg-success"}},[t("h6",[o._v("Brand Success Color")])]),t("ColorTheme",{attrs:{color:"bg-danger"}},[t("h6",[o._v("Brand Danger Color")])]),t("ColorTheme",{attrs:{color:"bg-warning"}},[t("h6",[o._v("Brand Warning Color")])]),t("ColorTheme",{attrs:{color:"bg-info"}},[t("h6",[o._v("Brand Info Color")])]),t("ColorTheme",{attrs:{color:"bg-light"}},[t("h6",[o._v("Brand Light Color")])]),t("ColorTheme",{attrs:{color:"bg-dark"}},[t("h6",[o._v("Brand Dark Color")])])],1)],1)],1),t("CCard",[t("CCardHeader",[t("CIcon",{attrs:{name:"cil-drop"}}),o._v(" Grays ")],1),t("CCardBody",[t("CRow",[t("ColorTheme",{attrs:{color:"bg-gray-100"}},[t("h6",[o._v("Brand 100 Color")])]),t("ColorTheme",{attrs:{color:"bg-gray-200"}},[t("h6",[o._v("Brand 200 Color")])]),t("ColorTheme",{attrs:{color:"bg-gray-300"}},[t("h6",[o._v("Brand 300 Color")])]),t("ColorTheme",{attrs:{color:"bg-gray-400"}},[t("h6",[o._v("Brand 400 Color")])]),t("ColorTheme",{attrs:{color:"bg-gray-500"}},[t("h6",[o._v("Brand 500 Color")])]),t("ColorTheme",{attrs:{color:"bg-gray-600"}},[t("h6",[o._v("Brand 600 Color")])]),t("ColorTheme",{attrs:{color:"bg-gray-700"}},[t("h6",[o._v("Brand 700 Color")])]),t("ColorTheme",{attrs:{color:"bg-gray-800"}},[t("h6",[o._v("Brand 800 Color")])]),t("ColorTheme",{attrs:{color:"bg-gray-900"}},[t("h6",[o._v("Brand 900 Color")])])],1)],1)],1)],1)},a=[],l=function(){var o=this,r=o.$createElement,t=o._self._c||r;return t("CCol",{staticClass:"mb-4",attrs:{xl:"2",md:"4",sm:"6",xs:"12"}},[t("div",{class:["theme-color w-75 rounded mb-3",o.color],style:{paddingTop:"75%"}}),o._t("default"),t("ColorView")],2)},n=[],s=function(){var o=this,r=o.$createElement,t=o._self._c||r;return t("table",{staticClass:"w-100"},[t("tbody",[t("tr",[t("td",{staticClass:"text-muted"},[o._v("HEX:")]),t("td",{staticClass:"font-weight-bold"},[o._v(o._s(this.hexColor))])]),t("tr",[t("td",{staticClass:"text-muted"},[o._v("RGB:")]),t("td",{staticClass:"font-weight-bold"},[o._v(o._s(this.bgColor))])])])])},c=[],C=function(o){if("undefined"===typeof o)throw new TypeError("Hex color is not defined");if("transparent"===o)return"#00000000";var r=o.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);if(!r)throw new Error("".concat(o," is not a valid rgb color"));var t="0".concat(parseInt(r[1],10).toString(16)),e="0".concat(parseInt(r[2],10).toString(16)),a="0".concat(parseInt(r[3],10).toString(16));return"#".concat(t.slice(-2)).concat(e.slice(-2)).concat(a.slice(-2))},d=C,i={name:"ColorView",data:function(){return{bgColor:"rgb(255, 255, 255)"}},computed:{hexColor:function(){return d(this.bgColor)}},methods:{setColor:function(){var o=this.$parent.$el.children[0],r=window.getComputedStyle(o).getPropertyValue("background-color");this.bgColor=r||this.bgColor}},mounted:function(){this.setColor()}},h=i,g=t("2877"),m=Object(g["a"])(h,s,c,!1,null,null,null),u=m.exports,b={name:"ColorTheme",components:{ColorView:u},props:{color:String}},v=b,_=Object(g["a"])(v,l,n,!1,null,null,null),p=_.exports,f={name:"Colors",components:{ColorTheme:p}},w=f,y=Object(g["a"])(w,e,a,!1,null,null,null);r["default"]=y.exports}}]);
//# sourceMappingURL=chunk-2d0aab88.77e8bec7.js.map