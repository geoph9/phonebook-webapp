(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{38:function(e,n,t){},39:function(e,n,t){"use strict";t.r(n);var r=t(14),c=t.n(r),a=t(3),o=t(1),u=t(0),i=function(e){var n=e.person,t=e.removePerson;return Object(u.jsxs)("li",{children:[n.name," ",n.number," ",Object(u.jsx)("button",{onClick:t,children:"Remove"})]})},s=function(e){var n=e.persons,t=e.filterValue,r=e.deletePerson;return Object(u.jsx)("ul",{children:n.filter((function(e){return e.name.toLowerCase().includes(t)})).map((function(e){return Object(u.jsx)(i,{person:e,removePerson:function(){return r(e.id)}},e.name)}))})},l=function(e){var n=e.text;return Object(u.jsx)("h2",{children:n})},j=function(e){var n=e.text;return Object(u.jsx)("h1",{children:n})},d=function(e){var n=e.addPerson,t=e.newName,r=e.handleNewName,c=e.newNumber,a=e.handleNewNumber;return Object(u.jsxs)("form",{onSubmit:n,children:[Object(u.jsxs)("div",{children:["name: ",Object(u.jsx)("input",{value:t,onChange:r})]}),Object(u.jsxs)("div",{children:["number: ",Object(u.jsx)("input",{value:c,onChange:a})]}),Object(u.jsx)("div",{children:Object(u.jsx)("button",{type:"submit",children:"add"})})]})},b=function(e){var n=e.message,t=e.type,r=void 0===t?"notification":t;return null===n?null:Object(u.jsx)("div",{className:r,children:n})},f=function(e){var n=e.filterValue,t=e.handleFilterNames;return Object(u.jsxs)("div",{children:["Filter shown with: ",Object(u.jsx)("input",{value:n,onChange:t})]})},h=t(4),m=t.n(h),O="/api/persons",x=function(){return m.a.get(O).then((function(e){return e.data}))},p=function(e){return m.a.post(O,e).then((function(e){return e.data}))},v=function(e){return m.a.delete("".concat(O,"/").concat(e)).then((function(e){return e.data}))},w=function(e,n){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:3e3;e(n),setTimeout((function(){e(null)}),t)},N=function(){var e=Object(o.useState)([]),n=Object(a.a)(e,2),t=n[0],r=n[1],c=Object(o.useState)(""),i=Object(a.a)(c,2),h=i[0],m=i[1],O=Object(o.useState)(""),N=Object(a.a)(O,2),g=N[0],k=N[1],y=Object(o.useState)(""),P=Object(a.a)(y,2),S=P[0],C=P[1],V=Object(o.useState)(null),D=Object(a.a)(V,2),E=D[0],F=D[1],A=Object(o.useState)(null),J=Object(a.a)(A,2),T=J[0];J[1];Object(o.useEffect)((function(){x().then((function(e){r(e)}))}),[]);return Object(u.jsxs)("div",{children:[Object(u.jsx)(j,{text:"Phonebook"}),Object(u.jsx)(b,{message:E,type:"notification"}),Object(u.jsx)(b,{message:T,type:"error"}),Object(u.jsx)(f,{filterValue:S,handleFilterNames:function(e){C(e.target.value)}}),Object(u.jsx)(l,{text:"Add a New"}),Object(u.jsx)(d,{addPerson:function(e){if(e.preventDefault(),""!==h&&""!==g){var n={name:h,number:g};p(n).then((function(e){r(t.concat(e)),m(""),k(""),C(""),w(F,"Added ".concat(n.name),3e3)}))}else alert("Expected a pair of a person's name and their phone number while only one of those were found.")},newName:h,handleNewName:function(e){m(e.target.value)},newNumber:g,handleNewNumber:function(e){k(e.target.value)}}),Object(u.jsx)(l,{text:"Numbers"}),Object(u.jsx)(s,{persons:t,filterValue:S,deletePerson:function(e){var n=t.find((function(n){return n.id===e}));!1!==window.confirm("Delete ".concat(n.name,"?"))&&(t.map((function(e){return e.name})).includes(n.name)?v(e).then((function(c){r(t.filter((function(n){return n.id!==e}))),m(""),k(""),C(""),w(F,"Deleted ".concat(n.name),3e3)})).catch((function(t){alert("The person '".concat(n.name,"' was already deleted from the server.")),r((function(n){return n.id!==e}))})):alert("".concat(h," is not a part of the phonebook")))}})]})};t(38);c.a.render(Object(u.jsx)(N,{}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.944a8023.chunk.js.map