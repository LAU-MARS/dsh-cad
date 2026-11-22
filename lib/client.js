window.__ModuleLoader__.load({
  id: "dsh-cad",
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
"use strict";var Ap=Object.create;var lo=Object.defineProperty;var Cp=Object.getOwnPropertyDescriptor;var Rp=Object.getOwnPropertyNames;var Pp=Object.getPrototypeOf,Ip=Object.prototype.hasOwnProperty;var Dp=(i,e)=>{for(var t in e)lo(i,t,{get:e[t],enumerable:!0})},_h=(i,e,t,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of Rp(e))!Ip.call(i,s)&&s!==t&&lo(i,s,{get:()=>e[s],enumerable:!(n=Cp(e,s))||n.enumerable});return i};var Xn=(i,e,t)=>(t=i!=null?Ap(Pp(i)):{},_h(e||!i||!i.__esModule?lo(t,"default",{value:i,enumerable:!0}):t,i)),Lp=i=>_h(lo({},"__esModule",{value:!0}),i);var Ab={};Dp(Ab,{apply:()=>Tb,inject:()=>wb});module.exports=Lp(Ab);var ch=Xn(require("react"),1);var Ys=Xn(require("react"),1);var Bt=Xn(require("react"),1),pt=require("react");var Mi={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},wi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},iu=0,Hc=1,su=2;var Br=1,ru=2,Us=3,jn=0,jt=1,un=2,kn=0,Gi=1,Vc=2,Gc=3,Wc=4,ou=5;var fi=100,au=101,lu=102,cu=103,du=104,hu=200,uu=201,fu=202,pu=203,Go=204,Wo=205,mu=206,gu=207,xu=208,yu=209,_u=210,vu=211,bu=212,Su=213,Mu=214,Xo=0,qo=1,Yo=2,Wi=3,$o=4,Zo=5,Jo=6,Ko=7,Xc=0,wu=1,Eu=2,An=0,qc=1,Yc=2,$c=3,Zc=4,Jc=5,Kc=6,jc=7;var Qc=300,Ei=301,$i=302,Da=303,La=304,kr=306,jo=1e3,Fn=1001,Qo=1002,Ht=1003,Tu=1004;var zr=1005;var Gt=1006,Na=1007;var Ti=1008;var en=1009,ed=1010,td=1011,Fs=1012,Ua=1013,Cn=1014,Rn=1015,zn=1016,Fa=1017,Oa=1018,Os=1020,nd=35902,id=35899,sd=1021,rd=1022,yn=1023,Bn=1026,Ai=1027,od=1028,Ba=1029,Ci=1030,ka=1031;var za=1033,Hr=33776,Vr=33777,Gr=33778,Wr=33779,Ha=35840,Va=35841,Ga=35842,Wa=35843,Xa=36196,qa=37492,Ya=37496,$a=37488,Za=37489,Xr=37490,Ja=37491,Ka=37808,ja=37809,Qa=37810,el=37811,tl=37812,nl=37813,il=37814,sl=37815,rl=37816,ol=37817,al=37818,ll=37819,cl=37820,dl=37821,hl=36492,ul=36494,fl=36495,pl=36283,ml=36284,qr=36285,gl=36286;var cr=2300,ea=2301,Vo=2302,Tc=2303,Ac=2400,Cc=2401,Rc=2402;var Au=3200;var xl=0,Cu=1,ni="",an="srgb",dr="srgb-linear",hr="linear",dt="srgb";var zi=7680;var Pc=519,Ru=512,Pu=513,Iu=514,yl=515,Du=516,Lu=517,_l=518,Nu=519,ta=35044;var ad="300 es",Mn=2e3,vs=2001;function Np(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Up(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function ur(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Uu(){let i=ur("canvas");return i.style.display="block",i}var vh={},bs=null;function fr(...i){let e="THREE."+i.shift();bs?bs("log",e,...i):console.log(e,...i)}function Fu(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function He(...i){i=Fu(i);let e="THREE."+i.shift();if(bs)bs("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function Xe(...i){i=Fu(i);let e="THREE."+i.shift();if(bs)bs("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Vi(...i){let e=i.join(" ");e in vh||(vh[e]=!0,He(...i))}function Ou(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var Bu={[Xo]:qo,[Yo]:Jo,[$o]:Ko,[Wi]:Zo,[qo]:Xo,[Jo]:Yo,[Ko]:$o,[Zo]:Wi},wn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let s=n[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}},qt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],bh=1234567,ys=Math.PI/180,Ss=180/Math.PI;function On(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(qt[i&255]+qt[i>>8&255]+qt[i>>16&255]+qt[i>>24&255]+"-"+qt[e&255]+qt[e>>8&255]+"-"+qt[e>>16&15|64]+qt[e>>24&255]+"-"+qt[t&63|128]+qt[t>>8&255]+"-"+qt[t>>16&255]+qt[t>>24&255]+qt[n&255]+qt[n>>8&255]+qt[n>>16&255]+qt[n>>24&255]).toLowerCase()}function nt(i,e,t){return Math.max(e,Math.min(t,i))}function ld(i,e){return(i%e+e)%e}function Fp(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function Op(i,e,t){return i!==e?(t-i)/(e-i):0}function or(i,e,t){return(1-t)*i+t*e}function Bp(i,e,t,n){return or(i,e,1-Math.exp(-t*n))}function kp(i,e=1){return e-Math.abs(ld(i,e*2)-e)}function zp(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Hp(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Vp(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Gp(i,e){return i+Math.random()*(e-i)}function Wp(i){return i*(.5-Math.random())}function Xp(i){i!==void 0&&(bh=i);let e=bh+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function qp(i){return i*ys}function Yp(i){return i*Ss}function $p(i){return(i&i-1)===0&&i!==0}function Zp(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Jp(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Kp(i,e,t,n,s){let r=Math.cos,o=Math.sin,a=r(t/2),l=o(t/2),c=r((e+n)/2),d=o((e+n)/2),u=r((e-n)/2),h=o((e-n)/2),f=r((n-e)/2),g=o((n-e)/2);switch(s){case"XYX":i.set(a*d,l*u,l*h,a*c);break;case"YZY":i.set(l*h,a*d,l*u,a*c);break;case"ZXZ":i.set(l*u,l*h,a*d,a*c);break;case"XZX":i.set(a*d,l*g,l*f,a*c);break;case"YXY":i.set(l*f,a*d,l*g,a*c);break;case"ZYZ":i.set(l*g,l*f,a*d,a*c);break;default:He("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Sn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function ut(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var cd={DEG2RAD:ys,RAD2DEG:Ss,generateUUID:On,clamp:nt,euclideanModulo:ld,mapLinear:Fp,inverseLerp:Op,lerp:or,damp:Bp,pingpong:kp,smoothstep:zp,smootherstep:Hp,randInt:Vp,randFloat:Gp,randFloatSpread:Wp,seededRandom:Xp,degToRad:qp,radToDeg:Yp,isPowerOfTwo:$p,ceilPowerOfTwo:Zp,floorPowerOfTwo:Jp,setQuaternionFromProperEuler:Kp,normalize:ut,denormalize:Sn},le=class i{static{i.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=nt(this.x,e.x,t.x),this.y=nt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=nt(this.x,e,t),this.y=nt(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(nt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(nt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Wt=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let l=n[s+0],c=n[s+1],d=n[s+2],u=n[s+3],h=r[o+0],f=r[o+1],g=r[o+2],v=r[o+3];if(u!==v||l!==h||c!==f||d!==g){let p=l*h+c*f+d*g+u*v;p<0&&(h=-h,f=-f,g=-g,v=-v,p=-p);let m=1-a;if(p<.9995){let A=Math.acos(p),w=Math.sin(A);m=Math.sin(m*A)/w,a=Math.sin(a*A)/w,l=l*m+h*a,c=c*m+f*a,d=d*m+g*a,u=u*m+v*a}else{l=l*m+h*a,c=c*m+f*a,d=d*m+g*a,u=u*m+v*a;let A=1/Math.sqrt(l*l+c*c+d*d+u*u);l*=A,c*=A,d*=A,u*=A}}e[t]=l,e[t+1]=c,e[t+2]=d,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,o){let a=n[s],l=n[s+1],c=n[s+2],d=n[s+3],u=r[o],h=r[o+1],f=r[o+2],g=r[o+3];return e[t]=a*g+d*u+l*f-c*h,e[t+1]=l*g+d*h+c*u-a*f,e[t+2]=c*g+d*f+a*h-l*u,e[t+3]=d*g-a*u-l*h-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),d=a(s/2),u=a(r/2),h=l(n/2),f=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=h*d*u+c*f*g,this._y=c*f*u-h*d*g,this._z=c*d*g+h*f*u,this._w=c*d*u-h*f*g;break;case"YXZ":this._x=h*d*u+c*f*g,this._y=c*f*u-h*d*g,this._z=c*d*g-h*f*u,this._w=c*d*u+h*f*g;break;case"ZXY":this._x=h*d*u-c*f*g,this._y=c*f*u+h*d*g,this._z=c*d*g+h*f*u,this._w=c*d*u-h*f*g;break;case"ZYX":this._x=h*d*u-c*f*g,this._y=c*f*u+h*d*g,this._z=c*d*g-h*f*u,this._w=c*d*u+h*f*g;break;case"YZX":this._x=h*d*u+c*f*g,this._y=c*f*u+h*d*g,this._z=c*d*g-h*f*u,this._w=c*d*u-h*f*g;break;case"XZY":this._x=h*d*u-c*f*g,this._y=c*f*u-h*d*g,this._z=c*d*g+h*f*u,this._w=c*d*u+h*f*g;break;default:He("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],d=t[6],u=t[10],h=n+a+u;if(h>0){let f=.5/Math.sqrt(h+1);this._w=.25/f,this._x=(d-l)*f,this._y=(r-c)*f,this._z=(o-s)*f}else if(n>a&&n>u){let f=2*Math.sqrt(1+n-a-u);this._w=(d-l)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+c)/f}else if(a>u){let f=2*Math.sqrt(1+a-n-u);this._w=(r-c)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(l+d)/f}else{let f=2*Math.sqrt(1+u-n-a);this._w=(o-s)/f,this._x=(r+c)/f,this._y=(l+d)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(nt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,d=t._w;return this._x=n*d+o*a+s*c-r*l,this._y=s*d+o*l+r*a-n*c,this._z=r*d+o*c+n*l-s*a,this._w=o*d-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,o=e._w,a=this.dot(e);a<0&&(n=-n,s=-s,r=-r,o=-o,a=-a);let l=1-t;if(a<.9995){let c=Math.acos(a),d=Math.sin(c);l=Math.sin(l*c)/d,t=Math.sin(t*c)/d,this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+o*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+o*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},I=class i{static{i.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Sh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Sh.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*s-a*n),d=2*(a*t-r*s),u=2*(r*n-o*t);return this.x=t+l*c+o*u-a*d,this.y=n+l*d+a*c-r*u,this.z=s+l*u+r*d-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=nt(this.x,e.x,t.x),this.y=nt(this.y,e.y,t.y),this.z=nt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=nt(this.x,e,t),this.y=nt(this.y,e,t),this.z=nt(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(nt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return jl.copy(this).projectOnVector(e),this.sub(jl)}reflect(e){return this.sub(jl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(nt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},jl=new I,Sh=new Wt,Ke=class i{static{i.prototype.isMatrix3=!0}constructor(e,t,n,s,r,o,a,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,l,c)}set(e,t,n,s,r,o,a,l,c){let d=this.elements;return d[0]=e,d[1]=s,d[2]=a,d[3]=t,d[4]=r,d[5]=l,d[6]=n,d[7]=o,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],d=n[4],u=n[7],h=n[2],f=n[5],g=n[8],v=s[0],p=s[3],m=s[6],A=s[1],w=s[4],y=s[7],M=s[2],b=s[5],R=s[8];return r[0]=o*v+a*A+l*M,r[3]=o*p+a*w+l*b,r[6]=o*m+a*y+l*R,r[1]=c*v+d*A+u*M,r[4]=c*p+d*w+u*b,r[7]=c*m+d*y+u*R,r[2]=h*v+f*A+g*M,r[5]=h*p+f*w+g*b,r[8]=h*m+f*y+g*R,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],d=e[8];return t*o*d-t*a*c-n*r*d+n*a*l+s*r*c-s*o*l}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],d=e[8],u=d*o-a*c,h=a*l-d*r,f=c*r-o*l,g=t*u+n*h+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let v=1/g;return e[0]=u*v,e[1]=(s*c-d*n)*v,e[2]=(a*n-s*o)*v,e[3]=h*v,e[4]=(d*t-s*l)*v,e[5]=(s*r-a*t)*v,e[6]=f*v,e[7]=(n*l-c*t)*v,e[8]=(o*t-n*r)*v,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-s*c,s*l,-s*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return Vi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Ql.makeScale(e,t)),this}rotate(e){return Vi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Ql.makeRotation(-e)),this}translate(e,t){return Vi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Ql.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Ql=new Ke,Mh=new Ke().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),wh=new Ke().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function jp(){let i={enabled:!0,workingColorSpace:dr,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===dt&&(s.r=Kn(s.r),s.g=Kn(s.g),s.b=Kn(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===dt&&(s.r=_s(s.r),s.g=_s(s.g),s.b=_s(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ni?hr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Vi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Vi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[dr]:{primaries:e,whitePoint:n,transfer:hr,toXYZ:Mh,fromXYZ:wh,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:an},outputColorSpaceConfig:{drawingBufferColorSpace:an}},[an]:{primaries:e,whitePoint:n,transfer:dt,toXYZ:Mh,fromXYZ:wh,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:an}}}),i}var ot=jp();function Kn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function _s(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var ns,na=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{ns===void 0&&(ns=ur("canvas")),ns.width=e.width,ns.height=e.height;let s=ns.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=ns}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=ur("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Kn(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Kn(t[n]/255)*255):t[n]=Kn(t[n]);return{data:t,width:e.width,height:e.height}}else return He("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Qp=0,Ms=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Qp++}),this.uuid=On(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(ec(s[o].image)):r.push(ec(s[o]))}else r=ec(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function ec(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?na.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(He("Texture: Unable to serialize Texture."),{})}var em=0,tc=new I,Kt=class i extends wn{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=Fn,s=Fn,r=Gt,o=Ti,a=yn,l=en,c=i.DEFAULT_ANISOTROPY,d=ni){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:em++}),this.uuid=On(),this.name="",this.source=new Ms(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new le(0,0),this.repeat=new le(1,1),this.center=new le(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(tc).x}get height(){return this.source.getSize(tc).y}get depth(){return this.source.getSize(tc).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){He(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){He(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Qc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case jo:e.x=e.x-Math.floor(e.x);break;case Fn:e.x=e.x<0?0:1;break;case Qo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case jo:e.y=e.y-Math.floor(e.y);break;case Fn:e.y=e.y<0?0:1;break;case Qo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Kt.DEFAULT_IMAGE=null;Kt.DEFAULT_MAPPING=Qc;Kt.DEFAULT_ANISOTROPY=1;var Mt=class i{static{i.prototype.isVector4=!0}constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,l=e.elements,c=l[0],d=l[4],u=l[8],h=l[1],f=l[5],g=l[9],v=l[2],p=l[6],m=l[10];if(Math.abs(d-h)<.01&&Math.abs(u-v)<.01&&Math.abs(g-p)<.01){if(Math.abs(d+h)<.1&&Math.abs(u+v)<.1&&Math.abs(g+p)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let w=(c+1)/2,y=(f+1)/2,M=(m+1)/2,b=(d+h)/4,R=(u+v)/4,x=(g+p)/4;return w>y&&w>M?w<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(w),s=b/n,r=R/n):y>M?y<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),n=b/s,r=x/s):M<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(M),n=R/r,s=x/r),this.set(n,s,r,t),this}let A=Math.sqrt((p-g)*(p-g)+(u-v)*(u-v)+(h-d)*(h-d));return Math.abs(A)<.001&&(A=1),this.x=(p-g)/A,this.y=(u-v)/A,this.z=(h-d)/A,this.w=Math.acos((c+f+m-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=nt(this.x,e.x,t.x),this.y=nt(this.y,e.y,t.y),this.z=nt(this.z,e.z,t.z),this.w=nt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=nt(this.x,e,t),this.y=nt(this.y,e,t),this.z=nt(this.z,e,t),this.w=nt(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(nt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},ia=class extends wn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Gt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Mt(0,0,e,t),this.scissorTest=!1,this.viewport=new Mt(0,0,e,t),this.textures=[];let s={width:e,height:t,depth:n.depth},r=new Kt(s),o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:Gt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new Ms(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},ln=class extends ia{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},pr=class extends Kt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Ht,this.minFilter=Ht,this.wrapR=Fn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var sa=class extends Kt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Ht,this.minFilter=Ht,this.wrapR=Fn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var ht=class i{static{i.prototype.isMatrix4=!0}constructor(e,t,n,s,r,o,a,l,c,d,u,h,f,g,v,p){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,l,c,d,u,h,f,g,v,p)}set(e,t,n,s,r,o,a,l,c,d,u,h,f,g,v,p){let m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=s,m[1]=r,m[5]=o,m[9]=a,m[13]=l,m[2]=c,m[6]=d,m[10]=u,m[14]=h,m[3]=f,m[7]=g,m[11]=v,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,s=1/is.setFromMatrixColumn(e,0).length(),r=1/is.setFromMatrixColumn(e,1).length(),o=1/is.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),d=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){let h=o*d,f=o*u,g=a*d,v=a*u;t[0]=l*d,t[4]=-l*u,t[8]=c,t[1]=f+g*c,t[5]=h-v*c,t[9]=-a*l,t[2]=v-h*c,t[6]=g+f*c,t[10]=o*l}else if(e.order==="YXZ"){let h=l*d,f=l*u,g=c*d,v=c*u;t[0]=h+v*a,t[4]=g*a-f,t[8]=o*c,t[1]=o*u,t[5]=o*d,t[9]=-a,t[2]=f*a-g,t[6]=v+h*a,t[10]=o*l}else if(e.order==="ZXY"){let h=l*d,f=l*u,g=c*d,v=c*u;t[0]=h-v*a,t[4]=-o*u,t[8]=g+f*a,t[1]=f+g*a,t[5]=o*d,t[9]=v-h*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){let h=o*d,f=o*u,g=a*d,v=a*u;t[0]=l*d,t[4]=g*c-f,t[8]=h*c+v,t[1]=l*u,t[5]=v*c+h,t[9]=f*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){let h=o*l,f=o*c,g=a*l,v=a*c;t[0]=l*d,t[4]=v-h*u,t[8]=g*u+f,t[1]=u,t[5]=o*d,t[9]=-a*d,t[2]=-c*d,t[6]=f*u+g,t[10]=h-v*u}else if(e.order==="XZY"){let h=o*l,f=o*c,g=a*l,v=a*c;t[0]=l*d,t[4]=-u,t[8]=c*d,t[1]=h*u+v,t[5]=o*d,t[9]=f*u-g,t[2]=g*u-f,t[6]=a*d,t[10]=v*u+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(tm,e,nm)}lookAt(e,t,n){let s=this.elements;return rn.subVectors(e,t),rn.lengthSq()===0&&(rn.z=1),rn.normalize(),ai.crossVectors(n,rn),ai.lengthSq()===0&&(Math.abs(n.z)===1?rn.x+=1e-4:rn.z+=1e-4,rn.normalize(),ai.crossVectors(n,rn)),ai.normalize(),co.crossVectors(rn,ai),s[0]=ai.x,s[4]=co.x,s[8]=rn.x,s[1]=ai.y,s[5]=co.y,s[9]=rn.y,s[2]=ai.z,s[6]=co.z,s[10]=rn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],d=n[1],u=n[5],h=n[9],f=n[13],g=n[2],v=n[6],p=n[10],m=n[14],A=n[3],w=n[7],y=n[11],M=n[15],b=s[0],R=s[4],x=s[8],C=s[12],L=s[1],D=s[5],k=s[9],Z=s[13],J=s[2],B=s[6],Y=s[10],z=s[14],X=s[3],ne=s[7],he=s[11],de=s[15];return r[0]=o*b+a*L+l*J+c*X,r[4]=o*R+a*D+l*B+c*ne,r[8]=o*x+a*k+l*Y+c*he,r[12]=o*C+a*Z+l*z+c*de,r[1]=d*b+u*L+h*J+f*X,r[5]=d*R+u*D+h*B+f*ne,r[9]=d*x+u*k+h*Y+f*he,r[13]=d*C+u*Z+h*z+f*de,r[2]=g*b+v*L+p*J+m*X,r[6]=g*R+v*D+p*B+m*ne,r[10]=g*x+v*k+p*Y+m*he,r[14]=g*C+v*Z+p*z+m*de,r[3]=A*b+w*L+y*J+M*X,r[7]=A*R+w*D+y*B+M*ne,r[11]=A*x+w*k+y*Y+M*he,r[15]=A*C+w*Z+y*z+M*de,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],d=e[2],u=e[6],h=e[10],f=e[14],g=e[3],v=e[7],p=e[11],m=e[15],A=l*f-c*h,w=a*f-c*u,y=a*h-l*u,M=o*f-c*d,b=o*h-l*d,R=o*u-a*d;return t*(v*A-p*w+m*y)-n*(g*A-p*M+m*b)+s*(g*w-v*M+m*R)-r*(g*y-v*b+p*R)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],o=e[5],a=e[9],l=e[2],c=e[6],d=e[10];return t*(o*d-a*c)-n*(r*d-a*l)+s*(r*c-o*l)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],d=e[8],u=e[9],h=e[10],f=e[11],g=e[12],v=e[13],p=e[14],m=e[15],A=t*a-n*o,w=t*l-s*o,y=t*c-r*o,M=n*l-s*a,b=n*c-r*a,R=s*c-r*l,x=d*v-u*g,C=d*p-h*g,L=d*m-f*g,D=u*p-h*v,k=u*m-f*v,Z=h*m-f*p,J=A*Z-w*k+y*D+M*L-b*C+R*x;if(J===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let B=1/J;return e[0]=(a*Z-l*k+c*D)*B,e[1]=(s*k-n*Z-r*D)*B,e[2]=(v*R-p*b+m*M)*B,e[3]=(h*b-u*R-f*M)*B,e[4]=(l*L-o*Z-c*C)*B,e[5]=(t*Z-s*L+r*C)*B,e[6]=(p*y-g*R-m*w)*B,e[7]=(d*R-h*y+f*w)*B,e[8]=(o*k-a*L+c*x)*B,e[9]=(n*L-t*k-r*x)*B,e[10]=(g*b-v*y+m*A)*B,e[11]=(u*y-d*b-f*A)*B,e[12]=(a*C-o*D-l*x)*B,e[13]=(t*D-n*C+s*x)*B,e[14]=(v*w-g*M-p*A)*B,e[15]=(d*M-u*w+h*A)*B,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,l=e.z,c=r*o,d=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,d*a+n,d*l-s*o,0,c*l-s*a,d*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,d=o+o,u=a+a,h=r*c,f=r*d,g=r*u,v=o*d,p=o*u,m=a*u,A=l*c,w=l*d,y=l*u,M=n.x,b=n.y,R=n.z;return s[0]=(1-(v+m))*M,s[1]=(f+y)*M,s[2]=(g-w)*M,s[3]=0,s[4]=(f-y)*b,s[5]=(1-(h+m))*b,s[6]=(p+A)*b,s[7]=0,s[8]=(g+w)*R,s[9]=(p-A)*R,s[10]=(1-(h+v))*R,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let o=is.set(s[0],s[1],s[2]).length(),a=is.set(s[4],s[5],s[6]).length(),l=is.set(s[8],s[9],s[10]).length();r<0&&(o=-o),_n.copy(this);let c=1/o,d=1/a,u=1/l;return _n.elements[0]*=c,_n.elements[1]*=c,_n.elements[2]*=c,_n.elements[4]*=d,_n.elements[5]*=d,_n.elements[6]*=d,_n.elements[8]*=u,_n.elements[9]*=u,_n.elements[10]*=u,t.setFromRotationMatrix(_n),n.x=o,n.y=a,n.z=l,this}makePerspective(e,t,n,s,r,o,a=Mn,l=!1){let c=this.elements,d=2*r/(t-e),u=2*r/(n-s),h=(t+e)/(t-e),f=(n+s)/(n-s),g,v;if(l)g=r/(o-r),v=o*r/(o-r);else if(a===Mn)g=-(o+r)/(o-r),v=-2*o*r/(o-r);else if(a===vs)g=-o/(o-r),v=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=d,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=Mn,l=!1){let c=this.elements,d=2/(t-e),u=2/(n-s),h=-(t+e)/(t-e),f=-(n+s)/(n-s),g,v;if(l)g=1/(o-r),v=o/(o-r);else if(a===Mn)g=-2/(o-r),v=-(o+r)/(o-r);else if(a===vs)g=-1/(o-r),v=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=d,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},is=new I,_n=new ht,tm=new I(0,0,0),nm=new I(1,1,1),ai=new I,co=new I,rn=new I,Eh=new ht,Th=new Wt,Qn=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],d=s[9],u=s[2],h=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(nt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-d,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-nt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(nt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-nt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(h,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(nt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-nt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-d,f),this._y=0);break;default:He("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Eh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Eh,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Th.setFromEuler(this),this.setFromQuaternion(Th,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Qn.DEFAULT_ORDER="XYZ";var ws=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},im=0,Ah=new I,ss=new Wt,qn=new ht,ho=new I,Ks=new I,sm=new I,rm=new Wt,Ch=new I(1,0,0),Rh=new I(0,1,0),Ph=new I(0,0,1),Ih={type:"added"},om={type:"removed"},rs={type:"childadded",child:null},nc={type:"childremoved",child:null},Nt=class i extends wn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:im++}),this.uuid=On(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new I,t=new Qn,n=new Wt,s=new I(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ht},normalMatrix:{value:new Ke}}),this.matrix=new ht,this.matrixWorld=new ht,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ws,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ss.setFromAxisAngle(e,t),this.quaternion.multiply(ss),this}rotateOnWorldAxis(e,t){return ss.setFromAxisAngle(e,t),this.quaternion.premultiply(ss),this}rotateX(e){return this.rotateOnAxis(Ch,e)}rotateY(e){return this.rotateOnAxis(Rh,e)}rotateZ(e){return this.rotateOnAxis(Ph,e)}translateOnAxis(e,t){return Ah.copy(e).applyQuaternion(this.quaternion),this.position.add(Ah.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ch,e)}translateY(e){return this.translateOnAxis(Rh,e)}translateZ(e){return this.translateOnAxis(Ph,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(qn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ho.copy(e):ho.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Ks.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?qn.lookAt(Ks,ho,this.up):qn.lookAt(ho,Ks,this.up),this.quaternion.setFromRotationMatrix(qn),s&&(qn.extractRotation(s.matrixWorld),ss.setFromRotationMatrix(qn),this.quaternion.premultiply(ss.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Xe("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Ih),rs.child=e,this.dispatchEvent(rs),rs.child=null):Xe("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(om),nc.child=e,this.dispatchEvent(nc),nc.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),qn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),qn.multiply(e.parent.matrixWorld)),e.applyMatrix4(qn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Ih),rs.child=e,this.dispatchEvent(rs),rs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ks,e,sm),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ks,rm,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){let u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];s.animations.push(r(e.animations,l))}}if(t){let a=o(e.geometries),l=o(e.materials),c=o(e.textures),d=o(e.images),u=o(e.shapes),h=o(e.skeletons),f=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),d.length>0&&(n.images=d),u.length>0&&(n.shapes=u),h.length>0&&(n.skeletons=h),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){let l=[];for(let c in a){let d=a[c];delete d.metadata,l.push(d)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}};Nt.DEFAULT_UP=new I(0,1,0);Nt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Nt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var zt=class extends Nt{constructor(){super(),this.isGroup=!0,this.type="Group"}},am={type:"move"},Es=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new zt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new zt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new zt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(let v of e.hand.values()){let p=t.getJointPose(v,n),m=this._getHandJoint(c,v);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}let d=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],h=d.position.distanceTo(u.position),f=.02,g=.005;c.inputState.pinching&&h>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(am)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new zt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},ku={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},li={h:0,s:0,l:0},uo={h:0,s:0,l:0};function ic(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var je=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=an){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ot.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=ot.workingColorSpace){return this.r=e,this.g=t,this.b=n,ot.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=ot.workingColorSpace){if(e=ld(e,1),t=nt(t,0,1),n=nt(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=ic(o,r,e+1/3),this.g=ic(o,r,e),this.b=ic(o,r,e-1/3)}return ot.colorSpaceToWorking(this,s),this}setStyle(e,t=an){function n(r){r!==void 0&&parseFloat(r)<1&&He("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:He("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);He("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=an){let n=ku[e.toLowerCase()];return n!==void 0?this.setHex(n,t):He("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Kn(e.r),this.g=Kn(e.g),this.b=Kn(e.b),this}copyLinearToSRGB(e){return this.r=_s(e.r),this.g=_s(e.g),this.b=_s(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=an){return ot.workingToColorSpace(Yt.copy(this),e),Math.round(nt(Yt.r*255,0,255))*65536+Math.round(nt(Yt.g*255,0,255))*256+Math.round(nt(Yt.b*255,0,255))}getHexString(e=an){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ot.workingColorSpace){ot.workingToColorSpace(Yt.copy(this),t);let n=Yt.r,s=Yt.g,r=Yt.b,o=Math.max(n,s,r),a=Math.min(n,s,r),l,c,d=(a+o)/2;if(a===o)l=0,c=0;else{let u=o-a;switch(c=d<=.5?u/(o+a):u/(2-o-a),o){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=d,e}getRGB(e,t=ot.workingColorSpace){return ot.workingToColorSpace(Yt.copy(this),t),e.r=Yt.r,e.g=Yt.g,e.b=Yt.b,e}getStyle(e=an){ot.workingToColorSpace(Yt.copy(this),e);let t=Yt.r,n=Yt.g,s=Yt.b;return e!==an?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(li),this.setHSL(li.h+e,li.s+t,li.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(li),e.getHSL(uo);let n=or(li.h,uo.h,t),s=or(li.s,uo.s,t),r=or(li.l,uo.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Yt=new je;je.NAMES=ku;var pi=class extends Nt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Qn,this.environmentIntensity=1,this.environmentRotation=new Qn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},vn=new I,Yn=new I,sc=new I,$n=new I,os=new I,as=new I,Dh=new I,rc=new I,oc=new I,ac=new I,lc=new Mt,cc=new Mt,dc=new Mt,Un=class i{constructor(e=new I,t=new I,n=new I){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),vn.subVectors(e,t),s.cross(vn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){vn.subVectors(s,t),Yn.subVectors(n,t),sc.subVectors(e,t);let o=vn.dot(vn),a=vn.dot(Yn),l=vn.dot(sc),c=Yn.dot(Yn),d=Yn.dot(sc),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;let h=1/u,f=(c*l-a*d)*h,g=(o*d-a*l)*h;return r.set(1-f-g,g,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,$n)===null?!1:$n.x>=0&&$n.y>=0&&$n.x+$n.y<=1}static getInterpolation(e,t,n,s,r,o,a,l){return this.getBarycoord(e,t,n,s,$n)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,$n.x),l.addScaledVector(o,$n.y),l.addScaledVector(a,$n.z),l)}static getInterpolatedAttribute(e,t,n,s,r,o){return lc.setScalar(0),cc.setScalar(0),dc.setScalar(0),lc.fromBufferAttribute(e,t),cc.fromBufferAttribute(e,n),dc.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(lc,r.x),o.addScaledVector(cc,r.y),o.addScaledVector(dc,r.z),o}static isFrontFacing(e,t,n,s){return vn.subVectors(n,t),Yn.subVectors(e,t),vn.cross(Yn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return vn.subVectors(this.c,this.b),Yn.subVectors(this.a,this.b),vn.cross(Yn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,o,a;os.subVectors(s,n),as.subVectors(r,n),rc.subVectors(e,n);let l=os.dot(rc),c=as.dot(rc);if(l<=0&&c<=0)return t.copy(n);oc.subVectors(e,s);let d=os.dot(oc),u=as.dot(oc);if(d>=0&&u<=d)return t.copy(s);let h=l*u-d*c;if(h<=0&&l>=0&&d<=0)return o=l/(l-d),t.copy(n).addScaledVector(os,o);ac.subVectors(e,r);let f=os.dot(ac),g=as.dot(ac);if(g>=0&&f<=g)return t.copy(r);let v=f*c-l*g;if(v<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(n).addScaledVector(as,a);let p=d*g-f*u;if(p<=0&&u-d>=0&&f-g>=0)return Dh.subVectors(r,s),a=(u-d)/(u-d+(f-g)),t.copy(s).addScaledVector(Dh,a);let m=1/(p+v+h);return o=v*m,a=h*m,t.copy(n).addScaledVector(os,o).addScaledVector(as,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},En=class{constructor(e=new I(1/0,1/0,1/0),t=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(bn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(bn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=bn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,bn):bn.fromBufferAttribute(r,o),bn.applyMatrix4(e.matrixWorld),this.expandByPoint(bn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),fo.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),fo.copy(n.boundingBox)),fo.applyMatrix4(e.matrixWorld),this.union(fo)}let s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,bn),bn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(js),po.subVectors(this.max,js),ls.subVectors(e.a,js),cs.subVectors(e.b,js),ds.subVectors(e.c,js),ci.subVectors(cs,ls),di.subVectors(ds,cs),Fi.subVectors(ls,ds);let t=[0,-ci.z,ci.y,0,-di.z,di.y,0,-Fi.z,Fi.y,ci.z,0,-ci.x,di.z,0,-di.x,Fi.z,0,-Fi.x,-ci.y,ci.x,0,-di.y,di.x,0,-Fi.y,Fi.x,0];return!hc(t,ls,cs,ds,po)||(t=[1,0,0,0,1,0,0,0,1],!hc(t,ls,cs,ds,po))?!1:(mo.crossVectors(ci,di),t=[mo.x,mo.y,mo.z],hc(t,ls,cs,ds,po))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,bn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(bn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Zn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Zn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Zn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Zn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Zn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Zn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Zn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Zn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Zn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Zn=[new I,new I,new I,new I,new I,new I,new I,new I],bn=new I,fo=new En,ls=new I,cs=new I,ds=new I,ci=new I,di=new I,Fi=new I,js=new I,po=new I,mo=new I,Oi=new I;function hc(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Oi.fromArray(i,r);let a=s.x*Math.abs(Oi.x)+s.y*Math.abs(Oi.y)+s.z*Math.abs(Oi.z),l=e.dot(Oi),c=t.dot(Oi),d=n.dot(Oi);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>a)return!1}return!0}var Lt=new I,go=new le,lm=0,St=class extends wn{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:lm++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=ta,this.updateRanges=[],this.gpuType=Rn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)go.fromBufferAttribute(this,t),go.applyMatrix3(e),this.setXY(t,go.x,go.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.applyMatrix3(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.applyMatrix4(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.applyNormalMatrix(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.transformDirection(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Sn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ut(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Sn(t,this.array)),t}setX(e,t){return this.normalized&&(t=ut(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Sn(t,this.array)),t}setY(e,t){return this.normalized&&(t=ut(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Sn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ut(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Sn(t,this.array)),t}setW(e,t){return this.normalized&&(t=ut(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=ut(t,this.array),n=ut(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=ut(t,this.array),n=ut(n,this.array),s=ut(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=ut(t,this.array),n=ut(n,this.array),s=ut(s,this.array),r=ut(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ta&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}};var mr=class extends St{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var gr=class extends St{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var Et=class extends St{constructor(e,t,n){super(new Float32Array(e),t,n)}},cm=new En,Qs=new I,uc=new I,mi=class{constructor(e=new I,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):cm.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Qs.subVectors(e,this.center);let t=Qs.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Qs,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(uc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Qs.copy(e.center).add(uc)),this.expandByPoint(Qs.copy(e.center).sub(uc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},dm=0,pn=new ht,fc=new Nt,hs=new I,on=new En,er=new En,kt=new I,ft=class i extends wn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:dm++}),this.uuid=On(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Np(e)?gr:mr)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Ke().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return pn.makeRotationFromQuaternion(e),this.applyMatrix4(pn),this}rotateX(e){return pn.makeRotationX(e),this.applyMatrix4(pn),this}rotateY(e){return pn.makeRotationY(e),this.applyMatrix4(pn),this}rotateZ(e){return pn.makeRotationZ(e),this.applyMatrix4(pn),this}translate(e,t,n){return pn.makeTranslation(e,t,n),this.applyMatrix4(pn),this}scale(e,t,n){return pn.makeScale(e,t,n),this.applyMatrix4(pn),this}lookAt(e){return fc.lookAt(e),fc.updateMatrix(),this.applyMatrix4(fc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(hs).negate(),this.translate(hs.x,hs.y,hs.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let o=e[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Et(n,3))}else{let n=Math.min(e.length,t.count);for(let s=0;s<n;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&He("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new En);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Xe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];on.setFromBufferAttribute(r),this.morphTargetsRelative?(kt.addVectors(this.boundingBox.min,on.min),this.boundingBox.expandByPoint(kt),kt.addVectors(this.boundingBox.max,on.max),this.boundingBox.expandByPoint(kt)):(this.boundingBox.expandByPoint(on.min),this.boundingBox.expandByPoint(on.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Xe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new mi);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Xe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(e){let n=this.boundingSphere.center;if(on.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){let a=t[r];er.setFromBufferAttribute(a),this.morphTargetsRelative?(kt.addVectors(on.min,er.min),on.expandByPoint(kt),kt.addVectors(on.max,er.max),on.expandByPoint(kt)):(on.expandByPoint(er.min),on.expandByPoint(er.max))}on.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)kt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(kt));if(t)for(let r=0,o=t.length;r<o;r++){let a=t[r],l=this.morphTargetsRelative;for(let c=0,d=a.count;c<d;c++)kt.fromBufferAttribute(a,c),l&&(hs.fromBufferAttribute(e,c),kt.add(hs)),s=Math.max(s,n.distanceToSquared(kt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Xe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Xe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==n.count)&&(o=new St(new Float32Array(4*n.count),4),this.setAttribute("tangent",o));let a=[],l=[];for(let x=0;x<n.count;x++)a[x]=new I,l[x]=new I;let c=new I,d=new I,u=new I,h=new le,f=new le,g=new le,v=new I,p=new I;function m(x,C,L){c.fromBufferAttribute(n,x),d.fromBufferAttribute(n,C),u.fromBufferAttribute(n,L),h.fromBufferAttribute(r,x),f.fromBufferAttribute(r,C),g.fromBufferAttribute(r,L),d.sub(c),u.sub(c),f.sub(h),g.sub(h);let D=1/(f.x*g.y-g.x*f.y);isFinite(D)&&(v.copy(d).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(D),p.copy(u).multiplyScalar(f.x).addScaledVector(d,-g.x).multiplyScalar(D),a[x].add(v),a[C].add(v),a[L].add(v),l[x].add(p),l[C].add(p),l[L].add(p))}let A=this.groups;A.length===0&&(A=[{start:0,count:e.count}]);for(let x=0,C=A.length;x<C;++x){let L=A[x],D=L.start,k=L.count;for(let Z=D,J=D+k;Z<J;Z+=3)m(e.getX(Z+0),e.getX(Z+1),e.getX(Z+2))}let w=new I,y=new I,M=new I,b=new I;function R(x){M.fromBufferAttribute(s,x),b.copy(M);let C=a[x];w.copy(C),w.sub(M.multiplyScalar(M.dot(C))).normalize(),y.crossVectors(b,C);let D=y.dot(l[x])<0?-1:1;o.setXYZW(x,w.x,w.y,w.z,D)}for(let x=0,C=A.length;x<C;++x){let L=A[x],D=L.start,k=L.count;for(let Z=D,J=D+k;Z<J;Z+=3)R(e.getX(Z+0)),R(e.getX(Z+1)),R(e.getX(Z+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new St(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let h=0,f=n.count;h<f;h++)n.setXYZ(h,0,0,0);let s=new I,r=new I,o=new I,a=new I,l=new I,c=new I,d=new I,u=new I;if(e)for(let h=0,f=e.count;h<f;h+=3){let g=e.getX(h+0),v=e.getX(h+1),p=e.getX(h+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,v),o.fromBufferAttribute(t,p),d.subVectors(o,r),u.subVectors(s,r),d.cross(u),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,p),a.add(d),l.add(d),c.add(d),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let h=0,f=t.count;h<f;h+=3)s.fromBufferAttribute(t,h+0),r.fromBufferAttribute(t,h+1),o.fromBufferAttribute(t,h+2),d.subVectors(o,r),u.subVectors(s,r),d.cross(u),n.setXYZ(h+0,d.x,d.y,d.z),n.setXYZ(h+1,d.x,d.y,d.z),n.setXYZ(h+2,d.x,d.y,d.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)kt.fromBufferAttribute(e,t),kt.normalize(),e.setXYZ(t,kt.x,kt.y,kt.z)}toNonIndexed(){function e(a,l){let c=a.array,d=a.itemSize,u=a.normalized,h=new c.constructor(l.length*d),f=0,g=0;for(let v=0,p=l.length;v<p;v++){a.isInterleavedBufferAttribute?f=l[v]*a.data.stride+a.offset:f=l[v]*d;for(let m=0;m<d;m++)h[g++]=c[f++]}return new St(h,d,u)}if(this.index===null)return He("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let a in s){let l=s[a],c=e(l,n);t.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let d=0,u=c.length;d<u;d++){let h=c[d],f=e(h,n);l.push(f)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],d=[];for(let u=0,h=c.length;u<h;u++){let f=c[u];d.push(f.toJSON(e.data))}d.length>0&&(s[l]=d,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let s=e.attributes;for(let c in s){let d=s[c];this.setAttribute(c,d.clone(t))}let r=e.morphAttributes;for(let c in r){let d=[],u=r[c];for(let h=0,f=u.length;h<f;h++)d.push(u[h].clone(t));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let c=0,d=o.length;c<d;c++){let u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},ra=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=ta,this.updateRanges=[],this.version=0,this.uuid=On()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=On()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=On()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Jt=new I,xr=class i{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Jt.fromBufferAttribute(this,t),Jt.applyMatrix4(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Jt.fromBufferAttribute(this,t),Jt.applyNormalMatrix(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Jt.fromBufferAttribute(this,t),Jt.transformDirection(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Sn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ut(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=ut(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=ut(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=ut(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=ut(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Sn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Sn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Sn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Sn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=ut(t,this.array),n=ut(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=ut(t,this.array),n=ut(n,this.array),s=ut(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=ut(t,this.array),n=ut(n,this.array),s=ut(s,this.array),r=ut(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){fr("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new St(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){fr("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},hm=0,Tn=class extends wn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:hm++}),this.uuid=On(),this.name="",this.type="Material",this.blending=Gi,this.side=jn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Go,this.blendDst=Wo,this.blendEquation=fi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new je(0,0,0),this.blendAlpha=0,this.depthFunc=Wi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Pc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=zi,this.stencilZFail=zi,this.stencilZPass=zi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){He(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){He(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Gi&&(n.blending=this.blending),this.side!==jn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Go&&(n.blendSrc=this.blendSrc),this.blendDst!==Wo&&(n.blendDst=this.blendDst),this.blendEquation!==fi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Wi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Pc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==zi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==zi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==zi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(t){let r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new je().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new le().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new le().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Ts=class extends Tn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new je(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},us,tr=new I,fs=new I,ps=new I,ms=new le,nr=new le,zu=new ht,xo=new I,ir=new I,yo=new I,Lh=new le,pc=new le,Nh=new le,yr=class extends Nt{constructor(e=new Ts){if(super(),this.isSprite=!0,this.type="Sprite",us===void 0){us=new ft;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new ra(t,5);us.setIndex([0,1,2,0,2,3]),us.setAttribute("position",new xr(n,3,0,!1)),us.setAttribute("uv",new xr(n,2,3,!1))}this.geometry=us,this.material=e,this.center=new le(.5,.5),this.count=1}raycast(e,t){e.camera===null&&Xe('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),fs.setFromMatrixScale(this.matrixWorld),zu.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),ps.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&fs.multiplyScalar(-ps.z);let n=this.material.rotation,s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));let o=this.center;_o(xo.set(-.5,-.5,0),ps,o,fs,s,r),_o(ir.set(.5,-.5,0),ps,o,fs,s,r),_o(yo.set(.5,.5,0),ps,o,fs,s,r),Lh.set(0,0),pc.set(1,0),Nh.set(1,1);let a=e.ray.intersectTriangle(xo,ir,yo,!1,tr);if(a===null&&(_o(ir.set(-.5,.5,0),ps,o,fs,s,r),pc.set(0,1),a=e.ray.intersectTriangle(xo,yo,ir,!1,tr),a===null))return;let l=e.ray.origin.distanceTo(tr);l<e.near||l>e.far||t.push({distance:l,point:tr.clone(),uv:Un.getInterpolation(tr,xo,ir,yo,Lh,pc,Nh,new le),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function _o(i,e,t,n,s,r){ms.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(nr.x=r*ms.x-s*ms.y,nr.y=s*ms.x+r*ms.y):nr.copy(ms),i.copy(e),i.x+=nr.x,i.y+=nr.y,i.applyMatrix4(zu)}var Jn=new I,mc=new I,vo=new I,hi=new I,gc=new I,bo=new I,xc=new I,ei=class{constructor(e=new I,t=new I(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Jn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Jn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Jn.copy(this.origin).addScaledVector(this.direction,t),Jn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){mc.copy(e).add(t).multiplyScalar(.5),vo.copy(t).sub(e).normalize(),hi.copy(this.origin).sub(mc);let r=e.distanceTo(t)*.5,o=-this.direction.dot(vo),a=hi.dot(this.direction),l=-hi.dot(vo),c=hi.lengthSq(),d=Math.abs(1-o*o),u,h,f,g;if(d>0)if(u=o*l-a,h=o*a-l,g=r*d,u>=0)if(h>=-g)if(h<=g){let v=1/d;u*=v,h*=v,f=u*(u+o*h+2*a)+h*(o*u+h+2*l)+c}else h=r,u=Math.max(0,-(o*h+a)),f=-u*u+h*(h+2*l)+c;else h=-r,u=Math.max(0,-(o*h+a)),f=-u*u+h*(h+2*l)+c;else h<=-g?(u=Math.max(0,-(-o*r+a)),h=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+h*(h+2*l)+c):h<=g?(u=0,h=Math.min(Math.max(-r,-l),r),f=h*(h+2*l)+c):(u=Math.max(0,-(o*r+a)),h=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+h*(h+2*l)+c);else h=o>0?-r:r,u=Math.max(0,-(o*h+a)),f=-u*u+h*(h+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(mc).addScaledVector(vo,h),f}intersectSphere(e,t){Jn.subVectors(e.center,this.origin);let n=Jn.dot(this.direction),s=Jn.dot(Jn)-n*n,r=e.radius*e.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,l,c=1/this.direction.x,d=1/this.direction.y,u=1/this.direction.z,h=this.origin;return c>=0?(n=(e.min.x-h.x)*c,s=(e.max.x-h.x)*c):(n=(e.max.x-h.x)*c,s=(e.min.x-h.x)*c),d>=0?(r=(e.min.y-h.y)*d,o=(e.max.y-h.y)*d):(r=(e.max.y-h.y)*d,o=(e.min.y-h.y)*d),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(e.min.z-h.z)*u,l=(e.max.z-h.z)*u):(a=(e.max.z-h.z)*u,l=(e.min.z-h.z)*u),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Jn)!==null}intersectTriangle(e,t,n,s,r){gc.subVectors(t,e),bo.subVectors(n,e),xc.crossVectors(gc,bo);let o=this.direction.dot(xc),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;hi.subVectors(this.origin,e);let l=a*this.direction.dot(bo.crossVectors(hi,bo));if(l<0)return null;let c=a*this.direction.dot(gc.cross(hi));if(c<0||l+c>o)return null;let d=-a*hi.dot(xc);return d<0?null:this.at(d/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Qt=class extends Tn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new je(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qn,this.combine=Xc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Uh=new ht,Bi=new ei,So=new mi,Fh=new I,Mo=new I,wo=new I,Eo=new I,yc=new I,To=new I,Oh=new I,Ao=new I,Pt=class extends Nt{constructor(e=new ft,t=new Qt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let a=this.morphTargetInfluences;if(r&&a){To.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let d=a[l],u=r[l];d!==0&&(yc.fromBufferAttribute(u,e),o?To.addScaledVector(yc,d):To.addScaledVector(yc.sub(t),d))}t.add(To)}return t}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),So.copy(n.boundingSphere),So.applyMatrix4(r),Bi.copy(e.ray).recast(e.near),!(So.containsPoint(Bi.origin)===!1&&(Bi.intersectSphere(So,Fh)===null||Bi.origin.distanceToSquared(Fh)>(e.far-e.near)**2))&&(Uh.copy(r).invert(),Bi.copy(e.ray).applyMatrix4(Uh),!(n.boundingBox!==null&&Bi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Bi)))}_computeIntersections(e,t,n){let s,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,d=r.attributes.uv1,u=r.attributes.normal,h=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,v=h.length;g<v;g++){let p=h[g],m=o[p.materialIndex],A=Math.max(p.start,f.start),w=Math.min(a.count,Math.min(p.start+p.count,f.start+f.count));for(let y=A,M=w;y<M;y+=3){let b=a.getX(y),R=a.getX(y+1),x=a.getX(y+2);s=Co(this,m,e,n,c,d,u,b,R,x),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{let g=Math.max(0,f.start),v=Math.min(a.count,f.start+f.count);for(let p=g,m=v;p<m;p+=3){let A=a.getX(p),w=a.getX(p+1),y=a.getX(p+2);s=Co(this,o,e,n,c,d,u,A,w,y),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,v=h.length;g<v;g++){let p=h[g],m=o[p.materialIndex],A=Math.max(p.start,f.start),w=Math.min(l.count,Math.min(p.start+p.count,f.start+f.count));for(let y=A,M=w;y<M;y+=3){let b=y,R=y+1,x=y+2;s=Co(this,m,e,n,c,d,u,b,R,x),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{let g=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let p=g,m=v;p<m;p+=3){let A=p,w=p+1,y=p+2;s=Co(this,o,e,n,c,d,u,A,w,y),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}}};function um(i,e,t,n,s,r,o,a){let l;if(e.side===jt?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,e.side===jn,a),l===null)return null;Ao.copy(a),Ao.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo(Ao);return c<t.near||c>t.far?null:{distance:c,point:Ao.clone(),object:i}}function Co(i,e,t,n,s,r,o,a,l,c){i.getVertexPosition(a,Mo),i.getVertexPosition(l,wo),i.getVertexPosition(c,Eo);let d=um(i,e,t,n,Mo,wo,Eo,Oh);if(d){let u=new I;Un.getBarycoord(Oh,Mo,wo,Eo,u),s&&(d.uv=Un.getInterpolatedAttribute(s,a,l,c,u,new le)),r&&(d.uv1=Un.getInterpolatedAttribute(r,a,l,c,u,new le)),o&&(d.normal=Un.getInterpolatedAttribute(o,a,l,c,u,new I),d.normal.dot(n.direction)>0&&d.normal.multiplyScalar(-1));let h={a,b:l,c,normal:new I,materialIndex:0};Un.getNormal(Mo,wo,Eo,h.normal),d.face=h,d.barycoord=u}return d}var oa=class extends Kt{constructor(e=null,t=1,n=1,s,r,o,a,l,c=Ht,d=Ht,u,h){super(null,o,a,l,c,d,s,r,u,h),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var _c=new I,fm=new I,pm=new Ke,mn=class{constructor(e=new I(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=_c.subVectors(n,t).cross(fm.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let s=e.delta(_c),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let o=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(o<0||o>1)?null:t.copy(e.start).addScaledVector(s,o)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||pm.getNormalMatrix(e),s=this.coplanarPoint(_c).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},ki=new mi,mm=new le(.5,.5),Ro=new I,As=class{constructor(e=new mn,t=new mn,n=new mn,s=new mn,r=new mn,o=new mn){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Mn,n=!1){let s=this.planes,r=e.elements,o=r[0],a=r[1],l=r[2],c=r[3],d=r[4],u=r[5],h=r[6],f=r[7],g=r[8],v=r[9],p=r[10],m=r[11],A=r[12],w=r[13],y=r[14],M=r[15];if(s[0].setComponents(c-o,f-d,m-g,M-A).normalize(),s[1].setComponents(c+o,f+d,m+g,M+A).normalize(),s[2].setComponents(c+a,f+u,m+v,M+w).normalize(),s[3].setComponents(c-a,f-u,m-v,M-w).normalize(),n)s[4].setComponents(l,h,p,y).normalize(),s[5].setComponents(c-l,f-h,m-p,M-y).normalize();else if(s[4].setComponents(c-l,f-h,m-p,M-y).normalize(),t===Mn)s[5].setComponents(c+l,f+h,m+p,M+y).normalize();else if(t===vs)s[5].setComponents(l,h,p,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ki.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ki.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ki)}intersectsSprite(e){ki.center.set(0,0,0);let t=mm.distanceTo(e.center);return ki.radius=.7071067811865476+t,ki.applyMatrix4(e.matrixWorld),this.intersectsSphere(ki)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(Ro.x=s.normal.x>0?e.max.x:e.min.x,Ro.y=s.normal.y>0?e.max.y:e.min.y,Ro.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Ro)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var gn=class extends Tn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new je(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},aa=new I,la=new I,Bh=new ht,sr=new ei,Po=new mi,vc=new I,kh=new I,ca=class extends Nt{constructor(e=new ft,t=new gn){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)aa.fromBufferAttribute(t,s-1),la.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=aa.distanceTo(la);e.setAttribute("lineDistance",new Et(n,1))}else He("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Po.copy(n.boundingSphere),Po.applyMatrix4(s),Po.radius+=r,e.ray.intersectsSphere(Po)===!1)return;Bh.copy(s).invert(),sr.copy(e.ray).applyMatrix4(Bh);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,d=n.index,h=n.attributes.position;if(d!==null){let f=Math.max(0,o.start),g=Math.min(d.count,o.start+o.count);for(let v=f,p=g-1;v<p;v+=c){let m=d.getX(v),A=d.getX(v+1),w=Io(this,e,sr,l,m,A,v);w&&t.push(w)}if(this.isLineLoop){let v=d.getX(g-1),p=d.getX(f),m=Io(this,e,sr,l,v,p,g-1);m&&t.push(m)}}else{let f=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let v=f,p=g-1;v<p;v+=c){let m=Io(this,e,sr,l,v,v+1,v);m&&t.push(m)}if(this.isLineLoop){let v=Io(this,e,sr,l,g-1,f,g-1);v&&t.push(v)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Io(i,e,t,n,s,r,o){let a=i.geometry.attributes.position;if(aa.fromBufferAttribute(a,s),la.fromBufferAttribute(a,r),t.distanceSqToSegment(aa,la,vc,kh)>n)return;vc.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(vc);if(!(c<e.near||c>e.far))return{distance:c,point:kh.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}var zh=new I,Hh=new I,xn=class extends ca{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)zh.fromBufferAttribute(t,s),Hh.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+zh.distanceTo(Hh);e.setAttribute("lineDistance",new Et(n,1))}else He("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Cs=class extends Tn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new je(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Vh=new ht,Ic=new ei,Do=new mi,Lo=new I,_r=class extends Nt{constructor(e=new ft,t=new Cs){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Do.copy(n.boundingSphere),Do.applyMatrix4(s),Do.radius+=r,e.ray.intersectsSphere(Do)===!1)return;Vh.copy(s).invert(),Ic.copy(e.ray).applyMatrix4(Vh);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,u=n.attributes.position;if(c!==null){let h=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let g=h,v=f;g<v;g++){let p=c.getX(g);Lo.fromBufferAttribute(u,p),Gh(Lo,p,l,s,e,t,this)}}else{let h=Math.max(0,o.start),f=Math.min(u.count,o.start+o.count);for(let g=h,v=f;g<v;g++)Lo.fromBufferAttribute(u,g),Gh(Lo,g,l,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Gh(i,e,t,n,s,r,o){let a=Ic.distanceSqToPoint(i);if(a<t){let l=new I;Ic.closestPointToPoint(i,l),l.applyMatrix4(n);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}var vr=class extends Kt{constructor(e=[],t=Ei,n,s,r,o,a,l,c,d){super(e,t,n,s,r,o,a,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},gi=class extends Kt{constructor(e,t,n,s,r,o,a,l,c){super(e,t,n,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var ti=class extends Kt{constructor(e,t,n=Cn,s,r,o,a=Ht,l=Ht,c,d=Bn,u=1){if(d!==Bn&&d!==Ai)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let h={width:e,height:t,depth:u};super(h,s,r,o,a,l,d,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ms(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},da=class extends ti{constructor(e,t=Cn,n=Ei,s,r,o=Ht,a=Ht,l,c=Bn){let d={width:e,height:e,depth:1},u=[d,d,d,d,d,d];super(e,e,t,n,s,r,o,a,l,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},br=class extends Kt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Rs=class i extends ft{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],d=[],u=[],h=0,f=0;g("z","y","x",-1,-1,n,t,e,o,r,0),g("z","y","x",1,-1,n,t,-e,o,r,1),g("x","z","y",1,1,e,n,t,s,o,2),g("x","z","y",1,-1,e,n,-t,s,o,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new Et(c,3)),this.setAttribute("normal",new Et(d,3)),this.setAttribute("uv",new Et(u,2));function g(v,p,m,A,w,y,M,b,R,x,C){let L=y/R,D=M/x,k=y/2,Z=M/2,J=b/2,B=R+1,Y=x+1,z=0,X=0,ne=new I;for(let he=0;he<Y;he++){let de=he*D-Z;for(let Ae=0;Ae<B;Ae++){let Ze=Ae*L-k;ne[v]=Ze*A,ne[p]=de*w,ne[m]=J,c.push(ne.x,ne.y,ne.z),ne[v]=0,ne[p]=0,ne[m]=b>0?1:-1,d.push(ne.x,ne.y,ne.z),u.push(Ae/R),u.push(1-he/x),z+=1}}for(let he=0;he<x;he++)for(let de=0;de<R;de++){let Ae=h+de+B*he,Ze=h+de+B*(he+1),Qe=h+(de+1)+B*(he+1),Je=h+(de+1)+B*he;l.push(Ae,Ze,Je),l.push(Ze,Qe,Je),X+=6}a.addGroup(f,X,C),f+=X,h+=z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var No=new I,Uo=new I,bc=new I,Fo=new Un,Sr=class extends ft{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let s=Math.pow(10,4),r=Math.cos(ys*t),o=e.getIndex(),a=e.getAttribute("position"),l=o?o.count:a.count,c=[0,0,0],d=["a","b","c"],u=new Array(3),h={},f=[];for(let g=0;g<l;g+=3){o?(c[0]=o.getX(g),c[1]=o.getX(g+1),c[2]=o.getX(g+2)):(c[0]=g,c[1]=g+1,c[2]=g+2);let{a:v,b:p,c:m}=Fo;if(v.fromBufferAttribute(a,c[0]),p.fromBufferAttribute(a,c[1]),m.fromBufferAttribute(a,c[2]),Fo.getNormal(bc),u[0]=`${Math.round(v.x*s)},${Math.round(v.y*s)},${Math.round(v.z*s)}`,u[1]=`${Math.round(p.x*s)},${Math.round(p.y*s)},${Math.round(p.z*s)}`,u[2]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let A=0;A<3;A++){let w=(A+1)%3,y=u[A],M=u[w],b=Fo[d[A]],R=Fo[d[w]],x=`${y}_${M}`,C=`${M}_${y}`;C in h&&h[C]?(bc.dot(h[C].normal)<=r&&(f.push(b.x,b.y,b.z),f.push(R.x,R.y,R.z)),h[C]=null):x in h||(h[x]={index0:c[A],index1:c[w],normal:bc.clone()})}}for(let g in h)if(h[g]){let{index0:v,index1:p}=h[g];No.fromBufferAttribute(a,v),Uo.fromBufferAttribute(a,p),f.push(No.x,No.y,No.z),f.push(Uo.x,Uo.y,Uo.z)}this.setAttribute("position",new Et(f,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}},cn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){He("Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,s=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),s=0,r=n.length,o;t?o=t:o=e*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=n[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===o)return s/(r-1);let d=n[s],h=n[s+1]-d,f=(o-d)/h;return(s+f)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),a=this.getPoint(r),l=t||(o.isVector2?new le:new I);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new I,s=[],r=[],o=[],a=new I,l=new ht;for(let f=0;f<=e;f++){let g=f/e;s[f]=this.getTangentAt(g,new I)}r[0]=new I,o[0]=new I;let c=Number.MAX_VALUE,d=Math.abs(s[0].x),u=Math.abs(s[0].y),h=Math.abs(s[0].z);d<=c&&(c=d,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),h<=c&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(s[f-1],s[f]),a.length()>Number.EPSILON){a.normalize();let g=Math.acos(nt(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,g))}o[f].crossVectors(s[f],r[f])}if(t===!0){let f=Math.acos(nt(r[0].dot(r[e]),-1,1));f/=e,s[0].dot(a.crossVectors(r[0],r[e]))>0&&(f=-f);for(let g=1;g<=e;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],f*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Ps=class extends cn{constructor(e=0,t=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t=new le){let n=t,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);let a=this.aStartAngle+e*r,l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let d=Math.cos(this.aRotation),u=Math.sin(this.aRotation),h=l-this.aX,f=c-this.aY;l=h*d-f*u+this.aX,c=h*u+f*d+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},ha=class extends Ps{constructor(e,t,n,s,r,o){super(e,t,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function dd(){let i=0,e=0,t=0,n=0;function s(r,o,a,l){i=r,e=a,t=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,d,u){let h=(o-r)/c-(a-r)/(c+d)+(a-o)/d,f=(a-o)/d-(l-o)/(d+u)+(l-a)/u;h*=d,f*=d,s(o,a,h,f)},calc:function(r){let o=r*r,a=o*r;return i+e*r+t*o+n*a}}}var Wh=new I,Xh=new I,Sc=new dd,Mc=new dd,wc=new dd,ua=class extends cn{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new I){let n=t,s=this.points,r=s.length,o=(r-(this.closed?0:1))*e,a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,d;this.closed||a>0?c=s[(a-1)%r]:(Xh.subVectors(s[0],s[1]).add(s[0]),c=Xh);let u=s[a%r],h=s[(a+1)%r];if(this.closed||a+2<r?d=s[(a+2)%r]:(Wh.subVectors(s[r-1],s[r-2]).add(s[r-1]),d=Wh),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,g=Math.pow(c.distanceToSquared(u),f),v=Math.pow(u.distanceToSquared(h),f),p=Math.pow(h.distanceToSquared(d),f);v<1e-4&&(v=1),g<1e-4&&(g=v),p<1e-4&&(p=v),Sc.initNonuniformCatmullRom(c.x,u.x,h.x,d.x,g,v,p),Mc.initNonuniformCatmullRom(c.y,u.y,h.y,d.y,g,v,p),wc.initNonuniformCatmullRom(c.z,u.z,h.z,d.z,g,v,p)}else this.curveType==="catmullrom"&&(Sc.initCatmullRom(c.x,u.x,h.x,d.x,this.tension),Mc.initCatmullRom(c.y,u.y,h.y,d.y,this.tension),wc.initCatmullRom(c.z,u.z,h.z,d.z,this.tension));return n.set(Sc.calc(l),Mc.calc(l),wc.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new I().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function qh(i,e,t,n,s){let r=(n-e)*.5,o=(s-t)*.5,a=i*i,l=i*a;return(2*t-2*n+r+o)*l+(-3*t+3*n-2*r-o)*a+r*i+t}function gm(i,e){let t=1-i;return t*t*e}function xm(i,e){return 2*(1-i)*i*e}function ym(i,e){return i*i*e}function ar(i,e,t,n){return gm(i,e)+xm(i,t)+ym(i,n)}function _m(i,e){let t=1-i;return t*t*t*e}function vm(i,e){let t=1-i;return 3*t*t*i*e}function bm(i,e){return 3*(1-i)*i*i*e}function Sm(i,e){return i*i*i*e}function lr(i,e,t,n,s){return _m(i,e)+vm(i,t)+bm(i,n)+Sm(i,s)}var Mr=class extends cn{constructor(e=new le,t=new le,n=new le,s=new le){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new le){let n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(lr(e,s.x,r.x,o.x,a.x),lr(e,s.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},fa=class extends cn{constructor(e=new I,t=new I,n=new I,s=new I){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new I){let n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(lr(e,s.x,r.x,o.x,a.x),lr(e,s.y,r.y,o.y,a.y),lr(e,s.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},wr=class extends cn{constructor(e=new le,t=new le){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new le){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new le){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},pa=class extends cn{constructor(e=new I,t=new I){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new I){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new I){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Er=class extends cn{constructor(e=new le,t=new le,n=new le){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new le){let n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(ar(e,s.x,r.x,o.x),ar(e,s.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ma=class extends cn{constructor(e=new I,t=new I,n=new I){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new I){let n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(ar(e,s.x,r.x,o.x),ar(e,s.y,r.y,o.y),ar(e,s.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Tr=class extends cn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new le){let n=t,s=this.points,r=(s.length-1)*e,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],c=s[o],d=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return n.set(qh(a,l.x,c.x,d.x,u.x),qh(a,l.y,c.y,d.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new le().fromArray(s))}return this}},Dc=Object.freeze({__proto__:null,ArcCurve:ha,CatmullRomCurve3:ua,CubicBezierCurve:Mr,CubicBezierCurve3:fa,EllipseCurve:Ps,LineCurve:wr,LineCurve3:pa,QuadraticBezierCurve:Er,QuadraticBezierCurve3:ma,SplineCurve:Tr}),ga=class extends cn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Dc[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let o=s[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let s=0,r=this.curves;s<r.length;s++){let o=r[s],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){let d=l[c];n&&n.equals(d)||(t.push(d),n=d)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(new Dc[s.type]().fromJSON(s))}return this}},Xi=class extends ga{constructor(e){super(),this.type="Path",this.currentPoint=new le,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new wr(this.currentPoint.clone(),new le(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){let r=new Er(this.currentPoint.clone(),new le(e,t),new le(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,o){let a=new Mr(this.currentPoint.clone(),new le(e,t),new le(n,s),new le(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new Tr(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,o){let a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,t+l,n,s,r,o),this}absarc(e,t,n,s,r,o){return this.absellipse(e,t,n,n,s,r,o),this}ellipse(e,t,n,s,r,o,a,l){let c=this.currentPoint.x,d=this.currentPoint.y;return this.absellipse(e+c,t+d,n,s,r,o,a,l),this}absellipse(e,t,n,s,r,o,a,l){let c=new Ps(e,t,n,s,r,o,a,l);if(this.curves.length>0){let u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);let d=c.getPoint(1);return this.currentPoint.copy(d),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},Is=class extends Xi{constructor(e){super(e),this.uuid=On(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(new Xi().fromJSON(s))}return this}};function Mm(i,e,t=2){let n=e&&e.length,s=n?e[0]*t:i.length,r=Hu(i,0,s,t,!0),o=[];if(!r||r.next===r.prev)return o;let a,l,c;if(n&&(r=Cm(i,e,r,t)),i.length>80*t){a=i[0],l=i[1];let d=a,u=l;for(let h=t;h<s;h+=t){let f=i[h],g=i[h+1];f<a&&(a=f),g<l&&(l=g),f>d&&(d=f),g>u&&(u=g)}c=Math.max(d-a,u-l),c=c!==0?32767/c:0}return Ar(r,o,t,a,l,c,0),o}function Hu(i,e,t,n,s){let r;if(s===km(i,e,t,n)>0)for(let o=e;o<t;o+=n)r=Yh(o/n|0,i[o],i[o+1],r);else for(let o=t-n;o>=e;o-=n)r=Yh(o/n|0,i[o],i[o+1],r);return r&&Ds(r,r.next)&&(Rr(r),r=r.next),r}function qi(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(Ds(t,t.next)||wt(t.prev,t,t.next)===0)){if(Rr(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Ar(i,e,t,n,s,r,o){if(!i)return;!o&&r&&Lm(i,n,s,r);let a=i;for(;i.prev!==i.next;){let l=i.prev,c=i.next;if(r?Em(i,n,s,r):wm(i)){e.push(l.i,i.i,c.i),Rr(i),i=c.next,a=c.next;continue}if(i=c,i===a){o?o===1?(i=Tm(qi(i),e),Ar(i,e,t,n,s,r,2)):o===2&&Am(i,e,t,n,s,r):Ar(qi(i),e,t,n,s,r,1);break}}}function wm(i){let e=i.prev,t=i,n=i.next;if(wt(e,t,n)>=0)return!1;let s=e.x,r=t.x,o=n.x,a=e.y,l=t.y,c=n.y,d=Math.min(s,r,o),u=Math.min(a,l,c),h=Math.max(s,r,o),f=Math.max(a,l,c),g=n.next;for(;g!==e;){if(g.x>=d&&g.x<=h&&g.y>=u&&g.y<=f&&rr(s,a,r,l,o,c,g.x,g.y)&&wt(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Em(i,e,t,n){let s=i.prev,r=i,o=i.next;if(wt(s,r,o)>=0)return!1;let a=s.x,l=r.x,c=o.x,d=s.y,u=r.y,h=o.y,f=Math.min(a,l,c),g=Math.min(d,u,h),v=Math.max(a,l,c),p=Math.max(d,u,h),m=Lc(f,g,e,t,n),A=Lc(v,p,e,t,n),w=i.prevZ,y=i.nextZ;for(;w&&w.z>=m&&y&&y.z<=A;){if(w.x>=f&&w.x<=v&&w.y>=g&&w.y<=p&&w!==s&&w!==o&&rr(a,d,l,u,c,h,w.x,w.y)&&wt(w.prev,w,w.next)>=0||(w=w.prevZ,y.x>=f&&y.x<=v&&y.y>=g&&y.y<=p&&y!==s&&y!==o&&rr(a,d,l,u,c,h,y.x,y.y)&&wt(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;w&&w.z>=m;){if(w.x>=f&&w.x<=v&&w.y>=g&&w.y<=p&&w!==s&&w!==o&&rr(a,d,l,u,c,h,w.x,w.y)&&wt(w.prev,w,w.next)>=0)return!1;w=w.prevZ}for(;y&&y.z<=A;){if(y.x>=f&&y.x<=v&&y.y>=g&&y.y<=p&&y!==s&&y!==o&&rr(a,d,l,u,c,h,y.x,y.y)&&wt(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function Tm(i,e){let t=i;do{let n=t.prev,s=t.next.next;!Ds(n,s)&&Gu(n,t,t.next,s)&&Cr(n,s)&&Cr(s,n)&&(e.push(n.i,t.i,s.i),Rr(t),Rr(t.next),t=i=s),t=t.next}while(t!==i);return qi(t)}function Am(i,e,t,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Fm(o,a)){let l=Wu(o,a);o=qi(o,o.next),l=qi(l,l.next),Ar(o,e,t,n,s,r,0),Ar(l,e,t,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function Cm(i,e,t,n){let s=[];for(let r=0,o=e.length;r<o;r++){let a=e[r]*n,l=r<o-1?e[r+1]*n:i.length,c=Hu(i,a,l,n,!1);c===c.next&&(c.steiner=!0),s.push(Um(c))}s.sort(Rm);for(let r=0;r<s.length;r++)t=Pm(s[r],t);return t}function Rm(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=n-s}return t}function Pm(i,e){let t=Im(i,e);if(!t)return e;let n=Wu(t,i);return qi(n,n.next),qi(t,t.next)}function Im(i,e){let t=e,n=i.x,s=i.y,r=-1/0,o;if(Ds(i,t))return t;do{if(Ds(i,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){let u=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(u<=n&&u>r&&(r=u,o=t.x<t.next.x?t:t.next,u===n))return o}t=t.next}while(t!==e);if(!o)return null;let a=o,l=o.x,c=o.y,d=1/0;t=o;do{if(n>=t.x&&t.x>=l&&n!==t.x&&Vu(s<c?n:r,s,l,c,s<c?r:n,s,t.x,t.y)){let u=Math.abs(s-t.y)/(n-t.x);Cr(t,i)&&(u<d||u===d&&(t.x>o.x||t.x===o.x&&Dm(o,t)))&&(o=t,d=u)}t=t.next}while(t!==a);return o}function Dm(i,e){return wt(i.prev,i,e.prev)<0&&wt(e.next,i,i.next)<0}function Lm(i,e,t,n){let s=i;do s.z===0&&(s.z=Lc(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,Nm(s)}function Nm(i){let e,t=1;do{let n=i,s;i=null;let r=null;for(e=0;n;){e++;let o=n,a=0;for(let c=0;c<t&&(a++,o=o.nextZ,!!o);c++);let l=t;for(;a>0||l>0&&o;)a!==0&&(l===0||!o||n.z<=o.z)?(s=n,n=n.nextZ,a--):(s=o,o=o.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=o}r.nextZ=null,t*=2}while(e>1);return i}function Lc(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function Um(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function Vu(i,e,t,n,s,r,o,a){return(s-o)*(e-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(r-a)>=(s-o)*(n-a)}function rr(i,e,t,n,s,r,o,a){return!(i===o&&e===a)&&Vu(i,e,t,n,s,r,o,a)}function Fm(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!Om(i,e)&&(Cr(i,e)&&Cr(e,i)&&Bm(i,e)&&(wt(i.prev,i,e.prev)||wt(i,e.prev,e))||Ds(i,e)&&wt(i.prev,i,i.next)>0&&wt(e.prev,e,e.next)>0)}function wt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function Ds(i,e){return i.x===e.x&&i.y===e.y}function Gu(i,e,t,n){let s=Bo(wt(i,e,t)),r=Bo(wt(i,e,n)),o=Bo(wt(t,n,i)),a=Bo(wt(t,n,e));return!!(s!==r&&o!==a||s===0&&Oo(i,t,e)||r===0&&Oo(i,n,e)||o===0&&Oo(t,i,n)||a===0&&Oo(t,e,n))}function Oo(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function Bo(i){return i>0?1:i<0?-1:0}function Om(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&Gu(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function Cr(i,e){return wt(i.prev,i,i.next)<0?wt(i,e,i.next)>=0&&wt(i,i.prev,e)>=0:wt(i,e,i.prev)<0||wt(i,i.next,e)<0}function Bm(i,e){let t=i,n=!1,s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function Wu(i,e){let t=Nc(i.i,i.x,i.y),n=Nc(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function Yh(i,e,t,n){let s=Nc(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Rr(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Nc(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function km(i,e,t,n){let s=0;for(let r=e,o=t-n;r<t;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}var Uc=class{static triangulate(e,t,n=2){return Mm(e,t,n)}},Hi=class i{static area(e){let t=e.length,n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return i.area(e)<0}static triangulateShape(e,t){let n=[],s=[],r=[];$h(e),Zh(n,e);let o=e.length;t.forEach($h);for(let l=0;l<t.length;l++)s.push(o),o+=t[l].length,Zh(n,t[l]);let a=Uc.triangulate(n,s);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}};function $h(i){let e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function Zh(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}var Pr=class i extends ft{constructor(e=new Is([new le(.5,.5),new le(-.5,.5),new le(-.5,-.5),new le(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,s=[],r=[];for(let a=0,l=e.length;a<l;a++){let c=e[a];o(c)}this.setAttribute("position",new Et(s,3)),this.setAttribute("uv",new Et(r,2)),this.computeVertexNormals();function o(a){let l=[],c=t.curveSegments!==void 0?t.curveSegments:12,d=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1,h=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,g=t.bevelSize!==void 0?t.bevelSize:f-.1,v=t.bevelOffset!==void 0?t.bevelOffset:0,p=t.bevelSegments!==void 0?t.bevelSegments:3,m=t.extrudePath,A=t.UVGenerator!==void 0?t.UVGenerator:zm,w,y=!1,M,b,R,x;if(m){w=m.getSpacedPoints(d),y=!0,h=!1;let ie=m.isCatmullRomCurve3?m.closed:!1;M=m.computeFrenetFrames(d,ie),b=new I,R=new I,x=new I}h||(p=0,f=0,g=0,v=0);let C=a.extractPoints(c),L=C.shape,D=C.holes;if(!Hi.isClockWise(L)){L=L.reverse();for(let ie=0,oe=D.length;ie<oe;ie++){let re=D[ie];Hi.isClockWise(re)&&(D[ie]=re.reverse())}}function Z(ie){let re=10000000000000001e-36,ge=ie[0];for(let me=1;me<=ie.length;me++){let We=me%ie.length,Ne=ie[We],qe=Ne.x-ge.x,N=Ne.y-ge.y,P=qe*qe+N*N,be=Math.max(Math.abs(Ne.x),Math.abs(Ne.y),Math.abs(ge.x),Math.abs(ge.y)),ce=re*be*be;if(P<=ce){ie.splice(We,1),me--;continue}ge=Ne}}Z(L),D.forEach(Z);let J=D.length,B=L;for(let ie=0;ie<J;ie++){let oe=D[ie];L=L.concat(oe)}function Y(ie,oe,re){return oe||Xe("ExtrudeGeometry: vec does not exist"),ie.clone().addScaledVector(oe,re)}let z=L.length;function X(ie,oe,re){let ge,me,We,Ne=ie.x-oe.x,qe=ie.y-oe.y,N=re.x-ie.x,P=re.y-ie.y,be=Ne*Ne+qe*qe,ce=Ne*P-qe*N;if(Math.abs(ce)>Number.EPSILON){let E=Math.sqrt(be),_=Math.sqrt(N*N+P*P),H=oe.x-qe/E,W=oe.y+Ne/E,K=re.x-P/_,ue=re.y+N/_,pe=((K-H)*P-(ue-W)*N)/(Ne*P-qe*N);ge=H+Ne*pe-ie.x,me=W+qe*pe-ie.y;let j=ge*ge+me*me;if(j<=2)return new le(ge,me);We=Math.sqrt(j/2)}else{let E=!1;Ne>Number.EPSILON?N>Number.EPSILON&&(E=!0):Ne<-Number.EPSILON?N<-Number.EPSILON&&(E=!0):Math.sign(qe)===Math.sign(P)&&(E=!0),E?(ge=-qe,me=Ne,We=Math.sqrt(be)):(ge=Ne,me=qe,We=Math.sqrt(be/2))}return new le(ge/We,me/We)}let ne=[];for(let ie=0,oe=B.length,re=oe-1,ge=ie+1;ie<oe;ie++,re++,ge++)re===oe&&(re=0),ge===oe&&(ge=0),ne[ie]=X(B[ie],B[re],B[ge]);let he=[],de,Ae=ne.concat();for(let ie=0,oe=J;ie<oe;ie++){let re=D[ie];de=[];for(let ge=0,me=re.length,We=me-1,Ne=ge+1;ge<me;ge++,We++,Ne++)We===me&&(We=0),Ne===me&&(Ne=0),de[ge]=X(re[ge],re[We],re[Ne]);he.push(de),Ae=Ae.concat(de)}let Ze;if(p===0)Ze=Hi.triangulateShape(B,D);else{let ie=[],oe=[];for(let re=0;re<p;re++){let ge=re/p,me=f*Math.cos(ge*Math.PI/2),We=g*Math.sin(ge*Math.PI/2)+v;for(let Ne=0,qe=B.length;Ne<qe;Ne++){let N=Y(B[Ne],ne[Ne],We);Le(N.x,N.y,-me),ge===0&&ie.push(N)}for(let Ne=0,qe=J;Ne<qe;Ne++){let N=D[Ne];de=he[Ne];let P=[];for(let be=0,ce=N.length;be<ce;be++){let E=Y(N[be],de[be],We);Le(E.x,E.y,-me),ge===0&&P.push(E)}ge===0&&oe.push(P)}}Ze=Hi.triangulateShape(ie,oe)}let Qe=Ze.length,Je=g+v;for(let ie=0;ie<z;ie++){let oe=h?Y(L[ie],Ae[ie],Je):L[ie];y?(R.copy(M.normals[0]).multiplyScalar(oe.x),b.copy(M.binormals[0]).multiplyScalar(oe.y),x.copy(w[0]).add(R).add(b),Le(x.x,x.y,x.z)):Le(oe.x,oe.y,0)}for(let ie=1;ie<=d;ie++)for(let oe=0;oe<z;oe++){let re=h?Y(L[oe],Ae[oe],Je):L[oe];y?(R.copy(M.normals[ie]).multiplyScalar(re.x),b.copy(M.binormals[ie]).multiplyScalar(re.y),x.copy(w[ie]).add(R).add(b),Le(x.x,x.y,x.z)):Le(re.x,re.y,u/d*ie)}for(let ie=p-1;ie>=0;ie--){let oe=ie/p,re=f*Math.cos(oe*Math.PI/2),ge=g*Math.sin(oe*Math.PI/2)+v;for(let me=0,We=B.length;me<We;me++){let Ne=Y(B[me],ne[me],ge);Le(Ne.x,Ne.y,u+re)}for(let me=0,We=D.length;me<We;me++){let Ne=D[me];de=he[me];for(let qe=0,N=Ne.length;qe<N;qe++){let P=Y(Ne[qe],de[qe],ge);y?Le(P.x,P.y+w[d-1].y,w[d-1].x+re):Le(P.x,P.y,u+re)}}}Q(),fe();function Q(){let ie=s.length/3;if(h){let oe=0,re=z*oe;for(let ge=0;ge<Qe;ge++){let me=Ze[ge];Ge(me[2]+re,me[1]+re,me[0]+re)}oe=d+p*2,re=z*oe;for(let ge=0;ge<Qe;ge++){let me=Ze[ge];Ge(me[0]+re,me[1]+re,me[2]+re)}}else{for(let oe=0;oe<Qe;oe++){let re=Ze[oe];Ge(re[2],re[1],re[0])}for(let oe=0;oe<Qe;oe++){let re=Ze[oe];Ge(re[0]+z*d,re[1]+z*d,re[2]+z*d)}}n.addGroup(ie,s.length/3-ie,0)}function fe(){let ie=s.length/3,oe=0;ae(B,oe),oe+=B.length;for(let re=0,ge=D.length;re<ge;re++){let me=D[re];ae(me,oe),oe+=me.length}n.addGroup(ie,s.length/3-ie,1)}function ae(ie,oe){let re=ie.length;for(;--re>=0;){let ge=re,me=re-1;me<0&&(me=ie.length-1);for(let We=0,Ne=d+p*2;We<Ne;We++){let qe=z*We,N=z*(We+1),P=oe+ge+qe,be=oe+me+qe,ce=oe+me+N,E=oe+ge+N;ze(P,be,ce,E)}}}function Le(ie,oe,re){l.push(ie),l.push(oe),l.push(re)}function Ge(ie,oe,re){at(ie),at(oe),at(re);let ge=s.length/3,me=A.generateTopUV(n,s,ge-3,ge-2,ge-1);$e(me[0]),$e(me[1]),$e(me[2])}function ze(ie,oe,re,ge){at(ie),at(oe),at(ge),at(oe),at(re),at(ge);let me=s.length/3,We=A.generateSideWallUV(n,s,me-6,me-3,me-2,me-1);$e(We[0]),$e(We[1]),$e(We[3]),$e(We[1]),$e(We[2]),$e(We[3])}function at(ie){s.push(l[ie*3+0]),s.push(l[ie*3+1]),s.push(l[ie*3+2])}function $e(ie){r.push(ie.x),r.push(ie.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return Hm(t,n,e)}static fromJSON(e,t){let n=[];for(let r=0,o=e.shapes.length;r<o;r++){let a=t[e.shapes[r]];n.push(a)}let s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new Dc[s.type]().fromJSON(s)),new i(n,e.options)}},zm={generateTopUV:function(i,e,t,n,s){let r=e[t*3],o=e[t*3+1],a=e[n*3],l=e[n*3+1],c=e[s*3],d=e[s*3+1];return[new le(r,o),new le(a,l),new le(c,d)]},generateSideWallUV:function(i,e,t,n,s,r){let o=e[t*3],a=e[t*3+1],l=e[t*3+2],c=e[n*3],d=e[n*3+1],u=e[n*3+2],h=e[s*3],f=e[s*3+1],g=e[s*3+2],v=e[r*3],p=e[r*3+1],m=e[r*3+2];return Math.abs(a-d)<Math.abs(o-c)?[new le(o,1-l),new le(c,1-u),new le(h,1-g),new le(v,1-m)]:[new le(a,1-l),new le(d,1-u),new le(f,1-g),new le(p,1-m)]}};function Hm(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var xi=class i extends ft{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,o=t/2,a=Math.floor(n),l=Math.floor(s),c=a+1,d=l+1,u=e/a,h=t/l,f=[],g=[],v=[],p=[];for(let m=0;m<d;m++){let A=m*h-o;for(let w=0;w<c;w++){let y=w*u-r;g.push(y,-A,0),v.push(0,0,1),p.push(w/a),p.push(1-m/l)}}for(let m=0;m<l;m++)for(let A=0;A<a;A++){let w=A+c*m,y=A+c*(m+1),M=A+1+c*(m+1),b=A+1+c*m;f.push(w,y,b),f.push(y,M,b)}this.setIndex(f),this.setAttribute("position",new Et(g,3)),this.setAttribute("normal",new Et(v,3)),this.setAttribute("uv",new Et(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}};function Zi(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];if(Jh(s))s.isRenderTargetTexture?(He("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(Jh(s[0])){let r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function Zt(i){let e={};for(let t=0;t<i.length;t++){let n=Zi(i[t]);for(let s in n)e[s]=n[s]}return e}function Jh(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Vm(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function hd(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ot.workingColorSpace}var Xu={clone:Zi,merge:Zt},Gm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Wm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,dn=class extends Tn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Gm,this.fragmentShader=Wm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Zi(e.uniforms),this.uniformsGroups=Vm(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new je().setHex(s.value);break;case"v2":this.uniforms[n].value=new le().fromArray(s.value);break;case"v3":this.uniforms[n].value=new I().fromArray(s.value);break;case"v4":this.uniforms[n].value=new Mt().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Ke().fromArray(s.value);break;case"m4":this.uniforms[n].value=new ht().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},xa=class extends dn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Ir=class extends Tn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new je(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new je(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=xl,this.normalScale=new le(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var ya=class extends Tn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Au,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},_a=class extends Tn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function ko(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}var yi=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let o;t:{i:if(!(e<s)){for(let a=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=t[++n],e<s)break e}o=t.length;break t}if(!(e>=r)){let a=t[1];e<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=t[--n-1],e>=r)break e}o=n,n=0;break t}break n}for(;n<o;){let a=n+o>>>1;e<t[a]?o=a:n=a+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let o=0;o!==s;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},va=class extends yi{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ac,endingEnd:Ac}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,o=e+1,a=s[r],l=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Cc:r=e,a=2*t-n;break;case Rc:r=s.length-2,a=t+s[r]-s[r+1];break;default:r=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Cc:o=e,l=2*n-t;break;case Rc:o=1,l=n+s[1]-s[0];break;default:o=e-1,l=t}let c=(n-t)*.5,d=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=r*d,this._offsetNext=o*d}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,d=this._offsetPrev,u=this._offsetNext,h=this._weightPrev,f=this._weightNext,g=(n-t)/(s-t),v=g*g,p=v*g,m=-h*p+2*h*v-h*g,A=(1+h)*p+(-1.5-2*h)*v+(-.5+h)*g+1,w=(-1-f)*p+(1.5+f)*v+.5*g,y=f*p-f*v;for(let M=0;M!==a;++M)r[M]=m*o[d+M]+A*o[c+M]+w*o[l+M]+y*o[u+M];return r}},ba=class extends yi{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,d=(n-t)/(s-t),u=1-d;for(let h=0;h!==a;++h)r[h]=o[c+h]*u+o[l+h]*d;return r}},Sa=class extends yi{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},Ma=class extends yi{interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,d=this.inTangents,u=this.outTangents;if(!d||!u){let g=(n-t)/(s-t),v=1-g;for(let p=0;p!==a;++p)r[p]=o[c+p]*v+o[l+p]*g;return r}let h=a*2,f=e-1;for(let g=0;g!==a;++g){let v=o[c+g],p=o[l+g],m=f*h+g*2,A=u[m],w=u[m+1],y=e*h+g*2,M=d[y],b=d[y+1],R=(n-t)/(s-t),x,C,L,D,k;for(let Z=0;Z<8;Z++){x=R*R,C=x*R,L=1-R,D=L*L,k=D*L;let B=k*t+3*D*R*A+3*L*x*M+C*s-n;if(Math.abs(B)<1e-10)break;let Y=3*D*(A-t)+6*L*R*(M-A)+3*x*(s-M);if(Math.abs(Y)<1e-10)break;R=R-B/Y,R=Math.max(0,Math.min(1,R))}r[g]=k*v+3*D*R*w+3*L*x*b+C*p}return r}},hn=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ko(t,this.TimeBufferType),this.values=ko(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ko(e.times,Array),values:ko(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Sa(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ba(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new va(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Ma(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case cr:t=this.InterpolantFactoryMethodDiscrete;break;case ea:t=this.InterpolantFactoryMethodLinear;break;case Vo:t=this.InterpolantFactoryMethodSmooth;break;case Tc:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return He("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return cr;case this.InterpolantFactoryMethodLinear:return ea;case this.InterpolantFactoryMethodSmooth:return Vo;case this.InterpolantFactoryMethodBezier:return Tc}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Xe("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(Xe("KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){let l=n[a];if(typeof l=="number"&&isNaN(l)){Xe("KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){Xe("KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(s!==void 0&&Up(s))for(let a=0,l=s.length;a!==l;++a){let c=s[a];if(isNaN(c)){Xe("KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Vo,r=e.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=e[a],d=e[a+1];if(c!==d&&(a!==1||c!==e[0]))if(s)l=!0;else{let u=a*n,h=u-n,f=u+n;for(let g=0;g!==n;++g){let v=t[u+g];if(v!==t[h+g]||v!==t[f+g]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];let u=a*n,h=o*n;for(let f=0;f!==n;++f)t[h+f]=t[u+f]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}};hn.prototype.ValueTypeName="";hn.prototype.TimeBufferType=Float32Array;hn.prototype.ValueBufferType=Float32Array;hn.prototype.DefaultInterpolation=ea;var _i=class extends hn{constructor(e,t,n){super(e,t,n)}};_i.prototype.ValueTypeName="bool";_i.prototype.ValueBufferType=Array;_i.prototype.DefaultInterpolation=cr;_i.prototype.InterpolantFactoryMethodLinear=void 0;_i.prototype.InterpolantFactoryMethodSmooth=void 0;var wa=class extends hn{constructor(e,t,n,s){super(e,t,n,s)}};wa.prototype.ValueTypeName="color";var Ea=class extends hn{constructor(e,t,n,s){super(e,t,n,s)}};Ea.prototype.ValueTypeName="number";var Ta=class extends yi{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(s-t),c=e*a;for(let d=c+a;c!==d;c+=4)Wt.slerpFlat(r,0,o,c-a,o,c,l);return r}},Dr=class extends hn{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new Ta(this.times,this.values,this.getValueSize(),e)}};Dr.prototype.ValueTypeName="quaternion";Dr.prototype.InterpolantFactoryMethodSmooth=void 0;var vi=class extends hn{constructor(e,t,n){super(e,t,n)}};vi.prototype.ValueTypeName="string";vi.prototype.ValueBufferType=Array;vi.prototype.DefaultInterpolation=cr;vi.prototype.InterpolantFactoryMethodLinear=void 0;vi.prototype.InterpolantFactoryMethodSmooth=void 0;var Aa=class extends hn{constructor(e,t,n,s){super(e,t,n,s)}};Aa.prototype.ValueTypeName="vector";var Ca=class{constructor(e,t,n){let s=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(d){a++,r===!1&&s.onStart!==void 0&&s.onStart(d,o,a),r=!0},this.itemEnd=function(d){o++,s.onProgress!==void 0&&s.onProgress(d,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(d){s.onError!==void 0&&s.onError(d)},this.resolveURL=function(d){return d=d.normalize("NFC"),l?l(d):d},this.setURLModifier=function(d){return l=d,this},this.addHandler=function(d,u){return c.push(d,u),this},this.removeHandler=function(d){let u=c.indexOf(d);return u!==-1&&c.splice(u,2),this},this.getHandler=function(d){for(let u=0,h=c.length;u<h;u+=2){let f=c[u],g=c[u+1];if(f.global&&(f.lastIndex=0),f.test(d))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},qu=new Ca,Ra=class{constructor(e){this.manager=e!==void 0?e:qu,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Ra.DEFAULT_MATERIAL_NAME="__DEFAULT";var Lr=class extends Nt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new je(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Ls=class extends Lr{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Nt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new je(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Ec=new ht,Kh=new I,jh=new I,Fc=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new le(512,512),this.mapType=en,this.map=null,this.mapPass=null,this.matrix=new ht,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new As,this._frameExtents=new le(1,1),this._viewportCount=1,this._viewports=[new Mt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;Kh.setFromMatrixPosition(e.matrixWorld),t.position.copy(Kh),jh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(jh),t.updateMatrixWorld(),Ec.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ec,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===vs||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ec)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},zo=new I,Ho=new Wt,Nn=new I,Nr=class extends Nt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ht,this.projectionMatrix=new ht,this.projectionMatrixInverse=new ht,this.coordinateSystem=Mn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(zo,Ho,Nn),Nn.x===1&&Nn.y===1&&Nn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(zo,Ho,Nn.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(zo,Ho,Nn),Nn.x===1&&Nn.y===1&&Nn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(zo,Ho,Nn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},ui=new I,Qh=new le,eu=new le,$t=class extends Nr{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Ss*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(ys*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ss*2*Math.atan(Math.tan(ys*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){ui.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ui.x,ui.y).multiplyScalar(-e/ui.z),ui.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ui.x,ui.y).multiplyScalar(-e/ui.z)}getViewSize(e,t){return this.getViewBounds(e,Qh,eu),t.subVectors(eu,Qh)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(ys*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,t-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}let a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var bi=class extends Nr{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,o=n+e,a=s+t,l=s-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=d*this.view.offsetY,l=a-d*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Oc=class extends Fc{constructor(){super(new bi(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Si=class extends Lr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Nt.DEFAULT_UP),this.updateMatrix(),this.target=new Nt,this.shadow=new Oc}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var gs=-90,xs=1,Pa=class extends Nt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new $t(gs,xs,e,t);s.layers=this.layers,this.add(s);let r=new $t(gs,xs,e,t);r.layers=this.layers,this.add(r);let o=new $t(gs,xs,e,t);o.layers=this.layers,this.add(o);let a=new $t(gs,xs,e,t);a.layers=this.layers,this.add(a);let l=new $t(gs,xs,e,t);l.layers=this.layers,this.add(l);let c=new $t(gs,xs,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,l]=t;for(let c of t)this.remove(c);if(e===Mn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===vs)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,d]=this.children,u=e.getRenderTarget(),h=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let p=!1;e.isWebGLRenderer===!0?p=e.state.buffers.depth.getReversed():p=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,2,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,3,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,d),e.setRenderTarget(u,h,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},Ia=class extends $t{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var ud="\\[\\]\\.:\\/",Xm=new RegExp("["+ud+"]","g"),fd="[^"+ud+"]",qm="[^"+ud.replace("\\.","")+"]",Ym=/((?:WC+[\/:])*)/.source.replace("WC",fd),$m=/(WCOD+)?/.source.replace("WCOD",qm),Zm=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",fd),Jm=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",fd),Km=new RegExp("^"+Ym+$m+Zm+Jm+"$"),jm=["material","materials","bones","map"],Bc=class{constructor(e,t,n){let s=n||bt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},bt=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Xm,"")}static parseTrackName(e){let t=Km.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);jm.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===t||a.uuid===t)return a;let l=n(a.children);if(l)return l}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){He("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){Xe("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Xe("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Xe("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let d=0;d<e.length;d++)if(e[d].name===c){c=d;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Xe("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Xe("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){Xe("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){Xe("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let o=e[s];if(o===void 0){let c=t.nodeName;Xe("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){Xe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Xe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};bt.Composite=Bc;bt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};bt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};bt.prototype.GetterByBindingType=[bt.prototype._getValue_direct,bt.prototype._getValue_array,bt.prototype._getValue_arrayElement,bt.prototype._getValue_toArray];bt.prototype.SetterByBindingTypeAndVersioning=[[bt.prototype._setValue_direct,bt.prototype._setValue_direct_setNeedsUpdate,bt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[bt.prototype._setValue_array,bt.prototype._setValue_array_setNeedsUpdate,bt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[bt.prototype._setValue_arrayElement,bt.prototype._setValue_arrayElement_setNeedsUpdate,bt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[bt.prototype._setValue_fromArray,bt.prototype._setValue_fromArray_setNeedsUpdate,bt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Rb=new Float32Array(1);var tu=new ht,Yi=class{constructor(e,t,n=0,s=1/0){this.ray=new ei(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new ws,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Xe("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return tu.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(tu),this}intersectObject(e,t=!0,n=[]){return kc(e,this,n,t),n.sort(nu),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)kc(e[s],this,n,t);return n.sort(nu),n}};function nu(i,e){return i.distance-e.distance}function kc(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let o=0,a=r.length;o<a;o++)kc(r[o],e,t,!0)}}var Ns=class{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=nt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(nt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var zc=class i{static{i.prototype.isMatrix2=!0}constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};var Ur=class extends xn{constructor(e=10,t=10,n=4473924,s=8947848){n=new je(n),s=new je(s);let r=t/2,o=e/t,a=e/2,l=[],c=[];for(let h=0,f=0,g=-a;h<=t;h++,g+=o){l.push(-a,0,g,a,0,g),l.push(g,0,-a,g,0,a);let v=h===r?n:s;v.toArray(c,f),f+=3,v.toArray(c,f),f+=3,v.toArray(c,f),f+=3,v.toArray(c,f),f+=3}let d=new ft;d.setAttribute("position",new Et(l,3)),d.setAttribute("color",new Et(c,3));let u=new gn({vertexColors:!0,toneMapped:!1});super(d,u),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}};var Fr=class extends xn{constructor(e=1){let t=[0,0,0,e,0,0,0,0,0,0,e,0,0,0,0,0,0,e],n=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],s=new ft;s.setAttribute("position",new Et(t,3)),s.setAttribute("color",new Et(n,3));let r=new gn({vertexColors:!0,toneMapped:!1});super(s,r),this.type="AxesHelper"}setColors(e,t,n){let s=new je,r=this.geometry.attributes.color.array;return s.set(e),s.toArray(r,0),s.toArray(r,3),s.set(t),s.toArray(r,6),s.toArray(r,9),s.set(n),s.toArray(r,12),s.toArray(r,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}};var Or=class extends wn{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){He("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};function pd(i,e,t,n){let s=Qm(n);switch(t){case sd:return i*e;case od:return i*e/s.components*s.byteLength;case Ba:return i*e/s.components*s.byteLength;case Ci:return i*e*2/s.components*s.byteLength;case ka:return i*e*2/s.components*s.byteLength;case rd:return i*e*3/s.components*s.byteLength;case yn:return i*e*4/s.components*s.byteLength;case za:return i*e*4/s.components*s.byteLength;case Hr:case Vr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Gr:case Wr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Va:case Wa:return Math.max(i,16)*Math.max(e,8)/4;case Ha:case Ga:return Math.max(i,8)*Math.max(e,8)/2;case Xa:case qa:case $a:case Za:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ya:case Xr:case Ja:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ka:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ja:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Qa:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case el:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case tl:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case nl:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case il:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case sl:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case rl:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case ol:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case al:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case ll:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case cl:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case dl:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case hl:case ul:case fl:return Math.ceil(i/4)*Math.ceil(e/4)*16;case pl:case ml:return Math.ceil(i/4)*Math.ceil(e/4)*8;case qr:case gl:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Qm(i){switch(i){case en:case ed:return{byteLength:1,components:1};case Fs:case td:case zn:return{byteLength:2,components:1};case Fa:case Oa:return{byteLength:2,components:4};case Cn:case Ua:case Rn:return{byteLength:4,components:1};case nd:case id:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"185"}}));typeof window<"u"&&(window.__THREE__?He("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="185");function gf(){let i=null,e=!1,t=null,n=null;function s(r,o){t(r,o),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function tg(i){let e=new WeakMap;function t(a,l){let c=a.array,d=a.usage,u=c.byteLength,h=i.createBuffer();i.bindBuffer(l,h),i.bufferData(l,c,d),a.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){let d=l.array,u=l.updateRanges;if(i.bindBuffer(c,a),u.length===0)i.bufferSubData(c,0,d);else{u.sort((f,g)=>f.start-g.start);let h=0;for(let f=1;f<u.length;f++){let g=u[h],v=u[f];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++h,u[h]=v)}u.length=h+1;for(let f=0,g=u.length;f<g;f++){let v=u[f];i.bufferSubData(c,v.start*d.BYTES_PER_ELEMENT,d,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=e.get(a);l&&(i.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let d=e.get(a);(!d||d.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var ng=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,ig=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,sg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,rg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,og=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ag=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,lg=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,cg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,dg=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,hg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,ug=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,fg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,pg=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,mg=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,gg=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,xg=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,yg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,_g=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,vg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,bg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Sg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Mg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,wg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Eg=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Tg=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Ag=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,Cg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Rg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Pg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ig=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Dg="gl_FragColor = linearToOutputTexel( gl_FragColor );",Lg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Ng=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Ug=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Fg=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Og=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Bg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,kg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,zg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Hg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Vg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Gg=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Wg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Xg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,qg=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Yg=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,$g=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Zg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Jg=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Kg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,jg=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Qg=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,e0=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,t0=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,n0=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,i0=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,s0=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,r0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,o0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,a0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,l0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,c0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,d0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,h0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,u0=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,f0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,p0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,m0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,g0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,x0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,y0=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,_0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,v0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,b0=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,S0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,M0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,w0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,E0=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,T0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,A0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,C0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,R0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,P0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,I0=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,D0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,L0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,N0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,U0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,F0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,O0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,B0=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,k0=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,z0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,H0=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,V0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,G0=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,W0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,X0=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,q0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Y0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,$0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Z0=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,J0=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,K0=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,j0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Q0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,ex=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,tx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,nx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,ix=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,rx=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ox=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ax=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,lx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,cx=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,dx=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,hx=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,ux=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,fx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,px=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,mx=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,gx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,xx=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,yx=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,_x=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vx=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,bx=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Sx=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Mx=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,wx=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ex=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Tx=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Ax=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Cx=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Rx=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Px=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Ix=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Dx=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Lx=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Nx=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Ux=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,it={alphahash_fragment:ng,alphahash_pars_fragment:ig,alphamap_fragment:sg,alphamap_pars_fragment:rg,alphatest_fragment:og,alphatest_pars_fragment:ag,aomap_fragment:lg,aomap_pars_fragment:cg,batching_pars_vertex:dg,batching_vertex:hg,begin_vertex:ug,beginnormal_vertex:fg,bsdfs:pg,iridescence_fragment:mg,bumpmap_pars_fragment:gg,clipping_planes_fragment:xg,clipping_planes_pars_fragment:yg,clipping_planes_pars_vertex:_g,clipping_planes_vertex:vg,color_fragment:bg,color_pars_fragment:Sg,color_pars_vertex:Mg,color_vertex:wg,common:Eg,cube_uv_reflection_fragment:Tg,defaultnormal_vertex:Ag,displacementmap_pars_vertex:Cg,displacementmap_vertex:Rg,emissivemap_fragment:Pg,emissivemap_pars_fragment:Ig,colorspace_fragment:Dg,colorspace_pars_fragment:Lg,envmap_fragment:Ng,envmap_common_pars_fragment:Ug,envmap_pars_fragment:Fg,envmap_pars_vertex:Og,envmap_physical_pars_fragment:$g,envmap_vertex:Bg,fog_vertex:kg,fog_pars_vertex:zg,fog_fragment:Hg,fog_pars_fragment:Vg,gradientmap_pars_fragment:Gg,lightmap_pars_fragment:Wg,lights_lambert_fragment:Xg,lights_lambert_pars_fragment:qg,lights_pars_begin:Yg,lights_toon_fragment:Zg,lights_toon_pars_fragment:Jg,lights_phong_fragment:Kg,lights_phong_pars_fragment:jg,lights_physical_fragment:Qg,lights_physical_pars_fragment:e0,lights_fragment_begin:t0,lights_fragment_maps:n0,lights_fragment_end:i0,lightprobes_pars_fragment:s0,logdepthbuf_fragment:r0,logdepthbuf_pars_fragment:o0,logdepthbuf_pars_vertex:a0,logdepthbuf_vertex:l0,map_fragment:c0,map_pars_fragment:d0,map_particle_fragment:h0,map_particle_pars_fragment:u0,metalnessmap_fragment:f0,metalnessmap_pars_fragment:p0,morphinstance_vertex:m0,morphcolor_vertex:g0,morphnormal_vertex:x0,morphtarget_pars_vertex:y0,morphtarget_vertex:_0,normal_fragment_begin:v0,normal_fragment_maps:b0,normal_pars_fragment:S0,normal_pars_vertex:M0,normal_vertex:w0,normalmap_pars_fragment:E0,clearcoat_normal_fragment_begin:T0,clearcoat_normal_fragment_maps:A0,clearcoat_pars_fragment:C0,iridescence_pars_fragment:R0,opaque_fragment:P0,packing:I0,premultiplied_alpha_fragment:D0,project_vertex:L0,dithering_fragment:N0,dithering_pars_fragment:U0,roughnessmap_fragment:F0,roughnessmap_pars_fragment:O0,shadowmap_pars_fragment:B0,shadowmap_pars_vertex:k0,shadowmap_vertex:z0,shadowmask_pars_fragment:H0,skinbase_vertex:V0,skinning_pars_vertex:G0,skinning_vertex:W0,skinnormal_vertex:X0,specularmap_fragment:q0,specularmap_pars_fragment:Y0,tonemapping_fragment:$0,tonemapping_pars_fragment:Z0,transmission_fragment:J0,transmission_pars_fragment:K0,uv_pars_fragment:j0,uv_pars_vertex:Q0,uv_vertex:ex,worldpos_vertex:tx,background_vert:nx,background_frag:ix,backgroundCube_vert:sx,backgroundCube_frag:rx,cube_vert:ox,cube_frag:ax,depth_vert:lx,depth_frag:cx,distance_vert:dx,distance_frag:hx,equirect_vert:ux,equirect_frag:fx,linedashed_vert:px,linedashed_frag:mx,meshbasic_vert:gx,meshbasic_frag:xx,meshlambert_vert:yx,meshlambert_frag:_x,meshmatcap_vert:vx,meshmatcap_frag:bx,meshnormal_vert:Sx,meshnormal_frag:Mx,meshphong_vert:wx,meshphong_frag:Ex,meshphysical_vert:Tx,meshphysical_frag:Ax,meshtoon_vert:Cx,meshtoon_frag:Rx,points_vert:Px,points_frag:Ix,shadow_vert:Dx,shadow_frag:Lx,sprite_vert:Nx,sprite_frag:Ux},Me={common:{diffuse:{value:new je(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ke}},envmap:{envMap:{value:null},envMapRotation:{value:new Ke},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ke},normalScale:{value:new le(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new je(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new I},probesMax:{value:new I},probesResolution:{value:new I}},points:{diffuse:{value:new je(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0},uvTransform:{value:new Ke}},sprite:{diffuse:{value:new je(16777215)},opacity:{value:1},center:{value:new le(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}}},Vn={basic:{uniforms:Zt([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.fog]),vertexShader:it.meshbasic_vert,fragmentShader:it.meshbasic_frag},lambert:{uniforms:Zt([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,Me.lights,{emissive:{value:new je(0)},envMapIntensity:{value:1}}]),vertexShader:it.meshlambert_vert,fragmentShader:it.meshlambert_frag},phong:{uniforms:Zt([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,Me.lights,{emissive:{value:new je(0)},specular:{value:new je(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:it.meshphong_vert,fragmentShader:it.meshphong_frag},standard:{uniforms:Zt([Me.common,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.roughnessmap,Me.metalnessmap,Me.fog,Me.lights,{emissive:{value:new je(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:it.meshphysical_vert,fragmentShader:it.meshphysical_frag},toon:{uniforms:Zt([Me.common,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.gradientmap,Me.fog,Me.lights,{emissive:{value:new je(0)}}]),vertexShader:it.meshtoon_vert,fragmentShader:it.meshtoon_frag},matcap:{uniforms:Zt([Me.common,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,{matcap:{value:null}}]),vertexShader:it.meshmatcap_vert,fragmentShader:it.meshmatcap_frag},points:{uniforms:Zt([Me.points,Me.fog]),vertexShader:it.points_vert,fragmentShader:it.points_frag},dashed:{uniforms:Zt([Me.common,Me.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:it.linedashed_vert,fragmentShader:it.linedashed_frag},depth:{uniforms:Zt([Me.common,Me.displacementmap]),vertexShader:it.depth_vert,fragmentShader:it.depth_frag},normal:{uniforms:Zt([Me.common,Me.bumpmap,Me.normalmap,Me.displacementmap,{opacity:{value:1}}]),vertexShader:it.meshnormal_vert,fragmentShader:it.meshnormal_frag},sprite:{uniforms:Zt([Me.sprite,Me.fog]),vertexShader:it.sprite_vert,fragmentShader:it.sprite_frag},background:{uniforms:{uvTransform:{value:new Ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:it.background_vert,fragmentShader:it.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ke}},vertexShader:it.backgroundCube_vert,fragmentShader:it.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:it.cube_vert,fragmentShader:it.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:it.equirect_vert,fragmentShader:it.equirect_frag},distance:{uniforms:Zt([Me.common,Me.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:it.distance_vert,fragmentShader:it.distance_frag},shadow:{uniforms:Zt([Me.lights,Me.fog,{color:{value:new je(0)},opacity:{value:1}}]),vertexShader:it.shadow_vert,fragmentShader:it.shadow_frag}};Vn.physical={uniforms:Zt([Vn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ke},clearcoatNormalScale:{value:new le(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ke},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ke},sheen:{value:0},sheenColor:{value:new je(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ke},transmissionSamplerSize:{value:new le},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ke},attenuationDistance:{value:0},attenuationColor:{value:new je(0)},specularColor:{value:new je(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ke},anisotropyVector:{value:new le},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ke}}]),vertexShader:it.meshphysical_vert,fragmentShader:it.meshphysical_frag};var vl={r:0,b:0,g:0},Fx=new ht,xf=new Ke;xf.set(-1,0,0,0,1,0,0,0,1);function Ox(i,e,t,n,s,r){let o=new je(0),a=s===!0?0:1,l,c,d=null,u=0,h=null;function f(A){let w=A.isScene===!0?A.background:null;if(w&&w.isTexture){let y=A.backgroundBlurriness>0;w=e.get(w,y)}return w}function g(A){let w=!1,y=f(A);y===null?p(o,a):y&&y.isColor&&(p(y,1),w=!0);let M=i.xr.getEnvironmentBlendMode();M==="additive"?t.buffers.color.setClear(0,0,0,1,r):M==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||w)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function v(A,w){let y=f(w);y&&(y.isCubeTexture||y.mapping===kr)?(c===void 0&&(c=new Pt(new Rs(1,1,1),new dn({name:"BackgroundCubeMaterial",uniforms:Zi(Vn.backgroundCube.uniforms),vertexShader:Vn.backgroundCube.vertexShader,fragmentShader:Vn.backgroundCube.fragmentShader,side:jt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(M,b,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=y,c.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Fx.makeRotationFromEuler(w.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(xf),c.material.toneMapped=ot.getTransfer(y.colorSpace)!==dt,(d!==y||u!==y.version||h!==i.toneMapping)&&(c.material.needsUpdate=!0,d=y,u=y.version,h=i.toneMapping),c.layers.enableAll(),A.unshift(c,c.geometry,c.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new Pt(new xi(2,2),new dn({name:"BackgroundMaterial",uniforms:Zi(Vn.background.uniforms),vertexShader:Vn.background.vertexShader,fragmentShader:Vn.background.fragmentShader,side:jn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,l.material.toneMapped=ot.getTransfer(y.colorSpace)!==dt,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(d!==y||u!==y.version||h!==i.toneMapping)&&(l.material.needsUpdate=!0,d=y,u=y.version,h=i.toneMapping),l.layers.enableAll(),A.unshift(l,l.geometry,l.material,0,0,null))}function p(A,w){A.getRGB(vl,hd(i)),t.buffers.color.setClear(vl.r,vl.g,vl.b,w,r)}function m(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(A,w=1){o.set(A),a=w,p(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(A){a=A,p(o,a)},render:g,addToRenderList:v,dispose:m}}function Bx(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=h(null),r=s,o=!1;function a(D,k,Z,J,B){let Y=!1,z=u(D,J,Z,k);r!==z&&(r=z,c(r.object)),Y=f(D,J,Z,B),Y&&g(D,J,Z,B),B!==null&&e.update(B,i.ELEMENT_ARRAY_BUFFER),(Y||o)&&(o=!1,y(D,k,Z,J),B!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(B).buffer))}function l(){return i.createVertexArray()}function c(D){return i.bindVertexArray(D)}function d(D){return i.deleteVertexArray(D)}function u(D,k,Z,J){let B=J.wireframe===!0,Y=n[k.id];Y===void 0&&(Y={},n[k.id]=Y);let z=D.isInstancedMesh===!0?D.id:0,X=Y[z];X===void 0&&(X={},Y[z]=X);let ne=X[Z.id];ne===void 0&&(ne={},X[Z.id]=ne);let he=ne[B];return he===void 0&&(he=h(l()),ne[B]=he),he}function h(D){let k=[],Z=[],J=[];for(let B=0;B<t;B++)k[B]=0,Z[B]=0,J[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:k,enabledAttributes:Z,attributeDivisors:J,object:D,attributes:{},index:null}}function f(D,k,Z,J){let B=r.attributes,Y=k.attributes,z=0,X=Z.getAttributes();for(let ne in X)if(X[ne].location>=0){let de=B[ne],Ae=Y[ne];if(Ae===void 0&&(ne==="instanceMatrix"&&D.instanceMatrix&&(Ae=D.instanceMatrix),ne==="instanceColor"&&D.instanceColor&&(Ae=D.instanceColor)),de===void 0||de.attribute!==Ae||Ae&&de.data!==Ae.data)return!0;z++}return r.attributesNum!==z||r.index!==J}function g(D,k,Z,J){let B={},Y=k.attributes,z=0,X=Z.getAttributes();for(let ne in X)if(X[ne].location>=0){let de=Y[ne];de===void 0&&(ne==="instanceMatrix"&&D.instanceMatrix&&(de=D.instanceMatrix),ne==="instanceColor"&&D.instanceColor&&(de=D.instanceColor));let Ae={};Ae.attribute=de,de&&de.data&&(Ae.data=de.data),B[ne]=Ae,z++}r.attributes=B,r.attributesNum=z,r.index=J}function v(){let D=r.newAttributes;for(let k=0,Z=D.length;k<Z;k++)D[k]=0}function p(D){m(D,0)}function m(D,k){let Z=r.newAttributes,J=r.enabledAttributes,B=r.attributeDivisors;Z[D]=1,J[D]===0&&(i.enableVertexAttribArray(D),J[D]=1),B[D]!==k&&(i.vertexAttribDivisor(D,k),B[D]=k)}function A(){let D=r.newAttributes,k=r.enabledAttributes;for(let Z=0,J=k.length;Z<J;Z++)k[Z]!==D[Z]&&(i.disableVertexAttribArray(Z),k[Z]=0)}function w(D,k,Z,J,B,Y,z){z===!0?i.vertexAttribIPointer(D,k,Z,B,Y):i.vertexAttribPointer(D,k,Z,J,B,Y)}function y(D,k,Z,J){v();let B=J.attributes,Y=Z.getAttributes(),z=k.defaultAttributeValues;for(let X in Y){let ne=Y[X];if(ne.location>=0){let he=B[X];if(he===void 0&&(X==="instanceMatrix"&&D.instanceMatrix&&(he=D.instanceMatrix),X==="instanceColor"&&D.instanceColor&&(he=D.instanceColor)),he!==void 0){let de=he.normalized,Ae=he.itemSize,Ze=e.get(he);if(Ze===void 0)continue;let Qe=Ze.buffer,Je=Ze.type,Q=Ze.bytesPerElement,fe=Je===i.INT||Je===i.UNSIGNED_INT||he.gpuType===Ua;if(he.isInterleavedBufferAttribute){let ae=he.data,Le=ae.stride,Ge=he.offset;if(ae.isInstancedInterleavedBuffer){for(let ze=0;ze<ne.locationSize;ze++)m(ne.location+ze,ae.meshPerAttribute);D.isInstancedMesh!==!0&&J._maxInstanceCount===void 0&&(J._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let ze=0;ze<ne.locationSize;ze++)p(ne.location+ze);i.bindBuffer(i.ARRAY_BUFFER,Qe);for(let ze=0;ze<ne.locationSize;ze++)w(ne.location+ze,Ae/ne.locationSize,Je,de,Le*Q,(Ge+Ae/ne.locationSize*ze)*Q,fe)}else{if(he.isInstancedBufferAttribute){for(let ae=0;ae<ne.locationSize;ae++)m(ne.location+ae,he.meshPerAttribute);D.isInstancedMesh!==!0&&J._maxInstanceCount===void 0&&(J._maxInstanceCount=he.meshPerAttribute*he.count)}else for(let ae=0;ae<ne.locationSize;ae++)p(ne.location+ae);i.bindBuffer(i.ARRAY_BUFFER,Qe);for(let ae=0;ae<ne.locationSize;ae++)w(ne.location+ae,Ae/ne.locationSize,Je,de,Ae*Q,Ae/ne.locationSize*ae*Q,fe)}}else if(z!==void 0){let de=z[X];if(de!==void 0)switch(de.length){case 2:i.vertexAttrib2fv(ne.location,de);break;case 3:i.vertexAttrib3fv(ne.location,de);break;case 4:i.vertexAttrib4fv(ne.location,de);break;default:i.vertexAttrib1fv(ne.location,de)}}}}A()}function M(){C();for(let D in n){let k=n[D];for(let Z in k){let J=k[Z];for(let B in J){let Y=J[B];for(let z in Y)d(Y[z].object),delete Y[z];delete J[B]}}delete n[D]}}function b(D){if(n[D.id]===void 0)return;let k=n[D.id];for(let Z in k){let J=k[Z];for(let B in J){let Y=J[B];for(let z in Y)d(Y[z].object),delete Y[z];delete J[B]}}delete n[D.id]}function R(D){for(let k in n){let Z=n[k];for(let J in Z){let B=Z[J];if(B[D.id]===void 0)continue;let Y=B[D.id];for(let z in Y)d(Y[z].object),delete Y[z];delete B[D.id]}}}function x(D){for(let k in n){let Z=n[k],J=D.isInstancedMesh===!0?D.id:0,B=Z[J];if(B!==void 0){for(let Y in B){let z=B[Y];for(let X in z)d(z[X].object),delete z[X];delete B[Y]}delete Z[J],Object.keys(Z).length===0&&delete n[k]}}}function C(){L(),o=!0,r!==s&&(r=s,c(r.object))}function L(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:C,resetDefaultState:L,dispose:M,releaseStatesOfGeometry:b,releaseStatesOfObject:x,releaseStatesOfProgram:R,initAttributes:v,enableAttribute:p,disableUnusedAttributes:A}}function kx(i,e,t){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),t.update(c,n,1)}function o(l,c,d){d!==0&&(i.drawArraysInstanced(n,l,c,d),t.update(c,n,d))}function a(l,c,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,d);let h=0;for(let f=0;f<d;f++)h+=c[f];t.update(h,n,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function zx(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let R=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(R){return!(R!==yn&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(R){let x=R===zn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==en&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==Rn&&!x)}function l(R){if(R==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",d=l(c);d!==c&&(He("WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);let u=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&h===!1&&He("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),p=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),A=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),w=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),M=i.getParameter(i.MAX_SAMPLES),b=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:h,maxTextures:f,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:p,maxAttributes:m,maxVertexUniforms:A,maxVaryings:w,maxFragmentUniforms:y,maxSamples:M,samples:b}}function Hx(i){let e=this,t=null,n=0,s=!1,r=!1,o=new mn,a=new Ke,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,h){let f=u.length!==0||h||n!==0||s;return s=h,n=u.length,f},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,h){t=d(u,h,0)},this.setState=function(u,h,f){let g=u.clippingPlanes,v=u.clipIntersection,p=u.clipShadows,m=i.get(u);if(!s||g===null||g.length===0||r&&!p)r?d(null):c();else{let A=r?0:n,w=A*4,y=m.clippingState||null;l.value=y,y=d(g,h,w,f);for(let M=0;M!==w;++M)y[M]=t[M];m.clippingState=y,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=A}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function d(u,h,f,g){let v=u!==null?u.length:0,p=null;if(v!==0){if(p=l.value,g!==!0||p===null){let m=f+v*4,A=h.matrixWorldInverse;a.getNormalMatrix(A),(p===null||p.length<m)&&(p=new Float32Array(m));for(let w=0,y=f;w!==v;++w,y+=4)o.copy(u[w]).applyMatrix4(A,a),o.normal.toArray(p,y),p[y+3]=o.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,p}}var Ri=4,Yu=[.125,.215,.35,.446,.526,.582],Ji=20,Vx=256,Yr=new bi,$u=new je,md=null,gd=0,xd=0,yd=!1,Gx=new I,Sl=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){let{size:o=256,position:a=Gx}=r;md=this._renderer.getRenderTarget(),gd=this._renderer.getActiveCubeFace(),xd=this._renderer.getActiveMipmapLevel(),yd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,s,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ku(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ju(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(md,gd,xd),this._renderer.xr.enabled=yd,e.scissorTest=!1,Bs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ei||e.mapping===$i?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),md=this._renderer.getRenderTarget(),gd=this._renderer.getActiveCubeFace(),xd=this._renderer.getActiveMipmapLevel(),yd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Gt,minFilter:Gt,generateMipmaps:!1,type:zn,format:yn,colorSpace:dr,depthBuffer:!1},s=Zu(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Zu(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Wx(r)),this._blurMaterial=qx(r,e,t),this._ggxMaterial=Xx(r,e,t)}return s}_compileMaterial(e){let t=new Pt(new ft,e);this._renderer.compile(t,Yr)}_sceneToCubeUV(e,t,n,s,r){let l=new $t(90,1,t,n),c=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,f=u.toneMapping;u.getClearColor($u),u.toneMapping=An,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Pt(new Rs,new Qt({name:"PMREM.Background",side:jt,depthWrite:!1,depthTest:!1})));let v=this._backgroundBox,p=v.material,m=!1,A=e.background;A?A.isColor&&(p.color.copy(A),e.background=null,m=!0):(p.color.copy($u),m=!0);for(let w=0;w<6;w++){let y=w%3;y===0?(l.up.set(0,c[w],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+d[w],r.y,r.z)):y===1?(l.up.set(0,0,c[w]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+d[w],r.z)):(l.up.set(0,c[w],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+d[w]));let M=this._cubeSize;Bs(s,y*M,w>2?M:0,M,M),u.setRenderTarget(s),m&&u.render(v,l),u.render(e,l)}u.toneMapping=f,u.autoClear=h,e.background=A}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===Ei||e.mapping===$i;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ku()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ju());let r=s?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;let a=r.uniforms;a.envMap.value=e;let l=this._cubeSize;Bs(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,Yr)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){let s=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[n];a.material=o;let l=o.uniforms,c=n/(this._lodMeshes.length-1),d=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-d*d),h=0+c*1.25,f=u*h,{_lodMax:g}=this,v=this._sizeLods[n],p=3*v*(n>g-Ri?n-g+Ri:0),m=4*(this._cubeSize-v);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=g-t,Bs(r,p,m,3*v,2*v),s.setRenderTarget(r),s.render(a,Yr),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=g-n,Bs(e,p,m,3*v,2*v),s.setRenderTarget(e),s.render(a,Yr)}_blur(e,t,n,s,r){let o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,s,"latitudinal",r),this._halfBlur(o,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,o,a){let l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&Xe("blur direction must be either latitudinal or longitudinal!");let d=3,u=this._lodMeshes[s];u.material=c;let h=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Ji-1),v=r/g,p=isFinite(r)?1+Math.floor(d*v):Ji;p>Ji&&He(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Ji}`);let m=[],A=0;for(let R=0;R<Ji;++R){let x=R/v,C=Math.exp(-x*x/2);m.push(C),R===0?A+=C:R<p&&(A+=2*C)}for(let R=0;R<m.length;R++)m[R]=m[R]/A;h.envMap.value=e.texture,h.samples.value=p,h.weights.value=m,h.latitudinal.value=o==="latitudinal",a&&(h.poleAxis.value=a);let{_lodMax:w}=this;h.dTheta.value=g,h.mipInt.value=w-n;let y=this._sizeLods[s],M=3*y*(s>w-Ri?s-w+Ri:0),b=4*(this._cubeSize-y);Bs(t,M,b,3*y,2*y),l.setRenderTarget(t),l.render(u,Yr)}};function Wx(i){let e=[],t=[],n=[],s=i,r=i-Ri+1+Yu.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);e.push(a);let l=1/a;o>i-Ri?l=Yu[o-i+Ri-1]:o===0&&(l=0),t.push(l);let c=1/(a-2),d=-c,u=1+c,h=[d,d,u,d,u,u,d,d,u,u,d,u],f=6,g=6,v=3,p=2,m=1,A=new Float32Array(v*g*f),w=new Float32Array(p*g*f),y=new Float32Array(m*g*f);for(let b=0;b<f;b++){let R=b%3*2/3-1,x=b>2?0:-1,C=[R,x,0,R+2/3,x,0,R+2/3,x+1,0,R,x,0,R+2/3,x+1,0,R,x+1,0];A.set(C,v*g*b),w.set(h,p*g*b);let L=[b,b,b,b,b,b];y.set(L,m*g*b)}let M=new ft;M.setAttribute("position",new St(A,v)),M.setAttribute("uv",new St(w,p)),M.setAttribute("faceIndex",new St(y,m)),n.push(new Pt(M,null)),s>Ri&&s--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function Zu(i,e,t){let n=new ln(i,e,t);return n.texture.mapping=kr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Bs(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function Xx(i,e,t){return new dn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Vx,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:wl(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:kn,depthTest:!1,depthWrite:!1})}function qx(i,e,t){let n=new Float32Array(Ji),s=new I(0,1,0);return new dn({name:"SphericalGaussianBlur",defines:{n:Ji,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:wl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:kn,depthTest:!1,depthWrite:!1})}function Ju(){return new dn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:wl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:kn,depthTest:!1,depthWrite:!1})}function Ku(){return new dn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:wl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:kn,depthTest:!1,depthWrite:!1})}function wl(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}var Ml=class extends ln{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new vr(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Rs(5,5,5),r=new dn({name:"CubemapFromEquirect",uniforms:Zi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:jt,blending:kn});r.uniforms.tEquirect.value=t;let o=new Pt(s,r),a=t.minFilter;return t.minFilter===Ti&&(t.minFilter=Gt),new Pa(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){let r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}};function Yx(i){let e=new WeakMap,t=new WeakMap,n=null;function s(h,f=!1){return h==null?null:f?o(h):r(h)}function r(h){if(h&&h.isTexture){let f=h.mapping;if(f===Da||f===La)if(e.has(h)){let g=e.get(h).texture;return a(g,h.mapping)}else{let g=h.image;if(g&&g.height>0){let v=new Ml(g.height);return v.fromEquirectangularTexture(i,h),e.set(h,v),h.addEventListener("dispose",c),a(v.texture,h.mapping)}else return null}}return h}function o(h){if(h&&h.isTexture){let f=h.mapping,g=f===Da||f===La,v=f===Ei||f===$i;if(g||v){let p=t.get(h),m=p!==void 0?p.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==m)return n===null&&(n=new Sl(i)),p=g?n.fromEquirectangular(h,p):n.fromCubemap(h,p),p.texture.pmremVersion=h.pmremVersion,t.set(h,p),p.texture;if(p!==void 0)return p.texture;{let A=h.image;return g&&A&&A.height>0||v&&A&&l(A)?(n===null&&(n=new Sl(i)),p=g?n.fromEquirectangular(h):n.fromCubemap(h),p.texture.pmremVersion=h.pmremVersion,t.set(h,p),h.addEventListener("dispose",d),p.texture):null}}}return h}function a(h,f){return f===Da?h.mapping=Ei:f===La&&(h.mapping=$i),h}function l(h){let f=0,g=6;for(let v=0;v<g;v++)h[v]!==void 0&&f++;return f===g}function c(h){let f=h.target;f.removeEventListener("dispose",c);let g=e.get(f);g!==void 0&&(e.delete(f),g.dispose())}function d(h){let f=h.target;f.removeEventListener("dispose",d);let g=t.get(f);g!==void 0&&(t.delete(f),g.dispose())}function u(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:u}}function $x(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&Vi("WebGLRenderer: "+n+" extension not supported."),s}}}function Zx(i,e,t,n){let s={},r=new WeakMap;function o(u){let h=u.target;h.index!==null&&e.remove(h.index);for(let g in h.attributes)e.remove(h.attributes[g]);h.removeEventListener("dispose",o),delete s[h.id];let f=r.get(h);f&&(e.remove(f),r.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function a(u,h){return s[h.id]===!0||(h.addEventListener("dispose",o),s[h.id]=!0,t.memory.geometries++),h}function l(u){let h=u.attributes;for(let f in h)e.update(h[f],i.ARRAY_BUFFER)}function c(u){let h=[],f=u.index,g=u.attributes.position,v=0;if(g===void 0)return;if(f!==null){let A=f.array;v=f.version;for(let w=0,y=A.length;w<y;w+=3){let M=A[w+0],b=A[w+1],R=A[w+2];h.push(M,b,b,R,R,M)}}else{let A=g.array;v=g.version;for(let w=0,y=A.length/3-1;w<y;w+=3){let M=w+0,b=w+1,R=w+2;h.push(M,b,b,R,R,M)}}let p=new(g.count>=65535?gr:mr)(h,1);p.version=v;let m=r.get(u);m&&e.remove(m),r.set(u,p)}function d(u){let h=r.get(u);if(h){let f=u.index;f!==null&&h.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:d}}function Jx(i,e,t){let n;function s(u){n=u}let r,o;function a(u){r=u.type,o=u.bytesPerElement}function l(u,h){i.drawElements(n,h,r,u*o),t.update(h,n,1)}function c(u,h,f){f!==0&&(i.drawElementsInstanced(n,h,r,u*o,f),t.update(h,n,f))}function d(u,h,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,h,0,r,u,0,f);let v=0;for(let p=0;p<f;p++)v+=h[p];t.update(v,n,1)}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=d}function Kx(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:Xe("WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function jx(i,e,t){let n=new WeakMap,s=new Mt;function r(o,a,l){let c=o.morphTargetInfluences,d=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=d!==void 0?d.length:0,h=n.get(a);if(h===void 0||h.count!==u){let C=function(){R.dispose(),n.delete(a),a.removeEventListener("dispose",C)};h!==void 0&&h.texture.dispose();let f=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,v=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],m=a.morphAttributes.normal||[],A=a.morphAttributes.color||[],w=0;f===!0&&(w=1),g===!0&&(w=2),v===!0&&(w=3);let y=a.attributes.position.count*w,M=1;y>e.maxTextureSize&&(M=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);let b=new Float32Array(y*M*4*u),R=new pr(b,y,M,u);R.type=Rn,R.needsUpdate=!0;let x=w*4;for(let L=0;L<u;L++){let D=p[L],k=m[L],Z=A[L],J=y*M*4*L;for(let B=0;B<D.count;B++){let Y=B*x;f===!0&&(s.fromBufferAttribute(D,B),b[J+Y+0]=s.x,b[J+Y+1]=s.y,b[J+Y+2]=s.z,b[J+Y+3]=0),g===!0&&(s.fromBufferAttribute(k,B),b[J+Y+4]=s.x,b[J+Y+5]=s.y,b[J+Y+6]=s.z,b[J+Y+7]=0),v===!0&&(s.fromBufferAttribute(Z,B),b[J+Y+8]=s.x,b[J+Y+9]=s.y,b[J+Y+10]=s.z,b[J+Y+11]=Z.itemSize===4?s.w:1)}}h={count:u,texture:R,size:new le(y,M)},n.set(a,h),a.addEventListener("dispose",C)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let f=0;for(let v=0;v<c.length;v++)f+=c[v];let g=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:r}}function Qx(i,e,t,n,s){let r=new WeakMap;function o(c){let d=s.render.frame,u=c.geometry,h=e.get(c,u);if(r.get(h)!==d&&(e.update(h),r.set(h,d)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==d&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,d))),c.isSkinnedMesh){let f=c.skeleton;r.get(f)!==d&&(f.update(),r.set(f,d))}return h}function a(){r=new WeakMap}function l(c){let d=c.target;d.removeEventListener("dispose",l),n.releaseStatesOfObject(d),t.remove(d.instanceMatrix),d.instanceColor!==null&&t.remove(d.instanceColor)}return{update:o,dispose:a}}var ey={[qc]:"LINEAR_TONE_MAPPING",[Yc]:"REINHARD_TONE_MAPPING",[$c]:"CINEON_TONE_MAPPING",[Zc]:"ACES_FILMIC_TONE_MAPPING",[Kc]:"AGX_TONE_MAPPING",[jc]:"NEUTRAL_TONE_MAPPING",[Jc]:"CUSTOM_TONE_MAPPING"};function ty(i,e,t,n,s,r){let o=new ln(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,depthTexture:s?new ti(e,t):void 0}),a=new ln(e,t,{type:zn,depthBuffer:!1,stencilBuffer:!1}),l=new ft;l.setAttribute("position",new Et([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new Et([0,2,0,0,2,0],2));let c=new xa({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new Pt(l,c),u=new bi(-1,1,1,-1,0,1),h=null,f=null,g=!1,v,p=null,m=[],A=!1;this.setSize=function(w,y){o.setSize(w,y),a.setSize(w,y);for(let M=0;M<m.length;M++){let b=m[M];b.setSize&&b.setSize(w,y)}},this.setEffects=function(w){m=w,A=m.length>0&&m[0].isRenderPass===!0;let y=o.width,M=o.height;for(let b=0;b<m.length;b++){let R=m[b];R.setSize&&R.setSize(y,M)}},this.begin=function(w,y){if(g||w.toneMapping===An&&m.length===0)return!1;if(p=y,y!==null){let M=y.width,b=y.height;(o.width!==M||o.height!==b)&&this.setSize(M,b)}return A===!1&&w.setRenderTarget(o),v=w.toneMapping,w.toneMapping=An,!0},this.hasRenderPass=function(){return A},this.end=function(w,y){w.toneMapping=v,g=!0;let M=o,b=a;for(let R=0;R<m.length;R++){let x=m[R];if(x.enabled!==!1&&(x.render(w,b,M,y),x.needsSwap!==!1)){let C=M;M=b,b=C}}if(h!==w.outputColorSpace||f!==w.toneMapping){h=w.outputColorSpace,f=w.toneMapping,c.defines={},ot.getTransfer(h)===dt&&(c.defines.SRGB_TRANSFER="");let R=ey[f];R&&(c.defines[R]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=M.texture,w.setRenderTarget(p),w.render(d,u),p=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){o.depthTexture&&o.depthTexture.dispose(),o.dispose(),a.dispose(),l.dispose(),c.dispose()}}var yf=new Kt,bd=new ti(1,1),_f=new pr,vf=new sa,bf=new vr,ju=[],Qu=[],ef=new Float32Array(16),tf=new Float32Array(9),nf=new Float32Array(4);function Hs(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=ju[s];if(r===void 0&&(r=new Float32Array(s),ju[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function Ut(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Ft(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function El(i,e){let t=Qu[e];t===void 0&&(t=new Int32Array(e),Qu[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function ny(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function iy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ut(t,e))return;i.uniform2fv(this.addr,e),Ft(t,e)}}function sy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ut(t,e))return;i.uniform3fv(this.addr,e),Ft(t,e)}}function ry(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ut(t,e))return;i.uniform4fv(this.addr,e),Ft(t,e)}}function oy(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ut(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Ft(t,e)}else{if(Ut(t,n))return;nf.set(n),i.uniformMatrix2fv(this.addr,!1,nf),Ft(t,n)}}function ay(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ut(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Ft(t,e)}else{if(Ut(t,n))return;tf.set(n),i.uniformMatrix3fv(this.addr,!1,tf),Ft(t,n)}}function ly(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ut(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Ft(t,e)}else{if(Ut(t,n))return;ef.set(n),i.uniformMatrix4fv(this.addr,!1,ef),Ft(t,n)}}function cy(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function dy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ut(t,e))return;i.uniform2iv(this.addr,e),Ft(t,e)}}function hy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ut(t,e))return;i.uniform3iv(this.addr,e),Ft(t,e)}}function uy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ut(t,e))return;i.uniform4iv(this.addr,e),Ft(t,e)}}function fy(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function py(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ut(t,e))return;i.uniform2uiv(this.addr,e),Ft(t,e)}}function my(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ut(t,e))return;i.uniform3uiv(this.addr,e),Ft(t,e)}}function gy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ut(t,e))return;i.uniform4uiv(this.addr,e),Ft(t,e)}}function xy(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(bd.compareFunction=t.isReversedDepthBuffer()?_l:yl,r=bd):r=yf,t.setTexture2D(e||r,s)}function yy(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||vf,s)}function _y(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||bf,s)}function vy(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||_f,s)}function by(i){switch(i){case 5126:return ny;case 35664:return iy;case 35665:return sy;case 35666:return ry;case 35674:return oy;case 35675:return ay;case 35676:return ly;case 5124:case 35670:return cy;case 35667:case 35671:return dy;case 35668:case 35672:return hy;case 35669:case 35673:return uy;case 5125:return fy;case 36294:return py;case 36295:return my;case 36296:return gy;case 35678:case 36198:case 36298:case 36306:case 35682:return xy;case 35679:case 36299:case 36307:return yy;case 35680:case 36300:case 36308:case 36293:return _y;case 36289:case 36303:case 36311:case 36292:return vy}}function Sy(i,e){i.uniform1fv(this.addr,e)}function My(i,e){let t=Hs(e,this.size,2);i.uniform2fv(this.addr,t)}function wy(i,e){let t=Hs(e,this.size,3);i.uniform3fv(this.addr,t)}function Ey(i,e){let t=Hs(e,this.size,4);i.uniform4fv(this.addr,t)}function Ty(i,e){let t=Hs(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Ay(i,e){let t=Hs(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Cy(i,e){let t=Hs(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Ry(i,e){i.uniform1iv(this.addr,e)}function Py(i,e){i.uniform2iv(this.addr,e)}function Iy(i,e){i.uniform3iv(this.addr,e)}function Dy(i,e){i.uniform4iv(this.addr,e)}function Ly(i,e){i.uniform1uiv(this.addr,e)}function Ny(i,e){i.uniform2uiv(this.addr,e)}function Uy(i,e){i.uniform3uiv(this.addr,e)}function Fy(i,e){i.uniform4uiv(this.addr,e)}function Oy(i,e,t){let n=this.cache,s=e.length,r=El(t,s);Ut(n,r)||(i.uniform1iv(this.addr,r),Ft(n,r));let o;this.type===i.SAMPLER_2D_SHADOW?o=bd:o=yf;for(let a=0;a!==s;++a)t.setTexture2D(e[a]||o,r[a])}function By(i,e,t){let n=this.cache,s=e.length,r=El(t,s);Ut(n,r)||(i.uniform1iv(this.addr,r),Ft(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||vf,r[o])}function ky(i,e,t){let n=this.cache,s=e.length,r=El(t,s);Ut(n,r)||(i.uniform1iv(this.addr,r),Ft(n,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||bf,r[o])}function zy(i,e,t){let n=this.cache,s=e.length,r=El(t,s);Ut(n,r)||(i.uniform1iv(this.addr,r),Ft(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||_f,r[o])}function Hy(i){switch(i){case 5126:return Sy;case 35664:return My;case 35665:return wy;case 35666:return Ey;case 35674:return Ty;case 35675:return Ay;case 35676:return Cy;case 5124:case 35670:return Ry;case 35667:case 35671:return Py;case 35668:case 35672:return Iy;case 35669:case 35673:return Dy;case 5125:return Ly;case 36294:return Ny;case 36295:return Uy;case 36296:return Fy;case 35678:case 36198:case 36298:case 36306:case 35682:return Oy;case 35679:case 36299:case 36307:return By;case 35680:case 36300:case 36308:case 36293:return ky;case 36289:case 36303:case 36311:case 36292:return zy}}var Sd=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=by(t.type)}},Md=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Hy(t.type)}},wd=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(e,t[a.id],n)}}},_d=/(\w+)(\])?(\[|\.)?/g;function sf(i,e){i.seq.push(e),i.map[e.id]=e}function Vy(i,e,t){let n=i.name,s=n.length;for(_d.lastIndex=0;;){let r=_d.exec(n),o=_d.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){sf(t,c===void 0?new Sd(a,i,e):new Md(a,i,e));break}else{let u=t.map[a];u===void 0&&(u=new wd(a),sf(t,u)),t=u}}}var ks=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){let a=e.getActiveUniform(t,o),l=e.getUniformLocation(t,a.name);Vy(a,l,this)}let s=[],r=[];for(let o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){let a=t[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let o=e[s];o.id in t&&n.push(o)}return n}};function rf(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var Gy=37297,Wy=0;function Xy(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}var of=new Ke;function qy(i){ot._getMatrix(of,ot.workingColorSpace,i);let e=`mat3( ${of.elements.map(t=>t.toFixed(4))} )`;switch(ot.getTransfer(i)){case hr:return[e,"LinearTransferOETF"];case dt:return[e,"sRGBTransferOETF"];default:return He("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function af(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+Xy(i.getShaderSource(e),a)}else return r}function Yy(i,e){let t=qy(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var $y={[qc]:"Linear",[Yc]:"Reinhard",[$c]:"Cineon",[Zc]:"ACESFilmic",[Kc]:"AgX",[jc]:"Neutral",[Jc]:"Custom"};function Zy(i,e){let t=$y[e];return t===void 0?(He("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var bl=new I;function Jy(){ot.getLuminanceCoefficients(bl);let i=bl.x.toFixed(4),e=bl.y.toFixed(4),t=bl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Ky(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Zr).join(`
`)}function jy(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Qy(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function Zr(i){return i!==""}function lf(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function cf(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var e_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ed(i){return i.replace(e_,n_)}var t_=new Map;function n_(i,e){let t=it[e];if(t===void 0){let n=t_.get(e);if(n!==void 0)t=it[n],He('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Ed(t)}var i_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function df(i){return i.replace(i_,s_)}function s_(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function hf(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}var r_={[Br]:"SHADOWMAP_TYPE_PCF",[Us]:"SHADOWMAP_TYPE_VSM"};function o_(i){return r_[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var a_={[Ei]:"ENVMAP_TYPE_CUBE",[$i]:"ENVMAP_TYPE_CUBE",[kr]:"ENVMAP_TYPE_CUBE_UV"};function l_(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":a_[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var c_={[$i]:"ENVMAP_MODE_REFRACTION"};function d_(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":c_[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var h_={[Xc]:"ENVMAP_BLENDING_MULTIPLY",[wu]:"ENVMAP_BLENDING_MIX",[Eu]:"ENVMAP_BLENDING_ADD"};function u_(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":h_[i.combine]||"ENVMAP_BLENDING_NONE"}function f_(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function p_(i,e,t,n){let s=i.getContext(),r=t.defines,o=t.vertexShader,a=t.fragmentShader,l=o_(t),c=l_(t),d=d_(t),u=u_(t),h=f_(t),f=Ky(t),g=jy(r),v=s.createProgram(),p,m,A=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Zr).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Zr).join(`
`),m.length>0&&(m+=`
`)):(p=[hf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Zr).join(`
`),m=[hf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+d:"",t.envMap?"#define "+u:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==An?"#define TONE_MAPPING":"",t.toneMapping!==An?it.tonemapping_pars_fragment:"",t.toneMapping!==An?Zy("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",it.colorspace_pars_fragment,Yy("linearToOutputTexel",t.outputColorSpace),Jy(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Zr).join(`
`)),o=Ed(o),o=lf(o,t),o=cf(o,t),a=Ed(a),a=lf(a,t),a=cf(a,t),o=df(o),a=df(a),t.isRawShaderMaterial!==!0&&(A=`#version 300 es
`,p=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",t.glslVersion===ad?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ad?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let w=A+p+o,y=A+m+a,M=rf(s,s.VERTEX_SHADER,w),b=rf(s,s.FRAGMENT_SHADER,y);s.attachShader(v,M),s.attachShader(v,b),t.index0AttributeName!==void 0?s.bindAttribLocation(v,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function R(D){if(i.debug.checkShaderErrors){let k=s.getProgramInfoLog(v)||"",Z=s.getShaderInfoLog(M)||"",J=s.getShaderInfoLog(b)||"",B=k.trim(),Y=Z.trim(),z=J.trim(),X=!0,ne=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(X=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,M,b);else{let he=af(s,M,"vertex"),de=af(s,b,"fragment");Xe("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+B+`
`+he+`
`+de)}else B!==""?He("WebGLProgram: Program Info Log:",B):(Y===""||z==="")&&(ne=!1);ne&&(D.diagnostics={runnable:X,programLog:B,vertexShader:{log:Y,prefix:p},fragmentShader:{log:z,prefix:m}})}s.deleteShader(M),s.deleteShader(b),x=new ks(s,v),C=Qy(s,v)}let x;this.getUniforms=function(){return x===void 0&&R(this),x};let C;this.getAttributes=function(){return C===void 0&&R(this),C};let L=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return L===!1&&(L=s.getProgramParameter(v,Gy)),L},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Wy++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=M,this.fragmentShader=b,this}var m_=0,Td=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Ad(e),t.set(e,n)),n}},Ad=class{constructor(e){this.id=m_++,this.code=e,this.usedTimes=0}};function g_(i){return i===Ci||i===Xr||i===qr}function x_(i,e,t,n,s,r){let o=new ws,a=new Td,l=new Set,c=[],d=new Map,u=n.logarithmicDepthBuffer,h=n.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(x){return l.add(x),x===0?"uv":`uv${x}`}function v(x,C,L,D,k,Z){let J=D.fog,B=k.geometry,Y=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?D.environment:null,z=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,X=e.get(x.envMap||Y,z),ne=X&&X.mapping===kr?X.image.height:null,he=f[x.type];x.precision!==null&&(h=n.getMaxPrecision(x.precision),h!==x.precision&&He("WebGLProgram.getParameters:",x.precision,"not supported, using",h,"instead."));let de=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,Ae=de!==void 0?de.length:0,Ze=0;B.morphAttributes.position!==void 0&&(Ze=1),B.morphAttributes.normal!==void 0&&(Ze=2),B.morphAttributes.color!==void 0&&(Ze=3);let Qe,Je,Q,fe;if(he){let Pe=Vn[he];Qe=Pe.vertexShader,Je=Pe.fragmentShader}else{Qe=x.vertexShader,Je=x.fragmentShader;let Pe=a.getVertexShaderStage(x),Tt=a.getFragmentShaderStage(x);a.update(x,Pe,Tt),Q=Pe.id,fe=Tt.id}let ae=i.getRenderTarget(),Le=i.state.buffers.depth.getReversed(),Ge=k.isInstancedMesh===!0,ze=k.isBatchedMesh===!0,at=!!x.map,$e=!!x.matcap,ie=!!X,oe=!!x.aoMap,re=!!x.lightMap,ge=!!x.bumpMap&&x.wireframe===!1,me=!!x.normalMap,We=!!x.displacementMap,Ne=!!x.emissiveMap,qe=!!x.metalnessMap,N=!!x.roughnessMap,P=x.anisotropy>0,be=x.clearcoat>0,ce=x.dispersion>0,E=x.iridescence>0,_=x.sheen>0,H=x.transmission>0,W=P&&!!x.anisotropyMap,K=be&&!!x.clearcoatMap,ue=be&&!!x.clearcoatNormalMap,pe=be&&!!x.clearcoatRoughnessMap,j=E&&!!x.iridescenceMap,te=E&&!!x.iridescenceThicknessMap,ye=_&&!!x.sheenColorMap,Fe=_&&!!x.sheenRoughnessMap,Se=!!x.specularMap,_e=!!x.specularColorMap,Ve=!!x.specularIntensityMap,Ye=H&&!!x.transmissionMap,et=H&&!!x.thicknessMap,U=!!x.gradientMap,xe=!!x.alphaMap,ee=x.alphaTest>0,ve=!!x.alphaHash,Te=!!x.extensions,se=An;x.toneMapped&&(ae===null||ae.isXRRenderTarget===!0)&&(se=i.toneMapping);let Ue={shaderID:he,shaderType:x.type,shaderName:x.name,vertexShader:Qe,fragmentShader:Je,defines:x.defines,customVertexShaderID:Q,customFragmentShaderID:fe,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:h,batching:ze,batchingColor:ze&&k._colorsTexture!==null,instancing:Ge,instancingColor:Ge&&k.instanceColor!==null,instancingMorph:Ge&&k.morphTexture!==null,outputColorSpace:ae===null?i.outputColorSpace:ae.isXRRenderTarget===!0?ae.texture.colorSpace:ot.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:at,matcap:$e,envMap:ie,envMapMode:ie&&X.mapping,envMapCubeUVHeight:ne,aoMap:oe,lightMap:re,bumpMap:ge,normalMap:me,displacementMap:We,emissiveMap:Ne,normalMapObjectSpace:me&&x.normalMapType===Cu,normalMapTangentSpace:me&&x.normalMapType===xl,packedNormalMap:me&&x.normalMapType===xl&&g_(x.normalMap.format),metalnessMap:qe,roughnessMap:N,anisotropy:P,anisotropyMap:W,clearcoat:be,clearcoatMap:K,clearcoatNormalMap:ue,clearcoatRoughnessMap:pe,dispersion:ce,iridescence:E,iridescenceMap:j,iridescenceThicknessMap:te,sheen:_,sheenColorMap:ye,sheenRoughnessMap:Fe,specularMap:Se,specularColorMap:_e,specularIntensityMap:Ve,transmission:H,transmissionMap:Ye,thicknessMap:et,gradientMap:U,opaque:x.transparent===!1&&x.blending===Gi&&x.alphaToCoverage===!1,alphaMap:xe,alphaTest:ee,alphaHash:ve,combine:x.combine,mapUv:at&&g(x.map.channel),aoMapUv:oe&&g(x.aoMap.channel),lightMapUv:re&&g(x.lightMap.channel),bumpMapUv:ge&&g(x.bumpMap.channel),normalMapUv:me&&g(x.normalMap.channel),displacementMapUv:We&&g(x.displacementMap.channel),emissiveMapUv:Ne&&g(x.emissiveMap.channel),metalnessMapUv:qe&&g(x.metalnessMap.channel),roughnessMapUv:N&&g(x.roughnessMap.channel),anisotropyMapUv:W&&g(x.anisotropyMap.channel),clearcoatMapUv:K&&g(x.clearcoatMap.channel),clearcoatNormalMapUv:ue&&g(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:pe&&g(x.clearcoatRoughnessMap.channel),iridescenceMapUv:j&&g(x.iridescenceMap.channel),iridescenceThicknessMapUv:te&&g(x.iridescenceThicknessMap.channel),sheenColorMapUv:ye&&g(x.sheenColorMap.channel),sheenRoughnessMapUv:Fe&&g(x.sheenRoughnessMap.channel),specularMapUv:Se&&g(x.specularMap.channel),specularColorMapUv:_e&&g(x.specularColorMap.channel),specularIntensityMapUv:Ve&&g(x.specularIntensityMap.channel),transmissionMapUv:Ye&&g(x.transmissionMap.channel),thicknessMapUv:et&&g(x.thicknessMap.channel),alphaMapUv:xe&&g(x.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(me||P),vertexNormals:!!B.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!B.attributes.uv&&(at||xe),fog:!!J,useFog:x.fog===!0,fogExp2:!!J&&J.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||B.attributes.normal===void 0&&me===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:Le,skinning:k.isSkinnedMesh===!0,hasPositionAttribute:B.attributes.position!==void 0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:Ae,morphTextureStride:Ze,numDirLights:C.directional.length,numPointLights:C.point.length,numSpotLights:C.spot.length,numSpotLightMaps:C.spotLightMap.length,numRectAreaLights:C.rectArea.length,numHemiLights:C.hemi.length,numDirLightShadows:C.directionalShadowMap.length,numPointLightShadows:C.pointShadowMap.length,numSpotLightShadows:C.spotShadowMap.length,numSpotLightShadowsWithMaps:C.numSpotLightShadowsWithMaps,numLightProbes:C.numLightProbes,numLightProbeGrids:Z.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&L.length>0,shadowMapType:i.shadowMap.type,toneMapping:se,decodeVideoTexture:at&&x.map.isVideoTexture===!0&&ot.getTransfer(x.map.colorSpace)===dt,decodeVideoTextureEmissive:Ne&&x.emissiveMap.isVideoTexture===!0&&ot.getTransfer(x.emissiveMap.colorSpace)===dt,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===un,flipSided:x.side===jt,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:Te&&x.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Te&&x.extensions.multiDraw===!0||ze)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Ue.vertexUv1s=l.has(1),Ue.vertexUv2s=l.has(2),Ue.vertexUv3s=l.has(3),l.clear(),Ue}function p(x){let C=[];if(x.shaderID?C.push(x.shaderID):(C.push(x.customVertexShaderID),C.push(x.customFragmentShaderID)),x.defines!==void 0)for(let L in x.defines)C.push(L),C.push(x.defines[L]);return x.isRawShaderMaterial===!1&&(m(C,x),A(C,x),C.push(i.outputColorSpace)),C.push(x.customProgramCacheKey),C.join()}function m(x,C){x.push(C.precision),x.push(C.outputColorSpace),x.push(C.envMapMode),x.push(C.envMapCubeUVHeight),x.push(C.mapUv),x.push(C.alphaMapUv),x.push(C.lightMapUv),x.push(C.aoMapUv),x.push(C.bumpMapUv),x.push(C.normalMapUv),x.push(C.displacementMapUv),x.push(C.emissiveMapUv),x.push(C.metalnessMapUv),x.push(C.roughnessMapUv),x.push(C.anisotropyMapUv),x.push(C.clearcoatMapUv),x.push(C.clearcoatNormalMapUv),x.push(C.clearcoatRoughnessMapUv),x.push(C.iridescenceMapUv),x.push(C.iridescenceThicknessMapUv),x.push(C.sheenColorMapUv),x.push(C.sheenRoughnessMapUv),x.push(C.specularMapUv),x.push(C.specularColorMapUv),x.push(C.specularIntensityMapUv),x.push(C.transmissionMapUv),x.push(C.thicknessMapUv),x.push(C.combine),x.push(C.fogExp2),x.push(C.sizeAttenuation),x.push(C.morphTargetsCount),x.push(C.morphAttributeCount),x.push(C.numDirLights),x.push(C.numPointLights),x.push(C.numSpotLights),x.push(C.numSpotLightMaps),x.push(C.numHemiLights),x.push(C.numRectAreaLights),x.push(C.numDirLightShadows),x.push(C.numPointLightShadows),x.push(C.numSpotLightShadows),x.push(C.numSpotLightShadowsWithMaps),x.push(C.numLightProbes),x.push(C.shadowMapType),x.push(C.toneMapping),x.push(C.numClippingPlanes),x.push(C.numClipIntersection),x.push(C.depthPacking)}function A(x,C){o.disableAll(),C.instancing&&o.enable(0),C.instancingColor&&o.enable(1),C.instancingMorph&&o.enable(2),C.matcap&&o.enable(3),C.envMap&&o.enable(4),C.normalMapObjectSpace&&o.enable(5),C.normalMapTangentSpace&&o.enable(6),C.clearcoat&&o.enable(7),C.iridescence&&o.enable(8),C.alphaTest&&o.enable(9),C.vertexColors&&o.enable(10),C.vertexAlphas&&o.enable(11),C.vertexUv1s&&o.enable(12),C.vertexUv2s&&o.enable(13),C.vertexUv3s&&o.enable(14),C.vertexTangents&&o.enable(15),C.anisotropy&&o.enable(16),C.alphaHash&&o.enable(17),C.batching&&o.enable(18),C.dispersion&&o.enable(19),C.batchingColor&&o.enable(20),C.gradientMap&&o.enable(21),C.packedNormalMap&&o.enable(22),C.vertexNormals&&o.enable(23),x.push(o.mask),o.disableAll(),C.fog&&o.enable(0),C.useFog&&o.enable(1),C.flatShading&&o.enable(2),C.logarithmicDepthBuffer&&o.enable(3),C.reversedDepthBuffer&&o.enable(4),C.skinning&&o.enable(5),C.morphTargets&&o.enable(6),C.morphNormals&&o.enable(7),C.morphColors&&o.enable(8),C.premultipliedAlpha&&o.enable(9),C.shadowMapEnabled&&o.enable(10),C.doubleSided&&o.enable(11),C.flipSided&&o.enable(12),C.useDepthPacking&&o.enable(13),C.dithering&&o.enable(14),C.transmission&&o.enable(15),C.sheen&&o.enable(16),C.opaque&&o.enable(17),C.pointsUvs&&o.enable(18),C.decodeVideoTexture&&o.enable(19),C.decodeVideoTextureEmissive&&o.enable(20),C.alphaToCoverage&&o.enable(21),C.numLightProbeGrids>0&&o.enable(22),C.hasPositionAttribute&&o.enable(23),x.push(o.mask)}function w(x){let C=f[x.type],L;if(C){let D=Vn[C];L=Xu.clone(D.uniforms)}else L=x.uniforms;return L}function y(x,C){let L=d.get(C);return L!==void 0?++L.usedTimes:(L=new p_(i,C,x,s),c.push(L),d.set(C,L)),L}function M(x){if(--x.usedTimes===0){let C=c.indexOf(x);c[C]=c[c.length-1],c.pop(),d.delete(x.cacheKey),x.destroy()}}function b(x){a.remove(x)}function R(){a.dispose()}return{getParameters:v,getProgramCacheKey:p,getUniforms:w,acquireProgram:y,releaseProgram:M,releaseShaderCache:b,programs:c,dispose:R}}function y_(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function __(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function uf(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function ff(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(h){let f=0;return h.isInstancedMesh&&(f+=2),h.isSkinnedMesh&&(f+=1),f}function a(h,f,g,v,p,m){let A=i[e];return A===void 0?(A={id:h.id,object:h,geometry:f,material:g,materialVariant:o(h),groupOrder:v,renderOrder:h.renderOrder,z:p,group:m},i[e]=A):(A.id=h.id,A.object=h,A.geometry=f,A.material=g,A.materialVariant=o(h),A.groupOrder=v,A.renderOrder=h.renderOrder,A.z=p,A.group=m),e++,A}function l(h,f,g,v,p,m){let A=a(h,f,g,v,p,m);g.transmission>0?n.push(A):g.transparent===!0?s.push(A):t.push(A)}function c(h,f,g,v,p,m){let A=a(h,f,g,v,p,m);g.transmission>0?n.unshift(A):g.transparent===!0?s.unshift(A):t.unshift(A)}function d(h,f,g){t.length>1&&t.sort(h||__),n.length>1&&n.sort(f||uf),s.length>1&&s.sort(f||uf),g&&(t.reverse(),n.reverse(),s.reverse())}function u(){for(let h=e,f=i.length;h<f;h++){let g=i[h];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:u,sort:d}}function v_(){let i=new WeakMap;function e(n,s){let r=i.get(n),o;return r===void 0?(o=new ff,i.set(n,[o])):s>=r.length?(o=new ff,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function b_(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new I,color:new je};break;case"SpotLight":t={position:new I,direction:new I,color:new je,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new I,color:new je,distance:0,decay:0};break;case"HemisphereLight":t={direction:new I,skyColor:new je,groundColor:new je};break;case"RectAreaLight":t={color:new je,position:new I,halfWidth:new I,halfHeight:new I};break}return i[e.id]=t,t}}}function S_(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new le};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new le};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new le,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var M_=0;function w_(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function E_(i){let e=new b_,t=S_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new I);let s=new I,r=new ht,o=new ht;function a(c){let d=0,u=0,h=0;for(let C=0;C<9;C++)n.probe[C].set(0,0,0);let f=0,g=0,v=0,p=0,m=0,A=0,w=0,y=0,M=0,b=0,R=0;c.sort(w_);for(let C=0,L=c.length;C<L;C++){let D=c[C],k=D.color,Z=D.intensity,J=D.distance,B=null;if(D.shadow&&D.shadow.map&&(D.shadow.map.texture.format===Ci?B=D.shadow.map.texture:B=D.shadow.map.depthTexture||D.shadow.map.texture),D.isAmbientLight)d+=k.r*Z,u+=k.g*Z,h+=k.b*Z;else if(D.isLightProbe){for(let Y=0;Y<9;Y++)n.probe[Y].addScaledVector(D.sh.coefficients[Y],Z);R++}else if(D.isDirectionalLight){let Y=e.get(D);if(Y.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let z=D.shadow,X=t.get(D);X.shadowIntensity=z.intensity,X.shadowBias=z.bias,X.shadowNormalBias=z.normalBias,X.shadowRadius=z.radius,X.shadowMapSize=z.mapSize,n.directionalShadow[f]=X,n.directionalShadowMap[f]=B,n.directionalShadowMatrix[f]=D.shadow.matrix,A++}n.directional[f]=Y,f++}else if(D.isSpotLight){let Y=e.get(D);Y.position.setFromMatrixPosition(D.matrixWorld),Y.color.copy(k).multiplyScalar(Z),Y.distance=J,Y.coneCos=Math.cos(D.angle),Y.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),Y.decay=D.decay,n.spot[v]=Y;let z=D.shadow;if(D.map&&(n.spotLightMap[M]=D.map,M++,z.updateMatrices(D),D.castShadow&&b++),n.spotLightMatrix[v]=z.matrix,D.castShadow){let X=t.get(D);X.shadowIntensity=z.intensity,X.shadowBias=z.bias,X.shadowNormalBias=z.normalBias,X.shadowRadius=z.radius,X.shadowMapSize=z.mapSize,n.spotShadow[v]=X,n.spotShadowMap[v]=B,y++}v++}else if(D.isRectAreaLight){let Y=e.get(D);Y.color.copy(k).multiplyScalar(Z),Y.halfWidth.set(D.width*.5,0,0),Y.halfHeight.set(0,D.height*.5,0),n.rectArea[p]=Y,p++}else if(D.isPointLight){let Y=e.get(D);if(Y.color.copy(D.color).multiplyScalar(D.intensity),Y.distance=D.distance,Y.decay=D.decay,D.castShadow){let z=D.shadow,X=t.get(D);X.shadowIntensity=z.intensity,X.shadowBias=z.bias,X.shadowNormalBias=z.normalBias,X.shadowRadius=z.radius,X.shadowMapSize=z.mapSize,X.shadowCameraNear=z.camera.near,X.shadowCameraFar=z.camera.far,n.pointShadow[g]=X,n.pointShadowMap[g]=B,n.pointShadowMatrix[g]=D.shadow.matrix,w++}n.point[g]=Y,g++}else if(D.isHemisphereLight){let Y=e.get(D);Y.skyColor.copy(D.color).multiplyScalar(Z),Y.groundColor.copy(D.groundColor).multiplyScalar(Z),n.hemi[m]=Y,m++}}p>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Me.LTC_FLOAT_1,n.rectAreaLTC2=Me.LTC_FLOAT_2):(n.rectAreaLTC1=Me.LTC_HALF_1,n.rectAreaLTC2=Me.LTC_HALF_2)),n.ambient[0]=d,n.ambient[1]=u,n.ambient[2]=h;let x=n.hash;(x.directionalLength!==f||x.pointLength!==g||x.spotLength!==v||x.rectAreaLength!==p||x.hemiLength!==m||x.numDirectionalShadows!==A||x.numPointShadows!==w||x.numSpotShadows!==y||x.numSpotMaps!==M||x.numLightProbes!==R)&&(n.directional.length=f,n.spot.length=v,n.rectArea.length=p,n.point.length=g,n.hemi.length=m,n.directionalShadow.length=A,n.directionalShadowMap.length=A,n.pointShadow.length=w,n.pointShadowMap.length=w,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=A,n.pointShadowMatrix.length=w,n.spotLightMatrix.length=y+M-b,n.spotLightMap.length=M,n.numSpotLightShadowsWithMaps=b,n.numLightProbes=R,x.directionalLength=f,x.pointLength=g,x.spotLength=v,x.rectAreaLength=p,x.hemiLength=m,x.numDirectionalShadows=A,x.numPointShadows=w,x.numSpotShadows=y,x.numSpotMaps=M,x.numLightProbes=R,n.version=M_++)}function l(c,d){let u=0,h=0,f=0,g=0,v=0,p=d.matrixWorldInverse;for(let m=0,A=c.length;m<A;m++){let w=c[m];if(w.isDirectionalLight){let y=n.directional[u];y.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(p),u++}else if(w.isSpotLight){let y=n.spot[f];y.position.setFromMatrixPosition(w.matrixWorld),y.position.applyMatrix4(p),y.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(p),f++}else if(w.isRectAreaLight){let y=n.rectArea[g];y.position.setFromMatrixPosition(w.matrixWorld),y.position.applyMatrix4(p),o.identity(),r.copy(w.matrixWorld),r.premultiply(p),o.extractRotation(r),y.halfWidth.set(w.width*.5,0,0),y.halfHeight.set(0,w.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),g++}else if(w.isPointLight){let y=n.point[h];y.position.setFromMatrixPosition(w.matrixWorld),y.position.applyMatrix4(p),h++}else if(w.isHemisphereLight){let y=n.hemi[v];y.direction.setFromMatrixPosition(w.matrixWorld),y.direction.transformDirection(p),v++}}}return{setup:a,setupView:l,state:n}}function pf(i){let e=new E_(i),t=[],n=[],s=[];function r(h){u.camera=h,t.length=0,n.length=0,s.length=0}function o(h){t.push(h)}function a(h){n.push(h)}function l(h){s.push(h)}function c(){e.setup(t)}function d(h){e.setupView(t,h)}let u={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:u,setupLights:c,setupLightsView:d,pushLight:o,pushShadow:a,pushLightProbeGrid:l}}function T_(i){let e=new WeakMap;function t(s,r=0){let o=e.get(s),a;return o===void 0?(a=new pf(i),e.set(s,[a])):r>=o.length?(a=new pf(i),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}var A_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,C_=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,R_=[new I(1,0,0),new I(-1,0,0),new I(0,1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1)],P_=[new I(0,-1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1),new I(0,-1,0),new I(0,-1,0)],mf=new ht,$r=new I,vd=new I;function I_(i,e,t){let n=new As,s=new le,r=new le,o=new Mt,a=new ya,l=new _a,c={},d=t.maxTextureSize,u={[jn]:jt,[jt]:jn,[un]:un},h=new dn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new le},radius:{value:4}},vertexShader:A_,fragmentShader:C_}),f=h.clone();f.defines.HORIZONTAL_PASS=1;let g=new ft;g.setAttribute("position",new St(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let v=new Pt(g,h),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Br;let m=this.type;this.render=function(b,R,x){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||b.length===0)return;this.type===ru&&(He("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Br);let C=i.getRenderTarget(),L=i.getActiveCubeFace(),D=i.getActiveMipmapLevel(),k=i.state;k.setBlending(kn),k.buffers.depth.getReversed()===!0?k.buffers.color.setClear(0,0,0,0):k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);let Z=m!==this.type;Z&&R.traverse(function(J){J.material&&(Array.isArray(J.material)?J.material.forEach(B=>B.needsUpdate=!0):J.material.needsUpdate=!0)});for(let J=0,B=b.length;J<B;J++){let Y=b[J],z=Y.shadow;if(z===void 0){He("WebGLShadowMap:",Y,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;s.copy(z.mapSize);let X=z.getFrameExtents();s.multiply(X),r.copy(z.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(r.x=Math.floor(d/X.x),s.x=r.x*X.x,z.mapSize.x=r.x),s.y>d&&(r.y=Math.floor(d/X.y),s.y=r.y*X.y,z.mapSize.y=r.y));let ne=i.state.buffers.depth.getReversed();if(z.camera._reversedDepth=ne,z.map===null||Z===!0){if(z.map!==null&&(z.map.depthTexture!==null&&(z.map.depthTexture.dispose(),z.map.depthTexture=null),z.map.dispose()),this.type===Us){if(Y.isPointLight){He("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}z.map=new ln(s.x,s.y,{format:Ci,type:zn,minFilter:Gt,magFilter:Gt,generateMipmaps:!1}),z.map.texture.name=Y.name+".shadowMap",z.map.depthTexture=new ti(s.x,s.y,Rn),z.map.depthTexture.name=Y.name+".shadowMapDepth",z.map.depthTexture.format=Bn,z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=Ht,z.map.depthTexture.magFilter=Ht}else Y.isPointLight?(z.map=new Ml(s.x),z.map.depthTexture=new da(s.x,Cn)):(z.map=new ln(s.x,s.y),z.map.depthTexture=new ti(s.x,s.y,Cn)),z.map.depthTexture.name=Y.name+".shadowMap",z.map.depthTexture.format=Bn,this.type===Br?(z.map.depthTexture.compareFunction=ne?_l:yl,z.map.depthTexture.minFilter=Gt,z.map.depthTexture.magFilter=Gt):(z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=Ht,z.map.depthTexture.magFilter=Ht);z.camera.updateProjectionMatrix()}let he=z.map.isWebGLCubeRenderTarget?6:1;for(let de=0;de<he;de++){if(z.map.isWebGLCubeRenderTarget)i.setRenderTarget(z.map,de),i.clear();else{de===0&&(i.setRenderTarget(z.map),i.clear());let Ae=z.getViewport(de);o.set(r.x*Ae.x,r.y*Ae.y,r.x*Ae.z,r.y*Ae.w),k.viewport(o)}if(Y.isPointLight){let Ae=z.camera,Ze=z.matrix,Qe=Y.distance||Ae.far;Qe!==Ae.far&&(Ae.far=Qe,Ae.updateProjectionMatrix()),$r.setFromMatrixPosition(Y.matrixWorld),Ae.position.copy($r),vd.copy(Ae.position),vd.add(R_[de]),Ae.up.copy(P_[de]),Ae.lookAt(vd),Ae.updateMatrixWorld(),Ze.makeTranslation(-$r.x,-$r.y,-$r.z),mf.multiplyMatrices(Ae.projectionMatrix,Ae.matrixWorldInverse),z._frustum.setFromProjectionMatrix(mf,Ae.coordinateSystem,Ae.reversedDepth)}else z.updateMatrices(Y);n=z.getFrustum(),y(R,x,z.camera,Y,this.type)}z.isPointLightShadow!==!0&&this.type===Us&&A(z,x),z.needsUpdate=!1}m=this.type,p.needsUpdate=!1,i.setRenderTarget(C,L,D)};function A(b,R){let x=e.update(v);h.defines.VSM_SAMPLES!==b.blurSamples&&(h.defines.VSM_SAMPLES=b.blurSamples,f.defines.VSM_SAMPLES=b.blurSamples,h.needsUpdate=!0,f.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new ln(s.x,s.y,{format:Ci,type:zn})),h.uniforms.shadow_pass.value=b.map.depthTexture,h.uniforms.resolution.value=b.mapSize,h.uniforms.radius.value=b.radius,i.setRenderTarget(b.mapPass),i.clear(),i.renderBufferDirect(R,null,x,h,v,null),f.uniforms.shadow_pass.value=b.mapPass.texture,f.uniforms.resolution.value=b.mapSize,f.uniforms.radius.value=b.radius,i.setRenderTarget(b.map),i.clear(),i.renderBufferDirect(R,null,x,f,v,null)}function w(b,R,x,C){let L=null,D=x.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(D!==void 0)L=D;else if(L=x.isPointLight===!0?l:a,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){let k=L.uuid,Z=R.uuid,J=c[k];J===void 0&&(J={},c[k]=J);let B=J[Z];B===void 0&&(B=L.clone(),J[Z]=B,R.addEventListener("dispose",M)),L=B}if(L.visible=R.visible,L.wireframe=R.wireframe,C===Us?L.side=R.shadowSide!==null?R.shadowSide:R.side:L.side=R.shadowSide!==null?R.shadowSide:u[R.side],L.alphaMap=R.alphaMap,L.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,L.map=R.map,L.clipShadows=R.clipShadows,L.clippingPlanes=R.clippingPlanes,L.clipIntersection=R.clipIntersection,L.displacementMap=R.displacementMap,L.displacementScale=R.displacementScale,L.displacementBias=R.displacementBias,L.wireframeLinewidth=R.wireframeLinewidth,L.linewidth=R.linewidth,x.isPointLight===!0&&L.isMeshDistanceMaterial===!0){let k=i.properties.get(L);k.light=x}return L}function y(b,R,x,C,L){if(b.visible===!1)return;if(b.layers.test(R.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&L===Us)&&(!b.frustumCulled||n.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,b.matrixWorld);let Z=e.update(b),J=b.material;if(Array.isArray(J)){let B=Z.groups;for(let Y=0,z=B.length;Y<z;Y++){let X=B[Y],ne=J[X.materialIndex];if(ne&&ne.visible){let he=w(b,ne,C,L);b.onBeforeShadow(i,b,R,x,Z,he,X),i.renderBufferDirect(x,null,Z,he,b,X),b.onAfterShadow(i,b,R,x,Z,he,X)}}}else if(J.visible){let B=w(b,J,C,L);b.onBeforeShadow(i,b,R,x,Z,B,null),i.renderBufferDirect(x,null,Z,B,b,null),b.onAfterShadow(i,b,R,x,Z,B,null)}}let k=b.children;for(let Z=0,J=k.length;Z<J;Z++)y(k[Z],R,x,C,L)}function M(b){b.target.removeEventListener("dispose",M);for(let x in c){let C=c[x],L=b.target.uuid;L in C&&(C[L].dispose(),delete C[L])}}}function D_(i,e){function t(){let U=!1,xe=new Mt,ee=null,ve=new Mt(0,0,0,0);return{setMask:function(Te){ee!==Te&&!U&&(i.colorMask(Te,Te,Te,Te),ee=Te)},setLocked:function(Te){U=Te},setClear:function(Te,se,Ue,Pe,Tt){Tt===!0&&(Te*=Pe,se*=Pe,Ue*=Pe),xe.set(Te,se,Ue,Pe),ve.equals(xe)===!1&&(i.clearColor(Te,se,Ue,Pe),ve.copy(xe))},reset:function(){U=!1,ee=null,ve.set(-1,0,0,0)}}}function n(){let U=!1,xe=!1,ee=null,ve=null,Te=null;return{setReversed:function(se){if(xe!==se){let Ue=e.get("EXT_clip_control");se?Ue.clipControlEXT(Ue.LOWER_LEFT_EXT,Ue.ZERO_TO_ONE_EXT):Ue.clipControlEXT(Ue.LOWER_LEFT_EXT,Ue.NEGATIVE_ONE_TO_ONE_EXT),xe=se;let Pe=Te;Te=null,this.setClear(Pe)}},getReversed:function(){return xe},setTest:function(se){se?ae(i.DEPTH_TEST):Le(i.DEPTH_TEST)},setMask:function(se){ee!==se&&!U&&(i.depthMask(se),ee=se)},setFunc:function(se){if(xe&&(se=Bu[se]),ve!==se){switch(se){case Xo:i.depthFunc(i.NEVER);break;case qo:i.depthFunc(i.ALWAYS);break;case Yo:i.depthFunc(i.LESS);break;case Wi:i.depthFunc(i.LEQUAL);break;case $o:i.depthFunc(i.EQUAL);break;case Zo:i.depthFunc(i.GEQUAL);break;case Jo:i.depthFunc(i.GREATER);break;case Ko:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ve=se}},setLocked:function(se){U=se},setClear:function(se){Te!==se&&(Te=se,xe&&(se=1-se),i.clearDepth(se))},reset:function(){U=!1,ee=null,ve=null,Te=null,xe=!1}}}function s(){let U=!1,xe=null,ee=null,ve=null,Te=null,se=null,Ue=null,Pe=null,Tt=null;return{setTest:function(_t){U||(_t?ae(i.STENCIL_TEST):Le(i.STENCIL_TEST))},setMask:function(_t){xe!==_t&&!U&&(i.stencilMask(_t),xe=_t)},setFunc:function(_t,In,Dn){(ee!==_t||ve!==In||Te!==Dn)&&(i.stencilFunc(_t,In,Dn),ee=_t,ve=In,Te=Dn)},setOp:function(_t,In,Dn){(se!==_t||Ue!==In||Pe!==Dn)&&(i.stencilOp(_t,In,Dn),se=_t,Ue=In,Pe=Dn)},setLocked:function(_t){U=_t},setClear:function(_t){Tt!==_t&&(i.clearStencil(_t),Tt=_t)},reset:function(){U=!1,xe=null,ee=null,ve=null,Te=null,se=null,Ue=null,Pe=null,Tt=null}}}let r=new t,o=new n,a=new s,l=new WeakMap,c=new WeakMap,d={},u={},h={},f=new WeakMap,g=[],v=null,p=!1,m=null,A=null,w=null,y=null,M=null,b=null,R=null,x=new je(0,0,0),C=0,L=!1,D=null,k=null,Z=null,J=null,B=null,Y=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),z=!1,X=0,ne=i.getParameter(i.VERSION);ne.indexOf("WebGL")!==-1?(X=parseFloat(/^WebGL (\d)/.exec(ne)[1]),z=X>=1):ne.indexOf("OpenGL ES")!==-1&&(X=parseFloat(/^OpenGL ES (\d)/.exec(ne)[1]),z=X>=2);let he=null,de={},Ae=i.getParameter(i.SCISSOR_BOX),Ze=i.getParameter(i.VIEWPORT),Qe=new Mt().fromArray(Ae),Je=new Mt().fromArray(Ze);function Q(U,xe,ee,ve){let Te=new Uint8Array(4),se=i.createTexture();i.bindTexture(U,se),i.texParameteri(U,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(U,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ue=0;Ue<ee;Ue++)U===i.TEXTURE_3D||U===i.TEXTURE_2D_ARRAY?i.texImage3D(xe,0,i.RGBA,1,1,ve,0,i.RGBA,i.UNSIGNED_BYTE,Te):i.texImage2D(xe+Ue,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Te);return se}let fe={};fe[i.TEXTURE_2D]=Q(i.TEXTURE_2D,i.TEXTURE_2D,1),fe[i.TEXTURE_CUBE_MAP]=Q(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),fe[i.TEXTURE_2D_ARRAY]=Q(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),fe[i.TEXTURE_3D]=Q(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ae(i.DEPTH_TEST),o.setFunc(Wi),ge(!1),me(Hc),ae(i.CULL_FACE),oe(kn);function ae(U){d[U]!==!0&&(i.enable(U),d[U]=!0)}function Le(U){d[U]!==!1&&(i.disable(U),d[U]=!1)}function Ge(U,xe){return h[U]!==xe?(i.bindFramebuffer(U,xe),h[U]=xe,U===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=xe),U===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=xe),!0):!1}function ze(U,xe){let ee=g,ve=!1;if(U){ee=f.get(xe),ee===void 0&&(ee=[],f.set(xe,ee));let Te=U.textures;if(ee.length!==Te.length||ee[0]!==i.COLOR_ATTACHMENT0){for(let se=0,Ue=Te.length;se<Ue;se++)ee[se]=i.COLOR_ATTACHMENT0+se;ee.length=Te.length,ve=!0}}else ee[0]!==i.BACK&&(ee[0]=i.BACK,ve=!0);ve&&i.drawBuffers(ee)}function at(U){return v!==U?(i.useProgram(U),v=U,!0):!1}let $e={[fi]:i.FUNC_ADD,[au]:i.FUNC_SUBTRACT,[lu]:i.FUNC_REVERSE_SUBTRACT};$e[cu]=i.MIN,$e[du]=i.MAX;let ie={[hu]:i.ZERO,[uu]:i.ONE,[fu]:i.SRC_COLOR,[Go]:i.SRC_ALPHA,[_u]:i.SRC_ALPHA_SATURATE,[xu]:i.DST_COLOR,[mu]:i.DST_ALPHA,[pu]:i.ONE_MINUS_SRC_COLOR,[Wo]:i.ONE_MINUS_SRC_ALPHA,[yu]:i.ONE_MINUS_DST_COLOR,[gu]:i.ONE_MINUS_DST_ALPHA,[vu]:i.CONSTANT_COLOR,[bu]:i.ONE_MINUS_CONSTANT_COLOR,[Su]:i.CONSTANT_ALPHA,[Mu]:i.ONE_MINUS_CONSTANT_ALPHA};function oe(U,xe,ee,ve,Te,se,Ue,Pe,Tt,_t){if(U===kn){p===!0&&(Le(i.BLEND),p=!1);return}if(p===!1&&(ae(i.BLEND),p=!0),U!==ou){if(U!==m||_t!==L){if((A!==fi||M!==fi)&&(i.blendEquation(i.FUNC_ADD),A=fi,M=fi),_t)switch(U){case Gi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Vc:i.blendFunc(i.ONE,i.ONE);break;case Gc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Wc:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Xe("WebGLState: Invalid blending: ",U);break}else switch(U){case Gi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Vc:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Gc:Xe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Wc:Xe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Xe("WebGLState: Invalid blending: ",U);break}w=null,y=null,b=null,R=null,x.set(0,0,0),C=0,m=U,L=_t}return}Te=Te||xe,se=se||ee,Ue=Ue||ve,(xe!==A||Te!==M)&&(i.blendEquationSeparate($e[xe],$e[Te]),A=xe,M=Te),(ee!==w||ve!==y||se!==b||Ue!==R)&&(i.blendFuncSeparate(ie[ee],ie[ve],ie[se],ie[Ue]),w=ee,y=ve,b=se,R=Ue),(Pe.equals(x)===!1||Tt!==C)&&(i.blendColor(Pe.r,Pe.g,Pe.b,Tt),x.copy(Pe),C=Tt),m=U,L=!1}function re(U,xe){U.side===un?Le(i.CULL_FACE):ae(i.CULL_FACE);let ee=U.side===jt;xe&&(ee=!ee),ge(ee),U.blending===Gi&&U.transparent===!1?oe(kn):oe(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),o.setFunc(U.depthFunc),o.setTest(U.depthTest),o.setMask(U.depthWrite),r.setMask(U.colorWrite);let ve=U.stencilWrite;a.setTest(ve),ve&&(a.setMask(U.stencilWriteMask),a.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),a.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),Ne(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?ae(i.SAMPLE_ALPHA_TO_COVERAGE):Le(i.SAMPLE_ALPHA_TO_COVERAGE)}function ge(U){D!==U&&(U?i.frontFace(i.CW):i.frontFace(i.CCW),D=U)}function me(U){U!==iu?(ae(i.CULL_FACE),U!==k&&(U===Hc?i.cullFace(i.BACK):U===su?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Le(i.CULL_FACE),k=U}function We(U){U!==Z&&(z&&i.lineWidth(U),Z=U)}function Ne(U,xe,ee){U?(ae(i.POLYGON_OFFSET_FILL),(J!==xe||B!==ee)&&(J=xe,B=ee,o.getReversed()&&(xe=-xe),i.polygonOffset(xe,ee))):Le(i.POLYGON_OFFSET_FILL)}function qe(U){U?ae(i.SCISSOR_TEST):Le(i.SCISSOR_TEST)}function N(U){U===void 0&&(U=i.TEXTURE0+Y-1),he!==U&&(i.activeTexture(U),he=U)}function P(U,xe,ee){ee===void 0&&(he===null?ee=i.TEXTURE0+Y-1:ee=he);let ve=de[ee];ve===void 0&&(ve={type:void 0,texture:void 0},de[ee]=ve),(ve.type!==U||ve.texture!==xe)&&(he!==ee&&(i.activeTexture(ee),he=ee),i.bindTexture(U,xe||fe[U]),ve.type=U,ve.texture=xe)}function be(){let U=de[he];U!==void 0&&U.type!==void 0&&(i.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function ce(){try{i.compressedTexImage2D(...arguments)}catch(U){Xe("WebGLState:",U)}}function E(){try{i.compressedTexImage3D(...arguments)}catch(U){Xe("WebGLState:",U)}}function _(){try{i.texSubImage2D(...arguments)}catch(U){Xe("WebGLState:",U)}}function H(){try{i.texSubImage3D(...arguments)}catch(U){Xe("WebGLState:",U)}}function W(){try{i.compressedTexSubImage2D(...arguments)}catch(U){Xe("WebGLState:",U)}}function K(){try{i.compressedTexSubImage3D(...arguments)}catch(U){Xe("WebGLState:",U)}}function ue(){try{i.texStorage2D(...arguments)}catch(U){Xe("WebGLState:",U)}}function pe(){try{i.texStorage3D(...arguments)}catch(U){Xe("WebGLState:",U)}}function j(){try{i.texImage2D(...arguments)}catch(U){Xe("WebGLState:",U)}}function te(){try{i.texImage3D(...arguments)}catch(U){Xe("WebGLState:",U)}}function ye(U){return u[U]!==void 0?u[U]:i.getParameter(U)}function Fe(U,xe){u[U]!==xe&&(i.pixelStorei(U,xe),u[U]=xe)}function Se(U){Qe.equals(U)===!1&&(i.scissor(U.x,U.y,U.z,U.w),Qe.copy(U))}function _e(U){Je.equals(U)===!1&&(i.viewport(U.x,U.y,U.z,U.w),Je.copy(U))}function Ve(U,xe){let ee=c.get(xe);ee===void 0&&(ee=new WeakMap,c.set(xe,ee));let ve=ee.get(U);ve===void 0&&(ve=i.getUniformBlockIndex(xe,U.name),ee.set(U,ve))}function Ye(U,xe){let ve=c.get(xe).get(U);l.get(xe)!==ve&&(i.uniformBlockBinding(xe,ve,U.__bindingPointIndex),l.set(xe,ve))}function et(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),d={},u={},he=null,de={},h={},f=new WeakMap,g=[],v=null,p=!1,m=null,A=null,w=null,y=null,M=null,b=null,R=null,x=new je(0,0,0),C=0,L=!1,D=null,k=null,Z=null,J=null,B=null,Qe.set(0,0,i.canvas.width,i.canvas.height),Je.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:ae,disable:Le,bindFramebuffer:Ge,drawBuffers:ze,useProgram:at,setBlending:oe,setMaterial:re,setFlipSided:ge,setCullFace:me,setLineWidth:We,setPolygonOffset:Ne,setScissorTest:qe,activeTexture:N,bindTexture:P,unbindTexture:be,compressedTexImage2D:ce,compressedTexImage3D:E,texImage2D:j,texImage3D:te,pixelStorei:Fe,getParameter:ye,updateUBOMapping:Ve,uniformBlockBinding:Ye,texStorage2D:ue,texStorage3D:pe,texSubImage2D:_,texSubImage3D:H,compressedTexSubImage2D:W,compressedTexSubImage3D:K,scissor:Se,viewport:_e,reset:et}}function L_(i,e,t,n,s,r,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new le,d=new WeakMap,u=new Set,h,f=new WeakMap,g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(E,_){return g?new OffscreenCanvas(E,_):ur("canvas")}function p(E,_,H){let W=1,K=ce(E);if((K.width>H||K.height>H)&&(W=H/Math.max(K.width,K.height)),W<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){let ue=Math.floor(W*K.width),pe=Math.floor(W*K.height);h===void 0&&(h=v(ue,pe));let j=_?v(ue,pe):h;return j.width=ue,j.height=pe,j.getContext("2d").drawImage(E,0,0,ue,pe),He("WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+ue+"x"+pe+")."),j}else return"data"in E&&He("WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),E;return E}function m(E){return E.generateMipmaps}function A(E){i.generateMipmap(E)}function w(E){return E.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?i.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function y(E,_,H,W,K,ue=!1){if(E!==null){if(i[E]!==void 0)return i[E];He("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let pe;W&&(pe=e.get("EXT_texture_norm16"),pe||He("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let j=_;if(_===i.RED&&(H===i.FLOAT&&(j=i.R32F),H===i.HALF_FLOAT&&(j=i.R16F),H===i.UNSIGNED_BYTE&&(j=i.R8),H===i.UNSIGNED_SHORT&&pe&&(j=pe.R16_EXT),H===i.SHORT&&pe&&(j=pe.R16_SNORM_EXT)),_===i.RED_INTEGER&&(H===i.UNSIGNED_BYTE&&(j=i.R8UI),H===i.UNSIGNED_SHORT&&(j=i.R16UI),H===i.UNSIGNED_INT&&(j=i.R32UI),H===i.BYTE&&(j=i.R8I),H===i.SHORT&&(j=i.R16I),H===i.INT&&(j=i.R32I)),_===i.RG&&(H===i.FLOAT&&(j=i.RG32F),H===i.HALF_FLOAT&&(j=i.RG16F),H===i.UNSIGNED_BYTE&&(j=i.RG8),H===i.UNSIGNED_SHORT&&pe&&(j=pe.RG16_EXT),H===i.SHORT&&pe&&(j=pe.RG16_SNORM_EXT)),_===i.RG_INTEGER&&(H===i.UNSIGNED_BYTE&&(j=i.RG8UI),H===i.UNSIGNED_SHORT&&(j=i.RG16UI),H===i.UNSIGNED_INT&&(j=i.RG32UI),H===i.BYTE&&(j=i.RG8I),H===i.SHORT&&(j=i.RG16I),H===i.INT&&(j=i.RG32I)),_===i.RGB_INTEGER&&(H===i.UNSIGNED_BYTE&&(j=i.RGB8UI),H===i.UNSIGNED_SHORT&&(j=i.RGB16UI),H===i.UNSIGNED_INT&&(j=i.RGB32UI),H===i.BYTE&&(j=i.RGB8I),H===i.SHORT&&(j=i.RGB16I),H===i.INT&&(j=i.RGB32I)),_===i.RGBA_INTEGER&&(H===i.UNSIGNED_BYTE&&(j=i.RGBA8UI),H===i.UNSIGNED_SHORT&&(j=i.RGBA16UI),H===i.UNSIGNED_INT&&(j=i.RGBA32UI),H===i.BYTE&&(j=i.RGBA8I),H===i.SHORT&&(j=i.RGBA16I),H===i.INT&&(j=i.RGBA32I)),_===i.RGB&&(H===i.UNSIGNED_SHORT&&pe&&(j=pe.RGB16_EXT),H===i.SHORT&&pe&&(j=pe.RGB16_SNORM_EXT),H===i.UNSIGNED_INT_5_9_9_9_REV&&(j=i.RGB9_E5),H===i.UNSIGNED_INT_10F_11F_11F_REV&&(j=i.R11F_G11F_B10F)),_===i.RGBA){let te=ue?hr:ot.getTransfer(K);H===i.FLOAT&&(j=i.RGBA32F),H===i.HALF_FLOAT&&(j=i.RGBA16F),H===i.UNSIGNED_BYTE&&(j=te===dt?i.SRGB8_ALPHA8:i.RGBA8),H===i.UNSIGNED_SHORT&&pe&&(j=pe.RGBA16_EXT),H===i.SHORT&&pe&&(j=pe.RGBA16_SNORM_EXT),H===i.UNSIGNED_SHORT_4_4_4_4&&(j=i.RGBA4),H===i.UNSIGNED_SHORT_5_5_5_1&&(j=i.RGB5_A1)}return(j===i.R16F||j===i.R32F||j===i.RG16F||j===i.RG32F||j===i.RGBA16F||j===i.RGBA32F)&&e.get("EXT_color_buffer_float"),j}function M(E,_){let H;return E?_===null||_===Cn||_===Os?H=i.DEPTH24_STENCIL8:_===Rn?H=i.DEPTH32F_STENCIL8:_===Fs&&(H=i.DEPTH24_STENCIL8,He("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===Cn||_===Os?H=i.DEPTH_COMPONENT24:_===Rn?H=i.DEPTH_COMPONENT32F:_===Fs&&(H=i.DEPTH_COMPONENT16),H}function b(E,_){return m(E)===!0||E.isFramebufferTexture&&E.minFilter!==Ht&&E.minFilter!==Gt?Math.log2(Math.max(_.width,_.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?_.mipmaps.length:1}function R(E){let _=E.target;_.removeEventListener("dispose",R),C(_),_.isVideoTexture&&d.delete(_),_.isHTMLTexture&&u.delete(_)}function x(E){let _=E.target;_.removeEventListener("dispose",x),D(_)}function C(E){let _=n.get(E);if(_.__webglInit===void 0)return;let H=E.source,W=f.get(H);if(W){let K=W[_.__cacheKey];K.usedTimes--,K.usedTimes===0&&L(E),Object.keys(W).length===0&&f.delete(H)}n.remove(E)}function L(E){let _=n.get(E);i.deleteTexture(_.__webglTexture);let H=E.source,W=f.get(H);delete W[_.__cacheKey],o.memory.textures--}function D(E){let _=n.get(E);if(E.depthTexture&&(E.depthTexture.dispose(),n.remove(E.depthTexture)),E.isWebGLCubeRenderTarget)for(let W=0;W<6;W++){if(Array.isArray(_.__webglFramebuffer[W]))for(let K=0;K<_.__webglFramebuffer[W].length;K++)i.deleteFramebuffer(_.__webglFramebuffer[W][K]);else i.deleteFramebuffer(_.__webglFramebuffer[W]);_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer[W])}else{if(Array.isArray(_.__webglFramebuffer))for(let W=0;W<_.__webglFramebuffer.length;W++)i.deleteFramebuffer(_.__webglFramebuffer[W]);else i.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&i.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let W=0;W<_.__webglColorRenderbuffer.length;W++)_.__webglColorRenderbuffer[W]&&i.deleteRenderbuffer(_.__webglColorRenderbuffer[W]);_.__webglDepthRenderbuffer&&i.deleteRenderbuffer(_.__webglDepthRenderbuffer)}let H=E.textures;for(let W=0,K=H.length;W<K;W++){let ue=n.get(H[W]);ue.__webglTexture&&(i.deleteTexture(ue.__webglTexture),o.memory.textures--),n.remove(H[W])}n.remove(E)}let k=0;function Z(){k=0}function J(){return k}function B(E){k=E}function Y(){let E=k;return E>=s.maxTextures&&He("WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+s.maxTextures),k+=1,E}function z(E){let _=[];return _.push(E.wrapS),_.push(E.wrapT),_.push(E.wrapR||0),_.push(E.magFilter),_.push(E.minFilter),_.push(E.anisotropy),_.push(E.internalFormat),_.push(E.format),_.push(E.type),_.push(E.generateMipmaps),_.push(E.premultiplyAlpha),_.push(E.flipY),_.push(E.unpackAlignment),_.push(E.colorSpace),_.join()}function X(E,_){let H=n.get(E);if(E.isVideoTexture&&P(E),E.isRenderTargetTexture===!1&&E.isExternalTexture!==!0&&E.version>0&&H.__version!==E.version){let W=E.image;if(W===null)He("WebGLRenderer: Texture marked for update but no image data found.");else if(W.complete===!1)He("WebGLRenderer: Texture marked for update but image is incomplete");else{Le(H,E,_);return}}else E.isExternalTexture&&(H.__webglTexture=E.sourceTexture?E.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,H.__webglTexture,i.TEXTURE0+_)}function ne(E,_){let H=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&H.__version!==E.version){Le(H,E,_);return}else E.isExternalTexture&&(H.__webglTexture=E.sourceTexture?E.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,H.__webglTexture,i.TEXTURE0+_)}function he(E,_){let H=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&H.__version!==E.version){Le(H,E,_);return}t.bindTexture(i.TEXTURE_3D,H.__webglTexture,i.TEXTURE0+_)}function de(E,_){let H=n.get(E);if(E.isCubeDepthTexture!==!0&&E.version>0&&H.__version!==E.version){Ge(H,E,_);return}t.bindTexture(i.TEXTURE_CUBE_MAP,H.__webglTexture,i.TEXTURE0+_)}let Ae={[jo]:i.REPEAT,[Fn]:i.CLAMP_TO_EDGE,[Qo]:i.MIRRORED_REPEAT},Ze={[Ht]:i.NEAREST,[Tu]:i.NEAREST_MIPMAP_NEAREST,[zr]:i.NEAREST_MIPMAP_LINEAR,[Gt]:i.LINEAR,[Na]:i.LINEAR_MIPMAP_NEAREST,[Ti]:i.LINEAR_MIPMAP_LINEAR},Qe={[Ru]:i.NEVER,[Nu]:i.ALWAYS,[Pu]:i.LESS,[yl]:i.LEQUAL,[Iu]:i.EQUAL,[_l]:i.GEQUAL,[Du]:i.GREATER,[Lu]:i.NOTEQUAL};function Je(E,_){if(_.type===Rn&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===Gt||_.magFilter===Na||_.magFilter===zr||_.magFilter===Ti||_.minFilter===Gt||_.minFilter===Na||_.minFilter===zr||_.minFilter===Ti)&&He("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(E,i.TEXTURE_WRAP_S,Ae[_.wrapS]),i.texParameteri(E,i.TEXTURE_WRAP_T,Ae[_.wrapT]),(E===i.TEXTURE_3D||E===i.TEXTURE_2D_ARRAY)&&i.texParameteri(E,i.TEXTURE_WRAP_R,Ae[_.wrapR]),i.texParameteri(E,i.TEXTURE_MAG_FILTER,Ze[_.magFilter]),i.texParameteri(E,i.TEXTURE_MIN_FILTER,Ze[_.minFilter]),_.compareFunction&&(i.texParameteri(E,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(E,i.TEXTURE_COMPARE_FUNC,Qe[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Ht||_.minFilter!==zr&&_.minFilter!==Ti||_.type===Rn&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){let H=e.get("EXT_texture_filter_anisotropic");i.texParameterf(E,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function Q(E,_){let H=!1;E.__webglInit===void 0&&(E.__webglInit=!0,_.addEventListener("dispose",R));let W=_.source,K=f.get(W);K===void 0&&(K={},f.set(W,K));let ue=z(_);if(ue!==E.__cacheKey){K[ue]===void 0&&(K[ue]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,H=!0),K[ue].usedTimes++;let pe=K[E.__cacheKey];pe!==void 0&&(K[E.__cacheKey].usedTimes--,pe.usedTimes===0&&L(_)),E.__cacheKey=ue,E.__webglTexture=K[ue].texture}return H}function fe(E,_,H){return Math.floor(Math.floor(E/H)/_)}function ae(E,_,H,W){let ue=E.updateRanges;if(ue.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,_.width,_.height,H,W,_.data);else{ue.sort((Fe,Se)=>Fe.start-Se.start);let pe=0;for(let Fe=1;Fe<ue.length;Fe++){let Se=ue[pe],_e=ue[Fe],Ve=Se.start+Se.count,Ye=fe(_e.start,_.width,4),et=fe(Se.start,_.width,4);_e.start<=Ve+1&&Ye===et&&fe(_e.start+_e.count-1,_.width,4)===Ye?Se.count=Math.max(Se.count,_e.start+_e.count-Se.start):(++pe,ue[pe]=_e)}ue.length=pe+1;let j=t.getParameter(i.UNPACK_ROW_LENGTH),te=t.getParameter(i.UNPACK_SKIP_PIXELS),ye=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,_.width);for(let Fe=0,Se=ue.length;Fe<Se;Fe++){let _e=ue[Fe],Ve=Math.floor(_e.start/4),Ye=Math.ceil(_e.count/4),et=Ve%_.width,U=Math.floor(Ve/_.width),xe=Ye,ee=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,et),t.pixelStorei(i.UNPACK_SKIP_ROWS,U),t.texSubImage2D(i.TEXTURE_2D,0,et,U,xe,ee,H,W,_.data)}E.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,j),t.pixelStorei(i.UNPACK_SKIP_PIXELS,te),t.pixelStorei(i.UNPACK_SKIP_ROWS,ye)}}function Le(E,_,H){let W=i.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(W=i.TEXTURE_2D_ARRAY),_.isData3DTexture&&(W=i.TEXTURE_3D);let K=Q(E,_),ue=_.source;t.bindTexture(W,E.__webglTexture,i.TEXTURE0+H);let pe=n.get(ue);if(ue.version!==pe.__version||K===!0){if(t.activeTexture(i.TEXTURE0+H),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){let ee=ot.getPrimaries(ot.workingColorSpace),ve=_.colorSpace===ni?null:ot.getPrimaries(_.colorSpace),Te=_.colorSpace===ni||ee===ve?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Te)}t.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment);let te=p(_.image,!1,s.maxTextureSize);te=be(_,te);let ye=r.convert(_.format,_.colorSpace),Fe=r.convert(_.type),Se=y(_.internalFormat,ye,Fe,_.normalized,_.colorSpace,_.isVideoTexture);Je(W,_);let _e,Ve=_.mipmaps,Ye=_.isVideoTexture!==!0,et=pe.__version===void 0||K===!0,U=ue.dataReady,xe=b(_,te);if(_.isDepthTexture)Se=M(_.format===Ai,_.type),et&&(Ye?t.texStorage2D(i.TEXTURE_2D,1,Se,te.width,te.height):t.texImage2D(i.TEXTURE_2D,0,Se,te.width,te.height,0,ye,Fe,null));else if(_.isDataTexture)if(Ve.length>0){Ye&&et&&t.texStorage2D(i.TEXTURE_2D,xe,Se,Ve[0].width,Ve[0].height);for(let ee=0,ve=Ve.length;ee<ve;ee++)_e=Ve[ee],Ye?U&&t.texSubImage2D(i.TEXTURE_2D,ee,0,0,_e.width,_e.height,ye,Fe,_e.data):t.texImage2D(i.TEXTURE_2D,ee,Se,_e.width,_e.height,0,ye,Fe,_e.data);_.generateMipmaps=!1}else Ye?(et&&t.texStorage2D(i.TEXTURE_2D,xe,Se,te.width,te.height),U&&ae(_,te,ye,Fe)):t.texImage2D(i.TEXTURE_2D,0,Se,te.width,te.height,0,ye,Fe,te.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Ye&&et&&t.texStorage3D(i.TEXTURE_2D_ARRAY,xe,Se,Ve[0].width,Ve[0].height,te.depth);for(let ee=0,ve=Ve.length;ee<ve;ee++)if(_e=Ve[ee],_.format!==yn)if(ye!==null)if(Ye){if(U)if(_.layerUpdates.size>0){let Te=pd(_e.width,_e.height,_.format,_.type);for(let se of _.layerUpdates){let Ue=_e.data.subarray(se*Te/_e.data.BYTES_PER_ELEMENT,(se+1)*Te/_e.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ee,0,0,se,_e.width,_e.height,1,ye,Ue)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ee,0,0,0,_e.width,_e.height,te.depth,ye,_e.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ee,Se,_e.width,_e.height,te.depth,0,_e.data,0,0);else He("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ye?U&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ee,0,0,0,_e.width,_e.height,te.depth,ye,Fe,_e.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ee,Se,_e.width,_e.height,te.depth,0,ye,Fe,_e.data)}else{Ye&&et&&t.texStorage2D(i.TEXTURE_2D,xe,Se,Ve[0].width,Ve[0].height);for(let ee=0,ve=Ve.length;ee<ve;ee++)_e=Ve[ee],_.format!==yn?ye!==null?Ye?U&&t.compressedTexSubImage2D(i.TEXTURE_2D,ee,0,0,_e.width,_e.height,ye,_e.data):t.compressedTexImage2D(i.TEXTURE_2D,ee,Se,_e.width,_e.height,0,_e.data):He("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ye?U&&t.texSubImage2D(i.TEXTURE_2D,ee,0,0,_e.width,_e.height,ye,Fe,_e.data):t.texImage2D(i.TEXTURE_2D,ee,Se,_e.width,_e.height,0,ye,Fe,_e.data)}else if(_.isDataArrayTexture)if(Ye){if(et&&t.texStorage3D(i.TEXTURE_2D_ARRAY,xe,Se,te.width,te.height,te.depth),U)if(_.layerUpdates.size>0){let ee=pd(te.width,te.height,_.format,_.type);for(let ve of _.layerUpdates){let Te=te.data.subarray(ve*ee/te.data.BYTES_PER_ELEMENT,(ve+1)*ee/te.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ve,te.width,te.height,1,ye,Fe,Te)}_.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,te.width,te.height,te.depth,ye,Fe,te.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Se,te.width,te.height,te.depth,0,ye,Fe,te.data);else if(_.isData3DTexture)Ye?(et&&t.texStorage3D(i.TEXTURE_3D,xe,Se,te.width,te.height,te.depth),U&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,te.width,te.height,te.depth,ye,Fe,te.data)):t.texImage3D(i.TEXTURE_3D,0,Se,te.width,te.height,te.depth,0,ye,Fe,te.data);else if(_.isFramebufferTexture){if(et)if(Ye)t.texStorage2D(i.TEXTURE_2D,xe,Se,te.width,te.height);else{let ee=te.width,ve=te.height;for(let Te=0;Te<xe;Te++)t.texImage2D(i.TEXTURE_2D,Te,Se,ee,ve,0,ye,Fe,null),ee>>=1,ve>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in i){let ee=i.canvas;if(ee.hasAttribute("layoutsubtree")||ee.setAttribute("layoutsubtree","true"),te.parentNode!==ee){ee.appendChild(te),u.add(_),ee.onpaint=ve=>{let Te=ve.changedElements;for(let se of u)Te.includes(se.image)&&(se.needsUpdate=!0)},ee.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,te);else{let Te=i.RGBA,se=i.RGBA,Ue=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Te,se,Ue,te)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Ve.length>0){if(Ye&&et){let ee=ce(Ve[0]);t.texStorage2D(i.TEXTURE_2D,xe,Se,ee.width,ee.height)}for(let ee=0,ve=Ve.length;ee<ve;ee++)_e=Ve[ee],Ye?U&&t.texSubImage2D(i.TEXTURE_2D,ee,0,0,ye,Fe,_e):t.texImage2D(i.TEXTURE_2D,ee,Se,ye,Fe,_e);_.generateMipmaps=!1}else if(Ye){if(et){let ee=ce(te);t.texStorage2D(i.TEXTURE_2D,xe,Se,ee.width,ee.height)}U&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ye,Fe,te)}else t.texImage2D(i.TEXTURE_2D,0,Se,ye,Fe,te);m(_)&&A(W),pe.__version=ue.version,_.onUpdate&&_.onUpdate(_)}E.__version=_.version}function Ge(E,_,H){if(_.image.length!==6)return;let W=Q(E,_),K=_.source;t.bindTexture(i.TEXTURE_CUBE_MAP,E.__webglTexture,i.TEXTURE0+H);let ue=n.get(K);if(K.version!==ue.__version||W===!0){t.activeTexture(i.TEXTURE0+H);let pe=ot.getPrimaries(ot.workingColorSpace),j=_.colorSpace===ni?null:ot.getPrimaries(_.colorSpace),te=_.colorSpace===ni||pe===j?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,te);let ye=_.isCompressedTexture||_.image[0].isCompressedTexture,Fe=_.image[0]&&_.image[0].isDataTexture,Se=[];for(let se=0;se<6;se++)!ye&&!Fe?Se[se]=p(_.image[se],!0,s.maxCubemapSize):Se[se]=Fe?_.image[se].image:_.image[se],Se[se]=be(_,Se[se]);let _e=Se[0],Ve=r.convert(_.format,_.colorSpace),Ye=r.convert(_.type),et=y(_.internalFormat,Ve,Ye,_.normalized,_.colorSpace),U=_.isVideoTexture!==!0,xe=ue.__version===void 0||W===!0,ee=K.dataReady,ve=b(_,_e);Je(i.TEXTURE_CUBE_MAP,_);let Te;if(ye){U&&xe&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ve,et,_e.width,_e.height);for(let se=0;se<6;se++){Te=Se[se].mipmaps;for(let Ue=0;Ue<Te.length;Ue++){let Pe=Te[Ue];_.format!==yn?Ve!==null?U?ee&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Ue,0,0,Pe.width,Pe.height,Ve,Pe.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Ue,et,Pe.width,Pe.height,0,Pe.data):He("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):U?ee&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Ue,0,0,Pe.width,Pe.height,Ve,Ye,Pe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Ue,et,Pe.width,Pe.height,0,Ve,Ye,Pe.data)}}}else{if(Te=_.mipmaps,U&&xe){Te.length>0&&ve++;let se=ce(Se[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,ve,et,se.width,se.height)}for(let se=0;se<6;se++)if(Fe){U?ee&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,Se[se].width,Se[se].height,Ve,Ye,Se[se].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,et,Se[se].width,Se[se].height,0,Ve,Ye,Se[se].data);for(let Ue=0;Ue<Te.length;Ue++){let Tt=Te[Ue].image[se].image;U?ee&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Ue+1,0,0,Tt.width,Tt.height,Ve,Ye,Tt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Ue+1,et,Tt.width,Tt.height,0,Ve,Ye,Tt.data)}}else{U?ee&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,Ve,Ye,Se[se]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,et,Ve,Ye,Se[se]);for(let Ue=0;Ue<Te.length;Ue++){let Pe=Te[Ue];U?ee&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Ue+1,0,0,Ve,Ye,Pe.image[se]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Ue+1,et,Ve,Ye,Pe.image[se])}}}m(_)&&A(i.TEXTURE_CUBE_MAP),ue.__version=K.version,_.onUpdate&&_.onUpdate(_)}E.__version=_.version}function ze(E,_,H,W,K,ue){let pe=r.convert(H.format,H.colorSpace),j=r.convert(H.type),te=y(H.internalFormat,pe,j,H.normalized,H.colorSpace),ye=n.get(_),Fe=n.get(H);if(Fe.__renderTarget=_,!ye.__hasExternalTextures){let Se=Math.max(1,_.width>>ue),_e=Math.max(1,_.height>>ue);K===i.TEXTURE_3D||K===i.TEXTURE_2D_ARRAY?t.texImage3D(K,ue,te,Se,_e,_.depth,0,pe,j,null):t.texImage2D(K,ue,te,Se,_e,0,pe,j,null)}t.bindFramebuffer(i.FRAMEBUFFER,E),N(_)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,W,K,Fe.__webglTexture,0,qe(_)):(K===i.TEXTURE_2D||K>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,W,K,Fe.__webglTexture,ue),t.bindFramebuffer(i.FRAMEBUFFER,null)}function at(E,_,H){if(i.bindRenderbuffer(i.RENDERBUFFER,E),_.depthBuffer){let W=_.depthTexture,K=W&&W.isDepthTexture?W.type:null,ue=M(_.stencilBuffer,K),pe=_.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;N(_)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,qe(_),ue,_.width,_.height):H?i.renderbufferStorageMultisample(i.RENDERBUFFER,qe(_),ue,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,ue,_.width,_.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,pe,i.RENDERBUFFER,E)}else{let W=_.textures;for(let K=0;K<W.length;K++){let ue=W[K],pe=r.convert(ue.format,ue.colorSpace),j=r.convert(ue.type),te=y(ue.internalFormat,pe,j,ue.normalized,ue.colorSpace);N(_)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,qe(_),te,_.width,_.height):H?i.renderbufferStorageMultisample(i.RENDERBUFFER,qe(_),te,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,te,_.width,_.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function $e(E,_,H){let W=_.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,E),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let K=n.get(_.depthTexture);if(K.__renderTarget=_,(!K.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),W){if(K.__webglInit===void 0&&(K.__webglInit=!0,_.depthTexture.addEventListener("dispose",R)),K.__webglTexture===void 0){K.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,K.__webglTexture),Je(i.TEXTURE_CUBE_MAP,_.depthTexture);let ye=r.convert(_.depthTexture.format),Fe=r.convert(_.depthTexture.type),Se;_.depthTexture.format===Bn?Se=i.DEPTH_COMPONENT24:_.depthTexture.format===Ai&&(Se=i.DEPTH24_STENCIL8);for(let _e=0;_e<6;_e++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0,Se,_.width,_.height,0,ye,Fe,null)}}else X(_.depthTexture,0);let ue=K.__webglTexture,pe=qe(_),j=W?i.TEXTURE_CUBE_MAP_POSITIVE_X+H:i.TEXTURE_2D,te=_.depthTexture.format===Ai?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(_.depthTexture.format===Bn)N(_)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,te,j,ue,0,pe):i.framebufferTexture2D(i.FRAMEBUFFER,te,j,ue,0);else if(_.depthTexture.format===Ai)N(_)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,te,j,ue,0,pe):i.framebufferTexture2D(i.FRAMEBUFFER,te,j,ue,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ie(E){let _=n.get(E),H=E.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==E.depthTexture){let W=E.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),W){let K=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,W.removeEventListener("dispose",K)};W.addEventListener("dispose",K),_.__depthDisposeCallback=K}_.__boundDepthTexture=W}if(E.depthTexture&&!_.__autoAllocateDepthBuffer)if(H)for(let W=0;W<6;W++)$e(_.__webglFramebuffer[W],E,W);else{let W=E.texture.mipmaps;W&&W.length>0?$e(_.__webglFramebuffer[0],E,0):$e(_.__webglFramebuffer,E,0)}else if(H){_.__webglDepthbuffer=[];for(let W=0;W<6;W++)if(t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[W]),_.__webglDepthbuffer[W]===void 0)_.__webglDepthbuffer[W]=i.createRenderbuffer(),at(_.__webglDepthbuffer[W],E,!1);else{let K=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ue=_.__webglDepthbuffer[W];i.bindRenderbuffer(i.RENDERBUFFER,ue),i.framebufferRenderbuffer(i.FRAMEBUFFER,K,i.RENDERBUFFER,ue)}}else{let W=E.texture.mipmaps;if(W&&W.length>0?t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=i.createRenderbuffer(),at(_.__webglDepthbuffer,E,!1);else{let K=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ue=_.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ue),i.framebufferRenderbuffer(i.FRAMEBUFFER,K,i.RENDERBUFFER,ue)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function oe(E,_,H){let W=n.get(E);_!==void 0&&ze(W.__webglFramebuffer,E,E.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),H!==void 0&&ie(E)}function re(E){let _=E.texture,H=n.get(E),W=n.get(_);E.addEventListener("dispose",x);let K=E.textures,ue=E.isWebGLCubeRenderTarget===!0,pe=K.length>1;if(pe||(W.__webglTexture===void 0&&(W.__webglTexture=i.createTexture()),W.__version=_.version,o.memory.textures++),ue){H.__webglFramebuffer=[];for(let j=0;j<6;j++)if(_.mipmaps&&_.mipmaps.length>0){H.__webglFramebuffer[j]=[];for(let te=0;te<_.mipmaps.length;te++)H.__webglFramebuffer[j][te]=i.createFramebuffer()}else H.__webglFramebuffer[j]=i.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){H.__webglFramebuffer=[];for(let j=0;j<_.mipmaps.length;j++)H.__webglFramebuffer[j]=i.createFramebuffer()}else H.__webglFramebuffer=i.createFramebuffer();if(pe)for(let j=0,te=K.length;j<te;j++){let ye=n.get(K[j]);ye.__webglTexture===void 0&&(ye.__webglTexture=i.createTexture(),o.memory.textures++)}if(E.samples>0&&N(E)===!1){H.__webglMultisampledFramebuffer=i.createFramebuffer(),H.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let j=0;j<K.length;j++){let te=K[j];H.__webglColorRenderbuffer[j]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,H.__webglColorRenderbuffer[j]);let ye=r.convert(te.format,te.colorSpace),Fe=r.convert(te.type),Se=y(te.internalFormat,ye,Fe,te.normalized,te.colorSpace,E.isXRRenderTarget===!0),_e=qe(E);i.renderbufferStorageMultisample(i.RENDERBUFFER,_e,Se,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+j,i.RENDERBUFFER,H.__webglColorRenderbuffer[j])}i.bindRenderbuffer(i.RENDERBUFFER,null),E.depthBuffer&&(H.__webglDepthRenderbuffer=i.createRenderbuffer(),at(H.__webglDepthRenderbuffer,E,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ue){t.bindTexture(i.TEXTURE_CUBE_MAP,W.__webglTexture),Je(i.TEXTURE_CUBE_MAP,_);for(let j=0;j<6;j++)if(_.mipmaps&&_.mipmaps.length>0)for(let te=0;te<_.mipmaps.length;te++)ze(H.__webglFramebuffer[j][te],E,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+j,te);else ze(H.__webglFramebuffer[j],E,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0);m(_)&&A(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(pe){for(let j=0,te=K.length;j<te;j++){let ye=K[j],Fe=n.get(ye),Se=i.TEXTURE_2D;(E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(Se=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Se,Fe.__webglTexture),Je(Se,ye),ze(H.__webglFramebuffer,E,ye,i.COLOR_ATTACHMENT0+j,Se,0),m(ye)&&A(Se)}t.unbindTexture()}else{let j=i.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(j=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(j,W.__webglTexture),Je(j,_),_.mipmaps&&_.mipmaps.length>0)for(let te=0;te<_.mipmaps.length;te++)ze(H.__webglFramebuffer[te],E,_,i.COLOR_ATTACHMENT0,j,te);else ze(H.__webglFramebuffer,E,_,i.COLOR_ATTACHMENT0,j,0);m(_)&&A(j),t.unbindTexture()}E.depthBuffer&&ie(E)}function ge(E){let _=E.textures;for(let H=0,W=_.length;H<W;H++){let K=_[H];if(m(K)){let ue=w(E),pe=n.get(K).__webglTexture;t.bindTexture(ue,pe),A(ue),t.unbindTexture()}}}let me=[],We=[];function Ne(E){if(E.samples>0){if(N(E)===!1){let _=E.textures,H=E.width,W=E.height,K=i.COLOR_BUFFER_BIT,ue=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,pe=n.get(E),j=_.length>1;if(j)for(let ye=0;ye<_.length;ye++)t.bindFramebuffer(i.FRAMEBUFFER,pe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ye,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,pe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ye,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,pe.__webglMultisampledFramebuffer);let te=E.texture.mipmaps;te&&te.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,pe.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,pe.__webglFramebuffer);for(let ye=0;ye<_.length;ye++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(K|=i.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(K|=i.STENCIL_BUFFER_BIT)),j){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,pe.__webglColorRenderbuffer[ye]);let Fe=n.get(_[ye]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Fe,0)}i.blitFramebuffer(0,0,H,W,0,0,H,W,K,i.NEAREST),l===!0&&(me.length=0,We.length=0,me.push(i.COLOR_ATTACHMENT0+ye),E.depthBuffer&&E.resolveDepthBuffer===!1&&(me.push(ue),We.push(ue),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,We)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,me))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),j)for(let ye=0;ye<_.length;ye++){t.bindFramebuffer(i.FRAMEBUFFER,pe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ye,i.RENDERBUFFER,pe.__webglColorRenderbuffer[ye]);let Fe=n.get(_[ye]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,pe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ye,i.TEXTURE_2D,Fe,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,pe.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.resolveDepthBuffer===!1&&l){let _=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[_])}}}function qe(E){return Math.min(s.maxSamples,E.samples)}function N(E){let _=n.get(E);return E.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function P(E){let _=o.render.frame;d.get(E)!==_&&(d.set(E,_),E.update())}function be(E,_){let H=E.colorSpace,W=E.format,K=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||H!==dr&&H!==ni&&(ot.getTransfer(H)===dt?(W!==yn||K!==en)&&He("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Xe("WebGLTextures: Unsupported texture color space:",H)),_}function ce(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(c.width=E.naturalWidth||E.width,c.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(c.width=E.displayWidth,c.height=E.displayHeight):(c.width=E.width,c.height=E.height),c}this.allocateTextureUnit=Y,this.resetTextureUnits=Z,this.getTextureUnits=J,this.setTextureUnits=B,this.setTexture2D=X,this.setTexture2DArray=ne,this.setTexture3D=he,this.setTextureCube=de,this.rebindTextures=oe,this.setupRenderTarget=re,this.updateRenderTargetMipmap=ge,this.updateMultisampleRenderTarget=Ne,this.setupDepthRenderbuffer=ie,this.setupFrameBufferTexture=ze,this.useMultisampledRTT=N,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function N_(i,e){function t(n,s=ni){let r,o=ot.getTransfer(s);if(n===en)return i.UNSIGNED_BYTE;if(n===Fa)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Oa)return i.UNSIGNED_SHORT_5_5_5_1;if(n===nd)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===id)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===ed)return i.BYTE;if(n===td)return i.SHORT;if(n===Fs)return i.UNSIGNED_SHORT;if(n===Ua)return i.INT;if(n===Cn)return i.UNSIGNED_INT;if(n===Rn)return i.FLOAT;if(n===zn)return i.HALF_FLOAT;if(n===sd)return i.ALPHA;if(n===rd)return i.RGB;if(n===yn)return i.RGBA;if(n===Bn)return i.DEPTH_COMPONENT;if(n===Ai)return i.DEPTH_STENCIL;if(n===od)return i.RED;if(n===Ba)return i.RED_INTEGER;if(n===Ci)return i.RG;if(n===ka)return i.RG_INTEGER;if(n===za)return i.RGBA_INTEGER;if(n===Hr||n===Vr||n===Gr||n===Wr)if(o===dt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Hr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Vr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Gr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Wr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Hr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Vr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Gr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Wr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ha||n===Va||n===Ga||n===Wa)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Ha)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Va)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ga)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Wa)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Xa||n===qa||n===Ya||n===$a||n===Za||n===Xr||n===Ja)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Xa||n===qa)return o===dt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Ya)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===$a)return r.COMPRESSED_R11_EAC;if(n===Za)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Xr)return r.COMPRESSED_RG11_EAC;if(n===Ja)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Ka||n===ja||n===Qa||n===el||n===tl||n===nl||n===il||n===sl||n===rl||n===ol||n===al||n===ll||n===cl||n===dl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Ka)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ja)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Qa)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===el)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===tl)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===nl)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===il)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===sl)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===rl)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===ol)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===al)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ll)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===cl)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===dl)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===hl||n===ul||n===fl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===hl)return o===dt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ul)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===fl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===pl||n===ml||n===qr||n===gl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===pl)return r.COMPRESSED_RED_RGTC1_EXT;if(n===ml)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===qr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===gl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Os?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var U_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,F_=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Cd=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new br(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new dn({vertexShader:U_,fragmentShader:F_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Pt(new xi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Rd=class extends wn{constructor(e,t){super();let n=this,s=null,r=1,o=null,a="local-floor",l=1,c=null,d=null,u=null,h=null,f=null,g=null,v=typeof XRWebGLBinding<"u",p=new Cd,m={},A=t.getContextAttributes(),w=null,y=null,M=[],b=[],R=new le,x=null,C=new $t;C.viewport=new Mt;let L=new $t;L.viewport=new Mt;let D=[C,L],k=new Ia,Z=null,J=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Q){let fe=M[Q];return fe===void 0&&(fe=new Es,M[Q]=fe),fe.getTargetRaySpace()},this.getControllerGrip=function(Q){let fe=M[Q];return fe===void 0&&(fe=new Es,M[Q]=fe),fe.getGripSpace()},this.getHand=function(Q){let fe=M[Q];return fe===void 0&&(fe=new Es,M[Q]=fe),fe.getHandSpace()};function B(Q){let fe=b.indexOf(Q.inputSource);if(fe===-1)return;let ae=M[fe];ae!==void 0&&(ae.update(Q.inputSource,Q.frame,c||o),ae.dispatchEvent({type:Q.type,data:Q.inputSource}))}function Y(){s.removeEventListener("select",B),s.removeEventListener("selectstart",B),s.removeEventListener("selectend",B),s.removeEventListener("squeeze",B),s.removeEventListener("squeezestart",B),s.removeEventListener("squeezeend",B),s.removeEventListener("end",Y),s.removeEventListener("inputsourceschange",z);for(let Q=0;Q<M.length;Q++){let fe=b[Q];fe!==null&&(b[Q]=null,M[Q].disconnect(fe))}Z=null,J=null,p.reset();for(let Q in m)delete m[Q];e.setRenderTarget(w),f=null,h=null,u=null,s=null,y=null,Je.stop(),n.isPresenting=!1,e.setPixelRatio(x),e.setSize(R.width,R.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Q){r=Q,n.isPresenting===!0&&He("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Q){a=Q,n.isPresenting===!0&&He("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(Q){c=Q},this.getBaseLayer=function(){return h!==null?h:f},this.getBinding=function(){return u===null&&v&&(u=new XRWebGLBinding(s,t)),u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(Q){if(s=Q,s!==null){if(w=e.getRenderTarget(),s.addEventListener("select",B),s.addEventListener("selectstart",B),s.addEventListener("selectend",B),s.addEventListener("squeeze",B),s.addEventListener("squeezestart",B),s.addEventListener("squeezeend",B),s.addEventListener("end",Y),s.addEventListener("inputsourceschange",z),A.xrCompatible!==!0&&await t.makeXRCompatible(),x=e.getPixelRatio(),e.getSize(R),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let ae=null,Le=null,Ge=null;A.depth&&(Ge=A.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ae=A.stencil?Ai:Bn,Le=A.stencil?Os:Cn);let ze={colorFormat:t.RGBA8,depthFormat:Ge,scaleFactor:r};u=this.getBinding(),h=u.createProjectionLayer(ze),s.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),y=new ln(h.textureWidth,h.textureHeight,{format:yn,type:en,depthTexture:new ti(h.textureWidth,h.textureHeight,Le,void 0,void 0,void 0,void 0,void 0,void 0,ae),stencilBuffer:A.stencil,colorSpace:e.outputColorSpace,samples:A.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{let ae={antialias:A.antialias,alpha:!0,depth:A.depth,stencil:A.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,ae),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new ln(f.framebufferWidth,f.framebufferHeight,{format:yn,type:en,colorSpace:e.outputColorSpace,stencilBuffer:A.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),Je.setContext(s),Je.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function z(Q){for(let fe=0;fe<Q.removed.length;fe++){let ae=Q.removed[fe],Le=b.indexOf(ae);Le>=0&&(b[Le]=null,M[Le].disconnect(ae))}for(let fe=0;fe<Q.added.length;fe++){let ae=Q.added[fe],Le=b.indexOf(ae);if(Le===-1){for(let ze=0;ze<M.length;ze++)if(ze>=b.length){b.push(ae),Le=ze;break}else if(b[ze]===null){b[ze]=ae,Le=ze;break}if(Le===-1)break}let Ge=M[Le];Ge&&Ge.connect(ae)}}let X=new I,ne=new I;function he(Q,fe,ae){X.setFromMatrixPosition(fe.matrixWorld),ne.setFromMatrixPosition(ae.matrixWorld);let Le=X.distanceTo(ne),Ge=fe.projectionMatrix.elements,ze=ae.projectionMatrix.elements,at=Ge[14]/(Ge[10]-1),$e=Ge[14]/(Ge[10]+1),ie=(Ge[9]+1)/Ge[5],oe=(Ge[9]-1)/Ge[5],re=(Ge[8]-1)/Ge[0],ge=(ze[8]+1)/ze[0],me=at*re,We=at*ge,Ne=Le/(-re+ge),qe=Ne*-re;if(fe.matrixWorld.decompose(Q.position,Q.quaternion,Q.scale),Q.translateX(qe),Q.translateZ(Ne),Q.matrixWorld.compose(Q.position,Q.quaternion,Q.scale),Q.matrixWorldInverse.copy(Q.matrixWorld).invert(),Ge[10]===-1)Q.projectionMatrix.copy(fe.projectionMatrix),Q.projectionMatrixInverse.copy(fe.projectionMatrixInverse);else{let N=at+Ne,P=$e+Ne,be=me-qe,ce=We+(Le-qe),E=ie*$e/P*N,_=oe*$e/P*N;Q.projectionMatrix.makePerspective(be,ce,E,_,N,P),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert()}}function de(Q,fe){fe===null?Q.matrixWorld.copy(Q.matrix):Q.matrixWorld.multiplyMatrices(fe.matrixWorld,Q.matrix),Q.matrixWorldInverse.copy(Q.matrixWorld).invert()}this.updateCamera=function(Q){if(s===null)return;let fe=Q.near,ae=Q.far;p.texture!==null&&(p.depthNear>0&&(fe=p.depthNear),p.depthFar>0&&(ae=p.depthFar)),k.near=L.near=C.near=fe,k.far=L.far=C.far=ae,(Z!==k.near||J!==k.far)&&(s.updateRenderState({depthNear:k.near,depthFar:k.far}),Z=k.near,J=k.far),k.layers.mask=Q.layers.mask|6,C.layers.mask=k.layers.mask&-5,L.layers.mask=k.layers.mask&-3;let Le=Q.parent,Ge=k.cameras;de(k,Le);for(let ze=0;ze<Ge.length;ze++)de(Ge[ze],Le);Ge.length===2?he(k,C,L):k.projectionMatrix.copy(C.projectionMatrix),Ae(Q,k,Le)};function Ae(Q,fe,ae){ae===null?Q.matrix.copy(fe.matrixWorld):(Q.matrix.copy(ae.matrixWorld),Q.matrix.invert(),Q.matrix.multiply(fe.matrixWorld)),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.updateMatrixWorld(!0),Q.projectionMatrix.copy(fe.projectionMatrix),Q.projectionMatrixInverse.copy(fe.projectionMatrixInverse),Q.isPerspectiveCamera&&(Q.fov=Ss*2*Math.atan(1/Q.projectionMatrix.elements[5]),Q.zoom=1)}this.getCamera=function(){return k},this.getFoveation=function(){if(!(h===null&&f===null))return l},this.setFoveation=function(Q){l=Q,h!==null&&(h.fixedFoveation=Q),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Q)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(k)},this.getCameraTexture=function(Q){return m[Q]};let Ze=null;function Qe(Q,fe){if(d=fe.getViewerPose(c||o),g=fe,d!==null){let ae=d.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let Le=!1;ae.length!==k.cameras.length&&(k.cameras.length=0,Le=!0);for(let $e=0;$e<ae.length;$e++){let ie=ae[$e],oe=null;if(f!==null)oe=f.getViewport(ie);else{let ge=u.getViewSubImage(h,ie);oe=ge.viewport,$e===0&&(e.setRenderTargetTextures(y,ge.colorTexture,ge.depthStencilTexture),e.setRenderTarget(y))}let re=D[$e];re===void 0&&(re=new $t,re.layers.enable($e),re.viewport=new Mt,D[$e]=re),re.matrix.fromArray(ie.transform.matrix),re.matrix.decompose(re.position,re.quaternion,re.scale),re.projectionMatrix.fromArray(ie.projectionMatrix),re.projectionMatrixInverse.copy(re.projectionMatrix).invert(),re.viewport.set(oe.x,oe.y,oe.width,oe.height),$e===0&&(k.matrix.copy(re.matrix),k.matrix.decompose(k.position,k.quaternion,k.scale)),Le===!0&&k.cameras.push(re)}let Ge=s.enabledFeatures;if(Ge&&Ge.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){u=n.getBinding();let $e=u.getDepthInformation(ae[0]);$e&&$e.isValid&&$e.texture&&p.init($e,s.renderState)}if(Ge&&Ge.includes("camera-access")&&v){e.state.unbindTexture(),u=n.getBinding();for(let $e=0;$e<ae.length;$e++){let ie=ae[$e].camera;if(ie){let oe=m[ie];oe||(oe=new br,m[ie]=oe);let re=u.getCameraImage(ie);oe.sourceTexture=re}}}}for(let ae=0;ae<M.length;ae++){let Le=b[ae],Ge=M[ae];Le!==null&&Ge!==void 0&&Ge.update(Le,fe,c||o)}Ze&&Ze(Q,fe),fe.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:fe}),g=null}let Je=new gf;Je.setAnimationLoop(Qe),this.setAnimationLoop=function(Q){Ze=Q},this.dispose=function(){}}},O_=new ht,Sf=new Ke;Sf.set(-1,0,0,0,1,0,0,0,1);function B_(i,e){function t(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function n(p,m){m.color.getRGB(p.fogColor.value,hd(i)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function s(p,m,A,w,y){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?r(p,m):m.isMeshLambertMaterial?(r(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(p,m),u(p,m)):m.isMeshPhongMaterial?(r(p,m),d(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(p,m),h(p,m),m.isMeshPhysicalMaterial&&f(p,m,y)):m.isMeshMatcapMaterial?(r(p,m),g(p,m)):m.isMeshDepthMaterial?r(p,m):m.isMeshDistanceMaterial?(r(p,m),v(p,m)):m.isMeshNormalMaterial?r(p,m):m.isLineBasicMaterial?(o(p,m),m.isLineDashedMaterial&&a(p,m)):m.isPointsMaterial?l(p,m,A,w):m.isSpriteMaterial?c(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,t(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===jt&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,t(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===jt&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,t(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,t(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);let A=e.get(m),w=A.envMap,y=A.envMapRotation;w&&(p.envMap.value=w,p.envMapRotation.value.setFromMatrix4(O_.makeRotationFromEuler(y)).transpose(),w.isCubeTexture&&w.isRenderTargetTexture===!1&&p.envMapRotation.value.premultiply(Sf),p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,p.aoMapTransform))}function o(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform))}function a(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function l(p,m,A,w){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*A,p.scale.value=w*.5,m.map&&(p.map.value=m.map,t(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function c(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function d(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function u(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function h(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function f(p,m,A){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===jt&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=A.texture,p.transmissionSamplerSize.value.set(A.width,A.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function v(p,m){let A=e.get(m).light;p.referencePosition.value.setFromMatrixPosition(A.matrixWorld),p.nearDistance.value=A.shadow.camera.near,p.farDistance.value=A.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function k_(i,e,t,n){let s={},r={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,M){let b=M.program;n.uniformBlockBinding(y,b)}function c(y,M){let b=s[y.id];b===void 0&&(p(y),b=d(y),s[y.id]=b,y.addEventListener("dispose",A));let R=M.program;n.updateUBOMapping(y,R);let x=e.render.frame;r[y.id]!==x&&(h(y),r[y.id]=x)}function d(y){let M=u();y.__bindingPointIndex=M;let b=i.createBuffer(),R=y.__size,x=y.usage;return i.bindBuffer(i.UNIFORM_BUFFER,b),i.bufferData(i.UNIFORM_BUFFER,R,x),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,M,b),b}function u(){for(let y=0;y<a;y++)if(o.indexOf(y)===-1)return o.push(y),y;return Xe("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(y){let M=s[y.id],b=y.uniforms,R=y.__cache;i.bindBuffer(i.UNIFORM_BUFFER,M);for(let x=0,C=b.length;x<C;x++){let L=b[x];if(Array.isArray(L))for(let D=0,k=L.length;D<k;D++)f(L[D],x,D,R);else f(L,x,0,R)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(y,M,b,R){if(v(y,M,b,R)===!0){let x=y.__offset,C=y.value;if(Array.isArray(C)){let L=0;for(let D=0;D<C.length;D++){let k=C[D],Z=m(k);g(k,y.__data,L),typeof k!="number"&&typeof k!="boolean"&&!k.isMatrix3&&!ArrayBuffer.isView(k)&&(L+=Z.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(C,y.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,x,y.__data)}}function g(y,M,b){typeof y=="number"||typeof y=="boolean"?M[0]=y:y.isMatrix3?(M[0]=y.elements[0],M[1]=y.elements[1],M[2]=y.elements[2],M[3]=0,M[4]=y.elements[3],M[5]=y.elements[4],M[6]=y.elements[5],M[7]=0,M[8]=y.elements[6],M[9]=y.elements[7],M[10]=y.elements[8],M[11]=0):ArrayBuffer.isView(y)?M.set(new y.constructor(y.buffer,y.byteOffset,M.length)):y.toArray(M,b)}function v(y,M,b,R){let x=y.value,C=M+"_"+b;if(R[C]===void 0)return typeof x=="number"||typeof x=="boolean"?R[C]=x:ArrayBuffer.isView(x)?R[C]=x.slice():R[C]=x.clone(),!0;{let L=R[C];if(typeof x=="number"||typeof x=="boolean"){if(L!==x)return R[C]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(L.equals(x)===!1)return L.copy(x),!0}}return!1}function p(y){let M=y.uniforms,b=0,R=16;for(let C=0,L=M.length;C<L;C++){let D=Array.isArray(M[C])?M[C]:[M[C]];for(let k=0,Z=D.length;k<Z;k++){let J=D[k],B=Array.isArray(J.value)?J.value:[J.value];for(let Y=0,z=B.length;Y<z;Y++){let X=B[Y],ne=m(X),he=b%R,de=he%ne.boundary,Ae=he+de;b+=de,Ae!==0&&R-Ae<ne.storage&&(b+=R-Ae),J.__data=new Float32Array(ne.storage/Float32Array.BYTES_PER_ELEMENT),J.__offset=b,b+=ne.storage}}}let x=b%R;return x>0&&(b+=R-x),y.__size=b,y.__cache={},this}function m(y){let M={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(M.boundary=4,M.storage=4):y.isVector2?(M.boundary=8,M.storage=8):y.isVector3||y.isColor?(M.boundary=16,M.storage=12):y.isVector4?(M.boundary=16,M.storage=16):y.isMatrix3?(M.boundary=48,M.storage=48):y.isMatrix4?(M.boundary=64,M.storage=64):y.isTexture?He("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(M.boundary=16,M.storage=y.byteLength):He("WebGLRenderer: Unsupported uniform value type.",y),M}function A(y){let M=y.target;M.removeEventListener("dispose",A);let b=o.indexOf(M.__bindingPointIndex);o.splice(b,1),i.deleteBuffer(s[M.id]),delete s[M.id],delete r[M.id]}function w(){for(let y in s)i.deleteBuffer(s[y]);o=[],s={},r={}}return{bind:l,update:c,dispose:w}}var z_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Hn=null;function H_(){return Hn===null&&(Hn=new oa(z_,16,16,Ci,zn),Hn.name="DFG_LUT",Hn.minFilter=Gt,Hn.magFilter=Gt,Hn.wrapS=Fn,Hn.wrapT=Fn,Hn.generateMipmaps=!1,Hn.needsUpdate=!0),Hn}var zs=class{constructor(e={}){let{canvas:t=Uu(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:h=!1,outputBufferType:f=en}=e;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=o;let v=f,p=new Set([za,ka,Ba]),m=new Set([en,Cn,Fs,Os,Fa,Oa]),A=new Uint32Array(4),w=new Int32Array(4),y=new I,M=null,b=null,R=[],x=[],C=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=An,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let L=this,D=!1,k=null,Z=null,J=null,B=null;this._outputColorSpace=an;let Y=0,z=0,X=null,ne=-1,he=null,de=new Mt,Ae=new Mt,Ze=null,Qe=new je(0),Je=0,Q=t.width,fe=t.height,ae=1,Le=null,Ge=null,ze=new Mt(0,0,Q,fe),at=new Mt(0,0,Q,fe),$e=!1,ie=new As,oe=!1,re=!1,ge=new ht,me=new I,We=new Mt,Ne={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},qe=!1;function N(){return X===null?ae:1}let P=n;function be(S,F){return t.getContext(S,F)}try{let S={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"185"}`),t.addEventListener("webglcontextlost",Tt,!1),t.addEventListener("webglcontextrestored",_t,!1),t.addEventListener("webglcontextcreationerror",In,!1),P===null){let F="webgl2";if(P=be(F,S),P===null)throw be(F)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(S){throw Xe("WebGLRenderer: "+S.message),S}let ce,E,_,H,W,K,ue,pe,j,te,ye,Fe,Se,_e,Ve,Ye,et,U,xe,ee,ve,Te,se;function Ue(){ce=new $x(P),ce.init(),ve=new N_(P,ce),E=new zx(P,ce,e,ve),_=new D_(P,ce),E.reversedDepthBuffer&&h&&_.buffers.depth.setReversed(!0),Z=P.createFramebuffer(),J=P.createFramebuffer(),B=P.createFramebuffer(),H=new Kx(P),W=new y_,K=new L_(P,ce,_,W,E,ve,H),ue=new Yx(L),pe=new tg(P),Te=new Bx(P,pe),j=new Zx(P,pe,H,Te),te=new Qx(P,j,pe,Te,H),U=new jx(P,E,K),Ve=new Hx(W),ye=new x_(L,ue,ce,E,Te,Ve),Fe=new B_(L,W),Se=new v_,_e=new T_(ce),et=new Ox(L,ue,_,te,g,l),Ye=new I_(L,te,E),se=new k_(P,H,E,_),xe=new kx(P,ce,H),ee=new Jx(P,ce,H),H.programs=ye.programs,L.capabilities=E,L.extensions=ce,L.properties=W,L.renderLists=Se,L.shadowMap=Ye,L.state=_,L.info=H}Ue(),v!==en&&(C=new ty(v,t.width,t.height,a,s,r));let Pe=new Rd(L,P);this.xr=Pe,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){let S=ce.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){let S=ce.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return ae},this.setPixelRatio=function(S){S!==void 0&&(ae=S,this.setSize(Q,fe,!1))},this.getSize=function(S){return S.set(Q,fe)},this.setSize=function(S,F,$=!0){if(Pe.isPresenting){He("WebGLRenderer: Can't change size while VR device is presenting.");return}Q=S,fe=F,t.width=Math.floor(S*ae),t.height=Math.floor(F*ae),$===!0&&(t.style.width=S+"px",t.style.height=F+"px"),C!==null&&C.setSize(t.width,t.height),this.setViewport(0,0,S,F)},this.getDrawingBufferSize=function(S){return S.set(Q*ae,fe*ae).floor()},this.setDrawingBufferSize=function(S,F,$){Q=S,fe=F,ae=$,t.width=Math.floor(S*$),t.height=Math.floor(F*$),this.setViewport(0,0,S,F)},this.setEffects=function(S){if(v===en){Xe("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(S){for(let F=0;F<S.length;F++)if(S[F].isOutputPass===!0){He("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}C.setEffects(S||[])},this.getCurrentViewport=function(S){return S.copy(de)},this.getViewport=function(S){return S.copy(ze)},this.setViewport=function(S,F,$,V){S.isVector4?ze.set(S.x,S.y,S.z,S.w):ze.set(S,F,$,V),_.viewport(de.copy(ze).multiplyScalar(ae).round())},this.getScissor=function(S){return S.copy(at)},this.setScissor=function(S,F,$,V){S.isVector4?at.set(S.x,S.y,S.z,S.w):at.set(S,F,$,V),_.scissor(Ae.copy(at).multiplyScalar(ae).round())},this.getScissorTest=function(){return $e},this.setScissorTest=function(S){_.setScissorTest($e=S)},this.setOpaqueSort=function(S){Le=S},this.setTransparentSort=function(S){Ge=S},this.getClearColor=function(S){return S.copy(et.getClearColor())},this.setClearColor=function(){et.setClearColor(...arguments)},this.getClearAlpha=function(){return et.getClearAlpha()},this.setClearAlpha=function(){et.setClearAlpha(...arguments)},this.clear=function(S=!0,F=!0,$=!0){let V=0;if(S){let G=!1;if(X!==null){let Ee=X.texture.format;G=p.has(Ee)}if(G){let Ee=X.texture.type,Re=m.has(Ee),we=et.getClearColor(),De=et.getClearAlpha(),Oe=we.r,tt=we.g,rt=we.b;Re?(A[0]=Oe,A[1]=tt,A[2]=rt,A[3]=De,P.clearBufferuiv(P.COLOR,0,A)):(w[0]=Oe,w[1]=tt,w[2]=rt,w[3]=De,P.clearBufferiv(P.COLOR,0,w))}else V|=P.COLOR_BUFFER_BIT}F&&(V|=P.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),$&&(V|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),V!==0&&P.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(S){S.setRenderer(this),k=S},this.dispose=function(){t.removeEventListener("webglcontextlost",Tt,!1),t.removeEventListener("webglcontextrestored",_t,!1),t.removeEventListener("webglcontextcreationerror",In,!1),et.dispose(),Se.dispose(),_e.dispose(),W.dispose(),ue.dispose(),te.dispose(),Te.dispose(),se.dispose(),ye.dispose(),Pe.dispose(),Pe.removeEventListener("sessionstart",hh),Pe.removeEventListener("sessionend",uh),Ui.stop()};function Tt(S){S.preventDefault(),fr("WebGLRenderer: Context Lost."),D=!0}function _t(){fr("WebGLRenderer: Context Restored."),D=!1;let S=H.autoReset,F=Ye.enabled,$=Ye.autoUpdate,V=Ye.needsUpdate,G=Ye.type;Ue(),H.autoReset=S,Ye.enabled=F,Ye.autoUpdate=$,Ye.needsUpdate=V,Ye.type=G}function In(S){Xe("WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function Dn(S){let F=S.target;F.removeEventListener("dispose",Dn),vp(F)}function vp(S){bp(S),W.remove(S)}function bp(S){let F=W.get(S).programs;F!==void 0&&(F.forEach(function($){ye.releaseProgram($)}),S.isShaderMaterial&&ye.releaseShaderCache(S))}this.renderBufferDirect=function(S,F,$,V,G,Ee){F===null&&(F=Ne);let Re=G.isMesh&&G.matrixWorld.determinantAffine()<0,we=wp(S,F,$,V,G);_.setMaterial(V,Re);let De=$.index,Oe=1;if(V.wireframe===!0){if(De=j.getWireframeAttribute($),De===void 0)return;Oe=2}let tt=$.drawRange,rt=$.attributes.position,Be=tt.start*Oe,mt=(tt.start+tt.count)*Oe;Ee!==null&&(Be=Math.max(Be,Ee.start*Oe),mt=Math.min(mt,(Ee.start+Ee.count)*Oe)),De!==null?(Be=Math.max(Be,0),mt=Math.min(mt,De.count)):rt!=null&&(Be=Math.max(Be,0),mt=Math.min(mt,rt.count));let Ct=mt-Be;if(Ct<0||Ct===1/0)return;Te.setup(G,V,we,$,De);let At,xt=xe;if(De!==null&&(At=pe.get(De),xt=ee,xt.setIndex(At)),G.isMesh)V.wireframe===!0?(_.setLineWidth(V.wireframeLinewidth*N()),xt.setMode(P.LINES)):xt.setMode(P.TRIANGLES);else if(G.isLine){let Xt=V.linewidth;Xt===void 0&&(Xt=1),_.setLineWidth(Xt*N()),G.isLineSegments?xt.setMode(P.LINES):G.isLineLoop?xt.setMode(P.LINE_LOOP):xt.setMode(P.LINE_STRIP)}else G.isPoints?xt.setMode(P.POINTS):G.isSprite&&xt.setMode(P.TRIANGLES);if(G.isBatchedMesh)if(ce.get("WEBGL_multi_draw"))xt.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{let Xt=G._multiDrawStarts,Ce=G._multiDrawCounts,sn=G._multiDrawCount,lt=De?pe.get(De).bytesPerElement:1,fn=W.get(V).currentProgram.getUniforms();for(let Ln=0;Ln<sn;Ln++)fn.setValue(P,"_gl_DrawID",Ln),xt.render(Xt[Ln]/lt,Ce[Ln])}else if(G.isInstancedMesh)xt.renderInstances(Be,Ct,G.count);else if($.isInstancedBufferGeometry){let Xt=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,Ce=Math.min($.instanceCount,Xt);xt.renderInstances(Be,Ct,Ce)}else xt.render(Be,Ct)};function dh(S,F,$){S.transparent===!0&&S.side===un&&S.forceSinglePass===!1?(S.side=jt,S.needsUpdate=!0,ao(S,F,$),S.side=jn,S.needsUpdate=!0,ao(S,F,$),S.side=un):ao(S,F,$)}this.compile=function(S,F,$=null){$===null&&($=S),b=_e.get($),b.init(F),x.push(b),$.traverseVisible(function(G){G.isLight&&G.layers.test(F.layers)&&(b.pushLight(G),G.castShadow&&b.pushShadow(G))}),S!==$&&S.traverseVisible(function(G){G.isLight&&G.layers.test(F.layers)&&(b.pushLight(G),G.castShadow&&b.pushShadow(G))}),b.setupLights();let V=new Set;return S.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;let Ee=G.material;if(Ee)if(Array.isArray(Ee))for(let Re=0;Re<Ee.length;Re++){let we=Ee[Re];dh(we,$,G),V.add(we)}else dh(Ee,$,G),V.add(Ee)}),b=x.pop(),V},this.compileAsync=function(S,F,$=null){let V=this.compile(S,F,$);return new Promise(G=>{function Ee(){if(V.forEach(function(Re){W.get(Re).currentProgram.isReady()&&V.delete(Re)}),V.size===0){G(S);return}setTimeout(Ee,10)}ce.get("KHR_parallel_shader_compile")!==null?Ee():setTimeout(Ee,10)})};let Jl=null;function Sp(S){Jl&&Jl(S)}function hh(){Ui.stop()}function uh(){Ui.start()}let Ui=new gf;Ui.setAnimationLoop(Sp),typeof self<"u"&&Ui.setContext(self),this.setAnimationLoop=function(S){Jl=S,Pe.setAnimationLoop(S),S===null?Ui.stop():Ui.start()},Pe.addEventListener("sessionstart",hh),Pe.addEventListener("sessionend",uh),this.render=function(S,F){if(F!==void 0&&F.isCamera!==!0){Xe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;k!==null&&k.renderStart(S,F);let $=Pe.enabled===!0&&Pe.isPresenting===!0,V=C!==null&&(X===null||$)&&C.begin(L,X);if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),Pe.enabled===!0&&Pe.isPresenting===!0&&(C===null||C.isCompositing()===!1)&&(Pe.cameraAutoUpdate===!0&&Pe.updateCamera(F),F=Pe.getCamera()),S.isScene===!0&&S.onBeforeRender(L,S,F,X),b=_e.get(S,x.length),b.init(F),b.state.textureUnits=K.getTextureUnits(),x.push(b),ge.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),ie.setFromProjectionMatrix(ge,Mn,F.reversedDepth),re=this.localClippingEnabled,oe=Ve.init(this.clippingPlanes,re),M=Se.get(S,R.length),M.init(),R.push(M),Pe.enabled===!0&&Pe.isPresenting===!0){let Re=L.xr.getDepthSensingMesh();Re!==null&&Kl(Re,F,-1/0,L.sortObjects)}Kl(S,F,0,L.sortObjects),M.finish(),L.sortObjects===!0&&M.sort(Le,Ge,F.reversedDepth),qe=Pe.enabled===!1||Pe.isPresenting===!1||Pe.hasDepthSensing()===!1,qe&&et.addToRenderList(M,S),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),oe===!0&&Ve.beginShadows();let G=b.state.shadowsArray;if(Ye.render(G,S,F),oe===!0&&Ve.endShadows(),(V&&C.hasRenderPass())===!1){let Re=M.opaque,we=M.transmissive;if(b.setupLights(),F.isArrayCamera){let De=F.cameras;if(we.length>0)for(let Oe=0,tt=De.length;Oe<tt;Oe++){let rt=De[Oe];ph(Re,we,S,rt)}qe&&et.render(S);for(let Oe=0,tt=De.length;Oe<tt;Oe++){let rt=De[Oe];fh(M,S,rt,rt.viewport)}}else we.length>0&&ph(Re,we,S,F),qe&&et.render(S),fh(M,S,F)}X!==null&&z===0&&(K.updateMultisampleRenderTarget(X),K.updateRenderTargetMipmap(X)),V&&C.end(L),S.isScene===!0&&S.onAfterRender(L,S,F),Te.resetDefaultState(),ne=-1,he=null,x.pop(),x.length>0?(b=x[x.length-1],K.setTextureUnits(b.state.textureUnits),oe===!0&&Ve.setGlobalState(L.clippingPlanes,b.state.camera)):b=null,R.pop(),R.length>0?M=R[R.length-1]:M=null,k!==null&&k.renderEnd()};function Kl(S,F,$,V){if(S.visible===!1)return;if(S.layers.test(F.layers)){if(S.isGroup)$=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(F);else if(S.isLightProbeGrid)b.pushLightProbeGrid(S);else if(S.isLight)b.pushLight(S),S.castShadow&&b.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||ie.intersectsSprite(S)){V&&We.setFromMatrixPosition(S.matrixWorld).applyMatrix4(ge);let Re=te.update(S),we=S.material;we.visible&&M.push(S,Re,we,$,We.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||ie.intersectsObject(S))){let Re=te.update(S),we=S.material;if(V&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),We.copy(S.boundingSphere.center)):(Re.boundingSphere===null&&Re.computeBoundingSphere(),We.copy(Re.boundingSphere.center)),We.applyMatrix4(S.matrixWorld).applyMatrix4(ge)),Array.isArray(we)){let De=Re.groups;for(let Oe=0,tt=De.length;Oe<tt;Oe++){let rt=De[Oe],Be=we[rt.materialIndex];Be&&Be.visible&&M.push(S,Re,Be,$,We.z,rt)}}else we.visible&&M.push(S,Re,we,$,We.z,null)}}let Ee=S.children;for(let Re=0,we=Ee.length;Re<we;Re++)Kl(Ee[Re],F,$,V)}function fh(S,F,$,V){let{opaque:G,transmissive:Ee,transparent:Re}=S;b.setupLightsView($),oe===!0&&Ve.setGlobalState(L.clippingPlanes,$),V&&_.viewport(de.copy(V)),G.length>0&&oo(G,F,$),Ee.length>0&&oo(Ee,F,$),Re.length>0&&oo(Re,F,$),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function ph(S,F,$,V){if(($.isScene===!0?$.overrideMaterial:null)!==null)return;if(b.state.transmissionRenderTarget[V.id]===void 0){let Be=ce.has("EXT_color_buffer_half_float")||ce.has("EXT_color_buffer_float");b.state.transmissionRenderTarget[V.id]=new ln(1,1,{generateMipmaps:!0,type:Be?zn:en,minFilter:Ti,samples:Math.max(4,E.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ot.workingColorSpace})}let Ee=b.state.transmissionRenderTarget[V.id],Re=V.viewport||de;Ee.setSize(Re.z*L.transmissionResolutionScale,Re.w*L.transmissionResolutionScale);let we=L.getRenderTarget(),De=L.getActiveCubeFace(),Oe=L.getActiveMipmapLevel();L.setRenderTarget(Ee),L.getClearColor(Qe),Je=L.getClearAlpha(),Je<1&&L.setClearColor(16777215,.5),L.clear(),qe&&et.render($);let tt=L.toneMapping;L.toneMapping=An;let rt=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),b.setupLightsView(V),oe===!0&&Ve.setGlobalState(L.clippingPlanes,V),oo(S,$,V),K.updateMultisampleRenderTarget(Ee),K.updateRenderTargetMipmap(Ee),ce.has("WEBGL_multisampled_render_to_texture")===!1){let Be=!1;for(let mt=0,Ct=F.length;mt<Ct;mt++){let At=F[mt],{object:xt,geometry:Xt,material:Ce,group:sn}=At;if(Ce.side===un&&xt.layers.test(V.layers)){let lt=Ce.side;Ce.side=jt,Ce.needsUpdate=!0,mh(xt,$,V,Xt,Ce,sn),Ce.side=lt,Ce.needsUpdate=!0,Be=!0}}Be===!0&&(K.updateMultisampleRenderTarget(Ee),K.updateRenderTargetMipmap(Ee))}L.setRenderTarget(we,De,Oe),L.setClearColor(Qe,Je),rt!==void 0&&(V.viewport=rt),L.toneMapping=tt}function oo(S,F,$){let V=F.isScene===!0?F.overrideMaterial:null;for(let G=0,Ee=S.length;G<Ee;G++){let Re=S[G],{object:we,geometry:De,group:Oe}=Re,tt=Re.material;tt.allowOverride===!0&&V!==null&&(tt=V),we.layers.test($.layers)&&mh(we,F,$,De,tt,Oe)}}function mh(S,F,$,V,G,Ee){S.onBeforeRender(L,F,$,V,G,Ee),S.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),G.onBeforeRender(L,F,$,V,S,Ee),G.transparent===!0&&G.side===un&&G.forceSinglePass===!1?(G.side=jt,G.needsUpdate=!0,L.renderBufferDirect($,F,V,G,S,Ee),G.side=jn,G.needsUpdate=!0,L.renderBufferDirect($,F,V,G,S,Ee),G.side=un):L.renderBufferDirect($,F,V,G,S,Ee),S.onAfterRender(L,F,$,V,G,Ee)}function ao(S,F,$){F.isScene!==!0&&(F=Ne);let V=W.get(S),G=b.state.lights,Ee=b.state.shadowsArray,Re=G.state.version,we=ye.getParameters(S,G.state,Ee,F,$,b.state.lightProbeGridArray),De=ye.getProgramCacheKey(we),Oe=V.programs;V.environment=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?F.environment:null,V.fog=F.fog;let tt=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap;V.envMap=ue.get(S.envMap||V.environment,tt),V.envMapRotation=V.environment!==null&&S.envMap===null?F.environmentRotation:S.envMapRotation,Oe===void 0&&(S.addEventListener("dispose",Dn),Oe=new Map,V.programs=Oe);let rt=Oe.get(De);if(rt!==void 0){if(V.currentProgram===rt&&V.lightsStateVersion===Re)return xh(S,we),rt}else we.uniforms=ye.getUniforms(S),k!==null&&S.isNodeMaterial&&k.build(S,$,we),S.onBeforeCompile(we,L),rt=ye.acquireProgram(we,De),Oe.set(De,rt),V.uniforms=we.uniforms;let Be=V.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Be.clippingPlanes=Ve.uniform),xh(S,we),V.needsLights=Tp(S),V.lightsStateVersion=Re,V.needsLights&&(Be.ambientLightColor.value=G.state.ambient,Be.lightProbe.value=G.state.probe,Be.directionalLights.value=G.state.directional,Be.directionalLightShadows.value=G.state.directionalShadow,Be.spotLights.value=G.state.spot,Be.spotLightShadows.value=G.state.spotShadow,Be.rectAreaLights.value=G.state.rectArea,Be.ltc_1.value=G.state.rectAreaLTC1,Be.ltc_2.value=G.state.rectAreaLTC2,Be.pointLights.value=G.state.point,Be.pointLightShadows.value=G.state.pointShadow,Be.hemisphereLights.value=G.state.hemi,Be.directionalShadowMatrix.value=G.state.directionalShadowMatrix,Be.spotLightMatrix.value=G.state.spotLightMatrix,Be.spotLightMap.value=G.state.spotLightMap,Be.pointShadowMatrix.value=G.state.pointShadowMatrix),V.lightProbeGrid=b.state.lightProbeGridArray.length>0,V.currentProgram=rt,V.uniformsList=null,rt}function gh(S){if(S.uniformsList===null){let F=S.currentProgram.getUniforms();S.uniformsList=ks.seqWithValue(F.seq,S.uniforms)}return S.uniformsList}function xh(S,F){let $=W.get(S);$.outputColorSpace=F.outputColorSpace,$.batching=F.batching,$.batchingColor=F.batchingColor,$.instancing=F.instancing,$.instancingColor=F.instancingColor,$.instancingMorph=F.instancingMorph,$.skinning=F.skinning,$.morphTargets=F.morphTargets,$.morphNormals=F.morphNormals,$.morphColors=F.morphColors,$.morphTargetsCount=F.morphTargetsCount,$.numClippingPlanes=F.numClippingPlanes,$.numIntersection=F.numClipIntersection,$.vertexAlphas=F.vertexAlphas,$.vertexTangents=F.vertexTangents,$.toneMapping=F.toneMapping}function Mp(S,F){if(S.length===0)return null;if(S.length===1)return S[0].texture!==null?S[0]:null;y.setFromMatrixPosition(F.matrixWorld);for(let $=0,V=S.length;$<V;$++){let G=S[$];if(G.texture!==null&&G.boundingBox.containsPoint(y))return G}return null}function wp(S,F,$,V,G){F.isScene!==!0&&(F=Ne),K.resetTextureUnits();let Ee=F.fog,Re=V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial?F.environment:null,we=X===null?L.outputColorSpace:X.isXRRenderTarget===!0?X.texture.colorSpace:ot.workingColorSpace,De=V.isMeshStandardMaterial||V.isMeshLambertMaterial&&!V.envMap||V.isMeshPhongMaterial&&!V.envMap,Oe=ue.get(V.envMap||Re,De),tt=V.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,rt=!!$.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Be=!!$.morphAttributes.position,mt=!!$.morphAttributes.normal,Ct=!!$.morphAttributes.color,At=An;V.toneMapped&&(X===null||X.isXRRenderTarget===!0)&&(At=L.toneMapping);let xt=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,Xt=xt!==void 0?xt.length:0,Ce=W.get(V),sn=b.state.lights;if(oe===!0&&(re===!0||S!==he)){let vt=S===he&&V.id===ne;Ve.setState(V,S,vt)}let lt=!1;V.version===Ce.__version?(Ce.needsLights&&Ce.lightsStateVersion!==sn.state.version||Ce.outputColorSpace!==we||G.isBatchedMesh&&Ce.batching===!1||!G.isBatchedMesh&&Ce.batching===!0||G.isBatchedMesh&&Ce.batchingColor===!0&&G.colorTexture===null||G.isBatchedMesh&&Ce.batchingColor===!1&&G.colorTexture!==null||G.isInstancedMesh&&Ce.instancing===!1||!G.isInstancedMesh&&Ce.instancing===!0||G.isSkinnedMesh&&Ce.skinning===!1||!G.isSkinnedMesh&&Ce.skinning===!0||G.isInstancedMesh&&Ce.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&Ce.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&Ce.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&Ce.instancingMorph===!1&&G.morphTexture!==null||Ce.envMap!==Oe||V.fog===!0&&Ce.fog!==Ee||Ce.numClippingPlanes!==void 0&&(Ce.numClippingPlanes!==Ve.numPlanes||Ce.numIntersection!==Ve.numIntersection)||Ce.vertexAlphas!==tt||Ce.vertexTangents!==rt||Ce.morphTargets!==Be||Ce.morphNormals!==mt||Ce.morphColors!==Ct||Ce.toneMapping!==At||Ce.morphTargetsCount!==Xt||!!Ce.lightProbeGrid!=b.state.lightProbeGridArray.length>0)&&(lt=!0):(lt=!0,Ce.__version=V.version);let fn=Ce.currentProgram;lt===!0&&(fn=ao(V,F,G),k&&V.isNodeMaterial&&k.onUpdateProgram(V,fn,Ce));let Ln=!1,si=!1,es=!1,yt=fn.getUniforms(),Rt=Ce.uniforms;if(_.useProgram(fn.program)&&(Ln=!0,si=!0,es=!0),V.id!==ne&&(ne=V.id,si=!0),Ce.needsLights){let vt=Mp(b.state.lightProbeGridArray,G);Ce.lightProbeGrid!==vt&&(Ce.lightProbeGrid=vt,si=!0)}if(Ln||he!==S){_.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),yt.setValue(P,"projectionMatrix",S.projectionMatrix),yt.setValue(P,"viewMatrix",S.matrixWorldInverse);let oi=yt.map.cameraPosition;oi!==void 0&&oi.setValue(P,me.setFromMatrixPosition(S.matrixWorld)),E.logarithmicDepthBuffer&&yt.setValue(P,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&yt.setValue(P,"isOrthographic",S.isOrthographicCamera===!0),he!==S&&(he=S,si=!0,es=!0)}if(Ce.needsLights&&(sn.state.directionalShadowMap.length>0&&yt.setValue(P,"directionalShadowMap",sn.state.directionalShadowMap,K),sn.state.spotShadowMap.length>0&&yt.setValue(P,"spotShadowMap",sn.state.spotShadowMap,K),sn.state.pointShadowMap.length>0&&yt.setValue(P,"pointShadowMap",sn.state.pointShadowMap,K)),G.isSkinnedMesh){yt.setOptional(P,G,"bindMatrix"),yt.setOptional(P,G,"bindMatrixInverse");let vt=G.skeleton;vt&&(vt.boneTexture===null&&vt.computeBoneTexture(),yt.setValue(P,"boneTexture",vt.boneTexture,K))}G.isBatchedMesh&&(yt.setOptional(P,G,"batchingTexture"),yt.setValue(P,"batchingTexture",G._matricesTexture,K),yt.setOptional(P,G,"batchingIdTexture"),yt.setValue(P,"batchingIdTexture",G._indirectTexture,K),yt.setOptional(P,G,"batchingColorTexture"),G._colorsTexture!==null&&yt.setValue(P,"batchingColorTexture",G._colorsTexture,K));let ri=$.morphAttributes;if((ri.position!==void 0||ri.normal!==void 0||ri.color!==void 0)&&U.update(G,$,fn),(si||Ce.receiveShadow!==G.receiveShadow)&&(Ce.receiveShadow=G.receiveShadow,yt.setValue(P,"receiveShadow",G.receiveShadow)),(V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial)&&V.envMap===null&&F.environment!==null&&(Rt.envMapIntensity.value=F.environmentIntensity),Rt.dfgLUT!==void 0&&(Rt.dfgLUT.value=H_()),si){if(yt.setValue(P,"toneMappingExposure",L.toneMappingExposure),Ce.needsLights&&Ep(Rt,es),Ee&&V.fog===!0&&Fe.refreshFogUniforms(Rt,Ee),Fe.refreshMaterialUniforms(Rt,V,ae,fe,b.state.transmissionRenderTarget[S.id]),Ce.needsLights&&Ce.lightProbeGrid){let vt=Ce.lightProbeGrid;Rt.probesSH.value=vt.texture,Rt.probesMin.value.copy(vt.boundingBox.min),Rt.probesMax.value.copy(vt.boundingBox.max),Rt.probesResolution.value.copy(vt.resolution)}ks.upload(P,gh(Ce),Rt,K)}if(V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(ks.upload(P,gh(Ce),Rt,K),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&yt.setValue(P,"center",G.center),yt.setValue(P,"modelViewMatrix",G.modelViewMatrix),yt.setValue(P,"normalMatrix",G.normalMatrix),yt.setValue(P,"modelMatrix",G.matrixWorld),V.uniformsGroups!==void 0){let vt=V.uniformsGroups;for(let oi=0,ts=vt.length;oi<ts;oi++){let yh=vt[oi];se.update(yh,fn),se.bind(yh,fn)}}return fn}function Ep(S,F){S.ambientLightColor.needsUpdate=F,S.lightProbe.needsUpdate=F,S.directionalLights.needsUpdate=F,S.directionalLightShadows.needsUpdate=F,S.pointLights.needsUpdate=F,S.pointLightShadows.needsUpdate=F,S.spotLights.needsUpdate=F,S.spotLightShadows.needsUpdate=F,S.rectAreaLights.needsUpdate=F,S.hemisphereLights.needsUpdate=F}function Tp(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return Y},this.getActiveMipmapLevel=function(){return z},this.getRenderTarget=function(){return X},this.setRenderTargetTextures=function(S,F,$){let V=W.get(S);V.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,V.__autoAllocateDepthBuffer===!1&&(V.__useRenderToTexture=!1),W.get(S.texture).__webglTexture=F,W.get(S.depthTexture).__webglTexture=V.__autoAllocateDepthBuffer?void 0:$,V.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,F){let $=W.get(S);$.__webglFramebuffer=F,$.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(S,F=0,$=0){X=S,Y=F,z=$;let V=null,G=!1,Ee=!1;if(S){let we=W.get(S);if(we.__useDefaultFramebuffer!==void 0){_.bindFramebuffer(P.FRAMEBUFFER,we.__webglFramebuffer),de.copy(S.viewport),Ae.copy(S.scissor),Ze=S.scissorTest,_.viewport(de),_.scissor(Ae),_.setScissorTest(Ze),ne=-1;return}else if(we.__webglFramebuffer===void 0)K.setupRenderTarget(S);else if(we.__hasExternalTextures)K.rebindTextures(S,W.get(S.texture).__webglTexture,W.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){let tt=S.depthTexture;if(we.__boundDepthTexture!==tt){if(tt!==null&&W.has(tt)&&(S.width!==tt.image.width||S.height!==tt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");K.setupDepthRenderbuffer(S)}}let De=S.texture;(De.isData3DTexture||De.isDataArrayTexture||De.isCompressedArrayTexture)&&(Ee=!0);let Oe=W.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Oe[F])?V=Oe[F][$]:V=Oe[F],G=!0):S.samples>0&&K.useMultisampledRTT(S)===!1?V=W.get(S).__webglMultisampledFramebuffer:Array.isArray(Oe)?V=Oe[$]:V=Oe,de.copy(S.viewport),Ae.copy(S.scissor),Ze=S.scissorTest}else de.copy(ze).multiplyScalar(ae).floor(),Ae.copy(at).multiplyScalar(ae).floor(),Ze=$e;if($!==0&&(V=Z),_.bindFramebuffer(P.FRAMEBUFFER,V)&&_.drawBuffers(S,V),_.viewport(de),_.scissor(Ae),_.setScissorTest(Ze),G){let we=W.get(S.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+F,we.__webglTexture,$)}else if(Ee){let we=F;for(let De=0;De<S.textures.length;De++){let Oe=W.get(S.textures[De]);P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0+De,Oe.__webglTexture,$,we)}}else if(S!==null&&$!==0){let we=W.get(S.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,we.__webglTexture,$)}ne=-1},this.readRenderTargetPixels=function(S,F,$,V,G,Ee,Re,we=0){if(!(S&&S.isWebGLRenderTarget)){Xe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let De=W.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Re!==void 0&&(De=De[Re]),De){_.bindFramebuffer(P.FRAMEBUFFER,De);try{let Oe=S.textures[we],tt=Oe.format,rt=Oe.type;if(S.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+we),!E.textureFormatReadable(tt)){Xe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!E.textureTypeReadable(rt)){Xe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=S.width-V&&$>=0&&$<=S.height-G&&P.readPixels(F,$,V,G,ve.convert(tt),ve.convert(rt),Ee)}finally{let Oe=X!==null?W.get(X).__webglFramebuffer:null;_.bindFramebuffer(P.FRAMEBUFFER,Oe)}}},this.readRenderTargetPixelsAsync=async function(S,F,$,V,G,Ee,Re,we=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let De=W.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Re!==void 0&&(De=De[Re]),De)if(F>=0&&F<=S.width-V&&$>=0&&$<=S.height-G){_.bindFramebuffer(P.FRAMEBUFFER,De);let Oe=S.textures[we],tt=Oe.format,rt=Oe.type;if(S.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+we),!E.textureFormatReadable(tt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!E.textureTypeReadable(rt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Be=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,Be),P.bufferData(P.PIXEL_PACK_BUFFER,Ee.byteLength,P.STREAM_READ),P.readPixels(F,$,V,G,ve.convert(tt),ve.convert(rt),0);let mt=X!==null?W.get(X).__webglFramebuffer:null;_.bindFramebuffer(P.FRAMEBUFFER,mt);let Ct=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await Ou(P,Ct,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,Be),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,Ee),P.deleteBuffer(Be),P.deleteSync(Ct),Ee}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,F=null,$=0){let V=Math.pow(2,-$),G=Math.floor(S.image.width*V),Ee=Math.floor(S.image.height*V),Re=F!==null?F.x:0,we=F!==null?F.y:0;K.setTexture2D(S,0),P.copyTexSubImage2D(P.TEXTURE_2D,$,0,0,Re,we,G,Ee),_.unbindTexture()},this.copyTextureToTexture=function(S,F,$=null,V=null,G=0,Ee=0){let Re,we,De,Oe,tt,rt,Be,mt,Ct,At=S.isCompressedTexture?S.mipmaps[Ee]:S.image;if($!==null)Re=$.max.x-$.min.x,we=$.max.y-$.min.y,De=$.isBox3?$.max.z-$.min.z:1,Oe=$.min.x,tt=$.min.y,rt=$.isBox3?$.min.z:0;else{let Rt=Math.pow(2,-G);Re=Math.floor(At.width*Rt),we=Math.floor(At.height*Rt),S.isDataArrayTexture?De=At.depth:S.isData3DTexture?De=Math.floor(At.depth*Rt):De=1,Oe=0,tt=0,rt=0}V!==null?(Be=V.x,mt=V.y,Ct=V.z):(Be=0,mt=0,Ct=0);let xt=ve.convert(F.format),Xt=ve.convert(F.type),Ce;F.isData3DTexture?(K.setTexture3D(F,0),Ce=P.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(K.setTexture2DArray(F,0),Ce=P.TEXTURE_2D_ARRAY):(K.setTexture2D(F,0),Ce=P.TEXTURE_2D),_.activeTexture(P.TEXTURE0),_.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,F.flipY),_.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),_.pixelStorei(P.UNPACK_ALIGNMENT,F.unpackAlignment);let sn=_.getParameter(P.UNPACK_ROW_LENGTH),lt=_.getParameter(P.UNPACK_IMAGE_HEIGHT),fn=_.getParameter(P.UNPACK_SKIP_PIXELS),Ln=_.getParameter(P.UNPACK_SKIP_ROWS),si=_.getParameter(P.UNPACK_SKIP_IMAGES);_.pixelStorei(P.UNPACK_ROW_LENGTH,At.width),_.pixelStorei(P.UNPACK_IMAGE_HEIGHT,At.height),_.pixelStorei(P.UNPACK_SKIP_PIXELS,Oe),_.pixelStorei(P.UNPACK_SKIP_ROWS,tt),_.pixelStorei(P.UNPACK_SKIP_IMAGES,rt);let es=S.isDataArrayTexture||S.isData3DTexture,yt=F.isDataArrayTexture||F.isData3DTexture;if(S.isDepthTexture){let Rt=W.get(S),ri=W.get(F),vt=W.get(Rt.__renderTarget),oi=W.get(ri.__renderTarget);_.bindFramebuffer(P.READ_FRAMEBUFFER,vt.__webglFramebuffer),_.bindFramebuffer(P.DRAW_FRAMEBUFFER,oi.__webglFramebuffer);for(let ts=0;ts<De;ts++)es&&(P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,W.get(S).__webglTexture,G,rt+ts),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,W.get(F).__webglTexture,Ee,Ct+ts)),P.blitFramebuffer(Oe,tt,Re,we,Be,mt,Re,we,P.DEPTH_BUFFER_BIT,P.NEAREST);_.bindFramebuffer(P.READ_FRAMEBUFFER,null),_.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(G!==0||S.isRenderTargetTexture||W.has(S)){let Rt=W.get(S),ri=W.get(F);_.bindFramebuffer(P.READ_FRAMEBUFFER,J),_.bindFramebuffer(P.DRAW_FRAMEBUFFER,B);for(let vt=0;vt<De;vt++)es?P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Rt.__webglTexture,G,rt+vt):P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,Rt.__webglTexture,G),yt?P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,ri.__webglTexture,Ee,Ct+vt):P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,ri.__webglTexture,Ee),G!==0?P.blitFramebuffer(Oe,tt,Re,we,Be,mt,Re,we,P.COLOR_BUFFER_BIT,P.NEAREST):yt?P.copyTexSubImage3D(Ce,Ee,Be,mt,Ct+vt,Oe,tt,Re,we):P.copyTexSubImage2D(Ce,Ee,Be,mt,Oe,tt,Re,we);_.bindFramebuffer(P.READ_FRAMEBUFFER,null),_.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else yt?S.isDataTexture||S.isData3DTexture?P.texSubImage3D(Ce,Ee,Be,mt,Ct,Re,we,De,xt,Xt,At.data):F.isCompressedArrayTexture?P.compressedTexSubImage3D(Ce,Ee,Be,mt,Ct,Re,we,De,xt,At.data):P.texSubImage3D(Ce,Ee,Be,mt,Ct,Re,we,De,xt,Xt,At):S.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,Ee,Be,mt,Re,we,xt,Xt,At.data):S.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,Ee,Be,mt,At.width,At.height,xt,At.data):P.texSubImage2D(P.TEXTURE_2D,Ee,Be,mt,Re,we,xt,Xt,At);_.pixelStorei(P.UNPACK_ROW_LENGTH,sn),_.pixelStorei(P.UNPACK_IMAGE_HEIGHT,lt),_.pixelStorei(P.UNPACK_SKIP_PIXELS,fn),_.pixelStorei(P.UNPACK_SKIP_ROWS,Ln),_.pixelStorei(P.UNPACK_SKIP_IMAGES,si),Ee===0&&F.generateMipmaps&&P.generateMipmap(Ce),_.unbindTexture()},this.initRenderTarget=function(S){W.get(S).__webglFramebuffer===void 0&&K.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?K.setTextureCube(S,0):S.isData3DTexture?K.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?K.setTexture2DArray(S,0):K.setTexture2D(S,0),_.unbindTexture()},this.resetState=function(){Y=0,z=0,X=null,_.reset(),Te.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Mn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=ot._getDrawingBufferColorSpace(e),t.unpackColorSpace=ot._getUnpackColorSpace()}};var Mf={type:"change"},Id={type:"start"},Ef={type:"end"},Al=new ei,wf=new mn,V_=Math.cos(70*cd.DEG2RAD),Ot=new I,tn=2*Math.PI,gt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Pd=1e-6,Cl=class extends Or{constructor(e,t=null){super(e,t),this.state=gt.NONE,this.target=new I,this.cursor=new I,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Mi.ROTATE,MIDDLE:Mi.DOLLY,RIGHT:Mi.PAN},this.touches={ONE:wi.ROTATE,TWO:wi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new I,this._lastQuaternion=new Wt,this._lastTargetPosition=new I,this._quat=new Wt().setFromUnitVectors(e.up,new I(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Ns,this._sphericalDelta=new Ns,this._scale=1,this._panOffset=new I,this._rotateStart=new le,this._rotateEnd=new le,this._rotateDelta=new le,this._panStart=new le,this._panEnd=new le,this._panDelta=new le,this._dollyStart=new le,this._dollyEnd=new le,this._dollyDelta=new le,this._dollyDirection=new I,this._mouse=new le,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=W_.bind(this),this._onPointerDown=G_.bind(this),this._onPointerUp=X_.bind(this),this._onContextMenu=j_.bind(this),this._onMouseWheel=$_.bind(this),this._onKeyDown=Z_.bind(this),this._onTouchStart=J_.bind(this),this._onTouchMove=K_.bind(this),this._onMouseDown=q_.bind(this),this._onMouseMove=Y_.bind(this),this._interceptControlDown=Q_.bind(this),this._interceptControlUp=ev.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Mf),this.update(),this.state=gt.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){let t=this.object.position;Ot.copy(t).sub(this.target),Ot.applyQuaternion(this._quat),this._spherical.setFromVector3(Ot),this.autoRotate&&this.state===gt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=tn:n>Math.PI&&(n-=tn),s<-Math.PI?s+=tn:s>Math.PI&&(s-=tn),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(Ot.setFromSpherical(this._spherical),Ot.applyQuaternion(this._quatInverse),t.copy(this.target).add(Ot),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){let a=Ot.length();o=this._clampDistance(a*this._scale);let l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){let a=new I(this._mouse.x,this._mouse.y,0);a.unproject(this.object);let l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;let c=new I(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=Ot.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Al.origin.copy(this.object.position),Al.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Al.direction))<V_?this.object.lookAt(this.target):(wf.setFromNormalAndCoplanarPoint(this.object.up,this.target),Al.intersectPlane(wf,this.target))))}else if(this.object.isOrthographicCamera){let o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Pd||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Pd||this._lastTargetPosition.distanceToSquared(this.target)>Pd?(this.dispatchEvent(Mf),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?tn/60*this.autoRotateSpeed*e:tn/60/60*this.autoRotateSpeed}_getZoomScale(e){let t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Ot.setFromMatrixColumn(t,0),Ot.multiplyScalar(-e),this._panOffset.add(Ot)}_panUp(e,t){this.screenSpacePanning===!0?Ot.setFromMatrixColumn(t,1):(Ot.setFromMatrixColumn(t,0),Ot.crossVectors(this.object.up,Ot)),Ot.multiplyScalar(e),this._panOffset.add(Ot)}_pan(e,t){let n=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;Ot.copy(s).sub(this.target);let r=Ot.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),s=e-n.left,r=t-n.top,o=n.width,a=n.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(tn*this._rotateDelta.x/t.clientHeight),this._rotateUp(tn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(tn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-tn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(tn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-tn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(n,s)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let n=this._getSecondPointerPosition(e),s=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(tn*this._rotateDelta.x/t.clientHeight),this._rotateUp(tn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let o=(e.pageX+t.x)*.5,a=(e.pageY+t.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new le,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function G_(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function W_(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function X_(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Ef),this.state=gt.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function q_(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Mi.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=gt.DOLLY;break;case Mi.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=gt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=gt.ROTATE}break;case Mi.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=gt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=gt.PAN}break;default:this.state=gt.NONE}this.state!==gt.NONE&&this.dispatchEvent(Id)}function Y_(i){switch(this.state){case gt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case gt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case gt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function $_(i){this.enabled===!1||this.enableZoom===!1||this.state!==gt.NONE||(i.preventDefault(),this.dispatchEvent(Id),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(Ef))}function Z_(i){this.enabled!==!1&&this._handleKeyDown(i)}function J_(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case wi.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=gt.TOUCH_ROTATE;break;case wi.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=gt.TOUCH_PAN;break;default:this.state=gt.NONE}break;case 2:switch(this.touches.TWO){case wi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=gt.TOUCH_DOLLY_PAN;break;case wi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=gt.TOUCH_DOLLY_ROTATE;break;default:this.state=gt.NONE}break;default:this.state=gt.NONE}this.state!==gt.NONE&&this.dispatchEvent(Id)}function K_(i){switch(this._trackPointer(i),this.state){case gt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case gt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case gt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case gt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=gt.NONE}}function j_(i){this.enabled!==!1&&i.preventDefault()}function Q_(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function ev(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Rl(i){let e=Tf(i);return new Float32Array(e.buffer,e.byteOffset,Math.floor(e.byteLength/4))}function Dd(i){let e=Tf(i);return new Uint32Array(e.buffer,e.byteOffset,Math.floor(e.byteLength/4))}function Tf(i){let e=atob(i),t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}var Af=require("react"),Il={light:{canvas:"linear-gradient(#f5f6f8, #e9ecf0)",paper:"#ffffff",stroke:"#4c5561",scene:{gridCenter:9081244,gridLine:4869976,edge:3358799,mesh:10466503,axisX:13777723,axisY:3055172,axisZ:2846678,sketchFill:7645664,sketchWire:3113174,sketchPoint:1859496,hemisphereGround:5857131,cubeFill:"rgba(246, 248, 251, 0.96)",cubeBorder:"rgba(148, 158, 172, 0.9)",cubeLabel:"#5b6472"}},dark:{canvas:"linear-gradient(#1b1b1c, #151517)",paper:"#ffffff",stroke:"#c8ced6",scene:{gridCenter:7041664,gridLine:4146512,edge:13817822,mesh:11123145,axisX:16743034,axisY:6283402,axisZ:7645695,sketchFill:6989544,sketchWire:9158133,sketchPoint:11851e3,hemisphereGround:3422529,cubeFill:"rgba(38, 40, 44, 0.96)",cubeBorder:"rgba(126, 134, 146, 0.9)",cubeLabel:"#d5d9df"}}};function tv(i){let e=(i.colorScheme??"").toLowerCase(),t=e.includes("dark"),n=e.includes("light");return t&&!n?"dark":n&&!t?"light":i.darkAttribute===!0||i.prefersDark===!0?"dark":"light"}var Nd=null;function nv(){try{return typeof window>"u"?!1:(Nd??=window.matchMedia("(prefers-color-scheme: dark)"),Nd.matches)}catch{return!1}}function Pn(){if(typeof document>"u")return"light";let i=document.documentElement,e=i.style?.colorScheme??"";if(e==="")try{e=getComputedStyle(i).getPropertyValue("color-scheme")}catch{e=""}return tv({colorScheme:e,darkAttribute:document.body?.hasAttribute("data-ds-dark-theme")===!0,prefersDark:nv()})}var Pl=new Set,Jr=null;function Vs(i){return Pl.add(i),Jr===null&&(Jr=iv()),()=>{Pl.delete(i),Pl.size===0&&Jr!==null&&(Jr(),Jr=null)}}function Ld(){for(let i of[...Pl])i()}function iv(){if(typeof MutationObserver>"u"||typeof window>"u")return()=>{};let i=new MutationObserver(Ld),e=[document.documentElement];document.body!==null&&e.push(document.body);for(let n of e)i.observe(n,{attributes:!0,attributeFilter:["style","class","data-ds-dark-theme","data-theme","data-color-scheme"]});let t=Nd??=window.matchMedia("(prefers-color-scheme: dark)");return t.addEventListener("change",Ld),()=>{i.disconnect(),t.removeEventListener("change",Ld)}}function Pi(){return(0,Af.useSyncExternalStore)(Vs,Pn,()=>"light")}function Ki(i){return`var(--dsh-cad-bg, ${Il[i].canvas})`}function Cf(i){return`var(--dsh-cad-stroke, ${Il[i].stroke})`}function Rf(i){return`var(--dsh-cad-paper, ${Il[i].paper})`}function Dl(i){return Il[i].scene}var Kr=.85,Ud=3,sv=400,Vt=(i,e,t)=>new I(i,e,t),If=[["TOP",Vt(0,0,1)],["BOTTOM",Vt(0,0,-1)],["FRONT",Vt(0,-1,0)],["BACK",Vt(0,1,0)],["RIGHT",Vt(1,0,0)],["LEFT",Vt(-1,0,0)]],rv=[{name:"TOP",normal:Vt(0,0,1),up:Vt(0,1,0)},{name:"BOTTOM",normal:Vt(0,0,-1),up:Vt(0,1,0)},{name:"FRONT",normal:Vt(0,-1,0),up:Vt(0,0,1)},{name:"BACK",normal:Vt(0,1,0),up:Vt(0,0,1)},{name:"RIGHT",normal:Vt(1,0,0),up:Vt(0,0,1)},{name:"LEFT",normal:Vt(-1,0,0),up:Vt(0,0,1)}];function ov(i){let e=[],t=i.length();for(let[n,s]of If)i.dot(s)/t>.5&&e.push(n);return e.sort().join("-")}function Pf(i,e,t){let n=i.getContext("2d");if(n===null)return;let s=Dl(t?"dark":"light");n.clearRect(0,0,128,128),n.fillStyle=s.cubeFill,n.fillRect(0,0,128,128),n.strokeStyle=s.cubeBorder,n.lineWidth=3,n.strokeRect(1.5,1.5,125,125),n.fillStyle=s.cubeLabel,n.font=`600 ${e.length>2?24:28}px -apple-system, "Segoe UI", sans-serif`,n.textAlign="center",n.textBaseline="middle",n.fillText(e,64,66)}var jr=class{constructor(e){this.options=e;let{container:t,camera:n,controls:s}=e;this.camera=n,this.controls=s;let r=e.size??96;getComputedStyle(t).position==="static"&&(t.style.position="relative"),this.overlay=document.createElement("div"),this.overlay.style.cssText=`position:absolute;top:8px;right:8px;width:${r}px;display:flex;flex-direction:column;align-items:center;gap:3px;z-index:5;user-select:none;`,t.appendChild(this.overlay);let o=document.createElement("div");o.style.cssText=`width:${r}px;height:${r}px;cursor:grab;`,this.overlay.appendChild(o),this.caption=document.createElement("div"),this.caption.style.cssText='min-height:14px;font:500 10px/14px -apple-system,"Segoe UI",sans-serif;color:var(--dsw-alias-label-secondary,#374151);background:var(--dsw-alias-bg-base,rgba(255,255,255,0.85));border-radius:7px;padding:0 7px;opacity:0;transition:opacity 120ms;text-align:center;white-space:nowrap;',this.overlay.appendChild(this.caption);let a=document.createElement("button");a.type="button",a.title="Reset view",a.setAttribute("aria-label","Reset view"),a.style.cssText="width:22px;height:22px;border-radius:50%;border:1px solid var(--dsw-alias-border-l2,#c4c9d0);background:var(--dsw-alias-bg-base,#fff);color:var(--dsw-alias-label-secondary,#374151);font-size:12px;line-height:1;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0;",a.textContent="\u2302",a.addEventListener("click",()=>{e.onHome?.()}),this.overlay.appendChild(a),this.renderer=new zs({antialias:!0,alpha:!0}),this.renderer.setPixelRatio(window.devicePixelRatio),this.renderer.setSize(r,r),this.renderer.domElement.style.cssText="width:100%;height:100%;display:block;touch-action:none;",o.appendChild(this.renderer.domElement),this.overlayCamera.position.set(0,0,4),this.overlayCamera.lookAt(0,0,0),new pi().add(this.root),this.buildCube(),this.unsubscribeTheme=Vs(()=>{let u=Pn()==="dark";u!==this.dark&&(this.dark=u,this.repaint())});let c=u=>{let h=this.renderer.domElement.getBoundingClientRect(),f=new le((u.clientX-h.left)/h.width*2-1,-((u.clientY-h.top)/h.height)*2+1);this.raycaster.setFromCamera(f,this.overlayCamera);let g=this.raycaster.intersectObjects(this.cells,!1)[0];return g===void 0?{zone:null,point:null}:{zone:g.object.userData.zone,point:g.point}},d=this.renderer.domElement;d.addEventListener("pointermove",u=>{let{zone:h}=c(u);this.setHover(h),d.style.cursor=h===null?"grab":"pointer"}),d.addEventListener("pointerleave",()=>{this.setHover(null)}),d.addEventListener("click",u=>{let{zone:h}=c(u);if(h===null)return;let f=av(h);f!==null&&this.animateTo(f)})}options;camera;controls;renderer;overlayCamera=new bi(-1.35,1.35,1.35,-1.35,.1,10);root=new zt;cells=[];zoneCells=new Map;hiddenMaterial=new Qt({visible:!1});highlightMaterial=new Qt({color:5073918,transparent:!0,opacity:.55,depthWrite:!1});disposables=[this.hiddenMaterial,this.highlightMaterial];facePlates=[];dark=Pn()==="dark";unsubscribeTheme;raycaster=new Yi;overlay;caption;hovered=null;tweenId=0;disposed=!1;buildCube(){let e=2*Kr/Ud;for(let t of rv){let n=t.up.clone().cross(t.normal),s=new ht().makeBasis(n,t.up,t.normal),r=new zt;r.quaternion.setFromRotationMatrix(s);let o=document.createElement("canvas");o.width=128,o.height=128,Pf(o,t.name,this.dark);let a=new gi(o);a.anisotropy=4,this.facePlates.push({canvas:o,name:t.name,texture:a}),this.disposables.push(a);let l=new Qt({map:a,transparent:!0});this.disposables.push(l);let c=new Pt(new xi(2*Kr,2*Kr),l);c.position.set(0,0,Kr),r.add(c),this.disposables.push(c.geometry);let d=new xi(e*1.02,e*1.02);this.disposables.push(d);for(let u=0;u<Ud;u++)for(let h=0;h<Ud;h++){let f=new Pt(d,this.hiddenMaterial);f.position.set((u-1)*e,(h-1)*e,Kr+.004);let g=t.normal.clone().addScaledVector(n,u-1).addScaledVector(t.up,h-1),v=ov(g);f.userData.zone=v,r.add(f),this.cells.push(f);let p=this.zoneCells.get(v);p===void 0?this.zoneCells.set(v,[f]):p.push(f)}this.root.add(r)}}repaint(){for(let e of this.facePlates)Pf(e.canvas,e.name,this.dark),e.texture.needsUpdate=!0}setHover(e){if(e!==this.hovered){for(let t of this.hovered===null?[]:this.zoneCells.get(this.hovered)??[])t.material=this.hiddenMaterial;this.hovered=e;for(let t of e===null?[]:this.zoneCells.get(e)??[])t.material=this.highlightMaterial;this.caption.textContent=e,this.caption.style.opacity=e===null?"0":"1"}}animateTo(e){let t=this.camera,n=this.controls,s=t.position.distanceTo(n.target),r=t.position.clone().sub(n.target).normalize(),o=e.clone().normalize();if(r.dot(o)>.9999)return;let a=new Wt().setFromUnitVectors(r,o),l=new Wt;n.enabled=!1,cancelAnimationFrame(this.tweenId);let c=performance.now(),d=()=>{if(this.disposed)return;let u=Math.min(1,(performance.now()-c)/sv),h=1-Math.pow(1-u,3),f=new Wt().slerpQuaternions(l,a,h);t.position.copy(r).applyQuaternion(f).multiplyScalar(s).add(n.target),t.lookAt(n.target),u<1?this.tweenId=requestAnimationFrame(d):(n.enabled=!0,n.update())};this.tweenId=requestAnimationFrame(d)}update(){this.disposed||(this.root.quaternion.copy(this.camera.quaternion).invert(),this.renderer.render(this.root.parent,this.overlayCamera))}dispose(){if(!this.disposed){this.disposed=!0,this.unsubscribeTheme(),cancelAnimationFrame(this.tweenId),this.controls.enabled=!0;for(let e of this.disposables)e.dispose();this.renderer.dispose(),this.overlay.remove()}}};function av(i){let e=i.split("-"),t=new I,n=0;for(let[s,r]of If)e.includes(s)&&(t.add(r),n++);return n===0||t.lengthSq()===0?null:t.normalize()}var lv=25,Df=5073918,Lf=16751165,cv=6;function Gs(i,e,t){return`${Math.round(i*1e5)},${Math.round(e*1e5)},${Math.round(t*1e5)}`}var Ll=class{parent;constructor(e){this.parent=new Int32Array(e);for(let t=0;t<e;t++)this.parent[t]=t}find(e){for(;this.parent[e]!==e;)this.parent[e]=this.parent[this.parent[e]],e=this.parent[e];return e}union(e,t){let n=this.find(e),s=this.find(t);n!==s&&(this.parent[s]=n)}};function dv(i){let e=i.geometry,t=e.getAttribute("position"),n=e.getIndex(),s=t.array,r=Math.floor((n!==null?n.count:t.count)/3),o=(y,M)=>n!==null?n.getX(y*3+M):y*3+M,a=[],l=new Float64Array(r),c=new I,d=new I,u=new I,h=new I,f=new I;for(let y=0;y<r;y++){c.fromArray(s,o(y,0)*3),d.fromArray(s,o(y,1)*3),u.fromArray(s,o(y,2)*3),h.subVectors(d,c),f.subVectors(u,c);let M=new I().crossVectors(h,f);l[y]=M.length()/2,a.push(M.normalize())}let g=new Map;for(let y=0;y<r;y++)for(let M=0;M<3;M++){let b=o(y,M)*3,R=o(y,(M+1)%3)*3,x=Gs(s[b],s[b+1],s[b+2]),C=Gs(s[R],s[R+1],s[R+2]),L=x<C?`${x}|${C}`:`${C}|${x}`,D=g.get(L);D===void 0?g.set(L,[{tri:y,ka:x,kb:C}]):D.push({tri:y,ka:x,kb:C})}let v=Math.cos(lv*Math.PI/180),p=new Ll(r);for(let y of g.values())for(let M=0;M<y.length;M++)for(let b=M+1;b<y.length;b++){let R=y[M],x=y[b];R===void 0||x===void 0||R.ka===x.ka&&R.kb===x.kb||a[R.tri].dot(a[x.tri])>=v&&p.union(R.tri,x.tri)}let m=new Map,A=new Uint32Array(r),w=[];for(let y=0;y<r;y++){let M=p.find(y),b=m.get(M);b===void 0&&(b=w.length,m.set(M,b),w.push({triangles:[],area:0})),A[y]=b;let R=w[b];R!==void 0&&(R.triangles.push(y),R.area+=l[y])}return{regionOf:A,regions:w}}function hv(i,e,t){let n=i.geometry,s=n.getAttribute("position"),r=n.getIndex(),o=s.array,a=Math.floor((r!==null?r.count:s.count)/3),l=(y,M)=>r!==null?r.getX(y*3+M):y*3+M,c=new Map;for(let y=0;y<a;y++){let M=e.regionOf[y];for(let b=0;b<3;b++){let R=l(y,b)*3,x=l(y,(b+1)%3)*3,C=Gs(o[R],o[R+1],o[R+2]),L=Gs(o[x],o[x+1],o[x+2]),D=C<L?`${C}|${L}`:`${L}|${C}`,k=c.get(D);k===void 0?c.set(D,[M]):k.includes(M)||k.push(M)}}let d=t.length/6,u=new Ll(d),h=new Map,f=[];for(let y=0;y<d;y++){let M=t[y*6],b=t[y*6+1],R=t[y*6+2],x=t[y*6+3],C=t[y*6+4],L=t[y*6+5],D=Gs(M,b,R),k=Gs(x,C,L);f.push([D,k]);let Z=h.get(D);Z===void 0?h.set(D,[y]):Z.push(y);let J=h.get(k);J===void 0?h.set(k,[y]):J.push(y)}let g=y=>{let[M,b]=f[y]??["",""],R=M<b?`${M}|${b}`:`${b}|${M}`;return(c.get(R)??[]).slice().sort((x,C)=>x-C).join(",")},v=[];for(let y=0;y<d;y++)v.push(g(y));for(let y=0;y<d;y++){let[M,b]=f[y]??["",""];for(let R of[M,b]){let x=h.get(R)??[];for(let C of x)C<=y||v[y]===v[C]&&u.union(y,C)}}let p=new Map,m=new Uint32Array(d),A=[];for(let y=0;y<d;y++){let M=u.find(y),b=p.get(M);b===void 0&&(b=A.length,p.set(M,b),A.push({length:0,closed:!0})),m[y]=b;let R=A[b];if(R!==void 0){let x=t[y*6+3]-t[y*6],C=t[y*6+4]-t[y*6+1],L=t[y*6+5]-t[y*6+2];R.length+=Math.sqrt(x*x+C*C+L*L)}}let w=new Map;for(let y=0;y<d;y++){let[M,b]=f[y]??["",""],R=m[y];w.set(`${R}:${M}`,(w.get(`${R}:${M}`)??0)+1),w.set(`${R}:${b}`,(w.get(`${R}:${b}`)??0)+1)}for(let y=0;y<A.length;y++){let M=!0,b=!1;for(let x=0;x<d;x++){if(m[x]!==y)continue;b=!0;let[C,L]=f[x]??["",""];((w.get(`${y}:${C}`)??0)!==2||(w.get(`${y}:${L}`)??0)!==2)&&(M=!1)}let R=A[y];R!==void 0&&(R.closed=b&&M)}return{groupOf:m,groups:A}}var Qr=class{constructor(e){this.options=e;let{domElement:t,cad:n}=e;for(let r of[this.hoverFaceMesh,this.selectFaceMesh,this.hoverEdgeLines,this.selectEdgeLines])r.raycast=()=>{},r.renderOrder=r instanceof xn?3:2,r.visible=!1;this.disposables.push(this.hoverFaceMesh.material,this.hoverFaceMesh.geometry,this.selectFaceMesh.material,this.selectFaceMesh.geometry,this.hoverEdgeLines.material,this.hoverEdgeLines.geometry,this.selectEdgeLines.material,this.selectEdgeLines.geometry);let s=new En().setFromObject(n).getSize(new I);this.center=new En().setFromObject(n).getCenter(new I),this.label=document.createElement("div"),this.label.style.cssText='position:absolute;left:8px;bottom:8px;z-index:5;pointer-events:none;font:500 11px/16px -apple-system,"Segoe UI",sans-serif;color:var(--dsw-alias-label-secondary,#374151);background:var(--dsw-alias-bg-base,rgba(255,255,255,0.88));border:1px solid var(--dsw-alias-border-l1,rgba(215,219,224,0.7));border-radius:8px;padding:2px 8px;opacity:0;transition:opacity 120ms;white-space:nowrap;',t.addEventListener("pointermove",this.onPointerMove),t.addEventListener("pointerleave",this.onPointerLeave),t.addEventListener("pointerdown",this.onPointerDown),t.addEventListener("pointerup",this.onPointerUp)}options;raycaster=new Yi;meshes=[];faceCache=new Map;edgeCache=new Map;label;hover=null;selection=null;down=null;disposed=!1;center;disposables=[];hoverFaceMesh=new Pt(new ft,new Qt({color:Df,transparent:!0,opacity:.35,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}));selectFaceMesh=new Pt(new ft,new Qt({color:Lf,transparent:!0,opacity:.45,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-3,polygonOffsetUnits:-3}));hoverEdgeLines=new xn(new ft,new gn({color:Df,depthTest:!1,transparent:!0,opacity:.95}));selectEdgeLines=new xn(new ft,new gn({color:Lf,depthTest:!1,transparent:!0,opacity:1}));meshesOf(){return this.meshes.length=0,this.options.cad.traverse(e=>{e.isMesh&&e.visible&&this.meshes.push(e)}),this.meshes}facesOf(e){let t=this.faceCache.get(e);return t===void 0&&(t=dv(e),this.faceCache.set(e,t)),t}edgesOf(e){let t=e.userData.edges;if(t===void 0)return null;let n=this.edgeCache.get(e);if(n===void 0){let r=t.geometry.getAttribute("position").array;n=hv(e,this.facesOf(e),r),this.edgeCache.set(e,n)}let s=t.geometry.getAttribute("position").array;return{groups:n,segments:s}}pick(e){let{domElement:t,camera:n}=this.options,s=t.getBoundingClientRect(),r=new le((e.clientX-s.left)/s.width*2-1,-((e.clientY-s.top)/s.height)*2+1);this.raycaster.setFromCamera(r,n);let o=this.meshesOf(),a=this.raycaster.intersectObjects(o,!1)[0],c=2*(a?.distance??n.position.distanceTo(this.center))*Math.tan(n.fov*Math.PI/180/2)/Math.max(s.height,1),d=cv*c;this.raycaster.params.Line.threshold=d;let u=null;for(let f of o){let g=f.userData.edges;if(g===void 0)continue;let p=this.raycaster.intersectObject(g,!1)[0];if(p!==void 0&&(u===null||p.distance<u.distance)){let m=Math.floor((p.index??0)/2);u={mesh:f,distance:p.distance,segment:m}}}if(u!==null&&(a===void 0||u.distance<=a.distance+d)){let f=this.edgesOf(u.mesh);if(f!==null)return{kind:"edge",mesh:u.mesh,group:f.groups.groupOf[u.segment]??0}}if(a===void 0||a.face===void 0)return null;let h=this.facesOf(a.object).regionOf[a.faceIndex??0]??0;return{kind:"face",mesh:a.object,region:h}}onPointerMove=e=>{if(!this.disposed){if(e.buttons!==0){this.setHover(null);return}this.setHover(this.pick(e))}};onPointerLeave=()=>{this.setHover(null)};onPointerDown=e=>{e.button===0&&(this.down={x:e.clientX,y:e.clientY,at:performance.now()})};onPointerUp=e=>{if(this.disposed)return;let t=this.down;if(this.down=null,t===null||e.button!==0||Math.hypot(e.clientX-t.x,e.clientY-t.y)>5||performance.now()-t.at>600)return;let s=this.pick(e);this.setSelection(s)};setHover(e){Nf(e,this.hover)||(this.hover=e,this.refresh())}invalidate(){this.faceCache.clear(),this.edgeCache.clear(),this.selection=null,this.hover=null,this.refresh()}setSelection(e){this.selection=e,this.refresh()}refresh(){let e=(l,c,d)=>{let h=this.facesOf(l).regions[c];if(h===void 0){d.visible=!1;return}let f=l.geometry,g=f.getAttribute("position"),v=f.getIndex(),p=g.array,m=new Float32Array(h.triangles.length*9),A=0;for(let w of h.triangles)for(let y=0;y<3;y++){let M=(v!==null?v.getX(w*3+y):w*3+y)*3;m[A++]=p[M],m[A++]=p[M+1],m[A++]=p[M+2]}d.geometry.dispose(),d.geometry=new ft,d.geometry.setAttribute("position",new St(m,3)),l!==d.parent&&l.add(d),d.visible=!0},t=(l,c,d)=>{let u=this.edgesOf(l);if(u===null){d.visible=!1;return}let{groups:h,segments:f}=u,g=[];for(let v=0;v<h.groupOf.length;v++)if(h.groupOf[v]===c)for(let p=0;p<6;p++)g.push(f[v*6+p]);d.geometry.dispose(),d.geometry=new ft,d.geometry.setAttribute("position",new Et(g,3)),l!==d.parent&&l.add(d),d.visible=!0},n=(...l)=>{for(let c of l)c.visible=!1},s=Nf(this.hover,this.selection)?null:this.hover,r=this.selection;s!==null&&s.kind==="face"?e(s.mesh,s.region,this.hoverFaceMesh):n(this.hoverFaceMesh),s!==null&&s.kind==="edge"?t(s.mesh,s.group,this.hoverEdgeLines):n(this.hoverEdgeLines),r!==null&&r.kind==="face"?e(r.mesh,r.region,this.selectFaceMesh):n(this.selectFaceMesh),r!==null&&r.kind==="edge"?t(r.mesh,r.group,this.selectEdgeLines):n(this.selectEdgeLines);let o=this.hover??r,a=this.options.domElement.parentElement;if(o!==null){let l=o.mesh.name.length>0?`${o.mesh.name} \xB7 `:"";if(o.kind==="face"){let c=this.facesOf(o.mesh).regions[o.region]?.area??0;this.label.textContent=`${l}face \xB7 ${c.toLocaleString(void 0,{maximumFractionDigits:1})} mm\xB2`}else{let c=this.edgesOf(o.mesh)?.groups.groups[o.group],d=c?.length??0;this.label.textContent=`${l}edge \xB7 ${d.toLocaleString(void 0,{maximumFractionDigits:1})} mm${c?.closed===!0?" \xB7 closed":""}`}this.label.style.opacity="1",this.label.parentElement!==a&&a!==null&&a.appendChild(this.label)}else this.label.style.opacity="0",this.label.textContent="";this.options.domElement.style.cursor=o===null?"grab":"pointer"}dispose(){if(this.disposed)return;this.disposed=!0;let{domElement:e}=this.options;e.removeEventListener("pointermove",this.onPointerMove),e.removeEventListener("pointerleave",this.onPointerLeave),e.removeEventListener("pointerdown",this.onPointerDown),e.removeEventListener("pointerup",this.onPointerUp);for(let t of[this.hoverFaceMesh,this.selectFaceMesh,this.hoverEdgeLines,this.selectEdgeLines])t.removeFromParent();for(let t of this.disposables)t.dispose();this.label.remove()}};function Nf(i,e){return i===null||e===null?i===e:i.kind===e.kind&&i.mesh===e.mesh&&(i.kind==="face"?i.region===e.region:i.group===e.group)}function Uf(){let i=new Is;i.moveTo(0,0),i.lineTo(60,0),i.lineTo(60,12),i.lineTo(12,12),i.lineTo(12,60),i.lineTo(0,60),i.closePath();let e=new Xi;e.absarc(36,6,5,0,Math.PI*2,!0),i.holes.push(e);let t=new Pr(i,{depth:100,bevelEnabled:!1,curveSegments:32});return t.translate(-30,-30,0),t}var Ff={min:{x:-30,y:-30,z:0},max:{x:30,y:30,z:100}};var uv=25;function Ii(i){return Dl(i?"dark":"light")}function Of(i,e){let t=Ii(e);i.traverse(n=>{let s=n.userData.cadColorRole;if(s!==void 0)switch(s){case"mesh":n.material.color.setHex(t.mesh);break;case"sketch-fill":n.material.color.setHex(t.sketchFill);break;case"edge":n.material.color.setHex(t.edge);break;case"sketch-wire":n.material.color.setHex(t.sketchWire);break;case"sketch-point":n.material.color.setHex(t.sketchPoint);break}})}function Fd(i,e){let t=document.createElement("canvas");t.width=64,t.height=64;let n=t.getContext("2d");n!==null&&(n.font='bold 44px -apple-system, "Segoe UI", sans-serif',n.textAlign="center",n.textBaseline="middle",n.fillStyle=`#${e.toString(16).padStart(6,"0")}`,n.fillText(i,32,34));let s=new gi(t);s.needsUpdate=!0;let r=new Ts({map:s,transparent:!0}),o=new yr(r);return o.scale.set(1,1,1),o}function Bf(i,e={}){let t=new zs({antialias:!0,alpha:!0});t.setPixelRatio(window.devicePixelRatio),t.setSize(i.clientWidth||360,i.clientHeight||300),i.appendChild(t.domElement),t.domElement.style.width="100%",t.domElement.style.height="100%",t.domElement.style.display="block";let n=new $t(45,1,.01,1e4);n.up.set(0,0,1);let s=new Cl(n,t.domElement);s.enableDamping=!0,s.dampingFactor=.12,e.autoRotate===!0&&(s.autoRotate=!0,s.autoRotateSpeed=.8);let r=()=>{let a=i.clientWidth,l=i.clientHeight;a===0||l===0||(t.setSize(a,l,!1),n.aspect=a/l,n.updateProjectionMatrix(),e.onResize?.(a,l))},o=new ResizeObserver(r);return o.observe(i),{renderer:t,camera:n,controls:s,dispose(){o.disconnect(),s.dispose(),t.dispose(),t.domElement.parentNode===i&&i.removeChild(t.domElement)}}}function kf(i,e,t){let n=Ii(t),s=new zt,r=new Ur(e*2,20,n.gridCenter,n.gridLine);r.rotation.x=Math.PI/2,s.add(r);let o=new Fr(e);o.setColors(n.axisX,n.axisY,n.axisZ),s.add(o);let a=e*1.12,l=e*.14,c=Fd("X",n.axisX);c.position.set(a,0,0),c.scale.set(l,l,l),s.add(c);let d=Fd("Y",n.axisY);d.position.set(0,a,0),d.scale.set(l,l,l),s.add(d);let u=Fd("Z",n.axisZ);return u.position.set(0,0,a),u.scale.set(l,l,l),s.add(u),i.add(s),[s,r,o,c,d,u]}function Ws(i){for(let e of i)e.traverse(t=>{let n=t;if(n.isMesh){n.geometry?.dispose();let o=n.material;Array.isArray(o)?o.forEach(a=>a.dispose()):o?.dispose()}let s=t;s.isLineSegments&&(s.geometry?.dispose(),s.material?.dispose());let r=t;r.isSprite&&(r.material.map?.dispose(),r.material.dispose())})}function fv(i,e){let t=i.userData.edges;if(t!==void 0)return t;let n=i.geometry;if(n===void 0)return;let s=i.material;s.polygonOffset=!0,s.polygonOffsetFactor=1,s.polygonOffsetUnits=1;let r=new gn({color:Ii(e).edge,transparent:!0,opacity:.9}),o=new xn(new Sr(n,uv),r);return o.userData.cadColorRole="edge",i.add(o),i.userData.edges=o,o}function Ul(i,e,t){i.traverse(n=>{let s=n;if(!s.isMesh)return;let r=s.material;r.wireframe=e==="wireframe";let o=e==="shaded-edges"?fv(s,t):s.userData.edges;o!==void 0&&(o.visible=e==="shaded-edges")})}var Nl=null;function pv(){if(Nl!==null)return Nl;let i=document.createElement("canvas");i.width=32,i.height=32;let e=i.getContext("2d");return e!==null&&(e.fillStyle="#ffffff",e.beginPath(),e.arc(16,16,14,0,Math.PI*2),e.fill()),Nl=new gi(i),Nl}function Fl(i,e){let t=Ii(e),n="mode"in i?i.mode:void 0;if(n==="wire"){let l=new ft,c=typeof i.positions=="string"?Rl(i.positions):i.positions;l.setAttribute("position",new St(c,3));let d=typeof i.indices=="string"?Dd(i.indices):i.indices;l.setIndex(new St(d,1));let u=i.color,h=new xn(l,new gn({color:u??t.sketchWire,depthTest:!1,transparent:!0,opacity:.95}));return h.renderOrder=2,h.name=i.name??"",u===void 0&&(h.userData.cadColorRole="sketch-wire"),h}if(n==="fill"){let l=new ft,c=i.positions;l.setAttribute("position",new St(c,3)),l.setIndex(new St(i.indices,1)),l.computeVertexNormals();let d=i.color,u=new Pt(l,new Qt({color:d??t.sketchFill,transparent:!0,opacity:.22,depthWrite:!1,side:un}));return u.renderOrder=1,u.name=i.name??"",d===void 0&&(u.userData.cadColorRole="sketch-fill"),u}if(n==="points"){let l=new ft;l.setAttribute("position",new St(i.positions,3));let c=i.color,d=new _r(l,new Cs({color:c??t.sketchPoint,map:pv(),size:8,sizeAttenuation:!1,alphaTest:.5,transparent:!0,depthTest:!1}));return d.renderOrder=3,d.name=i.name??"",c===void 0&&(d.userData.cadColorRole="sketch-point"),d}let s="geometry"in i?i.geometry:(()=>{let l=new ft,c=typeof i.positions=="string"?Rl(i.positions):i.positions;if(l.setAttribute("position",new St(c,3)),i.normals!==void 0){let u=typeof i.normals=="string"?Rl(i.normals):i.normals;l.setAttribute("normal",new St(u,3))}else l.computeVertexNormals();let d=typeof i.indices=="string"?Dd(i.indices):i.indices;return l.setIndex(new St(d,1)),l})(),r=i.color,o=new Ir({color:r??t.mesh,metalness:.15,roughness:.55,flatShading:i.normals===void 0,side:un}),a=new Pt(s,o);return a.name=i.name??"",r===void 0&&(a.userData.cadColorRole="mesh"),a}function zf(i,e={}){let t=Bf(i,{onResize:()=>{b||w()}}),n=new pi,s=Pn()==="dark",r=e.part===null,o=new zt;n.add(o);let a=new zt;r||a.add(Fl({name:"demo-bracket",geometry:Uf()},s)),o.add(a);let c=r?{min:{x:-100,y:-100,z:0},max:{x:100,y:100,z:100}}:{...Ff},d=new I(c.max.x-c.min.x,c.max.y-c.min.y,c.max.z-c.min.z),u=new I((c.max.x+c.min.x)/2,(c.max.y+c.min.y)/2,(c.max.z+c.min.z)/2),h=Math.max(d.x,d.y,d.z,1e-6);n.add(a);let f=new Ls(16777215,Ii(s).hemisphereGround,1.1);n.add(f);let g=new Si(16777215,1.6);n.add(g);let v=new Si(16777215,.5);n.add(v);let p=()=>{g.position.set(u.x+h,u.y+h*1.4,u.z+h*.8),v.position.set(u.x-h,u.y+h*.4,u.z-h*.6)};p();let m=[],A="shaded-edges",w=()=>{let z=Hf(h,t.camera.aspect,t.camera.fov);t.camera.position.set(u.x+z*.7,u.y+z*.55,u.z+z*.6),t.controls.target.copy(u),t.controls.update()},y=()=>{m.length>0&&(Ws(m),n.remove(m[0])),m=kf(n,h,s),m[1].position.set(u.x,u.y,c.min.z)},M=()=>{y(),t.camera.near=h/100,t.camera.far=h*40,Ul(o,A,s),p(),w()};M();let b=!1,R=()=>{b=!0};t.renderer.domElement.addEventListener("pointerdown",R,{passive:!0}),t.renderer.domElement.addEventListener("wheel",R,{passive:!0});let x=new jr({container:i,camera:t.camera,controls:t.controls,onHome:w}),C=new Qr({domElement:t.renderer.domElement,camera:t.camera,cad:o}),L=Vs(()=>{let z=Pn()==="dark";z!==s&&(s=z,f.groundColor.setHex(Ii(s).hemisphereGround),y(),Of(o,s))}),D=!1,k=z=>{if(!D){o.remove(a),Ws([a]),C.invalidate(),a=new zt;for(let X of z.meshes)a.add(Fl(X,s));o.add(a),c=z.bounds,d=new I(c.max.x-c.min.x,c.max.y-c.min.y,c.max.z-c.min.z),u=new I((c.max.x+c.min.x)/2,(c.max.y+c.min.y)/2,(c.max.z+c.min.z)/2),h=Math.max(d.x,d.y,d.z,1e-6),M()}},Z=!1,J=z=>{fetch(`/dsh-cad/demo-scene?part=${z}`).then(X=>X.ok?X.json():Promise.reject(new Error(`HTTP ${X.status}`))).then(X=>{D||(k(X),Z=!0,e.onSource?.("brep"))}).catch(()=>{D||e.onSource?.(Z?"brep":"fallback")})};r||J(e.part??"bracket");let B=()=>{Y=requestAnimationFrame(B),t.controls.update(),t.renderer.render(n,t.camera),x.update()},Y=requestAnimationFrame(B);return{setWireframe(z){this.setRenderMode(z?"wireframe":"shaded-edges")},setRenderMode(z){A=z,Ul(o,A,s)},loadPart:J,resetView:w,dispose(){D=!0,cancelAnimationFrame(Y),L(),C.dispose(),x.dispose(),Ws([o,...m,f,g,v]),t.dispose()}}}function Hf(i,e,t){let n=t*Math.PI/180,s=2*Math.atan(Math.tan(n/2)*(Number.isFinite(e)&&e>0?e:1)),r=Math.min(n,s);return i/2/Math.tan(r/2)*1.5}function Vf(i,e){let t=Bf(i,{onResize:()=>{w||m()}}),n=new pi,s=Pn()==="dark",r=new zt;n.add(r);let o=new zt;for(let X of e.meshes)o.add(Fl(X,s));r.add(o);let a=e.bounds,l=new I(a.max.x-a.min.x,a.max.y-a.min.y,a.max.z-a.min.z),c=new I((a.max.x+a.min.x)/2,(a.max.y+a.min.y)/2,(a.max.z+a.min.z)/2),d=Math.max(l.x,l.y,l.z,1e-6),u=new Ls(16777215,Ii(s).hemisphereGround,1.1);n.add(u);let h=new Si(16777215,1.6);n.add(h);let f=new Si(16777215,.5);n.add(f);let g=()=>{h.position.set(c.x+d,c.y+d*1.4,c.z+d*.8),f.position.set(c.x-d,c.y+d*.4,c.z-d*.6)},v=[],p="shaded-edges",m=()=>{let X=Hf(d,t.camera.aspect,t.camera.fov);t.camera.position.set(c.x+X*.7,c.y+X*.55,c.z+X*.6),t.controls.target.copy(c),t.controls.update()},A=X=>{if(v.length>0&&(Ws(v),n.remove(v[0])),v=kf(n,d,s),v[1].position.set(c.x,c.y,a.min.z),g(),X)t.camera.near=d/100,t.camera.far=d*40,m();else{let he=t.camera.position.distanceTo(t.controls.target);t.camera.near=Math.min(d/100,he/1e3),t.camera.far=Math.max(d*40,he*4)}t.camera.updateProjectionMatrix(),Ul(r,p,s)};A(!0);let w=!1,y=()=>{w=!0};t.renderer.domElement.addEventListener("pointerdown",y,{passive:!0}),t.renderer.domElement.addEventListener("wheel",y,{passive:!0});let M=new jr({container:i,camera:t.camera,controls:t.controls,onHome:m}),b=new Qr({domElement:t.renderer.domElement,camera:t.camera,cad:r}),R=Vs(()=>{let X=Pn()==="dark";X!==s&&(s=X,u.groundColor.setHex(Ii(s).hemisphereGround),A(!1),Of(r,s))}),x=!1,C=null,L=new Set,D=()=>{for(let X of o.children)X.visible=!L.has(X.name)},k=X=>{L.clear();for(let ne of X)L.add(ne);D()},Z=()=>{r.traverse(X=>{let ne=X;if(!ne.isMesh)return;let he=ne.material;if(!("emissive"in he))return;let de=he;C!==null&&ne.name===C?(de.emissive.setHex(5073918),de.emissiveIntensity=.45):de.emissive.getHex()!==0&&(de.emissive.setHex(0),de.emissiveIntensity=1)})},J=X=>{C=X,Z()},B=X=>{if(!x){r.remove(o),Ws([o]),b.invalidate(),o=new zt;for(let ne of X.meshes)o.add(Fl(ne,s));r.add(o),a=X.bounds,l=new I(a.max.x-a.min.x,a.max.y-a.min.y,a.max.z-a.min.z),c=new I((a.max.x+a.min.x)/2,(a.max.y+a.min.y)/2,(a.max.z+a.min.z)/2),d=Math.max(l.x,l.y,l.z,1e-6),A(!1),Z(),D()}},Y=()=>{z=requestAnimationFrame(Y),t.controls.update(),t.renderer.render(n,t.camera),M.update()},z=requestAnimationFrame(Y);return{setWireframe(X){this.setRenderMode(X?"wireframe":"shaded-edges")},setRenderMode(X){p=X,Ul(r,X,s)},setScene:B,highlightMesh:J,setHiddenMeshes:k,resetView(){t.camera.near=d/100,t.camera.far=d*40,t.camera.updateProjectionMatrix(),m()},get domElement(){return t.renderer.domElement},dispose(){x=!0,cancelAnimationFrame(z),R(),b.dispose(),M.dispose(),Ws([o,...v,u,h,f]),t.dispose()}}}var ji=Xn(require("react"),1);function Od(i){let{min:e,max:t}=i.bounds,n=Math.max(t.x-e.x,1e-6),s=Math.max(t.y-e.y,1e-6),r=Math.max(n,s)*.05;return{x:e.x-r,y:-t.y-r,width:n+r*2,height:s+r*2}}function mv(i,e){return i.color===void 0?Cf(e):`#${i.color.toString(16).padStart(6,"0")}`}function gv(i){let e=[];for(let t=0;t+1<i.length;t+=2)e.push(`${i[t].toFixed(3)},${i[t+1].toFixed(3)}`);return e.join(" ")}function xv(i,e,t,n,s){let r=n*(Math.PI/180),o=s*(Math.PI/180),a=i+t*Math.cos(r),l=e+t*Math.sin(r),c=i+t*Math.cos(o),d=e+t*Math.sin(o),u=((o-r)%(Math.PI*2)+Math.PI*2)%(Math.PI*2)>Math.PI?1:0;return`M ${a.toFixed(4)} ${l.toFixed(4)} A ${t.toFixed(4)} ${t.toFixed(4)} 0 ${u} 1 ${c.toFixed(4)} ${d.toFixed(4)}`}function Gf(i,e=Pn()){return i.entities.map((t,n)=>{let s=`e${n}`,r=t.layer==="hidden",o=t.layer==="paper"||t.layer==="dim",a=mv(t,e),l={stroke:a,fill:"none",strokeWidth:r||o?1:1.6,vectorEffect:"non-scaling-stroke",...r?{strokeDasharray:"6 4"}:{}};switch(t.type){case"line":return ji.default.createElement("line",{key:s,x1:t.x1,y1:t.y1,x2:t.x2,y2:t.y2,style:l});case"circle":return ji.default.createElement("circle",{key:s,cx:t.cx,cy:t.cy,r:t.r,style:l});case"arc":return ji.default.createElement("path",{key:s,d:xv(t.cx,t.cy,t.r,t.startAngle,t.endAngle),style:l});case"polyline":return ji.default.createElement("polyline",{key:s,points:gv(t.points),fill:"none",style:l});case"text":return ji.default.createElement("g",{key:s,transform:`translate(${t.x} ${t.y}) scale(1 -1) rotate(${(t.rotation??0)*-1})`},ji.default.createElement("text",{x:0,y:0,fontSize:t.height,fill:a,style:{userSelect:"none"}},t.text))}})}var Bd=["shaded-edges","shaded","wireframe"],yv={"shaded-edges":"Faces+Edges",shaded:"Faces",wireframe:"Wireframe"},_v=null,kd=new Set,Wf={part:null,assembly:null,drawing:null};function Xf(i){_v={meta:i,at:Date.now()};let e=i.doc??"part";Wf[e]={meta:i,at:Date.now()};for(let t of kd)t()}function Xs(i){return Wf[i]}function qf(i){return kd.add(i),()=>{kd.delete(i)}}function Yf(i){let e=i.meta;if(e===null||typeof e!="object")return null;let t=e;return typeof t.viewId=="string"&&(t.kind==="3d"||t.kind==="2d")?t:null}function vv(i){let e=new DataView(i);if(e.getUint32(0,!0)!==826426180)throw new Error("bad scene magic");let n=e.getUint32(4,!0),s=new TextDecoder().decode(new Uint8Array(i,8,n)).replace(/\u0000+$/,""),r=JSON.parse(s),o=8+n;return{kind:"3d",format:"model",meshes:r.meshes.map(l=>({name:l.name,...l.color===void 0?{}:{color:l.color},...l.mode===void 0?{}:{mode:l.mode},positions:new Float32Array(i,o+l.posOffset,l.posBytes/4),...l.nrmOffset===void 0?{}:{normals:new Float32Array(i,o+l.nrmOffset,(l.nrmBytes??0)/4)},indices:new Uint32Array(i,o+l.idxOffset,l.idxBytes/4),vertexCount:l.vertexCount,triangleCount:l.triangleCount})),bounds:{min:{x:r.bounds.min[0],y:r.bounds.min[1],z:r.bounds.min[2]},max:{x:r.bounds.max[0],y:r.bounds.max[1],z:r.bounds.max[2]}},units:r.units}}function qs(i){let[e,t]=(0,pt.useState)(null),[n,s]=(0,pt.useState)(null);return(0,pt.useEffect)(()=>{if(i===void 0)return;let r=!1;s(null);let o=i.includes("/dsh-cad/bin/");return fetch(i).then(async a=>{if(!a.ok)throw new Error(`scene fetch failed: HTTP ${a.status}`);return o?vv(await a.arrayBuffer()):await a.json()}).then(a=>{r||t(a)}).catch(a=>{r||s(a instanceof Error?a.message:String(a))}),()=>{r=!0}},[i]),{scene:e,error:n}}function Di({scene:i,error:e,height:t,fill:n,lazy:s,highlight:r,hidden:o}){return i!==null?i.kind==="3d"?Bt.default.createElement(bv,{scene:i,height:t,fill:n,lazy:s,highlight:r,hidden:o}):Bt.default.createElement(Sv,{scene:i,height:t,fill:n}):e!==null?Bt.default.createElement("div",{style:nn.error},e):Bt.default.createElement("div",{style:nn.placeholder},"loading\u2026")}function zd(i,e,t){return{...i===!0?Ol.viewport:{...nn.viewport,height:e??360},background:Ki(t)}}function bv({scene:i,height:e,fill:t,lazy:n,highlight:s,hidden:r}){let o=(0,pt.useRef)(null),a=(0,pt.useRef)(null),[l,c]=(0,pt.useState)("shaded-edges"),d=Pi(),u=(0,pt.useRef)(i),[h,f]=(0,pt.useState)(0),g=(0,pt.useRef)(0),[v,p]=(0,pt.useState)(n!==!0);(0,pt.useEffect)(()=>{if(n!==!0)return;let w=o.current;if(w===null)return;let y=new IntersectionObserver(M=>{p(M[0]?.isIntersecting??!0)},{rootMargin:"200px"});return y.observe(w),()=>{y.disconnect()}},[n]),(0,pt.useEffect)(()=>{if(!v)return;let w=o.current;if(w===null)return;let y=Vf(w,u.current);a.current=y,y.setRenderMode(l);let M=()=>{let b=Date.now();b-g.current<1e3||(g.current=b,f(R=>R+1))};return y.domElement.addEventListener("webglcontextlost",M),()=>{y.domElement.removeEventListener("webglcontextlost",M),y.dispose(),a.current=null}},[v,h]),(0,pt.useEffect)(()=>{i!==u.current&&(u.current=i,a.current?.setScene(i))},[i]),(0,pt.useEffect)(()=>{a.current?.setRenderMode(l)},[l]),(0,pt.useEffect)(()=>{a.current?.highlightMesh(s??null)},[s]),(0,pt.useEffect)(()=>{a.current?.setHiddenMeshes(r??[])},[r]);let m=(0,pt.useCallback)(()=>{c(w=>Bd[(Bd.indexOf(w)+1)%Bd.length])},[]),A=(0,pt.useCallback)(()=>{a.current?.resetView()},[]);return Bt.default.createElement("div",{style:t===!0?Ol.wrap:nn.viewportWrap},Bt.default.createElement("div",{ref:o,style:zd(t,e,d)}),Bt.default.createElement("div",{style:nn.toolbar},Bt.default.createElement("button",{type:"button",style:nn.button,onClick:m,"aria-pressed":l==="wireframe"},yv[l]),Bt.default.createElement("button",{type:"button",style:nn.button,onClick:A},"Reset view")))}function Sv({scene:i,height:e,fill:t}){let[n,s]=(0,pt.useState)(()=>Od(i)),r=(0,pt.useRef)(null),o=(0,pt.useCallback)(()=>s(Od(i)),[i]),a=Pi(),l=(0,pt.useCallback)(h=>{h.preventDefault();let g=h.currentTarget.getBoundingClientRect(),v=n.x+(h.clientX-g.left)/g.width*n.width,p=n.y+(h.clientY-g.top)/g.height*n.height,m=h.deltaY<0?.85:1.18;s({x:v-(v-n.x)*m,y:p-(p-n.y)*m,width:n.width*m,height:n.height*m})},[n]),c=(0,pt.useCallback)(h=>{r.current={x:h.clientX,y:h.clientY,viewBox:n},h.currentTarget.setPointerCapture(h.pointerId)},[n]),d=(0,pt.useCallback)(h=>{let f=r.current;if(f===null)return;let v=h.currentTarget.getBoundingClientRect(),p=f.viewBox.width/v.width,m=f.viewBox.height/v.height;s({...f.viewBox,x:f.viewBox.x-(h.clientX-f.x)*p,y:f.viewBox.y-(h.clientY-f.y)*m})},[]),u=(0,pt.useCallback)(()=>{r.current=null},[]);if(i.format==="svg"&&i.svgText!==void 0){let h=`data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(i.svgText)))}`;return Bt.default.createElement("div",{style:t===!0?Ol.wrap:nn.viewportWrap},Bt.default.createElement("div",{style:{...zd(t,e,a),display:"flex",alignItems:"center",justifyContent:"center",padding:12,boxSizing:"border-box"}},Bt.default.createElement("img",{src:h,alt:i.format,style:{maxWidth:"100%",maxHeight:"100%",background:Rf(a),borderRadius:2,boxShadow:"0 1px 2px rgba(16,24,40,0.18), 0 12px 30px -16px rgba(16,24,40,0.45)"}})),Bt.default.createElement("div",{style:nn.toolbar}))}return Bt.default.createElement("div",{style:t===!0?Ol.wrap:nn.viewportWrap},Bt.default.createElement("svg",{viewBox:`${n.x} ${n.y} ${n.width} ${n.height}`,style:{...zd(t,e,a),cursor:r.current===null?"default":"grabbing",touchAction:"none"},onWheel:l,onPointerDown:c,onPointerMove:d,onPointerUp:u,onPointerLeave:u},Bt.default.createElement("g",{transform:"scale(1 -1)"},Gf(i,a))),Bt.default.createElement("div",{style:nn.toolbar},Bt.default.createElement("button",{type:"button",style:nn.button,onClick:o},"Fit")))}var nn={viewportWrap:{position:"relative"},viewport:{width:"100%",display:"block"},toolbar:{position:"absolute",top:8,left:8,display:"flex",gap:6,zIndex:5},button:{border:"1px solid var(--dsw-alias-border-l2, #c4c9d0)",borderRadius:999,background:"var(--dsw-alias-bg-base, #fff)",color:"var(--dsw-alias-label-secondary, #374151)",fontSize:11,lineHeight:"16px",padding:"3px 10px",cursor:"pointer"},placeholder:{color:"var(--dsw-alias-label-tertiary, #6b7280)",fontSize:12,padding:"10px 12px"},error:{color:"var(--dsw-alias-state-error-primary, #b91c1c)",fontSize:12,padding:"10px 12px"}},Ol={wrap:{position:"relative",flex:"1 1 auto",minHeight:0,display:"flex",flexDirection:"column"},viewport:{flex:"1 1 auto",minHeight:0,width:"100%",display:"block"}};function $f({block:i}){let e=i.kind==="tool-call",t=e?void 0:Yf(i)??void 0;return t!==void 0&&Xf(t),t===void 0?Ys.default.createElement("div",{style:nn.placeholder},e?"Converting CAD\u2026":"CAD result"):Ys.default.createElement("div",{style:Bl.row},Ys.default.createElement("span",{style:Bl.title},t.title),Ys.default.createElement("span",{style:Bl.stats},Mv(t)),Ys.default.createElement("span",{style:Bl.hint},"\u5728\u53F3\u4FA7 CAD \u9762\u677F\u67E5\u770B"))}function Mv(i){if(i.kind==="3d"){let e=[];return i.stats.meshes!==void 0&&e.push(`${i.stats.meshes} part${i.stats.meshes===1?"":"s"}`),i.stats.triangles!==void 0&&e.push(`${i.stats.triangles.toLocaleString()} triangles`),e.join(" \xB7 ")}return i.stats.entities!==void 0?`${i.stats.entities.toLocaleString()} entities`:""}var Bl={row:{display:"flex",alignItems:"baseline",gap:10,margin:"4px 0",padding:"6px 12px",border:"1px solid var(--dsw-alias-border-l1, #d7dbe0)",borderRadius:8,maxWidth:720,background:"var(--dsw-alias-bg-subtle, #f7f8fa)"},title:{fontWeight:600,fontSize:12.5},stats:{fontSize:12,color:"var(--dsw-alias-label-tertiary, #6b7280)"},hint:{marginLeft:"auto",fontSize:11,color:"var(--dsw-alias-label-tertiary, #9ca3af)",whiteSpace:"nowrap"}};var Qi=Xn(require("react"),1);var q=Xn(require("react"),1);var $s=require("react"),wv=1500,kl=new Map,eo=new Set,zl=null,Hl=null,to=null,Hd=!1;function Zf(){for(let i of[...eo])i()}async function Vl(){if(!Hd){Hd=!0;try{let i=zl===null?"/dsh-cad/docs":`/dsh-cad/docs?session=${encodeURIComponent(zl)}`,e=await fetch(i,{cache:"no-store"});if(!e.ok)return;let t=await e.json(),n=!1;for(let r of t.docs??[])typeof r?.id!="string"||typeof r?.version!="number"||kl.get(r.id)!==r.version&&(kl.set(r.id,r.version),n=!0);let s=t.active!==void 0&&typeof t.active?.id=="string"?t.active:null;s!==null&&typeof s.version=="number"&&kl.set(s.id,s.version),Ev(Hl,s)||(Hl=s,n=!0),n&&Zf()}catch{}finally{Hd=!1}}}function Ev(i,e){return i===e?!0:i===null||e===null?!1:i.id===e.id&&i.version===e.version&&i.name===e.name&&i.sceneUrl===e.sceneUrl}function Jf(i){zl!==i&&(zl=i,Hl=null,Zf(),Vl())}function Gl(){typeof document<"u"&&!document.hidden&&Vl()}function Tv(){to===null&&(Vl(),to=setInterval(()=>{typeof document<"u"&&document.hidden||Vl()},wv),typeof document<"u"&&(document.addEventListener("visibilitychange",Gl),window.addEventListener("focus",Gl)))}function Av(){to!==null&&(clearInterval(to),to=null,typeof document<"u"&&(document.removeEventListener("visibilitychange",Gl),window.removeEventListener("focus",Gl)))}function Kf(i){return eo.add(i),eo.size===1&&Tv(),()=>{eo.delete(i),eo.size===0&&Av()}}function Cv(i){return i===null?null:kl.get(i)??null}function jf(){let i=(0,$s.useCallback)(()=>Hl,[]);return(0,$s.useSyncExternalStore)(Kf,i)}function Vd(i){let e=(0,$s.useCallback)(()=>Cv(i),[i]);return(0,$s.useSyncExternalStore)(Kf,e)}function Wl(i){let e=/[?&]v=(\d+)/.exec(i??"");return e===null?0:Number(e[1])}function Gd(i,e){if(i===void 0||e===null)return i;let t=Wl(i);return t>=e?i:t>0?i.replace(/([?&])v=\d+/,`$1v=${e}`):`${i}${i.includes("?")?"&":"?"}v=${e}`}var ke=Xn(require("react"),1);function Qf(i,e){let[t,n]=(0,ke.useState)(null);return(0,ke.useEffect)(()=>{if(i===null){n(null);return}let s=!1;return fetch(`/dsh-cad/asm/${i}`).then(r=>r.ok?r.json():Promise.reject(new Error(`HTTP ${r.status}`))).then(r=>{s||n(r)}).catch(()=>{s||n(null)}),()=>{s=!0}},[i,e]),{tree:t}}var Rv={concentric:"\u540C\u8F74",coaxial:"\u540C\u8F74",coincident:"\u91CD\u5408",collinear:"\u5171\u7EBF",parallel:"\u5E73\u884C",perpendicular:"\u5782\u76F4",tangent:"\u76F8\u5207",distance:"\u8DDD\u79BB",angle:"\u89D2\u5EA6",symmetric:"\u5BF9\u79F0",fixed:"\u56FA\u5B9A",mate:"\u8D34\u5408"};function Pv(i){let e=Rv[i.type.toLowerCase()],t=i.type.charAt(0).toUpperCase()+i.type.slice(1);return e===void 0?t:`${e} ${t}`}function Wd(i){return i.a!==void 0&&i.b!==void 0?`${i.a} \u2194 ${i.b}`:i.a??i.b??""}var Iv={rigid:"\u521A\u6027",revolute:"\u65CB\u8F6C",linear:"\u6ED1\u52A8",cylindrical:"\u5706\u67F1",ball:"\u7403\u9762",planar:"\u5E73\u9762",polar:"\u6781\u5750\u6807"};function Dv(i){let e=Iv[i.type],t=i.type.charAt(0).toUpperCase()+i.type.slice(1);return e===void 0?t:`${e} ${t}`}function Lv(){return ke.default.createElement("svg",{width:"12",height:"12",viewBox:"0 0 16 16",fill:"none","aria-hidden":!0},ke.default.createElement("path",{d:"M6.5 9.5 9.5 6.5M5 8 3.6 9.4a2.3 2.3 0 0 0 3.2 3.2L8 11.4M8 4.6l1.2-1.2a2.3 2.3 0 0 1 3.2 3.2L11 8",stroke:"currentColor",strokeWidth:"1.4",strokeLinecap:"round"}))}function Nv(){return ke.default.createElement("svg",{width:"13",height:"13",viewBox:"0 0 16 16",fill:"none","aria-hidden":!0},ke.default.createElement("path",{d:"M1.5 8S4 4.2 8 4.2 14.5 8 14.5 8 12 11.8 8 11.8 1.5 8 1.5 8Z",stroke:"currentColor",strokeWidth:"1.2",strokeLinejoin:"round"}),ke.default.createElement("circle",{cx:"8",cy:"8",r:"1.9",stroke:"currentColor",strokeWidth:"1.2"}))}function Uv(){return ke.default.createElement("svg",{width:"13",height:"13",viewBox:"0 0 16 16",fill:"none","aria-hidden":!0},ke.default.createElement("path",{d:"M3 2.5 13 13.5",stroke:"currentColor",strokeWidth:"1.3",strokeLinecap:"round"}),ke.default.createElement("path",{d:"M6.4 4.7A5.6 5.6 0 0 1 8 4.2c4 0 6.5 3.8 6.5 3.8a11.6 11.6 0 0 1-1.9 2.3M4 5.6A10.9 10.9 0 0 0 1.5 8S4 11.8 8 11.8c.7 0 1.4-.1 2-.4",stroke:"currentColor",strokeWidth:"1.2",strokeLinecap:"round",strokeLinejoin:"round"}))}function Xd({title:i,open:e,onToggle:t}){return ke.default.createElement("button",{type:"button",style:ct.sectionHeader,onClick:t,"aria-expanded":e},ke.default.createElement("span",{style:{...ct.sectionChevron,transform:e?"rotate(0deg)":"rotate(-90deg)"}},"\u25BE"),ke.default.createElement("span",{style:ct.sectionTitle},i))}function ep({tree:i,selected:e,onSelect:t,hidden:n,onToggleHidden:s,onCollapse:r}){let[o,a]=(0,ke.useState)(!0),[l,c]=(0,ke.useState)(!0),[d,u]=(0,ke.useState)(!0),h=i?.parts??[],f=i?.constraints??[],g=i?.joints??[],v=i?.explode;return ke.default.createElement("div",{style:ct.root},ke.default.createElement("div",{style:ct.header},ke.default.createElement("span",{style:ct.headerIcon},ke.default.createElement("svg",{width:"13",height:"13",viewBox:"0 0 16 16",fill:"none","aria-hidden":!0},ke.default.createElement("path",{d:"M5.5 1.5 10 4v4L5.5 10.5 1 8V4l4.5-2.5Z",stroke:"currentColor",strokeWidth:"1.2",strokeLinejoin:"round",opacity:"0.75"}),ke.default.createElement("path",{d:"M10.5 5.5 15 8v4l-4.5 2.5L6 12V8l4.5-2.5Z",stroke:"currentColor",strokeWidth:"1.2",strokeLinejoin:"round"}))),ke.default.createElement("span",{style:ct.headerTitle,title:i?.name},"Assembly"),ke.default.createElement("span",{style:ct.headerStats},h.length," parts \xB7 ",g.length," joints",v!==void 0?` \xB7 \u7206\u70B8 \xD7${v}`:""),ke.default.createElement("button",{type:"button",style:ct.collapse,onClick:r,"aria-label":"\u6536\u8D77\u88C5\u914D\u6811",title:"\u6536\u8D77\u88C5\u914D\u6811"},"\u2039")),ke.default.createElement("div",{style:ct.scroll},ke.default.createElement(Xd,{title:"PARTS",open:o,onToggle:()=>{a(p=>!p)}}),o?h.length===0?ke.default.createElement("div",{style:ct.emptyRow},"\u8FD8\u6CA1\u6709\u5B9E\u4F8B \u2014 \u7528 cad_assembly_insert \u63D2\u5165"):h.map(p=>{let m=p.name===e,A=n.has(p.name);return ke.default.createElement("div",{key:p.instanceId,style:{...ct.partRow,...m?ct.partRowActive:{},...p.missing?ct.partRowMissing:{},...A?ct.partRowHidden:{}}},ke.default.createElement("button",{type:"button",style:ct.partMain,title:p.missing?`${p.name}\uFF08\u5F15\u7528\u7684\u4F53\u5DF2\u88AB\u5E03\u5C14\u6D88\u8017\uFF09`:p.name,onClick:()=>{t(m?null:p.name)}},ke.default.createElement("span",{style:{...ct.swatch,background:`#${p.color.toString(16).padStart(6,"0")}`}}),ke.default.createElement("span",{style:ct.partName},p.name)),p.missing?null:ke.default.createElement("button",{type:"button","aria-label":A?`\u663E\u793A ${p.name}`:`\u9690\u85CF ${p.name}`,title:A?"\u663E\u793A":"\u9690\u85CF",style:{...ct.eye,...A?ct.eyeHidden:{}},onClick:()=>{s(p)}},A?ke.default.createElement(Uv,null):ke.default.createElement(Nv,null)))}):null,ke.default.createElement(Xd,{title:"JOINTS",open:l,onToggle:()=>{c(p=>!p)}}),l?g.length===0?ke.default.createElement("div",{style:ct.emptyRow},"\u8FD8\u6CA1\u6709\u5173\u8282 \u2014 \u7528 cad_assembly_joint \u5B9A\u4E49"):g.map(p=>ke.default.createElement("div",{key:`${p.instanceId}:${p.label}`,style:ct.constraintRow,title:p.link!==void 0?`${p.owner} \xB7 ${p.link}`:`${p.owner} \xB7 ${p.label}`},ke.default.createElement("span",{style:ct.jointIcon},ke.default.createElement("svg",{width:"12",height:"12",viewBox:"0 0 16 16",fill:"none","aria-hidden":!0},ke.default.createElement("circle",{cx:"5",cy:"8",r:"2.6",stroke:"currentColor",strokeWidth:"1.3"}),ke.default.createElement("circle",{cx:"11",cy:"8",r:"2.6",stroke:"currentColor",strokeWidth:"1.3"}))),ke.default.createElement("span",{style:ct.constraintText},ke.default.createElement("span",{style:ct.constraintTitle},Dv(p),p.value===void 0?"":` ${p.value}`),ke.default.createElement("span",{style:ct.constraintRefs}," ",p.link??`${p.owner}.${p.label}`)))):null,ke.default.createElement(Xd,{title:"CONSTRAINTS",open:d,onToggle:()=>{u(p=>!p)}}),d?f.length===0?ke.default.createElement("div",{style:ct.emptyRow},"\u8FD8\u6CA1\u6709\u7EA6\u675F \u2014 \u7528 cad_constraint \u58F0\u660E"):f.map(p=>ke.default.createElement("div",{key:p.id,style:ct.constraintRow,title:p.label??Wd(p)},ke.default.createElement("span",{style:ct.constraintIcon},ke.default.createElement(Lv,null)),ke.default.createElement("span",{style:ct.constraintText},ke.default.createElement("span",{style:ct.constraintTitle},p.label??Pv(p)),Wd(p)!==""?ke.default.createElement("span",{style:ct.constraintRefs}," ",Wd(p)):null))):null))}var ct={root:{width:218,display:"flex",flexDirection:"column",minHeight:0,maxHeight:"100%",borderRadius:10,border:"1px solid var(--dsw-alias-border-l1, #e2e5ea)",boxShadow:"0 10px 28px -12px rgba(16,24,40,0.28)",background:"var(--dsw-alias-bg-base, #fff)",overflow:"hidden"},header:{flex:"none",display:"flex",alignItems:"center",gap:6,padding:"8px 8px 7px 12px",borderBottom:"1px solid var(--dsw-alias-border-l1, #eceff3)"},headerIcon:{display:"flex",alignItems:"center",color:"var(--dsw-alias-label-primary, #4d6bfe)"},headerTitle:{fontSize:12.5,fontWeight:600,color:"var(--dsw-alias-label-primary, #1f2937)",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},headerStats:{marginLeft:"auto",fontSize:10.5,color:"var(--dsw-alias-label-tertiary, #9ca3af)",whiteSpace:"nowrap"},collapse:{flex:"none",width:18,height:18,border:"none",borderRadius:5,background:"transparent",color:"var(--dsw-alias-label-tertiary, #9ca3af)",fontSize:13,lineHeight:"16px",cursor:"pointer",padding:0,textAlign:"center"},scroll:{flex:"1 1 auto",minHeight:0,overflowY:"auto",paddingBottom:8},sectionHeader:{display:"flex",alignItems:"center",gap:4,width:"100%",border:"none",background:"transparent",padding:"9px 12px 3px",cursor:"pointer",font:"inherit",textAlign:"left"},sectionChevron:{fontSize:9,color:"var(--dsw-alias-label-tertiary, #9ca3af)",transition:"transform 120ms"},sectionTitle:{fontSize:10.5,fontWeight:600,letterSpacing:"0.06em",color:"var(--dsw-alias-label-tertiary, #6b7280)"},emptyRow:{fontSize:11,color:"var(--dsw-alias-label-tertiary, #9ca3af)",padding:"4px 12px 4px 24px"},partRow:{display:"flex",alignItems:"center",gap:2,borderRadius:6,margin:"0 6px",paddingLeft:16},partMain:{flex:"1 1 auto",display:"flex",alignItems:"center",gap:8,minWidth:0,border:"none",background:"transparent",padding:"4px 0",cursor:"pointer",font:"inherit",fontSize:12,color:"var(--dsw-alias-label-primary, #1f2937)",textAlign:"left"},partRowActive:{background:"var(--dsw-alias-bg-selected, rgba(77,107,254,0.1))",boxShadow:"inset 0 0 0 1px var(--dsw-alias-label-primary, rgba(77,107,254,0.45))"},partRowMissing:{opacity:.45,fontStyle:"italic"},partRowHidden:{opacity:.55},swatch:{flex:"none",width:10,height:10,borderRadius:3,boxShadow:"inset 0 0 0 1px rgba(16,24,40,0.18)"},partName:{flex:"1 1 auto",minWidth:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},eye:{flex:"none",display:"flex",alignItems:"center",justifyContent:"center",width:22,height:20,borderRadius:5,border:"none",background:"transparent",color:"var(--dsw-alias-label-tertiary, #9ca3af)",cursor:"pointer",padding:0},eyeHidden:{color:"var(--dsw-alias-label-primary, #4d6bfe)"},constraintRow:{display:"flex",alignItems:"flex-start",gap:7,padding:"4px 10px 4px 22px",fontSize:11.5,color:"var(--dsw-alias-label-secondary, #374151)"},constraintIcon:{flex:"none",display:"flex",alignItems:"center",marginTop:1,color:"var(--dsw-alias-label-tertiary, #9ca3af)"},jointIcon:{flex:"none",display:"flex",alignItems:"center",marginTop:1,color:"var(--dsw-alias-label-tertiary, #9ca3af)"},constraintText:{minWidth:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},constraintTitle:{fontWeight:600},constraintRefs:{color:"var(--dsw-alias-label-tertiary, #9ca3af)"}};var st=Xn(require("react"),1);function np(i,e){let[t,n]=(0,st.useState)(null);return(0,st.useEffect)(()=>{if(i===null){n(null);return}let s=!1;return fetch(`/dsh-cad/tree/${i}`).then(r=>r.ok?r.json():Promise.reject(new Error(`HTTP ${r.status}`))).then(r=>{s||n(r)}).catch(()=>{s||n(null)}),()=>{s=!0}},[i,e]),{tree:t}}function Fv(){return st.default.createElement("svg",{width:"12",height:"12",viewBox:"0 0 16 16",fill:"none","aria-hidden":!0},st.default.createElement("path",{d:"M2.5 12.2 11 3.7a1.8 1.8 0 0 1 2.5 2.5L5 14.7l-3.2.7.7-3.2Z",stroke:"currentColor",strokeWidth:"1.3",strokeLinejoin:"round"}),st.default.createElement("path",{d:"M9.6 5.1l1.8 1.8",stroke:"currentColor",strokeWidth:"1.3"}))}function tp(){return st.default.createElement("svg",{width:"12",height:"12",viewBox:"0 0 16 16",fill:"none","aria-hidden":!0},st.default.createElement("path",{d:"M3 3h7.5L13 5.5V13H3V3Z",stroke:"currentColor",strokeWidth:"1.2",strokeLinejoin:"round",opacity:"0.8"}),st.default.createElement("path",{d:"M3 10.5 6.5 7l3 3L13 6.7",stroke:"currentColor",strokeWidth:"1.2",strokeLinejoin:"round"}))}function Ov(){return st.default.createElement("svg",{width:"13",height:"13",viewBox:"0 0 16 16",fill:"none","aria-hidden":!0},st.default.createElement("path",{d:"M1.5 8S4 4.2 8 4.2 14.5 8 14.5 8 12 11.8 8 11.8 1.5 8 1.5 8Z",stroke:"currentColor",strokeWidth:"1.2",strokeLinejoin:"round"}),st.default.createElement("circle",{cx:"8",cy:"8",r:"1.9",stroke:"currentColor",strokeWidth:"1.2"}))}function Bv(){return st.default.createElement("svg",{width:"13",height:"13",viewBox:"0 0 16 16",fill:"none","aria-hidden":!0},st.default.createElement("path",{d:"M3 2.5 13 13.5",stroke:"currentColor",strokeWidth:"1.3",strokeLinecap:"round"}),st.default.createElement("path",{d:"M6.4 4.7A5.6 5.6 0 0 1 8 4.2c4 0 6.5 3.8 6.5 3.8a11.6 11.6 0 0 1-1.9 2.3M4 5.6A10.9 10.9 0 0 0 1.5 8S4 11.8 8 11.8c.7 0 1.4-.1 2-.4",stroke:"currentColor",strokeWidth:"1.2",strokeLinecap:"round",strokeLinejoin:"round"}))}function ip({tree:i,selected:e,onSelect:t,hidden:n,onToggleHidden:s,onCollapse:r}){let o=i?.rows??[],a=o.filter(l=>l.kind==="sketch").length;return st.default.createElement("div",{style:It.root},st.default.createElement("div",{style:It.header},st.default.createElement("span",{style:It.headerIcon},st.default.createElement(tp,null)),st.default.createElement("span",{style:It.headerTitle},"\u7279\u5F81\u6811"),st.default.createElement("span",{style:It.headerStats},a," \u8349\u56FE \xB7 ",o.length-a," \u7279\u5F81"),st.default.createElement("button",{type:"button",style:It.collapse,onClick:r,"aria-label":"\u6536\u8D77\u7279\u5F81\u6811",title:"\u6536\u8D77\u7279\u5F81\u6811"},"\u2039")),st.default.createElement("div",{style:It.scroll},o.length===0?st.default.createElement("div",{style:It.emptyRow},"\u8FD8\u6CA1\u6709\u7279\u5F81 \u2014 \u7528 cad_sketch_new / cad_extrude_profile \u5EFA\u6A21"):o.map(l=>{let c=l.kind==="sketch",d=c?[`sketch:${l.sketch}`,`sketch:${l.sketch}:plane`,`sketch:${l.sketch}:fill`,`sketch:${l.sketch}:pts`]:l.body!==void 0?[l.body]:[],u=d.length>0&&d.every(f=>n.has(f)),h=!c&&l.body!==void 0&&l.body===e;return st.default.createElement("div",{key:l.key,style:{...It.row,...h?It.rowActive:{},...u?It.rowHidden:{}}},st.default.createElement("button",{type:"button",style:{...It.rowMain,...c?It.sketchMain:{}},title:c?`\u8349\u56FE ${l.label}\uFF08\u62C9\u4F38/\u65CB\u8F6C/\u626B\u63A0\u53EF\u5F15\u7528\uFF09`:l.label,onClick:()=>{!c&&l.body!==void 0&&t(h?null:l.body)}},st.default.createElement("span",{style:c?It.sketchIcon:It.featureIcon},c?st.default.createElement(Fv,null):st.default.createElement(tp,null)),st.default.createElement("span",{style:It.rowText},c?l.label:st.default.createElement(st.default.Fragment,null,st.default.createElement("span",{style:It.featureLabel},l.feature),st.default.createElement("span",{style:It.featureName}," ",l.label),l.uses!==void 0?st.default.createElement("span",{style:It.uses}," \u27F5 ",l.uses):null))),d.length>0?st.default.createElement("button",{type:"button","aria-label":u?`\u663E\u793A ${l.label}`:`\u9690\u85CF ${l.label}`,title:u?"\u663E\u793A":"\u9690\u85CF",style:{...It.eye,...u?It.eyeHidden:{}},onClick:()=>{s(d)}},u?st.default.createElement(Bv,null):st.default.createElement(Ov,null)):null)})))}var It={root:{width:218,display:"flex",flexDirection:"column",minHeight:0,maxHeight:"100%",borderRadius:10,border:"1px solid var(--dsw-alias-border-l1, #e2e5ea)",boxShadow:"0 10px 28px -12px rgba(16,24,40,0.28)",background:"var(--dsw-alias-bg-base, #fff)",overflow:"hidden"},header:{flex:"none",display:"flex",alignItems:"center",gap:6,padding:"8px 8px 7px 12px",borderBottom:"1px solid var(--dsw-alias-border-l1, #eceff3)"},headerIcon:{display:"flex",alignItems:"center",color:"var(--dsw-alias-label-primary, #4d6bfe)"},headerTitle:{fontSize:12.5,fontWeight:600,color:"var(--dsw-alias-label-primary, #1f2937)",whiteSpace:"nowrap"},headerStats:{marginLeft:"auto",fontSize:10.5,color:"var(--dsw-alias-label-tertiary, #9ca3af)",whiteSpace:"nowrap"},collapse:{flex:"none",width:18,height:18,border:"none",borderRadius:5,background:"transparent",color:"var(--dsw-alias-label-tertiary, #9ca3af)",fontSize:13,lineHeight:"16px",cursor:"pointer",padding:0,textAlign:"center"},scroll:{flex:"1 1 auto",minHeight:0,overflowY:"auto",paddingBottom:8},emptyRow:{fontSize:11,color:"var(--dsw-alias-label-tertiary, #9ca3af)",padding:"4px 12px"},row:{display:"flex",alignItems:"center",gap:2,borderRadius:6,margin:"0 6px"},rowMain:{flex:"1 1 auto",display:"flex",alignItems:"center",gap:7,minWidth:0,border:"none",background:"transparent",padding:"4px 0 4px 10px",cursor:"pointer",font:"inherit",fontSize:12,color:"var(--dsw-alias-label-primary, #1f2937)",textAlign:"left"},sketchMain:{color:"#2f80d6"},sketchIcon:{flex:"none",display:"flex",alignItems:"center",color:"#2f80d6"},featureIcon:{flex:"none",display:"flex",alignItems:"center",color:"var(--dsw-alias-label-tertiary, #9ca3af)"},rowText:{flex:"1 1 auto",minWidth:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},featureLabel:{fontWeight:600,color:"var(--dsw-alias-label-secondary, #374151)"},featureName:{color:"var(--dsw-alias-label-primary, #1f2937)"},uses:{color:"#2f80d6",fontSize:11},rowActive:{background:"var(--dsw-alias-bg-selected, rgba(77,107,254,0.1))",boxShadow:"inset 0 0 0 1px var(--dsw-alias-label-primary, rgba(77,107,254,0.45))"},rowHidden:{opacity:.55},eye:{flex:"none",display:"flex",alignItems:"center",justifyContent:"center",width:22,height:20,borderRadius:5,border:"none",background:"transparent",color:"var(--dsw-alias-label-tertiary, #9ca3af)",cursor:"pointer",padding:0},eyeHidden:{color:"var(--dsw-alias-label-primary, #4d6bfe)"}};var T=Xn(require("react"),1);var eh="cad-space",$d=null,Yl=new Set,Xl=null,io=null;function kv(){for(let i of[...Yl])i()}async function Zd(){try{let i=await fetch("/dsh-cad/space/snapshot",{cache:"no-store"});if(!i.ok)throw new Error(`HTTP ${i.status}`);let e=await i.json();$d={folders:e.folders??[],docs:e.docs??[],sessionBindings:e.sessionBindings??{}},kv()}catch{}}function zv(){io===null&&(Zd(),io=setInterval(()=>{typeof document<"u"&&document.hidden||Zd()},2e3))}function Hv(){io!==null&&(clearInterval(io),io=null)}function Ni(){return Xl===null&&(Xl=Zd().finally(()=>{Xl=null})),Xl}function Vv(){let i=(0,T.useCallback)(t=>(zv(),Yl.add(t),()=>{Yl.delete(t),Yl.size===0&&Hv()}),[]),e=(0,T.useCallback)(()=>$d,[]);return(0,T.useSyncExternalStore)(i,e,()=>$d)}async function Gn(i,e){let t=await fetch(`/dsh-cad/space/${i}`,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(e)}),n=await t.json().catch(()=>({}));if(!t.ok)throw new Error(typeof n.error=="string"?n.error:`HTTP ${t.status}`);return await Ni(),n}async function sp(i,e){let t=await i.arrayBuffer(),n="",s=new Uint8Array(t),r=32768;for(let l=0;l<s.length;l+=r)n+=String.fromCharCode(...s.subarray(l,l+r));let o=await fetch(`/dsh-cad/space/import?filename=${encodeURIComponent(i.name)}${e!==null?`&folderId=${encodeURIComponent(e)}`:""}`,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({data:btoa(n)})}),a=await o.json().catch(()=>({}));if(!o.ok)throw new Error(typeof a.error=="string"?a.error:`HTTP ${o.status}`);await Ni()}function rp(i,e){let t=document.createElement("a");t.href=`/dsh-cad/space/export?id=${encodeURIComponent(i.id)}&format=${e}`,t.rel="noopener",document.body.appendChild(t),t.click(),t.remove()}function Li(i){return i.drawingCount>0&&i.bodyCount===0&&i.instanceCount===0?"drawing":i.instanceCount>0?"assembly":i.bodyCount>0?"part":"empty"}var Gv={part:"\u96F6\u4EF6",assembly:"\u88C5\u914D",drawing:"\u5DE5\u7A0B\u56FE",empty:"\u7A7A"},Wv={part:"var(--dsw-alias-state-business-primary, #4d6bfe)",assembly:"var(--dsw-alias-state-success-primary, #079455)",drawing:"var(--dsw-alias-state-warn-primary, #dc6803)",empty:"var(--dsw-alias-label-tertiary, #9ca3af)"};function no(i){let e=Date.now()-Date.parse(i);if(!Number.isFinite(e))return"";let t=Math.floor(e/6e4);if(t<1)return"\u521A\u521A";if(t<60)return`${t} \u5206\u949F\u524D`;let n=Math.floor(t/60);return n<24?`${n} \u5C0F\u65F6\u524D`:`${Math.floor(n/24)} \u5929\u524D`}function Jd(i){return i<1024?`${i} B`:i<1024*1024?`${(i/1024).toFixed(1)} KB`:`${(i/1024/1024).toFixed(1)} MB`}function Xv(i,e){let t=new Map(e.map(r=>[r.id,r])),n=[],s=i.id;for(;s!==null;){let r=t.get(s);if(r===void 0)break;n.unshift(r.name),s=r.parentId}return n.join("/")}var Dt="currentColor";function th({size:i=16}){return T.default.createElement("svg",{width:i,height:i,viewBox:"0 0 16 16",fill:"none","aria-hidden":"true"},T.default.createElement("path",{d:"M1.5 4.5A1 1 0 0 1 2.5 3.5h3.2l1.4 1.8h6.4a1 1 0 0 1 1 1v6.2a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1V4.5Z",stroke:Dt,strokeWidth:"1.2",strokeLinejoin:"round"}),T.default.createElement("path",{d:"M8 8.2 5.2 9.9v2.2L8 13.8l2.8-1.7V9.9L8 8.2Z",stroke:Dt,strokeWidth:"1",strokeLinejoin:"round",opacity:"0.8"}))}function Kd(){return T.default.createElement("svg",{width:"13",height:"13",viewBox:"0 0 16 16",fill:"none","aria-hidden":!0},T.default.createElement("path",{d:"M8 1.5 14 5v6L8 14.5 2 11V5l6-3.5Z",stroke:Dt,strokeWidth:"1.3",strokeLinejoin:"round"}),T.default.createElement("path",{d:"M2 5l6 3.5L14 5M8 8.5v6",stroke:Dt,strokeWidth:"1.3",strokeLinejoin:"round"}))}function jd(){return T.default.createElement("svg",{width:"13",height:"13",viewBox:"0 0 16 16",fill:"none","aria-hidden":!0},T.default.createElement("path",{d:"M5.5 1.5 10 4v4L5.5 10.5 1 8V4l4.5-2.5Z",stroke:Dt,strokeWidth:"1.2",strokeLinejoin:"round",opacity:"0.75"}),T.default.createElement("path",{d:"M10.5 5.5 15 8v4l-4.5 2.5L6 12V8l4.5-2.5Z",stroke:Dt,strokeWidth:"1.2",strokeLinejoin:"round"}))}function Qd(){return T.default.createElement("svg",{width:"13",height:"13",viewBox:"0 0 16 16",fill:"none","aria-hidden":!0},T.default.createElement("path",{d:"M3 1.5h7l3 3V14.5H3V1.5Z",stroke:Dt,strokeWidth:"1.3",strokeLinejoin:"round"}),T.default.createElement("path",{d:"M5.5 7h5M5.5 9.5h5M5.5 12h3",stroke:Dt,strokeWidth:"1.2",strokeLinecap:"round"}))}function ql(){return T.default.createElement("svg",{width:"14",height:"14",viewBox:"0 0 16 16",fill:"none","aria-hidden":!0},T.default.createElement("path",{d:"M1.5 4.5A1 1 0 0 1 2.5 3.5h3.2l1.4 1.8h6.4a1 1 0 0 1 1 1v6.2a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1V4.5Z",stroke:Dt,strokeWidth:"1.2",strokeLinejoin:"round"}))}function qv(){return T.default.createElement("svg",{width:"13",height:"13",viewBox:"0 0 16 16",fill:"none","aria-hidden":!0},T.default.createElement("circle",{cx:"7",cy:"7",r:"4.6",stroke:Dt,strokeWidth:"1.3"}),T.default.createElement("path",{d:"M10.4 10.4 14 14",stroke:Dt,strokeWidth:"1.3",strokeLinecap:"round"}))}function Yv(){return T.default.createElement("svg",{width:"14",height:"14",viewBox:"0 0 16 16",fill:"none","aria-hidden":!0},T.default.createElement("rect",{x:"2",y:"2",width:"5",height:"5",rx:"1",stroke:Dt,strokeWidth:"1.2"}),T.default.createElement("rect",{x:"9",y:"2",width:"5",height:"5",rx:"1",stroke:Dt,strokeWidth:"1.2"}),T.default.createElement("rect",{x:"2",y:"9",width:"5",height:"5",rx:"1",stroke:Dt,strokeWidth:"1.2"}),T.default.createElement("rect",{x:"9",y:"9",width:"5",height:"5",rx:"1",stroke:Dt,strokeWidth:"1.2"}))}function $v(){return T.default.createElement("svg",{width:"14",height:"14",viewBox:"0 0 16 16",fill:"none","aria-hidden":!0},T.default.createElement("path",{d:"M2 4h12M2 8h12M2 12h12",stroke:Dt,strokeWidth:"1.3",strokeLinecap:"round"}))}function qd(){return T.default.createElement("svg",{width:"14",height:"14",viewBox:"0 0 16 16",fill:"none","aria-hidden":!0},T.default.createElement("circle",{cx:"3",cy:"8",r:"1.2",fill:Dt}),T.default.createElement("circle",{cx:"8",cy:"8",r:"1.2",fill:Dt}),T.default.createElement("circle",{cx:"13",cy:"8",r:"1.2",fill:Dt}))}function Zv(){return T.default.createElement("svg",{width:"12",height:"12",viewBox:"0 0 16 16",fill:"none","aria-hidden":!0},T.default.createElement("path",{d:"M6 3.5 10.5 8 6 12.5",stroke:Dt,strokeWidth:"1.4",strokeLinecap:"round",strokeLinejoin:"round"}))}function Jv(){return T.default.createElement("svg",{width:"12",height:"12",viewBox:"0 0 16 16",fill:"none","aria-hidden":!0},T.default.createElement("path",{d:"M4 4l8 8M12 4l-8 8",stroke:Dt,strokeWidth:"1.4",strokeLinecap:"round"}))}var O={page:{boxSizing:"border-box",width:"100%",height:"100%",display:"flex",overflow:"hidden",color:"var(--dsw-alias-label-primary, #1f2937)",background:"var(--dsw-alias-bg-base, #fff)",fontSize:14},rail:{flex:"none",width:210,display:"flex",flexDirection:"column",padding:"18px 10px 12px",borderRight:"0.5px solid var(--dsw-alias-border-l3, #e2e5ea)",overflowY:"auto",gap:2},railTitle:{flex:"none",display:"flex",alignItems:"center",gap:8,padding:"2px 8px 12px",fontSize:17,fontWeight:600},railPrimary:{flex:"none",display:"flex",alignItems:"center",gap:8,height:36,margin:"0 2px 8px",border:"none",borderRadius:"var(--dsw-radius-md, 8px)",background:"var(--dsw-alias-button-primary-fill, #4d6bfe)",color:"var(--dsw-alias-label-primary-foreground, #fff)",font:"inherit",fontSize:13,fontWeight:500,cursor:"pointer",padding:"0 12px"},railAction:{flex:"none",display:"flex",alignItems:"center",gap:6,height:30,margin:"0 2px 8px",border:"0.5px solid var(--dsw-alias-border-l3, #e2e5ea)",borderRadius:15,background:"transparent",color:"var(--dsw-alias-label-secondary, #374151)",font:"inherit",fontSize:12,cursor:"pointer",padding:"0 10px"},railRow:{flex:"none",display:"flex",alignItems:"center",gap:8,height:32,margin:"0 2px",padding:"0 8px",border:"none",borderRadius:"var(--dsw-radius-md, 8px)",background:"transparent",color:"var(--dsw-alias-label-primary, #1f2937)",font:"inherit",fontSize:13.5,textAlign:"left",cursor:"pointer"},railRowActive:{background:"var(--dsw-alias-interactive-bg-hover, #eceef2)"},railCount:{marginLeft:"auto",color:"var(--dsw-alias-label-tertiary, #9ca3af)",fontSize:11.5},railSection:{flex:"none",margin:"10px 8px 4px",color:"var(--dsw-alias-label-tertiary, #6b7280)",fontSize:11,letterSpacing:"0.02em"},folderRow:{flex:"none",display:"flex",alignItems:"center",gap:6,height:30,margin:"0 2px",padding:"0 6px 0 8px",border:"none",borderRadius:"var(--dsw-radius-md, 8px)",background:"transparent",color:"var(--dsw-alias-label-primary, #1f2937)",font:"inherit",fontSize:13,textAlign:"left",cursor:"pointer"},folderName:{flex:"1 1 auto",minWidth:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},folderDots:{flex:"none",width:20,height:20,display:"flex",alignItems:"center",justifyContent:"center",border:"none",borderRadius:5,background:"transparent",color:"var(--dsw-alias-label-tertiary, #9ca3af)",cursor:"pointer",padding:0},railFoot:{marginTop:"auto",padding:"10px 8px 2px",borderTop:"0.5px solid var(--dsw-alias-border-l3, #e2e5ea)",color:"var(--dsw-alias-label-tertiary, #6b7280)",fontSize:11.5,lineHeight:"18px"},main:{flex:"1 1 auto",minWidth:0,display:"flex",flexDirection:"column",overflow:"hidden"},header:{flex:"none",display:"flex",alignItems:"center",gap:10,padding:"16px 20px 10px"},headerTitle:{fontSize:18,fontWeight:600,flex:"none"},headerSub:{color:"var(--dsw-alias-label-tertiary, #6b7280)",fontSize:12.5,flex:"1 1 auto",minWidth:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},headerButton:{flex:"none",height:32,display:"flex",alignItems:"center",gap:6,padding:"0 12px",border:"0.5px solid var(--dsw-alias-border-l3, #e2e5ea)",borderRadius:"var(--dsw-radius-md, 8px)",background:"var(--dsw-alias-button-elevated-fill, #fff)",color:"var(--dsw-alias-label-primary, #1f2937)",font:"inherit",fontSize:13,fontWeight:500,cursor:"pointer"},headerPrimary:{flex:"none",height:32,display:"flex",alignItems:"center",gap:6,padding:"0 14px",border:"none",borderRadius:"var(--dsw-radius-md, 8px)",background:"var(--dsw-alias-button-primary-fill, #4d6bfe)",color:"var(--dsw-alias-label-primary-foreground, #fff)",font:"inherit",fontSize:13,fontWeight:500,cursor:"pointer"},toolbar:{flex:"none",display:"flex",alignItems:"center",gap:8,padding:"4px 20px 10px",borderBottom:"0.5px solid var(--dsw-alias-border-l3, #e2e5ea)",position:"relative"},breadcrumb:{display:"flex",alignItems:"center",gap:2,flex:"1 1 auto",minWidth:0,overflow:"hidden"},crumb:{border:"none",background:"transparent",color:"var(--dsw-alias-label-secondary, #374151)",font:"inherit",fontSize:12.5,cursor:"pointer",padding:"2px 5px",borderRadius:6,whiteSpace:"nowrap"},crumbActive:{color:"var(--dsw-alias-label-primary, #1f2937)",fontWeight:600},searchBox:{flex:"none",display:"flex",alignItems:"center",gap:6,height:32,padding:"0 10px",border:"0.5px solid var(--dsw-alias-border-l3, #e2e5ea)",borderRadius:"var(--dsw-radius-md, 8px)",color:"var(--dsw-alias-label-tertiary, #6b7280)",width:210},searchInput:{border:"none",background:"transparent",color:"var(--dsw-alias-label-primary, #1f2937)",font:"inherit",fontSize:13,outline:"none",width:"100%"},toolButton:{flex:"none",height:30,display:"flex",alignItems:"center",justifyContent:"center",gap:4,padding:"0 8px",border:"0.5px solid var(--dsw-alias-border-l3, #e2e5ea)",borderRadius:"var(--dsw-radius-md, 8px)",background:"transparent",color:"var(--dsw-alias-label-secondary, #374151)",font:"inherit",fontSize:11.5,cursor:"pointer",whiteSpace:"nowrap"},toolButtonActive:{background:"var(--dsw-alias-interactive-bg-hover, #eceef2)",color:"var(--dsw-alias-label-primary, #1f2937)"},scroll:{flex:"1 1 auto",minHeight:0,overflow:"auto",padding:"14px 20px 32px",position:"relative"},grid:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(216px, 1fr))",gap:10},card:{position:"relative",display:"flex",flexDirection:"column",gap:8,padding:12,borderRadius:"var(--dsw-radius-lg, 12px)",border:"0.5px solid var(--dsw-alias-border-l3, #e2e5ea)",background:"var(--dsw-alias-bg-base, #fff)",cursor:"pointer",textAlign:"left",font:"inherit"},cardActive:{borderColor:"var(--dsw-alias-state-business-primary, #4d6bfe)",boxShadow:"0 0 0 2px color-mix(in srgb, var(--dsw-alias-state-business-primary, #4d6bfe) 22%, transparent)"},cardTop:{display:"flex",alignItems:"flex-start",gap:8},cardIcon:{flex:"none",width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"var(--dsw-radius-md, 8px)",border:"0.5px solid var(--dsw-alias-border-l3, #e2e5ea)",color:"var(--dsw-alias-label-secondary, #374151)"},cardName:{flex:"1 1 auto",minWidth:0,display:"flex",flexDirection:"column",gap:3},cardTitle:{fontSize:13.5,fontWeight:500,lineHeight:"19px",overflow:"hidden",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"},cardMeta:{color:"var(--dsw-alias-label-tertiary, #9ca3af)",fontSize:11.5,lineHeight:"17px",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},cardStats:{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"},statChip:{display:"inline-flex",alignItems:"center",gap:3,height:19,padding:"0 7px",borderRadius:10,background:"var(--dsw-alias-bg-layer-1, #f2f4f7)",color:"var(--dsw-alias-label-secondary, #374151)",fontSize:10.5,whiteSpace:"nowrap"},cardFooter:{display:"flex",alignItems:"center",gap:8,marginTop:2},cardBadge:{fontSize:10.5,fontWeight:600,whiteSpace:"nowrap"},cardMenu:{marginLeft:"auto",flex:"none",width:24,height:24,display:"flex",alignItems:"center",justifyContent:"center",border:"none",borderRadius:6,background:"transparent",color:"var(--dsw-alias-label-tertiary, #9ca3af)",cursor:"pointer",padding:0},listTable:{width:"100%",borderCollapse:"collapse",fontSize:13},listHead:{color:"var(--dsw-alias-label-tertiary, #6b7280)",fontSize:11.5,fontWeight:500,textAlign:"left",padding:"6px 10px",borderBottom:"0.5px solid var(--dsw-alias-border-l3, #e2e5ea)",whiteSpace:"nowrap"},listRow:{borderBottom:"0.5px solid var(--dsw-alias-border-l2, #eceff3)",cursor:"pointer"},listRowActive:{background:"var(--dsw-alias-interactive-bg-hover, #eceef2)"},listCell:{padding:"9px 10px",whiteSpace:"nowrap"},listName:{display:"flex",alignItems:"center",gap:8,minWidth:0},listNameText:{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",fontWeight:500,maxWidth:280},listMeta:{color:"var(--dsw-alias-label-tertiary, #9ca3af)",fontSize:12},checkbox:{accentColor:"var(--dsw-alias-brand-primary, #4d6bfe)"},empty:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:10,color:"var(--dsw-alias-label-tertiary, #9ca3af)",textAlign:"center",padding:40},emptyTitle:{color:"var(--dsw-alias-label-secondary, #6b7280)",fontSize:14,fontWeight:500},emptyHint:{fontSize:12.5,lineHeight:"20px",maxWidth:340},batchBar:{position:"sticky",left:"50%",bottom:12,transform:"translateX(-50%)",zIndex:12,display:"flex",alignItems:"center",gap:8,padding:"8px 12px",borderRadius:"var(--dsw-radius-lg, 12px)",background:"var(--dsw-alias-bg-base, #fff)",border:"0.5px solid var(--dsw-alias-border-l2, #eceff3)",boxShadow:"var(--dsw-elevation-prominent, 0 12px 32px -12px rgba(16,24,40,0.28))",width:"fit-content"},batchButton:{height:28,display:"flex",alignItems:"center",gap:5,padding:"0 10px",border:"none",borderRadius:"var(--dsw-radius-sm, 6px)",background:"transparent",color:"var(--dsw-alias-label-primary, #1f2937)",font:"inherit",fontSize:12.5,cursor:"pointer",whiteSpace:"nowrap"},batchButtonDanger:{color:"var(--dsw-alias-state-error-primary, #d92d20)"},drawer:{flex:"none",width:372,display:"flex",flexDirection:"column",borderLeft:"0.5px solid var(--dsw-alias-border-l3, #e2e5ea)",background:"var(--dsw-alias-bg-base, #fff)",overflow:"hidden"},drawerHead:{flex:"none",display:"flex",alignItems:"center",gap:8,padding:"14px 14px 10px"},drawerTitle:{flex:"1 1 auto",minWidth:0,fontSize:14,fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},drawerIconBtn:{flex:"none",width:26,height:26,display:"flex",alignItems:"center",justifyContent:"center",border:"none",borderRadius:6,background:"transparent",color:"var(--dsw-alias-label-tertiary, #9ca3af)",cursor:"pointer",padding:0},previewPane:{flex:"1 1 auto",minHeight:0,display:"flex",flexDirection:"column",padding:"0 14px"},drawerTabs:{flex:"none",display:"flex",alignItems:"center",gap:4,padding:"8px 0"},drawerTab:{height:26,padding:"0 10px",border:"none",borderRadius:13,background:"transparent",color:"var(--dsw-alias-label-tertiary, #6b7280)",font:"inherit",fontSize:12,cursor:"pointer",display:"flex",alignItems:"center",gap:5},drawerTabActive:{background:"var(--dsw-alias-interactive-bg-hover, #eceef2)",color:"var(--dsw-alias-label-primary, #1f2937)",fontWeight:500},previewStage:{flex:"1 1 auto",minHeight:180,borderRadius:"var(--dsw-radius-lg, 12px)",border:"0.5px solid var(--dsw-alias-border-l3, #e2e5ea)",overflow:"hidden",display:"flex",flexDirection:"column"},previewFill:{flex:"1 1 auto",minHeight:0,display:"flex",flexDirection:"column"},drawerFacts:{flex:"none",display:"flex",flexDirection:"column",padding:"10px 0 6px"},factRow:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,padding:"7px 2px",borderBottom:"0.5px solid var(--dsw-alias-border-l2, #eceff3)",fontSize:12.5},factKey:{color:"var(--dsw-alias-label-secondary, #374151)",flex:"none"},factValue:{textAlign:"right",minWidth:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",color:"var(--dsw-alias-label-primary, #1f2937)"},drawerActions:{flex:"none",display:"flex",flexDirection:"column",gap:8,padding:"10px 14px 16px",borderTop:"0.5px solid var(--dsw-alias-border-l3, #e2e5ea)"},drawerPrimary:{height:34,display:"flex",alignItems:"center",justifyContent:"center",gap:6,border:"none",borderRadius:"var(--dsw-radius-md, 8px)",background:"var(--dsw-alias-button-primary-fill, #4d6bfe)",color:"var(--dsw-alias-label-primary-foreground, #fff)",font:"inherit",fontSize:13,fontWeight:500,cursor:"pointer"},drawerSecondary:{height:30,display:"flex",alignItems:"center",justifyContent:"center",gap:5,border:"0.5px solid var(--dsw-alias-border-l3, #e2e5ea)",borderRadius:"var(--dsw-radius-md, 8px)",background:"transparent",color:"var(--dsw-alias-label-secondary, #374151)",font:"inherit",fontSize:12,cursor:"pointer"},exportRow:{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"},exportChip:{height:26,display:"flex",alignItems:"center",gap:4,padding:"0 9px",border:"0.5px solid var(--dsw-alias-border-l3, #e2e5ea)",borderRadius:13,background:"transparent",color:"var(--dsw-alias-label-secondary, #374151)",font:"inherit",fontSize:11.5,cursor:"pointer",whiteSpace:"nowrap"},menu:{position:"fixed",zIndex:40,minWidth:180,padding:5,background:"var(--dsw-alias-bg-base, #fff)",border:"0.5px solid var(--dsw-alias-border-l3, #e2e5ea)",borderRadius:10,boxShadow:"var(--dsw-elevation-prominent, 0 12px 32px -12px rgba(16,24,40,0.28))",display:"flex",flexDirection:"column",gap:1},menuItem:{display:"flex",alignItems:"center",gap:8,padding:"7px 9px",border:"none",borderRadius:7,background:"transparent",color:"var(--dsw-alias-label-primary, #1f2937)",cursor:"pointer",textAlign:"left",font:"inherit",fontSize:12.5,whiteSpace:"nowrap"},menuItemDanger:{color:"var(--dsw-alias-state-error-primary, #d92d20)"},menuHint:{color:"var(--dsw-alias-label-tertiary, #9ca3af)",fontSize:11,marginLeft:"auto"},dialogOverlay:{position:"fixed",inset:0,zIndex:50,background:"color-mix(in srgb, #101828 32%, transparent)",display:"flex",alignItems:"center",justifyContent:"center"},dialog:{width:340,padding:18,borderRadius:"var(--dsw-radius-lg, 12px)",background:"var(--dsw-alias-bg-base, #fff)",border:"0.5px solid var(--dsw-alias-border-l2, #eceff3)",boxShadow:"var(--dsw-elevation-prominent, 0 12px 32px -12px rgba(16,24,40,0.28))",display:"flex",flexDirection:"column",gap:12},dialogTitle:{fontSize:14,fontWeight:600},dialogInput:{height:34,border:"0.5px solid var(--dsw-alias-border-l4, #c4c9d0)",borderRadius:"var(--dsw-radius-md, 8px)",background:"var(--dsw-alias-bg-layer-3, #fff)",padding:"0 10px",font:"inherit",fontSize:13,color:"var(--dsw-alias-label-primary, #1f2937)",outline:"none"},dialogHint:{color:"var(--dsw-alias-label-tertiary, #9ca3af)",fontSize:11.5,lineHeight:"17px"},dialogActions:{display:"flex",justifyContent:"flex-end",gap:8},dialogButton:{height:30,padding:"0 12px",border:"0.5px solid var(--dsw-alias-border-l3, #e2e5ea)",borderRadius:"var(--dsw-radius-md, 8px)",background:"transparent",color:"var(--dsw-alias-label-secondary, #374151)",font:"inherit",fontSize:12.5,cursor:"pointer"},dialogButtonPrimary:{border:"none",background:"var(--dsw-alias-button-primary-fill, #4d6bfe)",color:"var(--dsw-alias-label-primary-foreground, #fff)",fontWeight:500},dialogButtonDanger:{border:"none",background:"var(--dsw-alias-state-error-primary, #d92d20)",color:"var(--dsw-alias-label-primary-foreground, #fff)",fontWeight:500},dropOverlay:{position:"absolute",inset:8,zIndex:30,border:"2px dashed var(--dsw-alias-state-business-primary, #4d6bfe)",borderRadius:"var(--dsw-radius-lg, 12px)",background:"color-mix(in srgb, var(--dsw-alias-state-business-primary, #4d6bfe) 6%, transparent)",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--dsw-alias-state-business-primary, #4d6bfe)",fontSize:13,fontWeight:500,pointerEvents:"none"},toast:{position:"fixed",left:"50%",bottom:64,transform:"translateX(-50%)",zIndex:60,padding:"9px 16px",borderRadius:"var(--dsw-radius-md, 8px)",background:"var(--dsw-alias-tooltip-bg, #101828)",color:"var(--dsw-alias-tooltip-label, #fff)",fontSize:12.5,boxShadow:"var(--dsw-elevation-prominent, 0 12px 32px -12px rgba(16,24,40,0.28))",maxWidth:420,lineHeight:"18px"}},Kv=null,jv=new Set;function Qv(){for(let i of[...jv])i()}function eb(i){Kv=i,Qv()}function tb(i){let e=(0,T.useMemo)(()=>{let s=i.ctx?.get?.("uiSession")?.adapter?.current?.getSnapshot?.().key;return typeof s=="string"&&s!==""?s:null},[i.ctx]),t=i.useSessions?.(n=>{let r=n?.byId;if(r===void 0)return null;for(let[o,a]of Object.entries(r))if((a.retainedBy?.mainView??0)>0)return o;return null});return e!==null?e:typeof t=="string"&&t!==""?t:null}function op(i){let e=Vv(),t=tb(i),[n,s]=(0,T.useState)("all"),[r,o]=(0,T.useState)(null),[a,l]=(0,T.useState)(""),[c,d]=(0,T.useState)("grid"),[u,h]=(0,T.useState)("updatedAt"),[f,g]=(0,T.useState)(null),[v,p]=(0,T.useState)(new Set),[m,A]=(0,T.useState)(null),[w,y]=(0,T.useState)(null),[M,b]=(0,T.useState)(null),[R,x]=(0,T.useState)(""),[C,L]=(0,T.useState)(!1),[D,k]=(0,T.useState)(null),[Z,J]=(0,T.useState)(!1),B=(0,T.useCallback)(N=>{k(N),window.setTimeout(()=>k(null),2600)},[]),Y=e?.folders??[],z=e?.docs??[],X=(0,T.useMemo)(()=>{let N=new Map;for(let P of Y){let be=P.parentId??null,ce=N.get(be)??[];ce.push(P),N.set(be,ce)}for(let P of N.values())P.sort((be,ce)=>be.name.localeCompare(ce.name,"zh-CN"));return N},[Y]),ne=(0,T.useMemo)(()=>{let N=new Map(Y.map(ce=>[ce.id,ce])),P=[],be=r;for(;be!==null;){let ce=N.get(be);if(ce===void 0)break;P.unshift(ce),be=ce.parentId}return P},[Y,r]),he=(0,T.useMemo)(()=>{let N=a.trim().toLowerCase(),be=[...z.filter(ce=>!((ce.folderId??null)!==r||n==="part"&&Li(ce)!=="part"||n==="assembly"&&Li(ce)!=="assembly"||n==="drawing"&&Li(ce)!=="drawing"||N!==""&&!ce.name.toLowerCase().includes(N)))];return u==="name"?be.sort((ce,E)=>ce.name.localeCompare(E.name,"zh-CN")):u==="size"?be.sort((ce,E)=>E.sizeBytes-ce.sizeBytes):be.sort((ce,E)=>E.updatedAt.localeCompare(ce.updatedAt)),be},[z,r,n,a,u]),de=(0,T.useMemo)(()=>{let N=a.trim().toLowerCase(),P=X.get(r)??[];return N===""?P:P.filter(be=>be.name.toLowerCase().includes(N))},[X,r,a]),Ae=(0,T.useMemo)(()=>z.find(N=>N.id===f)??null,[z,f]),Ze=(0,T.useMemo)(()=>{let N={part:0,assembly:0,drawing:0};for(let P of z){let be=Li(P);be==="part"?N.part+=1:be==="assembly"?N.assembly+=1:be==="drawing"&&(N.drawing+=1)}return N},[z]);(0,T.useEffect)(()=>{if(m===null)return;let N=be=>{let ce=be.target;ce!==null&&ce.closest?.('[data-space-menu="true"]')!==null||A(null)},P=be=>{be.key==="Escape"&&A(null)};return document.addEventListener("pointerdown",N,!0),document.addEventListener("keydown",P),()=>{document.removeEventListener("pointerdown",N,!0),document.removeEventListener("keydown",P)}},[m]);let Qe=(0,T.useCallback)(async(N,P)=>{L(!0);try{return await N(),P!==void 0&&B(P),!0}catch(be){return B(be instanceof Error?be.message:String(be)),!1}finally{L(!1)}},[B]),Je=(0,T.useCallback)((N,P)=>{y(N),b(P??null),x(P!==void 0&&"name"in P?P.name:"")},[]),Q=(0,T.useCallback)(async()=>{if(w===null||C)return;await Qe(async()=>{w==="new-doc"?await Gn("docs/create",{name:R.trim(),folderId:r}):w==="new-folder"?await Gn("folders/create",{name:R.trim(),parentId:r}):w==="rename-doc"&&M!==null&&"opCount"in M?await Gn("docs/rename",{id:M.id,name:R.trim()}):w==="rename-folder"&&M!==null&&!("opCount"in M)?await Gn("folders/rename",{id:M.id,name:R.trim()}):w==="delete-doc"&&M!==null?(await Gn("docs/delete",{ids:[M.id]}),f===M.id&&g(null)):w==="delete-folder"&&M!==null&&(await Gn("folders/delete",{id:M.id,mode:"cascade"}),r===M.id&&o(M.parentId??null))})&&(y(null),b(null))},[w,C,Qe,R,r,M,f]),fe=(0,T.useCallback)(async N=>{let P=await fetch("/dsh-cad/space/activate",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({id:N.id,sessionId:t??"_default"})}),be=await P.json().catch(()=>({}));if(!P.ok)throw new Error(typeof be.error=="string"?be.error:`HTTP ${P.status}`);await Ni()},[t]),ae=(0,T.useCallback)(async N=>{if(!await Qe(()=>fe(N),`\u5DF2\u5C06\u300C${N.name}\u300D\u8BBE\u4E3A\u5F53\u524D\u4F1A\u8BDD\u6587\u6863`))return;t===null&&i.ctx?.get?.("uiWorkspace")?.startSession?.();let be=i.ctx?.get?.("layout");try{be?.selectPanel?.(null)}catch{}},[fe,Qe,t,i.ctx]),Le=(0,T.useCallback)(async N=>{await Qe(()=>fe(N)),eb({docId:N.id,name:N.name,sceneUrl:N.partSceneUrl});let P=i.ctx?.get?.("layout");try{P?.selectPanel?.(null)}catch{}},[fe,Qe,i.ctx]),Ge=(0,T.useCallback)((N,P)=>{rp(N,P),B(`\u6B63\u5728\u5BFC\u51FA ${N.name}.${P}`)},[B]),ze=(0,T.useCallback)(async N=>{if(v.size===0)return;await Qe(async()=>{for(let be of v)await Gn("docs/move",{id:be,folderId:N})},`\u5DF2\u79FB\u52A8 ${v.size} \u4E2A\u6587\u6863`)&&p(new Set)},[v,Qe]),at=(0,T.useCallback)(async()=>{if(v.size===0)return;let N=new Set(v);await Qe(async()=>{await Gn("docs/delete",{ids:[...N]})},`\u5DF2\u5220\u9664 ${N.size} \u4E2A\u6587\u6863`)&&(p(new Set),f!==null&&N.has(f)&&g(null))},[v,Qe,f]),$e=(0,T.useCallback)(async N=>{N.preventDefault(),J(!1);let P=Array.from(N.dataTransfer?.files??[]);P.length!==0&&await Qe(async()=>{for(let be of P)await sp(be,r)},P.length===1?`\u5DF2\u5BFC\u5165 ${P[0].name}`:`\u5DF2\u5BFC\u5165 ${P.length} \u4E2A\u6587\u4EF6`)},[r,Qe]),ie=(0,T.useCallback)((N,P)=>(X.get(N)??[]).map(ce=>T.default.createElement(T.default.Fragment,{key:ce.id},T.default.createElement("button",{type:"button",style:{...O.folderRow,paddingLeft:8+P*14,...r===ce.id?O.railRowActive:{}},onClick:()=>{o(ce.id)},onContextMenu:E=>{E.preventDefault(),A({x:E.clientX,y:E.clientY,folder:ce})}},T.default.createElement(ql,null),T.default.createElement("span",{style:O.folderName},ce.name),T.default.createElement("span",{style:O.folderDots,role:"button",tabIndex:-1,onClick:E=>{E.stopPropagation(),A({x:E.clientX,y:E.clientY,folder:ce})}},T.default.createElement(qd,null))),ie(ce.id,P+1))),[X,r]),oe=(0,T.useCallback)((N,P,be)=>T.default.createElement("button",{type:"button",style:{...O.railRow,...n===N?O.railRowActive:{}},onClick:()=>{s(N)}},T.default.createElement("span",null,P),be!==void 0?T.default.createElement("span",{style:O.railCount},be):null),[n]),re=(0,T.useCallback)(N=>T.default.createElement("span",{style:O.statChip},N),[]),ge=(0,T.useCallback)(N=>T.default.createElement("span",{style:{...O.cardBadge,color:Wv[N]}},Gv[N]),[]),me=(0,T.useCallback)(N=>T.default.createElement("span",{style:O.cardIcon},N==="assembly"?T.default.createElement(jd,null):N==="drawing"?T.default.createElement(Qd,null):T.default.createElement(Kd,null)),[]),We=(0,T.useCallback)(N=>{let P=Li(N),be=f===N.id;return T.default.createElement("button",{key:N.id,type:"button",style:{...O.card,...be?O.cardActive:{}},onClick:()=>{g(N.id)},onDoubleClick:()=>{ae(N)},onContextMenu:ce=>{ce.preventDefault(),g(N.id),A({x:ce.clientX,y:ce.clientY,doc:N})}},T.default.createElement("span",{style:O.cardTop},me(P),T.default.createElement("span",{style:O.cardName},T.default.createElement("span",{style:O.cardTitle},N.name),T.default.createElement("span",{style:O.cardMeta},no(N.updatedAt)," \xB7 ",Jd(N.sizeBytes)))),T.default.createElement("span",{style:O.cardStats},N.bodyCount>0?re(`${N.bodyCount} \u4F53`):null,N.instanceCount>0?re(`${N.instanceCount} \u5B9E\u4F8B`):null,N.sketchCount>0?re(`${N.sketchCount} \u8349\u56FE`):null,N.drawingCount>0?re(`${N.drawingCount} \u56FE`):null),T.default.createElement("span",{style:O.cardFooter},ge(P),t!==null&&N.boundSessions.includes(t)?T.default.createElement("span",{style:O.cardBadge},"\xB7 \u5F53\u524D"):null,T.default.createElement("span",{style:O.cardMenu,role:"button",tabIndex:-1,onClick:ce=>{ce.stopPropagation(),A({x:ce.clientX,y:ce.clientY,doc:N})}},T.default.createElement(qd,null))))},[f,ae,me,re,ge,t]),Ne=(0,T.useCallback)(N=>{let P=Li(N),be=f===N.id;return T.default.createElement("tr",{key:N.id,style:{...O.listRow,...be?O.listRowActive:{}},onClick:()=>{g(N.id)},onDoubleClick:()=>{ae(N)},onContextMenu:ce=>{ce.preventDefault(),g(N.id),A({x:ce.clientX,y:ce.clientY,doc:N})}},T.default.createElement("td",{style:O.listCell},T.default.createElement("input",{type:"checkbox",style:O.checkbox,checked:v.has(N.id),onChange:ce=>{let E=new Set(v);ce.target.checked?E.add(N.id):E.delete(N.id),p(E)},onClick:ce=>ce.stopPropagation()})),T.default.createElement("td",{style:O.listCell},T.default.createElement("span",{style:O.listName},me(P),T.default.createElement("span",{style:O.listNameText},N.name),ge(P),t!==null&&N.boundSessions.includes(t)?T.default.createElement("span",{style:O.cardBadge},"\xB7 \u5F53\u524D"):null)),T.default.createElement("td",{style:{...O.listCell,...O.listMeta}},N.folderPath),T.default.createElement("td",{style:{...O.listCell,...O.listMeta}},N.bodyCount>0?`${N.bodyCount} \u4F53`:"\u2014",N.instanceCount>0?` \xB7 ${N.instanceCount} \u5B9E\u4F8B`:"",N.drawingCount>0?` \xB7 ${N.drawingCount} \u56FE`:""),T.default.createElement("td",{style:{...O.listCell,...O.listMeta}},Jd(N.sizeBytes)),T.default.createElement("td",{style:{...O.listCell,...O.listMeta}},no(N.updatedAt)),T.default.createElement("td",{style:O.listCell},T.default.createElement("span",{style:O.cardMenu,role:"button",tabIndex:-1,onClick:ce=>{ce.stopPropagation(),A({x:ce.clientX,y:ce.clientY,doc:N})}},T.default.createElement(qd,null))))},[v,f,ae,me,ge,t]),qe=[];if(m?.doc!==void 0){let N=m.doc;qe.push(T.default.createElement("button",{key:"open",type:"button",style:O.menuItem,onClick:()=>{A(null),ae(N)}},T.default.createElement("span",null,"\u5728\u5BF9\u8BDD\u4E2D\u6253\u5F00"),T.default.createElement("span",{style:O.menuHint},"\u8BBE\u4E3A\u5F53\u524D\u6587\u6863")),T.default.createElement("button",{key:"pane",type:"button",style:O.menuItem,onClick:()=>{A(null),Le(N)}},T.default.createElement("span",null,"\u5728\u53F3\u4FA7 CAD \u9762\u677F\u9884\u89C8")),T.default.createElement("button",{key:"rename",type:"button",style:O.menuItem,onClick:()=>{A(null),Je("rename-doc",N)}},T.default.createElement("span",null,"\u91CD\u547D\u540D")),T.default.createElement("button",{key:"duplicate",type:"button",style:O.menuItem,onClick:()=>{A(null),Qe(()=>Gn("docs/duplicate",{id:N.id}),"\u5DF2\u521B\u5EFA\u526F\u672C")}},T.default.createElement("span",null,"\u521B\u5EFA\u526F\u672C")),T.default.createElement("button",{key:"export-dcprt",type:"button",style:O.menuItem,onClick:()=>{A(null),Ge(N,"dcprt")}},T.default.createElement("span",null,"\u5BFC\u51FA .dcprt"),T.default.createElement("span",{style:O.menuHint},"\u53EF\u518D\u7F16\u8F91")),T.default.createElement("button",{key:"export-step",type:"button",style:O.menuItem,onClick:()=>{A(null),Ge(N,"step")}},T.default.createElement("span",null,"\u5BFC\u51FA .step")),T.default.createElement("button",{key:"export-stl",type:"button",style:O.menuItem,onClick:()=>{A(null),Ge(N,"stl")}},T.default.createElement("span",null,"\u5BFC\u51FA .stl")),T.default.createElement("button",{key:"export-svg",type:"button",style:O.menuItem,onClick:()=>{A(null),Ge(N,"svg")}},T.default.createElement("span",null,"\u5BFC\u51FA .svg")),T.default.createElement("button",{key:"export-dxf",type:"button",style:O.menuItem,onClick:()=>{A(null),Ge(N,"dxf")}},T.default.createElement("span",null,"\u5BFC\u51FA .dxf")),T.default.createElement("button",{key:"delete",type:"button",style:{...O.menuItem,...O.menuItemDanger},onClick:()=>{A(null),Je("delete-doc",N)}},T.default.createElement("span",null,"\u5220\u9664")))}if(m?.folder!==void 0){let N=m.folder;qe.push(T.default.createElement("button",{key:"fdoc",type:"button",style:O.menuItem,onClick:()=>{A(null),o(N.id),Je("new-doc")}},T.default.createElement("span",null,"\u5728\u6B64\u65B0\u5EFA\u6587\u6863")),T.default.createElement("button",{key:"fnew",type:"button",style:O.menuItem,onClick:()=>{A(null),o(N.id),Je("new-folder")}},T.default.createElement("span",null,"\u5728\u6B64\u65B0\u5EFA\u6587\u4EF6\u5939")),T.default.createElement("button",{key:"frename",type:"button",style:O.menuItem,onClick:()=>{A(null),Je("rename-folder",N)}},T.default.createElement("span",null,"\u91CD\u547D\u540D")),T.default.createElement("button",{key:"fdelete",type:"button",style:{...O.menuItem,...O.menuItemDanger},onClick:()=>{A(null),Je("delete-folder",N)}},T.default.createElement("span",null,"\u5220\u9664\u6587\u4EF6\u5939"),T.default.createElement("span",{style:O.menuHint},"\u542B\u5B50\u5185\u5BB9")))}return T.default.createElement("div",{style:O.page,"data-cad-space":""},T.default.createElement("aside",{style:O.rail},T.default.createElement("div",{style:O.railTitle},T.default.createElement(th,{size:17}),"CAD \u7A7A\u95F4"),T.default.createElement("button",{type:"button",style:O.railPrimary,onClick:()=>Je("new-doc")},"\uFF0B \u65B0\u5EFA\u6A21\u6587\u6863"),T.default.createElement("button",{type:"button",style:O.railAction,onClick:()=>Je("new-folder")},"\uFF0B \u65B0\u5EFA\u6587\u4EF6\u5939"),T.default.createElement("button",{type:"button",style:O.railAction,onClick:()=>{let N=document.createElement("input");N.type="file",N.accept=".stl,.obj,.step,.stp,.iges,.igs,.brep,.dcprt",N.multiple=!0,N.onchange=()=>{let P=Array.from(N.files??[]);P.length!==0&&Qe(async()=>{for(let be of P)await sp(be,r)},`\u5DF2\u5BFC\u5165 ${P.length} \u4E2A\u6587\u4EF6`)},N.click()}},"\u2B06 \u5BFC\u5165 CAD \u6587\u4EF6"),oe("all","\u5168\u90E8\u6587\u4EF6",z.length),oe("part","\u96F6\u4EF6",Ze.part),oe("assembly","\u88C5\u914D\u4F53",Ze.assembly),oe("drawing","\u5DE5\u7A0B\u56FE",Ze.drawing),T.default.createElement("div",{style:O.railSection},"\u6587\u4EF6\u5939"),T.default.createElement("button",{type:"button",style:{...O.folderRow,...r===null?O.railRowActive:{}},onClick:()=>{o(null)}},T.default.createElement(ql,null),T.default.createElement("span",{style:O.folderName},"\u5168\u90E8\u6587\u4EF6")),ie(null,1),T.default.createElement("div",{style:O.railFoot},z.length," \u6587\u6863 \xB7 ",Y.length," \u6587\u4EF6\u5939",T.default.createElement("br",null),Ze.part," \u96F6\u4EF6 \xB7 ",Ze.assembly," \u88C5\u914D \xB7 ",Ze.drawing," \u5DE5\u7A0B\u56FE")),T.default.createElement("div",{style:O.main},T.default.createElement("div",{style:O.header},T.default.createElement("span",{style:O.headerTitle},"CAD \u7A7A\u95F4"),T.default.createElement("span",{style:O.headerSub},t!==null?"\u5DE5\u4F5C\u533A\u5EFA\u6A21\u6587\u6863 \xB7 \u53CC\u51FB\u5728\u5F53\u524D\u4F1A\u8BDD\u4E2D\u6253\u5F00\uFF0C\u53F3\u952E\u6709\u5B8C\u6574\u64CD\u4F5C":"\u5F53\u524D\u6CA1\u6709\u6D3B\u52A8\u4F1A\u8BDD \xB7 \u6253\u5F00\u6587\u6863\u4F1A\u5148\u65B0\u5EFA\u4E00\u4E2A\u4F1A\u8BDD"),T.default.createElement("button",{type:"button",style:O.headerButton,onClick:()=>Je("new-folder")},"\u65B0\u5EFA\u6587\u4EF6\u5939"),T.default.createElement("button",{type:"button",style:O.headerPrimary,onClick:()=>Je("new-doc")},"\u65B0\u5EFA\u6A21\u6587\u6863")),T.default.createElement("div",{style:O.toolbar},T.default.createElement("div",{style:O.breadcrumb},T.default.createElement("button",{type:"button",style:{...O.crumb,...r===null?O.crumbActive:{}},onClick:()=>o(null)},"\u5168\u90E8\u6587\u4EF6"),ne.map(N=>T.default.createElement(T.default.Fragment,{key:N.id},T.default.createElement(Zv,null),T.default.createElement("button",{type:"button",style:{...O.crumb,...r===N.id?O.crumbActive:{}},onClick:()=>o(N.id)},N.name)))),T.default.createElement("span",{style:O.searchBox},T.default.createElement(qv,null),T.default.createElement("input",{style:O.searchInput,value:a,placeholder:"\u641C\u7D22\u6587\u6863\u2026",onChange:N=>l(N.target.value)})),T.default.createElement("button",{type:"button",style:{...O.toolButton,...u==="updatedAt"?O.toolButtonActive:{}},title:"\u6309\u66F4\u65B0\u65F6\u95F4\u6392\u5E8F",onClick:()=>h("updatedAt")},"\u65F6\u95F4"),T.default.createElement("button",{type:"button",style:{...O.toolButton,...u==="name"?O.toolButtonActive:{}},title:"\u6309\u540D\u79F0\u6392\u5E8F",onClick:()=>h("name")},"\u540D"),T.default.createElement("button",{type:"button",style:{...O.toolButton,...u==="size"?O.toolButtonActive:{}},title:"\u6309\u5927\u5C0F\u6392\u5E8F",onClick:()=>h("size")},"\u5927\u5C0F"),T.default.createElement("button",{type:"button",style:{...O.toolButton,...c==="grid"?O.toolButtonActive:{}},title:"\u7F51\u683C\u89C6\u56FE",onClick:()=>d("grid")},T.default.createElement(Yv,null)),T.default.createElement("button",{type:"button",style:{...O.toolButton,...c==="list"?O.toolButtonActive:{}},title:"\u5217\u8868\u89C6\u56FE",onClick:()=>d("list")},T.default.createElement($v,null))),T.default.createElement("div",{style:O.scroll,onDragOver:N=>{N.preventDefault(),J(!0)},onDragLeave:N=>{N.currentTarget===N.target&&J(!1)},onDrop:N=>{$e(N)}},Z?T.default.createElement("div",{style:O.dropOverlay},"\u677E\u5F00\u4EE5\u5BFC\u5165\u5230\u300C",ne.at(-1)?.name??"\u5168\u90E8\u6587\u4EF6","\u300D"):null,de.length===0&&he.length===0?T.default.createElement("div",{style:{...O.empty,paddingTop:80}},T.default.createElement("div",{style:O.emptyTitle},a!==""?"\u6CA1\u6709\u5339\u914D\u7684\u6587\u6863":"\u8FD9\u91CC\u8FD8\u662F\u7A7A\u7684"),T.default.createElement("div",{style:O.emptyHint},a!==""?"\u8BD5\u8BD5\u5176\u4ED6\u5173\u952E\u8BCD\uFF0C\u6216\u5207\u6362\u5230\u5176\u4ED6\u6587\u4EF6\u5939\u3002":"\u5728\u5BF9\u8BDD\u4E2D\u8BA9 AI \u5EFA\u6A21\uFF0C\u6216\u5728\u5DE6\u680F\u5BFC\u5165 .dcprt / .step / .stl \u6587\u4EF6\uFF0C\u4E5F\u53EF\u4EE5\u76F4\u63A5\u628A\u6587\u4EF6\u62D6\u8FDB\u6765\u3002")):c==="grid"?T.default.createElement(T.default.Fragment,null,de.length>0?T.default.createElement("div",{style:{...O.grid,marginBottom:12}},de.map(N=>T.default.createElement("button",{key:N.id,type:"button",style:O.card,onClick:()=>o(N.id),onContextMenu:P=>{P.preventDefault(),A({x:P.clientX,y:P.clientY,folder:N})}},T.default.createElement("span",{style:O.cardTop},T.default.createElement("span",{style:O.cardIcon},T.default.createElement(ql,null)),T.default.createElement("span",{style:O.cardName},T.default.createElement("span",{style:O.cardTitle},N.name),T.default.createElement("span",{style:O.cardMeta},no(N.updatedAt))))))):null,he.length>0?T.default.createElement("div",{style:O.grid},he.map(N=>We(N))):null):T.default.createElement("table",{style:O.listTable},T.default.createElement("thead",null,T.default.createElement("tr",null,T.default.createElement("th",{style:{...O.listHead,width:32}}),T.default.createElement("th",{style:O.listHead},"\u540D\u79F0"),T.default.createElement("th",{style:O.listHead},"\u4F4D\u7F6E"),T.default.createElement("th",{style:O.listHead},"\u5185\u5BB9"),T.default.createElement("th",{style:O.listHead},"\u5927\u5C0F"),T.default.createElement("th",{style:O.listHead},"\u66F4\u65B0"),T.default.createElement("th",{style:{...O.listHead,width:32}}))),T.default.createElement("tbody",null,de.map(N=>T.default.createElement("tr",{key:N.id,style:O.listRow,onClick:()=>o(N.id),onContextMenu:P=>{P.preventDefault(),A({x:P.clientX,y:P.clientY,folder:N})}},T.default.createElement("td",{style:O.listCell}),T.default.createElement("td",{style:O.listCell},T.default.createElement("span",{style:O.listName},T.default.createElement("span",{style:O.cardIcon},T.default.createElement(ql,null)),T.default.createElement("span",{style:O.listNameText},N.name),T.default.createElement("span",{style:O.cardBadge},"\u6587\u4EF6\u5939"))),T.default.createElement("td",{style:{...O.listCell,...O.listMeta}},Xv(N,Y)),T.default.createElement("td",{style:{...O.listCell,...O.listMeta}},"\u2014"),T.default.createElement("td",{style:{...O.listCell,...O.listMeta}},"\u2014"),T.default.createElement("td",{style:{...O.listCell,...O.listMeta}},no(N.updatedAt)),T.default.createElement("td",{style:O.listCell}))),he.map(N=>Ne(N)))),v.size>0?T.default.createElement("div",{style:O.batchBar,"data-space-batch":""},T.default.createElement("span",{style:O.listMeta},"\u5DF2\u9009 ",v.size," \u9879"),T.default.createElement("button",{type:"button",style:O.batchButton,onClick:()=>{ze(r)}},"\u79FB\u5230\u6B64\u6587\u4EF6\u5939"),T.default.createElement("button",{type:"button",style:O.batchButton,onClick:()=>{ze(null)}},"\u79FB\u5230\u6839\u76EE\u5F55"),T.default.createElement("button",{type:"button",style:{...O.batchButton,...O.batchButtonDanger},onClick:()=>{at()}},"\u5220\u9664"),T.default.createElement("button",{type:"button",style:O.batchButton,onClick:()=>p(new Set)},"\u53D6\u6D88\u9009\u62E9")):null)),Ae!==null?T.default.createElement(nb,{doc:Ae,onClose:()=>g(null),onOpenConversation:ae,onOpenCadPane:Le,notify:B}):null,m!==null?T.default.createElement("div",{style:{...O.menu,left:Math.min(m.x,window.innerWidth-210),top:Math.min(m.y,window.innerHeight-340)},"data-space-menu":"true"},qe):null,w!==null?T.default.createElement("div",{style:O.dialogOverlay,onPointerDown:N=>{N.target===N.currentTarget&&y(null)}},T.default.createElement("div",{style:O.dialog},T.default.createElement("div",{style:O.dialogTitle},w==="new-doc"?"\u65B0\u5EFA\u5EFA\u6A21\u6587\u6863":w==="new-folder"?"\u65B0\u5EFA\u6587\u4EF6\u5939":w==="rename-doc"?"\u91CD\u547D\u540D\u6587\u6863":w==="rename-folder"?"\u91CD\u547D\u540D\u6587\u4EF6\u5939":w==="delete-doc"?"\u5220\u9664\u6587\u6863":"\u5220\u9664\u6587\u4EF6\u5939"),w==="delete-doc"||w==="delete-folder"?T.default.createElement(T.default.Fragment,null,T.default.createElement("div",{style:O.dialogHint},w==="delete-doc"?`\u786E\u5B9A\u5220\u9664\u300C${M!==null&&"name"in M?M.name:""}\u300D\uFF1F\u8BE5\u64CD\u4F5C\u4E0D\u53EF\u64A4\u9500\u3002`:`\u786E\u5B9A\u5220\u9664\u6587\u4EF6\u5939\u300C${M!==null&&"name"in M?M.name:""}\u300D\u53CA\u5176\u4E2D\u7684\u5168\u90E8\u6587\u6863\u4E0E\u5B50\u6587\u4EF6\u5939\uFF1F\u8BE5\u64CD\u4F5C\u4E0D\u53EF\u64A4\u9500\u3002`),T.default.createElement("div",{style:O.dialogActions},T.default.createElement("button",{type:"button",style:O.dialogButton,onClick:()=>y(null)},"\u53D6\u6D88"),T.default.createElement("button",{type:"button",style:{...O.dialogButton,...O.dialogButtonDanger},disabled:C,onClick:()=>{Q()}},"\u5220\u9664"))):T.default.createElement(T.default.Fragment,null,T.default.createElement("input",{style:O.dialogInput,value:R,autoFocus:!0,placeholder:w==="new-doc"?"\u6587\u6863\u540D\u79F0\uFF08\u7559\u7A7A\u81EA\u52A8\u547D\u540D\uFF09":"\u6587\u4EF6\u5939\u540D\u79F0\uFF08\u7559\u7A7A\u81EA\u52A8\u547D\u540D\uFF09",onChange:N=>x(N.target.value),onKeyDown:N=>{N.key==="Enter"&&Q()}}),w==="new-doc"?T.default.createElement("div",{style:O.dialogHint},"\u65B0\u5EFA\u540E\u53EF\u5728\u53F3\u4FA7 CAD \u9762\u677F\u6216\u5BF9\u8BDD\u91CC\u7EE7\u7EED\u5EFA\u6A21\u3002"):null,T.default.createElement("div",{style:O.dialogActions},T.default.createElement("button",{type:"button",style:O.dialogButton,onClick:()=>y(null)},"\u53D6\u6D88"),T.default.createElement("button",{type:"button",style:{...O.dialogButton,...O.dialogButtonPrimary},disabled:C,onClick:()=>{Q()}},"\u786E\u5B9A"))))):null,D!==null?T.default.createElement("div",{style:O.toast},D):null)}function Yd(i){let[e,t]=(0,T.useState)(null),[n,s]=(0,T.useState)(null);return(0,T.useEffect)(()=>{if(i===void 0){t(null),s(null);return}let r=!1;s(null);let o=i.includes("/dsh-cad/bin/");return fetch(i).then(async a=>{if(!a.ok)throw new Error(`scene fetch failed: HTTP ${a.status}`);if(o){let l=await a.arrayBuffer(),c=new DataView(l);if(c.getUint32(0,!0)!==826426180)throw new Error("bad scene magic");let u=c.getUint32(4,!0),h=new TextDecoder().decode(new Uint8Array(l,8,u)).replace(/\u0000+$/,""),f=JSON.parse(h),g=8+u;return{kind:"3d",format:"model",meshes:f.meshes.map(p=>({name:p.name,...p.color===void 0?{}:{color:p.color},...p.mode===void 0?{}:{mode:p.mode},positions:new Float32Array(l,g+p.posOffset,p.posBytes/4),...p.nrmOffset===void 0?{}:{normals:new Float32Array(l,g+p.nrmOffset,(p.nrmBytes??0)/4)},indices:new Uint32Array(l,g+p.idxOffset,p.idxBytes/4),vertexCount:p.vertexCount,triangleCount:p.triangleCount})),bounds:{min:{x:f.bounds.min[0],y:f.bounds.min[1],z:f.bounds.min[2]},max:{x:f.bounds.max[0],y:f.bounds.max[1],z:f.bounds.max[2]}},units:f.units}}return await a.json()}).then(a=>{r||t(a)}).catch(a=>{r||s(a instanceof Error?a.message:String(a))}),()=>{r=!0}},[i]),{scene:e,error:n}}function nb({doc:i,onClose:e,onOpenConversation:t,onOpenCadPane:n,notify:s}){let r=Pi(),[o,a]=(0,T.useState)(i.instanceCount>0?"assembly":"part"),[l,c]=(0,T.useState)(!1),d=(0,T.useCallback)(async()=>{if(!(i.partSceneUrl!==void 0||i.opCount===0)){c(!0);try{await Gn("preview",{id:i.id})}catch(m){s(m instanceof Error?m.message:String(m))}finally{c(!1)}}},[i.id,i.opCount,i.partSceneUrl,s]);(0,T.useEffect)(()=>{d()},[d]);let u=Yd(i.partSceneUrl),h=Yd(i.assemblySceneUrl),f=Yd(i.drawingSceneUrl),g=o==="part"?u:o==="assembly"?h:f,v=o==="part"?i.partSceneUrl:o==="assembly"?i.assemblySceneUrl:i.drawingSceneUrl,p=(0,T.useCallback)((m,A)=>T.default.createElement("div",{style:O.factRow},T.default.createElement("span",{style:O.factKey},m),T.default.createElement("span",{style:O.factValue},A)),[]);return T.default.createElement("aside",{style:O.drawer,"data-cad-space-drawer":""},T.default.createElement("div",{style:O.drawerHead},T.default.createElement("span",{style:{...O.cardIcon,width:28,height:28}},Li(i)==="assembly"?T.default.createElement(jd,null):Li(i)==="drawing"?T.default.createElement(Qd,null):T.default.createElement(Kd,null)),T.default.createElement("span",{style:O.drawerTitle},i.name),T.default.createElement("button",{type:"button",style:O.drawerIconBtn,onClick:e,"aria-label":"\u5173\u95ED\u9884\u89C8",title:"\u5173\u95ED\u9884\u89C8"},T.default.createElement(Jv,null))),T.default.createElement("div",{style:O.previewPane},T.default.createElement("div",{style:O.drawerTabs},T.default.createElement("button",{type:"button",style:{...O.drawerTab,...o==="part"?O.drawerTabActive:{}},onClick:()=>a("part")},T.default.createElement(Kd,null)," \u96F6\u4EF6"),T.default.createElement("button",{type:"button",style:{...O.drawerTab,...o==="assembly"?O.drawerTabActive:{},...i.instanceCount===0?{opacity:.4,cursor:"default"}:{}},onClick:()=>{i.instanceCount>0&&a("assembly")}},T.default.createElement(jd,null)," \u88C5\u914D"),T.default.createElement("button",{type:"button",style:{...O.drawerTab,...o==="drawing"?O.drawerTabActive:{},...i.drawingCount===0?{opacity:.4,cursor:"default"}:{}},onClick:()=>{i.drawingCount>0&&a("drawing")}},T.default.createElement(Qd,null)," \u5DE5\u7A0B\u56FE")),T.default.createElement("div",{style:{...O.previewStage,background:Ki(r)}},v===void 0?T.default.createElement("div",{style:{...O.empty,flex:"1 1 auto"}},T.default.createElement("div",{style:O.emptyTitle},l?"\u6B63\u5728\u751F\u6210\u9884\u89C8\u2026":"\u6682\u65E0\u6B64\u89C6\u56FE"),T.default.createElement("div",{style:O.emptyHint},i.opCount===0?"\u8FD9\u662F\u4E00\u4E2A\u7A7A\u6587\u6863\uFF0C\u5EFA\u6A21\u540E\u5373\u53EF\u9884\u89C8\u3002":l?"\u6B63\u5728\u91CD\u653E\u5EFA\u6A21\u5386\u53F2\u5E76\u751F\u6210\u7F51\u683C\u2026":"\u8BE5\u6587\u6863\u8FD8\u6CA1\u6709\u751F\u6210\u8FD9\u79CD\u89C6\u56FE\uFF1B\u53EF\u4EE5\u5BFC\u51FA .svg/.dxf \u6216\u5728\u5BF9\u8BDD\u91CC\u8BA9 AI \u751F\u6210\u5DE5\u7A0B\u56FE\u3002")):T.default.createElement("div",{style:O.previewFill},T.default.createElement(Di,{scene:g.scene,error:g.error,fill:!0})))),T.default.createElement("div",{style:O.drawerFacts},p("\u4F4D\u7F6E",i.folderPath),p("\u5EFA\u6A21\u6B65\u6570",String(i.opCount)),p("\u4F53 / \u5B9E\u4F8B / \u8349\u56FE",`${i.bodyCount} / ${i.instanceCount} / ${i.sketchCount}`),p("\u5DE5\u7A0B\u56FE",i.drawingCount>0?`${i.drawingCount} \u5F20`:"\u672A\u751F\u6210"),p("\u6587\u4EF6\u5927\u5C0F",Jd(i.sizeBytes)),p("\u66F4\u65B0\u65F6\u95F4",no(i.updatedAt)),p("\u5173\u8054\u4F1A\u8BDD",i.boundSessions.length>0?`${i.boundSessions.length} \u4E2A`:"\u65E0")),T.default.createElement("div",{style:O.drawerActions},T.default.createElement("button",{type:"button",style:O.drawerPrimary,onClick:()=>{t(i)}},"\u5728\u5BF9\u8BDD\u4E2D\u6253\u5F00\uFF08\u8BBE\u4E3A\u5F53\u524D\u6587\u6863\uFF09"),T.default.createElement("button",{type:"button",style:O.drawerSecondary,onClick:()=>{n(i)}},"\u5728\u53F3\u4FA7 CAD \u9762\u677F\u9884\u89C8"),T.default.createElement("div",{style:O.exportRow},T.default.createElement("span",{style:O.factKey},"\u5BFC\u51FA"),["dcprt","step","stl","svg","dxf"].map(m=>T.default.createElement("button",{key:m,type:"button",style:O.exportChip,onClick:()=>rp(i,m)},".",m)))))}function ib(i){let e={part:void 0,assembly:void 0,drawing:void 0},t=i?.nodes??[];for(let n=t.length-1;n>=0;n--){let s=t[n];if(s===void 0)continue;let r=s.meta;if(s.kind==="tool-result"&&typeof r?.viewId=="string"&&(r.kind==="3d"||r.kind==="2d")){let o=r.doc??"part";e[o]===void 0&&(e[o]=r)}}return e}var sb=()=>()=>{},nh={part:void 0,assembly:void 0,drawing:void 0},Zs=nh;function rb(i,e){let t=i?.(l=>l.current),n=(0,q.useMemo)(()=>{if(!(e===void 0||t===void 0))return e.binding?.(t)?.session},[e,t]),s=(0,q.useMemo)(()=>n===void 0?sb:l=>n.subscribe(l),[n]),r=(0,q.useMemo)(()=>n===void 0?()=>nh:()=>{let l=ib(n.getSnapshot());return Zs!==nh&&Zs.part===l.part&&Zs.assembly===l.assembly&&Zs.drawing===l.drawing?Zs:(Zs=l,l)},[n]),o=(0,q.useSyncExternalStore)(s,r),[,a]=(0,q.useReducer)(l=>l+1,0);return(0,q.useEffect)(()=>qf(()=>{a()}),[]),e!==void 0?{part:o.part??null,assembly:o.assembly??Xs("assembly")?.meta??null,drawing:o.drawing??Xs("drawing")?.meta??null}:{part:Xs("part")?.meta??null,assembly:Xs("assembly")?.meta??null,drawing:Xs("drawing")?.meta??null}}var ap={part:"Part Studio",assembly:"\u88C5\u914D\u4F53",drawing:"\u5DE5\u7A0B\u56FE"},Wn=[{id:"part"}],Js="part",ih={tabs:Wn,active:Js},sh=new Set;function ah(){ih={tabs:Wn,active:Js};for(let i of sh)i()}function rh(i){Wn.some(e=>e.id===i)||(Wn=[...Wn,{id:i}]),Js=i,ah()}function ob(i){let e=Wn.findIndex(t=>t.id===i);e!==-1&&(Wn=Wn.filter(t=>t.id!==i),Js===i&&(Js=(Wn[e-1]??Wn[e])?.id??null),ah())}function lp(i){Js=i,ah()}function ab(){return(0,q.useSyncExternalStore)(i=>(sh.add(i),()=>{sh.delete(i)}),()=>ih,()=>ih)}var cp=null,ro=cp,oh=new Set;function so(i){cp=i,ro=i;for(let e of oh)e()}function lb(){return(0,q.useSyncExternalStore)(i=>(oh.add(i),()=>{oh.delete(i)}),()=>ro,()=>ro)}var ii="currentColor";function cb(){return q.default.createElement("svg",{width:"13",height:"13",viewBox:"0 0 16 16",fill:"none","aria-hidden":!0},q.default.createElement("path",{d:"M8 1.5 14 5v6L8 14.5 2 11V5l6-3.5Z",stroke:ii,strokeWidth:"1.3",strokeLinejoin:"round"}),q.default.createElement("path",{d:"M2 5l6 3.5L14 5M8 8.5v6",stroke:ii,strokeWidth:"1.3",strokeLinejoin:"round"}))}function dp(){return q.default.createElement("svg",{width:"13",height:"13",viewBox:"0 0 16 16",fill:"none","aria-hidden":!0},q.default.createElement("path",{d:"M5.5 1.5 10 4v4L5.5 10.5 1 8V4l4.5-2.5Z",stroke:ii,strokeWidth:"1.2",strokeLinejoin:"round",opacity:"0.75"}),q.default.createElement("path",{d:"M10.5 5.5 15 8v4l-4.5 2.5L6 12V8l4.5-2.5Z",stroke:ii,strokeWidth:"1.2",strokeLinejoin:"round"}))}function hp(){return q.default.createElement("svg",{width:"13",height:"13",viewBox:"0 0 16 16",fill:"none","aria-hidden":!0},q.default.createElement("path",{d:"M3 1.5h7l3 3V14.5H3V1.5Z",stroke:ii,strokeWidth:"1.3",strokeLinejoin:"round"}),q.default.createElement("path",{d:"M5.5 7h5M5.5 9.5h5M5.5 12h3",stroke:ii,strokeWidth:"1.2",strokeLinecap:"round"}))}function up({kind:i}){return i==="assembly"?q.default.createElement(dp,null):i==="drawing"?q.default.createElement(hp,null):q.default.createElement(cb,null)}function db(){return q.default.createElement("svg",{width:"13",height:"13",viewBox:"0 0 16 16",fill:"none","aria-hidden":!0},q.default.createElement("path",{d:"M1.5 4.5A1 1 0 0 1 2.5 3.5h3.2l1.4 1.8h6.4a1 1 0 0 1 1 1v6.2a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1V4.5Z",stroke:ii,strokeWidth:"1.3",strokeLinejoin:"round"}))}function hb(){return q.default.createElement("svg",{width:"13",height:"13",viewBox:"0 0 16 16",fill:"none","aria-hidden":!0},q.default.createElement("path",{d:"M4 1.5h5l3 3v10H4v-13Z",stroke:ii,strokeWidth:"1.2",strokeLinejoin:"round"}),q.default.createElement("path",{d:"M9 1.5v3h3",stroke:ii,strokeWidth:"1.2",strokeLinejoin:"round"}))}var ub=[{kind:"part",label:"\u96F6\u4EF6",hint:"Part Studio \xB7 \u4E09\u7EF4\u5EFA\u6A21"},{kind:"assembly",label:"\u88C5\u914D\u4F53",hint:"Assembly \xB7 \u5B9E\u4F8B\u88C5\u914D"},{kind:"drawing",label:"\u5DE5\u7A0B\u56FE",hint:"Drawing \xB7 \u56FE\u7EB8\u8F93\u51FA"}];function fb({onPick:i,onClose:e}){let t=(0,q.useRef)(null);return(0,q.useEffect)(()=>{let n=r=>{t.current!==null&&r.target instanceof Node&&t.current.contains(r.target)||e()},s=r=>{r.key==="Escape"&&e()};return document.addEventListener("pointerdown",n,!0),document.addEventListener("keydown",s),()=>{document.removeEventListener("pointerdown",n,!0),document.removeEventListener("keydown",s)}},[e]),q.default.createElement("div",{ref:t,style:Ie.menu,role:"menu","aria-label":"\u65B0\u5EFA\u6587\u6863"},ub.map(n=>q.default.createElement("button",{key:n.kind,type:"button",role:"menuitem",style:Ie.menuItem,onClick:()=>{i(n.kind)}},q.default.createElement("span",{style:Ie.menuIcon},q.default.createElement(up,{kind:n.kind})),q.default.createElement("span",{style:Ie.menuLabel},n.label),q.default.createElement("span",{style:Ie.menuHint},n.hint))))}function pb(i){let e=Date.now()-Date.parse(i);if(!Number.isFinite(e))return"";let t=Math.floor(e/6e4);if(t<1)return"\u521A\u521A";if(t<60)return`${t} \u5206\u949F\u524D`;let n=Math.floor(t/60);return n<24?`${n} \u5C0F\u65F6\u524D`:`${Math.floor(n/24)} \u5929\u524D`}function mb({activeDocId:i,onClose:e}){let t=(0,q.useRef)(null),[n,s]=(0,q.useState)(null),[r,o]=(0,q.useState)(null),[a,l]=(0,q.useState)(null),[c,d]=(0,q.useState)(null),[u,h]=(0,q.useState)(""),[f,g]=(0,q.useState)(null),[v,p]=(0,q.useState)("");(0,q.useEffect)(()=>{let b=x=>{t.current!==null&&x.target instanceof Node&&t.current.contains(x.target)||e()},R=x=>{x.key==="Escape"&&e()};return document.addEventListener("pointerdown",b,!0),document.addEventListener("keydown",R),()=>{document.removeEventListener("pointerdown",b,!0),document.removeEventListener("keydown",R)}},[e]);let m=(0,q.useCallback)(()=>{s(null),o(null),fetch("/dsh-cad/docs").then(b=>b.ok?b.json():Promise.reject(new Error(`HTTP ${b.status}`))).then(b=>{s(b.docs??[])}).catch(b=>{o(b instanceof Error?b.message:String(b))})},[]);(0,q.useEffect)(()=>{m()},[m]);let A=b=>{d(b),fetch(`/dsh-cad/docs/delete?id=${encodeURIComponent(b)}`,{method:"POST"}).then(()=>{l(null),ro?.docId===b&&so(null),m()}).catch(R=>{o(R instanceof Error?R.message:String(R))}).finally(()=>{d(null)})},w=(b,R)=>{d(b),fetch("/dsh-cad/space/activate",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({id:b,sessionId:"_default"})}).then(x=>{if(!x.ok)return x.json().then(C=>{throw new Error(C.error??`HTTP ${x.status}`)});Ni(),so({docId:b,name:R,sceneUrl:`/dsh-cad/bin/${b}`}),rh("part"),e()}).catch(x=>{o(x instanceof Error?x.message:String(x))}).finally(()=>{d(null)})},y=(b,R)=>{d(b),fetch("/dsh-cad/space/docs/rename",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({id:b,name:R})}).then(x=>{if(!x.ok)return x.json().then(C=>{throw new Error(C.error??`HTTP ${x.status}`)});Ni(),g(null),m()}).catch(x=>{o(x instanceof Error?x.message:String(x))}).finally(()=>{d(null)})},M=n?.filter(b=>u.trim()===""||b.name.toLowerCase().includes(u.trim().toLowerCase()));return q.default.createElement("div",{ref:t,style:Ie.menu,role:"menu","aria-label":"\u6587\u6863\u5217\u8868"},q.default.createElement("div",{style:Ie.docsHeader},"\u5DE5\u4F5C\u533A\u6587\u6863",q.default.createElement("button",{type:"button",style:Ie.docsOpenSpace,onClick:()=>{let b=window.__dshCadSelectSpace;typeof b=="function"&&b(),e()},title:"\u6253\u5F00\u5168\u5C4F CAD \u7A7A\u95F4\uFF08\u6587\u4EF6\u5939 / \u5BFC\u5165 / \u5BFC\u51FA / \u9884\u89C8\uFF09"},"\u5728 CAD \u7A7A\u95F4\u4E2D\u7BA1\u7406 \u2197")),q.default.createElement("div",{style:Ie.docsSearchRow},q.default.createElement("input",{style:Ie.docsSearch,value:u,placeholder:"\u641C\u7D22\u6587\u6863\u2026",onChange:b=>h(b.target.value)})),r!==null?q.default.createElement("div",{style:Ie.docsError},r):null,n===null&&r===null?q.default.createElement("div",{style:Ie.docsHintRow},"\u52A0\u8F7D\u4E2D\u2026"):null,M!==null&&M.length===0?q.default.createElement("div",{style:Ie.docsHintRow},n.length===0?"\u8FD8\u6CA1\u6709\u5EFA\u6A21\u6587\u6863 \u2014 \u5728\u5BF9\u8BDD\u4E2D\u5EFA\u6A21\u540E\u4F1A\u51FA\u73B0\u5728\u8FD9\u91CC":"\u6CA1\u6709\u5339\u914D\u7684\u6587\u6863"):null,M?.map(b=>{let R=b.id===i;return q.default.createElement("div",{key:b.id,style:Ie.docRow},f===b.id?q.default.createElement("input",{style:Ie.docRenameInput,value:v,autoFocus:!0,onChange:x=>p(x.target.value),onKeyDown:x=>{x.key==="Enter"&&v.trim()!==""&&y(b.id,v.trim()),x.key==="Escape"&&g(null)},onBlur:()=>{v.trim()!==""?y(b.id,v.trim()):g(null)}}):q.default.createElement(q.default.Fragment,null,q.default.createElement("button",{type:"button",role:"menuitem",style:Ie.docRowMain,onClick:()=>{b.sceneUrl!==void 0&&(so({docId:b.id,name:b.name,sceneUrl:b.sceneUrl}),rh("part"),e())},title:b.sceneUrl===void 0?"\u7A7A\u6587\u6863\uFF08\u65E0\u573A\u666F\uFF09":"\u70B9\u51FB\u9884\u89C8"},q.default.createElement("span",{style:Ie.menuIcon},q.default.createElement(hb,null)),q.default.createElement("span",{style:{...Ie.menuLabel,...R?{color:"var(--dsw-alias-label-primary,#4d6bfe)",fontWeight:600}:{}}},b.name,R?" \xB7 \u5F53\u524D":""),q.default.createElement("span",{style:Ie.menuHint},b.bodies," \u4F53 \xB7 ",pb(b.updatedAt))),a===b.id?q.default.createElement("span",{style:Ie.docConfirm},q.default.createElement("button",{type:"button",style:Ie.docConfirmYes,disabled:c===b.id,onClick:()=>{A(b.id)}},"\u5220\u9664"),q.default.createElement("button",{type:"button",style:Ie.docConfirmNo,onClick:()=>{l(null)}},"\u53D6\u6D88")):q.default.createElement("span",{style:Ie.docActions},q.default.createElement("button",{type:"button",style:Ie.docAction,"aria-label":`\u5C06 ${b.name} \u8BBE\u4E3A\u5F53\u524D\u4F1A\u8BDD\u6587\u6863`,title:"\u8BBE\u4E3A\u5F53\u524D\u4F1A\u8BDD\u6587\u6863",disabled:c===b.id,onClick:()=>{w(b.id,b.name)}},"\u2713"),q.default.createElement("button",{type:"button",style:Ie.docAction,"aria-label":`\u91CD\u547D\u540D ${b.name}`,title:"\u91CD\u547D\u540D",onClick:()=>{g(b.id),p(b.name)}},"\u270E"),q.default.createElement("button",{type:"button",style:Ie.docAction,"aria-label":`\u5220\u9664\u6587\u6863 ${b.name}`,title:"\u5220\u9664\u6587\u6863",onClick:()=>{l(b.id)}},"\xD7"))))}),q.default.createElement("div",{style:Ie.docsFooter},"\u70B9\u51FB\u9884\u89C8 \xB7 \u2713 \u8BBE\u4E3A\u5F53\u524D\u4F1A\u8BDD\u6587\u6863 \xB7 \u270E \u91CD\u547D\u540D"))}function gb(i){let[e,t]=(0,q.useState)(!1),[n,s]=(0,q.useState)(!1),r=rb(i.useSessions,i.sessions),o=i.useSessions?.(d=>d.current)??null;(0,q.useEffect)(()=>{Jf(o)},[o]);let{tabs:a,active:l}=ab(),c=l===null?null:r[l];return q.default.createElement(q.default.Fragment,null,q.default.createElement("div",{style:Ie.tabStripRow},q.default.createElement("div",{style:Ie.tabStrip,role:"tablist","aria-label":"CAD \u6587\u6863"},a.map(d=>{let u=d.id===l;return q.default.createElement("div",{key:d.id,role:"tab","aria-selected":u,tabIndex:0,style:{...Ie.tab,...u?Ie.tabActive:{}},onClick:()=>{lp(d.id)},onKeyDown:h=>{(h.key==="Enter"||h.key===" ")&&lp(d.id)}},q.default.createElement("span",{style:u?Ie.tabIconActive:Ie.tabIcon},q.default.createElement(up,{kind:d.id})),q.default.createElement("span",{style:Ie.tabLabel},ap[d.id]),q.default.createElement("button",{type:"button",style:Ie.tabClose,"aria-label":`\u5173\u95ED ${ap[d.id]}`,title:"\u5173\u95ED",onClick:h=>{h.stopPropagation(),ob(d.id)}},"\xD7"))}),q.default.createElement("button",{type:"button",style:Ie.addTab,"aria-label":"\u65B0\u5EFA\u6587\u6863",title:"\u65B0\u5EFA\uFF1A\u96F6\u4EF6 / \u88C5\u914D\u4F53 / \u5DE5\u7A0B\u56FE",onClick:()=>{s(!1),t(d=>!d)}},"+")),q.default.createElement("button",{type:"button",style:Ie.fileButton,"aria-label":"\u6587\u6863\u5217\u8868","aria-expanded":n,title:"\u5DE5\u4F5C\u533A\u6587\u6863\u5217\u8868\uFF08\u9884\u89C8 / \u5220\u9664\uFF09",onClick:()=>{t(!1),s(d=>!d)}},q.default.createElement(db,null)),q.default.createElement("span",{style:Ie.headerStats},c===null?"":vb(c))),e?q.default.createElement(fb,{onPick:d=>{t(!1),rh(d)},onClose:()=>{t(!1)}}):null,n?q.default.createElement(mb,{activeDocId:r.part?.viewId??null,onClose:()=>{s(!1)}}):null,q.default.createElement("div",{style:Ie.body},l==="part"?q.default.createElement(xb,{meta:r.part}):null,l==="assembly"?q.default.createElement(yb,{meta:r.assembly}):null,l==="drawing"?q.default.createElement(_b,{meta:r.drawing}):null))}function fp(i){return function(t){return q.default.createElement("div",{"data-cad-pane":"",style:Ie.paneRoot},q.default.createElement(gb,{useSessions:t.useSessions,sessions:i}))}}function xb({meta:i}){let e=lb(),t=jf(),n=t!==null&&t.sceneUrl!==void 0&&(i===null||t.id!==i.viewId),s=n?t.id:i?.viewId??null,r=n?t.sceneUrl:i?.sceneUrl,o=Vd(s),a=(0,q.useMemo)(()=>Gd(r,o),[r,o]),l=qs(a),c=qs(e?.sceneUrl),d=(0,q.useMemo)(()=>Wl(a),[a]),{tree:u}=np(s,d),[h,f]=(0,q.useState)(!0),[g,v]=(0,q.useState)(null),[p,m]=(0,q.useState)(new Set),A=(0,q.useMemo)(()=>[...p],[p]);return(0,q.useEffect)(()=>{v(null),m(new Set)},[s]),(0,q.useEffect)(()=>{a!==void 0&&ro!==null&&so(null)},[a]),e!==null?q.default.createElement("div",{style:Ie.sceneFill},q.default.createElement("div",{style:Ie.previewBar},q.default.createElement("span",{style:Ie.previewLabel},"\u9884\u89C8: ",e.name),q.default.createElement("button",{type:"button",style:Ie.previewBack,onClick:()=>{so(null)}},"\u8FD4\u56DE\u8DDF\u8E2A")),q.default.createElement(Di,{scene:c.scene,error:c.error,fill:!0})):i===null&&!n?q.default.createElement(bb,null):q.default.createElement("div",{style:Ie.assemblyStage},q.default.createElement("div",{style:Ie.sceneFill},q.default.createElement(Di,{scene:l.scene,error:l.error,fill:!0,highlight:g,hidden:A})),h?q.default.createElement("div",{style:Ie.treeFloat},q.default.createElement(ip,{tree:u,selected:g,onSelect:v,hidden:p,onToggleHidden:w=>{m(y=>{let M=new Set(y),b=w.every(R=>M.has(R));for(let R of w)b?M.delete(R):M.add(R);return M})},onCollapse:()=>{f(!1)}})):q.default.createElement("button",{type:"button",style:Ie.treeRail,onClick:()=>{f(!0)},"aria-label":"\u5C55\u5F00\u7279\u5F81\u6811",title:"\u5C55\u5F00\u7279\u5F81\u6811"},"\u203A"))}function yb({meta:i}){let e=i!==null&&i.viewId.startsWith("asm-")?i.viewId.slice(4):null,t=Vd(e),n=(0,q.useMemo)(()=>Gd(i?.sceneUrl,t),[i?.sceneUrl,t]),{scene:s,error:r}=qs(n),o=(0,q.useMemo)(()=>Wl(n),[n]),{tree:a}=Qf(e,o),[l,c]=(0,q.useState)(!0),[d,u]=(0,q.useState)(null),[h,f]=(0,q.useState)(new Set),g=(0,q.useMemo)(()=>[...h],[h]);return(0,q.useEffect)(()=>{u(null),f(new Set)},[e]),i===null?q.default.createElement(pp,{icon:q.default.createElement(dp,null),title:"\u88C5\u914D\u4F53\u4E3A\u7A7A",hint:"\u5728\u5BF9\u8BDD\u4E2D\u8BF4\u300C\u628A b1 \u548C b2 \u88C5\u914D\u8D77\u6765\uFF0Cb2 \u653E\u5230 (60, 0, 0)\u300D\uFF0C\u6216\u4F7F\u7528 cad_assembly_insert \u5DE5\u5177\u63D2\u5165\u5B9E\u4F8B"}):q.default.createElement("div",{style:Ie.assemblyStage},q.default.createElement("div",{style:Ie.sceneFill},q.default.createElement(Di,{scene:s,error:r,fill:!0,highlight:d,hidden:g})),l?q.default.createElement("div",{style:Ie.treeFloat},q.default.createElement(ep,{tree:a,selected:d,onSelect:u,hidden:h,onToggleHidden:v=>{f(p=>{let m=new Set(p);return m.has(v.name)?m.delete(v.name):m.add(v.name),m})},onCollapse:()=>{c(!1)}})):q.default.createElement("button",{type:"button",style:Ie.treeRail,onClick:()=>{c(!0)},"aria-label":"\u5C55\u5F00\u88C5\u914D\u6811",title:"\u5C55\u5F00\u88C5\u914D\u6811"},"\u203A"))}function _b({meta:i}){let{scene:e,error:t}=qs(i?.sceneUrl),n=Pi();return i===null?q.default.createElement(pp,{icon:q.default.createElement(hp,null),title:"\u8FD8\u6CA1\u6709\u5DE5\u7A0B\u56FE",hint:"\u5728\u5BF9\u8BDD\u4E2D\u8BF4\u300C\u7ED9 b1 \u51FA\u4E00\u5F20 A3 \u5DE5\u7A0B\u56FE\u300D\uFF0C\u6216\u4F7F\u7528 cad_drawing \u5DE5\u5177\u751F\u6210\u4E09\u89C6\u56FE + \u8F74\u6D4B\u56FE"}):q.default.createElement("div",{style:{...Ie.sceneFill,background:Ki(n)}},q.default.createElement(Di,{scene:e,error:t,fill:!0}))}function pp({icon:i,title:e,hint:t}){return q.default.createElement("div",{style:Ie.emptyState},q.default.createElement("div",{style:Ie.emptyIcon},i),q.default.createElement("div",{style:Ie.emptyTitle},e),q.default.createElement("div",{style:Ie.emptyHint},t))}function vb(i){let e=[];if(i.kind==="3d"){let t=i.doc==="assembly"?" \u5B9E\u4F8B":" \u4F53";i.stats.meshes!==void 0&&e.push(`${i.stats.meshes}${t}`),i.stats.triangles!==void 0&&e.push(`${i.stats.triangles.toLocaleString()} \u4E09\u89D2\u9762`)}else i.stats.entities!==void 0&&e.push(`${i.stats.entities.toLocaleString()} \u5B9E\u4F53`);return e.join(" \xB7 ")}function bb(){let i=(0,q.useRef)(null),e=Pi();return(0,q.useEffect)(()=>{let t=i.current;if(t===null)return;let n=zf(t,{part:null});return()=>{n.dispose()}},[]),q.default.createElement("div",{style:Ie.demoRoot},q.default.createElement("div",{style:Ie.demoCaption},"Part Studio"),q.default.createElement("div",{style:{...Ie.demoViewport,background:Ki(e)}},q.default.createElement("div",{ref:i,style:{width:"100%",height:"100%"}})),q.default.createElement("div",{style:Ie.demoHint},"\u5EFA\u6A21\u533A\u4E3A\u7A7A \xB7 \u5728\u5BF9\u8BDD\u4E2D\u63CF\u8FF0\u96F6\u4EF6\uFF08\u5982\u300C\u5EFA\u4E00\u4E2A 100\xD760\xD710 \u7684\u677F\uFF0C\u4E2D\u95F4\u6253 \u230020 \u5B54\u300D\uFF09\uFF0C\u5EFA\u6A21\u540E\u6B64\u9875\u7B7E\u5B9E\u65F6\u8DDF\u8E2A\u6700\u65B0\u6A21\u578B"))}var Ie={paneRoot:{width:"100%",height:"100%",display:"flex",flexDirection:"column",minWidth:0,minHeight:0,background:"var(--dsw-alias-bg-base, #fff)"},tabStripRow:{display:"flex",alignItems:"center",gap:6,padding:"6px 8px 6px 12px",flex:"none",borderBottom:"1px solid var(--dsw-alias-border-l1, #eceff3)",background:"var(--dsw-alias-bg-subtle, #f7f8fa)",position:"relative"},tabStrip:{display:"flex",alignItems:"center",gap:4,flex:"1 1 auto",minWidth:0,overflow:"hidden"},tab:{display:"flex",alignItems:"center",gap:5,padding:"4px 6px 4px 9px",borderRadius:7,border:"1px solid transparent",color:"var(--dsw-alias-label-tertiary, #6b7280)",cursor:"pointer",userSelect:"none",flex:"none",maxWidth:150,lineHeight:"18px"},tabActive:{background:"var(--dsw-alias-bg-base, #fff)",borderColor:"var(--dsw-alias-border-l1, #e2e5ea)",color:"var(--dsw-alias-label-primary, #1f2937)",boxShadow:"0 1px 2px rgba(16,24,40,0.06)"},tabIcon:{display:"flex",alignItems:"center",opacity:.75,flex:"none"},tabIconActive:{display:"flex",alignItems:"center",color:"var(--dsw-alias-label-primary, #4d6bfe)",flex:"none"},tabLabel:{fontSize:12,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},tabClose:{border:"none",background:"transparent",color:"var(--dsw-alias-label-tertiary, #9ca3af)",fontSize:13,lineHeight:"16px",width:16,height:16,borderRadius:4,cursor:"pointer",padding:0,flex:"none",textAlign:"center"},addTab:{flex:"none",width:24,height:24,marginLeft:2,display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid var(--dsw-alias-border-l1, #e2e5ea)",borderRadius:7,background:"var(--dsw-alias-bg-base, #fff)",color:"var(--dsw-alias-label-secondary, #374151)",fontSize:15,lineHeight:"18px",cursor:"pointer",padding:0},menu:{position:"absolute",top:40,left:12,zIndex:20,minWidth:230,padding:5,background:"var(--dsw-alias-bg-base, #fff)",border:"1px solid var(--dsw-alias-border-l1, #e2e5ea)",borderRadius:10,boxShadow:"0 12px 32px -12px rgba(16,24,40,0.24)",display:"flex",flexDirection:"column",gap:1},menuItem:{display:"flex",alignItems:"center",gap:8,padding:"7px 9px",border:"none",borderRadius:7,background:"transparent",color:"var(--dsw-alias-label-primary, #1f2937)",cursor:"pointer",textAlign:"left",font:"inherit",fontSize:12.5},menuIcon:{display:"flex",alignItems:"center",color:"var(--dsw-alias-label-secondary, #374151)",flex:"none"},menuLabel:{fontWeight:600,flex:"none"},menuHint:{color:"var(--dsw-alias-label-tertiary, #9ca3af)",fontSize:11,marginLeft:"auto",whiteSpace:"nowrap"},fileButton:{flex:"none",display:"flex",alignItems:"center",justifyContent:"center",width:24,height:24,marginLeft:4,border:"1px solid var(--dsw-alias-border-l2, #c4c9d0)",borderRadius:6,background:"transparent",color:"var(--dsw-alias-label-secondary, #374151)",cursor:"pointer",padding:0},docsHeader:{fontSize:11,fontWeight:600,color:"var(--dsw-alias-label-tertiary, #6b7280)",padding:"5px 9px 3px",letterSpacing:"0.02em"},docsHintRow:{fontSize:12,color:"var(--dsw-alias-label-tertiary, #6b7280)",padding:"8px 9px"},docsError:{fontSize:12,color:"var(--dsw-alias-state-error-primary, #d92d20)",padding:"4px 9px"},docsFooter:{fontSize:11,color:"var(--dsw-alias-label-tertiary, #9ca3af)",padding:"5px 9px 3px",borderTop:"1px solid var(--dsw-alias-border-l1, #e2e5ea)",marginTop:3},docsOpenSpace:{marginLeft:"auto",flex:"none",border:"none",borderRadius:6,background:"transparent",color:"var(--dsw-alias-label-secondary, #374151)",fontSize:11,padding:"2px 6px",cursor:"pointer"},docsSearchRow:{padding:"2px 9px 6px"},docsSearch:{width:"100%",height:26,border:"0.5px solid var(--dsw-alias-border-l2, #c4c9d0)",borderRadius:6,background:"var(--dsw-alias-bg-base, #fff)",color:"var(--dsw-alias-label-primary, #1f2937)",font:"inherit",fontSize:12,padding:"0 8px",outline:"none",boxSizing:"border-box"},docActions:{display:"flex",alignItems:"center",gap:1,flex:"none"},docAction:{flex:"none",width:20,height:20,border:"none",borderRadius:5,background:"transparent",color:"var(--dsw-alias-label-tertiary, #9ca3af)",fontSize:11,lineHeight:"18px",cursor:"pointer",padding:0},docRenameInput:{flex:"1 1 auto",minWidth:0,height:24,border:"0.5px solid var(--dsw-alias-state-business-primary, #4d6bfe)",borderRadius:6,background:"var(--dsw-alias-bg-base, #fff)",color:"var(--dsw-alias-label-primary, #1f2937)",font:"inherit",fontSize:12,padding:"0 6px",outline:"none"},docRow:{display:"flex",alignItems:"center",gap:2},docRowMain:{display:"flex",alignItems:"center",gap:8,flex:"1 1 auto",minWidth:0,padding:"7px 9px",border:"none",borderRadius:7,background:"transparent",color:"var(--dsw-alias-label-primary, #1f2937)",cursor:"pointer",textAlign:"left",font:"inherit",fontSize:12.5},docDelete:{flex:"none",width:22,height:22,border:"none",borderRadius:6,background:"transparent",color:"var(--dsw-alias-label-tertiary, #9ca3af)",fontSize:14,lineHeight:"20px",cursor:"pointer",padding:0},docConfirm:{display:"flex",alignItems:"center",gap:4,flex:"none",padding:"0 4px 0 0"},docConfirmYes:{border:"none",borderRadius:6,background:"var(--dsw-alias-state-error-primary, #d92d20)",color:"var(--dsw-alias-label-primary-foreground, #fff)",fontSize:11,padding:"3px 8px",cursor:"pointer"},docConfirmNo:{border:"1px solid var(--dsw-alias-border-l2, #c4c9d0)",borderRadius:6,background:"transparent",color:"var(--dsw-alias-label-secondary, #374151)",fontSize:11,padding:"3px 8px",cursor:"pointer"},previewBar:{flex:"none",display:"flex",alignItems:"center",gap:8,padding:"5px 10px",borderBottom:"1px solid var(--dsw-alias-border-l1, #e2e5ea)",background:"var(--dsw-alias-bg-subtle, #f5f6f8)"},previewLabel:{flex:"1 1 auto",minWidth:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",fontSize:12,color:"var(--dsw-alias-label-primary, #1f2937)",fontWeight:600},previewBack:{flex:"none",border:"1px solid var(--dsw-alias-border-l2, #c4c9d0)",borderRadius:6,background:"transparent",color:"var(--dsw-alias-label-secondary, #374151)",fontSize:11,padding:"2px 8px",cursor:"pointer"},headerStats:{flex:"none",fontSize:11,color:"var(--dsw-alias-label-tertiary, #6b7280)",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",maxWidth:"30%"},body:{flex:"1 1 auto",minHeight:0,display:"flex",flexDirection:"column"},sceneFill:{flex:"1 1 auto",minHeight:0,display:"flex",flexDirection:"column"},assemblyStage:{flex:"1 1 auto",minHeight:0,position:"relative",display:"flex",flexDirection:"column"},treeFloat:{position:"absolute",top:8,left:8,zIndex:6,maxHeight:"calc(100% - 16px)",display:"flex",flexDirection:"column"},treeRail:{position:"absolute",top:8,left:8,zIndex:6,width:22,height:22,border:"1px solid var(--dsw-alias-border-l1, #e2e5ea)",borderRadius:7,background:"var(--dsw-alias-bg-base, #fff)",color:"var(--dsw-alias-label-tertiary, #9ca3af)",fontSize:13,lineHeight:"18px",cursor:"pointer",padding:0,boxShadow:"0 4px 12px -6px rgba(16,24,40,0.25)"},emptyState:{flex:"1 1 auto",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8,padding:24,color:"var(--dsw-alias-label-tertiary, #9ca3af)",textAlign:"center"},emptyIcon:{display:"flex",color:"var(--dsw-alias-label-tertiary, #c0c6cf)",transform:"scale(2)",marginBottom:6},emptyTitle:{fontSize:13,fontWeight:600,color:"var(--dsw-alias-label-secondary, #6b7280)"},emptyHint:{fontSize:11.5,lineHeight:"18px",maxWidth:300},demoRoot:{flex:"1 1 auto",minHeight:0,display:"flex",flexDirection:"column",gap:6,padding:"10px 10px 12px"},demoCaption:{color:"var(--dsw-alias-label-tertiary, #6b7280)",fontSize:11,textTransform:"uppercase",letterSpacing:"0.05em",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",flex:"none"},demoViewport:{position:"relative",flex:"1 1 auto",minHeight:0,borderRadius:10,overflow:"hidden"},demoHint:{flex:"none",color:"var(--dsw-alias-label-tertiary, #9ca3af)",fontSize:11,lineHeight:"17px",textAlign:"center"}};var lh="dsh-cad",xp="cad",$l=[100,300,600,1200],Zl=[300,900,1800,3e3,5e3];function yp({size:i=16,className:e}){return Qi.default.createElement("svg",{width:i,height:i,viewBox:"0 0 16 16",fill:"none",className:e,"aria-hidden":"true"},Qi.default.createElement("path",{d:"M8 1.5 14 5v6L8 14.5 2 11V5L8 1.5Z",stroke:"currentColor",strokeWidth:"1.2",strokeLinejoin:"round"}),Qi.default.createElement("path",{d:"M2 5l6 3.2L14 5M8 8.2v6.3",stroke:"currentColor",strokeWidth:"1.2",strokeLinejoin:"round"}))}function Sb(i){let e=i.useTabInfo?.().tab;return Qi.default.createElement(Qi.default.Fragment,null,Qi.default.createElement(yp,{size:16}),e?.title??"CAD")}function mp(i,e){let t=i.get?.("sidebarRightTabs");if(t==null||typeof t.register!="function")return!1;let n=i.effect??(o=>o()),s=[],r=o=>{typeof o=="function"&&s.push(o)};try{return r(t.register({id:lh,kind:xp,title:()=>"CAD",guide:[{order:20,title:()=>"CAD \u89C6\u56FE",description:()=>"\u4E09\u7EF4\u6A21\u578B \xB7 \u88C5\u914D\u4F53 \xB7 \u5DE5\u7A0B\u56FE\uFF0C\u5B9E\u65F6\u8DDF\u8E2A\u672C\u4F1A\u8BDD\u7684\u5EFA\u6A21\u7ED3\u679C",icon:yp}]})),r(n(()=>i.slots.inject("sidebar.right.pane.tab",()=>i.slots.register({name:"sidebar.right.pane.tab",key:lh},fp(e))),"dsh-cad: rightbar pane body")),r(n(()=>i.slots.inject("sidebar.right.pane.tab.title",()=>i.slots.register({name:"sidebar.right.pane.tab.title",key:lh},Sb)),"dsh-cad: rightbar pane title")),!0}catch{for(let o of s.reverse())try{o()}catch{}return!1}}function Mb(i,e){setTimeout(()=>{try{let n=i?document:document.querySelector("[data-sidebar-right-panel]");if(n===null)return;let s=i?/(打开|展开|open|show|expand).*(右侧边栏|right|sidebar)/i:/(收起|折叠|collapse|hide).*(右侧边栏|right|sidebar)/i,r=Array.from(n.querySelectorAll("button")).find(o=>s.test(o.getAttribute("aria-label")??""));r instanceof HTMLElement&&r.click()}catch{}},e)}function gp(i){let e={current:0},t=(a,l)=>{l===0&&(e.current+=1);let c=e.current,d=i.get?.("sidebarRight");if(d!=null&&typeof d.openTab=="function")try{d.openTab(xp),Mb(a,a?150:900);return}catch{}if(l>=Zl.length)return;let u=()=>{c===e.current&&t(a,l+1)};try{typeof i.setTimeout=="function"?i.setTimeout(u,Zl[l]):setTimeout(u,Zl[l])}catch{setTimeout(u,Zl[l])}},n=!1,s=()=>{let a=n;n=!0,t(a,0)},o=i.get?.("uiSession")?.adapter?.current;if(o!=null&&typeof o.subscribe=="function"&&typeof o.getSnapshot=="function"){let a=o.subscribe(s);i.effect?.(()=>a,"dsh-cad: session auto-open watcher")}t(!1,0)}function _p(i,e){if(mp(i,e)){gp(i);return}let t=n=>{if(mp(i,e)){gp(i);return}if(n>=$l.length)return;let s=()=>{t(n+1)};try{typeof i.setTimeout=="function"?i.setTimeout(s,$l[n]):setTimeout(s,$l[n])}catch{setTimeout(s,$l[n])}};t(0)}var wb=["slots"],Eb=["cad_view","cad_create_prim","cad_extrude_profile","cad_revolve","cad_chamfer","cad_shell","cad_draft","cad_pattern","cad_loft","cad_sweep","cad_boolean","cad_fillet","cad_transform","cad_export","cad_delete","cad_volume","cad_freecad","cad_image_profile","cad_drawing","cad_assembly_insert","cad_assembly_move","cad_assembly_remove","cad_doc_open","cad_constraint","cad_solve","cad_motion"];function Tb(i){i.slots.onEntryError?.((n,s,r,o)=>{try{document.documentElement.setAttribute("data-cad-slot-crash",`${n}:${String(r instanceof Error?r.message:r).slice(0,160)}:abd=${String(o.abdicated)}`)}catch{}});for(let n of Eb)i.slots.inject("tool.call.toolview",()=>i.slots.register({name:"tool.call.toolview",key:n,locale:"conversation"},$f));let t=i.get?.("sessions");_p(i,t);try{i.slots.inject("sidebar.panellist",()=>i.slots.register({name:"sidebar.panellist",id:eh,order:5,label:()=>"CAD \u7A7A\u95F4"},function(s){return ch.default.createElement(th,{size:s.size??16})})),i.slots.inject("main",()=>i.slots.register({name:"main",key:eh},function(s){return ch.default.createElement(op,{ctx:{get:i.get},useSessions:typeof s.useSessions=="function"?s.useSessions:void 0})})),Ni()}catch{}}
    return module.exports;
  }
});
//# sourceMappingURL=client.js.map
