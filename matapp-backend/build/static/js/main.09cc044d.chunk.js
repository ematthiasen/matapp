(this["webpackJsonpmatapp-frontend"]=this["webpackJsonpmatapp-frontend"]||[]).push([[0],{189:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n(45),c=n.n(r),o=n(15),i=n.n(o),s=n(22),l=n(257),u=n(258),d=n(260),j=n(261),b=n(238),p=n(249),O=n(264),f=n(20),h=n(30),x=n.n(h),m="/api/fooditems",g=null,v=function(){var e=Object(s.a)(i.a.mark((function e(t){var n,a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={headers:{Authorization:g}},console.log("config:",n),e.next=4,x.a.post(m,t,n);case 4:return a=e.sent,e.abrupt("return",a);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),E=function(){var e=Object(s.a)(i.a.mark((function e(t){var n,a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={headers:{Authorization:g}},console.log("config:",n),e.next=4,x.a.delete("".concat(m,"/").concat(t),n);case 4:return a=e.sent,e.abrupt("return",a);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),I={setToken:function(e){g="bearer ".concat(e),console.log("token set:",g)},getAll:function(){return console.log("getting all?"),x.a.get(m)},createFooditem:v,updateFooditem:function(e,t){return x.a.put("".concat(m,"/").concat(e),t)},deleteFooditem:E},y=function(e){return function(){var t=Object(s.a)(i.a.mark((function t(n){var a;return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,I.createFooditem(e);case 3:return a=t.sent,console.log("DB created fooditem: ",a.data),t.next=7,n({type:"ADD_FOODITEM",data:a.data});case 7:return t.abrupt("return",null);case 10:return t.prev=10,t.t0=t.catch(0),console.log("testing",t.t0.response.data.error),t.abrupt("return",t.t0);case 14:case"end":return t.stop()}}),t,null,[[0,10]])})));return function(e){return t.apply(this,arguments)}}()},T=function(e){return function(){var t=Object(s.a)(i.a.mark((function t(n){var a;return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,I.deleteFooditem(e);case 3:return a=t.sent,console.log("Deleted:",a),t.next=7,n({type:"DELETE_FOODITEM",data:e});case 7:return t.abrupt("return",null);case 10:return t.prev=10,t.t0=t.catch(0),t.abrupt("return",t.t0);case 13:case"end":return t.stop()}}),t,null,[[0,10]])})));return function(e){return t.apply(this,arguments)}}()},w=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"INIT_FOODITEMS":return t.data;case"ADD_FOODITEM":return e.concat(t.data);case"DELETE_FOODITEM":var n=e.filter((function(e){return e.id!==t.data}));return n;default:return e}},C=function(e){return{type:"SET_TIMER",data:{timeoutHandle:e}}},k=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_TIMER":return window.clearTimeout(e),t.data.timeoutHandle;case"CLEAR_TIMER":return clearTimeout(e),null;default:return e}},R=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:5e3;return console.log("creating notification!"),function(){var a=Object(s.a)(i.a.mark((function a(r){return i.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,r(S(e,t));case 2:return a.next=4,r(C(setTimeout((function(){r(D())}),n)));case 4:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}()},S=function(e,t){return{type:"SET_NOTIFICATION",data:{messageText:e,messageType:t}}},D=function(){return console.log("clearing!"),{type:"CLEAR_NOTIFICATION"}},A=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_NOTIFICATION":return t.data;case"CLEAR_NOTIFICATION":return null;default:return e}},N=n(1),F=function(){var e=Object(f.b)(),t=function(){var t=Object(s.a)(i.a.mark((function t(n){var a,r;return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n.preventDefault(),console.log("Adding food item",n.target.food.value),a={name:n.target.food.value,protein:n.target.protein.value,fat:n.target.fat.value,carbohydrate:n.target.carb.value},t.next=5,e(y(a));case 5:null!=(r=t.sent)&&e(R(r.response.data.error));case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return Object(N.jsx)(l.a,{item:!0,xl:4,lg:4,md:6,sm:8,xs:12,children:Object(N.jsx)(u.a,{variant:"outlined",children:Object(N.jsxs)(d.a,{children:[Object(N.jsx)(j.a,{variant:"h5",children:"Create fooditem"}),Object(N.jsx)("form",{onSubmit:t,children:Object(N.jsxs)(b.a,{direction:"column",spacing:1,children:[Object(N.jsx)(p.a,{name:"food",id:"food-name",variant:"outlined",label:"Food name"}),Object(N.jsx)(p.a,{name:"carb",type:"number",id:"carbs",variant:"outlined",label:"Carbohydrates (per 100g)"}),Object(N.jsx)(p.a,{name:"fat",type:"number",id:"fat",variant:"outlined",label:"Fat (per 100g)"}),Object(N.jsx)(p.a,{name:"protein",type:"number",id:"protein",variant:"outlined",label:"Protein (per 100g)"}),Object(N.jsx)(O.a,{variant:"contained",type:"submit",children:"Create"})]})})]})})})},_=n(31),U=n(141),P=function(e){return{type:"SET_RECIPE",data:e}},L=function(e,t){return{type:"UPDATE_INGREDIENT_AMOUNT",data:{ingredientId:e,newAmount:t}}},M=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_RECIPE":return t.data;case"ADD_INGREDIENT":var n=t.data,a=e.ingredients.concat(n);return Object(_.a)(Object(_.a)({},e),{},{ingredients:a});case"UPDATE_INGREDIENT_AMOUNT":var r=e.ingredients.find((function(e){return e.id===t.data.ingredientId})),c=Object(_.a)(Object(_.a)({},r),{},{amount:t.data.newAmount}),o=e.ingredients.map((function(e){return e.id!==c.id?e:c}));return Object(_.a)(Object(_.a)({},e),{},{ingredients:o});case"DELETE_INGREDIENT":var i=e.ingredients.filter((function(e){return e.id!==t.data.ingredientId}));return Object(_.a)(Object(_.a)({},e),{},{ingredients:i});default:return e}},z=n(19),W="/api/recipes",G=null,J={getAll:function(){return x.a.get(W)},getRecipe:function(e){return console.log("getting local recipe"),x.a.get("".concat(W,"/").concat(e))},createRecipe:function(e){var t={headers:{Authorization:G}};return x.a.post(W,e,t)},updateRecipe:function(e){var t={headers:{Authorization:G}};return x.a.put("".concat(W,"/").concat(e.id),e,t)},deleteRecipe:function(e){var t={headers:{Authorization:G}};return x.a.delete("".concat(W,"/").concat(e.id),t)},setToken:function(e){G="bearer ".concat(e),console.log("token set:",G)},addIngredientToRecipe:function(e,t){var n={headers:{Authorization:G}};return x.a.post("".concat(W,"/").concat(e.id,"/ingredients"),t,n)},updateIngredientInRecipe:function(e,t){var n={headers:{Authorization:G}};return x.a.put("".concat(W,"/").concat(e.id,"/ingredients/").concat(t.id),t,n)},deleteIngredientFromRecipe:function(e,t){console.log("we deleting now boys!");var n={headers:{Authorization:G}};return x.a.delete("".concat(W,"/").concat(e.id,"/ingredients/").concat(t),n)},updateAllIngredients:function(e,t){var n={headers:{Authorization:G}};return x.a.put("".concat(W,"/").concat(e.id,"/ingredients"),t,n)}},B=function(e){return{type:"ADD_RECIPE",data:e}},H=function(e){return{type:"DELETE_RECIPE",data:e}},V=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"INIT_RECIPES":return t.data;case"ADD_RECIPE":return e.concat(t.data);case"UPDATE_RECIPE":var n=e.find((function(e){return e.id===t.data.id}));return console.log("Updated recipe ",n),e.map((function(e){return e.id!==t.data.id?e:t.data}));case"DELETE_RECIPE":var a=e.filter((function(e){return e.id!==t.data.id}));return a;default:return e}},Y=n(10),X=n(265),q=n(266),K=n(267),Q=n(268),Z=n(247),$=n(269),ee=n(67),te=n.n(ee),ne=function(e){var t=e.recipe,n=e.handleCloneRecipe,r=e.handleShowRecipe,c=e.handleDeleteRecipe,o=Object(a.useState)(!1),i=Object(Y.a)(o,2),s=i[0],l=i[1],u=Object(a.useState)(null),d=Object(Y.a)(u,2),b=d[0],p=d[1],f=function(){p(null)};return Object(N.jsxs)(X.a,{sx:{"&:last-child td, &:last-child th":{border:0}},children:[Object(N.jsx)(q.a,{component:"th",scope:"row",children:t.title}),Object(N.jsx)(q.a,{children:t.date}),Object(N.jsx)(q.a,{align:"right",size:"small",children:Object(N.jsxs)(K.a,{children:[Object(N.jsx)(O.a,{variant:"contained",onClick:function(){return n(t)},children:"Copy"}),t.template?Object(N.jsxs)(N.Fragment,{children:[Object(N.jsx)(O.a,{variant:"outlined",children:"Edit"}),Object(N.jsx)(Q.a,{"aria-label":"delete",disabled:!0,children:Object(N.jsx)(te.a,{})})]}):Object(N.jsxs)(N.Fragment,{children:[Object(N.jsx)(O.a,{variant:"contained",onClick:function(){return r(t)},children:"Edit"}),Object(N.jsx)(Q.a,{"aria-label":"delete",color:"primary",onClick:function(e){p(e.currentTarget)},children:Object(N.jsx)(te.a,{})}),Object(N.jsx)(Z.a,{component:"div",id:"confirm-dialog",open:Boolean(b),anchorEl:b,onClose:f,anchorOrigin:{vertical:"bottom",horizontal:"left"},children:Object(N.jsxs)($.a,{sx:{alignContent:"right",p:1},children:[Object(N.jsx)(j.a,{variant:"body1",sx:{color:"inherit",p:2},children:"Really delete?"}),Object(N.jsxs)(K.a,{children:[Object(N.jsx)(O.a,{variant:"contained",color:"warning",onClick:function(){p(null),c(t)},children:"Yes"}),Object(N.jsx)(O.a,{variant:"outlined",onClick:f,children:"Cancel"})]})]})})]})]})}),Object(N.jsx)("br",{}),s?Object(N.jsxs)($.a,{children:["Really delete?",Object(N.jsx)("button",{onClick:function(){return c(t)},children:"Yes"}),Object(N.jsx)("button",{onClick:function(){return l(!1)},children:"No"})," "]}):Object(N.jsx)(N.Fragment,{})]},t.id)},ae=n(270),re=n(271),ce=n(272),oe=n(273),ie=n(259),se=["id"],le=function(){var e=Object(f.c)((function(e){return e.recipes})),t=Object(f.b)(),n=Object(z.f)(),a=function(e){console.log("handled show recipe"),t(P(e)),n.push("/recipe/".concat(e.id))},r=function(){var e=Object(s.a)(i.a.mark((function e(a){var r,c;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a.id,r=Object(U.a)(a,se),console.log("WithoutID?",r),r=Object(_.a)(Object(_.a)({},r),{},{template:!1}),(new Date).toLocaleDateString("no-no"),console.log(r.name),e.prev=5,e.next=8,J.createRecipe(r);case 8:c=e.sent,t(B(c.data)),n.push("/recipe/".concat(c.data.id)),e.next=16;break;case 13:e.prev=13,e.t0=e.catch(5),console.log("Failed to clone recipe");case 16:case"end":return e.stop()}}),e,null,[[5,13]])})));return function(t){return e.apply(this,arguments)}}(),c=function(){var e=Object(s.a)(i.a.mark((function e(n){var a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("Delete clicked for recipe: ",n.id),e.prev=1,e.next=4,J.deleteRecipe(n);case 4:a=e.sent,console.log("deleted recipe",a),t(H(n)),t(R("Recipe deleted")),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(1),401===e.t0.response.status?t(R("Could not delete recipe: Not authorized")):t(R(e.t0.response.data.error));case 13:case"end":return e.stop()}}),e,null,[[1,10]])})));return function(t){return e.apply(this,arguments)}}();return Object(N.jsx)(ae.a,{component:ie.a,children:Object(N.jsxs)(re.a,{sx:{minWidth:650},"aria-label":"simple table",children:[Object(N.jsx)(ce.a,{children:Object(N.jsxs)(X.a,{children:[Object(N.jsx)(q.a,{children:"Name"}),Object(N.jsx)(q.a,{children:"Date created"})]})}),Object(N.jsx)(oe.a,{children:e.map((function(e){return Object(N.jsx)(ne,{recipe:e,handleCloneRecipe:r,handleShowRecipe:a,handleDeleteRecipe:c},e.id)}))})]})})},ue={caloriesIn:function(e){return(9*e.fooditem.fat+4*e.fooditem.protein+4*e.fooditem.carbohydrate)*e.amount/100},calcTotalCalOf:function(e){return e.reduce((function(e,t){return e+ue.caloriesIn(t)}),0)},calcTotalCarbsOf:function(e){return e.reduce((function(e,t){return e+t.fooditem.carbohydrate*t.amount/100}),0)},calcTotalFatOf:function(e){return e.reduce((function(e,t){return e+t.fooditem.fat*t.amount/100}),0)},calcTotalProteinOf:function(e){return e.reduce((function(e,t){return e+t.fooditem.protein*t.amount/100}),0)}},de=ue,je=n(254),be=n(274),pe=n(275),Oe=n(251),fe=function(e){var t=e.ingredient,n=(e.updateAmount,Object(f.b)()),r=Object(a.useState)(t.amount),c=Object(Y.a)(r,2),o=(c[0],c[1]),i=Object(a.useState)(t.amount),s=Object(Y.a)(i,2),l=s[0],u=s[1],d=Object(a.useState)(t.amount-50<0?0:t.amount-50),p=Object(Y.a)(d,2),h=p[0],x=p[1],m=Object(a.useState)(Number(t.amount)+50),g=Object(Y.a)(m,2),v=g[0],E=g[1];return Object(N.jsxs)(je.a,{children:[Object(N.jsx)(be.a,{children:Object(N.jsxs)(b.a,{direction:"row",flexGrow:1,justifyContent:"space-between",children:[Object(N.jsx)(j.a,{sx:{display:"inline-flex"},children:t.fooditem.name}),Object(N.jsxs)(j.a,{sx:{display:"flex",color:"text.secondary"},children:[t.amount," ",t.amountUnit]})]})}),Object(N.jsx)(pe.a,{children:Object(N.jsx)($.a,{sx:{ml:2},children:Object(N.jsxs)(b.a,{direction:"row",justifyContent:"space-between",spacing:3,children:[Object(N.jsx)(Oe.a,{marks:[{value:h,label:"".concat(h," ").concat(t.amountUnit)},{value:v,label:"".concat(v," ").concat(t.amountUnit)}],min:h,max:v,value:l,onChange:function(e){o(e.target.value),u(e.target.value),e.target.value===h?(x(e.target.value-10<0?0:e.target.value-10),E(h+100)):e.target.value===v&&(E(v+10),x(h+10)),n(L(t.id,e.target.value))}}),Object(N.jsx)(O.a,{variant:"outlined",onClick:function(){console.log("attempt to delete ingredient",t),n({type:"DELETE_INGREDIENT",data:{ingredientId:t.id}})},children:Object(N.jsx)(te.a,{})})]})})})]})},he=n(239),xe=n(133),me=n.n(xe),ge=n(132),ve=n.n(ge),Ee=n(263),Ie=n(250),ye=n(253),Te=n(255),we=function(){var e=Object(f.c)((function(e){return e.fooditems})),t=Object(f.b)(),n=Object(a.useState)(null),r=Object(Y.a)(n,2),c=r[0],o=r[1],i=(e.map((function(e){return{value:e.id,label:e.name}})),e.map((function(e){return{label:e.name,id:e.id}})));return Object(N.jsx)(N.Fragment,{children:Object(N.jsx)(l.a,{item:!0,xl:4,lg:4,md:6,sm:8,xs:12,children:Object(N.jsx)(u.a,{variant:"outlined",children:Object(N.jsxs)(d.a,{children:[Object(N.jsx)(j.a,{variant:"h5",children:"Add Ingredient"}),Object(N.jsx)("form",{onSubmit:function(e){if(e.preventDefault(),e.target.fooditem.value){console.log("fooditem",c),console.log("amount",e.target.amount.value),console.log("amountUnit",e.target.amountUnit.value);var n,a={fooditemId:c.id,amount:e.target.amount.value,amountUnit:e.target.amountUnit.value};e.target.amount.value="",e.target.amountUnit.value="g",console.log("new ingredient",a),t((n=a,console.log("Ingredient: ",n),{type:"ADD_INGREDIENT",data:Object(_.a)(Object(_.a)({},n),{},{id:Math.floor(1e4*Math.random())})}))}else window.alert("Please select a food from the menu")},children:Object(N.jsxs)(Ee.a,{children:[Object(N.jsx)(Ie.a,{disablePortal:!0,id:"fooditemAutocomplete",options:i,onChange:function(e,t){return o(t)},renderInput:function(e){return Object(N.jsx)(p.a,Object(_.a)(Object(_.a)({},e),{},{name:"fooditem"}))}}),Object(N.jsx)(p.a,{id:"amount",label:"amount",type:"number"}),Object(N.jsxs)(ye.a,{name:"amountUnit",children:[Object(N.jsx)(Te.a,{value:"g",children:"gram (g)"}),Object(N.jsx)(Te.a,{value:"ml",children:"milliliter (ml)"}),Object(N.jsx)(Te.a,{value:"tbsp",children:"tablespoon (tbsp)"}),Object(N.jsx)(Te.a,{value:"tsp",children:"teaspoon (tsp)"})]}),Object(N.jsx)(O.a,{type:"submit",variant:"contained",children:"Add"})]})})]})})})})},Ce=function(){var e=Object(f.c)((function(e){return e.activeRecipe})),t=Object(f.c)((function(e){return e.fooditems})),n=Object(f.b)(),r=Object(z.f)(),c=Object(a.useState)(1),o=Object(Y.a)(c,2),p=o[0],h=o[1],x=null,m=Object(z.g)().id;if(Object(a.useEffect)((function(){var e=window.localStorage.getItem("savedRecipe".concat(m));if(e){console.log("found save:",JSON.parse(e));var t=JSON.parse(e);console.log(t),n(P(t.activeRecipe))}else J.getRecipe(m).then((function(e){n(P(e.data))}))}),[]),!e)return Object(N.jsx)("p",{children:"Waiting for activeRecipe to be set"});if(0===t.length)return Object(N.jsx)("p",{children:"Waiting for foodItems"});console.log("Fooditems currently: ",t),x||(x=e.ingredients.map((function(e){var n=t.find((function(t){return t.id===e.fooditemId}));return void 0===n?(console.log("Fooditem in recipe not found in fooditem list"),{fooditem:{name:"<Deleted fooditem>",protein:0,fat:0,carbohydrate:0,id:0},amount:0,amountUnit:"g",id:e.id}):(console.log("found fooditem",n),e.fooditem=n,e)}))),console.log("ingredients:",x);var g=function(e,t){console.log("Want to save these changes: ",e,t)},v=function(){var t={activeRecipe:e,ingredients:x};console.log("saving following ingredients:",x),window.localStorage.setItem("savedRecipe".concat(m),JSON.stringify(t))},E=function(){var t=Object(s.a)(i.a.mark((function t(){var a;return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return v(),t.next=3,J.updateAllIngredients(e,x);case 3:a=t.sent,console.log("response return data",a.data),n(P(a.data));case 6:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return Object(N.jsxs)(N.Fragment,{children:[Object(N.jsxs)(l.a,{item:!0,xs:12,children:[Object(N.jsx)(j.a,{variant:"h4",sx:{m:2},children:e.title}),Object(N.jsxs)(b.a,{direction:"row",spacing:1,children:[Object(N.jsx)(O.a,{variant:"contained",startIcon:Object(N.jsx)(ve.a,{}),onClick:E,children:"Server"}),Object(N.jsx)(O.a,{variant:"outlined",startIcon:Object(N.jsx)(me.a,{}),onClick:v,children:"Local"}),Object(N.jsx)(O.a,{variant:"outlined",startIcon:Object(N.jsx)(te.a,{}),onClick:function(){window.localStorage.removeItem("savedRecipe".concat(m)),r.push("/")},children:"Discard changes"})]})]}),Object(N.jsx)(l.a,{item:!0,xl:4,lg:4,md:6,sm:8,xs:12,children:Object(N.jsxs)(u.a,{variant:"outlined",sx:{gridRow:"1",gridColumn:"span 2"},children:[Object(N.jsx)(d.a,{children:Object(N.jsx)(j.a,{variant:"h5",children:"Ingredients"})}),Object(N.jsx)(d.a,{children:x.map((function(e){return Object(N.jsx)(fe,{ingredient:e,updateAmount:g},e.id)}))})]})}),Object(N.jsx)(we,{}),Object(N.jsx)(l.a,{item:!0,xl:4,lg:4,md:6,sm:8,xs:12,children:Object(N.jsx)(u.a,{variant:"outlined",sx:{},children:Object(N.jsxs)(d.a,{children:[Object(N.jsx)(j.a,{variant:"h5",children:"Nutritional information"}),Object(N.jsxs)(re.a,{children:[Object(N.jsx)(ce.a,{children:Object(N.jsxs)(X.a,{children:[Object(N.jsx)(q.a,{children:"X"}),Object(N.jsx)(q.a,{children:"Total"}),Object(N.jsx)(q.a,{children:"Per serving"})]})}),Object(N.jsxs)(oe.a,{children:[Object(N.jsxs)(X.a,{children:[Object(N.jsx)(q.a,{children:"Calories"}),Object(N.jsx)(q.a,{children:de.calcTotalCalOf(x)}),Object(N.jsxs)(q.a,{children:[(de.calcTotalCalOf(x)/p).toFixed(0)," kcal"]})]}),Object(N.jsxs)(X.a,{children:[Object(N.jsx)(q.a,{children:"Carbs"}),Object(N.jsx)(q.a,{children:de.calcTotalCarbsOf(x)}),Object(N.jsxs)(q.a,{children:[(de.calcTotalCarbsOf(x)/p).toFixed(0)," g"]})]}),Object(N.jsxs)(X.a,{children:[Object(N.jsx)(q.a,{children:"Fat"}),Object(N.jsx)(q.a,{children:de.calcTotalFatOf(x)}),Object(N.jsxs)(q.a,{children:[(de.calcTotalFatOf(x)/p).toFixed(0)," g"]})]}),Object(N.jsxs)(X.a,{children:[Object(N.jsx)(q.a,{children:"Protein"}),Object(N.jsxs)(q.a,{children:[de.calcTotalProteinOf(x)," g"]}),Object(N.jsxs)(q.a,{children:[(de.calcTotalProteinOf(x)/p).toFixed(0)," g"]})]})]})]}),Object(N.jsxs)(j.a,{variant:"body1",children:["Number of servings: "," ",Object(N.jsx)(he.a,{value:p,onChange:function(e){return h(e.target.value)},inputProps:{step:1,min:1,max:100,type:"number"},sx:{maxWidth:42}})]})]})})})]})},ke=n(134),Re=n.n(ke),Se=function(){var e=Object(f.c)((function(e){return e.fooditems})),t=Object(f.b)(),n=function(){var e=Object(s.a)(i.a.mark((function e(n){var a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t(T(n));case 2:(a=e.sent)?(console.log("received error: ",a.response.data.error),t(R(a.message+" - "+a.response.data.error,"error"))):console.log("retrnvalue null, success!");case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(N.jsx)(l.a,{container:!0,spacing:2,flexWrap:"wrap",justifyContent:"flex-start",children:Object(N.jsxs)(l.a,{item:!0,xl:6,lg:8,md:10,sm:12,children:[Object(N.jsx)(j.a,{variant:"h4",sx:{m:2},children:"Fooditems"}),Object(N.jsx)(u.a,{children:Object(N.jsx)(d.a,{children:Object(N.jsxs)(re.a,{children:[Object(N.jsx)(ce.a,{children:Object(N.jsxs)(X.a,{children:[Object(N.jsx)(q.a,{children:"Name"}),Object(N.jsx)(q.a,{children:"Protein"}),Object(N.jsx)(q.a,{children:"Carbs"}),Object(N.jsx)(q.a,{children:"Fat"}),Object(N.jsx)(q.a,{children:"Actions"})]})}),Object(N.jsx)(oe.a,{children:e.map((function(e){return Object(N.jsxs)(X.a,{children:[Object(N.jsx)(q.a,{children:e.name}),Object(N.jsx)(q.a,{children:e.protein}),Object(N.jsx)(q.a,{children:e.carbohydrate}),Object(N.jsx)(q.a,{children:e.fat}),Object(N.jsx)(q.a,{children:Object(N.jsx)(O.a,{variant:"outlined",onClick:function(){return n(e.id)},children:Object(N.jsx)(Re.a,{})})})]},e.id)}))})]})})})]})})},De=n(252),Ae=function(){var e=Object(f.c)((function(e){return e.notification}));return e?Object(N.jsx)(De.a,{severity:"warning",children:e.messageText}):null},Ne=function(e){return{type:"SET_ACTIVE_USER",data:e}},Fe=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_ACTIVE_USER":return t.data;case"CLEAR_ACTIVE_USER":return null;default:return e}},_e=n(276),Ue=n(277),Pe=n(140),Le=n(278),Me=n(135),ze=n.n(Me),We=n(136),Ge=n.n(We),Je=n(116),Be=n.n(Je),He=n(60),Ve=function(){var e=Object(s.a)(i.a.mark((function e(t){var n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x.a.post("/api/login",t);case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Ye={loginUser:Ve};function Xe(e){var t=e.logout,n=Object(a.useState)(null),r=Object(Y.a)(n,2),c=r[0],o=r[1],l=Object(a.useState)(null),u=Object(Y.a)(l,2),d=u[0],b=u[1],h=Object(a.useState)(null),x=Object(Y.a)(h,2),m=x[0],g=x[1],v=Object(f.c)((function(e){return e.loggedInUser})),E=Object(a.useState)(""),y=Object(Y.a)(E,2),T=y[0],w=y[1],C=Object(a.useState)(""),k=Object(Y.a)(C,2),R=k[0],S=k[1],D=Object(a.useState)(null),A=Object(Y.a)(D,2),F=A[0],_=A[1],U=Object(f.b)(),P=function(){o(null)},L=function(){g(null),w(""),S("")},M=function(){b(null)},z=function(){var e=Object(s.a)(i.a.mark((function e(t){var n,a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),console.log(T),console.log(R),e.prev=3,n={username:T,password:R},e.next=7,Ye.loginUser(n);case 7:a=e.sent,console.log("token",a),U(Ne(a)),window.localStorage.setItem("MatappSavedLocalUser",JSON.stringify(a)),I.setToken(a.token),J.setToken(a.token),L(),e.next=20;break;case 16:e.prev=16,e.t0=e.catch(3),console.log(e.t0.response.data.error),_(e.t0.response.data.error);case 20:console.log("submitted!");case 21:case"end":return e.stop()}}),e,null,[[3,16]])})));return function(t){return e.apply(this,arguments)}}(),W=function(){var e=Object(s.a)(i.a.mark((function e(t){var n,a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,n={username:"guest",password:"guest"},e.next=5,Ye.loginUser(n);case 5:a=e.sent,U(Ne(a)),window.localStorage.setItem("MatappSavedLocalUser",JSON.stringify(a)),I.setToken(a.token),J.setToken(a.token),L(),e.next=17;break;case 13:e.prev=13,e.t0=e.catch(1),console.log(e.t0.response.data.error),_(e.t0.response.data.error);case 17:console.log("submitted!");case 18:case"end":return e.stop()}}),e,null,[[1,13]])})));return function(t){return e.apply(this,arguments)}}();return Object(N.jsx)("div",{children:Object(N.jsx)(_e.a,{position:"static",children:Object(N.jsxs)(Ue.a,{children:[Object(N.jsx)(Be.a,{sx:{display:{xs:"none",md:"flex"},mr:1}}),Object(N.jsx)(j.a,{variant:"h6",noWrap:!0,component:"div",sx:{mr:2,display:{xs:"none",md:"flex"},color:"inherit"},children:"RECIPES"}),Object(N.jsxs)($.a,{sx:{flexgrow:1,display:{xs:"flex",md:"none"}},children:[Object(N.jsx)(Q.a,{size:"medium",edge:"start",color:"inherit","aria-label":"menu",onClick:function(e){b(e.currentTarget)},sx:{mr:2},children:Object(N.jsx)(ze.a,{})}),Object(N.jsxs)(Pe.a,{id:"menu-navigation",anchorEl:d,anchorOrigin:{vertical:"top",horizontal:"left"},keepMounted:!0,transformOrigin:{vertical:"top",horizontal:"left"},open:Boolean(d),onClose:M,sx:{display:{xs:"block",md:"none"}},children:[Object(N.jsx)(Te.a,{onClick:M,children:Object(N.jsx)(j.a,{textAlign:"center",component:He.b,to:"/",color:"inherit",textDecoration:"none",children:"Home"})}),Object(N.jsx)(Te.a,{onClick:M,children:Object(N.jsx)(j.a,{textAlign:"center",component:He.b,to:"/fooditems/",color:"inherit",textDecoration:"none",children:"Fooditems"})})]})]}),Object(N.jsx)(Be.a,{sx:{display:{xs:"flex",md:"none"},mr:1}}),Object(N.jsx)(j.a,{variant:"h6",noWrap:!0,component:"div",href:"/",sx:{mr:2,display:{xs:"flex",md:"none"},flexGrow:1,color:"inherit",textDecoration:"none"},children:"RECIPES"}),Object(N.jsxs)($.a,{sx:{flexGrow:1,display:{xs:"none",md:"flex"}},children:[Object(N.jsx)(O.a,{onClick:M,component:He.b,to:"/",sx:{my:2,color:"inherit",display:"block"},children:"Home"}),Object(N.jsx)(O.a,{onClick:M,component:He.b,to:"/fooditems/",sx:{my:2,color:"inherit",display:"block"},children:"Fooditems"})]}),Object(N.jsx)($.a,{sx:{flexGrow:1}}),v?Object(N.jsxs)($.a,{sx:{display:{xs:"flex",md:"flex"}},children:[Object(N.jsx)(j.a,{variant:"subtitle1",noWrap:!0,sx:{mr:2,display:{xs:"none",md:"flex"},alignItems:"center",color:"inherit",textDecoration:"none"},children:v.username}),Object(N.jsx)(Le.a,{title:"Open user menu",children:Object(N.jsx)(Q.a,{size:"large",onClick:function(e){console.log(e.currentTarget),o(e.currentTarget)},"aria-label":"test menu","aria-controls":"menu-appbar","aria-haspopup":"true",color:"inherit",children:Object(N.jsx)(Ge.a,{})})}),Object(N.jsxs)(Pe.a,{id:"menu-appbar",anchorEl:c,anchorOrigin:{vertical:"top",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"right"},keepMounted:!0,open:Boolean(c),onClose:P,children:[Object(N.jsx)(Te.a,{onClick:function(){t(),o(null)},children:"Logout"}),Object(N.jsx)(Te.a,{onClick:P,children:"Test2"})]})]}):Object(N.jsxs)($.a,{children:[Object(N.jsx)(O.a,{variant:"RouterLink",noWrap:!0,onClick:function(e){g(e.currentTarget)},sx:{mr:2,display:{xs:"flex",md:"flex"},alignItems:"center",color:"inherit",textDecoration:"none"},children:"Login"}),Object(N.jsxs)(Z.a,{component:"form",onSubmit:z,id:"login-menu",open:Boolean(m),anchorEl:m,onClose:L,anchorOrigin:{vertical:"bottom",horizontal:"left"},children:[Object(N.jsx)($.a,{sx:{alignContent:"right"},children:Object(N.jsx)(j.a,{variant:"h6",sx:{color:"inherit",p:2},children:"Login"})}),Object(N.jsxs)($.a,{sx:{px:2,py:1},children:[Object(N.jsx)(p.a,{fullWidth:!0,value:T,onChange:function(e){return w(e.target.value)},controlId:"formUsername",id:"username",label:"username",variant:"filled"}),Object(N.jsx)("br",{})]}),Object(N.jsx)($.a,{sx:{px:2,py:1},children:Object(N.jsx)(p.a,{fullWidth:!0,value:R,onChange:function(e){return S(e.target.value)},id:"password",label:"password",variant:"filled",type:"password"})}),F?Object(N.jsx)(De.a,{severity:"warning",onClose:function(){return _(null)},children:F}):Object(N.jsx)(N.Fragment,{}),Object(N.jsxs)($.a,{sx:{p:2},children:[Object(N.jsx)(O.a,{variant:"contained",onClick:z,type:"submit",children:"Login"})," ",Object(N.jsx)(O.a,{onClick:L,variant:"contained",children:"Close"})," ",Object(N.jsx)(O.a,{variant:"outlined",onClick:W,children:"Login as guest"})]})]})]})]})})})}var qe=n(256),Ke=n(139);var Qe=function(){var e=Object(f.b)();Object(a.useEffect)((function(){var t=window.localStorage.getItem("MatappSavedLocalUser");if(t){var n=JSON.parse(t);e(Ne(n)),J.setToken(n.token),I.setToken(n.token)}}),[]),Object(a.useEffect)((function(){J.getAll().then((function(t){e({type:"INIT_RECIPES",data:t.data})}))}),[e]),Object(a.useEffect)((function(){I.getAll().then((function(t){e({type:"INIT_FOODITEMS",data:t.data})}))}),[e]);var t=Object(Ke.a)({palette:{primary:{light:"#4c8c4a",main:"#1a8145",dark:"#003300",contrastText:"#ffffff"},secondary:{light:"#8d4887",main:"#5e1b5a",dark:"#320030",contrastText:"#ffffff"}}});return Object(N.jsx)("div",{children:Object(N.jsxs)(qe.a,{theme:t,children:[Object(N.jsx)(Xe,{logout:function(){console.log("logout!"),window.localStorage.removeItem("MatappSavedLocalUser"),e({type:"CLEAR_ACTIVE_USER"}),I.setToken(null),J.setToken(null)}}),Object(N.jsx)(Ae,{}),Object(N.jsxs)(z.c,{children:[Object(N.jsx)(z.a,{path:"/recipe/:id",children:Object(N.jsxs)(l.a,{container:!0,spacing:2,flexWrap:"wrap",justifyContent:"flex-start",children:[Object(N.jsx)(Ce,{}),Object(N.jsx)(F,{})]})}),Object(N.jsx)(z.a,{path:"/recipe/",children:Object(N.jsx)(le,{})}),Object(N.jsx)(z.a,{path:"/fooditems/",children:Object(N.jsxs)("div",{className:"column",children:[Object(N.jsx)(Se,{}),Object(N.jsx)(F,{})]})}),Object(N.jsx)(z.a,{path:"/",children:Object(N.jsx)(le,{})})]})]})})},Ze=n(81),$e=n(137),et=n(138),tt=Object(Ze.combineReducers)({fooditems:w,recipes:V,activeRecipe:M,loggedInUser:Fe,notification:A,timer:k}),nt=Object(Ze.createStore)(tt,Object($e.composeWithDevTools)(Object(Ze.applyMiddleware)(et.a)));c.a.render(Object(N.jsx)(He.a,{children:Object(N.jsx)(f.a,{store:nt,children:Object(N.jsx)(Qe,{})})}),document.getElementById("root"))}},[[189,1,2]]]);
//# sourceMappingURL=main.09cc044d.chunk.js.map