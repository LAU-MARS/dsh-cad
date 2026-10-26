window.__ModuleLoader__.load({
  id: "dsh-cad",
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
"use strict";var ap=Object.create;var Qr=Object.defineProperty;var lp=Object.getOwnPropertyDescriptor;var cp=Object.getOwnPropertyNames;var hp=Object.getPrototypeOf,up=Object.prototype.hasOwnProperty;var dp=(i,e)=>{for(var t in e)Qr(i,t,{get:e[t],enumerable:!0})},$h=(i,e,t,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of cp(e))!up.call(i,s)&&s!==t&&Qr(i,s,{get:()=>e[s],enumerable:!(n=lp(e,s))||n.enumerable});return i};var Ai=(i,e,t)=>(t=i!=null?ap(hp(i)):{},$h(e||!i||!i.__esModule?Qr(t,"default",{value:i,enumerable:!0}):t,i)),fp=i=>$h(Qr({},"__esModule",{value:!0}),i);var qy={};dp(qy,{apply:()=>Xy,inject:()=>Gy});module.exports=fp(qy);var zs=Ai(require("react"),1);var Ut=Ai(require("react"),1),ct=require("react");var _i={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},vi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Du=0,Rc=1,Nu=2;var Ir=1,Uu=2,Ts=3,Yn=0,$t=1,cn=2,Fn=0,Ui=1,Pc=2,Ic=3,Lc=4,Fu=5;var li=100,Ou=101,Bu=102,ku=103,zu=104,Hu=200,Vu=201,Gu=202,Wu=203,No=204,Uo=205,Xu=206,qu=207,Yu=208,Zu=209,$u=210,Ju=211,Ku=212,ju=213,Qu=214,Fo=0,Oo=1,Bo=2,Fi=3,ko=4,zo=5,Ho=6,Vo=7,Dc=0,ed=1,td=2,En=0,Nc=1,Uc=2,Fc=3,Oc=4,Bc=5,kc=6,zc=7;var Hc=300,yi=301,zi=302,Sa=303,Ea=304,Lr=306,Go=1e3,Dn=1001,Wo=1002,Bt=1003,nd=1004;var Dr=1005;var zt=1006,wa=1007;var bi=1008;var Kt=1009,Vc=1010,Gc=1011,As=1012,Ta=1013,wn=1014,Tn=1015,On=1016,Aa=1017,Ca=1018,Cs=1020,Wc=35902,Xc=35899,qc=1021,Yc=1022,mn=1023,Un=1026,Mi=1027,Zc=1028,Ra=1029,Si=1030,Pa=1031;var Ia=1033,Nr=33776,Ur=33777,Fr=33778,Or=33779,La=35840,Da=35841,Na=35842,Ua=35843,Fa=36196,Oa=37492,Ba=37496,ka=37488,za=37489,Br=37490,Ha=37491,Va=37808,Ga=37809,Wa=37810,Xa=37811,qa=37812,Ya=37813,Za=37814,$a=37815,Ja=37816,Ka=37817,ja=37818,Qa=37819,el=37820,tl=37821,nl=36492,il=36494,sl=36495,rl=36283,ol=36284,kr=36285,al=36286;var nr=2300,Xo=2301,Do=2302,pc=2303,mc=2400,gc=2401,xc=2402;var id=3200;var ll=0,sd=1,Kn="",sn="srgb",ir="srgb-linear",sr="linear",rt="srgb";var Li=7680;var _c=519,rd=512,od=513,ad=514,cl=515,ld=516,cd=517,hl=518,hd=519,qo=35044;var $c="300 es",yn=2e3,us=2001;function pp(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function mp(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function rr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function ud(){let i=rr("canvas");return i.style.display="block",i}var Jh={},ds=null;function or(...i){let e="THREE."+i.shift();ds?ds("log",e,...i):console.log(e,...i)}function dd(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Ne(...i){i=dd(i);let e="THREE."+i.shift();if(ds)ds("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function Oe(...i){i=dd(i);let e="THREE."+i.shift();if(ds)ds("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Ni(...i){let e=i.join(" ");e in Jh||(Jh[e]=!0,Ne(...i))}function fd(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var pd={[Fo]:Oo,[Bo]:Ho,[ko]:Vo,[Fi]:zo,[Oo]:Fo,[Ho]:Bo,[Vo]:ko,[zo]:Fi},bn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let s=n[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}},Gt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Kh=1234567,cs=Math.PI/180,fs=180/Math.PI;function Nn(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Gt[i&255]+Gt[i>>8&255]+Gt[i>>16&255]+Gt[i>>24&255]+"-"+Gt[e&255]+Gt[e>>8&255]+"-"+Gt[e>>16&15|64]+Gt[e>>24&255]+"-"+Gt[t&63|128]+Gt[t>>8&255]+"-"+Gt[t>>16&255]+Gt[t>>24&255]+Gt[n&255]+Gt[n>>8&255]+Gt[n>>16&255]+Gt[n>>24&255]).toLowerCase()}function $e(i,e,t){return Math.max(e,Math.min(t,i))}function Jc(i,e){return(i%e+e)%e}function gp(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function xp(i,e,t){return i!==e?(t-i)/(e-i):0}function Qs(i,e,t){return(1-t)*i+t*e}function _p(i,e,t,n){return Qs(i,e,1-Math.exp(-t*n))}function vp(i,e=1){return e-Math.abs(Jc(i,e*2)-e)}function yp(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function bp(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Mp(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Sp(i,e){return i+Math.random()*(e-i)}function Ep(i){return i*(.5-Math.random())}function wp(i){i!==void 0&&(Kh=i);let e=Kh+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Tp(i){return i*cs}function Ap(i){return i*fs}function Cp(i){return(i&i-1)===0&&i!==0}function Rp(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Pp(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Ip(i,e,t,n,s){let r=Math.cos,o=Math.sin,a=r(t/2),l=o(t/2),c=r((e+n)/2),h=o((e+n)/2),d=r((e-n)/2),u=o((e-n)/2),f=r((n-e)/2),p=o((n-e)/2);switch(s){case"XYX":i.set(a*h,l*d,l*u,a*c);break;case"YZY":i.set(l*u,a*h,l*d,a*c);break;case"ZXZ":i.set(l*d,l*u,a*h,a*c);break;case"XZX":i.set(a*h,l*p,l*f,a*c);break;case"YXY":i.set(l*f,a*h,l*p,a*c);break;case"ZYZ":i.set(l*p,l*f,a*h,a*c);break;default:Ne("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function vn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function at(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var Kc={DEG2RAD:cs,RAD2DEG:fs,generateUUID:Nn,clamp:$e,euclideanModulo:Jc,mapLinear:gp,inverseLerp:xp,lerp:Qs,damp:_p,pingpong:vp,smoothstep:yp,smootherstep:bp,randInt:Mp,randFloat:Sp,randFloatSpread:Ep,seededRandom:wp,degToRad:Tp,radToDeg:Ap,isPowerOfTwo:Cp,ceilPowerOfTwo:Rp,floorPowerOfTwo:Pp,setQuaternionFromProperEuler:Ip,normalize:at,denormalize:vn},ne=class i{static{i.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=$e(this.x,e.x,t.x),this.y=$e(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=$e(this.x,e,t),this.y=$e(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar($e(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos($e(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Ht=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let l=n[s+0],c=n[s+1],h=n[s+2],d=n[s+3],u=r[o+0],f=r[o+1],p=r[o+2],y=r[o+3];if(d!==y||l!==u||c!==f||h!==p){let g=l*u+c*f+h*p+d*y;g<0&&(u=-u,f=-f,p=-p,y=-y,g=-g);let m=1-a;if(g<.9995){let C=Math.acos(g),w=Math.sin(C);m=Math.sin(m*C)/w,a=Math.sin(a*C)/w,l=l*m+u*a,c=c*m+f*a,h=h*m+p*a,d=d*m+y*a}else{l=l*m+u*a,c=c*m+f*a,h=h*m+p*a,d=d*m+y*a;let C=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=C,c*=C,h*=C,d*=C}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,s,r,o){let a=n[s],l=n[s+1],c=n[s+2],h=n[s+3],d=r[o],u=r[o+1],f=r[o+2],p=r[o+3];return e[t]=a*p+h*d+l*f-c*u,e[t+1]=l*p+h*u+c*d-a*f,e[t+2]=c*p+h*f+a*u-l*d,e[t+3]=h*p-a*d-l*u-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(s/2),d=a(r/2),u=l(n/2),f=l(s/2),p=l(r/2);switch(o){case"XYZ":this._x=u*h*d+c*f*p,this._y=c*f*d-u*h*p,this._z=c*h*p+u*f*d,this._w=c*h*d-u*f*p;break;case"YXZ":this._x=u*h*d+c*f*p,this._y=c*f*d-u*h*p,this._z=c*h*p-u*f*d,this._w=c*h*d+u*f*p;break;case"ZXY":this._x=u*h*d-c*f*p,this._y=c*f*d+u*h*p,this._z=c*h*p+u*f*d,this._w=c*h*d-u*f*p;break;case"ZYX":this._x=u*h*d-c*f*p,this._y=c*f*d+u*h*p,this._z=c*h*p-u*f*d,this._w=c*h*d+u*f*p;break;case"YZX":this._x=u*h*d+c*f*p,this._y=c*f*d+u*h*p,this._z=c*h*p-u*f*d,this._w=c*h*d-u*f*p;break;case"XZY":this._x=u*h*d-c*f*p,this._y=c*f*d-u*h*p,this._z=c*h*p+u*f*d,this._w=c*h*d+u*f*p;break;default:Ne("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],h=t[6],d=t[10],u=n+a+d;if(u>0){let f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(o-s)*f}else if(n>a&&n>d){let f=2*Math.sqrt(1+n-a-d);this._w=(h-l)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+c)/f}else if(a>d){let f=2*Math.sqrt(1+a-n-d);this._w=(r-c)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+d-n-a);this._w=(o-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs($e(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-s*a,this._w=o*h-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,o=e._w,a=this.dot(e);a<0&&(n=-n,s=-s,r=-r,o=-o,a=-a);let l=1-t;if(a<.9995){let c=Math.acos(a),h=Math.sin(c);l=Math.sin(l*c)/h,t=Math.sin(t*c)/h,this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+o*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+o*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},R=class i{static{i.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(jh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(jh.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*s-a*n),h=2*(a*t-r*s),d=2*(r*n-o*t);return this.x=t+l*c+o*d-a*h,this.y=n+l*h+a*c-r*d,this.z=s+l*d+r*h-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=$e(this.x,e.x,t.x),this.y=$e(this.y,e.y,t.y),this.z=$e(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=$e(this.x,e,t),this.y=$e(this.y,e,t),this.z=$e(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar($e(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return zl.copy(this).projectOnVector(e),this.sub(zl)}reflect(e){return this.sub(zl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos($e(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},zl=new R,jh=new Ht,Ge=class i{static{i.prototype.isMatrix3=!0}constructor(e,t,n,s,r,o,a,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,l,c)}set(e,t,n,s,r,o,a,l,c){let h=this.elements;return h[0]=e,h[1]=s,h[2]=a,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],f=n[5],p=n[8],y=s[0],g=s[3],m=s[6],C=s[1],w=s[4],_=s[7],S=s[2],M=s[5],A=s[8];return r[0]=o*y+a*C+l*S,r[3]=o*g+a*w+l*M,r[6]=o*m+a*_+l*A,r[1]=c*y+h*C+d*S,r[4]=c*g+h*w+d*M,r[7]=c*m+h*_+d*A,r[2]=u*y+f*C+p*S,r[5]=u*g+f*w+p*M,r[8]=u*m+f*_+p*A,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return t*o*h-t*a*c-n*r*h+n*a*l+s*r*c-s*o*l}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],d=h*o-a*c,u=a*l-h*r,f=c*r-o*l,p=t*d+n*u+s*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/p;return e[0]=d*y,e[1]=(s*c-h*n)*y,e[2]=(a*n-s*o)*y,e[3]=u*y,e[4]=(h*t-s*l)*y,e[5]=(s*r-a*t)*y,e[6]=f*y,e[7]=(n*l-c*t)*y,e[8]=(o*t-n*r)*y,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-s*c,s*l,-s*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return Ni("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Hl.makeScale(e,t)),this}rotate(e){return Ni("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Hl.makeRotation(-e)),this}translate(e,t){return Ni("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Hl.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Hl=new Ge,Qh=new Ge().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),eu=new Ge().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Lp(){let i={enabled:!0,workingColorSpace:ir,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===rt&&(s.r=qn(s.r),s.g=qn(s.g),s.b=qn(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===rt&&(s.r=hs(s.r),s.g=hs(s.g),s.b=hs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Kn?sr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Ni("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Ni("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[ir]:{primaries:e,whitePoint:n,transfer:sr,toXYZ:Qh,fromXYZ:eu,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:sn},outputColorSpaceConfig:{drawingBufferColorSpace:sn}},[sn]:{primaries:e,whitePoint:n,transfer:rt,toXYZ:Qh,fromXYZ:eu,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:sn}}}),i}var tt=Lp();function qn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function hs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Yi,Yo=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Yi===void 0&&(Yi=rr("canvas")),Yi.width=e.width,Yi.height=e.height;let s=Yi.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=Yi}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=rr("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=qn(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(qn(t[n]/255)*255):t[n]=qn(t[n]);return{data:t,width:e.width,height:e.height}}else return Ne("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Dp=0,ps=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Dp++}),this.uuid=Nn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Vl(s[o].image)):r.push(Vl(s[o]))}else r=Vl(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function Vl(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Yo.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Ne("Texture: Unable to serialize Texture."),{})}var Np=0,Gl=new R,Zt=class i extends bn{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=Dn,s=Dn,r=zt,o=bi,a=mn,l=Kt,c=i.DEFAULT_ANISOTROPY,h=Kn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Np++}),this.uuid=Nn(),this.name="",this.source=new ps(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new ne(0,0),this.repeat=new ne(1,1),this.center=new ne(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ge,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Gl).x}get height(){return this.source.getSize(Gl).y}get depth(){return this.source.getSize(Gl).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){Ne(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Ne(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Hc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Go:e.x=e.x-Math.floor(e.x);break;case Dn:e.x=e.x<0?0:1;break;case Wo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Go:e.y=e.y-Math.floor(e.y);break;case Dn:e.y=e.y<0?0:1;break;case Wo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Zt.DEFAULT_IMAGE=null;Zt.DEFAULT_MAPPING=Hc;Zt.DEFAULT_ANISOTROPY=1;var bt=class i{static{i.prototype.isVector4=!0}constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,l=e.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],p=l[9],y=l[2],g=l[6],m=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-y)<.01&&Math.abs(p-g)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+y)<.1&&Math.abs(p+g)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let w=(c+1)/2,_=(f+1)/2,S=(m+1)/2,M=(h+u)/4,A=(d+y)/4,v=(p+g)/4;return w>_&&w>S?w<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(w),s=M/n,r=A/n):_>S?_<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),n=M/s,r=v/s):S<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(S),n=A/r,s=v/r),this.set(n,s,r,t),this}let C=Math.sqrt((g-p)*(g-p)+(d-y)*(d-y)+(u-h)*(u-h));return Math.abs(C)<.001&&(C=1),this.x=(g-p)/C,this.y=(d-y)/C,this.z=(u-h)/C,this.w=Math.acos((c+f+m-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=$e(this.x,e.x,t.x),this.y=$e(this.y,e.y,t.y),this.z=$e(this.z,e.z,t.z),this.w=$e(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=$e(this.x,e,t),this.y=$e(this.y,e,t),this.z=$e(this.z,e,t),this.w=$e(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar($e(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Zo=class extends bn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:zt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new bt(0,0,e,t),this.scissorTest=!1,this.viewport=new bt(0,0,e,t),this.textures=[];let s={width:e,height:t,depth:n.depth},r=new Zt(s),o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:zt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new ps(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},rn=class extends Zo{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},ar=class extends Zt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Bt,this.minFilter=Bt,this.wrapR=Dn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var $o=class extends Zt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Bt,this.minFilter=Bt,this.wrapR=Dn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var ot=class i{static{i.prototype.isMatrix4=!0}constructor(e,t,n,s,r,o,a,l,c,h,d,u,f,p,y,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,l,c,h,d,u,f,p,y,g)}set(e,t,n,s,r,o,a,l,c,h,d,u,f,p,y,g){let m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=s,m[1]=r,m[5]=o,m[9]=a,m[13]=l,m[2]=c,m[6]=h,m[10]=d,m[14]=u,m[3]=f,m[7]=p,m[11]=y,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,s=1/Zi.setFromMatrixColumn(e,0).length(),r=1/Zi.setFromMatrixColumn(e,1).length(),o=1/Zi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){let u=o*h,f=o*d,p=a*h,y=a*d;t[0]=l*h,t[4]=-l*d,t[8]=c,t[1]=f+p*c,t[5]=u-y*c,t[9]=-a*l,t[2]=y-u*c,t[6]=p+f*c,t[10]=o*l}else if(e.order==="YXZ"){let u=l*h,f=l*d,p=c*h,y=c*d;t[0]=u+y*a,t[4]=p*a-f,t[8]=o*c,t[1]=o*d,t[5]=o*h,t[9]=-a,t[2]=f*a-p,t[6]=y+u*a,t[10]=o*l}else if(e.order==="ZXY"){let u=l*h,f=l*d,p=c*h,y=c*d;t[0]=u-y*a,t[4]=-o*d,t[8]=p+f*a,t[1]=f+p*a,t[5]=o*h,t[9]=y-u*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){let u=o*h,f=o*d,p=a*h,y=a*d;t[0]=l*h,t[4]=p*c-f,t[8]=u*c+y,t[1]=l*d,t[5]=y*c+u,t[9]=f*c-p,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){let u=o*l,f=o*c,p=a*l,y=a*c;t[0]=l*h,t[4]=y-u*d,t[8]=p*d+f,t[1]=d,t[5]=o*h,t[9]=-a*h,t[2]=-c*h,t[6]=f*d+p,t[10]=u-y*d}else if(e.order==="XZY"){let u=o*l,f=o*c,p=a*l,y=a*c;t[0]=l*h,t[4]=-d,t[8]=c*h,t[1]=u*d+y,t[5]=o*h,t[9]=f*d-p,t[2]=p*d-f,t[6]=a*h,t[10]=y*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Up,e,Fp)}lookAt(e,t,n){let s=this.elements;return tn.subVectors(e,t),tn.lengthSq()===0&&(tn.z=1),tn.normalize(),ni.crossVectors(n,tn),ni.lengthSq()===0&&(Math.abs(n.z)===1?tn.x+=1e-4:tn.z+=1e-4,tn.normalize(),ni.crossVectors(n,tn)),ni.normalize(),eo.crossVectors(tn,ni),s[0]=ni.x,s[4]=eo.x,s[8]=tn.x,s[1]=ni.y,s[5]=eo.y,s[9]=tn.y,s[2]=ni.z,s[6]=eo.z,s[10]=tn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],f=n[13],p=n[2],y=n[6],g=n[10],m=n[14],C=n[3],w=n[7],_=n[11],S=n[15],M=s[0],A=s[4],v=s[8],T=s[12],I=s[1],P=s[5],F=s[9],q=s[13],$=s[2],O=s[6],X=s[10],B=s[14],G=s[3],Q=s[7],le=s[11],ae=s[15];return r[0]=o*M+a*I+l*$+c*G,r[4]=o*A+a*P+l*O+c*Q,r[8]=o*v+a*F+l*X+c*le,r[12]=o*T+a*q+l*B+c*ae,r[1]=h*M+d*I+u*$+f*G,r[5]=h*A+d*P+u*O+f*Q,r[9]=h*v+d*F+u*X+f*le,r[13]=h*T+d*q+u*B+f*ae,r[2]=p*M+y*I+g*$+m*G,r[6]=p*A+y*P+g*O+m*Q,r[10]=p*v+y*F+g*X+m*le,r[14]=p*T+y*q+g*B+m*ae,r[3]=C*M+w*I+_*$+S*G,r[7]=C*A+w*P+_*O+S*Q,r[11]=C*v+w*F+_*X+S*le,r[15]=C*T+w*q+_*B+S*ae,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],h=e[2],d=e[6],u=e[10],f=e[14],p=e[3],y=e[7],g=e[11],m=e[15],C=l*f-c*u,w=a*f-c*d,_=a*u-l*d,S=o*f-c*h,M=o*u-l*h,A=o*d-a*h;return t*(y*C-g*w+m*_)-n*(p*C-g*S+m*M)+s*(p*w-y*S+m*A)-r*(p*_-y*M+g*A)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],o=e[5],a=e[9],l=e[2],c=e[6],h=e[10];return t*(o*h-a*c)-n*(r*h-a*l)+s*(r*c-o*l)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],d=e[9],u=e[10],f=e[11],p=e[12],y=e[13],g=e[14],m=e[15],C=t*a-n*o,w=t*l-s*o,_=t*c-r*o,S=n*l-s*a,M=n*c-r*a,A=s*c-r*l,v=h*y-d*p,T=h*g-u*p,I=h*m-f*p,P=d*g-u*y,F=d*m-f*y,q=u*m-f*g,$=C*q-w*F+_*P+S*I-M*T+A*v;if($===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let O=1/$;return e[0]=(a*q-l*F+c*P)*O,e[1]=(s*F-n*q-r*P)*O,e[2]=(y*A-g*M+m*S)*O,e[3]=(u*M-d*A-f*S)*O,e[4]=(l*I-o*q-c*T)*O,e[5]=(t*q-s*I+r*T)*O,e[6]=(g*_-p*A-m*w)*O,e[7]=(h*A-u*_+f*w)*O,e[8]=(o*F-a*I+c*v)*O,e[9]=(n*I-t*F-r*v)*O,e[10]=(p*M-y*_+m*C)*O,e[11]=(d*_-h*M-f*C)*O,e[12]=(a*T-o*P-l*v)*O,e[13]=(t*P-n*T+s*v)*O,e[14]=(y*w-p*S-g*C)*O,e[15]=(h*S-d*w+u*C)*O,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,l=e.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+n,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,h=o+o,d=a+a,u=r*c,f=r*h,p=r*d,y=o*h,g=o*d,m=a*d,C=l*c,w=l*h,_=l*d,S=n.x,M=n.y,A=n.z;return s[0]=(1-(y+m))*S,s[1]=(f+_)*S,s[2]=(p-w)*S,s[3]=0,s[4]=(f-_)*M,s[5]=(1-(u+m))*M,s[6]=(g+C)*M,s[7]=0,s[8]=(p+w)*A,s[9]=(g-C)*A,s[10]=(1-(u+y))*A,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let o=Zi.set(s[0],s[1],s[2]).length(),a=Zi.set(s[4],s[5],s[6]).length(),l=Zi.set(s[8],s[9],s[10]).length();r<0&&(o=-o),gn.copy(this);let c=1/o,h=1/a,d=1/l;return gn.elements[0]*=c,gn.elements[1]*=c,gn.elements[2]*=c,gn.elements[4]*=h,gn.elements[5]*=h,gn.elements[6]*=h,gn.elements[8]*=d,gn.elements[9]*=d,gn.elements[10]*=d,t.setFromRotationMatrix(gn),n.x=o,n.y=a,n.z=l,this}makePerspective(e,t,n,s,r,o,a=yn,l=!1){let c=this.elements,h=2*r/(t-e),d=2*r/(n-s),u=(t+e)/(t-e),f=(n+s)/(n-s),p,y;if(l)p=r/(o-r),y=o*r/(o-r);else if(a===yn)p=-(o+r)/(o-r),y=-2*o*r/(o-r);else if(a===us)p=-o/(o-r),y=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=y,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=yn,l=!1){let c=this.elements,h=2/(t-e),d=2/(n-s),u=-(t+e)/(t-e),f=-(n+s)/(n-s),p,y;if(l)p=1/(o-r),y=o/(o-r);else if(a===yn)p=-2/(o-r),y=-(o+r)/(o-r);else if(a===us)p=-1/(o-r),y=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=y,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Zi=new R,gn=new ot,Up=new R(0,0,0),Fp=new R(1,1,1),ni=new R,eo=new R,tn=new R,tu=new ot,nu=new Ht,Zn=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],d=s[2],u=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin($e(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-$e(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin($e(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-$e(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin($e(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-$e(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Ne("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return tu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(tu,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return nu.setFromEuler(this),this.setFromQuaternion(nu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Zn.DEFAULT_ORDER="XYZ";var ms=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Op=0,iu=new R,$i=new Ht,Hn=new ot,to=new R,Ws=new R,Bp=new R,kp=new Ht,su=new R(1,0,0),ru=new R(0,1,0),ou=new R(0,0,1),au={type:"added"},zp={type:"removed"},Ji={type:"childadded",child:null},Wl={type:"childremoved",child:null},It=class i extends bn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Op++}),this.uuid=Nn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new R,t=new Zn,n=new Ht,s=new R(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ot},normalMatrix:{value:new Ge}}),this.matrix=new ot,this.matrixWorld=new ot,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ms,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return $i.setFromAxisAngle(e,t),this.quaternion.multiply($i),this}rotateOnWorldAxis(e,t){return $i.setFromAxisAngle(e,t),this.quaternion.premultiply($i),this}rotateX(e){return this.rotateOnAxis(su,e)}rotateY(e){return this.rotateOnAxis(ru,e)}rotateZ(e){return this.rotateOnAxis(ou,e)}translateOnAxis(e,t){return iu.copy(e).applyQuaternion(this.quaternion),this.position.add(iu.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(su,e)}translateY(e){return this.translateOnAxis(ru,e)}translateZ(e){return this.translateOnAxis(ou,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Hn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?to.copy(e):to.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Ws.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Hn.lookAt(Ws,to,this.up):Hn.lookAt(to,Ws,this.up),this.quaternion.setFromRotationMatrix(Hn),s&&(Hn.extractRotation(s.matrixWorld),$i.setFromRotationMatrix(Hn),this.quaternion.premultiply($i.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Oe("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(au),Ji.child=e,this.dispatchEvent(Ji),Ji.child=null):Oe("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(zp),Wl.child=e,this.dispatchEvent(Wl),Wl.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Hn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Hn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Hn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(au),Ji.child=e,this.dispatchEvent(Ji),Ji.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ws,e,Bp),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ws,kp,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let d=l[c];r(e.shapes,d)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];s.animations.push(r(e.animations,l))}}if(t){let a=o(e.geometries),l=o(e.materials),c=o(e.textures),h=o(e.images),d=o(e.shapes),u=o(e.skeletons),f=o(e.animations),p=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),p.length>0&&(n.nodes=p)}return n.object=s,n;function o(a){let l=[];for(let c in a){let h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}};It.DEFAULT_UP=new R(0,1,0);It.DEFAULT_MATRIX_AUTO_UPDATE=!0;It.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Ot=class extends It{constructor(){super(),this.isGroup=!0,this.type="Group"}},Hp={type:"move"},gs=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ot,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ot,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ot,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(let y of e.hand.values()){let g=t.getJointPose(y,n),m=this._getHandJoint(c,y);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}let h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,p=.005;c.inputState.pinching&&u>f+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=f-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Hp)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Ot;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},md={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ii={h:0,s:0,l:0},no={h:0,s:0,l:0};function Xl(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var qe=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=sn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,tt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=tt.workingColorSpace){return this.r=e,this.g=t,this.b=n,tt.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=tt.workingColorSpace){if(e=Jc(e,1),t=$e(t,0,1),n=$e(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=Xl(o,r,e+1/3),this.g=Xl(o,r,e),this.b=Xl(o,r,e-1/3)}return tt.colorSpaceToWorking(this,s),this}setStyle(e,t=sn){function n(r){r!==void 0&&parseFloat(r)<1&&Ne("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Ne("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);Ne("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=sn){let n=md[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Ne("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=qn(e.r),this.g=qn(e.g),this.b=qn(e.b),this}copyLinearToSRGB(e){return this.r=hs(e.r),this.g=hs(e.g),this.b=hs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=sn){return tt.workingToColorSpace(Wt.copy(this),e),Math.round($e(Wt.r*255,0,255))*65536+Math.round($e(Wt.g*255,0,255))*256+Math.round($e(Wt.b*255,0,255))}getHexString(e=sn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=tt.workingColorSpace){tt.workingToColorSpace(Wt.copy(this),t);let n=Wt.r,s=Wt.g,r=Wt.b,o=Math.max(n,s,r),a=Math.min(n,s,r),l,c,h=(a+o)/2;if(a===o)l=0,c=0;else{let d=o-a;switch(c=h<=.5?d/(o+a):d/(2-o-a),o){case n:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-n)/d+2;break;case r:l=(n-s)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=tt.workingColorSpace){return tt.workingToColorSpace(Wt.copy(this),t),e.r=Wt.r,e.g=Wt.g,e.b=Wt.b,e}getStyle(e=sn){tt.workingToColorSpace(Wt.copy(this),e);let t=Wt.r,n=Wt.g,s=Wt.b;return e!==sn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(ii),this.setHSL(ii.h+e,ii.s+t,ii.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(ii),e.getHSL(no);let n=Qs(ii.h,no.h,t),s=Qs(ii.s,no.s,t),r=Qs(ii.l,no.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Wt=new qe;qe.NAMES=md;var ci=class extends It{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Zn,this.environmentIntensity=1,this.environmentRotation=new Zn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},xn=new R,Vn=new R,ql=new R,Gn=new R,Ki=new R,ji=new R,lu=new R,Yl=new R,Zl=new R,$l=new R,Jl=new bt,Kl=new bt,jl=new bt,Ln=class i{constructor(e=new R,t=new R,n=new R){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),xn.subVectors(e,t),s.cross(xn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){xn.subVectors(s,t),Vn.subVectors(n,t),ql.subVectors(e,t);let o=xn.dot(xn),a=xn.dot(Vn),l=xn.dot(ql),c=Vn.dot(Vn),h=Vn.dot(ql),d=o*c-a*a;if(d===0)return r.set(0,0,0),null;let u=1/d,f=(c*l-a*h)*u,p=(o*h-a*l)*u;return r.set(1-f-p,p,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Gn)===null?!1:Gn.x>=0&&Gn.y>=0&&Gn.x+Gn.y<=1}static getInterpolation(e,t,n,s,r,o,a,l){return this.getBarycoord(e,t,n,s,Gn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Gn.x),l.addScaledVector(o,Gn.y),l.addScaledVector(a,Gn.z),l)}static getInterpolatedAttribute(e,t,n,s,r,o){return Jl.setScalar(0),Kl.setScalar(0),jl.setScalar(0),Jl.fromBufferAttribute(e,t),Kl.fromBufferAttribute(e,n),jl.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(Jl,r.x),o.addScaledVector(Kl,r.y),o.addScaledVector(jl,r.z),o}static isFrontFacing(e,t,n,s){return xn.subVectors(n,t),Vn.subVectors(e,t),xn.cross(Vn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return xn.subVectors(this.c,this.b),Vn.subVectors(this.a,this.b),xn.cross(Vn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,o,a;Ki.subVectors(s,n),ji.subVectors(r,n),Yl.subVectors(e,n);let l=Ki.dot(Yl),c=ji.dot(Yl);if(l<=0&&c<=0)return t.copy(n);Zl.subVectors(e,s);let h=Ki.dot(Zl),d=ji.dot(Zl);if(h>=0&&d<=h)return t.copy(s);let u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return o=l/(l-h),t.copy(n).addScaledVector(Ki,o);$l.subVectors(e,r);let f=Ki.dot($l),p=ji.dot($l);if(p>=0&&f<=p)return t.copy(r);let y=f*c-l*p;if(y<=0&&c>=0&&p<=0)return a=c/(c-p),t.copy(n).addScaledVector(ji,a);let g=h*p-f*d;if(g<=0&&d-h>=0&&f-p>=0)return lu.subVectors(r,s),a=(d-h)/(d-h+(f-p)),t.copy(s).addScaledVector(lu,a);let m=1/(g+y+u);return o=y*m,a=u*m,t.copy(n).addScaledVector(Ki,o).addScaledVector(ji,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Mn=class{constructor(e=new R(1/0,1/0,1/0),t=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(_n.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(_n.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=_n.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,_n):_n.fromBufferAttribute(r,o),_n.applyMatrix4(e.matrixWorld),this.expandByPoint(_n);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),io.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),io.copy(n.boundingBox)),io.applyMatrix4(e.matrixWorld),this.union(io)}let s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,_n),_n.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Xs),so.subVectors(this.max,Xs),Qi.subVectors(e.a,Xs),es.subVectors(e.b,Xs),ts.subVectors(e.c,Xs),si.subVectors(es,Qi),ri.subVectors(ts,es),Ci.subVectors(Qi,ts);let t=[0,-si.z,si.y,0,-ri.z,ri.y,0,-Ci.z,Ci.y,si.z,0,-si.x,ri.z,0,-ri.x,Ci.z,0,-Ci.x,-si.y,si.x,0,-ri.y,ri.x,0,-Ci.y,Ci.x,0];return!Ql(t,Qi,es,ts,so)||(t=[1,0,0,0,1,0,0,0,1],!Ql(t,Qi,es,ts,so))?!1:(ro.crossVectors(si,ri),t=[ro.x,ro.y,ro.z],Ql(t,Qi,es,ts,so))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,_n).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(_n).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Wn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Wn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Wn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Wn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Wn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Wn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Wn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Wn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Wn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Wn=[new R,new R,new R,new R,new R,new R,new R,new R],_n=new R,io=new Mn,Qi=new R,es=new R,ts=new R,si=new R,ri=new R,Ci=new R,Xs=new R,so=new R,ro=new R,Ri=new R;function Ql(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Ri.fromArray(i,r);let a=s.x*Math.abs(Ri.x)+s.y*Math.abs(Ri.y)+s.z*Math.abs(Ri.z),l=e.dot(Ri),c=t.dot(Ri),h=n.dot(Ri);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}var Pt=new R,oo=new ne,Vp=0,yt=class extends bn{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Vp++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=qo,this.updateRanges=[],this.gpuType=Tn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)oo.fromBufferAttribute(this,t),oo.applyMatrix3(e),this.setXY(t,oo.x,oo.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Pt.fromBufferAttribute(this,t),Pt.applyMatrix3(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Pt.fromBufferAttribute(this,t),Pt.applyMatrix4(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Pt.fromBufferAttribute(this,t),Pt.applyNormalMatrix(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Pt.fromBufferAttribute(this,t),Pt.transformDirection(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=vn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=at(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=vn(t,this.array)),t}setX(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=vn(t,this.array)),t}setY(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=vn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=vn(t,this.array)),t}setW(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=at(t,this.array),n=at(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=at(t,this.array),n=at(n,this.array),s=at(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=at(t,this.array),n=at(n,this.array),s=at(s,this.array),r=at(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==qo&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}};var lr=class extends yt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var cr=class extends yt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var St=class extends yt{constructor(e,t,n){super(new Float32Array(e),t,n)}},Gp=new Mn,qs=new R,ec=new R,hi=class{constructor(e=new R,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Gp.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;qs.subVectors(e,this.center);let t=qs.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(qs,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ec.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(qs.copy(e.center).add(ec)),this.expandByPoint(qs.copy(e.center).sub(ec))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Wp=0,un=new ot,tc=new It,ns=new R,nn=new Mn,Ys=new Mn,Ft=new R,lt=class i extends bn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Wp++}),this.uuid=Nn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(pp(e)?cr:lr)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Ge().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return un.makeRotationFromQuaternion(e),this.applyMatrix4(un),this}rotateX(e){return un.makeRotationX(e),this.applyMatrix4(un),this}rotateY(e){return un.makeRotationY(e),this.applyMatrix4(un),this}rotateZ(e){return un.makeRotationZ(e),this.applyMatrix4(un),this}translate(e,t,n){return un.makeTranslation(e,t,n),this.applyMatrix4(un),this}scale(e,t,n){return un.makeScale(e,t,n),this.applyMatrix4(un),this}lookAt(e){return tc.lookAt(e),tc.updateMatrix(),this.applyMatrix4(tc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ns).negate(),this.translate(ns.x,ns.y,ns.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let o=e[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new St(n,3))}else{let n=Math.min(e.length,t.count);for(let s=0;s<n;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Ne("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Mn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Oe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];nn.setFromBufferAttribute(r),this.morphTargetsRelative?(Ft.addVectors(this.boundingBox.min,nn.min),this.boundingBox.expandByPoint(Ft),Ft.addVectors(this.boundingBox.max,nn.max),this.boundingBox.expandByPoint(Ft)):(this.boundingBox.expandByPoint(nn.min),this.boundingBox.expandByPoint(nn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Oe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new hi);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Oe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new R,1/0);return}if(e){let n=this.boundingSphere.center;if(nn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){let a=t[r];Ys.setFromBufferAttribute(a),this.morphTargetsRelative?(Ft.addVectors(nn.min,Ys.min),nn.expandByPoint(Ft),Ft.addVectors(nn.max,Ys.max),nn.expandByPoint(Ft)):(nn.expandByPoint(Ys.min),nn.expandByPoint(Ys.max))}nn.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)Ft.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Ft));if(t)for(let r=0,o=t.length;r<o;r++){let a=t[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Ft.fromBufferAttribute(a,c),l&&(ns.fromBufferAttribute(e,c),Ft.add(ns)),s=Math.max(s,n.distanceToSquared(Ft))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Oe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Oe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==n.count)&&(o=new yt(new Float32Array(4*n.count),4),this.setAttribute("tangent",o));let a=[],l=[];for(let v=0;v<n.count;v++)a[v]=new R,l[v]=new R;let c=new R,h=new R,d=new R,u=new ne,f=new ne,p=new ne,y=new R,g=new R;function m(v,T,I){c.fromBufferAttribute(n,v),h.fromBufferAttribute(n,T),d.fromBufferAttribute(n,I),u.fromBufferAttribute(r,v),f.fromBufferAttribute(r,T),p.fromBufferAttribute(r,I),h.sub(c),d.sub(c),f.sub(u),p.sub(u);let P=1/(f.x*p.y-p.x*f.y);isFinite(P)&&(y.copy(h).multiplyScalar(p.y).addScaledVector(d,-f.y).multiplyScalar(P),g.copy(d).multiplyScalar(f.x).addScaledVector(h,-p.x).multiplyScalar(P),a[v].add(y),a[T].add(y),a[I].add(y),l[v].add(g),l[T].add(g),l[I].add(g))}let C=this.groups;C.length===0&&(C=[{start:0,count:e.count}]);for(let v=0,T=C.length;v<T;++v){let I=C[v],P=I.start,F=I.count;for(let q=P,$=P+F;q<$;q+=3)m(e.getX(q+0),e.getX(q+1),e.getX(q+2))}let w=new R,_=new R,S=new R,M=new R;function A(v){S.fromBufferAttribute(s,v),M.copy(S);let T=a[v];w.copy(T),w.sub(S.multiplyScalar(S.dot(T))).normalize(),_.crossVectors(M,T);let P=_.dot(l[v])<0?-1:1;o.setXYZW(v,w.x,w.y,w.z,P)}for(let v=0,T=C.length;v<T;++v){let I=C[v],P=I.start,F=I.count;for(let q=P,$=P+F;q<$;q+=3)A(e.getX(q+0)),A(e.getX(q+1)),A(e.getX(q+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new yt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);let s=new R,r=new R,o=new R,a=new R,l=new R,c=new R,h=new R,d=new R;if(e)for(let u=0,f=e.count;u<f;u+=3){let p=e.getX(u+0),y=e.getX(u+1),g=e.getX(u+2);s.fromBufferAttribute(t,p),r.fromBufferAttribute(t,y),o.fromBufferAttribute(t,g),h.subVectors(o,r),d.subVectors(s,r),h.cross(d),a.fromBufferAttribute(n,p),l.fromBufferAttribute(n,y),c.fromBufferAttribute(n,g),a.add(h),l.add(h),c.add(h),n.setXYZ(p,a.x,a.y,a.z),n.setXYZ(y,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let u=0,f=t.count;u<f;u+=3)s.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),o.fromBufferAttribute(t,u+2),h.subVectors(o,r),d.subVectors(s,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ft.fromBufferAttribute(e,t),Ft.normalize(),e.setXYZ(t,Ft.x,Ft.y,Ft.z)}toNonIndexed(){function e(a,l){let c=a.array,h=a.itemSize,d=a.normalized,u=new c.constructor(l.length*h),f=0,p=0;for(let y=0,g=l.length;y<g;y++){a.isInterleavedBufferAttribute?f=l[y]*a.data.stride+a.offset:f=l[y]*h;for(let m=0;m<h;m++)u[p++]=c[f++]}return new yt(u,h,d)}if(this.index===null)return Ne("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let a in s){let l=s[a],c=e(l,n);t.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let h=0,d=c.length;h<d;h++){let u=c[h],f=e(u,n);l.push(f)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){let f=c[d];h.push(f.toJSON(e.data))}h.length>0&&(s[l]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let s=e.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(t))}let r=e.morphAttributes;for(let c in r){let h=[],d=r[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let c=0,h=o.length;c<h;c++){let d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},Jo=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=qo,this.updateRanges=[],this.version=0,this.uuid=Nn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Nn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Nn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Yt=new R,hr=class i{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Yt.fromBufferAttribute(this,t),Yt.applyMatrix4(e),this.setXYZ(t,Yt.x,Yt.y,Yt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Yt.fromBufferAttribute(this,t),Yt.applyNormalMatrix(e),this.setXYZ(t,Yt.x,Yt.y,Yt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Yt.fromBufferAttribute(this,t),Yt.transformDirection(e),this.setXYZ(t,Yt.x,Yt.y,Yt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=vn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=at(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=vn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=vn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=vn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=vn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=at(t,this.array),n=at(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=at(t,this.array),n=at(n,this.array),s=at(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=at(t,this.array),n=at(n,this.array),s=at(s,this.array),r=at(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){or("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new yt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){or("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Xp=0,Sn=class extends bn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Xp++}),this.uuid=Nn(),this.name="",this.type="Material",this.blending=Ui,this.side=Yn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=No,this.blendDst=Uo,this.blendEquation=li,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new qe(0,0,0),this.blendAlpha=0,this.depthFunc=Fi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=_c,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Li,this.stencilZFail=Li,this.stencilZPass=Li,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){Ne(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Ne(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ui&&(n.blending=this.blending),this.side!==Yn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==No&&(n.blendSrc=this.blendSrc),this.blendDst!==Uo&&(n.blendDst=this.blendDst),this.blendEquation!==li&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Fi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==_c&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Li&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Li&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Li&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(t){let r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new qe().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new ne().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ne().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},xs=class extends Sn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new qe(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},is,Zs=new R,ss=new R,rs=new R,os=new ne,$s=new ne,gd=new ot,ao=new R,Js=new R,lo=new R,cu=new ne,nc=new ne,hu=new ne,ur=class extends It{constructor(e=new xs){if(super(),this.isSprite=!0,this.type="Sprite",is===void 0){is=new lt;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Jo(t,5);is.setIndex([0,1,2,0,2,3]),is.setAttribute("position",new hr(n,3,0,!1)),is.setAttribute("uv",new hr(n,2,3,!1))}this.geometry=is,this.material=e,this.center=new ne(.5,.5),this.count=1}raycast(e,t){e.camera===null&&Oe('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),ss.setFromMatrixScale(this.matrixWorld),gd.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),rs.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ss.multiplyScalar(-rs.z);let n=this.material.rotation,s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));let o=this.center;co(ao.set(-.5,-.5,0),rs,o,ss,s,r),co(Js.set(.5,-.5,0),rs,o,ss,s,r),co(lo.set(.5,.5,0),rs,o,ss,s,r),cu.set(0,0),nc.set(1,0),hu.set(1,1);let a=e.ray.intersectTriangle(ao,Js,lo,!1,Zs);if(a===null&&(co(Js.set(-.5,.5,0),rs,o,ss,s,r),nc.set(0,1),a=e.ray.intersectTriangle(ao,lo,Js,!1,Zs),a===null))return;let l=e.ray.origin.distanceTo(Zs);l<e.near||l>e.far||t.push({distance:l,point:Zs.clone(),uv:Ln.getInterpolation(Zs,ao,Js,lo,cu,nc,hu,new ne),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function co(i,e,t,n,s,r){os.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?($s.x=r*os.x-s*os.y,$s.y=s*os.x+r*os.y):$s.copy(os),i.copy(e),i.x+=$s.x,i.y+=$s.y,i.applyMatrix4(gd)}var Xn=new R,ic=new R,ho=new R,oi=new R,sc=new R,uo=new R,rc=new R,$n=class{constructor(e=new R,t=new R(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Xn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Xn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Xn.copy(this.origin).addScaledVector(this.direction,t),Xn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){ic.copy(e).add(t).multiplyScalar(.5),ho.copy(t).sub(e).normalize(),oi.copy(this.origin).sub(ic);let r=e.distanceTo(t)*.5,o=-this.direction.dot(ho),a=oi.dot(this.direction),l=-oi.dot(ho),c=oi.lengthSq(),h=Math.abs(1-o*o),d,u,f,p;if(h>0)if(d=o*l-a,u=o*a-l,p=r*h,d>=0)if(u>=-p)if(u<=p){let y=1/h;d*=y,u*=y,f=d*(d+o*u+2*a)+u*(o*d+u+2*l)+c}else u=r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;else u<=-p?(d=Math.max(0,-(-o*r+a)),u=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c):u<=p?(d=0,u=Math.min(Math.max(-r,-l),r),f=u*(u+2*l)+c):(d=Math.max(0,-(o*r+a)),u=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c);else u=o>0?-r:r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(ic).addScaledVector(ho,u),f}intersectSphere(e,t){Xn.subVectors(e.center,this.origin);let n=Xn.dot(this.direction),s=Xn.dot(Xn)-n*n,r=e.radius*e.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,l,c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(e.min.x-u.x)*c,s=(e.max.x-u.x)*c):(n=(e.max.x-u.x)*c,s=(e.min.x-u.x)*c),h>=0?(r=(e.min.y-u.y)*h,o=(e.max.y-u.y)*h):(r=(e.max.y-u.y)*h,o=(e.min.y-u.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),d>=0?(a=(e.min.z-u.z)*d,l=(e.max.z-u.z)*d):(a=(e.max.z-u.z)*d,l=(e.min.z-u.z)*d),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Xn)!==null}intersectTriangle(e,t,n,s,r){sc.subVectors(t,e),uo.subVectors(n,e),rc.crossVectors(sc,uo);let o=this.direction.dot(rc),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;oi.subVectors(this.origin,e);let l=a*this.direction.dot(uo.crossVectors(oi,uo));if(l<0)return null;let c=a*this.direction.dot(sc.cross(oi));if(c<0||l+c>o)return null;let h=-a*oi.dot(rc);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Jt=class extends Sn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new qe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Zn,this.combine=Dc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},uu=new ot,Pi=new $n,fo=new hi,du=new R,po=new R,mo=new R,go=new R,oc=new R,xo=new R,fu=new R,_o=new R,Ct=class extends It{constructor(e=new lt,t=new Jt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let a=this.morphTargetInfluences;if(r&&a){xo.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=a[l],d=r[l];h!==0&&(oc.fromBufferAttribute(d,e),o?xo.addScaledVector(oc,h):xo.addScaledVector(oc.sub(t),h))}t.add(xo)}return t}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),fo.copy(n.boundingSphere),fo.applyMatrix4(r),Pi.copy(e.ray).recast(e.near),!(fo.containsPoint(Pi.origin)===!1&&(Pi.intersectSphere(fo,du)===null||Pi.origin.distanceToSquared(du)>(e.far-e.near)**2))&&(uu.copy(r).invert(),Pi.copy(e.ray).applyMatrix4(uu),!(n.boundingBox!==null&&Pi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Pi)))}_computeIntersections(e,t,n){let s,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let p=0,y=u.length;p<y;p++){let g=u[p],m=o[g.materialIndex],C=Math.max(g.start,f.start),w=Math.min(a.count,Math.min(g.start+g.count,f.start+f.count));for(let _=C,S=w;_<S;_+=3){let M=a.getX(_),A=a.getX(_+1),v=a.getX(_+2);s=vo(this,m,e,n,c,h,d,M,A,v),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{let p=Math.max(0,f.start),y=Math.min(a.count,f.start+f.count);for(let g=p,m=y;g<m;g+=3){let C=a.getX(g),w=a.getX(g+1),_=a.getX(g+2);s=vo(this,o,e,n,c,h,d,C,w,_),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let p=0,y=u.length;p<y;p++){let g=u[p],m=o[g.materialIndex],C=Math.max(g.start,f.start),w=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let _=C,S=w;_<S;_+=3){let M=_,A=_+1,v=_+2;s=vo(this,m,e,n,c,h,d,M,A,v),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{let p=Math.max(0,f.start),y=Math.min(l.count,f.start+f.count);for(let g=p,m=y;g<m;g+=3){let C=g,w=g+1,_=g+2;s=vo(this,o,e,n,c,h,d,C,w,_),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}}};function qp(i,e,t,n,s,r,o,a){let l;if(e.side===$t?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,e.side===Yn,a),l===null)return null;_o.copy(a),_o.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo(_o);return c<t.near||c>t.far?null:{distance:c,point:_o.clone(),object:i}}function vo(i,e,t,n,s,r,o,a,l,c){i.getVertexPosition(a,po),i.getVertexPosition(l,mo),i.getVertexPosition(c,go);let h=qp(i,e,t,n,po,mo,go,fu);if(h){let d=new R;Ln.getBarycoord(fu,po,mo,go,d),s&&(h.uv=Ln.getInterpolatedAttribute(s,a,l,c,d,new ne)),r&&(h.uv1=Ln.getInterpolatedAttribute(r,a,l,c,d,new ne)),o&&(h.normal=Ln.getInterpolatedAttribute(o,a,l,c,d,new R),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a,b:l,c,normal:new R,materialIndex:0};Ln.getNormal(po,mo,go,u.normal),h.face=u,h.barycoord=d}return h}var Ko=class extends Zt{constructor(e=null,t=1,n=1,s,r,o,a,l,c=Bt,h=Bt,d,u){super(null,o,a,l,c,h,s,r,d,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var ac=new R,Yp=new R,Zp=new Ge,dn=class{constructor(e=new R(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=ac.subVectors(n,t).cross(Yp.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let s=e.delta(ac),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let o=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(o<0||o>1)?null:t.copy(e.start).addScaledVector(s,o)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Zp.getNormalMatrix(e),s=this.coplanarPoint(ac).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Ii=new hi,$p=new ne(.5,.5),yo=new R,_s=class{constructor(e=new dn,t=new dn,n=new dn,s=new dn,r=new dn,o=new dn){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=yn,n=!1){let s=this.planes,r=e.elements,o=r[0],a=r[1],l=r[2],c=r[3],h=r[4],d=r[5],u=r[6],f=r[7],p=r[8],y=r[9],g=r[10],m=r[11],C=r[12],w=r[13],_=r[14],S=r[15];if(s[0].setComponents(c-o,f-h,m-p,S-C).normalize(),s[1].setComponents(c+o,f+h,m+p,S+C).normalize(),s[2].setComponents(c+a,f+d,m+y,S+w).normalize(),s[3].setComponents(c-a,f-d,m-y,S-w).normalize(),n)s[4].setComponents(l,u,g,_).normalize(),s[5].setComponents(c-l,f-u,m-g,S-_).normalize();else if(s[4].setComponents(c-l,f-u,m-g,S-_).normalize(),t===yn)s[5].setComponents(c+l,f+u,m+g,S+_).normalize();else if(t===us)s[5].setComponents(l,u,g,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ii.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ii.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ii)}intersectsSprite(e){Ii.center.set(0,0,0);let t=$p.distanceTo(e.center);return Ii.radius=.7071067811865476+t,Ii.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ii)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(yo.x=s.normal.x>0?e.max.x:e.min.x,yo.y=s.normal.y>0?e.max.y:e.min.y,yo.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(yo)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var fn=class extends Sn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new qe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},jo=new R,Qo=new R,pu=new ot,Ks=new $n,bo=new hi,lc=new R,mu=new R,ea=class extends It{constructor(e=new lt,t=new fn){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)jo.fromBufferAttribute(t,s-1),Qo.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=jo.distanceTo(Qo);e.setAttribute("lineDistance",new St(n,1))}else Ne("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),bo.copy(n.boundingSphere),bo.applyMatrix4(s),bo.radius+=r,e.ray.intersectsSphere(bo)===!1)return;pu.copy(s).invert(),Ks.copy(e.ray).applyMatrix4(pu);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){let f=Math.max(0,o.start),p=Math.min(h.count,o.start+o.count);for(let y=f,g=p-1;y<g;y+=c){let m=h.getX(y),C=h.getX(y+1),w=Mo(this,e,Ks,l,m,C,y);w&&t.push(w)}if(this.isLineLoop){let y=h.getX(p-1),g=h.getX(f),m=Mo(this,e,Ks,l,y,g,p-1);m&&t.push(m)}}else{let f=Math.max(0,o.start),p=Math.min(u.count,o.start+o.count);for(let y=f,g=p-1;y<g;y+=c){let m=Mo(this,e,Ks,l,y,y+1,y);m&&t.push(m)}if(this.isLineLoop){let y=Mo(this,e,Ks,l,p-1,f,p-1);y&&t.push(y)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Mo(i,e,t,n,s,r,o){let a=i.geometry.attributes.position;if(jo.fromBufferAttribute(a,s),Qo.fromBufferAttribute(a,r),t.distanceSqToSegment(jo,Qo,lc,mu)>n)return;lc.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(lc);if(!(c<e.near||c>e.far))return{distance:c,point:mu.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}var gu=new R,xu=new R,pn=class extends ea{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)gu.fromBufferAttribute(t,s),xu.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+gu.distanceTo(xu);e.setAttribute("lineDistance",new St(n,1))}else Ne("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var vs=class extends Sn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new qe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},_u=new ot,vc=new $n,So=new hi,Eo=new R,dr=class extends It{constructor(e=new lt,t=new vs){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),So.copy(n.boundingSphere),So.applyMatrix4(s),So.radius+=r,e.ray.intersectsSphere(So)===!1)return;_u.copy(s).invert(),vc.copy(e.ray).applyMatrix4(_u);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,d=n.attributes.position;if(c!==null){let u=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let p=u,y=f;p<y;p++){let g=c.getX(p);Eo.fromBufferAttribute(d,g),vu(Eo,g,l,s,e,t,this)}}else{let u=Math.max(0,o.start),f=Math.min(d.count,o.start+o.count);for(let p=u,y=f;p<y;p++)Eo.fromBufferAttribute(d,p),vu(Eo,p,l,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function vu(i,e,t,n,s,r,o){let a=vc.distanceSqToPoint(i);if(a<t){let l=new R;vc.closestPointToPoint(i,l),l.applyMatrix4(n);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}var fr=class extends Zt{constructor(e=[],t=yi,n,s,r,o,a,l,c,h){super(e,t,n,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},ui=class extends Zt{constructor(e,t,n,s,r,o,a,l,c){super(e,t,n,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Jn=class extends Zt{constructor(e,t,n=wn,s,r,o,a=Bt,l=Bt,c,h=Un,d=1){if(h!==Un&&h!==Mi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:e,height:t,depth:d};super(u,s,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new ps(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},ta=class extends Jn{constructor(e,t=wn,n=yi,s,r,o=Bt,a=Bt,l,c=Un){let h={width:e,height:e,depth:1},d=[h,h,h,h,h,h];super(e,e,t,n,s,r,o,a,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},pr=class extends Zt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},ys=class i extends lt{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],h=[],d=[],u=0,f=0;p("z","y","x",-1,-1,n,t,e,o,r,0),p("z","y","x",1,-1,n,t,-e,o,r,1),p("x","z","y",1,1,e,n,t,s,o,2),p("x","z","y",1,-1,e,n,-t,s,o,3),p("x","y","z",1,-1,e,t,n,s,r,4),p("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new St(c,3)),this.setAttribute("normal",new St(h,3)),this.setAttribute("uv",new St(d,2));function p(y,g,m,C,w,_,S,M,A,v,T){let I=_/A,P=S/v,F=_/2,q=S/2,$=M/2,O=A+1,X=v+1,B=0,G=0,Q=new R;for(let le=0;le<X;le++){let ae=le*P-q;for(let Me=0;Me<O;Me++){let je=Me*I-F;Q[y]=je*C,Q[g]=ae*w,Q[m]=$,c.push(Q.x,Q.y,Q.z),Q[y]=0,Q[g]=0,Q[m]=M>0?1:-1,h.push(Q.x,Q.y,Q.z),d.push(Me/A),d.push(1-le/v),B+=1}}for(let le=0;le<v;le++)for(let ae=0;ae<A;ae++){let Me=u+ae+O*le,je=u+ae+O*(le+1),ft=u+(ae+1)+O*(le+1),nt=u+(ae+1)+O*le;l.push(Me,je,nt),l.push(je,ft,nt),G+=6}a.addGroup(f,G,T),f+=G,u+=B}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var wo=new R,To=new R,cc=new R,Ao=new Ln,mr=class extends lt{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let s=Math.pow(10,4),r=Math.cos(cs*t),o=e.getIndex(),a=e.getAttribute("position"),l=o?o.count:a.count,c=[0,0,0],h=["a","b","c"],d=new Array(3),u={},f=[];for(let p=0;p<l;p+=3){o?(c[0]=o.getX(p),c[1]=o.getX(p+1),c[2]=o.getX(p+2)):(c[0]=p,c[1]=p+1,c[2]=p+2);let{a:y,b:g,c:m}=Ao;if(y.fromBufferAttribute(a,c[0]),g.fromBufferAttribute(a,c[1]),m.fromBufferAttribute(a,c[2]),Ao.getNormal(cc),d[0]=`${Math.round(y.x*s)},${Math.round(y.y*s)},${Math.round(y.z*s)}`,d[1]=`${Math.round(g.x*s)},${Math.round(g.y*s)},${Math.round(g.z*s)}`,d[2]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,!(d[0]===d[1]||d[1]===d[2]||d[2]===d[0]))for(let C=0;C<3;C++){let w=(C+1)%3,_=d[C],S=d[w],M=Ao[h[C]],A=Ao[h[w]],v=`${_}_${S}`,T=`${S}_${_}`;T in u&&u[T]?(cc.dot(u[T].normal)<=r&&(f.push(M.x,M.y,M.z),f.push(A.x,A.y,A.z)),u[T]=null):v in u||(u[v]={index0:c[C],index1:c[w],normal:cc.clone()})}}for(let p in u)if(u[p]){let{index0:y,index1:g}=u[p];wo.fromBufferAttribute(a,y),To.fromBufferAttribute(a,g),f.push(wo.x,wo.y,wo.z),f.push(To.x,To.y,To.z)}this.setAttribute("position",new St(f,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}},on=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ne("Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,s=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),s=0,r=n.length,o;t?o=t:o=e*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=n[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===o)return s/(r-1);let h=n[s],u=n[s+1]-h,f=(o-h)/u;return(s+f)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),a=this.getPoint(r),l=t||(o.isVector2?new ne:new R);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new R,s=[],r=[],o=[],a=new R,l=new ot;for(let f=0;f<=e;f++){let p=f/e;s[f]=this.getTangentAt(p,new R)}r[0]=new R,o[0]=new R;let c=Number.MAX_VALUE,h=Math.abs(s[0].x),d=Math.abs(s[0].y),u=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),u<=c&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(s[f-1],s[f]),a.length()>Number.EPSILON){a.normalize();let p=Math.acos($e(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,p))}o[f].crossVectors(s[f],r[f])}if(t===!0){let f=Math.acos($e(r[0].dot(r[e]),-1,1));f/=e,s[0].dot(a.crossVectors(r[0],r[e]))>0&&(f=-f);for(let p=1;p<=e;p++)r[p].applyMatrix4(l.makeRotationAxis(s[p],f*p)),o[p].crossVectors(s[p],r[p])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},bs=class extends on{constructor(e=0,t=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t=new ne){let n=t,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);let a=this.aStartAngle+e*r,l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=l-this.aX,f=c-this.aY;l=u*h-f*d+this.aX,c=u*d+f*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},na=class extends bs{constructor(e,t,n,s,r,o){super(e,t,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function jc(){let i=0,e=0,t=0,n=0;function s(r,o,a,l){i=r,e=a,t=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,d){let u=(o-r)/c-(a-r)/(c+h)+(a-o)/h,f=(a-o)/h-(l-o)/(h+d)+(l-a)/d;u*=h,f*=h,s(o,a,u,f)},calc:function(r){let o=r*r,a=o*r;return i+e*r+t*o+n*a}}}var yu=new R,bu=new R,hc=new jc,uc=new jc,dc=new jc,ia=class extends on{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new R){let n=t,s=this.points,r=s.length,o=(r-(this.closed?0:1))*e,a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=s[(a-1)%r]:(bu.subVectors(s[0],s[1]).add(s[0]),c=bu);let d=s[a%r],u=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(yu.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=yu),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,p=Math.pow(c.distanceToSquared(d),f),y=Math.pow(d.distanceToSquared(u),f),g=Math.pow(u.distanceToSquared(h),f);y<1e-4&&(y=1),p<1e-4&&(p=y),g<1e-4&&(g=y),hc.initNonuniformCatmullRom(c.x,d.x,u.x,h.x,p,y,g),uc.initNonuniformCatmullRom(c.y,d.y,u.y,h.y,p,y,g),dc.initNonuniformCatmullRom(c.z,d.z,u.z,h.z,p,y,g)}else this.curveType==="catmullrom"&&(hc.initCatmullRom(c.x,d.x,u.x,h.x,this.tension),uc.initCatmullRom(c.y,d.y,u.y,h.y,this.tension),dc.initCatmullRom(c.z,d.z,u.z,h.z,this.tension));return n.set(hc.calc(l),uc.calc(l),dc.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new R().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Mu(i,e,t,n,s){let r=(n-e)*.5,o=(s-t)*.5,a=i*i,l=i*a;return(2*t-2*n+r+o)*l+(-3*t+3*n-2*r-o)*a+r*i+t}function Jp(i,e){let t=1-i;return t*t*e}function Kp(i,e){return 2*(1-i)*i*e}function jp(i,e){return i*i*e}function er(i,e,t,n){return Jp(i,e)+Kp(i,t)+jp(i,n)}function Qp(i,e){let t=1-i;return t*t*t*e}function em(i,e){let t=1-i;return 3*t*t*i*e}function tm(i,e){return 3*(1-i)*i*i*e}function nm(i,e){return i*i*i*e}function tr(i,e,t,n,s){return Qp(i,e)+em(i,t)+tm(i,n)+nm(i,s)}var gr=class extends on{constructor(e=new ne,t=new ne,n=new ne,s=new ne){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new ne){let n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(tr(e,s.x,r.x,o.x,a.x),tr(e,s.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},sa=class extends on{constructor(e=new R,t=new R,n=new R,s=new R){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new R){let n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(tr(e,s.x,r.x,o.x,a.x),tr(e,s.y,r.y,o.y,a.y),tr(e,s.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},xr=class extends on{constructor(e=new ne,t=new ne){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ne){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ne){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ra=class extends on{constructor(e=new R,t=new R){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new R){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new R){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},_r=class extends on{constructor(e=new ne,t=new ne,n=new ne){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ne){let n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(er(e,s.x,r.x,o.x),er(e,s.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},oa=class extends on{constructor(e=new R,t=new R,n=new R){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new R){let n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(er(e,s.x,r.x,o.x),er(e,s.y,r.y,o.y),er(e,s.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},vr=class extends on{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ne){let n=t,s=this.points,r=(s.length-1)*e,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],c=s[o],h=s[o>s.length-2?s.length-1:o+1],d=s[o>s.length-3?s.length-1:o+2];return n.set(Mu(a,l.x,c.x,h.x,d.x),Mu(a,l.y,c.y,h.y,d.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new ne().fromArray(s))}return this}},yc=Object.freeze({__proto__:null,ArcCurve:na,CatmullRomCurve3:ia,CubicBezierCurve:gr,CubicBezierCurve3:sa,EllipseCurve:bs,LineCurve:xr,LineCurve3:ra,QuadraticBezierCurve:_r,QuadraticBezierCurve3:oa,SplineCurve:vr}),aa=class extends on{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new yc[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let o=s[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let s=0,r=this.curves;s<r.length;s++){let o=r[s],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(new yc[s.type]().fromJSON(s))}return this}},Oi=class extends aa{constructor(e){super(),this.type="Path",this.currentPoint=new ne,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new xr(this.currentPoint.clone(),new ne(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){let r=new _r(this.currentPoint.clone(),new ne(e,t),new ne(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,o){let a=new gr(this.currentPoint.clone(),new ne(e,t),new ne(n,s),new ne(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new vr(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,o){let a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,t+l,n,s,r,o),this}absarc(e,t,n,s,r,o){return this.absellipse(e,t,n,n,s,r,o),this}ellipse(e,t,n,s,r,o,a,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,s,r,o,a,l),this}absellipse(e,t,n,s,r,o,a,l){let c=new bs(e,t,n,s,r,o,a,l);if(this.curves.length>0){let d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},Ms=class extends Oi{constructor(e){super(e),this.uuid=Nn(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(new Oi().fromJSON(s))}return this}};function im(i,e,t=2){let n=e&&e.length,s=n?e[0]*t:i.length,r=xd(i,0,s,t,!0),o=[];if(!r||r.next===r.prev)return o;let a,l,c;if(n&&(r=lm(i,e,r,t)),i.length>80*t){a=i[0],l=i[1];let h=a,d=l;for(let u=t;u<s;u+=t){let f=i[u],p=i[u+1];f<a&&(a=f),p<l&&(l=p),f>h&&(h=f),p>d&&(d=p)}c=Math.max(h-a,d-l),c=c!==0?32767/c:0}return yr(r,o,t,a,l,c,0),o}function xd(i,e,t,n,s){let r;if(s===vm(i,e,t,n)>0)for(let o=e;o<t;o+=n)r=Su(o/n|0,i[o],i[o+1],r);else for(let o=t-n;o>=e;o-=n)r=Su(o/n|0,i[o],i[o+1],r);return r&&Ss(r,r.next)&&(Mr(r),r=r.next),r}function Bi(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(Ss(t,t.next)||Mt(t.prev,t,t.next)===0)){if(Mr(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function yr(i,e,t,n,s,r,o){if(!i)return;!o&&r&&fm(i,n,s,r);let a=i;for(;i.prev!==i.next;){let l=i.prev,c=i.next;if(r?rm(i,n,s,r):sm(i)){e.push(l.i,i.i,c.i),Mr(i),i=c.next,a=c.next;continue}if(i=c,i===a){o?o===1?(i=om(Bi(i),e),yr(i,e,t,n,s,r,2)):o===2&&am(i,e,t,n,s,r):yr(Bi(i),e,t,n,s,r,1);break}}}function sm(i){let e=i.prev,t=i,n=i.next;if(Mt(e,t,n)>=0)return!1;let s=e.x,r=t.x,o=n.x,a=e.y,l=t.y,c=n.y,h=Math.min(s,r,o),d=Math.min(a,l,c),u=Math.max(s,r,o),f=Math.max(a,l,c),p=n.next;for(;p!==e;){if(p.x>=h&&p.x<=u&&p.y>=d&&p.y<=f&&js(s,a,r,l,o,c,p.x,p.y)&&Mt(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function rm(i,e,t,n){let s=i.prev,r=i,o=i.next;if(Mt(s,r,o)>=0)return!1;let a=s.x,l=r.x,c=o.x,h=s.y,d=r.y,u=o.y,f=Math.min(a,l,c),p=Math.min(h,d,u),y=Math.max(a,l,c),g=Math.max(h,d,u),m=bc(f,p,e,t,n),C=bc(y,g,e,t,n),w=i.prevZ,_=i.nextZ;for(;w&&w.z>=m&&_&&_.z<=C;){if(w.x>=f&&w.x<=y&&w.y>=p&&w.y<=g&&w!==s&&w!==o&&js(a,h,l,d,c,u,w.x,w.y)&&Mt(w.prev,w,w.next)>=0||(w=w.prevZ,_.x>=f&&_.x<=y&&_.y>=p&&_.y<=g&&_!==s&&_!==o&&js(a,h,l,d,c,u,_.x,_.y)&&Mt(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;w&&w.z>=m;){if(w.x>=f&&w.x<=y&&w.y>=p&&w.y<=g&&w!==s&&w!==o&&js(a,h,l,d,c,u,w.x,w.y)&&Mt(w.prev,w,w.next)>=0)return!1;w=w.prevZ}for(;_&&_.z<=C;){if(_.x>=f&&_.x<=y&&_.y>=p&&_.y<=g&&_!==s&&_!==o&&js(a,h,l,d,c,u,_.x,_.y)&&Mt(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function om(i,e){let t=i;do{let n=t.prev,s=t.next.next;!Ss(n,s)&&vd(n,t,t.next,s)&&br(n,s)&&br(s,n)&&(e.push(n.i,t.i,s.i),Mr(t),Mr(t.next),t=i=s),t=t.next}while(t!==i);return Bi(t)}function am(i,e,t,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&gm(o,a)){let l=yd(o,a);o=Bi(o,o.next),l=Bi(l,l.next),yr(o,e,t,n,s,r,0),yr(l,e,t,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function lm(i,e,t,n){let s=[];for(let r=0,o=e.length;r<o;r++){let a=e[r]*n,l=r<o-1?e[r+1]*n:i.length,c=xd(i,a,l,n,!1);c===c.next&&(c.steiner=!0),s.push(mm(c))}s.sort(cm);for(let r=0;r<s.length;r++)t=hm(s[r],t);return t}function cm(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=n-s}return t}function hm(i,e){let t=um(i,e);if(!t)return e;let n=yd(t,i);return Bi(n,n.next),Bi(t,t.next)}function um(i,e){let t=e,n=i.x,s=i.y,r=-1/0,o;if(Ss(i,t))return t;do{if(Ss(i,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){let d=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=n&&d>r&&(r=d,o=t.x<t.next.x?t:t.next,d===n))return o}t=t.next}while(t!==e);if(!o)return null;let a=o,l=o.x,c=o.y,h=1/0;t=o;do{if(n>=t.x&&t.x>=l&&n!==t.x&&_d(s<c?n:r,s,l,c,s<c?r:n,s,t.x,t.y)){let d=Math.abs(s-t.y)/(n-t.x);br(t,i)&&(d<h||d===h&&(t.x>o.x||t.x===o.x&&dm(o,t)))&&(o=t,h=d)}t=t.next}while(t!==a);return o}function dm(i,e){return Mt(i.prev,i,e.prev)<0&&Mt(e.next,i,i.next)<0}function fm(i,e,t,n){let s=i;do s.z===0&&(s.z=bc(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,pm(s)}function pm(i){let e,t=1;do{let n=i,s;i=null;let r=null;for(e=0;n;){e++;let o=n,a=0;for(let c=0;c<t&&(a++,o=o.nextZ,!!o);c++);let l=t;for(;a>0||l>0&&o;)a!==0&&(l===0||!o||n.z<=o.z)?(s=n,n=n.nextZ,a--):(s=o,o=o.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=o}r.nextZ=null,t*=2}while(e>1);return i}function bc(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function mm(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function _d(i,e,t,n,s,r,o,a){return(s-o)*(e-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(r-a)>=(s-o)*(n-a)}function js(i,e,t,n,s,r,o,a){return!(i===o&&e===a)&&_d(i,e,t,n,s,r,o,a)}function gm(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!xm(i,e)&&(br(i,e)&&br(e,i)&&_m(i,e)&&(Mt(i.prev,i,e.prev)||Mt(i,e.prev,e))||Ss(i,e)&&Mt(i.prev,i,i.next)>0&&Mt(e.prev,e,e.next)>0)}function Mt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function Ss(i,e){return i.x===e.x&&i.y===e.y}function vd(i,e,t,n){let s=Ro(Mt(i,e,t)),r=Ro(Mt(i,e,n)),o=Ro(Mt(t,n,i)),a=Ro(Mt(t,n,e));return!!(s!==r&&o!==a||s===0&&Co(i,t,e)||r===0&&Co(i,n,e)||o===0&&Co(t,i,n)||a===0&&Co(t,e,n))}function Co(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function Ro(i){return i>0?1:i<0?-1:0}function xm(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&vd(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function br(i,e){return Mt(i.prev,i,i.next)<0?Mt(i,e,i.next)>=0&&Mt(i,i.prev,e)>=0:Mt(i,e,i.prev)<0||Mt(i,i.next,e)<0}function _m(i,e){let t=i,n=!1,s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function yd(i,e){let t=Mc(i.i,i.x,i.y),n=Mc(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function Su(i,e,t,n){let s=Mc(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Mr(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Mc(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function vm(i,e,t,n){let s=0;for(let r=e,o=t-n;r<t;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}var Sc=class{static triangulate(e,t,n=2){return im(e,t,n)}},Di=class i{static area(e){let t=e.length,n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return i.area(e)<0}static triangulateShape(e,t){let n=[],s=[],r=[];Eu(e),wu(n,e);let o=e.length;t.forEach(Eu);for(let l=0;l<t.length;l++)s.push(o),o+=t[l].length,wu(n,t[l]);let a=Sc.triangulate(n,s);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}};function Eu(i){let e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function wu(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}var Sr=class i extends lt{constructor(e=new Ms([new ne(.5,.5),new ne(-.5,.5),new ne(-.5,-.5),new ne(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,s=[],r=[];for(let a=0,l=e.length;a<l;a++){let c=e[a];o(c)}this.setAttribute("position",new St(s,3)),this.setAttribute("uv",new St(r,2)),this.computeVertexNormals();function o(a){let l=[],c=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,d=t.depth!==void 0?t.depth:1,u=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,p=t.bevelSize!==void 0?t.bevelSize:f-.1,y=t.bevelOffset!==void 0?t.bevelOffset:0,g=t.bevelSegments!==void 0?t.bevelSegments:3,m=t.extrudePath,C=t.UVGenerator!==void 0?t.UVGenerator:ym,w,_=!1,S,M,A,v;if(m){w=m.getSpacedPoints(h),_=!0,u=!1;let ee=m.isCatmullRomCurve3?m.closed:!1;S=m.computeFrenetFrames(h,ee),M=new R,A=new R,v=new R}u||(g=0,f=0,p=0,y=0);let T=a.extractPoints(c),I=T.shape,P=T.holes;if(!Di.isClockWise(I)){I=I.reverse();for(let ee=0,se=P.length;ee<se;ee++){let ie=P[ee];Di.isClockWise(ie)&&(P[ee]=ie.reverse())}}function q(ee){let ie=10000000000000001e-36,_e=ee[0];for(let me=1;me<=ee.length;me++){let Be=me%ee.length,Re=ee[Be],He=Re.x-_e.x,Xe=Re.y-_e.y,L=He*He+Xe*Xe,ht=Math.max(Math.abs(Re.x),Math.abs(Re.y),Math.abs(_e.x),Math.abs(_e.y)),et=ie*ht*ht;if(L<=et){ee.splice(Be,1),me--;continue}_e=Re}}q(I),P.forEach(q);let $=P.length,O=I;for(let ee=0;ee<$;ee++){let se=P[ee];I=I.concat(se)}function X(ee,se,ie){return se||Oe("ExtrudeGeometry: vec does not exist"),ee.clone().addScaledVector(se,ie)}let B=I.length;function G(ee,se,ie){let _e,me,Be,Re=ee.x-se.x,He=ee.y-se.y,Xe=ie.x-ee.x,L=ie.y-ee.y,ht=Re*Re+He*He,et=Re*L-He*Xe;if(Math.abs(et)>Number.EPSILON){let E=Math.sqrt(ht),x=Math.sqrt(Xe*Xe+L*L),U=se.x-He/E,V=se.y+Re/E,Y=ie.x-L/x,oe=ie.y+Xe/x,ce=((Y-U)*L-(oe-V)*Xe)/(Re*L-He*Xe);_e=U+Re*ce-ee.x,me=V+He*ce-ee.y;let Z=_e*_e+me*me;if(Z<=2)return new ne(_e,me);Be=Math.sqrt(Z/2)}else{let E=!1;Re>Number.EPSILON?Xe>Number.EPSILON&&(E=!0):Re<-Number.EPSILON?Xe<-Number.EPSILON&&(E=!0):Math.sign(He)===Math.sign(L)&&(E=!0),E?(_e=-He,me=Re,Be=Math.sqrt(ht)):(_e=Re,me=He,Be=Math.sqrt(ht/2))}return new ne(_e/Be,me/Be)}let Q=[];for(let ee=0,se=O.length,ie=se-1,_e=ee+1;ee<se;ee++,ie++,_e++)ie===se&&(ie=0),_e===se&&(_e=0),Q[ee]=G(O[ee],O[ie],O[_e]);let le=[],ae,Me=Q.concat();for(let ee=0,se=$;ee<se;ee++){let ie=P[ee];ae=[];for(let _e=0,me=ie.length,Be=me-1,Re=_e+1;_e<me;_e++,Be++,Re++)Be===me&&(Be=0),Re===me&&(Re=0),ae[_e]=G(ie[_e],ie[Be],ie[Re]);le.push(ae),Me=Me.concat(ae)}let je;if(g===0)je=Di.triangulateShape(O,P);else{let ee=[],se=[];for(let ie=0;ie<g;ie++){let _e=ie/g,me=f*Math.cos(_e*Math.PI/2),Be=p*Math.sin(_e*Math.PI/2)+y;for(let Re=0,He=O.length;Re<He;Re++){let Xe=X(O[Re],Q[Re],Be);Le(Xe.x,Xe.y,-me),_e===0&&ee.push(Xe)}for(let Re=0,He=$;Re<He;Re++){let Xe=P[Re];ae=le[Re];let L=[];for(let ht=0,et=Xe.length;ht<et;ht++){let E=X(Xe[ht],ae[ht],Be);Le(E.x,E.y,-me),_e===0&&L.push(E)}_e===0&&se.push(L)}}je=Di.triangulateShape(ee,se)}let ft=je.length,nt=p+y;for(let ee=0;ee<B;ee++){let se=u?X(I[ee],Me[ee],nt):I[ee];_?(A.copy(S.normals[0]).multiplyScalar(se.x),M.copy(S.binormals[0]).multiplyScalar(se.y),v.copy(w[0]).add(A).add(M),Le(v.x,v.y,v.z)):Le(se.x,se.y,0)}for(let ee=1;ee<=h;ee++)for(let se=0;se<B;se++){let ie=u?X(I[se],Me[se],nt):I[se];_?(A.copy(S.normals[ee]).multiplyScalar(ie.x),M.copy(S.binormals[ee]).multiplyScalar(ie.y),v.copy(w[ee]).add(A).add(M),Le(v.x,v.y,v.z)):Le(ie.x,ie.y,d/h*ee)}for(let ee=g-1;ee>=0;ee--){let se=ee/g,ie=f*Math.cos(se*Math.PI/2),_e=p*Math.sin(se*Math.PI/2)+y;for(let me=0,Be=O.length;me<Be;me++){let Re=X(O[me],Q[me],_e);Le(Re.x,Re.y,d+ie)}for(let me=0,Be=P.length;me<Be;me++){let Re=P[me];ae=le[me];for(let He=0,Xe=Re.length;He<Xe;He++){let L=X(Re[He],ae[He],_e);_?Le(L.x,L.y+w[h-1].y,w[h-1].x+ie):Le(L.x,L.y,d+ie)}}}K(),he();function K(){let ee=s.length/3;if(u){let se=0,ie=B*se;for(let _e=0;_e<ft;_e++){let me=je[_e];ze(me[2]+ie,me[1]+ie,me[0]+ie)}se=h+g*2,ie=B*se;for(let _e=0;_e<ft;_e++){let me=je[_e];ze(me[0]+ie,me[1]+ie,me[2]+ie)}}else{for(let se=0;se<ft;se++){let ie=je[se];ze(ie[2],ie[1],ie[0])}for(let se=0;se<ft;se++){let ie=je[se];ze(ie[0]+B*h,ie[1]+B*h,ie[2]+B*h)}}n.addGroup(ee,s.length/3-ee,0)}function he(){let ee=s.length/3,se=0;re(O,se),se+=O.length;for(let ie=0,_e=P.length;ie<_e;ie++){let me=P[ie];re(me,se),se+=me.length}n.addGroup(ee,s.length/3-ee,1)}function re(ee,se){let ie=ee.length;for(;--ie>=0;){let _e=ie,me=ie-1;me<0&&(me=ee.length-1);for(let Be=0,Re=h+g*2;Be<Re;Be++){let He=B*Be,Xe=B*(Be+1),L=se+_e+He,ht=se+me+He,et=se+me+Xe,E=se+_e+Xe;Fe(L,ht,et,E)}}}function Le(ee,se,ie){l.push(ee),l.push(se),l.push(ie)}function ze(ee,se,ie){st(ee),st(se),st(ie);let _e=s.length/3,me=C.generateTopUV(n,s,_e-3,_e-2,_e-1);Ve(me[0]),Ve(me[1]),Ve(me[2])}function Fe(ee,se,ie,_e){st(ee),st(se),st(_e),st(se),st(ie),st(_e);let me=s.length/3,Be=C.generateSideWallUV(n,s,me-6,me-3,me-2,me-1);Ve(Be[0]),Ve(Be[1]),Ve(Be[3]),Ve(Be[1]),Ve(Be[2]),Ve(Be[3])}function st(ee){s.push(l[ee*3+0]),s.push(l[ee*3+1]),s.push(l[ee*3+2])}function Ve(ee){r.push(ee.x),r.push(ee.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return bm(t,n,e)}static fromJSON(e,t){let n=[];for(let r=0,o=e.shapes.length;r<o;r++){let a=t[e.shapes[r]];n.push(a)}let s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new yc[s.type]().fromJSON(s)),new i(n,e.options)}},ym={generateTopUV:function(i,e,t,n,s){let r=e[t*3],o=e[t*3+1],a=e[n*3],l=e[n*3+1],c=e[s*3],h=e[s*3+1];return[new ne(r,o),new ne(a,l),new ne(c,h)]},generateSideWallUV:function(i,e,t,n,s,r){let o=e[t*3],a=e[t*3+1],l=e[t*3+2],c=e[n*3],h=e[n*3+1],d=e[n*3+2],u=e[s*3],f=e[s*3+1],p=e[s*3+2],y=e[r*3],g=e[r*3+1],m=e[r*3+2];return Math.abs(a-h)<Math.abs(o-c)?[new ne(o,1-l),new ne(c,1-d),new ne(u,1-p),new ne(y,1-m)]:[new ne(a,1-l),new ne(h,1-d),new ne(f,1-p),new ne(g,1-m)]}};function bm(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var di=class i extends lt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,o=t/2,a=Math.floor(n),l=Math.floor(s),c=a+1,h=l+1,d=e/a,u=t/l,f=[],p=[],y=[],g=[];for(let m=0;m<h;m++){let C=m*u-o;for(let w=0;w<c;w++){let _=w*d-r;p.push(_,-C,0),y.push(0,0,1),g.push(w/a),g.push(1-m/l)}}for(let m=0;m<l;m++)for(let C=0;C<a;C++){let w=C+c*m,_=C+c*(m+1),S=C+1+c*(m+1),M=C+1+c*m;f.push(w,_,M),f.push(_,S,M)}this.setIndex(f),this.setAttribute("position",new St(p,3)),this.setAttribute("normal",new St(y,3)),this.setAttribute("uv",new St(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}};function Hi(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];if(Tu(s))s.isRenderTargetTexture?(Ne("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(Tu(s[0])){let r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function qt(i){let e={};for(let t=0;t<i.length;t++){let n=Hi(i[t]);for(let s in n)e[s]=n[s]}return e}function Tu(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Mm(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Qc(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:tt.workingColorSpace}var bd={clone:Hi,merge:qt},Sm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Em=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,an=class extends Sn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Sm,this.fragmentShader=Em,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Hi(e.uniforms),this.uniformsGroups=Mm(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new qe().setHex(s.value);break;case"v2":this.uniforms[n].value=new ne().fromArray(s.value);break;case"v3":this.uniforms[n].value=new R().fromArray(s.value);break;case"v4":this.uniforms[n].value=new bt().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Ge().fromArray(s.value);break;case"m4":this.uniforms[n].value=new ot().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},la=class extends an{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Er=class extends Sn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new qe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new qe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ll,this.normalScale=new ne(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Zn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var ca=class extends Sn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=id,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},ha=class extends Sn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Po(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}var fi=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let o;t:{i:if(!(e<s)){for(let a=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=t[++n],e<s)break e}o=t.length;break t}if(!(e>=r)){let a=t[1];e<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=t[--n-1],e>=r)break e}o=n,n=0;break t}break n}for(;n<o;){let a=n+o>>>1;e<t[a]?o=a:n=a+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let o=0;o!==s;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},ua=class extends fi{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:mc,endingEnd:mc}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,o=e+1,a=s[r],l=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case gc:r=e,a=2*t-n;break;case xc:r=s.length-2,a=t+s[r]-s[r+1];break;default:r=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case gc:o=e,l=2*n-t;break;case xc:o=1,l=n+s[1]-s[0];break;default:o=e-1,l=t}let c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,f=this._weightNext,p=(n-t)/(s-t),y=p*p,g=y*p,m=-u*g+2*u*y-u*p,C=(1+u)*g+(-1.5-2*u)*y+(-.5+u)*p+1,w=(-1-f)*g+(1.5+f)*y+.5*p,_=f*g-f*y;for(let S=0;S!==a;++S)r[S]=m*o[h+S]+C*o[c+S]+w*o[l+S]+_*o[d+S];return r}},da=class extends fi{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=(n-t)/(s-t),d=1-h;for(let u=0;u!==a;++u)r[u]=o[c+u]*d+o[l+u]*h;return r}},fa=class extends fi{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},pa=class extends fi{interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=this.inTangents,d=this.outTangents;if(!h||!d){let p=(n-t)/(s-t),y=1-p;for(let g=0;g!==a;++g)r[g]=o[c+g]*y+o[l+g]*p;return r}let u=a*2,f=e-1;for(let p=0;p!==a;++p){let y=o[c+p],g=o[l+p],m=f*u+p*2,C=d[m],w=d[m+1],_=e*u+p*2,S=h[_],M=h[_+1],A=(n-t)/(s-t),v,T,I,P,F;for(let q=0;q<8;q++){v=A*A,T=v*A,I=1-A,P=I*I,F=P*I;let O=F*t+3*P*A*C+3*I*v*S+T*s-n;if(Math.abs(O)<1e-10)break;let X=3*P*(C-t)+6*I*A*(S-C)+3*v*(s-S);if(Math.abs(X)<1e-10)break;A=A-O/X,A=Math.max(0,Math.min(1,A))}r[p]=F*y+3*P*A*w+3*I*v*M+T*g}return r}},ln=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Po(t,this.TimeBufferType),this.values=Po(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Po(e.times,Array),values:Po(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new fa(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new da(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new ua(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new pa(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case nr:t=this.InterpolantFactoryMethodDiscrete;break;case Xo:t=this.InterpolantFactoryMethodLinear;break;case Do:t=this.InterpolantFactoryMethodSmooth;break;case pc:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Ne("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return nr;case this.InterpolantFactoryMethodLinear:return Xo;case this.InterpolantFactoryMethodSmooth:return Do;case this.InterpolantFactoryMethodBezier:return pc}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Oe("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(Oe("KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){let l=n[a];if(typeof l=="number"&&isNaN(l)){Oe("KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){Oe("KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(s!==void 0&&mp(s))for(let a=0,l=s.length;a!==l;++a){let c=s[a];if(isNaN(c)){Oe("KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Do,r=e.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=e[a],h=e[a+1];if(c!==h&&(a!==1||c!==e[0]))if(s)l=!0;else{let d=a*n,u=d-n,f=d+n;for(let p=0;p!==n;++p){let y=t[d+p];if(y!==t[u+p]||y!==t[f+p]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];let d=a*n,u=o*n;for(let f=0;f!==n;++f)t[u+f]=t[d+f]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}};ln.prototype.ValueTypeName="";ln.prototype.TimeBufferType=Float32Array;ln.prototype.ValueBufferType=Float32Array;ln.prototype.DefaultInterpolation=Xo;var pi=class extends ln{constructor(e,t,n){super(e,t,n)}};pi.prototype.ValueTypeName="bool";pi.prototype.ValueBufferType=Array;pi.prototype.DefaultInterpolation=nr;pi.prototype.InterpolantFactoryMethodLinear=void 0;pi.prototype.InterpolantFactoryMethodSmooth=void 0;var ma=class extends ln{constructor(e,t,n,s){super(e,t,n,s)}};ma.prototype.ValueTypeName="color";var ga=class extends ln{constructor(e,t,n,s){super(e,t,n,s)}};ga.prototype.ValueTypeName="number";var xa=class extends fi{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(s-t),c=e*a;for(let h=c+a;c!==h;c+=4)Ht.slerpFlat(r,0,o,c-a,o,c,l);return r}},wr=class extends ln{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new xa(this.times,this.values,this.getValueSize(),e)}};wr.prototype.ValueTypeName="quaternion";wr.prototype.InterpolantFactoryMethodSmooth=void 0;var mi=class extends ln{constructor(e,t,n){super(e,t,n)}};mi.prototype.ValueTypeName="string";mi.prototype.ValueBufferType=Array;mi.prototype.DefaultInterpolation=nr;mi.prototype.InterpolantFactoryMethodLinear=void 0;mi.prototype.InterpolantFactoryMethodSmooth=void 0;var _a=class extends ln{constructor(e,t,n,s){super(e,t,n,s)}};_a.prototype.ValueTypeName="vector";var va=class{constructor(e,t,n){let s=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){let d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=c.length;d<u;d+=2){let f=c[d],p=c[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Md=new va,ya=class{constructor(e){this.manager=e!==void 0?e:Md,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};ya.DEFAULT_MATERIAL_NAME="__DEFAULT";var Tr=class extends It{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new qe(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Es=class extends Tr{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(It.DEFAULT_UP),this.updateMatrix(),this.groundColor=new qe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},fc=new ot,Au=new R,Cu=new R,Ec=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ne(512,512),this.mapType=Kt,this.map=null,this.mapPass=null,this.matrix=new ot,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new _s,this._frameExtents=new ne(1,1),this._viewportCount=1,this._viewports=[new bt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;Au.setFromMatrixPosition(e.matrixWorld),t.position.copy(Au),Cu.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Cu),t.updateMatrixWorld(),fc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(fc,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===us||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(fc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Io=new R,Lo=new Ht,In=new R,Ar=class extends It{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ot,this.projectionMatrix=new ot,this.projectionMatrixInverse=new ot,this.coordinateSystem=yn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Io,Lo,In),In.x===1&&In.y===1&&In.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Io,Lo,In.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Io,Lo,In),In.x===1&&In.y===1&&In.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Io,Lo,In.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},ai=new R,Ru=new ne,Pu=new ne,Xt=class extends Ar{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=fs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(cs*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return fs*2*Math.atan(Math.tan(cs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){ai.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ai.x,ai.y).multiplyScalar(-e/ai.z),ai.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ai.x,ai.y).multiplyScalar(-e/ai.z)}getViewSize(e,t){return this.getViewBounds(e,Ru,Pu),t.subVectors(Pu,Ru)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(cs*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,t-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}let a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var gi=class extends Ar{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,o=n+e,a=s+t,l=s-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},wc=class extends Ec{constructor(){super(new gi(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},xi=class extends Tr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(It.DEFAULT_UP),this.updateMatrix(),this.target=new It,this.shadow=new wc}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var as=-90,ls=1,ba=class extends It{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Xt(as,ls,e,t);s.layers=this.layers,this.add(s);let r=new Xt(as,ls,e,t);r.layers=this.layers,this.add(r);let o=new Xt(as,ls,e,t);o.layers=this.layers,this.add(o);let a=new Xt(as,ls,e,t);a.layers=this.layers,this.add(a);let l=new Xt(as,ls,e,t);l.layers=this.layers,this.add(l);let c=new Xt(as,ls,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,l]=t;for(let c of t)this.remove(c);if(e===yn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===us)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,h]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,2,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,3,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=y,e.setRenderTarget(n,5,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(d,u,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},Ma=class extends Xt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var eh="\\[\\]\\.:\\/",wm=new RegExp("["+eh+"]","g"),th="[^"+eh+"]",Tm="[^"+eh.replace("\\.","")+"]",Am=/((?:WC+[\/:])*)/.source.replace("WC",th),Cm=/(WCOD+)?/.source.replace("WCOD",Tm),Rm=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",th),Pm=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",th),Im=new RegExp("^"+Am+Cm+Rm+Pm+"$"),Lm=["material","materials","bones","map"],Tc=class{constructor(e,t,n){let s=n||vt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},vt=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(wm,"")}static parseTrackName(e){let t=Im.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Lm.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===t||a.uuid===t)return a;let l=n(a.children);if(l)return l}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Ne("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){Oe("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Oe("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Oe("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Oe("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Oe("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){Oe("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){Oe("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let o=e[s];if(o===void 0){let c=t.nodeName;Oe("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){Oe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Oe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};vt.Composite=Tc;vt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};vt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};vt.prototype.GetterByBindingType=[vt.prototype._getValue_direct,vt.prototype._getValue_array,vt.prototype._getValue_arrayElement,vt.prototype._getValue_toArray];vt.prototype.SetterByBindingTypeAndVersioning=[[vt.prototype._setValue_direct,vt.prototype._setValue_direct_setNeedsUpdate,vt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[vt.prototype._setValue_array,vt.prototype._setValue_array_setNeedsUpdate,vt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[vt.prototype._setValue_arrayElement,vt.prototype._setValue_arrayElement_setNeedsUpdate,vt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[vt.prototype._setValue_fromArray,vt.prototype._setValue_fromArray_setNeedsUpdate,vt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Zy=new Float32Array(1);var Iu=new ot,ki=class{constructor(e,t,n=0,s=1/0){this.ray=new $n(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new ms,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Oe("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Iu.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Iu),this}intersectObject(e,t=!0,n=[]){return Ac(e,this,n,t),n.sort(Lu),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)Ac(e[s],this,n,t);return n.sort(Lu),n}};function Lu(i,e){return i.distance-e.distance}function Ac(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let o=0,a=r.length;o<a;o++)Ac(r[o],e,t,!0)}}var ws=class{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=$e(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos($e(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var Cc=class i{static{i.prototype.isMatrix2=!0}constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};var Cr=class extends pn{constructor(e=10,t=10,n=4473924,s=8947848){n=new qe(n),s=new qe(s);let r=t/2,o=e/t,a=e/2,l=[],c=[];for(let u=0,f=0,p=-a;u<=t;u++,p+=o){l.push(-a,0,p,a,0,p),l.push(p,0,-a,p,0,a);let y=u===r?n:s;y.toArray(c,f),f+=3,y.toArray(c,f),f+=3,y.toArray(c,f),f+=3,y.toArray(c,f),f+=3}let h=new lt;h.setAttribute("position",new St(l,3)),h.setAttribute("color",new St(c,3));let d=new fn({vertexColors:!0,toneMapped:!1});super(h,d),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}};var Rr=class extends pn{constructor(e=1){let t=[0,0,0,e,0,0,0,0,0,0,e,0,0,0,0,0,0,e],n=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],s=new lt;s.setAttribute("position",new St(t,3)),s.setAttribute("color",new St(n,3));let r=new fn({vertexColors:!0,toneMapped:!1});super(s,r),this.type="AxesHelper"}setColors(e,t,n){let s=new qe,r=this.geometry.attributes.color.array;return s.set(e),s.toArray(r,0),s.toArray(r,3),s.set(t),s.toArray(r,6),s.toArray(r,9),s.set(n),s.toArray(r,12),s.toArray(r,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}};var Pr=class extends bn{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){Ne("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};function nh(i,e,t,n){let s=Dm(n);switch(t){case qc:return i*e;case Zc:return i*e/s.components*s.byteLength;case Ra:return i*e/s.components*s.byteLength;case Si:return i*e*2/s.components*s.byteLength;case Pa:return i*e*2/s.components*s.byteLength;case Yc:return i*e*3/s.components*s.byteLength;case mn:return i*e*4/s.components*s.byteLength;case Ia:return i*e*4/s.components*s.byteLength;case Nr:case Ur:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Fr:case Or:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Da:case Ua:return Math.max(i,16)*Math.max(e,8)/4;case La:case Na:return Math.max(i,8)*Math.max(e,8)/2;case Fa:case Oa:case ka:case za:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ba:case Br:case Ha:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Va:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ga:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Wa:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Xa:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case qa:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Ya:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Za:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case $a:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Ja:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Ka:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case ja:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Qa:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case el:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case tl:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case nl:case il:case sl:return Math.ceil(i/4)*Math.ceil(e/4)*16;case rl:case ol:return Math.ceil(i/4)*Math.ceil(e/4)*8;case kr:case al:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Dm(i){switch(i){case Kt:case Vc:return{byteLength:1,components:1};case As:case Gc:case On:return{byteLength:2,components:1};case Aa:case Ca:return{byteLength:2,components:4};case wn:case Ta:case Tn:return{byteLength:4,components:1};case Wc:case Xc:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"185"}}));typeof window<"u"&&(window.__THREE__?Ne("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="185");function Xd(){let i=null,e=!1,t=null,n=null;function s(r,o){t(r,o),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Um(i){let e=new WeakMap;function t(a,l){let c=a.array,h=a.usage,d=c.byteLength,u=i.createBuffer();i.bindBuffer(l,u),i.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,l,c){let h=l.array,d=l.updateRanges;if(i.bindBuffer(c,a),d.length===0)i.bufferSubData(c,0,h);else{d.sort((f,p)=>f.start-p.start);let u=0;for(let f=1;f<d.length;f++){let p=d[u],y=d[f];y.start<=p.start+p.count+1?p.count=Math.max(p.count,y.start+y.count-p.start):(++u,d[u]=y)}d.length=u+1;for(let f=0,p=d.length;f<p;f++){let y=d[f];i.bufferSubData(c,y.start*h.BYTES_PER_ELEMENT,h,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=e.get(a);l&&(i.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var Fm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Om=`#ifdef USE_ALPHAHASH
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
#endif`,Bm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,km=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,zm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Hm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Vm=`#ifdef USE_AOMAP
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
#endif`,Gm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Wm=`#ifdef USE_BATCHING
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
#endif`,Xm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,qm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Ym=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Zm=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,$m=`#ifdef USE_IRIDESCENCE
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
#endif`,Jm=`#ifdef USE_BUMPMAP
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
#endif`,Km=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,jm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Qm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,eg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,tg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,ng=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,ig=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,sg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,rg=`#define PI 3.141592653589793
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
} // validated`,og=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,ag=`vec3 transformedNormal = objectNormal;
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
#endif`,lg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,cg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,hg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ug=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,dg="gl_FragColor = linearToOutputTexel( gl_FragColor );",fg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,pg=`#ifdef USE_ENVMAP
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
#endif`,mg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,gg=`#ifdef USE_ENVMAP
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
#endif`,xg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,_g=`#ifdef USE_ENVMAP
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
#endif`,vg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,yg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,bg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Mg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Sg=`#ifdef USE_GRADIENTMAP
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
}`,Eg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,wg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Tg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Ag=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Cg=`#ifdef USE_ENVMAP
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
#endif`,Rg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Pg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Ig=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Lg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Dg=`PhysicalMaterial material;
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
#endif`,Ng=`uniform sampler2D dfgLUT;
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
}`,Ug=`
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
#endif`,Fg=`#if defined( RE_IndirectDiffuse )
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
#endif`,Og=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Bg=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,kg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,zg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Hg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Vg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Gg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Wg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Xg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,qg=`#if defined( USE_POINTS_UV )
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
#endif`,Yg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Zg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,$g=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Jg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Kg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,jg=`#ifdef USE_MORPHTARGETS
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
#endif`,Qg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,e0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,t0=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,n0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,i0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,s0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,r0=`#ifdef USE_NORMALMAP
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
#endif`,o0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,a0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,l0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,c0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,h0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,u0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,d0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,f0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,p0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,m0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,g0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,x0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,_0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,v0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,y0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,b0=`float getShadowMask() {
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
}`,M0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,S0=`#ifdef USE_SKINNING
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
#endif`,E0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,w0=`#ifdef USE_SKINNING
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
#endif`,T0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,A0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,C0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,R0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,P0=`#ifdef USE_TRANSMISSION
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
#endif`,I0=`#ifdef USE_TRANSMISSION
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
#endif`,L0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,D0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,N0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,U0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,F0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,O0=`uniform sampler2D t2D;
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
}`,B0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,k0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,z0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,H0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,V0=`#include <common>
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
}`,G0=`#if DEPTH_PACKING == 3200
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
}`,W0=`#define DISTANCE
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
}`,X0=`#define DISTANCE
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
}`,q0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Y0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Z0=`uniform float scale;
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
}`,$0=`uniform vec3 diffuse;
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
}`,J0=`#include <common>
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
}`,K0=`uniform vec3 diffuse;
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
}`,j0=`#define LAMBERT
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
}`,Q0=`#define LAMBERT
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
}`,ex=`#define MATCAP
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
}`,tx=`#define MATCAP
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
}`,nx=`#define NORMAL
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
}`,ix=`#define NORMAL
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
}`,sx=`#define PHONG
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
}`,rx=`#define PHONG
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
}`,ox=`#define STANDARD
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
}`,ax=`#define STANDARD
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
}`,lx=`#define TOON
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
}`,cx=`#define TOON
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
}`,hx=`uniform float size;
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
}`,ux=`uniform vec3 diffuse;
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
}`,dx=`#include <common>
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
}`,fx=`uniform vec3 color;
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
}`,px=`uniform float rotation;
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
}`,mx=`uniform vec3 diffuse;
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
}`,Je={alphahash_fragment:Fm,alphahash_pars_fragment:Om,alphamap_fragment:Bm,alphamap_pars_fragment:km,alphatest_fragment:zm,alphatest_pars_fragment:Hm,aomap_fragment:Vm,aomap_pars_fragment:Gm,batching_pars_vertex:Wm,batching_vertex:Xm,begin_vertex:qm,beginnormal_vertex:Ym,bsdfs:Zm,iridescence_fragment:$m,bumpmap_pars_fragment:Jm,clipping_planes_fragment:Km,clipping_planes_pars_fragment:jm,clipping_planes_pars_vertex:Qm,clipping_planes_vertex:eg,color_fragment:tg,color_pars_fragment:ng,color_pars_vertex:ig,color_vertex:sg,common:rg,cube_uv_reflection_fragment:og,defaultnormal_vertex:ag,displacementmap_pars_vertex:lg,displacementmap_vertex:cg,emissivemap_fragment:hg,emissivemap_pars_fragment:ug,colorspace_fragment:dg,colorspace_pars_fragment:fg,envmap_fragment:pg,envmap_common_pars_fragment:mg,envmap_pars_fragment:gg,envmap_pars_vertex:xg,envmap_physical_pars_fragment:Cg,envmap_vertex:_g,fog_vertex:vg,fog_pars_vertex:yg,fog_fragment:bg,fog_pars_fragment:Mg,gradientmap_pars_fragment:Sg,lightmap_pars_fragment:Eg,lights_lambert_fragment:wg,lights_lambert_pars_fragment:Tg,lights_pars_begin:Ag,lights_toon_fragment:Rg,lights_toon_pars_fragment:Pg,lights_phong_fragment:Ig,lights_phong_pars_fragment:Lg,lights_physical_fragment:Dg,lights_physical_pars_fragment:Ng,lights_fragment_begin:Ug,lights_fragment_maps:Fg,lights_fragment_end:Og,lightprobes_pars_fragment:Bg,logdepthbuf_fragment:kg,logdepthbuf_pars_fragment:zg,logdepthbuf_pars_vertex:Hg,logdepthbuf_vertex:Vg,map_fragment:Gg,map_pars_fragment:Wg,map_particle_fragment:Xg,map_particle_pars_fragment:qg,metalnessmap_fragment:Yg,metalnessmap_pars_fragment:Zg,morphinstance_vertex:$g,morphcolor_vertex:Jg,morphnormal_vertex:Kg,morphtarget_pars_vertex:jg,morphtarget_vertex:Qg,normal_fragment_begin:e0,normal_fragment_maps:t0,normal_pars_fragment:n0,normal_pars_vertex:i0,normal_vertex:s0,normalmap_pars_fragment:r0,clearcoat_normal_fragment_begin:o0,clearcoat_normal_fragment_maps:a0,clearcoat_pars_fragment:l0,iridescence_pars_fragment:c0,opaque_fragment:h0,packing:u0,premultiplied_alpha_fragment:d0,project_vertex:f0,dithering_fragment:p0,dithering_pars_fragment:m0,roughnessmap_fragment:g0,roughnessmap_pars_fragment:x0,shadowmap_pars_fragment:_0,shadowmap_pars_vertex:v0,shadowmap_vertex:y0,shadowmask_pars_fragment:b0,skinbase_vertex:M0,skinning_pars_vertex:S0,skinning_vertex:E0,skinnormal_vertex:w0,specularmap_fragment:T0,specularmap_pars_fragment:A0,tonemapping_fragment:C0,tonemapping_pars_fragment:R0,transmission_fragment:P0,transmission_pars_fragment:I0,uv_pars_fragment:L0,uv_pars_vertex:D0,uv_vertex:N0,worldpos_vertex:U0,background_vert:F0,background_frag:O0,backgroundCube_vert:B0,backgroundCube_frag:k0,cube_vert:z0,cube_frag:H0,depth_vert:V0,depth_frag:G0,distance_vert:W0,distance_frag:X0,equirect_vert:q0,equirect_frag:Y0,linedashed_vert:Z0,linedashed_frag:$0,meshbasic_vert:J0,meshbasic_frag:K0,meshlambert_vert:j0,meshlambert_frag:Q0,meshmatcap_vert:ex,meshmatcap_frag:tx,meshnormal_vert:nx,meshnormal_frag:ix,meshphong_vert:sx,meshphong_frag:rx,meshphysical_vert:ox,meshphysical_frag:ax,meshtoon_vert:lx,meshtoon_frag:cx,points_vert:hx,points_frag:ux,shadow_vert:dx,shadow_frag:fx,sprite_vert:px,sprite_frag:mx},xe={common:{diffuse:{value:new qe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ge}},envmap:{envMap:{value:null},envMapRotation:{value:new Ge},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ge}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ge}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ge},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ge},normalScale:{value:new ne(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ge},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ge}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ge}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ge}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new qe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new R},probesMax:{value:new R},probesResolution:{value:new R}},points:{diffuse:{value:new qe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0},uvTransform:{value:new Ge}},sprite:{diffuse:{value:new qe(16777215)},opacity:{value:1},center:{value:new ne(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}}},kn={basic:{uniforms:qt([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.fog]),vertexShader:Je.meshbasic_vert,fragmentShader:Je.meshbasic_frag},lambert:{uniforms:qt([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,xe.lights,{emissive:{value:new qe(0)},envMapIntensity:{value:1}}]),vertexShader:Je.meshlambert_vert,fragmentShader:Je.meshlambert_frag},phong:{uniforms:qt([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,xe.lights,{emissive:{value:new qe(0)},specular:{value:new qe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Je.meshphong_vert,fragmentShader:Je.meshphong_frag},standard:{uniforms:qt([xe.common,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.roughnessmap,xe.metalnessmap,xe.fog,xe.lights,{emissive:{value:new qe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Je.meshphysical_vert,fragmentShader:Je.meshphysical_frag},toon:{uniforms:qt([xe.common,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.gradientmap,xe.fog,xe.lights,{emissive:{value:new qe(0)}}]),vertexShader:Je.meshtoon_vert,fragmentShader:Je.meshtoon_frag},matcap:{uniforms:qt([xe.common,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,{matcap:{value:null}}]),vertexShader:Je.meshmatcap_vert,fragmentShader:Je.meshmatcap_frag},points:{uniforms:qt([xe.points,xe.fog]),vertexShader:Je.points_vert,fragmentShader:Je.points_frag},dashed:{uniforms:qt([xe.common,xe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Je.linedashed_vert,fragmentShader:Je.linedashed_frag},depth:{uniforms:qt([xe.common,xe.displacementmap]),vertexShader:Je.depth_vert,fragmentShader:Je.depth_frag},normal:{uniforms:qt([xe.common,xe.bumpmap,xe.normalmap,xe.displacementmap,{opacity:{value:1}}]),vertexShader:Je.meshnormal_vert,fragmentShader:Je.meshnormal_frag},sprite:{uniforms:qt([xe.sprite,xe.fog]),vertexShader:Je.sprite_vert,fragmentShader:Je.sprite_frag},background:{uniforms:{uvTransform:{value:new Ge},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Je.background_vert,fragmentShader:Je.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ge}},vertexShader:Je.backgroundCube_vert,fragmentShader:Je.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Je.cube_vert,fragmentShader:Je.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Je.equirect_vert,fragmentShader:Je.equirect_frag},distance:{uniforms:qt([xe.common,xe.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Je.distance_vert,fragmentShader:Je.distance_frag},shadow:{uniforms:qt([xe.lights,xe.fog,{color:{value:new qe(0)},opacity:{value:1}}]),vertexShader:Je.shadow_vert,fragmentShader:Je.shadow_frag}};kn.physical={uniforms:qt([kn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ge},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ge},clearcoatNormalScale:{value:new ne(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ge},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ge},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ge},sheen:{value:0},sheenColor:{value:new qe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ge},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ge},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ge},transmissionSamplerSize:{value:new ne},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ge},attenuationDistance:{value:0},attenuationColor:{value:new qe(0)},specularColor:{value:new qe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ge},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ge},anisotropyVector:{value:new ne},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ge}}]),vertexShader:Je.meshphysical_vert,fragmentShader:Je.meshphysical_frag};var ul={r:0,b:0,g:0},gx=new ot,qd=new Ge;qd.set(-1,0,0,0,1,0,0,0,1);function xx(i,e,t,n,s,r){let o=new qe(0),a=s===!0?0:1,l,c,h=null,d=0,u=null;function f(C){let w=C.isScene===!0?C.background:null;if(w&&w.isTexture){let _=C.backgroundBlurriness>0;w=e.get(w,_)}return w}function p(C){let w=!1,_=f(C);_===null?g(o,a):_&&_.isColor&&(g(_,1),w=!0);let S=i.xr.getEnvironmentBlendMode();S==="additive"?t.buffers.color.setClear(0,0,0,1,r):S==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||w)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function y(C,w){let _=f(w);_&&(_.isCubeTexture||_.mapping===Lr)?(c===void 0&&(c=new Ct(new ys(1,1,1),new an({name:"BackgroundCubeMaterial",uniforms:Hi(kn.backgroundCube.uniforms),vertexShader:kn.backgroundCube.vertexShader,fragmentShader:kn.backgroundCube.fragmentShader,side:$t,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(S,M,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=_,c.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(gx.makeRotationFromEuler(w.backgroundRotation)).transpose(),_.isCubeTexture&&_.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(qd),c.material.toneMapped=tt.getTransfer(_.colorSpace)!==rt,(h!==_||d!==_.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,h=_,d=_.version,u=i.toneMapping),c.layers.enableAll(),C.unshift(c,c.geometry,c.material,0,0,null)):_&&_.isTexture&&(l===void 0&&(l=new Ct(new di(2,2),new an({name:"BackgroundMaterial",uniforms:Hi(kn.background.uniforms),vertexShader:kn.background.vertexShader,fragmentShader:kn.background.fragmentShader,side:Yn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=_,l.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,l.material.toneMapped=tt.getTransfer(_.colorSpace)!==rt,_.matrixAutoUpdate===!0&&_.updateMatrix(),l.material.uniforms.uvTransform.value.copy(_.matrix),(h!==_||d!==_.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,h=_,d=_.version,u=i.toneMapping),l.layers.enableAll(),C.unshift(l,l.geometry,l.material,0,0,null))}function g(C,w){C.getRGB(ul,Qc(i)),t.buffers.color.setClear(ul.r,ul.g,ul.b,w,r)}function m(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(C,w=1){o.set(C),a=w,g(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(C){a=C,g(o,a)},render:p,addToRenderList:y,dispose:m}}function _x(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null),r=s,o=!1;function a(P,F,q,$,O){let X=!1,B=d(P,$,q,F);r!==B&&(r=B,c(r.object)),X=f(P,$,q,O),X&&p(P,$,q,O),O!==null&&e.update(O,i.ELEMENT_ARRAY_BUFFER),(X||o)&&(o=!1,_(P,F,q,$),O!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(O).buffer))}function l(){return i.createVertexArray()}function c(P){return i.bindVertexArray(P)}function h(P){return i.deleteVertexArray(P)}function d(P,F,q,$){let O=$.wireframe===!0,X=n[F.id];X===void 0&&(X={},n[F.id]=X);let B=P.isInstancedMesh===!0?P.id:0,G=X[B];G===void 0&&(G={},X[B]=G);let Q=G[q.id];Q===void 0&&(Q={},G[q.id]=Q);let le=Q[O];return le===void 0&&(le=u(l()),Q[O]=le),le}function u(P){let F=[],q=[],$=[];for(let O=0;O<t;O++)F[O]=0,q[O]=0,$[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:q,attributeDivisors:$,object:P,attributes:{},index:null}}function f(P,F,q,$){let O=r.attributes,X=F.attributes,B=0,G=q.getAttributes();for(let Q in G)if(G[Q].location>=0){let ae=O[Q],Me=X[Q];if(Me===void 0&&(Q==="instanceMatrix"&&P.instanceMatrix&&(Me=P.instanceMatrix),Q==="instanceColor"&&P.instanceColor&&(Me=P.instanceColor)),ae===void 0||ae.attribute!==Me||Me&&ae.data!==Me.data)return!0;B++}return r.attributesNum!==B||r.index!==$}function p(P,F,q,$){let O={},X=F.attributes,B=0,G=q.getAttributes();for(let Q in G)if(G[Q].location>=0){let ae=X[Q];ae===void 0&&(Q==="instanceMatrix"&&P.instanceMatrix&&(ae=P.instanceMatrix),Q==="instanceColor"&&P.instanceColor&&(ae=P.instanceColor));let Me={};Me.attribute=ae,ae&&ae.data&&(Me.data=ae.data),O[Q]=Me,B++}r.attributes=O,r.attributesNum=B,r.index=$}function y(){let P=r.newAttributes;for(let F=0,q=P.length;F<q;F++)P[F]=0}function g(P){m(P,0)}function m(P,F){let q=r.newAttributes,$=r.enabledAttributes,O=r.attributeDivisors;q[P]=1,$[P]===0&&(i.enableVertexAttribArray(P),$[P]=1),O[P]!==F&&(i.vertexAttribDivisor(P,F),O[P]=F)}function C(){let P=r.newAttributes,F=r.enabledAttributes;for(let q=0,$=F.length;q<$;q++)F[q]!==P[q]&&(i.disableVertexAttribArray(q),F[q]=0)}function w(P,F,q,$,O,X,B){B===!0?i.vertexAttribIPointer(P,F,q,O,X):i.vertexAttribPointer(P,F,q,$,O,X)}function _(P,F,q,$){y();let O=$.attributes,X=q.getAttributes(),B=F.defaultAttributeValues;for(let G in X){let Q=X[G];if(Q.location>=0){let le=O[G];if(le===void 0&&(G==="instanceMatrix"&&P.instanceMatrix&&(le=P.instanceMatrix),G==="instanceColor"&&P.instanceColor&&(le=P.instanceColor)),le!==void 0){let ae=le.normalized,Me=le.itemSize,je=e.get(le);if(je===void 0)continue;let ft=je.buffer,nt=je.type,K=je.bytesPerElement,he=nt===i.INT||nt===i.UNSIGNED_INT||le.gpuType===Ta;if(le.isInterleavedBufferAttribute){let re=le.data,Le=re.stride,ze=le.offset;if(re.isInstancedInterleavedBuffer){for(let Fe=0;Fe<Q.locationSize;Fe++)m(Q.location+Fe,re.meshPerAttribute);P.isInstancedMesh!==!0&&$._maxInstanceCount===void 0&&($._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let Fe=0;Fe<Q.locationSize;Fe++)g(Q.location+Fe);i.bindBuffer(i.ARRAY_BUFFER,ft);for(let Fe=0;Fe<Q.locationSize;Fe++)w(Q.location+Fe,Me/Q.locationSize,nt,ae,Le*K,(ze+Me/Q.locationSize*Fe)*K,he)}else{if(le.isInstancedBufferAttribute){for(let re=0;re<Q.locationSize;re++)m(Q.location+re,le.meshPerAttribute);P.isInstancedMesh!==!0&&$._maxInstanceCount===void 0&&($._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let re=0;re<Q.locationSize;re++)g(Q.location+re);i.bindBuffer(i.ARRAY_BUFFER,ft);for(let re=0;re<Q.locationSize;re++)w(Q.location+re,Me/Q.locationSize,nt,ae,Me*K,Me/Q.locationSize*re*K,he)}}else if(B!==void 0){let ae=B[G];if(ae!==void 0)switch(ae.length){case 2:i.vertexAttrib2fv(Q.location,ae);break;case 3:i.vertexAttrib3fv(Q.location,ae);break;case 4:i.vertexAttrib4fv(Q.location,ae);break;default:i.vertexAttrib1fv(Q.location,ae)}}}}C()}function S(){T();for(let P in n){let F=n[P];for(let q in F){let $=F[q];for(let O in $){let X=$[O];for(let B in X)h(X[B].object),delete X[B];delete $[O]}}delete n[P]}}function M(P){if(n[P.id]===void 0)return;let F=n[P.id];for(let q in F){let $=F[q];for(let O in $){let X=$[O];for(let B in X)h(X[B].object),delete X[B];delete $[O]}}delete n[P.id]}function A(P){for(let F in n){let q=n[F];for(let $ in q){let O=q[$];if(O[P.id]===void 0)continue;let X=O[P.id];for(let B in X)h(X[B].object),delete X[B];delete O[P.id]}}}function v(P){for(let F in n){let q=n[F],$=P.isInstancedMesh===!0?P.id:0,O=q[$];if(O!==void 0){for(let X in O){let B=O[X];for(let G in B)h(B[G].object),delete B[G];delete O[X]}delete q[$],Object.keys(q).length===0&&delete n[F]}}}function T(){I(),o=!0,r!==s&&(r=s,c(r.object))}function I(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:T,resetDefaultState:I,dispose:S,releaseStatesOfGeometry:M,releaseStatesOfObject:v,releaseStatesOfProgram:A,initAttributes:y,enableAttribute:g,disableUnusedAttributes:C}}function vx(i,e,t){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),t.update(c,n,1)}function o(l,c,h){h!==0&&(i.drawArraysInstanced(n,l,c,h),t.update(c,n,h))}function a(l,c,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let u=0;for(let f=0;f<h;f++)u+=c[f];t.update(u,n,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function yx(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let A=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(A){return!(A!==mn&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){let v=A===On&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==Kt&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==Tn&&!v)}function l(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",h=l(c);h!==c&&(Ne("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let d=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&Ne("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),p=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),C=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),w=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),S=i.getParameter(i.MAX_SAMPLES),M=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:p,maxTextureSize:y,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:C,maxVaryings:w,maxFragmentUniforms:_,maxSamples:S,samples:M}}function bx(i){let e=this,t=null,n=0,s=!1,r=!1,o=new dn,a=new Ge,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){let f=d.length!==0||u||n!==0||s;return s=u,n=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){t=h(d,u,0)},this.setState=function(d,u,f){let p=d.clippingPlanes,y=d.clipIntersection,g=d.clipShadows,m=i.get(d);if(!s||p===null||p.length===0||r&&!g)r?h(null):c();else{let C=r?0:n,w=C*4,_=m.clippingState||null;l.value=_,_=h(p,u,w,f);for(let S=0;S!==w;++S)_[S]=t[S];m.clippingState=_,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=C}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(d,u,f,p){let y=d!==null?d.length:0,g=null;if(y!==0){if(g=l.value,p!==!0||g===null){let m=f+y*4,C=u.matrixWorldInverse;a.getNormalMatrix(C),(g===null||g.length<m)&&(g=new Float32Array(m));for(let w=0,_=f;w!==y;++w,_+=4)o.copy(d[w]).applyMatrix4(C,a),o.normal.toArray(g,_),g[_+3]=o.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,g}}var Ei=4,Sd=[.125,.215,.35,.446,.526,.582],Vi=20,Mx=256,zr=new gi,Ed=new qe,ih=null,sh=0,rh=0,oh=!1,Sx=new R,fl=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){let{size:o=256,position:a=Sx}=r;ih=this._renderer.getRenderTarget(),sh=this._renderer.getActiveCubeFace(),rh=this._renderer.getActiveMipmapLevel(),oh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,s,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ad(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Td(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(ih,sh,rh),this._renderer.xr.enabled=oh,e.scissorTest=!1,Rs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===yi||e.mapping===zi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ih=this._renderer.getRenderTarget(),sh=this._renderer.getActiveCubeFace(),rh=this._renderer.getActiveMipmapLevel(),oh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:zt,minFilter:zt,generateMipmaps:!1,type:On,format:mn,colorSpace:ir,depthBuffer:!1},s=wd(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=wd(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Ex(r)),this._blurMaterial=Tx(r,e,t),this._ggxMaterial=wx(r,e,t)}return s}_compileMaterial(e){let t=new Ct(new lt,e);this._renderer.compile(t,zr)}_sceneToCubeUV(e,t,n,s,r){let l=new Xt(90,1,t,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(Ed),d.toneMapping=En,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Ct(new ys,new Jt({name:"PMREM.Background",side:$t,depthWrite:!1,depthTest:!1})));let y=this._backgroundBox,g=y.material,m=!1,C=e.background;C?C.isColor&&(g.color.copy(C),e.background=null,m=!0):(g.color.copy(Ed),m=!0);for(let w=0;w<6;w++){let _=w%3;_===0?(l.up.set(0,c[w],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[w],r.y,r.z)):_===1?(l.up.set(0,0,c[w]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[w],r.z)):(l.up.set(0,c[w],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[w]));let S=this._cubeSize;Rs(s,_*S,w>2?S:0,S,S),d.setRenderTarget(s),m&&d.render(y,l),d.render(e,l)}d.toneMapping=f,d.autoClear=u,e.background=C}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===yi||e.mapping===zi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ad()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Td());let r=s?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;let a=r.uniforms;a.envMap.value=e;let l=this._cubeSize;Rs(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,zr)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){let s=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[n];a.material=o;let l=o.uniforms,c=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),d=Math.sqrt(c*c-h*h),u=0+c*1.25,f=d*u,{_lodMax:p}=this,y=this._sizeLods[n],g=3*y*(n>p-Ei?n-p+Ei:0),m=4*(this._cubeSize-y);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=p-t,Rs(r,g,m,3*y,2*y),s.setRenderTarget(r),s.render(a,zr),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=p-n,Rs(e,g,m,3*y,2*y),s.setRenderTarget(e),s.render(a,zr)}_blur(e,t,n,s,r){let o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,s,"latitudinal",r),this._halfBlur(o,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,o,a){let l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&Oe("blur direction must be either latitudinal or longitudinal!");let h=3,d=this._lodMeshes[s];d.material=c;let u=c.uniforms,f=this._sizeLods[n]-1,p=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Vi-1),y=r/p,g=isFinite(r)?1+Math.floor(h*y):Vi;g>Vi&&Ne(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Vi}`);let m=[],C=0;for(let A=0;A<Vi;++A){let v=A/y,T=Math.exp(-v*v/2);m.push(T),A===0?C+=T:A<g&&(C+=2*T)}for(let A=0;A<m.length;A++)m[A]=m[A]/C;u.envMap.value=e.texture,u.samples.value=g,u.weights.value=m,u.latitudinal.value=o==="latitudinal",a&&(u.poleAxis.value=a);let{_lodMax:w}=this;u.dTheta.value=p,u.mipInt.value=w-n;let _=this._sizeLods[s],S=3*_*(s>w-Ei?s-w+Ei:0),M=4*(this._cubeSize-_);Rs(t,S,M,3*_,2*_),l.setRenderTarget(t),l.render(d,zr)}};function Ex(i){let e=[],t=[],n=[],s=i,r=i-Ei+1+Sd.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);e.push(a);let l=1/a;o>i-Ei?l=Sd[o-i+Ei-1]:o===0&&(l=0),t.push(l);let c=1/(a-2),h=-c,d=1+c,u=[h,h,d,h,d,d,h,h,d,d,h,d],f=6,p=6,y=3,g=2,m=1,C=new Float32Array(y*p*f),w=new Float32Array(g*p*f),_=new Float32Array(m*p*f);for(let M=0;M<f;M++){let A=M%3*2/3-1,v=M>2?0:-1,T=[A,v,0,A+2/3,v,0,A+2/3,v+1,0,A,v,0,A+2/3,v+1,0,A,v+1,0];C.set(T,y*p*M),w.set(u,g*p*M);let I=[M,M,M,M,M,M];_.set(I,m*p*M)}let S=new lt;S.setAttribute("position",new yt(C,y)),S.setAttribute("uv",new yt(w,g)),S.setAttribute("faceIndex",new yt(_,m)),n.push(new Ct(S,null)),s>Ei&&s--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function wd(i,e,t){let n=new rn(i,e,t);return n.texture.mapping=Lr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Rs(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function wx(i,e,t){return new an({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Mx,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:ml(),fragmentShader:`

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
		`,blending:Fn,depthTest:!1,depthWrite:!1})}function Tx(i,e,t){let n=new Float32Array(Vi),s=new R(0,1,0);return new an({name:"SphericalGaussianBlur",defines:{n:Vi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:ml(),fragmentShader:`

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
		`,blending:Fn,depthTest:!1,depthWrite:!1})}function Td(){return new an({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ml(),fragmentShader:`

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
		`,blending:Fn,depthTest:!1,depthWrite:!1})}function Ad(){return new an({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ml(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Fn,depthTest:!1,depthWrite:!1})}function ml(){return`

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
	`}var pl=class extends rn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new fr(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new ys(5,5,5),r=new an({name:"CubemapFromEquirect",uniforms:Hi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:$t,blending:Fn});r.uniforms.tEquirect.value=t;let o=new Ct(s,r),a=t.minFilter;return t.minFilter===bi&&(t.minFilter=zt),new ba(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){let r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}};function Ax(i){let e=new WeakMap,t=new WeakMap,n=null;function s(u,f=!1){return u==null?null:f?o(u):r(u)}function r(u){if(u&&u.isTexture){let f=u.mapping;if(f===Sa||f===Ea)if(e.has(u)){let p=e.get(u).texture;return a(p,u.mapping)}else{let p=u.image;if(p&&p.height>0){let y=new pl(p.height);return y.fromEquirectangularTexture(i,u),e.set(u,y),u.addEventListener("dispose",c),a(y.texture,u.mapping)}else return null}}return u}function o(u){if(u&&u.isTexture){let f=u.mapping,p=f===Sa||f===Ea,y=f===yi||f===zi;if(p||y){let g=t.get(u),m=g!==void 0?g.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==m)return n===null&&(n=new fl(i)),g=p?n.fromEquirectangular(u,g):n.fromCubemap(u,g),g.texture.pmremVersion=u.pmremVersion,t.set(u,g),g.texture;if(g!==void 0)return g.texture;{let C=u.image;return p&&C&&C.height>0||y&&C&&l(C)?(n===null&&(n=new fl(i)),g=p?n.fromEquirectangular(u):n.fromCubemap(u),g.texture.pmremVersion=u.pmremVersion,t.set(u,g),u.addEventListener("dispose",h),g.texture):null}}}return u}function a(u,f){return f===Sa?u.mapping=yi:f===Ea&&(u.mapping=zi),u}function l(u){let f=0,p=6;for(let y=0;y<p;y++)u[y]!==void 0&&f++;return f===p}function c(u){let f=u.target;f.removeEventListener("dispose",c);let p=e.get(f);p!==void 0&&(e.delete(f),p.dispose())}function h(u){let f=u.target;f.removeEventListener("dispose",h);let p=t.get(f);p!==void 0&&(t.delete(f),p.dispose())}function d(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:d}}function Cx(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&Ni("WebGLRenderer: "+n+" extension not supported."),s}}}function Rx(i,e,t,n){let s={},r=new WeakMap;function o(d){let u=d.target;u.index!==null&&e.remove(u.index);for(let p in u.attributes)e.remove(u.attributes[p]);u.removeEventListener("dispose",o),delete s[u.id];let f=r.get(u);f&&(e.remove(f),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function a(d,u){return s[u.id]===!0||(u.addEventListener("dispose",o),s[u.id]=!0,t.memory.geometries++),u}function l(d){let u=d.attributes;for(let f in u)e.update(u[f],i.ARRAY_BUFFER)}function c(d){let u=[],f=d.index,p=d.attributes.position,y=0;if(p===void 0)return;if(f!==null){let C=f.array;y=f.version;for(let w=0,_=C.length;w<_;w+=3){let S=C[w+0],M=C[w+1],A=C[w+2];u.push(S,M,M,A,A,S)}}else{let C=p.array;y=p.version;for(let w=0,_=C.length/3-1;w<_;w+=3){let S=w+0,M=w+1,A=w+2;u.push(S,M,M,A,A,S)}}let g=new(p.count>=65535?cr:lr)(u,1);g.version=y;let m=r.get(d);m&&e.remove(m),r.set(d,g)}function h(d){let u=r.get(d);if(u){let f=d.index;f!==null&&u.version<f.version&&c(d)}else c(d);return r.get(d)}return{get:a,update:l,getWireframeAttribute:h}}function Px(i,e,t){let n;function s(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function l(d,u){i.drawElements(n,u,r,d*o),t.update(u,n,1)}function c(d,u,f){f!==0&&(i.drawElementsInstanced(n,u,r,d*o,f),t.update(u,n,f))}function h(d,u,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,d,0,f);let y=0;for(let g=0;g<f;g++)y+=u[g];t.update(y,n,1)}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function Ix(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:Oe("WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function Lx(i,e,t){let n=new WeakMap,s=new bt;function r(o,a,l){let c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=h!==void 0?h.length:0,u=n.get(a);if(u===void 0||u.count!==d){let T=function(){A.dispose(),n.delete(a),a.removeEventListener("dispose",T)};u!==void 0&&u.texture.dispose();let f=a.morphAttributes.position!==void 0,p=a.morphAttributes.normal!==void 0,y=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],m=a.morphAttributes.normal||[],C=a.morphAttributes.color||[],w=0;f===!0&&(w=1),p===!0&&(w=2),y===!0&&(w=3);let _=a.attributes.position.count*w,S=1;_>e.maxTextureSize&&(S=Math.ceil(_/e.maxTextureSize),_=e.maxTextureSize);let M=new Float32Array(_*S*4*d),A=new ar(M,_,S,d);A.type=Tn,A.needsUpdate=!0;let v=w*4;for(let I=0;I<d;I++){let P=g[I],F=m[I],q=C[I],$=_*S*4*I;for(let O=0;O<P.count;O++){let X=O*v;f===!0&&(s.fromBufferAttribute(P,O),M[$+X+0]=s.x,M[$+X+1]=s.y,M[$+X+2]=s.z,M[$+X+3]=0),p===!0&&(s.fromBufferAttribute(F,O),M[$+X+4]=s.x,M[$+X+5]=s.y,M[$+X+6]=s.z,M[$+X+7]=0),y===!0&&(s.fromBufferAttribute(q,O),M[$+X+8]=s.x,M[$+X+9]=s.y,M[$+X+10]=s.z,M[$+X+11]=q.itemSize===4?s.w:1)}}u={count:d,texture:A,size:new ne(_,S)},n.set(a,u),a.addEventListener("dispose",T)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let f=0;for(let y=0;y<c.length;y++)f+=c[y];let p=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(i,"morphTargetBaseInfluence",p),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",u.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function Dx(i,e,t,n,s){let r=new WeakMap;function o(c){let h=s.render.frame,d=c.geometry,u=e.get(c,d);if(r.get(u)!==h&&(e.update(u),r.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let f=c.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return u}function a(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:o,dispose:a}}var Nx={[Nc]:"LINEAR_TONE_MAPPING",[Uc]:"REINHARD_TONE_MAPPING",[Fc]:"CINEON_TONE_MAPPING",[Oc]:"ACES_FILMIC_TONE_MAPPING",[kc]:"AGX_TONE_MAPPING",[zc]:"NEUTRAL_TONE_MAPPING",[Bc]:"CUSTOM_TONE_MAPPING"};function Ux(i,e,t,n,s,r){let o=new rn(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,depthTexture:s?new Jn(e,t):void 0}),a=new rn(e,t,{type:On,depthBuffer:!1,stencilBuffer:!1}),l=new lt;l.setAttribute("position",new St([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new St([0,2,0,0,2,0],2));let c=new la({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),h=new Ct(l,c),d=new gi(-1,1,1,-1,0,1),u=null,f=null,p=!1,y,g=null,m=[],C=!1;this.setSize=function(w,_){o.setSize(w,_),a.setSize(w,_);for(let S=0;S<m.length;S++){let M=m[S];M.setSize&&M.setSize(w,_)}},this.setEffects=function(w){m=w,C=m.length>0&&m[0].isRenderPass===!0;let _=o.width,S=o.height;for(let M=0;M<m.length;M++){let A=m[M];A.setSize&&A.setSize(_,S)}},this.begin=function(w,_){if(p||w.toneMapping===En&&m.length===0)return!1;if(g=_,_!==null){let S=_.width,M=_.height;(o.width!==S||o.height!==M)&&this.setSize(S,M)}return C===!1&&w.setRenderTarget(o),y=w.toneMapping,w.toneMapping=En,!0},this.hasRenderPass=function(){return C},this.end=function(w,_){w.toneMapping=y,p=!0;let S=o,M=a;for(let A=0;A<m.length;A++){let v=m[A];if(v.enabled!==!1&&(v.render(w,M,S,_),v.needsSwap!==!1)){let T=S;S=M,M=T}}if(u!==w.outputColorSpace||f!==w.toneMapping){u=w.outputColorSpace,f=w.toneMapping,c.defines={},tt.getTransfer(u)===rt&&(c.defines.SRGB_TRANSFER="");let A=Nx[f];A&&(c.defines[A]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=S.texture,w.setRenderTarget(g),w.render(h,d),g=null,p=!1},this.isCompositing=function(){return p},this.dispose=function(){o.depthTexture&&o.depthTexture.dispose(),o.dispose(),a.dispose(),l.dispose(),c.dispose()}}var Yd=new Zt,ch=new Jn(1,1),Zd=new ar,$d=new $o,Jd=new fr,Cd=[],Rd=[],Pd=new Float32Array(16),Id=new Float32Array(9),Ld=new Float32Array(4);function Ls(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=Cd[s];if(r===void 0&&(r=new Float32Array(s),Cd[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function Lt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Dt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function gl(i,e){let t=Rd[e];t===void 0&&(t=new Int32Array(e),Rd[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Fx(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Ox(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Lt(t,e))return;i.uniform2fv(this.addr,e),Dt(t,e)}}function Bx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Lt(t,e))return;i.uniform3fv(this.addr,e),Dt(t,e)}}function kx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Lt(t,e))return;i.uniform4fv(this.addr,e),Dt(t,e)}}function zx(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Lt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Dt(t,e)}else{if(Lt(t,n))return;Ld.set(n),i.uniformMatrix2fv(this.addr,!1,Ld),Dt(t,n)}}function Hx(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Lt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Dt(t,e)}else{if(Lt(t,n))return;Id.set(n),i.uniformMatrix3fv(this.addr,!1,Id),Dt(t,n)}}function Vx(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Lt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Dt(t,e)}else{if(Lt(t,n))return;Pd.set(n),i.uniformMatrix4fv(this.addr,!1,Pd),Dt(t,n)}}function Gx(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Wx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Lt(t,e))return;i.uniform2iv(this.addr,e),Dt(t,e)}}function Xx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Lt(t,e))return;i.uniform3iv(this.addr,e),Dt(t,e)}}function qx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Lt(t,e))return;i.uniform4iv(this.addr,e),Dt(t,e)}}function Yx(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Zx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Lt(t,e))return;i.uniform2uiv(this.addr,e),Dt(t,e)}}function $x(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Lt(t,e))return;i.uniform3uiv(this.addr,e),Dt(t,e)}}function Jx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Lt(t,e))return;i.uniform4uiv(this.addr,e),Dt(t,e)}}function Kx(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(ch.compareFunction=t.isReversedDepthBuffer()?hl:cl,r=ch):r=Yd,t.setTexture2D(e||r,s)}function jx(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||$d,s)}function Qx(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Jd,s)}function e_(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Zd,s)}function t_(i){switch(i){case 5126:return Fx;case 35664:return Ox;case 35665:return Bx;case 35666:return kx;case 35674:return zx;case 35675:return Hx;case 35676:return Vx;case 5124:case 35670:return Gx;case 35667:case 35671:return Wx;case 35668:case 35672:return Xx;case 35669:case 35673:return qx;case 5125:return Yx;case 36294:return Zx;case 36295:return $x;case 36296:return Jx;case 35678:case 36198:case 36298:case 36306:case 35682:return Kx;case 35679:case 36299:case 36307:return jx;case 35680:case 36300:case 36308:case 36293:return Qx;case 36289:case 36303:case 36311:case 36292:return e_}}function n_(i,e){i.uniform1fv(this.addr,e)}function i_(i,e){let t=Ls(e,this.size,2);i.uniform2fv(this.addr,t)}function s_(i,e){let t=Ls(e,this.size,3);i.uniform3fv(this.addr,t)}function r_(i,e){let t=Ls(e,this.size,4);i.uniform4fv(this.addr,t)}function o_(i,e){let t=Ls(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function a_(i,e){let t=Ls(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function l_(i,e){let t=Ls(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function c_(i,e){i.uniform1iv(this.addr,e)}function h_(i,e){i.uniform2iv(this.addr,e)}function u_(i,e){i.uniform3iv(this.addr,e)}function d_(i,e){i.uniform4iv(this.addr,e)}function f_(i,e){i.uniform1uiv(this.addr,e)}function p_(i,e){i.uniform2uiv(this.addr,e)}function m_(i,e){i.uniform3uiv(this.addr,e)}function g_(i,e){i.uniform4uiv(this.addr,e)}function x_(i,e,t){let n=this.cache,s=e.length,r=gl(t,s);Lt(n,r)||(i.uniform1iv(this.addr,r),Dt(n,r));let o;this.type===i.SAMPLER_2D_SHADOW?o=ch:o=Yd;for(let a=0;a!==s;++a)t.setTexture2D(e[a]||o,r[a])}function __(i,e,t){let n=this.cache,s=e.length,r=gl(t,s);Lt(n,r)||(i.uniform1iv(this.addr,r),Dt(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||$d,r[o])}function v_(i,e,t){let n=this.cache,s=e.length,r=gl(t,s);Lt(n,r)||(i.uniform1iv(this.addr,r),Dt(n,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||Jd,r[o])}function y_(i,e,t){let n=this.cache,s=e.length,r=gl(t,s);Lt(n,r)||(i.uniform1iv(this.addr,r),Dt(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||Zd,r[o])}function b_(i){switch(i){case 5126:return n_;case 35664:return i_;case 35665:return s_;case 35666:return r_;case 35674:return o_;case 35675:return a_;case 35676:return l_;case 5124:case 35670:return c_;case 35667:case 35671:return h_;case 35668:case 35672:return u_;case 35669:case 35673:return d_;case 5125:return f_;case 36294:return p_;case 36295:return m_;case 36296:return g_;case 35678:case 36198:case 36298:case 36306:case 35682:return x_;case 35679:case 36299:case 36307:return __;case 35680:case 36300:case 36308:case 36293:return v_;case 36289:case 36303:case 36311:case 36292:return y_}}var hh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=t_(t.type)}},uh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=b_(t.type)}},dh=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(e,t[a.id],n)}}},ah=/(\w+)(\])?(\[|\.)?/g;function Dd(i,e){i.seq.push(e),i.map[e.id]=e}function M_(i,e,t){let n=i.name,s=n.length;for(ah.lastIndex=0;;){let r=ah.exec(n),o=ah.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){Dd(t,c===void 0?new hh(a,i,e):new uh(a,i,e));break}else{let d=t.map[a];d===void 0&&(d=new dh(a),Dd(t,d)),t=d}}}var Ps=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){let a=e.getActiveUniform(t,o),l=e.getUniformLocation(t,a.name);M_(a,l,this)}let s=[],r=[];for(let o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){let a=t[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let o=e[s];o.id in t&&n.push(o)}return n}};function Nd(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var S_=37297,E_=0;function w_(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}var Ud=new Ge;function T_(i){tt._getMatrix(Ud,tt.workingColorSpace,i);let e=`mat3( ${Ud.elements.map(t=>t.toFixed(4))} )`;switch(tt.getTransfer(i)){case sr:return[e,"LinearTransferOETF"];case rt:return[e,"sRGBTransferOETF"];default:return Ne("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Fd(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+w_(i.getShaderSource(e),a)}else return r}function A_(i,e){let t=T_(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var C_={[Nc]:"Linear",[Uc]:"Reinhard",[Fc]:"Cineon",[Oc]:"ACESFilmic",[kc]:"AgX",[zc]:"Neutral",[Bc]:"Custom"};function R_(i,e){let t=C_[e];return t===void 0?(Ne("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var dl=new R;function P_(){tt.getLuminanceCoefficients(dl);let i=dl.x.toFixed(4),e=dl.y.toFixed(4),t=dl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function I_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Vr).join(`
`)}function L_(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function D_(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function Vr(i){return i!==""}function Od(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Bd(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var N_=/^[ \t]*#include +<([\w\d./]+)>/gm;function fh(i){return i.replace(N_,F_)}var U_=new Map;function F_(i,e){let t=Je[e];if(t===void 0){let n=U_.get(e);if(n!==void 0)t=Je[n],Ne('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return fh(t)}var O_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function kd(i){return i.replace(O_,B_)}function B_(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function zd(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}var k_={[Ir]:"SHADOWMAP_TYPE_PCF",[Ts]:"SHADOWMAP_TYPE_VSM"};function z_(i){return k_[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var H_={[yi]:"ENVMAP_TYPE_CUBE",[zi]:"ENVMAP_TYPE_CUBE",[Lr]:"ENVMAP_TYPE_CUBE_UV"};function V_(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":H_[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var G_={[zi]:"ENVMAP_MODE_REFRACTION"};function W_(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":G_[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var X_={[Dc]:"ENVMAP_BLENDING_MULTIPLY",[ed]:"ENVMAP_BLENDING_MIX",[td]:"ENVMAP_BLENDING_ADD"};function q_(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":X_[i.combine]||"ENVMAP_BLENDING_NONE"}function Y_(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Z_(i,e,t,n){let s=i.getContext(),r=t.defines,o=t.vertexShader,a=t.fragmentShader,l=z_(t),c=V_(t),h=W_(t),d=q_(t),u=Y_(t),f=I_(t),p=L_(r),y=s.createProgram(),g,m,C=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Vr).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Vr).join(`
`),m.length>0&&(m+=`
`)):(g=[zd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Vr).join(`
`),m=[zd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==En?"#define TONE_MAPPING":"",t.toneMapping!==En?Je.tonemapping_pars_fragment:"",t.toneMapping!==En?R_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Je.colorspace_pars_fragment,A_("linearToOutputTexel",t.outputColorSpace),P_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Vr).join(`
`)),o=fh(o),o=Od(o,t),o=Bd(o,t),a=fh(a),a=Od(a,t),a=Bd(a,t),o=kd(o),a=kd(a),t.isRawShaderMaterial!==!0&&(C=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",t.glslVersion===$c?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===$c?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let w=C+g+o,_=C+m+a,S=Nd(s,s.VERTEX_SHADER,w),M=Nd(s,s.FRAGMENT_SHADER,_);s.attachShader(y,S),s.attachShader(y,M),t.index0AttributeName!==void 0?s.bindAttribLocation(y,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(y,0,"position"),s.linkProgram(y);function A(P){if(i.debug.checkShaderErrors){let F=s.getProgramInfoLog(y)||"",q=s.getShaderInfoLog(S)||"",$=s.getShaderInfoLog(M)||"",O=F.trim(),X=q.trim(),B=$.trim(),G=!0,Q=!0;if(s.getProgramParameter(y,s.LINK_STATUS)===!1)if(G=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,y,S,M);else{let le=Fd(s,S,"vertex"),ae=Fd(s,M,"fragment");Oe("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(y,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+O+`
`+le+`
`+ae)}else O!==""?Ne("WebGLProgram: Program Info Log:",O):(X===""||B==="")&&(Q=!1);Q&&(P.diagnostics={runnable:G,programLog:O,vertexShader:{log:X,prefix:g},fragmentShader:{log:B,prefix:m}})}s.deleteShader(S),s.deleteShader(M),v=new Ps(s,y),T=D_(s,y)}let v;this.getUniforms=function(){return v===void 0&&A(this),v};let T;this.getAttributes=function(){return T===void 0&&A(this),T};let I=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=s.getProgramParameter(y,S_)),I},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(y),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=E_++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=S,this.fragmentShader=M,this}var $_=0,ph=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new mh(e),t.set(e,n)),n}},mh=class{constructor(e){this.id=$_++,this.code=e,this.usedTimes=0}};function J_(i){return i===Si||i===Br||i===kr}function K_(i,e,t,n,s,r){let o=new ms,a=new ph,l=new Set,c=[],h=new Map,d=n.logarithmicDepthBuffer,u=n.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(v){return l.add(v),v===0?"uv":`uv${v}`}function y(v,T,I,P,F,q){let $=P.fog,O=F.geometry,X=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?P.environment:null,B=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,G=e.get(v.envMap||X,B),Q=G&&G.mapping===Lr?G.image.height:null,le=f[v.type];v.precision!==null&&(u=n.getMaxPrecision(v.precision),u!==v.precision&&Ne("WebGLProgram.getParameters:",v.precision,"not supported, using",u,"instead."));let ae=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,Me=ae!==void 0?ae.length:0,je=0;O.morphAttributes.position!==void 0&&(je=1),O.morphAttributes.normal!==void 0&&(je=2),O.morphAttributes.color!==void 0&&(je=3);let ft,nt,K,he;if(le){let we=kn[le];ft=we.vertexShader,nt=we.fragmentShader}else{ft=v.vertexShader,nt=v.fragmentShader;let we=a.getVertexShaderStage(v),Et=a.getFragmentShaderStage(v);a.update(v,we,Et),K=we.id,he=Et.id}let re=i.getRenderTarget(),Le=i.state.buffers.depth.getReversed(),ze=F.isInstancedMesh===!0,Fe=F.isBatchedMesh===!0,st=!!v.map,Ve=!!v.matcap,ee=!!G,se=!!v.aoMap,ie=!!v.lightMap,_e=!!v.bumpMap&&v.wireframe===!1,me=!!v.normalMap,Be=!!v.displacementMap,Re=!!v.emissiveMap,He=!!v.metalnessMap,Xe=!!v.roughnessMap,L=v.anisotropy>0,ht=v.clearcoat>0,et=v.dispersion>0,E=v.iridescence>0,x=v.sheen>0,U=v.transmission>0,V=L&&!!v.anisotropyMap,Y=ht&&!!v.clearcoatMap,oe=ht&&!!v.clearcoatNormalMap,ce=ht&&!!v.clearcoatRoughnessMap,Z=E&&!!v.iridescenceMap,j=E&&!!v.iridescenceThicknessMap,de=x&&!!v.sheenColorMap,Pe=x&&!!v.sheenRoughnessMap,ge=!!v.specularMap,fe=!!v.specularColorMap,Ue=!!v.specularIntensityMap,ke=U&&!!v.transmissionMap,Ye=U&&!!v.thicknessMap,D=!!v.gradientMap,ue=!!v.alphaMap,J=v.alphaTest>0,pe=!!v.alphaHash,be=!!v.extensions,te=En;v.toneMapped&&(re===null||re.isXRRenderTarget===!0)&&(te=i.toneMapping);let Ce={shaderID:le,shaderType:v.type,shaderName:v.name,vertexShader:ft,fragmentShader:nt,defines:v.defines,customVertexShaderID:K,customFragmentShaderID:he,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:u,batching:Fe,batchingColor:Fe&&F._colorsTexture!==null,instancing:ze,instancingColor:ze&&F.instanceColor!==null,instancingMorph:ze&&F.morphTexture!==null,outputColorSpace:re===null?i.outputColorSpace:re.isXRRenderTarget===!0?re.texture.colorSpace:tt.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:st,matcap:Ve,envMap:ee,envMapMode:ee&&G.mapping,envMapCubeUVHeight:Q,aoMap:se,lightMap:ie,bumpMap:_e,normalMap:me,displacementMap:Be,emissiveMap:Re,normalMapObjectSpace:me&&v.normalMapType===sd,normalMapTangentSpace:me&&v.normalMapType===ll,packedNormalMap:me&&v.normalMapType===ll&&J_(v.normalMap.format),metalnessMap:He,roughnessMap:Xe,anisotropy:L,anisotropyMap:V,clearcoat:ht,clearcoatMap:Y,clearcoatNormalMap:oe,clearcoatRoughnessMap:ce,dispersion:et,iridescence:E,iridescenceMap:Z,iridescenceThicknessMap:j,sheen:x,sheenColorMap:de,sheenRoughnessMap:Pe,specularMap:ge,specularColorMap:fe,specularIntensityMap:Ue,transmission:U,transmissionMap:ke,thicknessMap:Ye,gradientMap:D,opaque:v.transparent===!1&&v.blending===Ui&&v.alphaToCoverage===!1,alphaMap:ue,alphaTest:J,alphaHash:pe,combine:v.combine,mapUv:st&&p(v.map.channel),aoMapUv:se&&p(v.aoMap.channel),lightMapUv:ie&&p(v.lightMap.channel),bumpMapUv:_e&&p(v.bumpMap.channel),normalMapUv:me&&p(v.normalMap.channel),displacementMapUv:Be&&p(v.displacementMap.channel),emissiveMapUv:Re&&p(v.emissiveMap.channel),metalnessMapUv:He&&p(v.metalnessMap.channel),roughnessMapUv:Xe&&p(v.roughnessMap.channel),anisotropyMapUv:V&&p(v.anisotropyMap.channel),clearcoatMapUv:Y&&p(v.clearcoatMap.channel),clearcoatNormalMapUv:oe&&p(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ce&&p(v.clearcoatRoughnessMap.channel),iridescenceMapUv:Z&&p(v.iridescenceMap.channel),iridescenceThicknessMapUv:j&&p(v.iridescenceThicknessMap.channel),sheenColorMapUv:de&&p(v.sheenColorMap.channel),sheenRoughnessMapUv:Pe&&p(v.sheenRoughnessMap.channel),specularMapUv:ge&&p(v.specularMap.channel),specularColorMapUv:fe&&p(v.specularColorMap.channel),specularIntensityMapUv:Ue&&p(v.specularIntensityMap.channel),transmissionMapUv:ke&&p(v.transmissionMap.channel),thicknessMapUv:Ye&&p(v.thicknessMap.channel),alphaMapUv:ue&&p(v.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(me||L),vertexNormals:!!O.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!O.attributes.uv&&(st||ue),fog:!!$,useFog:v.fog===!0,fogExp2:!!$&&$.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||O.attributes.normal===void 0&&me===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:Le,skinning:F.isSkinnedMesh===!0,hasPositionAttribute:O.attributes.position!==void 0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:Me,morphTextureStride:je,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numLightProbeGrids:q.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:v.dithering,shadowMapEnabled:i.shadowMap.enabled&&I.length>0,shadowMapType:i.shadowMap.type,toneMapping:te,decodeVideoTexture:st&&v.map.isVideoTexture===!0&&tt.getTransfer(v.map.colorSpace)===rt,decodeVideoTextureEmissive:Re&&v.emissiveMap.isVideoTexture===!0&&tt.getTransfer(v.emissiveMap.colorSpace)===rt,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===cn,flipSided:v.side===$t,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:be&&v.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(be&&v.extensions.multiDraw===!0||Fe)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return Ce.vertexUv1s=l.has(1),Ce.vertexUv2s=l.has(2),Ce.vertexUv3s=l.has(3),l.clear(),Ce}function g(v){let T=[];if(v.shaderID?T.push(v.shaderID):(T.push(v.customVertexShaderID),T.push(v.customFragmentShaderID)),v.defines!==void 0)for(let I in v.defines)T.push(I),T.push(v.defines[I]);return v.isRawShaderMaterial===!1&&(m(T,v),C(T,v),T.push(i.outputColorSpace)),T.push(v.customProgramCacheKey),T.join()}function m(v,T){v.push(T.precision),v.push(T.outputColorSpace),v.push(T.envMapMode),v.push(T.envMapCubeUVHeight),v.push(T.mapUv),v.push(T.alphaMapUv),v.push(T.lightMapUv),v.push(T.aoMapUv),v.push(T.bumpMapUv),v.push(T.normalMapUv),v.push(T.displacementMapUv),v.push(T.emissiveMapUv),v.push(T.metalnessMapUv),v.push(T.roughnessMapUv),v.push(T.anisotropyMapUv),v.push(T.clearcoatMapUv),v.push(T.clearcoatNormalMapUv),v.push(T.clearcoatRoughnessMapUv),v.push(T.iridescenceMapUv),v.push(T.iridescenceThicknessMapUv),v.push(T.sheenColorMapUv),v.push(T.sheenRoughnessMapUv),v.push(T.specularMapUv),v.push(T.specularColorMapUv),v.push(T.specularIntensityMapUv),v.push(T.transmissionMapUv),v.push(T.thicknessMapUv),v.push(T.combine),v.push(T.fogExp2),v.push(T.sizeAttenuation),v.push(T.morphTargetsCount),v.push(T.morphAttributeCount),v.push(T.numDirLights),v.push(T.numPointLights),v.push(T.numSpotLights),v.push(T.numSpotLightMaps),v.push(T.numHemiLights),v.push(T.numRectAreaLights),v.push(T.numDirLightShadows),v.push(T.numPointLightShadows),v.push(T.numSpotLightShadows),v.push(T.numSpotLightShadowsWithMaps),v.push(T.numLightProbes),v.push(T.shadowMapType),v.push(T.toneMapping),v.push(T.numClippingPlanes),v.push(T.numClipIntersection),v.push(T.depthPacking)}function C(v,T){o.disableAll(),T.instancing&&o.enable(0),T.instancingColor&&o.enable(1),T.instancingMorph&&o.enable(2),T.matcap&&o.enable(3),T.envMap&&o.enable(4),T.normalMapObjectSpace&&o.enable(5),T.normalMapTangentSpace&&o.enable(6),T.clearcoat&&o.enable(7),T.iridescence&&o.enable(8),T.alphaTest&&o.enable(9),T.vertexColors&&o.enable(10),T.vertexAlphas&&o.enable(11),T.vertexUv1s&&o.enable(12),T.vertexUv2s&&o.enable(13),T.vertexUv3s&&o.enable(14),T.vertexTangents&&o.enable(15),T.anisotropy&&o.enable(16),T.alphaHash&&o.enable(17),T.batching&&o.enable(18),T.dispersion&&o.enable(19),T.batchingColor&&o.enable(20),T.gradientMap&&o.enable(21),T.packedNormalMap&&o.enable(22),T.vertexNormals&&o.enable(23),v.push(o.mask),o.disableAll(),T.fog&&o.enable(0),T.useFog&&o.enable(1),T.flatShading&&o.enable(2),T.logarithmicDepthBuffer&&o.enable(3),T.reversedDepthBuffer&&o.enable(4),T.skinning&&o.enable(5),T.morphTargets&&o.enable(6),T.morphNormals&&o.enable(7),T.morphColors&&o.enable(8),T.premultipliedAlpha&&o.enable(9),T.shadowMapEnabled&&o.enable(10),T.doubleSided&&o.enable(11),T.flipSided&&o.enable(12),T.useDepthPacking&&o.enable(13),T.dithering&&o.enable(14),T.transmission&&o.enable(15),T.sheen&&o.enable(16),T.opaque&&o.enable(17),T.pointsUvs&&o.enable(18),T.decodeVideoTexture&&o.enable(19),T.decodeVideoTextureEmissive&&o.enable(20),T.alphaToCoverage&&o.enable(21),T.numLightProbeGrids>0&&o.enable(22),T.hasPositionAttribute&&o.enable(23),v.push(o.mask)}function w(v){let T=f[v.type],I;if(T){let P=kn[T];I=bd.clone(P.uniforms)}else I=v.uniforms;return I}function _(v,T){let I=h.get(T);return I!==void 0?++I.usedTimes:(I=new Z_(i,T,v,s),c.push(I),h.set(T,I)),I}function S(v){if(--v.usedTimes===0){let T=c.indexOf(v);c[T]=c[c.length-1],c.pop(),h.delete(v.cacheKey),v.destroy()}}function M(v){a.remove(v)}function A(){a.dispose()}return{getParameters:y,getProgramCacheKey:g,getUniforms:w,acquireProgram:_,releaseProgram:S,releaseShaderCache:M,programs:c,dispose:A}}function j_(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function Q_(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function Hd(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Vd(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function a(u,f,p,y,g,m){let C=i[e];return C===void 0?(C={id:u.id,object:u,geometry:f,material:p,materialVariant:o(u),groupOrder:y,renderOrder:u.renderOrder,z:g,group:m},i[e]=C):(C.id=u.id,C.object=u,C.geometry=f,C.material=p,C.materialVariant=o(u),C.groupOrder=y,C.renderOrder=u.renderOrder,C.z=g,C.group=m),e++,C}function l(u,f,p,y,g,m){let C=a(u,f,p,y,g,m);p.transmission>0?n.push(C):p.transparent===!0?s.push(C):t.push(C)}function c(u,f,p,y,g,m){let C=a(u,f,p,y,g,m);p.transmission>0?n.unshift(C):p.transparent===!0?s.unshift(C):t.unshift(C)}function h(u,f,p){t.length>1&&t.sort(u||Q_),n.length>1&&n.sort(f||Hd),s.length>1&&s.sort(f||Hd),p&&(t.reverse(),n.reverse(),s.reverse())}function d(){for(let u=e,f=i.length;u<f;u++){let p=i[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:d,sort:h}}function ev(){let i=new WeakMap;function e(n,s){let r=i.get(n),o;return r===void 0?(o=new Vd,i.set(n,[o])):s>=r.length?(o=new Vd,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function tv(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new R,color:new qe};break;case"SpotLight":t={position:new R,direction:new R,color:new qe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new R,color:new qe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new R,skyColor:new qe,groundColor:new qe};break;case"RectAreaLight":t={color:new qe,position:new R,halfWidth:new R,halfHeight:new R};break}return i[e.id]=t,t}}}function nv(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ne};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ne};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ne,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var iv=0;function sv(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function rv(i){let e=new tv,t=nv(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new R);let s=new R,r=new ot,o=new ot;function a(c){let h=0,d=0,u=0;for(let T=0;T<9;T++)n.probe[T].set(0,0,0);let f=0,p=0,y=0,g=0,m=0,C=0,w=0,_=0,S=0,M=0,A=0;c.sort(sv);for(let T=0,I=c.length;T<I;T++){let P=c[T],F=P.color,q=P.intensity,$=P.distance,O=null;if(P.shadow&&P.shadow.map&&(P.shadow.map.texture.format===Si?O=P.shadow.map.texture:O=P.shadow.map.depthTexture||P.shadow.map.texture),P.isAmbientLight)h+=F.r*q,d+=F.g*q,u+=F.b*q;else if(P.isLightProbe){for(let X=0;X<9;X++)n.probe[X].addScaledVector(P.sh.coefficients[X],q);A++}else if(P.isDirectionalLight){let X=e.get(P);if(X.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let B=P.shadow,G=t.get(P);G.shadowIntensity=B.intensity,G.shadowBias=B.bias,G.shadowNormalBias=B.normalBias,G.shadowRadius=B.radius,G.shadowMapSize=B.mapSize,n.directionalShadow[f]=G,n.directionalShadowMap[f]=O,n.directionalShadowMatrix[f]=P.shadow.matrix,C++}n.directional[f]=X,f++}else if(P.isSpotLight){let X=e.get(P);X.position.setFromMatrixPosition(P.matrixWorld),X.color.copy(F).multiplyScalar(q),X.distance=$,X.coneCos=Math.cos(P.angle),X.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),X.decay=P.decay,n.spot[y]=X;let B=P.shadow;if(P.map&&(n.spotLightMap[S]=P.map,S++,B.updateMatrices(P),P.castShadow&&M++),n.spotLightMatrix[y]=B.matrix,P.castShadow){let G=t.get(P);G.shadowIntensity=B.intensity,G.shadowBias=B.bias,G.shadowNormalBias=B.normalBias,G.shadowRadius=B.radius,G.shadowMapSize=B.mapSize,n.spotShadow[y]=G,n.spotShadowMap[y]=O,_++}y++}else if(P.isRectAreaLight){let X=e.get(P);X.color.copy(F).multiplyScalar(q),X.halfWidth.set(P.width*.5,0,0),X.halfHeight.set(0,P.height*.5,0),n.rectArea[g]=X,g++}else if(P.isPointLight){let X=e.get(P);if(X.color.copy(P.color).multiplyScalar(P.intensity),X.distance=P.distance,X.decay=P.decay,P.castShadow){let B=P.shadow,G=t.get(P);G.shadowIntensity=B.intensity,G.shadowBias=B.bias,G.shadowNormalBias=B.normalBias,G.shadowRadius=B.radius,G.shadowMapSize=B.mapSize,G.shadowCameraNear=B.camera.near,G.shadowCameraFar=B.camera.far,n.pointShadow[p]=G,n.pointShadowMap[p]=O,n.pointShadowMatrix[p]=P.shadow.matrix,w++}n.point[p]=X,p++}else if(P.isHemisphereLight){let X=e.get(P);X.skyColor.copy(P.color).multiplyScalar(q),X.groundColor.copy(P.groundColor).multiplyScalar(q),n.hemi[m]=X,m++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=xe.LTC_FLOAT_1,n.rectAreaLTC2=xe.LTC_FLOAT_2):(n.rectAreaLTC1=xe.LTC_HALF_1,n.rectAreaLTC2=xe.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;let v=n.hash;(v.directionalLength!==f||v.pointLength!==p||v.spotLength!==y||v.rectAreaLength!==g||v.hemiLength!==m||v.numDirectionalShadows!==C||v.numPointShadows!==w||v.numSpotShadows!==_||v.numSpotMaps!==S||v.numLightProbes!==A)&&(n.directional.length=f,n.spot.length=y,n.rectArea.length=g,n.point.length=p,n.hemi.length=m,n.directionalShadow.length=C,n.directionalShadowMap.length=C,n.pointShadow.length=w,n.pointShadowMap.length=w,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=C,n.pointShadowMatrix.length=w,n.spotLightMatrix.length=_+S-M,n.spotLightMap.length=S,n.numSpotLightShadowsWithMaps=M,n.numLightProbes=A,v.directionalLength=f,v.pointLength=p,v.spotLength=y,v.rectAreaLength=g,v.hemiLength=m,v.numDirectionalShadows=C,v.numPointShadows=w,v.numSpotShadows=_,v.numSpotMaps=S,v.numLightProbes=A,n.version=iv++)}function l(c,h){let d=0,u=0,f=0,p=0,y=0,g=h.matrixWorldInverse;for(let m=0,C=c.length;m<C;m++){let w=c[m];if(w.isDirectionalLight){let _=n.directional[d];_.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(g),d++}else if(w.isSpotLight){let _=n.spot[f];_.position.setFromMatrixPosition(w.matrixWorld),_.position.applyMatrix4(g),_.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(g),f++}else if(w.isRectAreaLight){let _=n.rectArea[p];_.position.setFromMatrixPosition(w.matrixWorld),_.position.applyMatrix4(g),o.identity(),r.copy(w.matrixWorld),r.premultiply(g),o.extractRotation(r),_.halfWidth.set(w.width*.5,0,0),_.halfHeight.set(0,w.height*.5,0),_.halfWidth.applyMatrix4(o),_.halfHeight.applyMatrix4(o),p++}else if(w.isPointLight){let _=n.point[u];_.position.setFromMatrixPosition(w.matrixWorld),_.position.applyMatrix4(g),u++}else if(w.isHemisphereLight){let _=n.hemi[y];_.direction.setFromMatrixPosition(w.matrixWorld),_.direction.transformDirection(g),y++}}}return{setup:a,setupView:l,state:n}}function Gd(i){let e=new rv(i),t=[],n=[],s=[];function r(u){d.camera=u,t.length=0,n.length=0,s.length=0}function o(u){t.push(u)}function a(u){n.push(u)}function l(u){s.push(u)}function c(){e.setup(t)}function h(u){e.setupView(t,u)}let d={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:c,setupLightsView:h,pushLight:o,pushShadow:a,pushLightProbeGrid:l}}function ov(i){let e=new WeakMap;function t(s,r=0){let o=e.get(s),a;return o===void 0?(a=new Gd(i),e.set(s,[a])):r>=o.length?(a=new Gd(i),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}var av=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,lv=`uniform sampler2D shadow_pass;
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
}`,cv=[new R(1,0,0),new R(-1,0,0),new R(0,1,0),new R(0,-1,0),new R(0,0,1),new R(0,0,-1)],hv=[new R(0,-1,0),new R(0,-1,0),new R(0,0,1),new R(0,0,-1),new R(0,-1,0),new R(0,-1,0)],Wd=new ot,Hr=new R,lh=new R;function uv(i,e,t){let n=new _s,s=new ne,r=new ne,o=new bt,a=new ca,l=new ha,c={},h=t.maxTextureSize,d={[Yn]:$t,[$t]:Yn,[cn]:cn},u=new an({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ne},radius:{value:4}},vertexShader:av,fragmentShader:lv}),f=u.clone();f.defines.HORIZONTAL_PASS=1;let p=new lt;p.setAttribute("position",new yt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new Ct(p,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ir;let m=this.type;this.render=function(M,A,v){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||M.length===0)return;this.type===Uu&&(Ne("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Ir);let T=i.getRenderTarget(),I=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),F=i.state;F.setBlending(Fn),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);let q=m!==this.type;q&&A.traverse(function($){$.material&&(Array.isArray($.material)?$.material.forEach(O=>O.needsUpdate=!0):$.material.needsUpdate=!0)});for(let $=0,O=M.length;$<O;$++){let X=M[$],B=X.shadow;if(B===void 0){Ne("WebGLShadowMap:",X,"has no shadow.");continue}if(B.autoUpdate===!1&&B.needsUpdate===!1)continue;s.copy(B.mapSize);let G=B.getFrameExtents();s.multiply(G),r.copy(B.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/G.x),s.x=r.x*G.x,B.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/G.y),s.y=r.y*G.y,B.mapSize.y=r.y));let Q=i.state.buffers.depth.getReversed();if(B.camera._reversedDepth=Q,B.map===null||q===!0){if(B.map!==null&&(B.map.depthTexture!==null&&(B.map.depthTexture.dispose(),B.map.depthTexture=null),B.map.dispose()),this.type===Ts){if(X.isPointLight){Ne("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}B.map=new rn(s.x,s.y,{format:Si,type:On,minFilter:zt,magFilter:zt,generateMipmaps:!1}),B.map.texture.name=X.name+".shadowMap",B.map.depthTexture=new Jn(s.x,s.y,Tn),B.map.depthTexture.name=X.name+".shadowMapDepth",B.map.depthTexture.format=Un,B.map.depthTexture.compareFunction=null,B.map.depthTexture.minFilter=Bt,B.map.depthTexture.magFilter=Bt}else X.isPointLight?(B.map=new pl(s.x),B.map.depthTexture=new ta(s.x,wn)):(B.map=new rn(s.x,s.y),B.map.depthTexture=new Jn(s.x,s.y,wn)),B.map.depthTexture.name=X.name+".shadowMap",B.map.depthTexture.format=Un,this.type===Ir?(B.map.depthTexture.compareFunction=Q?hl:cl,B.map.depthTexture.minFilter=zt,B.map.depthTexture.magFilter=zt):(B.map.depthTexture.compareFunction=null,B.map.depthTexture.minFilter=Bt,B.map.depthTexture.magFilter=Bt);B.camera.updateProjectionMatrix()}let le=B.map.isWebGLCubeRenderTarget?6:1;for(let ae=0;ae<le;ae++){if(B.map.isWebGLCubeRenderTarget)i.setRenderTarget(B.map,ae),i.clear();else{ae===0&&(i.setRenderTarget(B.map),i.clear());let Me=B.getViewport(ae);o.set(r.x*Me.x,r.y*Me.y,r.x*Me.z,r.y*Me.w),F.viewport(o)}if(X.isPointLight){let Me=B.camera,je=B.matrix,ft=X.distance||Me.far;ft!==Me.far&&(Me.far=ft,Me.updateProjectionMatrix()),Hr.setFromMatrixPosition(X.matrixWorld),Me.position.copy(Hr),lh.copy(Me.position),lh.add(cv[ae]),Me.up.copy(hv[ae]),Me.lookAt(lh),Me.updateMatrixWorld(),je.makeTranslation(-Hr.x,-Hr.y,-Hr.z),Wd.multiplyMatrices(Me.projectionMatrix,Me.matrixWorldInverse),B._frustum.setFromProjectionMatrix(Wd,Me.coordinateSystem,Me.reversedDepth)}else B.updateMatrices(X);n=B.getFrustum(),_(A,v,B.camera,X,this.type)}B.isPointLightShadow!==!0&&this.type===Ts&&C(B,v),B.needsUpdate=!1}m=this.type,g.needsUpdate=!1,i.setRenderTarget(T,I,P)};function C(M,A){let v=e.update(y);u.defines.VSM_SAMPLES!==M.blurSamples&&(u.defines.VSM_SAMPLES=M.blurSamples,f.defines.VSM_SAMPLES=M.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),M.mapPass===null&&(M.mapPass=new rn(s.x,s.y,{format:Si,type:On})),u.uniforms.shadow_pass.value=M.map.depthTexture,u.uniforms.resolution.value=M.mapSize,u.uniforms.radius.value=M.radius,i.setRenderTarget(M.mapPass),i.clear(),i.renderBufferDirect(A,null,v,u,y,null),f.uniforms.shadow_pass.value=M.mapPass.texture,f.uniforms.resolution.value=M.mapSize,f.uniforms.radius.value=M.radius,i.setRenderTarget(M.map),i.clear(),i.renderBufferDirect(A,null,v,f,y,null)}function w(M,A,v,T){let I=null,P=v.isPointLight===!0?M.customDistanceMaterial:M.customDepthMaterial;if(P!==void 0)I=P;else if(I=v.isPointLight===!0?l:a,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){let F=I.uuid,q=A.uuid,$=c[F];$===void 0&&($={},c[F]=$);let O=$[q];O===void 0&&(O=I.clone(),$[q]=O,A.addEventListener("dispose",S)),I=O}if(I.visible=A.visible,I.wireframe=A.wireframe,T===Ts?I.side=A.shadowSide!==null?A.shadowSide:A.side:I.side=A.shadowSide!==null?A.shadowSide:d[A.side],I.alphaMap=A.alphaMap,I.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,I.map=A.map,I.clipShadows=A.clipShadows,I.clippingPlanes=A.clippingPlanes,I.clipIntersection=A.clipIntersection,I.displacementMap=A.displacementMap,I.displacementScale=A.displacementScale,I.displacementBias=A.displacementBias,I.wireframeLinewidth=A.wireframeLinewidth,I.linewidth=A.linewidth,v.isPointLight===!0&&I.isMeshDistanceMaterial===!0){let F=i.properties.get(I);F.light=v}return I}function _(M,A,v,T,I){if(M.visible===!1)return;if(M.layers.test(A.layers)&&(M.isMesh||M.isLine||M.isPoints)&&(M.castShadow||M.receiveShadow&&I===Ts)&&(!M.frustumCulled||n.intersectsObject(M))){M.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,M.matrixWorld);let q=e.update(M),$=M.material;if(Array.isArray($)){let O=q.groups;for(let X=0,B=O.length;X<B;X++){let G=O[X],Q=$[G.materialIndex];if(Q&&Q.visible){let le=w(M,Q,T,I);M.onBeforeShadow(i,M,A,v,q,le,G),i.renderBufferDirect(v,null,q,le,M,G),M.onAfterShadow(i,M,A,v,q,le,G)}}}else if($.visible){let O=w(M,$,T,I);M.onBeforeShadow(i,M,A,v,q,O,null),i.renderBufferDirect(v,null,q,O,M,null),M.onAfterShadow(i,M,A,v,q,O,null)}}let F=M.children;for(let q=0,$=F.length;q<$;q++)_(F[q],A,v,T,I)}function S(M){M.target.removeEventListener("dispose",S);for(let v in c){let T=c[v],I=M.target.uuid;I in T&&(T[I].dispose(),delete T[I])}}}function dv(i,e){function t(){let D=!1,ue=new bt,J=null,pe=new bt(0,0,0,0);return{setMask:function(be){J!==be&&!D&&(i.colorMask(be,be,be,be),J=be)},setLocked:function(be){D=be},setClear:function(be,te,Ce,we,Et){Et===!0&&(be*=we,te*=we,Ce*=we),ue.set(be,te,Ce,we),pe.equals(ue)===!1&&(i.clearColor(be,te,Ce,we),pe.copy(ue))},reset:function(){D=!1,J=null,pe.set(-1,0,0,0)}}}function n(){let D=!1,ue=!1,J=null,pe=null,be=null;return{setReversed:function(te){if(ue!==te){let Ce=e.get("EXT_clip_control");te?Ce.clipControlEXT(Ce.LOWER_LEFT_EXT,Ce.ZERO_TO_ONE_EXT):Ce.clipControlEXT(Ce.LOWER_LEFT_EXT,Ce.NEGATIVE_ONE_TO_ONE_EXT),ue=te;let we=be;be=null,this.setClear(we)}},getReversed:function(){return ue},setTest:function(te){te?re(i.DEPTH_TEST):Le(i.DEPTH_TEST)},setMask:function(te){J!==te&&!D&&(i.depthMask(te),J=te)},setFunc:function(te){if(ue&&(te=pd[te]),pe!==te){switch(te){case Fo:i.depthFunc(i.NEVER);break;case Oo:i.depthFunc(i.ALWAYS);break;case Bo:i.depthFunc(i.LESS);break;case Fi:i.depthFunc(i.LEQUAL);break;case ko:i.depthFunc(i.EQUAL);break;case zo:i.depthFunc(i.GEQUAL);break;case Ho:i.depthFunc(i.GREATER);break;case Vo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}pe=te}},setLocked:function(te){D=te},setClear:function(te){be!==te&&(be=te,ue&&(te=1-te),i.clearDepth(te))},reset:function(){D=!1,J=null,pe=null,be=null,ue=!1}}}function s(){let D=!1,ue=null,J=null,pe=null,be=null,te=null,Ce=null,we=null,Et=null;return{setTest:function(gt){D||(gt?re(i.STENCIL_TEST):Le(i.STENCIL_TEST))},setMask:function(gt){ue!==gt&&!D&&(i.stencilMask(gt),ue=gt)},setFunc:function(gt,Cn,Rn){(J!==gt||pe!==Cn||be!==Rn)&&(i.stencilFunc(gt,Cn,Rn),J=gt,pe=Cn,be=Rn)},setOp:function(gt,Cn,Rn){(te!==gt||Ce!==Cn||we!==Rn)&&(i.stencilOp(gt,Cn,Rn),te=gt,Ce=Cn,we=Rn)},setLocked:function(gt){D=gt},setClear:function(gt){Et!==gt&&(i.clearStencil(gt),Et=gt)},reset:function(){D=!1,ue=null,J=null,pe=null,be=null,te=null,Ce=null,we=null,Et=null}}}let r=new t,o=new n,a=new s,l=new WeakMap,c=new WeakMap,h={},d={},u={},f=new WeakMap,p=[],y=null,g=!1,m=null,C=null,w=null,_=null,S=null,M=null,A=null,v=new qe(0,0,0),T=0,I=!1,P=null,F=null,q=null,$=null,O=null,X=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),B=!1,G=0,Q=i.getParameter(i.VERSION);Q.indexOf("WebGL")!==-1?(G=parseFloat(/^WebGL (\d)/.exec(Q)[1]),B=G>=1):Q.indexOf("OpenGL ES")!==-1&&(G=parseFloat(/^OpenGL ES (\d)/.exec(Q)[1]),B=G>=2);let le=null,ae={},Me=i.getParameter(i.SCISSOR_BOX),je=i.getParameter(i.VIEWPORT),ft=new bt().fromArray(Me),nt=new bt().fromArray(je);function K(D,ue,J,pe){let be=new Uint8Array(4),te=i.createTexture();i.bindTexture(D,te),i.texParameteri(D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(D,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ce=0;Ce<J;Ce++)D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY?i.texImage3D(ue,0,i.RGBA,1,1,pe,0,i.RGBA,i.UNSIGNED_BYTE,be):i.texImage2D(ue+Ce,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,be);return te}let he={};he[i.TEXTURE_2D]=K(i.TEXTURE_2D,i.TEXTURE_2D,1),he[i.TEXTURE_CUBE_MAP]=K(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),he[i.TEXTURE_2D_ARRAY]=K(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),he[i.TEXTURE_3D]=K(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),re(i.DEPTH_TEST),o.setFunc(Fi),_e(!1),me(Rc),re(i.CULL_FACE),se(Fn);function re(D){h[D]!==!0&&(i.enable(D),h[D]=!0)}function Le(D){h[D]!==!1&&(i.disable(D),h[D]=!1)}function ze(D,ue){return u[D]!==ue?(i.bindFramebuffer(D,ue),u[D]=ue,D===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=ue),D===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=ue),!0):!1}function Fe(D,ue){let J=p,pe=!1;if(D){J=f.get(ue),J===void 0&&(J=[],f.set(ue,J));let be=D.textures;if(J.length!==be.length||J[0]!==i.COLOR_ATTACHMENT0){for(let te=0,Ce=be.length;te<Ce;te++)J[te]=i.COLOR_ATTACHMENT0+te;J.length=be.length,pe=!0}}else J[0]!==i.BACK&&(J[0]=i.BACK,pe=!0);pe&&i.drawBuffers(J)}function st(D){return y!==D?(i.useProgram(D),y=D,!0):!1}let Ve={[li]:i.FUNC_ADD,[Ou]:i.FUNC_SUBTRACT,[Bu]:i.FUNC_REVERSE_SUBTRACT};Ve[ku]=i.MIN,Ve[zu]=i.MAX;let ee={[Hu]:i.ZERO,[Vu]:i.ONE,[Gu]:i.SRC_COLOR,[No]:i.SRC_ALPHA,[$u]:i.SRC_ALPHA_SATURATE,[Yu]:i.DST_COLOR,[Xu]:i.DST_ALPHA,[Wu]:i.ONE_MINUS_SRC_COLOR,[Uo]:i.ONE_MINUS_SRC_ALPHA,[Zu]:i.ONE_MINUS_DST_COLOR,[qu]:i.ONE_MINUS_DST_ALPHA,[Ju]:i.CONSTANT_COLOR,[Ku]:i.ONE_MINUS_CONSTANT_COLOR,[ju]:i.CONSTANT_ALPHA,[Qu]:i.ONE_MINUS_CONSTANT_ALPHA};function se(D,ue,J,pe,be,te,Ce,we,Et,gt){if(D===Fn){g===!0&&(Le(i.BLEND),g=!1);return}if(g===!1&&(re(i.BLEND),g=!0),D!==Fu){if(D!==m||gt!==I){if((C!==li||S!==li)&&(i.blendEquation(i.FUNC_ADD),C=li,S=li),gt)switch(D){case Ui:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Pc:i.blendFunc(i.ONE,i.ONE);break;case Ic:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Lc:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Oe("WebGLState: Invalid blending: ",D);break}else switch(D){case Ui:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Pc:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Ic:Oe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Lc:Oe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Oe("WebGLState: Invalid blending: ",D);break}w=null,_=null,M=null,A=null,v.set(0,0,0),T=0,m=D,I=gt}return}be=be||ue,te=te||J,Ce=Ce||pe,(ue!==C||be!==S)&&(i.blendEquationSeparate(Ve[ue],Ve[be]),C=ue,S=be),(J!==w||pe!==_||te!==M||Ce!==A)&&(i.blendFuncSeparate(ee[J],ee[pe],ee[te],ee[Ce]),w=J,_=pe,M=te,A=Ce),(we.equals(v)===!1||Et!==T)&&(i.blendColor(we.r,we.g,we.b,Et),v.copy(we),T=Et),m=D,I=!1}function ie(D,ue){D.side===cn?Le(i.CULL_FACE):re(i.CULL_FACE);let J=D.side===$t;ue&&(J=!J),_e(J),D.blending===Ui&&D.transparent===!1?se(Fn):se(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),o.setFunc(D.depthFunc),o.setTest(D.depthTest),o.setMask(D.depthWrite),r.setMask(D.colorWrite);let pe=D.stencilWrite;a.setTest(pe),pe&&(a.setMask(D.stencilWriteMask),a.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),a.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),Re(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?re(i.SAMPLE_ALPHA_TO_COVERAGE):Le(i.SAMPLE_ALPHA_TO_COVERAGE)}function _e(D){P!==D&&(D?i.frontFace(i.CW):i.frontFace(i.CCW),P=D)}function me(D){D!==Du?(re(i.CULL_FACE),D!==F&&(D===Rc?i.cullFace(i.BACK):D===Nu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Le(i.CULL_FACE),F=D}function Be(D){D!==q&&(B&&i.lineWidth(D),q=D)}function Re(D,ue,J){D?(re(i.POLYGON_OFFSET_FILL),($!==ue||O!==J)&&($=ue,O=J,o.getReversed()&&(ue=-ue),i.polygonOffset(ue,J))):Le(i.POLYGON_OFFSET_FILL)}function He(D){D?re(i.SCISSOR_TEST):Le(i.SCISSOR_TEST)}function Xe(D){D===void 0&&(D=i.TEXTURE0+X-1),le!==D&&(i.activeTexture(D),le=D)}function L(D,ue,J){J===void 0&&(le===null?J=i.TEXTURE0+X-1:J=le);let pe=ae[J];pe===void 0&&(pe={type:void 0,texture:void 0},ae[J]=pe),(pe.type!==D||pe.texture!==ue)&&(le!==J&&(i.activeTexture(J),le=J),i.bindTexture(D,ue||he[D]),pe.type=D,pe.texture=ue)}function ht(){let D=ae[le];D!==void 0&&D.type!==void 0&&(i.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function et(){try{i.compressedTexImage2D(...arguments)}catch(D){Oe("WebGLState:",D)}}function E(){try{i.compressedTexImage3D(...arguments)}catch(D){Oe("WebGLState:",D)}}function x(){try{i.texSubImage2D(...arguments)}catch(D){Oe("WebGLState:",D)}}function U(){try{i.texSubImage3D(...arguments)}catch(D){Oe("WebGLState:",D)}}function V(){try{i.compressedTexSubImage2D(...arguments)}catch(D){Oe("WebGLState:",D)}}function Y(){try{i.compressedTexSubImage3D(...arguments)}catch(D){Oe("WebGLState:",D)}}function oe(){try{i.texStorage2D(...arguments)}catch(D){Oe("WebGLState:",D)}}function ce(){try{i.texStorage3D(...arguments)}catch(D){Oe("WebGLState:",D)}}function Z(){try{i.texImage2D(...arguments)}catch(D){Oe("WebGLState:",D)}}function j(){try{i.texImage3D(...arguments)}catch(D){Oe("WebGLState:",D)}}function de(D){return d[D]!==void 0?d[D]:i.getParameter(D)}function Pe(D,ue){d[D]!==ue&&(i.pixelStorei(D,ue),d[D]=ue)}function ge(D){ft.equals(D)===!1&&(i.scissor(D.x,D.y,D.z,D.w),ft.copy(D))}function fe(D){nt.equals(D)===!1&&(i.viewport(D.x,D.y,D.z,D.w),nt.copy(D))}function Ue(D,ue){let J=c.get(ue);J===void 0&&(J=new WeakMap,c.set(ue,J));let pe=J.get(D);pe===void 0&&(pe=i.getUniformBlockIndex(ue,D.name),J.set(D,pe))}function ke(D,ue){let pe=c.get(ue).get(D);l.get(ue)!==pe&&(i.uniformBlockBinding(ue,pe,D.__bindingPointIndex),l.set(ue,pe))}function Ye(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},d={},le=null,ae={},u={},f=new WeakMap,p=[],y=null,g=!1,m=null,C=null,w=null,_=null,S=null,M=null,A=null,v=new qe(0,0,0),T=0,I=!1,P=null,F=null,q=null,$=null,O=null,ft.set(0,0,i.canvas.width,i.canvas.height),nt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:re,disable:Le,bindFramebuffer:ze,drawBuffers:Fe,useProgram:st,setBlending:se,setMaterial:ie,setFlipSided:_e,setCullFace:me,setLineWidth:Be,setPolygonOffset:Re,setScissorTest:He,activeTexture:Xe,bindTexture:L,unbindTexture:ht,compressedTexImage2D:et,compressedTexImage3D:E,texImage2D:Z,texImage3D:j,pixelStorei:Pe,getParameter:de,updateUBOMapping:Ue,uniformBlockBinding:ke,texStorage2D:oe,texStorage3D:ce,texSubImage2D:x,texSubImage3D:U,compressedTexSubImage2D:V,compressedTexSubImage3D:Y,scissor:ge,viewport:fe,reset:Ye}}function fv(i,e,t,n,s,r,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ne,h=new WeakMap,d=new Set,u,f=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function y(E,x){return p?new OffscreenCanvas(E,x):rr("canvas")}function g(E,x,U){let V=1,Y=et(E);if((Y.width>U||Y.height>U)&&(V=U/Math.max(Y.width,Y.height)),V<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){let oe=Math.floor(V*Y.width),ce=Math.floor(V*Y.height);u===void 0&&(u=y(oe,ce));let Z=x?y(oe,ce):u;return Z.width=oe,Z.height=ce,Z.getContext("2d").drawImage(E,0,0,oe,ce),Ne("WebGLRenderer: Texture has been resized from ("+Y.width+"x"+Y.height+") to ("+oe+"x"+ce+")."),Z}else return"data"in E&&Ne("WebGLRenderer: Image in DataTexture is too big ("+Y.width+"x"+Y.height+")."),E;return E}function m(E){return E.generateMipmaps}function C(E){i.generateMipmap(E)}function w(E){return E.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?i.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function _(E,x,U,V,Y,oe=!1){if(E!==null){if(i[E]!==void 0)return i[E];Ne("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let ce;V&&(ce=e.get("EXT_texture_norm16"),ce||Ne("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Z=x;if(x===i.RED&&(U===i.FLOAT&&(Z=i.R32F),U===i.HALF_FLOAT&&(Z=i.R16F),U===i.UNSIGNED_BYTE&&(Z=i.R8),U===i.UNSIGNED_SHORT&&ce&&(Z=ce.R16_EXT),U===i.SHORT&&ce&&(Z=ce.R16_SNORM_EXT)),x===i.RED_INTEGER&&(U===i.UNSIGNED_BYTE&&(Z=i.R8UI),U===i.UNSIGNED_SHORT&&(Z=i.R16UI),U===i.UNSIGNED_INT&&(Z=i.R32UI),U===i.BYTE&&(Z=i.R8I),U===i.SHORT&&(Z=i.R16I),U===i.INT&&(Z=i.R32I)),x===i.RG&&(U===i.FLOAT&&(Z=i.RG32F),U===i.HALF_FLOAT&&(Z=i.RG16F),U===i.UNSIGNED_BYTE&&(Z=i.RG8),U===i.UNSIGNED_SHORT&&ce&&(Z=ce.RG16_EXT),U===i.SHORT&&ce&&(Z=ce.RG16_SNORM_EXT)),x===i.RG_INTEGER&&(U===i.UNSIGNED_BYTE&&(Z=i.RG8UI),U===i.UNSIGNED_SHORT&&(Z=i.RG16UI),U===i.UNSIGNED_INT&&(Z=i.RG32UI),U===i.BYTE&&(Z=i.RG8I),U===i.SHORT&&(Z=i.RG16I),U===i.INT&&(Z=i.RG32I)),x===i.RGB_INTEGER&&(U===i.UNSIGNED_BYTE&&(Z=i.RGB8UI),U===i.UNSIGNED_SHORT&&(Z=i.RGB16UI),U===i.UNSIGNED_INT&&(Z=i.RGB32UI),U===i.BYTE&&(Z=i.RGB8I),U===i.SHORT&&(Z=i.RGB16I),U===i.INT&&(Z=i.RGB32I)),x===i.RGBA_INTEGER&&(U===i.UNSIGNED_BYTE&&(Z=i.RGBA8UI),U===i.UNSIGNED_SHORT&&(Z=i.RGBA16UI),U===i.UNSIGNED_INT&&(Z=i.RGBA32UI),U===i.BYTE&&(Z=i.RGBA8I),U===i.SHORT&&(Z=i.RGBA16I),U===i.INT&&(Z=i.RGBA32I)),x===i.RGB&&(U===i.UNSIGNED_SHORT&&ce&&(Z=ce.RGB16_EXT),U===i.SHORT&&ce&&(Z=ce.RGB16_SNORM_EXT),U===i.UNSIGNED_INT_5_9_9_9_REV&&(Z=i.RGB9_E5),U===i.UNSIGNED_INT_10F_11F_11F_REV&&(Z=i.R11F_G11F_B10F)),x===i.RGBA){let j=oe?sr:tt.getTransfer(Y);U===i.FLOAT&&(Z=i.RGBA32F),U===i.HALF_FLOAT&&(Z=i.RGBA16F),U===i.UNSIGNED_BYTE&&(Z=j===rt?i.SRGB8_ALPHA8:i.RGBA8),U===i.UNSIGNED_SHORT&&ce&&(Z=ce.RGBA16_EXT),U===i.SHORT&&ce&&(Z=ce.RGBA16_SNORM_EXT),U===i.UNSIGNED_SHORT_4_4_4_4&&(Z=i.RGBA4),U===i.UNSIGNED_SHORT_5_5_5_1&&(Z=i.RGB5_A1)}return(Z===i.R16F||Z===i.R32F||Z===i.RG16F||Z===i.RG32F||Z===i.RGBA16F||Z===i.RGBA32F)&&e.get("EXT_color_buffer_float"),Z}function S(E,x){let U;return E?x===null||x===wn||x===Cs?U=i.DEPTH24_STENCIL8:x===Tn?U=i.DEPTH32F_STENCIL8:x===As&&(U=i.DEPTH24_STENCIL8,Ne("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===wn||x===Cs?U=i.DEPTH_COMPONENT24:x===Tn?U=i.DEPTH_COMPONENT32F:x===As&&(U=i.DEPTH_COMPONENT16),U}function M(E,x){return m(E)===!0||E.isFramebufferTexture&&E.minFilter!==Bt&&E.minFilter!==zt?Math.log2(Math.max(x.width,x.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?x.mipmaps.length:1}function A(E){let x=E.target;x.removeEventListener("dispose",A),T(x),x.isVideoTexture&&h.delete(x),x.isHTMLTexture&&d.delete(x)}function v(E){let x=E.target;x.removeEventListener("dispose",v),P(x)}function T(E){let x=n.get(E);if(x.__webglInit===void 0)return;let U=E.source,V=f.get(U);if(V){let Y=V[x.__cacheKey];Y.usedTimes--,Y.usedTimes===0&&I(E),Object.keys(V).length===0&&f.delete(U)}n.remove(E)}function I(E){let x=n.get(E);i.deleteTexture(x.__webglTexture);let U=E.source,V=f.get(U);delete V[x.__cacheKey],o.memory.textures--}function P(E){let x=n.get(E);if(E.depthTexture&&(E.depthTexture.dispose(),n.remove(E.depthTexture)),E.isWebGLCubeRenderTarget)for(let V=0;V<6;V++){if(Array.isArray(x.__webglFramebuffer[V]))for(let Y=0;Y<x.__webglFramebuffer[V].length;Y++)i.deleteFramebuffer(x.__webglFramebuffer[V][Y]);else i.deleteFramebuffer(x.__webglFramebuffer[V]);x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer[V])}else{if(Array.isArray(x.__webglFramebuffer))for(let V=0;V<x.__webglFramebuffer.length;V++)i.deleteFramebuffer(x.__webglFramebuffer[V]);else i.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&i.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let V=0;V<x.__webglColorRenderbuffer.length;V++)x.__webglColorRenderbuffer[V]&&i.deleteRenderbuffer(x.__webglColorRenderbuffer[V]);x.__webglDepthRenderbuffer&&i.deleteRenderbuffer(x.__webglDepthRenderbuffer)}let U=E.textures;for(let V=0,Y=U.length;V<Y;V++){let oe=n.get(U[V]);oe.__webglTexture&&(i.deleteTexture(oe.__webglTexture),o.memory.textures--),n.remove(U[V])}n.remove(E)}let F=0;function q(){F=0}function $(){return F}function O(E){F=E}function X(){let E=F;return E>=s.maxTextures&&Ne("WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+s.maxTextures),F+=1,E}function B(E){let x=[];return x.push(E.wrapS),x.push(E.wrapT),x.push(E.wrapR||0),x.push(E.magFilter),x.push(E.minFilter),x.push(E.anisotropy),x.push(E.internalFormat),x.push(E.format),x.push(E.type),x.push(E.generateMipmaps),x.push(E.premultiplyAlpha),x.push(E.flipY),x.push(E.unpackAlignment),x.push(E.colorSpace),x.join()}function G(E,x){let U=n.get(E);if(E.isVideoTexture&&L(E),E.isRenderTargetTexture===!1&&E.isExternalTexture!==!0&&E.version>0&&U.__version!==E.version){let V=E.image;if(V===null)Ne("WebGLRenderer: Texture marked for update but no image data found.");else if(V.complete===!1)Ne("WebGLRenderer: Texture marked for update but image is incomplete");else{Le(U,E,x);return}}else E.isExternalTexture&&(U.__webglTexture=E.sourceTexture?E.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,U.__webglTexture,i.TEXTURE0+x)}function Q(E,x){let U=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&U.__version!==E.version){Le(U,E,x);return}else E.isExternalTexture&&(U.__webglTexture=E.sourceTexture?E.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,U.__webglTexture,i.TEXTURE0+x)}function le(E,x){let U=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&U.__version!==E.version){Le(U,E,x);return}t.bindTexture(i.TEXTURE_3D,U.__webglTexture,i.TEXTURE0+x)}function ae(E,x){let U=n.get(E);if(E.isCubeDepthTexture!==!0&&E.version>0&&U.__version!==E.version){ze(U,E,x);return}t.bindTexture(i.TEXTURE_CUBE_MAP,U.__webglTexture,i.TEXTURE0+x)}let Me={[Go]:i.REPEAT,[Dn]:i.CLAMP_TO_EDGE,[Wo]:i.MIRRORED_REPEAT},je={[Bt]:i.NEAREST,[nd]:i.NEAREST_MIPMAP_NEAREST,[Dr]:i.NEAREST_MIPMAP_LINEAR,[zt]:i.LINEAR,[wa]:i.LINEAR_MIPMAP_NEAREST,[bi]:i.LINEAR_MIPMAP_LINEAR},ft={[rd]:i.NEVER,[hd]:i.ALWAYS,[od]:i.LESS,[cl]:i.LEQUAL,[ad]:i.EQUAL,[hl]:i.GEQUAL,[ld]:i.GREATER,[cd]:i.NOTEQUAL};function nt(E,x){if(x.type===Tn&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===zt||x.magFilter===wa||x.magFilter===Dr||x.magFilter===bi||x.minFilter===zt||x.minFilter===wa||x.minFilter===Dr||x.minFilter===bi)&&Ne("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(E,i.TEXTURE_WRAP_S,Me[x.wrapS]),i.texParameteri(E,i.TEXTURE_WRAP_T,Me[x.wrapT]),(E===i.TEXTURE_3D||E===i.TEXTURE_2D_ARRAY)&&i.texParameteri(E,i.TEXTURE_WRAP_R,Me[x.wrapR]),i.texParameteri(E,i.TEXTURE_MAG_FILTER,je[x.magFilter]),i.texParameteri(E,i.TEXTURE_MIN_FILTER,je[x.minFilter]),x.compareFunction&&(i.texParameteri(E,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(E,i.TEXTURE_COMPARE_FUNC,ft[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===Bt||x.minFilter!==Dr&&x.minFilter!==bi||x.type===Tn&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){let U=e.get("EXT_texture_filter_anisotropic");i.texParameterf(E,U.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function K(E,x){let U=!1;E.__webglInit===void 0&&(E.__webglInit=!0,x.addEventListener("dispose",A));let V=x.source,Y=f.get(V);Y===void 0&&(Y={},f.set(V,Y));let oe=B(x);if(oe!==E.__cacheKey){Y[oe]===void 0&&(Y[oe]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,U=!0),Y[oe].usedTimes++;let ce=Y[E.__cacheKey];ce!==void 0&&(Y[E.__cacheKey].usedTimes--,ce.usedTimes===0&&I(x)),E.__cacheKey=oe,E.__webglTexture=Y[oe].texture}return U}function he(E,x,U){return Math.floor(Math.floor(E/U)/x)}function re(E,x,U,V){let oe=E.updateRanges;if(oe.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,x.width,x.height,U,V,x.data);else{oe.sort((Pe,ge)=>Pe.start-ge.start);let ce=0;for(let Pe=1;Pe<oe.length;Pe++){let ge=oe[ce],fe=oe[Pe],Ue=ge.start+ge.count,ke=he(fe.start,x.width,4),Ye=he(ge.start,x.width,4);fe.start<=Ue+1&&ke===Ye&&he(fe.start+fe.count-1,x.width,4)===ke?ge.count=Math.max(ge.count,fe.start+fe.count-ge.start):(++ce,oe[ce]=fe)}oe.length=ce+1;let Z=t.getParameter(i.UNPACK_ROW_LENGTH),j=t.getParameter(i.UNPACK_SKIP_PIXELS),de=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,x.width);for(let Pe=0,ge=oe.length;Pe<ge;Pe++){let fe=oe[Pe],Ue=Math.floor(fe.start/4),ke=Math.ceil(fe.count/4),Ye=Ue%x.width,D=Math.floor(Ue/x.width),ue=ke,J=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,Ye),t.pixelStorei(i.UNPACK_SKIP_ROWS,D),t.texSubImage2D(i.TEXTURE_2D,0,Ye,D,ue,J,U,V,x.data)}E.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,Z),t.pixelStorei(i.UNPACK_SKIP_PIXELS,j),t.pixelStorei(i.UNPACK_SKIP_ROWS,de)}}function Le(E,x,U){let V=i.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(V=i.TEXTURE_2D_ARRAY),x.isData3DTexture&&(V=i.TEXTURE_3D);let Y=K(E,x),oe=x.source;t.bindTexture(V,E.__webglTexture,i.TEXTURE0+U);let ce=n.get(oe);if(oe.version!==ce.__version||Y===!0){if(t.activeTexture(i.TEXTURE0+U),(typeof ImageBitmap<"u"&&x.image instanceof ImageBitmap)===!1){let J=tt.getPrimaries(tt.workingColorSpace),pe=x.colorSpace===Kn?null:tt.getPrimaries(x.colorSpace),be=x.colorSpace===Kn||J===pe?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,be)}t.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment);let j=g(x.image,!1,s.maxTextureSize);j=ht(x,j);let de=r.convert(x.format,x.colorSpace),Pe=r.convert(x.type),ge=_(x.internalFormat,de,Pe,x.normalized,x.colorSpace,x.isVideoTexture);nt(V,x);let fe,Ue=x.mipmaps,ke=x.isVideoTexture!==!0,Ye=ce.__version===void 0||Y===!0,D=oe.dataReady,ue=M(x,j);if(x.isDepthTexture)ge=S(x.format===Mi,x.type),Ye&&(ke?t.texStorage2D(i.TEXTURE_2D,1,ge,j.width,j.height):t.texImage2D(i.TEXTURE_2D,0,ge,j.width,j.height,0,de,Pe,null));else if(x.isDataTexture)if(Ue.length>0){ke&&Ye&&t.texStorage2D(i.TEXTURE_2D,ue,ge,Ue[0].width,Ue[0].height);for(let J=0,pe=Ue.length;J<pe;J++)fe=Ue[J],ke?D&&t.texSubImage2D(i.TEXTURE_2D,J,0,0,fe.width,fe.height,de,Pe,fe.data):t.texImage2D(i.TEXTURE_2D,J,ge,fe.width,fe.height,0,de,Pe,fe.data);x.generateMipmaps=!1}else ke?(Ye&&t.texStorage2D(i.TEXTURE_2D,ue,ge,j.width,j.height),D&&re(x,j,de,Pe)):t.texImage2D(i.TEXTURE_2D,0,ge,j.width,j.height,0,de,Pe,j.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){ke&&Ye&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ue,ge,Ue[0].width,Ue[0].height,j.depth);for(let J=0,pe=Ue.length;J<pe;J++)if(fe=Ue[J],x.format!==mn)if(de!==null)if(ke){if(D)if(x.layerUpdates.size>0){let be=nh(fe.width,fe.height,x.format,x.type);for(let te of x.layerUpdates){let Ce=fe.data.subarray(te*be/fe.data.BYTES_PER_ELEMENT,(te+1)*be/fe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,te,fe.width,fe.height,1,de,Ce)}x.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,0,fe.width,fe.height,j.depth,de,fe.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,J,ge,fe.width,fe.height,j.depth,0,fe.data,0,0);else Ne("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ke?D&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,0,fe.width,fe.height,j.depth,de,Pe,fe.data):t.texImage3D(i.TEXTURE_2D_ARRAY,J,ge,fe.width,fe.height,j.depth,0,de,Pe,fe.data)}else{ke&&Ye&&t.texStorage2D(i.TEXTURE_2D,ue,ge,Ue[0].width,Ue[0].height);for(let J=0,pe=Ue.length;J<pe;J++)fe=Ue[J],x.format!==mn?de!==null?ke?D&&t.compressedTexSubImage2D(i.TEXTURE_2D,J,0,0,fe.width,fe.height,de,fe.data):t.compressedTexImage2D(i.TEXTURE_2D,J,ge,fe.width,fe.height,0,fe.data):Ne("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ke?D&&t.texSubImage2D(i.TEXTURE_2D,J,0,0,fe.width,fe.height,de,Pe,fe.data):t.texImage2D(i.TEXTURE_2D,J,ge,fe.width,fe.height,0,de,Pe,fe.data)}else if(x.isDataArrayTexture)if(ke){if(Ye&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ue,ge,j.width,j.height,j.depth),D)if(x.layerUpdates.size>0){let J=nh(j.width,j.height,x.format,x.type);for(let pe of x.layerUpdates){let be=j.data.subarray(pe*J/j.data.BYTES_PER_ELEMENT,(pe+1)*J/j.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,pe,j.width,j.height,1,de,Pe,be)}x.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,j.width,j.height,j.depth,de,Pe,j.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,ge,j.width,j.height,j.depth,0,de,Pe,j.data);else if(x.isData3DTexture)ke?(Ye&&t.texStorage3D(i.TEXTURE_3D,ue,ge,j.width,j.height,j.depth),D&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,j.width,j.height,j.depth,de,Pe,j.data)):t.texImage3D(i.TEXTURE_3D,0,ge,j.width,j.height,j.depth,0,de,Pe,j.data);else if(x.isFramebufferTexture){if(Ye)if(ke)t.texStorage2D(i.TEXTURE_2D,ue,ge,j.width,j.height);else{let J=j.width,pe=j.height;for(let be=0;be<ue;be++)t.texImage2D(i.TEXTURE_2D,be,ge,J,pe,0,de,Pe,null),J>>=1,pe>>=1}}else if(x.isHTMLTexture){if("texElementImage2D"in i){let J=i.canvas;if(J.hasAttribute("layoutsubtree")||J.setAttribute("layoutsubtree","true"),j.parentNode!==J){J.appendChild(j),d.add(x),J.onpaint=pe=>{let be=pe.changedElements;for(let te of d)be.includes(te.image)&&(te.needsUpdate=!0)},J.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,j);else{let be=i.RGBA,te=i.RGBA,Ce=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,be,te,Ce,j)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Ue.length>0){if(ke&&Ye){let J=et(Ue[0]);t.texStorage2D(i.TEXTURE_2D,ue,ge,J.width,J.height)}for(let J=0,pe=Ue.length;J<pe;J++)fe=Ue[J],ke?D&&t.texSubImage2D(i.TEXTURE_2D,J,0,0,de,Pe,fe):t.texImage2D(i.TEXTURE_2D,J,ge,de,Pe,fe);x.generateMipmaps=!1}else if(ke){if(Ye){let J=et(j);t.texStorage2D(i.TEXTURE_2D,ue,ge,J.width,J.height)}D&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,de,Pe,j)}else t.texImage2D(i.TEXTURE_2D,0,ge,de,Pe,j);m(x)&&C(V),ce.__version=oe.version,x.onUpdate&&x.onUpdate(x)}E.__version=x.version}function ze(E,x,U){if(x.image.length!==6)return;let V=K(E,x),Y=x.source;t.bindTexture(i.TEXTURE_CUBE_MAP,E.__webglTexture,i.TEXTURE0+U);let oe=n.get(Y);if(Y.version!==oe.__version||V===!0){t.activeTexture(i.TEXTURE0+U);let ce=tt.getPrimaries(tt.workingColorSpace),Z=x.colorSpace===Kn?null:tt.getPrimaries(x.colorSpace),j=x.colorSpace===Kn||ce===Z?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,j);let de=x.isCompressedTexture||x.image[0].isCompressedTexture,Pe=x.image[0]&&x.image[0].isDataTexture,ge=[];for(let te=0;te<6;te++)!de&&!Pe?ge[te]=g(x.image[te],!0,s.maxCubemapSize):ge[te]=Pe?x.image[te].image:x.image[te],ge[te]=ht(x,ge[te]);let fe=ge[0],Ue=r.convert(x.format,x.colorSpace),ke=r.convert(x.type),Ye=_(x.internalFormat,Ue,ke,x.normalized,x.colorSpace),D=x.isVideoTexture!==!0,ue=oe.__version===void 0||V===!0,J=Y.dataReady,pe=M(x,fe);nt(i.TEXTURE_CUBE_MAP,x);let be;if(de){D&&ue&&t.texStorage2D(i.TEXTURE_CUBE_MAP,pe,Ye,fe.width,fe.height);for(let te=0;te<6;te++){be=ge[te].mipmaps;for(let Ce=0;Ce<be.length;Ce++){let we=be[Ce];x.format!==mn?Ue!==null?D?J&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ce,0,0,we.width,we.height,Ue,we.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ce,Ye,we.width,we.height,0,we.data):Ne("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?J&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ce,0,0,we.width,we.height,Ue,ke,we.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ce,Ye,we.width,we.height,0,Ue,ke,we.data)}}}else{if(be=x.mipmaps,D&&ue){be.length>0&&pe++;let te=et(ge[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,pe,Ye,te.width,te.height)}for(let te=0;te<6;te++)if(Pe){D?J&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,ge[te].width,ge[te].height,Ue,ke,ge[te].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,Ye,ge[te].width,ge[te].height,0,Ue,ke,ge[te].data);for(let Ce=0;Ce<be.length;Ce++){let Et=be[Ce].image[te].image;D?J&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ce+1,0,0,Et.width,Et.height,Ue,ke,Et.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ce+1,Ye,Et.width,Et.height,0,Ue,ke,Et.data)}}else{D?J&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,Ue,ke,ge[te]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,Ye,Ue,ke,ge[te]);for(let Ce=0;Ce<be.length;Ce++){let we=be[Ce];D?J&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ce+1,0,0,Ue,ke,we.image[te]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ce+1,Ye,Ue,ke,we.image[te])}}}m(x)&&C(i.TEXTURE_CUBE_MAP),oe.__version=Y.version,x.onUpdate&&x.onUpdate(x)}E.__version=x.version}function Fe(E,x,U,V,Y,oe){let ce=r.convert(U.format,U.colorSpace),Z=r.convert(U.type),j=_(U.internalFormat,ce,Z,U.normalized,U.colorSpace),de=n.get(x),Pe=n.get(U);if(Pe.__renderTarget=x,!de.__hasExternalTextures){let ge=Math.max(1,x.width>>oe),fe=Math.max(1,x.height>>oe);Y===i.TEXTURE_3D||Y===i.TEXTURE_2D_ARRAY?t.texImage3D(Y,oe,j,ge,fe,x.depth,0,ce,Z,null):t.texImage2D(Y,oe,j,ge,fe,0,ce,Z,null)}t.bindFramebuffer(i.FRAMEBUFFER,E),Xe(x)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,V,Y,Pe.__webglTexture,0,He(x)):(Y===i.TEXTURE_2D||Y>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Y<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,V,Y,Pe.__webglTexture,oe),t.bindFramebuffer(i.FRAMEBUFFER,null)}function st(E,x,U){if(i.bindRenderbuffer(i.RENDERBUFFER,E),x.depthBuffer){let V=x.depthTexture,Y=V&&V.isDepthTexture?V.type:null,oe=S(x.stencilBuffer,Y),ce=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;Xe(x)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,He(x),oe,x.width,x.height):U?i.renderbufferStorageMultisample(i.RENDERBUFFER,He(x),oe,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,oe,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ce,i.RENDERBUFFER,E)}else{let V=x.textures;for(let Y=0;Y<V.length;Y++){let oe=V[Y],ce=r.convert(oe.format,oe.colorSpace),Z=r.convert(oe.type),j=_(oe.internalFormat,ce,Z,oe.normalized,oe.colorSpace);Xe(x)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,He(x),j,x.width,x.height):U?i.renderbufferStorageMultisample(i.RENDERBUFFER,He(x),j,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,j,x.width,x.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ve(E,x,U){let V=x.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,E),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let Y=n.get(x.depthTexture);if(Y.__renderTarget=x,(!Y.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),V){if(Y.__webglInit===void 0&&(Y.__webglInit=!0,x.depthTexture.addEventListener("dispose",A)),Y.__webglTexture===void 0){Y.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture),nt(i.TEXTURE_CUBE_MAP,x.depthTexture);let de=r.convert(x.depthTexture.format),Pe=r.convert(x.depthTexture.type),ge;x.depthTexture.format===Un?ge=i.DEPTH_COMPONENT24:x.depthTexture.format===Mi&&(ge=i.DEPTH24_STENCIL8);for(let fe=0;fe<6;fe++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,ge,x.width,x.height,0,de,Pe,null)}}else G(x.depthTexture,0);let oe=Y.__webglTexture,ce=He(x),Z=V?i.TEXTURE_CUBE_MAP_POSITIVE_X+U:i.TEXTURE_2D,j=x.depthTexture.format===Mi?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(x.depthTexture.format===Un)Xe(x)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,j,Z,oe,0,ce):i.framebufferTexture2D(i.FRAMEBUFFER,j,Z,oe,0);else if(x.depthTexture.format===Mi)Xe(x)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,j,Z,oe,0,ce):i.framebufferTexture2D(i.FRAMEBUFFER,j,Z,oe,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ee(E){let x=n.get(E),U=E.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==E.depthTexture){let V=E.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),V){let Y=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,V.removeEventListener("dispose",Y)};V.addEventListener("dispose",Y),x.__depthDisposeCallback=Y}x.__boundDepthTexture=V}if(E.depthTexture&&!x.__autoAllocateDepthBuffer)if(U)for(let V=0;V<6;V++)Ve(x.__webglFramebuffer[V],E,V);else{let V=E.texture.mipmaps;V&&V.length>0?Ve(x.__webglFramebuffer[0],E,0):Ve(x.__webglFramebuffer,E,0)}else if(U){x.__webglDepthbuffer=[];for(let V=0;V<6;V++)if(t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[V]),x.__webglDepthbuffer[V]===void 0)x.__webglDepthbuffer[V]=i.createRenderbuffer(),st(x.__webglDepthbuffer[V],E,!1);else{let Y=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,oe=x.__webglDepthbuffer[V];i.bindRenderbuffer(i.RENDERBUFFER,oe),i.framebufferRenderbuffer(i.FRAMEBUFFER,Y,i.RENDERBUFFER,oe)}}else{let V=E.texture.mipmaps;if(V&&V.length>0?t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=i.createRenderbuffer(),st(x.__webglDepthbuffer,E,!1);else{let Y=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,oe=x.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,oe),i.framebufferRenderbuffer(i.FRAMEBUFFER,Y,i.RENDERBUFFER,oe)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function se(E,x,U){let V=n.get(E);x!==void 0&&Fe(V.__webglFramebuffer,E,E.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),U!==void 0&&ee(E)}function ie(E){let x=E.texture,U=n.get(E),V=n.get(x);E.addEventListener("dispose",v);let Y=E.textures,oe=E.isWebGLCubeRenderTarget===!0,ce=Y.length>1;if(ce||(V.__webglTexture===void 0&&(V.__webglTexture=i.createTexture()),V.__version=x.version,o.memory.textures++),oe){U.__webglFramebuffer=[];for(let Z=0;Z<6;Z++)if(x.mipmaps&&x.mipmaps.length>0){U.__webglFramebuffer[Z]=[];for(let j=0;j<x.mipmaps.length;j++)U.__webglFramebuffer[Z][j]=i.createFramebuffer()}else U.__webglFramebuffer[Z]=i.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){U.__webglFramebuffer=[];for(let Z=0;Z<x.mipmaps.length;Z++)U.__webglFramebuffer[Z]=i.createFramebuffer()}else U.__webglFramebuffer=i.createFramebuffer();if(ce)for(let Z=0,j=Y.length;Z<j;Z++){let de=n.get(Y[Z]);de.__webglTexture===void 0&&(de.__webglTexture=i.createTexture(),o.memory.textures++)}if(E.samples>0&&Xe(E)===!1){U.__webglMultisampledFramebuffer=i.createFramebuffer(),U.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,U.__webglMultisampledFramebuffer);for(let Z=0;Z<Y.length;Z++){let j=Y[Z];U.__webglColorRenderbuffer[Z]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,U.__webglColorRenderbuffer[Z]);let de=r.convert(j.format,j.colorSpace),Pe=r.convert(j.type),ge=_(j.internalFormat,de,Pe,j.normalized,j.colorSpace,E.isXRRenderTarget===!0),fe=He(E);i.renderbufferStorageMultisample(i.RENDERBUFFER,fe,ge,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Z,i.RENDERBUFFER,U.__webglColorRenderbuffer[Z])}i.bindRenderbuffer(i.RENDERBUFFER,null),E.depthBuffer&&(U.__webglDepthRenderbuffer=i.createRenderbuffer(),st(U.__webglDepthRenderbuffer,E,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(oe){t.bindTexture(i.TEXTURE_CUBE_MAP,V.__webglTexture),nt(i.TEXTURE_CUBE_MAP,x);for(let Z=0;Z<6;Z++)if(x.mipmaps&&x.mipmaps.length>0)for(let j=0;j<x.mipmaps.length;j++)Fe(U.__webglFramebuffer[Z][j],E,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,j);else Fe(U.__webglFramebuffer[Z],E,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0);m(x)&&C(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ce){for(let Z=0,j=Y.length;Z<j;Z++){let de=Y[Z],Pe=n.get(de),ge=i.TEXTURE_2D;(E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(ge=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ge,Pe.__webglTexture),nt(ge,de),Fe(U.__webglFramebuffer,E,de,i.COLOR_ATTACHMENT0+Z,ge,0),m(de)&&C(ge)}t.unbindTexture()}else{let Z=i.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(Z=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Z,V.__webglTexture),nt(Z,x),x.mipmaps&&x.mipmaps.length>0)for(let j=0;j<x.mipmaps.length;j++)Fe(U.__webglFramebuffer[j],E,x,i.COLOR_ATTACHMENT0,Z,j);else Fe(U.__webglFramebuffer,E,x,i.COLOR_ATTACHMENT0,Z,0);m(x)&&C(Z),t.unbindTexture()}E.depthBuffer&&ee(E)}function _e(E){let x=E.textures;for(let U=0,V=x.length;U<V;U++){let Y=x[U];if(m(Y)){let oe=w(E),ce=n.get(Y).__webglTexture;t.bindTexture(oe,ce),C(oe),t.unbindTexture()}}}let me=[],Be=[];function Re(E){if(E.samples>0){if(Xe(E)===!1){let x=E.textures,U=E.width,V=E.height,Y=i.COLOR_BUFFER_BIT,oe=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ce=n.get(E),Z=x.length>1;if(Z)for(let de=0;de<x.length;de++)t.bindFramebuffer(i.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+de,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ce.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+de,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ce.__webglMultisampledFramebuffer);let j=E.texture.mipmaps;j&&j.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ce.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ce.__webglFramebuffer);for(let de=0;de<x.length;de++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(Y|=i.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(Y|=i.STENCIL_BUFFER_BIT)),Z){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ce.__webglColorRenderbuffer[de]);let Pe=n.get(x[de]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Pe,0)}i.blitFramebuffer(0,0,U,V,0,0,U,V,Y,i.NEAREST),l===!0&&(me.length=0,Be.length=0,me.push(i.COLOR_ATTACHMENT0+de),E.depthBuffer&&E.resolveDepthBuffer===!1&&(me.push(oe),Be.push(oe),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Be)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,me))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Z)for(let de=0;de<x.length;de++){t.bindFramebuffer(i.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+de,i.RENDERBUFFER,ce.__webglColorRenderbuffer[de]);let Pe=n.get(x[de]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ce.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+de,i.TEXTURE_2D,Pe,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ce.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.resolveDepthBuffer===!1&&l){let x=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[x])}}}function He(E){return Math.min(s.maxSamples,E.samples)}function Xe(E){let x=n.get(E);return E.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function L(E){let x=o.render.frame;h.get(E)!==x&&(h.set(E,x),E.update())}function ht(E,x){let U=E.colorSpace,V=E.format,Y=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||U!==ir&&U!==Kn&&(tt.getTransfer(U)===rt?(V!==mn||Y!==Kt)&&Ne("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Oe("WebGLTextures: Unsupported texture color space:",U)),x}function et(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(c.width=E.naturalWidth||E.width,c.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(c.width=E.displayWidth,c.height=E.displayHeight):(c.width=E.width,c.height=E.height),c}this.allocateTextureUnit=X,this.resetTextureUnits=q,this.getTextureUnits=$,this.setTextureUnits=O,this.setTexture2D=G,this.setTexture2DArray=Q,this.setTexture3D=le,this.setTextureCube=ae,this.rebindTextures=se,this.setupRenderTarget=ie,this.updateRenderTargetMipmap=_e,this.updateMultisampleRenderTarget=Re,this.setupDepthRenderbuffer=ee,this.setupFrameBufferTexture=Fe,this.useMultisampledRTT=Xe,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function pv(i,e){function t(n,s=Kn){let r,o=tt.getTransfer(s);if(n===Kt)return i.UNSIGNED_BYTE;if(n===Aa)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Ca)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Wc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Xc)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Vc)return i.BYTE;if(n===Gc)return i.SHORT;if(n===As)return i.UNSIGNED_SHORT;if(n===Ta)return i.INT;if(n===wn)return i.UNSIGNED_INT;if(n===Tn)return i.FLOAT;if(n===On)return i.HALF_FLOAT;if(n===qc)return i.ALPHA;if(n===Yc)return i.RGB;if(n===mn)return i.RGBA;if(n===Un)return i.DEPTH_COMPONENT;if(n===Mi)return i.DEPTH_STENCIL;if(n===Zc)return i.RED;if(n===Ra)return i.RED_INTEGER;if(n===Si)return i.RG;if(n===Pa)return i.RG_INTEGER;if(n===Ia)return i.RGBA_INTEGER;if(n===Nr||n===Ur||n===Fr||n===Or)if(o===rt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Nr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ur)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Fr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Or)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Nr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ur)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Fr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Or)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===La||n===Da||n===Na||n===Ua)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===La)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Da)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Na)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ua)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Fa||n===Oa||n===Ba||n===ka||n===za||n===Br||n===Ha)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Fa||n===Oa)return o===rt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Ba)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===ka)return r.COMPRESSED_R11_EAC;if(n===za)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Br)return r.COMPRESSED_RG11_EAC;if(n===Ha)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Va||n===Ga||n===Wa||n===Xa||n===qa||n===Ya||n===Za||n===$a||n===Ja||n===Ka||n===ja||n===Qa||n===el||n===tl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Va)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ga)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Wa)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Xa)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===qa)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ya)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Za)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===$a)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ja)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ka)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ja)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Qa)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===el)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===tl)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===nl||n===il||n===sl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===nl)return o===rt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===il)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===sl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===rl||n===ol||n===kr||n===al)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===rl)return r.COMPRESSED_RED_RGTC1_EXT;if(n===ol)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===kr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===al)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Cs?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var mv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,gv=`
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

}`,gh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new pr(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new an({vertexShader:mv,fragmentShader:gv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ct(new di(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},xh=class extends bn{constructor(e,t){super();let n=this,s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,p=null,y=typeof XRWebGLBinding<"u",g=new gh,m={},C=t.getContextAttributes(),w=null,_=null,S=[],M=[],A=new ne,v=null,T=new Xt;T.viewport=new bt;let I=new Xt;I.viewport=new bt;let P=[T,I],F=new Ma,q=null,$=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let he=S[K];return he===void 0&&(he=new gs,S[K]=he),he.getTargetRaySpace()},this.getControllerGrip=function(K){let he=S[K];return he===void 0&&(he=new gs,S[K]=he),he.getGripSpace()},this.getHand=function(K){let he=S[K];return he===void 0&&(he=new gs,S[K]=he),he.getHandSpace()};function O(K){let he=M.indexOf(K.inputSource);if(he===-1)return;let re=S[he];re!==void 0&&(re.update(K.inputSource,K.frame,c||o),re.dispatchEvent({type:K.type,data:K.inputSource}))}function X(){s.removeEventListener("select",O),s.removeEventListener("selectstart",O),s.removeEventListener("selectend",O),s.removeEventListener("squeeze",O),s.removeEventListener("squeezestart",O),s.removeEventListener("squeezeend",O),s.removeEventListener("end",X),s.removeEventListener("inputsourceschange",B);for(let K=0;K<S.length;K++){let he=M[K];he!==null&&(M[K]=null,S[K].disconnect(he))}q=null,$=null,g.reset();for(let K in m)delete m[K];e.setRenderTarget(w),f=null,u=null,d=null,s=null,_=null,nt.stop(),n.isPresenting=!1,e.setPixelRatio(v),e.setSize(A.width,A.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){r=K,n.isPresenting===!0&&Ne("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){a=K,n.isPresenting===!0&&Ne("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(K){c=K},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d===null&&y&&(d=new XRWebGLBinding(s,t)),d},this.getFrame=function(){return p},this.getSession=function(){return s},this.setSession=async function(K){if(s=K,s!==null){if(w=e.getRenderTarget(),s.addEventListener("select",O),s.addEventListener("selectstart",O),s.addEventListener("selectend",O),s.addEventListener("squeeze",O),s.addEventListener("squeezestart",O),s.addEventListener("squeezeend",O),s.addEventListener("end",X),s.addEventListener("inputsourceschange",B),C.xrCompatible!==!0&&await t.makeXRCompatible(),v=e.getPixelRatio(),e.getSize(A),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let re=null,Le=null,ze=null;C.depth&&(ze=C.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,re=C.stencil?Mi:Un,Le=C.stencil?Cs:wn);let Fe={colorFormat:t.RGBA8,depthFormat:ze,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer(Fe),s.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),_=new rn(u.textureWidth,u.textureHeight,{format:mn,type:Kt,depthTexture:new Jn(u.textureWidth,u.textureHeight,Le,void 0,void 0,void 0,void 0,void 0,void 0,re),stencilBuffer:C.stencil,colorSpace:e.outputColorSpace,samples:C.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{let re={antialias:C.antialias,alpha:!0,depth:C.depth,stencil:C.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,re),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),_=new rn(f.framebufferWidth,f.framebufferHeight,{format:mn,type:Kt,colorSpace:e.outputColorSpace,stencilBuffer:C.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),nt.setContext(s),nt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function B(K){for(let he=0;he<K.removed.length;he++){let re=K.removed[he],Le=M.indexOf(re);Le>=0&&(M[Le]=null,S[Le].disconnect(re))}for(let he=0;he<K.added.length;he++){let re=K.added[he],Le=M.indexOf(re);if(Le===-1){for(let Fe=0;Fe<S.length;Fe++)if(Fe>=M.length){M.push(re),Le=Fe;break}else if(M[Fe]===null){M[Fe]=re,Le=Fe;break}if(Le===-1)break}let ze=S[Le];ze&&ze.connect(re)}}let G=new R,Q=new R;function le(K,he,re){G.setFromMatrixPosition(he.matrixWorld),Q.setFromMatrixPosition(re.matrixWorld);let Le=G.distanceTo(Q),ze=he.projectionMatrix.elements,Fe=re.projectionMatrix.elements,st=ze[14]/(ze[10]-1),Ve=ze[14]/(ze[10]+1),ee=(ze[9]+1)/ze[5],se=(ze[9]-1)/ze[5],ie=(ze[8]-1)/ze[0],_e=(Fe[8]+1)/Fe[0],me=st*ie,Be=st*_e,Re=Le/(-ie+_e),He=Re*-ie;if(he.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(He),K.translateZ(Re),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),ze[10]===-1)K.projectionMatrix.copy(he.projectionMatrix),K.projectionMatrixInverse.copy(he.projectionMatrixInverse);else{let Xe=st+Re,L=Ve+Re,ht=me-He,et=Be+(Le-He),E=ee*Ve/L*Xe,x=se*Ve/L*Xe;K.projectionMatrix.makePerspective(ht,et,E,x,Xe,L),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function ae(K,he){he===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(he.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(s===null)return;let he=K.near,re=K.far;g.texture!==null&&(g.depthNear>0&&(he=g.depthNear),g.depthFar>0&&(re=g.depthFar)),F.near=I.near=T.near=he,F.far=I.far=T.far=re,(q!==F.near||$!==F.far)&&(s.updateRenderState({depthNear:F.near,depthFar:F.far}),q=F.near,$=F.far),F.layers.mask=K.layers.mask|6,T.layers.mask=F.layers.mask&-5,I.layers.mask=F.layers.mask&-3;let Le=K.parent,ze=F.cameras;ae(F,Le);for(let Fe=0;Fe<ze.length;Fe++)ae(ze[Fe],Le);ze.length===2?le(F,T,I):F.projectionMatrix.copy(T.projectionMatrix),Me(K,F,Le)};function Me(K,he,re){re===null?K.matrix.copy(he.matrixWorld):(K.matrix.copy(re.matrixWorld),K.matrix.invert(),K.matrix.multiply(he.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(he.projectionMatrix),K.projectionMatrixInverse.copy(he.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=fs*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(K){l=K,u!==null&&(u.fixedFoveation=K),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=K)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(F)},this.getCameraTexture=function(K){return m[K]};let je=null;function ft(K,he){if(h=he.getViewerPose(c||o),p=he,h!==null){let re=h.views;f!==null&&(e.setRenderTargetFramebuffer(_,f.framebuffer),e.setRenderTarget(_));let Le=!1;re.length!==F.cameras.length&&(F.cameras.length=0,Le=!0);for(let Ve=0;Ve<re.length;Ve++){let ee=re[Ve],se=null;if(f!==null)se=f.getViewport(ee);else{let _e=d.getViewSubImage(u,ee);se=_e.viewport,Ve===0&&(e.setRenderTargetTextures(_,_e.colorTexture,_e.depthStencilTexture),e.setRenderTarget(_))}let ie=P[Ve];ie===void 0&&(ie=new Xt,ie.layers.enable(Ve),ie.viewport=new bt,P[Ve]=ie),ie.matrix.fromArray(ee.transform.matrix),ie.matrix.decompose(ie.position,ie.quaternion,ie.scale),ie.projectionMatrix.fromArray(ee.projectionMatrix),ie.projectionMatrixInverse.copy(ie.projectionMatrix).invert(),ie.viewport.set(se.x,se.y,se.width,se.height),Ve===0&&(F.matrix.copy(ie.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),Le===!0&&F.cameras.push(ie)}let ze=s.enabledFeatures;if(ze&&ze.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&y){d=n.getBinding();let Ve=d.getDepthInformation(re[0]);Ve&&Ve.isValid&&Ve.texture&&g.init(Ve,s.renderState)}if(ze&&ze.includes("camera-access")&&y){e.state.unbindTexture(),d=n.getBinding();for(let Ve=0;Ve<re.length;Ve++){let ee=re[Ve].camera;if(ee){let se=m[ee];se||(se=new pr,m[ee]=se);let ie=d.getCameraImage(ee);se.sourceTexture=ie}}}}for(let re=0;re<S.length;re++){let Le=M[re],ze=S[re];Le!==null&&ze!==void 0&&ze.update(Le,he,c||o)}je&&je(K,he),he.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:he}),p=null}let nt=new Xd;nt.setAnimationLoop(ft),this.setAnimationLoop=function(K){je=K},this.dispose=function(){}}},xv=new ot,Kd=new Ge;Kd.set(-1,0,0,0,1,0,0,0,1);function _v(i,e){function t(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,Qc(i)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function s(g,m,C,w,_){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?r(g,m):m.isMeshLambertMaterial?(r(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(g,m),d(g,m)):m.isMeshPhongMaterial?(r(g,m),h(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(g,m),u(g,m),m.isMeshPhysicalMaterial&&f(g,m,_)):m.isMeshMatcapMaterial?(r(g,m),p(g,m)):m.isMeshDepthMaterial?r(g,m):m.isMeshDistanceMaterial?(r(g,m),y(g,m)):m.isMeshNormalMaterial?r(g,m):m.isLineBasicMaterial?(o(g,m),m.isLineDashedMaterial&&a(g,m)):m.isPointsMaterial?l(g,m,C,w):m.isSpriteMaterial?c(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,t(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===$t&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,t(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===$t&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,t(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,t(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);let C=e.get(m),w=C.envMap,_=C.envMapRotation;w&&(g.envMap.value=w,g.envMapRotation.value.setFromMatrix4(xv.makeRotationFromEuler(_)).transpose(),w.isCubeTexture&&w.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(Kd),g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,g.aoMapTransform))}function o(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform))}function a(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function l(g,m,C,w){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*C,g.scale.value=w*.5,m.map&&(g.map.value=m.map,t(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function c(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function h(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function d(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function u(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function f(g,m,C){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===$t&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=C.texture,g.transmissionSamplerSize.value.set(C.width,C.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function y(g,m){let C=e.get(m).light;g.referencePosition.value.setFromMatrixPosition(C.matrixWorld),g.nearDistance.value=C.shadow.camera.near,g.farDistance.value=C.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function vv(i,e,t,n){let s={},r={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(_,S){let M=S.program;n.uniformBlockBinding(_,M)}function c(_,S){let M=s[_.id];M===void 0&&(g(_),M=h(_),s[_.id]=M,_.addEventListener("dispose",C));let A=S.program;n.updateUBOMapping(_,A);let v=e.render.frame;r[_.id]!==v&&(u(_),r[_.id]=v)}function h(_){let S=d();_.__bindingPointIndex=S;let M=i.createBuffer(),A=_.__size,v=_.usage;return i.bindBuffer(i.UNIFORM_BUFFER,M),i.bufferData(i.UNIFORM_BUFFER,A,v),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,S,M),M}function d(){for(let _=0;_<a;_++)if(o.indexOf(_)===-1)return o.push(_),_;return Oe("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(_){let S=s[_.id],M=_.uniforms,A=_.__cache;i.bindBuffer(i.UNIFORM_BUFFER,S);for(let v=0,T=M.length;v<T;v++){let I=M[v];if(Array.isArray(I))for(let P=0,F=I.length;P<F;P++)f(I[P],v,P,A);else f(I,v,0,A)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(_,S,M,A){if(y(_,S,M,A)===!0){let v=_.__offset,T=_.value;if(Array.isArray(T)){let I=0;for(let P=0;P<T.length;P++){let F=T[P],q=m(F);p(F,_.__data,I),typeof F!="number"&&typeof F!="boolean"&&!F.isMatrix3&&!ArrayBuffer.isView(F)&&(I+=q.storage/Float32Array.BYTES_PER_ELEMENT)}}else p(T,_.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,v,_.__data)}}function p(_,S,M){typeof _=="number"||typeof _=="boolean"?S[0]=_:_.isMatrix3?(S[0]=_.elements[0],S[1]=_.elements[1],S[2]=_.elements[2],S[3]=0,S[4]=_.elements[3],S[5]=_.elements[4],S[6]=_.elements[5],S[7]=0,S[8]=_.elements[6],S[9]=_.elements[7],S[10]=_.elements[8],S[11]=0):ArrayBuffer.isView(_)?S.set(new _.constructor(_.buffer,_.byteOffset,S.length)):_.toArray(S,M)}function y(_,S,M,A){let v=_.value,T=S+"_"+M;if(A[T]===void 0)return typeof v=="number"||typeof v=="boolean"?A[T]=v:ArrayBuffer.isView(v)?A[T]=v.slice():A[T]=v.clone(),!0;{let I=A[T];if(typeof v=="number"||typeof v=="boolean"){if(I!==v)return A[T]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(I.equals(v)===!1)return I.copy(v),!0}}return!1}function g(_){let S=_.uniforms,M=0,A=16;for(let T=0,I=S.length;T<I;T++){let P=Array.isArray(S[T])?S[T]:[S[T]];for(let F=0,q=P.length;F<q;F++){let $=P[F],O=Array.isArray($.value)?$.value:[$.value];for(let X=0,B=O.length;X<B;X++){let G=O[X],Q=m(G),le=M%A,ae=le%Q.boundary,Me=le+ae;M+=ae,Me!==0&&A-Me<Q.storage&&(M+=A-Me),$.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),$.__offset=M,M+=Q.storage}}}let v=M%A;return v>0&&(M+=A-v),_.__size=M,_.__cache={},this}function m(_){let S={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(S.boundary=4,S.storage=4):_.isVector2?(S.boundary=8,S.storage=8):_.isVector3||_.isColor?(S.boundary=16,S.storage=12):_.isVector4?(S.boundary=16,S.storage=16):_.isMatrix3?(S.boundary=48,S.storage=48):_.isMatrix4?(S.boundary=64,S.storage=64):_.isTexture?Ne("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(_)?(S.boundary=16,S.storage=_.byteLength):Ne("WebGLRenderer: Unsupported uniform value type.",_),S}function C(_){let S=_.target;S.removeEventListener("dispose",C);let M=o.indexOf(S.__bindingPointIndex);o.splice(M,1),i.deleteBuffer(s[S.id]),delete s[S.id],delete r[S.id]}function w(){for(let _ in s)i.deleteBuffer(s[_]);o=[],s={},r={}}return{bind:l,update:c,dispose:w}}var yv=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Bn=null;function bv(){return Bn===null&&(Bn=new Ko(yv,16,16,Si,On),Bn.name="DFG_LUT",Bn.minFilter=zt,Bn.magFilter=zt,Bn.wrapS=Dn,Bn.wrapT=Dn,Bn.generateMipmaps=!1,Bn.needsUpdate=!0),Bn}var Is=class{constructor(e={}){let{canvas:t=ud(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:f=Kt}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=o;let y=f,g=new Set([Ia,Pa,Ra]),m=new Set([Kt,wn,As,Cs,Aa,Ca]),C=new Uint32Array(4),w=new Int32Array(4),_=new R,S=null,M=null,A=[],v=[],T=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=En,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let I=this,P=!1,F=null,q=null,$=null,O=null;this._outputColorSpace=sn;let X=0,B=0,G=null,Q=-1,le=null,ae=new bt,Me=new bt,je=null,ft=new qe(0),nt=0,K=t.width,he=t.height,re=1,Le=null,ze=null,Fe=new bt(0,0,K,he),st=new bt(0,0,K,he),Ve=!1,ee=new _s,se=!1,ie=!1,_e=new ot,me=new R,Be=new bt,Re={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},He=!1;function Xe(){return G===null?re:1}let L=n;function ht(b,N){return t.getContext(b,N)}try{let b={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"185"}`),t.addEventListener("webglcontextlost",Et,!1),t.addEventListener("webglcontextrestored",gt,!1),t.addEventListener("webglcontextcreationerror",Cn,!1),L===null){let N="webgl2";if(L=ht(N,b),L===null)throw ht(N)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(b){throw Oe("WebGLRenderer: "+b.message),b}let et,E,x,U,V,Y,oe,ce,Z,j,de,Pe,ge,fe,Ue,ke,Ye,D,ue,J,pe,be,te;function Ce(){et=new Cx(L),et.init(),pe=new pv(L,et),E=new yx(L,et,e,pe),x=new dv(L,et),E.reversedDepthBuffer&&u&&x.buffers.depth.setReversed(!0),q=L.createFramebuffer(),$=L.createFramebuffer(),O=L.createFramebuffer(),U=new Ix(L),V=new j_,Y=new fv(L,et,x,V,E,pe,U),oe=new Ax(I),ce=new Um(L),be=new _x(L,ce),Z=new Rx(L,ce,U,be),j=new Dx(L,Z,ce,be,U),D=new Lx(L,E,Y),Ue=new bx(V),de=new K_(I,oe,et,E,be,Ue),Pe=new _v(I,V),ge=new ev,fe=new ov(et),Ye=new xx(I,oe,x,j,p,l),ke=new uv(I,j,E),te=new vv(L,U,E,x),ue=new vx(L,et,U),J=new Px(L,et,U),U.programs=de.programs,I.capabilities=E,I.extensions=et,I.properties=V,I.renderLists=ge,I.shadowMap=ke,I.state=x,I.info=U}Ce(),y!==Kt&&(T=new Ux(y,t.width,t.height,a,s,r));let we=new xh(I,L);this.xr=we,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){let b=et.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){let b=et.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return re},this.setPixelRatio=function(b){b!==void 0&&(re=b,this.setSize(K,he,!1))},this.getSize=function(b){return b.set(K,he)},this.setSize=function(b,N,W=!0){if(we.isPresenting){Ne("WebGLRenderer: Can't change size while VR device is presenting.");return}K=b,he=N,t.width=Math.floor(b*re),t.height=Math.floor(N*re),W===!0&&(t.style.width=b+"px",t.style.height=N+"px"),T!==null&&T.setSize(t.width,t.height),this.setViewport(0,0,b,N)},this.getDrawingBufferSize=function(b){return b.set(K*re,he*re).floor()},this.setDrawingBufferSize=function(b,N,W){K=b,he=N,re=W,t.width=Math.floor(b*W),t.height=Math.floor(N*W),this.setViewport(0,0,b,N)},this.setEffects=function(b){if(y===Kt){Oe("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(b){for(let N=0;N<b.length;N++)if(b[N].isOutputPass===!0){Ne("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}T.setEffects(b||[])},this.getCurrentViewport=function(b){return b.copy(ae)},this.getViewport=function(b){return b.copy(Fe)},this.setViewport=function(b,N,W,z){b.isVector4?Fe.set(b.x,b.y,b.z,b.w):Fe.set(b,N,W,z),x.viewport(ae.copy(Fe).multiplyScalar(re).round())},this.getScissor=function(b){return b.copy(st)},this.setScissor=function(b,N,W,z){b.isVector4?st.set(b.x,b.y,b.z,b.w):st.set(b,N,W,z),x.scissor(Me.copy(st).multiplyScalar(re).round())},this.getScissorTest=function(){return Ve},this.setScissorTest=function(b){x.setScissorTest(Ve=b)},this.setOpaqueSort=function(b){Le=b},this.setTransparentSort=function(b){ze=b},this.getClearColor=function(b){return b.copy(Ye.getClearColor())},this.setClearColor=function(){Ye.setClearColor(...arguments)},this.getClearAlpha=function(){return Ye.getClearAlpha()},this.setClearAlpha=function(){Ye.setClearAlpha(...arguments)},this.clear=function(b=!0,N=!0,W=!0){let z=0;if(b){let H=!1;if(G!==null){let ye=G.texture.format;H=g.has(ye)}if(H){let ye=G.texture.type,Ee=m.has(ye),ve=Ye.getClearColor(),Te=Ye.getClearAlpha(),Ie=ve.r,Ze=ve.g,Qe=ve.b;Ee?(C[0]=Ie,C[1]=Ze,C[2]=Qe,C[3]=Te,L.clearBufferuiv(L.COLOR,0,C)):(w[0]=Ie,w[1]=Ze,w[2]=Qe,w[3]=Te,L.clearBufferiv(L.COLOR,0,w))}else z|=L.COLOR_BUFFER_BIT}N&&(z|=L.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),W&&(z|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z!==0&&L.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(b){b.setRenderer(this),F=b},this.dispose=function(){t.removeEventListener("webglcontextlost",Et,!1),t.removeEventListener("webglcontextrestored",gt,!1),t.removeEventListener("webglcontextcreationerror",Cn,!1),Ye.dispose(),ge.dispose(),fe.dispose(),V.dispose(),oe.dispose(),j.dispose(),be.dispose(),te.dispose(),de.dispose(),we.dispose(),we.removeEventListener("sessionstart",Hh),we.removeEventListener("sessionend",Vh),Ti.stop()};function Et(b){b.preventDefault(),or("WebGLRenderer: Context Lost."),P=!0}function gt(){or("WebGLRenderer: Context Restored."),P=!1;let b=U.autoReset,N=ke.enabled,W=ke.autoUpdate,z=ke.needsUpdate,H=ke.type;Ce(),U.autoReset=b,ke.enabled=N,ke.autoUpdate=W,ke.needsUpdate=z,ke.type=H}function Cn(b){Oe("WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function Rn(b){let N=b.target;N.removeEventListener("dispose",Rn),ep(N)}function ep(b){tp(b),V.remove(b)}function tp(b){let N=V.get(b).programs;N!==void 0&&(N.forEach(function(W){de.releaseProgram(W)}),b.isShaderMaterial&&de.releaseShaderCache(b))}this.renderBufferDirect=function(b,N,W,z,H,ye){N===null&&(N=Re);let Ee=H.isMesh&&H.matrixWorld.determinantAffine()<0,ve=sp(b,N,W,z,H);x.setMaterial(z,Ee);let Te=W.index,Ie=1;if(z.wireframe===!0){if(Te=Z.getWireframeAttribute(W),Te===void 0)return;Ie=2}let Ze=W.drawRange,Qe=W.attributes.position,De=Ze.start*Ie,ut=(Ze.start+Ze.count)*Ie;ye!==null&&(De=Math.max(De,ye.start*Ie),ut=Math.min(ut,(ye.start+ye.count)*Ie)),Te!==null?(De=Math.max(De,0),ut=Math.min(ut,Te.count)):Qe!=null&&(De=Math.max(De,0),ut=Math.min(ut,Qe.count));let Tt=ut-De;if(Tt<0||Tt===1/0)return;be.setup(H,z,ve,W,Te);let wt,pt=ue;if(Te!==null&&(wt=ce.get(Te),pt=J,pt.setIndex(wt)),H.isMesh)z.wireframe===!0?(x.setLineWidth(z.wireframeLinewidth*Xe()),pt.setMode(L.LINES)):pt.setMode(L.TRIANGLES);else if(H.isLine){let Vt=z.linewidth;Vt===void 0&&(Vt=1),x.setLineWidth(Vt*Xe()),H.isLineSegments?pt.setMode(L.LINES):H.isLineLoop?pt.setMode(L.LINE_LOOP):pt.setMode(L.LINE_STRIP)}else H.isPoints?pt.setMode(L.POINTS):H.isSprite&&pt.setMode(L.TRIANGLES);if(H.isBatchedMesh)if(et.get("WEBGL_multi_draw"))pt.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{let Vt=H._multiDrawStarts,Se=H._multiDrawCounts,en=H._multiDrawCount,it=Te?ce.get(Te).bytesPerElement:1,hn=V.get(z).currentProgram.getUniforms();for(let Pn=0;Pn<en;Pn++)hn.setValue(L,"_gl_DrawID",Pn),pt.render(Vt[Pn]/it,Se[Pn])}else if(H.isInstancedMesh)pt.renderInstances(De,Tt,H.count);else if(W.isInstancedBufferGeometry){let Vt=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,Se=Math.min(W.instanceCount,Vt);pt.renderInstances(De,Tt,Se)}else pt.render(De,Tt)};function zh(b,N,W){b.transparent===!0&&b.side===cn&&b.forceSinglePass===!1?(b.side=$t,b.needsUpdate=!0,jr(b,N,W),b.side=Yn,b.needsUpdate=!0,jr(b,N,W),b.side=cn):jr(b,N,W)}this.compile=function(b,N,W=null){W===null&&(W=b),M=fe.get(W),M.init(N),v.push(M),W.traverseVisible(function(H){H.isLight&&H.layers.test(N.layers)&&(M.pushLight(H),H.castShadow&&M.pushShadow(H))}),b!==W&&b.traverseVisible(function(H){H.isLight&&H.layers.test(N.layers)&&(M.pushLight(H),H.castShadow&&M.pushShadow(H))}),M.setupLights();let z=new Set;return b.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;let ye=H.material;if(ye)if(Array.isArray(ye))for(let Ee=0;Ee<ye.length;Ee++){let ve=ye[Ee];zh(ve,W,H),z.add(ve)}else zh(ye,W,H),z.add(ye)}),M=v.pop(),z},this.compileAsync=function(b,N,W=null){let z=this.compile(b,N,W);return new Promise(H=>{function ye(){if(z.forEach(function(Ee){V.get(Ee).currentProgram.isReady()&&z.delete(Ee)}),z.size===0){H(b);return}setTimeout(ye,10)}et.get("KHR_parallel_shader_compile")!==null?ye():setTimeout(ye,10)})};let Bl=null;function np(b){Bl&&Bl(b)}function Hh(){Ti.stop()}function Vh(){Ti.start()}let Ti=new Xd;Ti.setAnimationLoop(np),typeof self<"u"&&Ti.setContext(self),this.setAnimationLoop=function(b){Bl=b,we.setAnimationLoop(b),b===null?Ti.stop():Ti.start()},we.addEventListener("sessionstart",Hh),we.addEventListener("sessionend",Vh),this.render=function(b,N){if(N!==void 0&&N.isCamera!==!0){Oe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;F!==null&&F.renderStart(b,N);let W=we.enabled===!0&&we.isPresenting===!0,z=T!==null&&(G===null||W)&&T.begin(I,G);if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),we.enabled===!0&&we.isPresenting===!0&&(T===null||T.isCompositing()===!1)&&(we.cameraAutoUpdate===!0&&we.updateCamera(N),N=we.getCamera()),b.isScene===!0&&b.onBeforeRender(I,b,N,G),M=fe.get(b,v.length),M.init(N),M.state.textureUnits=Y.getTextureUnits(),v.push(M),_e.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),ee.setFromProjectionMatrix(_e,yn,N.reversedDepth),ie=this.localClippingEnabled,se=Ue.init(this.clippingPlanes,ie),S=ge.get(b,A.length),S.init(),A.push(S),we.enabled===!0&&we.isPresenting===!0){let Ee=I.xr.getDepthSensingMesh();Ee!==null&&kl(Ee,N,-1/0,I.sortObjects)}kl(b,N,0,I.sortObjects),S.finish(),I.sortObjects===!0&&S.sort(Le,ze,N.reversedDepth),He=we.enabled===!1||we.isPresenting===!1||we.hasDepthSensing()===!1,He&&Ye.addToRenderList(S,b),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),se===!0&&Ue.beginShadows();let H=M.state.shadowsArray;if(ke.render(H,b,N),se===!0&&Ue.endShadows(),(z&&T.hasRenderPass())===!1){let Ee=S.opaque,ve=S.transmissive;if(M.setupLights(),N.isArrayCamera){let Te=N.cameras;if(ve.length>0)for(let Ie=0,Ze=Te.length;Ie<Ze;Ie++){let Qe=Te[Ie];Wh(Ee,ve,b,Qe)}He&&Ye.render(b);for(let Ie=0,Ze=Te.length;Ie<Ze;Ie++){let Qe=Te[Ie];Gh(S,b,Qe,Qe.viewport)}}else ve.length>0&&Wh(Ee,ve,b,N),He&&Ye.render(b),Gh(S,b,N)}G!==null&&B===0&&(Y.updateMultisampleRenderTarget(G),Y.updateRenderTargetMipmap(G)),z&&T.end(I),b.isScene===!0&&b.onAfterRender(I,b,N),be.resetDefaultState(),Q=-1,le=null,v.pop(),v.length>0?(M=v[v.length-1],Y.setTextureUnits(M.state.textureUnits),se===!0&&Ue.setGlobalState(I.clippingPlanes,M.state.camera)):M=null,A.pop(),A.length>0?S=A[A.length-1]:S=null,F!==null&&F.renderEnd()};function kl(b,N,W,z){if(b.visible===!1)return;if(b.layers.test(N.layers)){if(b.isGroup)W=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(N);else if(b.isLightProbeGrid)M.pushLightProbeGrid(b);else if(b.isLight)M.pushLight(b),b.castShadow&&M.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||ee.intersectsSprite(b)){z&&Be.setFromMatrixPosition(b.matrixWorld).applyMatrix4(_e);let Ee=j.update(b),ve=b.material;ve.visible&&S.push(b,Ee,ve,W,Be.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||ee.intersectsObject(b))){let Ee=j.update(b),ve=b.material;if(z&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Be.copy(b.boundingSphere.center)):(Ee.boundingSphere===null&&Ee.computeBoundingSphere(),Be.copy(Ee.boundingSphere.center)),Be.applyMatrix4(b.matrixWorld).applyMatrix4(_e)),Array.isArray(ve)){let Te=Ee.groups;for(let Ie=0,Ze=Te.length;Ie<Ze;Ie++){let Qe=Te[Ie],De=ve[Qe.materialIndex];De&&De.visible&&S.push(b,Ee,De,W,Be.z,Qe)}}else ve.visible&&S.push(b,Ee,ve,W,Be.z,null)}}let ye=b.children;for(let Ee=0,ve=ye.length;Ee<ve;Ee++)kl(ye[Ee],N,W,z)}function Gh(b,N,W,z){let{opaque:H,transmissive:ye,transparent:Ee}=b;M.setupLightsView(W),se===!0&&Ue.setGlobalState(I.clippingPlanes,W),z&&x.viewport(ae.copy(z)),H.length>0&&Kr(H,N,W),ye.length>0&&Kr(ye,N,W),Ee.length>0&&Kr(Ee,N,W),x.buffers.depth.setTest(!0),x.buffers.depth.setMask(!0),x.buffers.color.setMask(!0),x.setPolygonOffset(!1)}function Wh(b,N,W,z){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;if(M.state.transmissionRenderTarget[z.id]===void 0){let De=et.has("EXT_color_buffer_half_float")||et.has("EXT_color_buffer_float");M.state.transmissionRenderTarget[z.id]=new rn(1,1,{generateMipmaps:!0,type:De?On:Kt,minFilter:bi,samples:Math.max(4,E.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:tt.workingColorSpace})}let ye=M.state.transmissionRenderTarget[z.id],Ee=z.viewport||ae;ye.setSize(Ee.z*I.transmissionResolutionScale,Ee.w*I.transmissionResolutionScale);let ve=I.getRenderTarget(),Te=I.getActiveCubeFace(),Ie=I.getActiveMipmapLevel();I.setRenderTarget(ye),I.getClearColor(ft),nt=I.getClearAlpha(),nt<1&&I.setClearColor(16777215,.5),I.clear(),He&&Ye.render(W);let Ze=I.toneMapping;I.toneMapping=En;let Qe=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),M.setupLightsView(z),se===!0&&Ue.setGlobalState(I.clippingPlanes,z),Kr(b,W,z),Y.updateMultisampleRenderTarget(ye),Y.updateRenderTargetMipmap(ye),et.has("WEBGL_multisampled_render_to_texture")===!1){let De=!1;for(let ut=0,Tt=N.length;ut<Tt;ut++){let wt=N[ut],{object:pt,geometry:Vt,material:Se,group:en}=wt;if(Se.side===cn&&pt.layers.test(z.layers)){let it=Se.side;Se.side=$t,Se.needsUpdate=!0,Xh(pt,W,z,Vt,Se,en),Se.side=it,Se.needsUpdate=!0,De=!0}}De===!0&&(Y.updateMultisampleRenderTarget(ye),Y.updateRenderTargetMipmap(ye))}I.setRenderTarget(ve,Te,Ie),I.setClearColor(ft,nt),Qe!==void 0&&(z.viewport=Qe),I.toneMapping=Ze}function Kr(b,N,W){let z=N.isScene===!0?N.overrideMaterial:null;for(let H=0,ye=b.length;H<ye;H++){let Ee=b[H],{object:ve,geometry:Te,group:Ie}=Ee,Ze=Ee.material;Ze.allowOverride===!0&&z!==null&&(Ze=z),ve.layers.test(W.layers)&&Xh(ve,N,W,Te,Ze,Ie)}}function Xh(b,N,W,z,H,ye){b.onBeforeRender(I,N,W,z,H,ye),b.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),H.onBeforeRender(I,N,W,z,b,ye),H.transparent===!0&&H.side===cn&&H.forceSinglePass===!1?(H.side=$t,H.needsUpdate=!0,I.renderBufferDirect(W,N,z,H,b,ye),H.side=Yn,H.needsUpdate=!0,I.renderBufferDirect(W,N,z,H,b,ye),H.side=cn):I.renderBufferDirect(W,N,z,H,b,ye),b.onAfterRender(I,N,W,z,H,ye)}function jr(b,N,W){N.isScene!==!0&&(N=Re);let z=V.get(b),H=M.state.lights,ye=M.state.shadowsArray,Ee=H.state.version,ve=de.getParameters(b,H.state,ye,N,W,M.state.lightProbeGridArray),Te=de.getProgramCacheKey(ve),Ie=z.programs;z.environment=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?N.environment:null,z.fog=N.fog;let Ze=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap;z.envMap=oe.get(b.envMap||z.environment,Ze),z.envMapRotation=z.environment!==null&&b.envMap===null?N.environmentRotation:b.envMapRotation,Ie===void 0&&(b.addEventListener("dispose",Rn),Ie=new Map,z.programs=Ie);let Qe=Ie.get(Te);if(Qe!==void 0){if(z.currentProgram===Qe&&z.lightsStateVersion===Ee)return Yh(b,ve),Qe}else ve.uniforms=de.getUniforms(b),F!==null&&b.isNodeMaterial&&F.build(b,W,ve),b.onBeforeCompile(ve,I),Qe=de.acquireProgram(ve,Te),Ie.set(Te,Qe),z.uniforms=ve.uniforms;let De=z.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(De.clippingPlanes=Ue.uniform),Yh(b,ve),z.needsLights=op(b),z.lightsStateVersion=Ee,z.needsLights&&(De.ambientLightColor.value=H.state.ambient,De.lightProbe.value=H.state.probe,De.directionalLights.value=H.state.directional,De.directionalLightShadows.value=H.state.directionalShadow,De.spotLights.value=H.state.spot,De.spotLightShadows.value=H.state.spotShadow,De.rectAreaLights.value=H.state.rectArea,De.ltc_1.value=H.state.rectAreaLTC1,De.ltc_2.value=H.state.rectAreaLTC2,De.pointLights.value=H.state.point,De.pointLightShadows.value=H.state.pointShadow,De.hemisphereLights.value=H.state.hemi,De.directionalShadowMatrix.value=H.state.directionalShadowMatrix,De.spotLightMatrix.value=H.state.spotLightMatrix,De.spotLightMap.value=H.state.spotLightMap,De.pointShadowMatrix.value=H.state.pointShadowMatrix),z.lightProbeGrid=M.state.lightProbeGridArray.length>0,z.currentProgram=Qe,z.uniformsList=null,Qe}function qh(b){if(b.uniformsList===null){let N=b.currentProgram.getUniforms();b.uniformsList=Ps.seqWithValue(N.seq,b.uniforms)}return b.uniformsList}function Yh(b,N){let W=V.get(b);W.outputColorSpace=N.outputColorSpace,W.batching=N.batching,W.batchingColor=N.batchingColor,W.instancing=N.instancing,W.instancingColor=N.instancingColor,W.instancingMorph=N.instancingMorph,W.skinning=N.skinning,W.morphTargets=N.morphTargets,W.morphNormals=N.morphNormals,W.morphColors=N.morphColors,W.morphTargetsCount=N.morphTargetsCount,W.numClippingPlanes=N.numClippingPlanes,W.numIntersection=N.numClipIntersection,W.vertexAlphas=N.vertexAlphas,W.vertexTangents=N.vertexTangents,W.toneMapping=N.toneMapping}function ip(b,N){if(b.length===0)return null;if(b.length===1)return b[0].texture!==null?b[0]:null;_.setFromMatrixPosition(N.matrixWorld);for(let W=0,z=b.length;W<z;W++){let H=b[W];if(H.texture!==null&&H.boundingBox.containsPoint(_))return H}return null}function sp(b,N,W,z,H){N.isScene!==!0&&(N=Re),Y.resetTextureUnits();let ye=N.fog,Ee=z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial?N.environment:null,ve=G===null?I.outputColorSpace:G.isXRRenderTarget===!0?G.texture.colorSpace:tt.workingColorSpace,Te=z.isMeshStandardMaterial||z.isMeshLambertMaterial&&!z.envMap||z.isMeshPhongMaterial&&!z.envMap,Ie=oe.get(z.envMap||Ee,Te),Ze=z.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,Qe=!!W.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),De=!!W.morphAttributes.position,ut=!!W.morphAttributes.normal,Tt=!!W.morphAttributes.color,wt=En;z.toneMapped&&(G===null||G.isXRRenderTarget===!0)&&(wt=I.toneMapping);let pt=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,Vt=pt!==void 0?pt.length:0,Se=V.get(z),en=M.state.lights;if(se===!0&&(ie===!0||b!==le)){let xt=b===le&&z.id===Q;Ue.setState(z,b,xt)}let it=!1;z.version===Se.__version?(Se.needsLights&&Se.lightsStateVersion!==en.state.version||Se.outputColorSpace!==ve||H.isBatchedMesh&&Se.batching===!1||!H.isBatchedMesh&&Se.batching===!0||H.isBatchedMesh&&Se.batchingColor===!0&&H.colorTexture===null||H.isBatchedMesh&&Se.batchingColor===!1&&H.colorTexture!==null||H.isInstancedMesh&&Se.instancing===!1||!H.isInstancedMesh&&Se.instancing===!0||H.isSkinnedMesh&&Se.skinning===!1||!H.isSkinnedMesh&&Se.skinning===!0||H.isInstancedMesh&&Se.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&Se.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&Se.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&Se.instancingMorph===!1&&H.morphTexture!==null||Se.envMap!==Ie||z.fog===!0&&Se.fog!==ye||Se.numClippingPlanes!==void 0&&(Se.numClippingPlanes!==Ue.numPlanes||Se.numIntersection!==Ue.numIntersection)||Se.vertexAlphas!==Ze||Se.vertexTangents!==Qe||Se.morphTargets!==De||Se.morphNormals!==ut||Se.morphColors!==Tt||Se.toneMapping!==wt||Se.morphTargetsCount!==Vt||!!Se.lightProbeGrid!=M.state.lightProbeGridArray.length>0)&&(it=!0):(it=!0,Se.__version=z.version);let hn=Se.currentProgram;it===!0&&(hn=jr(z,N,H),F&&z.isNodeMaterial&&F.onUpdateProgram(z,hn,Se));let Pn=!1,Qn=!1,Xi=!1,mt=hn.getUniforms(),At=Se.uniforms;if(x.useProgram(hn.program)&&(Pn=!0,Qn=!0,Xi=!0),z.id!==Q&&(Q=z.id,Qn=!0),Se.needsLights){let xt=ip(M.state.lightProbeGridArray,H);Se.lightProbeGrid!==xt&&(Se.lightProbeGrid=xt,Qn=!0)}if(Pn||le!==b){x.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),mt.setValue(L,"projectionMatrix",b.projectionMatrix),mt.setValue(L,"viewMatrix",b.matrixWorldInverse);let ti=mt.map.cameraPosition;ti!==void 0&&ti.setValue(L,me.setFromMatrixPosition(b.matrixWorld)),E.logarithmicDepthBuffer&&mt.setValue(L,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&mt.setValue(L,"isOrthographic",b.isOrthographicCamera===!0),le!==b&&(le=b,Qn=!0,Xi=!0)}if(Se.needsLights&&(en.state.directionalShadowMap.length>0&&mt.setValue(L,"directionalShadowMap",en.state.directionalShadowMap,Y),en.state.spotShadowMap.length>0&&mt.setValue(L,"spotShadowMap",en.state.spotShadowMap,Y),en.state.pointShadowMap.length>0&&mt.setValue(L,"pointShadowMap",en.state.pointShadowMap,Y)),H.isSkinnedMesh){mt.setOptional(L,H,"bindMatrix"),mt.setOptional(L,H,"bindMatrixInverse");let xt=H.skeleton;xt&&(xt.boneTexture===null&&xt.computeBoneTexture(),mt.setValue(L,"boneTexture",xt.boneTexture,Y))}H.isBatchedMesh&&(mt.setOptional(L,H,"batchingTexture"),mt.setValue(L,"batchingTexture",H._matricesTexture,Y),mt.setOptional(L,H,"batchingIdTexture"),mt.setValue(L,"batchingIdTexture",H._indirectTexture,Y),mt.setOptional(L,H,"batchingColorTexture"),H._colorsTexture!==null&&mt.setValue(L,"batchingColorTexture",H._colorsTexture,Y));let ei=W.morphAttributes;if((ei.position!==void 0||ei.normal!==void 0||ei.color!==void 0)&&D.update(H,W,hn),(Qn||Se.receiveShadow!==H.receiveShadow)&&(Se.receiveShadow=H.receiveShadow,mt.setValue(L,"receiveShadow",H.receiveShadow)),(z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial)&&z.envMap===null&&N.environment!==null&&(At.envMapIntensity.value=N.environmentIntensity),At.dfgLUT!==void 0&&(At.dfgLUT.value=bv()),Qn){if(mt.setValue(L,"toneMappingExposure",I.toneMappingExposure),Se.needsLights&&rp(At,Xi),ye&&z.fog===!0&&Pe.refreshFogUniforms(At,ye),Pe.refreshMaterialUniforms(At,z,re,he,M.state.transmissionRenderTarget[b.id]),Se.needsLights&&Se.lightProbeGrid){let xt=Se.lightProbeGrid;At.probesSH.value=xt.texture,At.probesMin.value.copy(xt.boundingBox.min),At.probesMax.value.copy(xt.boundingBox.max),At.probesResolution.value.copy(xt.resolution)}Ps.upload(L,qh(Se),At,Y)}if(z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(Ps.upload(L,qh(Se),At,Y),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&mt.setValue(L,"center",H.center),mt.setValue(L,"modelViewMatrix",H.modelViewMatrix),mt.setValue(L,"normalMatrix",H.normalMatrix),mt.setValue(L,"modelMatrix",H.matrixWorld),z.uniformsGroups!==void 0){let xt=z.uniformsGroups;for(let ti=0,qi=xt.length;ti<qi;ti++){let Zh=xt[ti];te.update(Zh,hn),te.bind(Zh,hn)}}return hn}function rp(b,N){b.ambientLightColor.needsUpdate=N,b.lightProbe.needsUpdate=N,b.directionalLights.needsUpdate=N,b.directionalLightShadows.needsUpdate=N,b.pointLights.needsUpdate=N,b.pointLightShadows.needsUpdate=N,b.spotLights.needsUpdate=N,b.spotLightShadows.needsUpdate=N,b.rectAreaLights.needsUpdate=N,b.hemisphereLights.needsUpdate=N}function op(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return X},this.getActiveMipmapLevel=function(){return B},this.getRenderTarget=function(){return G},this.setRenderTargetTextures=function(b,N,W){let z=V.get(b);z.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,z.__autoAllocateDepthBuffer===!1&&(z.__useRenderToTexture=!1),V.get(b.texture).__webglTexture=N,V.get(b.depthTexture).__webglTexture=z.__autoAllocateDepthBuffer?void 0:W,z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,N){let W=V.get(b);W.__webglFramebuffer=N,W.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(b,N=0,W=0){G=b,X=N,B=W;let z=null,H=!1,ye=!1;if(b){let ve=V.get(b);if(ve.__useDefaultFramebuffer!==void 0){x.bindFramebuffer(L.FRAMEBUFFER,ve.__webglFramebuffer),ae.copy(b.viewport),Me.copy(b.scissor),je=b.scissorTest,x.viewport(ae),x.scissor(Me),x.setScissorTest(je),Q=-1;return}else if(ve.__webglFramebuffer===void 0)Y.setupRenderTarget(b);else if(ve.__hasExternalTextures)Y.rebindTextures(b,V.get(b.texture).__webglTexture,V.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){let Ze=b.depthTexture;if(ve.__boundDepthTexture!==Ze){if(Ze!==null&&V.has(Ze)&&(b.width!==Ze.image.width||b.height!==Ze.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Y.setupDepthRenderbuffer(b)}}let Te=b.texture;(Te.isData3DTexture||Te.isDataArrayTexture||Te.isCompressedArrayTexture)&&(ye=!0);let Ie=V.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Ie[N])?z=Ie[N][W]:z=Ie[N],H=!0):b.samples>0&&Y.useMultisampledRTT(b)===!1?z=V.get(b).__webglMultisampledFramebuffer:Array.isArray(Ie)?z=Ie[W]:z=Ie,ae.copy(b.viewport),Me.copy(b.scissor),je=b.scissorTest}else ae.copy(Fe).multiplyScalar(re).floor(),Me.copy(st).multiplyScalar(re).floor(),je=Ve;if(W!==0&&(z=q),x.bindFramebuffer(L.FRAMEBUFFER,z)&&x.drawBuffers(b,z),x.viewport(ae),x.scissor(Me),x.setScissorTest(je),H){let ve=V.get(b.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+N,ve.__webglTexture,W)}else if(ye){let ve=N;for(let Te=0;Te<b.textures.length;Te++){let Ie=V.get(b.textures[Te]);L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0+Te,Ie.__webglTexture,W,ve)}}else if(b!==null&&W!==0){let ve=V.get(b.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,ve.__webglTexture,W)}Q=-1},this.readRenderTargetPixels=function(b,N,W,z,H,ye,Ee,ve=0){if(!(b&&b.isWebGLRenderTarget)){Oe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Te=V.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Ee!==void 0&&(Te=Te[Ee]),Te){x.bindFramebuffer(L.FRAMEBUFFER,Te);try{let Ie=b.textures[ve],Ze=Ie.format,Qe=Ie.type;if(b.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+ve),!E.textureFormatReadable(Ze)){Oe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!E.textureTypeReadable(Qe)){Oe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=b.width-z&&W>=0&&W<=b.height-H&&L.readPixels(N,W,z,H,pe.convert(Ze),pe.convert(Qe),ye)}finally{let Ie=G!==null?V.get(G).__webglFramebuffer:null;x.bindFramebuffer(L.FRAMEBUFFER,Ie)}}},this.readRenderTargetPixelsAsync=async function(b,N,W,z,H,ye,Ee,ve=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Te=V.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Ee!==void 0&&(Te=Te[Ee]),Te)if(N>=0&&N<=b.width-z&&W>=0&&W<=b.height-H){x.bindFramebuffer(L.FRAMEBUFFER,Te);let Ie=b.textures[ve],Ze=Ie.format,Qe=Ie.type;if(b.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+ve),!E.textureFormatReadable(Ze))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!E.textureTypeReadable(Qe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let De=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,De),L.bufferData(L.PIXEL_PACK_BUFFER,ye.byteLength,L.STREAM_READ),L.readPixels(N,W,z,H,pe.convert(Ze),pe.convert(Qe),0);let ut=G!==null?V.get(G).__webglFramebuffer:null;x.bindFramebuffer(L.FRAMEBUFFER,ut);let Tt=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await fd(L,Tt,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,De),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,ye),L.deleteBuffer(De),L.deleteSync(Tt),ye}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,N=null,W=0){let z=Math.pow(2,-W),H=Math.floor(b.image.width*z),ye=Math.floor(b.image.height*z),Ee=N!==null?N.x:0,ve=N!==null?N.y:0;Y.setTexture2D(b,0),L.copyTexSubImage2D(L.TEXTURE_2D,W,0,0,Ee,ve,H,ye),x.unbindTexture()},this.copyTextureToTexture=function(b,N,W=null,z=null,H=0,ye=0){let Ee,ve,Te,Ie,Ze,Qe,De,ut,Tt,wt=b.isCompressedTexture?b.mipmaps[ye]:b.image;if(W!==null)Ee=W.max.x-W.min.x,ve=W.max.y-W.min.y,Te=W.isBox3?W.max.z-W.min.z:1,Ie=W.min.x,Ze=W.min.y,Qe=W.isBox3?W.min.z:0;else{let At=Math.pow(2,-H);Ee=Math.floor(wt.width*At),ve=Math.floor(wt.height*At),b.isDataArrayTexture?Te=wt.depth:b.isData3DTexture?Te=Math.floor(wt.depth*At):Te=1,Ie=0,Ze=0,Qe=0}z!==null?(De=z.x,ut=z.y,Tt=z.z):(De=0,ut=0,Tt=0);let pt=pe.convert(N.format),Vt=pe.convert(N.type),Se;N.isData3DTexture?(Y.setTexture3D(N,0),Se=L.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(Y.setTexture2DArray(N,0),Se=L.TEXTURE_2D_ARRAY):(Y.setTexture2D(N,0),Se=L.TEXTURE_2D),x.activeTexture(L.TEXTURE0),x.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,N.flipY),x.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),x.pixelStorei(L.UNPACK_ALIGNMENT,N.unpackAlignment);let en=x.getParameter(L.UNPACK_ROW_LENGTH),it=x.getParameter(L.UNPACK_IMAGE_HEIGHT),hn=x.getParameter(L.UNPACK_SKIP_PIXELS),Pn=x.getParameter(L.UNPACK_SKIP_ROWS),Qn=x.getParameter(L.UNPACK_SKIP_IMAGES);x.pixelStorei(L.UNPACK_ROW_LENGTH,wt.width),x.pixelStorei(L.UNPACK_IMAGE_HEIGHT,wt.height),x.pixelStorei(L.UNPACK_SKIP_PIXELS,Ie),x.pixelStorei(L.UNPACK_SKIP_ROWS,Ze),x.pixelStorei(L.UNPACK_SKIP_IMAGES,Qe);let Xi=b.isDataArrayTexture||b.isData3DTexture,mt=N.isDataArrayTexture||N.isData3DTexture;if(b.isDepthTexture){let At=V.get(b),ei=V.get(N),xt=V.get(At.__renderTarget),ti=V.get(ei.__renderTarget);x.bindFramebuffer(L.READ_FRAMEBUFFER,xt.__webglFramebuffer),x.bindFramebuffer(L.DRAW_FRAMEBUFFER,ti.__webglFramebuffer);for(let qi=0;qi<Te;qi++)Xi&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,V.get(b).__webglTexture,H,Qe+qi),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,V.get(N).__webglTexture,ye,Tt+qi)),L.blitFramebuffer(Ie,Ze,Ee,ve,De,ut,Ee,ve,L.DEPTH_BUFFER_BIT,L.NEAREST);x.bindFramebuffer(L.READ_FRAMEBUFFER,null),x.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(H!==0||b.isRenderTargetTexture||V.has(b)){let At=V.get(b),ei=V.get(N);x.bindFramebuffer(L.READ_FRAMEBUFFER,$),x.bindFramebuffer(L.DRAW_FRAMEBUFFER,O);for(let xt=0;xt<Te;xt++)Xi?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,At.__webglTexture,H,Qe+xt):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,At.__webglTexture,H),mt?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,ei.__webglTexture,ye,Tt+xt):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,ei.__webglTexture,ye),H!==0?L.blitFramebuffer(Ie,Ze,Ee,ve,De,ut,Ee,ve,L.COLOR_BUFFER_BIT,L.NEAREST):mt?L.copyTexSubImage3D(Se,ye,De,ut,Tt+xt,Ie,Ze,Ee,ve):L.copyTexSubImage2D(Se,ye,De,ut,Ie,Ze,Ee,ve);x.bindFramebuffer(L.READ_FRAMEBUFFER,null),x.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else mt?b.isDataTexture||b.isData3DTexture?L.texSubImage3D(Se,ye,De,ut,Tt,Ee,ve,Te,pt,Vt,wt.data):N.isCompressedArrayTexture?L.compressedTexSubImage3D(Se,ye,De,ut,Tt,Ee,ve,Te,pt,wt.data):L.texSubImage3D(Se,ye,De,ut,Tt,Ee,ve,Te,pt,Vt,wt):b.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,ye,De,ut,Ee,ve,pt,Vt,wt.data):b.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,ye,De,ut,wt.width,wt.height,pt,wt.data):L.texSubImage2D(L.TEXTURE_2D,ye,De,ut,Ee,ve,pt,Vt,wt);x.pixelStorei(L.UNPACK_ROW_LENGTH,en),x.pixelStorei(L.UNPACK_IMAGE_HEIGHT,it),x.pixelStorei(L.UNPACK_SKIP_PIXELS,hn),x.pixelStorei(L.UNPACK_SKIP_ROWS,Pn),x.pixelStorei(L.UNPACK_SKIP_IMAGES,Qn),ye===0&&N.generateMipmaps&&L.generateMipmap(Se),x.unbindTexture()},this.initRenderTarget=function(b){V.get(b).__webglFramebuffer===void 0&&Y.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?Y.setTextureCube(b,0):b.isData3DTexture?Y.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?Y.setTexture2DArray(b,0):Y.setTexture2D(b,0),x.unbindTexture()},this.resetState=function(){X=0,B=0,G=null,x.reset(),be.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return yn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=tt._getDrawingBufferColorSpace(e),t.unpackColorSpace=tt._getUnpackColorSpace()}};var jd={type:"change"},vh={type:"start"},ef={type:"end"},_l=new $n,Qd=new dn,Mv=Math.cos(70*Kc.DEG2RAD),Nt=new R,jt=2*Math.PI,dt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},_h=1e-6,vl=class extends Pr{constructor(e,t=null){super(e,t),this.state=dt.NONE,this.target=new R,this.cursor=new R,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:_i.ROTATE,MIDDLE:_i.DOLLY,RIGHT:_i.PAN},this.touches={ONE:vi.ROTATE,TWO:vi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new R,this._lastQuaternion=new Ht,this._lastTargetPosition=new R,this._quat=new Ht().setFromUnitVectors(e.up,new R(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new ws,this._sphericalDelta=new ws,this._scale=1,this._panOffset=new R,this._rotateStart=new ne,this._rotateEnd=new ne,this._rotateDelta=new ne,this._panStart=new ne,this._panEnd=new ne,this._panDelta=new ne,this._dollyStart=new ne,this._dollyEnd=new ne,this._dollyDelta=new ne,this._dollyDirection=new R,this._mouse=new ne,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Ev.bind(this),this._onPointerDown=Sv.bind(this),this._onPointerUp=wv.bind(this),this._onContextMenu=Lv.bind(this),this._onMouseWheel=Cv.bind(this),this._onKeyDown=Rv.bind(this),this._onTouchStart=Pv.bind(this),this._onTouchMove=Iv.bind(this),this._onMouseDown=Tv.bind(this),this._onMouseMove=Av.bind(this),this._interceptControlDown=Dv.bind(this),this._interceptControlUp=Nv.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(jd),this.update(),this.state=dt.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){let t=this.object.position;Nt.copy(t).sub(this.target),Nt.applyQuaternion(this._quat),this._spherical.setFromVector3(Nt),this.autoRotate&&this.state===dt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=jt:n>Math.PI&&(n-=jt),s<-Math.PI?s+=jt:s>Math.PI&&(s-=jt),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(Nt.setFromSpherical(this._spherical),Nt.applyQuaternion(this._quatInverse),t.copy(this.target).add(Nt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){let a=Nt.length();o=this._clampDistance(a*this._scale);let l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){let a=new R(this._mouse.x,this._mouse.y,0);a.unproject(this.object);let l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;let c=new R(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=Nt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(_l.origin.copy(this.object.position),_l.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(_l.direction))<Mv?this.object.lookAt(this.target):(Qd.setFromNormalAndCoplanarPoint(this.object.up,this.target),_l.intersectPlane(Qd,this.target))))}else if(this.object.isOrthographicCamera){let o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>_h||8*(1-this._lastQuaternion.dot(this.object.quaternion))>_h||this._lastTargetPosition.distanceToSquared(this.target)>_h?(this.dispatchEvent(jd),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?jt/60*this.autoRotateSpeed*e:jt/60/60*this.autoRotateSpeed}_getZoomScale(e){let t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Nt.setFromMatrixColumn(t,0),Nt.multiplyScalar(-e),this._panOffset.add(Nt)}_panUp(e,t){this.screenSpacePanning===!0?Nt.setFromMatrixColumn(t,1):(Nt.setFromMatrixColumn(t,0),Nt.crossVectors(this.object.up,Nt)),Nt.multiplyScalar(e),this._panOffset.add(Nt)}_pan(e,t){let n=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;Nt.copy(s).sub(this.target);let r=Nt.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),s=e-n.left,r=t-n.top,o=n.width,a=n.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(jt*this._rotateDelta.x/t.clientHeight),this._rotateUp(jt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(jt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-jt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(jt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-jt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(n,s)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let n=this._getSecondPointerPosition(e),s=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(jt*this._rotateDelta.x/t.clientHeight),this._rotateUp(jt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let o=(e.pageX+t.x)*.5,a=(e.pageY+t.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new ne,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function Sv(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function Ev(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function wv(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(ef),this.state=dt.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function Tv(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case _i.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=dt.DOLLY;break;case _i.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=dt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=dt.ROTATE}break;case _i.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=dt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=dt.PAN}break;default:this.state=dt.NONE}this.state!==dt.NONE&&this.dispatchEvent(vh)}function Av(i){switch(this.state){case dt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case dt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case dt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function Cv(i){this.enabled===!1||this.enableZoom===!1||this.state!==dt.NONE||(i.preventDefault(),this.dispatchEvent(vh),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(ef))}function Rv(i){this.enabled!==!1&&this._handleKeyDown(i)}function Pv(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case vi.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=dt.TOUCH_ROTATE;break;case vi.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=dt.TOUCH_PAN;break;default:this.state=dt.NONE}break;case 2:switch(this.touches.TWO){case vi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=dt.TOUCH_DOLLY_PAN;break;case vi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=dt.TOUCH_DOLLY_ROTATE;break;default:this.state=dt.NONE}break;default:this.state=dt.NONE}this.state!==dt.NONE&&this.dispatchEvent(vh)}function Iv(i){switch(this._trackPointer(i),this.state){case dt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case dt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case dt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case dt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=dt.NONE}}function Lv(i){this.enabled!==!1&&i.preventDefault()}function Dv(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Nv(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function yl(i){let e=tf(i);return new Float32Array(e.buffer,e.byteOffset,Math.floor(e.byteLength/4))}function yh(i){let e=tf(i);return new Uint32Array(e.buffer,e.byteOffset,Math.floor(e.byteLength/4))}function tf(i){let e=atob(i),t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}var nf=require("react"),Ml={light:{canvas:"linear-gradient(#f5f6f8, #e9ecf0)",paper:"#ffffff",stroke:"#4c5561",scene:{gridCenter:9081244,gridLine:4869976,edge:3358799,mesh:10466503,axisX:13777723,axisY:3055172,axisZ:2846678,sketchFill:7645664,sketchWire:3113174,sketchPoint:1859496,hemisphereGround:5857131,cubeFill:"rgba(246, 248, 251, 0.96)",cubeBorder:"rgba(148, 158, 172, 0.9)",cubeLabel:"#5b6472"}},dark:{canvas:"linear-gradient(#1b1b1c, #151517)",paper:"#ffffff",stroke:"#c8ced6",scene:{gridCenter:7041664,gridLine:4146512,edge:13817822,mesh:11123145,axisX:16743034,axisY:6283402,axisZ:7645695,sketchFill:6989544,sketchWire:9158133,sketchPoint:11851e3,hemisphereGround:3422529,cubeFill:"rgba(38, 40, 44, 0.96)",cubeBorder:"rgba(126, 134, 146, 0.9)",cubeLabel:"#d5d9df"}}};function Uv(i){let e=(i.colorScheme??"").toLowerCase(),t=e.includes("dark"),n=e.includes("light");return t&&!n?"dark":n&&!t?"light":i.darkAttribute===!0||i.prefersDark===!0?"dark":"light"}var Mh=null;function Fv(){try{return typeof window>"u"?!1:(Mh??=window.matchMedia("(prefers-color-scheme: dark)"),Mh.matches)}catch{return!1}}function An(){if(typeof document>"u")return"light";let i=document.documentElement,e=i.style?.colorScheme??"";if(e==="")try{e=getComputedStyle(i).getPropertyValue("color-scheme")}catch{e=""}return Uv({colorScheme:e,darkAttribute:document.body?.hasAttribute("data-ds-dark-theme")===!0,prefersDark:Fv()})}var bl=new Set,Gr=null;function Ds(i){return bl.add(i),Gr===null&&(Gr=Ov()),()=>{bl.delete(i),bl.size===0&&Gr!==null&&(Gr(),Gr=null)}}function bh(){for(let i of[...bl])i()}function Ov(){if(typeof MutationObserver>"u"||typeof window>"u")return()=>{};let i=new MutationObserver(bh),e=[document.documentElement];document.body!==null&&e.push(document.body);for(let n of e)i.observe(n,{attributes:!0,attributeFilter:["style","class","data-ds-dark-theme","data-theme","data-color-scheme"]});let t=Mh??=window.matchMedia("(prefers-color-scheme: dark)");return t.addEventListener("change",bh),()=>{i.disconnect(),t.removeEventListener("change",bh)}}function Ns(){return(0,nf.useSyncExternalStore)(Ds,An,()=>"light")}function Wr(i){return`var(--dsh-cad-bg, ${Ml[i].canvas})`}function sf(i){return`var(--dsh-cad-stroke, ${Ml[i].stroke})`}function rf(i){return`var(--dsh-cad-paper, ${Ml[i].paper})`}function Sl(i){return Ml[i].scene}var Xr=.85,Sh=3,Bv=400,kt=(i,e,t)=>new R(i,e,t),af=[["TOP",kt(0,0,1)],["BOTTOM",kt(0,0,-1)],["FRONT",kt(0,-1,0)],["BACK",kt(0,1,0)],["RIGHT",kt(1,0,0)],["LEFT",kt(-1,0,0)]],kv=[{name:"TOP",normal:kt(0,0,1),up:kt(0,1,0)},{name:"BOTTOM",normal:kt(0,0,-1),up:kt(0,1,0)},{name:"FRONT",normal:kt(0,-1,0),up:kt(0,0,1)},{name:"BACK",normal:kt(0,1,0),up:kt(0,0,1)},{name:"RIGHT",normal:kt(1,0,0),up:kt(0,0,1)},{name:"LEFT",normal:kt(-1,0,0),up:kt(0,0,1)}];function zv(i){let e=[],t=i.length();for(let[n,s]of af)i.dot(s)/t>.5&&e.push(n);return e.sort().join("-")}function of(i,e,t){let n=i.getContext("2d");if(n===null)return;let s=Sl(t?"dark":"light");n.clearRect(0,0,128,128),n.fillStyle=s.cubeFill,n.fillRect(0,0,128,128),n.strokeStyle=s.cubeBorder,n.lineWidth=3,n.strokeRect(1.5,1.5,125,125),n.fillStyle=s.cubeLabel,n.font=`600 ${e.length>2?24:28}px -apple-system, "Segoe UI", sans-serif`,n.textAlign="center",n.textBaseline="middle",n.fillText(e,64,66)}var qr=class{constructor(e){this.options=e;let{container:t,camera:n,controls:s}=e;this.camera=n,this.controls=s;let r=e.size??96;getComputedStyle(t).position==="static"&&(t.style.position="relative"),this.overlay=document.createElement("div"),this.overlay.style.cssText=`position:absolute;top:8px;right:8px;width:${r}px;display:flex;flex-direction:column;align-items:center;gap:3px;z-index:5;user-select:none;`,t.appendChild(this.overlay);let o=document.createElement("div");o.style.cssText=`width:${r}px;height:${r}px;cursor:grab;`,this.overlay.appendChild(o),this.caption=document.createElement("div"),this.caption.style.cssText='min-height:14px;font:500 10px/14px -apple-system,"Segoe UI",sans-serif;color:var(--dsw-alias-label-secondary,#374151);background:var(--dsw-alias-bg-base,rgba(255,255,255,0.85));border-radius:7px;padding:0 7px;opacity:0;transition:opacity 120ms;text-align:center;white-space:nowrap;',this.overlay.appendChild(this.caption);let a=document.createElement("button");a.type="button",a.title="Reset view",a.setAttribute("aria-label","Reset view"),a.style.cssText="width:22px;height:22px;border-radius:50%;border:1px solid var(--dsw-alias-border-l2,#c4c9d0);background:var(--dsw-alias-bg-base,#fff);color:var(--dsw-alias-label-secondary,#374151);font-size:12px;line-height:1;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0;",a.textContent="\u2302",a.addEventListener("click",()=>{e.onHome?.()}),this.overlay.appendChild(a),this.renderer=new Is({antialias:!0,alpha:!0}),this.renderer.setPixelRatio(window.devicePixelRatio),this.renderer.setSize(r,r),this.renderer.domElement.style.cssText="width:100%;height:100%;display:block;touch-action:none;",o.appendChild(this.renderer.domElement),this.overlayCamera.position.set(0,0,4),this.overlayCamera.lookAt(0,0,0),new ci().add(this.root),this.buildCube(),this.unsubscribeTheme=Ds(()=>{let d=An()==="dark";d!==this.dark&&(this.dark=d,this.repaint())});let c=d=>{let u=this.renderer.domElement.getBoundingClientRect(),f=new ne((d.clientX-u.left)/u.width*2-1,-((d.clientY-u.top)/u.height)*2+1);this.raycaster.setFromCamera(f,this.overlayCamera);let p=this.raycaster.intersectObjects(this.cells,!1)[0];return p===void 0?{zone:null,point:null}:{zone:p.object.userData.zone,point:p.point}},h=this.renderer.domElement;h.addEventListener("pointermove",d=>{let{zone:u}=c(d);this.setHover(u),h.style.cursor=u===null?"grab":"pointer"}),h.addEventListener("pointerleave",()=>{this.setHover(null)}),h.addEventListener("click",d=>{let{zone:u}=c(d);if(u===null)return;let f=Hv(u);f!==null&&this.animateTo(f)})}options;camera;controls;renderer;overlayCamera=new gi(-1.35,1.35,1.35,-1.35,.1,10);root=new Ot;cells=[];zoneCells=new Map;hiddenMaterial=new Jt({visible:!1});highlightMaterial=new Jt({color:5073918,transparent:!0,opacity:.55,depthWrite:!1});disposables=[this.hiddenMaterial,this.highlightMaterial];facePlates=[];dark=An()==="dark";unsubscribeTheme;raycaster=new ki;overlay;caption;hovered=null;tweenId=0;disposed=!1;buildCube(){let e=2*Xr/Sh;for(let t of kv){let n=t.up.clone().cross(t.normal),s=new ot().makeBasis(n,t.up,t.normal),r=new Ot;r.quaternion.setFromRotationMatrix(s);let o=document.createElement("canvas");o.width=128,o.height=128,of(o,t.name,this.dark);let a=new ui(o);a.anisotropy=4,this.facePlates.push({canvas:o,name:t.name,texture:a}),this.disposables.push(a);let l=new Jt({map:a,transparent:!0});this.disposables.push(l);let c=new Ct(new di(2*Xr,2*Xr),l);c.position.set(0,0,Xr),r.add(c),this.disposables.push(c.geometry);let h=new di(e*1.02,e*1.02);this.disposables.push(h);for(let d=0;d<Sh;d++)for(let u=0;u<Sh;u++){let f=new Ct(h,this.hiddenMaterial);f.position.set((d-1)*e,(u-1)*e,Xr+.004);let p=t.normal.clone().addScaledVector(n,d-1).addScaledVector(t.up,u-1),y=zv(p);f.userData.zone=y,r.add(f),this.cells.push(f);let g=this.zoneCells.get(y);g===void 0?this.zoneCells.set(y,[f]):g.push(f)}this.root.add(r)}}repaint(){for(let e of this.facePlates)of(e.canvas,e.name,this.dark),e.texture.needsUpdate=!0}setHover(e){if(e!==this.hovered){for(let t of this.hovered===null?[]:this.zoneCells.get(this.hovered)??[])t.material=this.hiddenMaterial;this.hovered=e;for(let t of e===null?[]:this.zoneCells.get(e)??[])t.material=this.highlightMaterial;this.caption.textContent=e,this.caption.style.opacity=e===null?"0":"1"}}animateTo(e){let t=this.camera,n=this.controls,s=t.position.distanceTo(n.target),r=t.position.clone().sub(n.target).normalize(),o=e.clone().normalize();if(r.dot(o)>.9999)return;let a=new Ht().setFromUnitVectors(r,o),l=new Ht;n.enabled=!1,cancelAnimationFrame(this.tweenId);let c=performance.now(),h=()=>{if(this.disposed)return;let d=Math.min(1,(performance.now()-c)/Bv),u=1-Math.pow(1-d,3),f=new Ht().slerpQuaternions(l,a,u);t.position.copy(r).applyQuaternion(f).multiplyScalar(s).add(n.target),t.lookAt(n.target),d<1?this.tweenId=requestAnimationFrame(h):(n.enabled=!0,n.update())};this.tweenId=requestAnimationFrame(h)}update(){this.disposed||(this.root.quaternion.copy(this.camera.quaternion).invert(),this.renderer.render(this.root.parent,this.overlayCamera))}dispose(){if(!this.disposed){this.disposed=!0,this.unsubscribeTheme(),cancelAnimationFrame(this.tweenId),this.controls.enabled=!0;for(let e of this.disposables)e.dispose();this.renderer.dispose(),this.overlay.remove()}}};function Hv(i){let e=i.split("-"),t=new R,n=0;for(let[s,r]of af)e.includes(s)&&(t.add(r),n++);return n===0||t.lengthSq()===0?null:t.normalize()}var Vv=25,lf=5073918,cf=16751165,Gv=6;function Us(i,e,t){return`${Math.round(i*1e5)},${Math.round(e*1e5)},${Math.round(t*1e5)}`}var El=class{parent;constructor(e){this.parent=new Int32Array(e);for(let t=0;t<e;t++)this.parent[t]=t}find(e){for(;this.parent[e]!==e;)this.parent[e]=this.parent[this.parent[e]],e=this.parent[e];return e}union(e,t){let n=this.find(e),s=this.find(t);n!==s&&(this.parent[s]=n)}};function Wv(i){let e=i.geometry,t=e.getAttribute("position"),n=e.getIndex(),s=t.array,r=Math.floor((n!==null?n.count:t.count)/3),o=(_,S)=>n!==null?n.getX(_*3+S):_*3+S,a=[],l=new Float64Array(r),c=new R,h=new R,d=new R,u=new R,f=new R;for(let _=0;_<r;_++){c.fromArray(s,o(_,0)*3),h.fromArray(s,o(_,1)*3),d.fromArray(s,o(_,2)*3),u.subVectors(h,c),f.subVectors(d,c);let S=new R().crossVectors(u,f);l[_]=S.length()/2,a.push(S.normalize())}let p=new Map;for(let _=0;_<r;_++)for(let S=0;S<3;S++){let M=o(_,S)*3,A=o(_,(S+1)%3)*3,v=Us(s[M],s[M+1],s[M+2]),T=Us(s[A],s[A+1],s[A+2]),I=v<T?`${v}|${T}`:`${T}|${v}`,P=p.get(I);P===void 0?p.set(I,[{tri:_,ka:v,kb:T}]):P.push({tri:_,ka:v,kb:T})}let y=Math.cos(Vv*Math.PI/180),g=new El(r);for(let _ of p.values())for(let S=0;S<_.length;S++)for(let M=S+1;M<_.length;M++){let A=_[S],v=_[M];A===void 0||v===void 0||A.ka===v.ka&&A.kb===v.kb||a[A.tri].dot(a[v.tri])>=y&&g.union(A.tri,v.tri)}let m=new Map,C=new Uint32Array(r),w=[];for(let _=0;_<r;_++){let S=g.find(_),M=m.get(S);M===void 0&&(M=w.length,m.set(S,M),w.push({triangles:[],area:0})),C[_]=M;let A=w[M];A!==void 0&&(A.triangles.push(_),A.area+=l[_])}return{regionOf:C,regions:w}}function Xv(i,e,t){let n=i.geometry,s=n.getAttribute("position"),r=n.getIndex(),o=s.array,a=Math.floor((r!==null?r.count:s.count)/3),l=(_,S)=>r!==null?r.getX(_*3+S):_*3+S,c=new Map;for(let _=0;_<a;_++){let S=e.regionOf[_];for(let M=0;M<3;M++){let A=l(_,M)*3,v=l(_,(M+1)%3)*3,T=Us(o[A],o[A+1],o[A+2]),I=Us(o[v],o[v+1],o[v+2]),P=T<I?`${T}|${I}`:`${I}|${T}`,F=c.get(P);F===void 0?c.set(P,[S]):F.includes(S)||F.push(S)}}let h=t.length/6,d=new El(h),u=new Map,f=[];for(let _=0;_<h;_++){let S=t[_*6],M=t[_*6+1],A=t[_*6+2],v=t[_*6+3],T=t[_*6+4],I=t[_*6+5],P=Us(S,M,A),F=Us(v,T,I);f.push([P,F]);let q=u.get(P);q===void 0?u.set(P,[_]):q.push(_);let $=u.get(F);$===void 0?u.set(F,[_]):$.push(_)}let p=_=>{let[S,M]=f[_]??["",""],A=S<M?`${S}|${M}`:`${M}|${S}`;return(c.get(A)??[]).slice().sort((v,T)=>v-T).join(",")},y=[];for(let _=0;_<h;_++)y.push(p(_));for(let _=0;_<h;_++){let[S,M]=f[_]??["",""];for(let A of[S,M]){let v=u.get(A)??[];for(let T of v)T<=_||y[_]===y[T]&&d.union(_,T)}}let g=new Map,m=new Uint32Array(h),C=[];for(let _=0;_<h;_++){let S=d.find(_),M=g.get(S);M===void 0&&(M=C.length,g.set(S,M),C.push({length:0,closed:!0})),m[_]=M;let A=C[M];if(A!==void 0){let v=t[_*6+3]-t[_*6],T=t[_*6+4]-t[_*6+1],I=t[_*6+5]-t[_*6+2];A.length+=Math.sqrt(v*v+T*T+I*I)}}let w=new Map;for(let _=0;_<h;_++){let[S,M]=f[_]??["",""],A=m[_];w.set(`${A}:${S}`,(w.get(`${A}:${S}`)??0)+1),w.set(`${A}:${M}`,(w.get(`${A}:${M}`)??0)+1)}for(let _=0;_<C.length;_++){let S=!0,M=!1;for(let v=0;v<h;v++){if(m[v]!==_)continue;M=!0;let[T,I]=f[v]??["",""];((w.get(`${_}:${T}`)??0)!==2||(w.get(`${_}:${I}`)??0)!==2)&&(S=!1)}let A=C[_];A!==void 0&&(A.closed=M&&S)}return{groupOf:m,groups:C}}var Yr=class{constructor(e){this.options=e;let{domElement:t,cad:n}=e;for(let r of[this.hoverFaceMesh,this.selectFaceMesh,this.hoverEdgeLines,this.selectEdgeLines])r.raycast=()=>{},r.renderOrder=r instanceof pn?3:2,r.visible=!1;this.disposables.push(this.hoverFaceMesh.material,this.hoverFaceMesh.geometry,this.selectFaceMesh.material,this.selectFaceMesh.geometry,this.hoverEdgeLines.material,this.hoverEdgeLines.geometry,this.selectEdgeLines.material,this.selectEdgeLines.geometry);let s=new Mn().setFromObject(n).getSize(new R);this.center=new Mn().setFromObject(n).getCenter(new R),this.label=document.createElement("div"),this.label.style.cssText='position:absolute;left:8px;bottom:8px;z-index:5;pointer-events:none;font:500 11px/16px -apple-system,"Segoe UI",sans-serif;color:var(--dsw-alias-label-secondary,#374151);background:var(--dsw-alias-bg-base,rgba(255,255,255,0.88));border:1px solid var(--dsw-alias-border-l1,rgba(215,219,224,0.7));border-radius:8px;padding:2px 8px;opacity:0;transition:opacity 120ms;white-space:nowrap;',t.addEventListener("pointermove",this.onPointerMove),t.addEventListener("pointerleave",this.onPointerLeave),t.addEventListener("pointerdown",this.onPointerDown),t.addEventListener("pointerup",this.onPointerUp)}options;raycaster=new ki;meshes=[];faceCache=new Map;edgeCache=new Map;label;hover=null;selection=null;down=null;disposed=!1;center;disposables=[];hoverFaceMesh=new Ct(new lt,new Jt({color:lf,transparent:!0,opacity:.35,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}));selectFaceMesh=new Ct(new lt,new Jt({color:cf,transparent:!0,opacity:.45,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-3,polygonOffsetUnits:-3}));hoverEdgeLines=new pn(new lt,new fn({color:lf,depthTest:!1,transparent:!0,opacity:.95}));selectEdgeLines=new pn(new lt,new fn({color:cf,depthTest:!1,transparent:!0,opacity:1}));meshesOf(){return this.meshes.length=0,this.options.cad.traverse(e=>{e.isMesh&&e.visible&&this.meshes.push(e)}),this.meshes}facesOf(e){let t=this.faceCache.get(e);return t===void 0&&(t=Wv(e),this.faceCache.set(e,t)),t}edgesOf(e){let t=e.userData.edges;if(t===void 0)return null;let n=this.edgeCache.get(e);if(n===void 0){let r=t.geometry.getAttribute("position").array;n=Xv(e,this.facesOf(e),r),this.edgeCache.set(e,n)}let s=t.geometry.getAttribute("position").array;return{groups:n,segments:s}}pick(e){let{domElement:t,camera:n}=this.options,s=t.getBoundingClientRect(),r=new ne((e.clientX-s.left)/s.width*2-1,-((e.clientY-s.top)/s.height)*2+1);this.raycaster.setFromCamera(r,n);let o=this.meshesOf(),a=this.raycaster.intersectObjects(o,!1)[0],c=2*(a?.distance??n.position.distanceTo(this.center))*Math.tan(n.fov*Math.PI/180/2)/Math.max(s.height,1),h=Gv*c;this.raycaster.params.Line.threshold=h;let d=null;for(let f of o){let p=f.userData.edges;if(p===void 0)continue;let g=this.raycaster.intersectObject(p,!1)[0];if(g!==void 0&&(d===null||g.distance<d.distance)){let m=Math.floor((g.index??0)/2);d={mesh:f,distance:g.distance,segment:m}}}if(d!==null&&(a===void 0||d.distance<=a.distance+h)){let f=this.edgesOf(d.mesh);if(f!==null)return{kind:"edge",mesh:d.mesh,group:f.groups.groupOf[d.segment]??0}}if(a===void 0||a.face===void 0)return null;let u=this.facesOf(a.object).regionOf[a.faceIndex??0]??0;return{kind:"face",mesh:a.object,region:u}}onPointerMove=e=>{if(!this.disposed){if(e.buttons!==0){this.setHover(null);return}this.setHover(this.pick(e))}};onPointerLeave=()=>{this.setHover(null)};onPointerDown=e=>{e.button===0&&(this.down={x:e.clientX,y:e.clientY,at:performance.now()})};onPointerUp=e=>{if(this.disposed)return;let t=this.down;if(this.down=null,t===null||e.button!==0||Math.hypot(e.clientX-t.x,e.clientY-t.y)>5||performance.now()-t.at>600)return;let s=this.pick(e);this.setSelection(s)};setHover(e){hf(e,this.hover)||(this.hover=e,this.refresh())}invalidate(){this.faceCache.clear(),this.edgeCache.clear(),this.selection=null,this.hover=null,this.refresh()}setSelection(e){this.selection=e,this.refresh()}refresh(){let e=(l,c,h)=>{let u=this.facesOf(l).regions[c];if(u===void 0){h.visible=!1;return}let f=l.geometry,p=f.getAttribute("position"),y=f.getIndex(),g=p.array,m=new Float32Array(u.triangles.length*9),C=0;for(let w of u.triangles)for(let _=0;_<3;_++){let S=(y!==null?y.getX(w*3+_):w*3+_)*3;m[C++]=g[S],m[C++]=g[S+1],m[C++]=g[S+2]}h.geometry.dispose(),h.geometry=new lt,h.geometry.setAttribute("position",new yt(m,3)),l!==h.parent&&l.add(h),h.visible=!0},t=(l,c,h)=>{let d=this.edgesOf(l);if(d===null){h.visible=!1;return}let{groups:u,segments:f}=d,p=[];for(let y=0;y<u.groupOf.length;y++)if(u.groupOf[y]===c)for(let g=0;g<6;g++)p.push(f[y*6+g]);h.geometry.dispose(),h.geometry=new lt,h.geometry.setAttribute("position",new St(p,3)),l!==h.parent&&l.add(h),h.visible=!0},n=(...l)=>{for(let c of l)c.visible=!1},s=hf(this.hover,this.selection)?null:this.hover,r=this.selection;s!==null&&s.kind==="face"?e(s.mesh,s.region,this.hoverFaceMesh):n(this.hoverFaceMesh),s!==null&&s.kind==="edge"?t(s.mesh,s.group,this.hoverEdgeLines):n(this.hoverEdgeLines),r!==null&&r.kind==="face"?e(r.mesh,r.region,this.selectFaceMesh):n(this.selectFaceMesh),r!==null&&r.kind==="edge"?t(r.mesh,r.group,this.selectEdgeLines):n(this.selectEdgeLines);let o=this.hover??r,a=this.options.domElement.parentElement;if(o!==null){let l=o.mesh.name.length>0?`${o.mesh.name} \xB7 `:"";if(o.kind==="face"){let c=this.facesOf(o.mesh).regions[o.region]?.area??0;this.label.textContent=`${l}face \xB7 ${c.toLocaleString(void 0,{maximumFractionDigits:1})} mm\xB2`}else{let c=this.edgesOf(o.mesh)?.groups.groups[o.group],h=c?.length??0;this.label.textContent=`${l}edge \xB7 ${h.toLocaleString(void 0,{maximumFractionDigits:1})} mm${c?.closed===!0?" \xB7 closed":""}`}this.label.style.opacity="1",this.label.parentElement!==a&&a!==null&&a.appendChild(this.label)}else this.label.style.opacity="0",this.label.textContent="";this.options.domElement.style.cursor=o===null?"grab":"pointer"}dispose(){if(this.disposed)return;this.disposed=!0;let{domElement:e}=this.options;e.removeEventListener("pointermove",this.onPointerMove),e.removeEventListener("pointerleave",this.onPointerLeave),e.removeEventListener("pointerdown",this.onPointerDown),e.removeEventListener("pointerup",this.onPointerUp);for(let t of[this.hoverFaceMesh,this.selectFaceMesh,this.hoverEdgeLines,this.selectEdgeLines])t.removeFromParent();for(let t of this.disposables)t.dispose();this.label.remove()}};function hf(i,e){return i===null||e===null?i===e:i.kind===e.kind&&i.mesh===e.mesh&&(i.kind==="face"?i.region===e.region:i.group===e.group)}function uf(){let i=new Ms;i.moveTo(0,0),i.lineTo(60,0),i.lineTo(60,12),i.lineTo(12,12),i.lineTo(12,60),i.lineTo(0,60),i.closePath();let e=new Oi;e.absarc(36,6,5,0,Math.PI*2,!0),i.holes.push(e);let t=new Sr(i,{depth:100,bevelEnabled:!1,curveSegments:32});return t.translate(-30,-30,0),t}var df={min:{x:-30,y:-30,z:0},max:{x:30,y:30,z:100}};var qv=25;function wi(i){return Sl(i?"dark":"light")}function ff(i,e){let t=wi(e);i.traverse(n=>{let s=n.userData.cadColorRole;if(s!==void 0)switch(s){case"mesh":n.material.color.setHex(t.mesh);break;case"sketch-fill":n.material.color.setHex(t.sketchFill);break;case"edge":n.material.color.setHex(t.edge);break;case"sketch-wire":n.material.color.setHex(t.sketchWire);break;case"sketch-point":n.material.color.setHex(t.sketchPoint);break}})}function Eh(i,e){let t=document.createElement("canvas");t.width=64,t.height=64;let n=t.getContext("2d");n!==null&&(n.font='bold 44px -apple-system, "Segoe UI", sans-serif',n.textAlign="center",n.textBaseline="middle",n.fillStyle=`#${e.toString(16).padStart(6,"0")}`,n.fillText(i,32,34));let s=new ui(t);s.needsUpdate=!0;let r=new xs({map:s,transparent:!0}),o=new ur(r);return o.scale.set(1,1,1),o}function pf(i,e={}){let t=new Is({antialias:!0,alpha:!0});t.setPixelRatio(window.devicePixelRatio),t.setSize(i.clientWidth||360,i.clientHeight||300),i.appendChild(t.domElement),t.domElement.style.width="100%",t.domElement.style.height="100%",t.domElement.style.display="block";let n=new Xt(45,1,.01,1e4);n.up.set(0,0,1);let s=new vl(n,t.domElement);s.enableDamping=!0,s.dampingFactor=.12,e.autoRotate===!0&&(s.autoRotate=!0,s.autoRotateSpeed=.8);let r=()=>{let a=i.clientWidth,l=i.clientHeight;a===0||l===0||(t.setSize(a,l,!1),n.aspect=a/l,n.updateProjectionMatrix(),e.onResize?.(a,l))},o=new ResizeObserver(r);return o.observe(i),{renderer:t,camera:n,controls:s,dispose(){o.disconnect(),s.dispose(),t.dispose(),t.domElement.parentNode===i&&i.removeChild(t.domElement)}}}function mf(i,e,t){let n=wi(t),s=new Ot,r=new Cr(e*2,20,n.gridCenter,n.gridLine);r.rotation.x=Math.PI/2,s.add(r);let o=new Rr(e);o.setColors(n.axisX,n.axisY,n.axisZ),s.add(o);let a=e*1.12,l=e*.14,c=Eh("X",n.axisX);c.position.set(a,0,0),c.scale.set(l,l,l),s.add(c);let h=Eh("Y",n.axisY);h.position.set(0,a,0),h.scale.set(l,l,l),s.add(h);let d=Eh("Z",n.axisZ);return d.position.set(0,0,a),d.scale.set(l,l,l),s.add(d),i.add(s),[s,r,o,c,h,d]}function Fs(i){for(let e of i)e.traverse(t=>{let n=t;if(n.isMesh){n.geometry?.dispose();let o=n.material;Array.isArray(o)?o.forEach(a=>a.dispose()):o?.dispose()}let s=t;s.isLineSegments&&(s.geometry?.dispose(),s.material?.dispose());let r=t;r.isSprite&&(r.material.map?.dispose(),r.material.dispose())})}function Yv(i,e){let t=i.userData.edges;if(t!==void 0)return t;let n=i.geometry;if(n===void 0)return;let s=i.material;s.polygonOffset=!0,s.polygonOffsetFactor=1,s.polygonOffsetUnits=1;let r=new fn({color:wi(e).edge,transparent:!0,opacity:.9}),o=new pn(new mr(n,qv),r);return o.userData.cadColorRole="edge",i.add(o),i.userData.edges=o,o}function Tl(i,e,t){i.traverse(n=>{let s=n;if(!s.isMesh)return;let r=s.material;r.wireframe=e==="wireframe";let o=e==="shaded-edges"?Yv(s,t):s.userData.edges;o!==void 0&&(o.visible=e==="shaded-edges")})}var wl=null;function Zv(){if(wl!==null)return wl;let i=document.createElement("canvas");i.width=32,i.height=32;let e=i.getContext("2d");return e!==null&&(e.fillStyle="#ffffff",e.beginPath(),e.arc(16,16,14,0,Math.PI*2),e.fill()),wl=new ui(i),wl}function Al(i,e){let t=wi(e),n="mode"in i?i.mode:void 0;if(n==="wire"){let l=new lt,c=typeof i.positions=="string"?yl(i.positions):i.positions;l.setAttribute("position",new yt(c,3));let h=typeof i.indices=="string"?yh(i.indices):i.indices;l.setIndex(new yt(h,1));let d=i.color,u=new pn(l,new fn({color:d??t.sketchWire,depthTest:!1,transparent:!0,opacity:.95}));return u.renderOrder=2,u.name=i.name??"",d===void 0&&(u.userData.cadColorRole="sketch-wire"),u}if(n==="fill"){let l=new lt,c=i.positions;l.setAttribute("position",new yt(c,3)),l.setIndex(new yt(i.indices,1)),l.computeVertexNormals();let h=i.color,d=new Ct(l,new Jt({color:h??t.sketchFill,transparent:!0,opacity:.22,depthWrite:!1,side:cn}));return d.renderOrder=1,d.name=i.name??"",h===void 0&&(d.userData.cadColorRole="sketch-fill"),d}if(n==="points"){let l=new lt;l.setAttribute("position",new yt(i.positions,3));let c=i.color,h=new dr(l,new vs({color:c??t.sketchPoint,map:Zv(),size:8,sizeAttenuation:!1,alphaTest:.5,transparent:!0,depthTest:!1}));return h.renderOrder=3,h.name=i.name??"",c===void 0&&(h.userData.cadColorRole="sketch-point"),h}let s="geometry"in i?i.geometry:(()=>{let l=new lt,c=typeof i.positions=="string"?yl(i.positions):i.positions;if(l.setAttribute("position",new yt(c,3)),i.normals!==void 0){let d=typeof i.normals=="string"?yl(i.normals):i.normals;l.setAttribute("normal",new yt(d,3))}else l.computeVertexNormals();let h=typeof i.indices=="string"?yh(i.indices):i.indices;return l.setIndex(new yt(h,1)),l})(),r=i.color,o=new Er({color:r??t.mesh,metalness:.15,roughness:.55,flatShading:i.normals===void 0,side:cn}),a=new Ct(s,o);return a.name=i.name??"",r===void 0&&(a.userData.cadColorRole="mesh"),a}function gf(i,e={}){let t=pf(i,{onResize:()=>{M||w()}}),n=new ci,s=An()==="dark",r=e.part===null,o=new Ot;n.add(o);let a=new Ot;r||a.add(Al({name:"demo-bracket",geometry:uf()},s)),o.add(a);let c=r?{min:{x:-100,y:-100,z:0},max:{x:100,y:100,z:100}}:{...df},h=new R(c.max.x-c.min.x,c.max.y-c.min.y,c.max.z-c.min.z),d=new R((c.max.x+c.min.x)/2,(c.max.y+c.min.y)/2,(c.max.z+c.min.z)/2),u=Math.max(h.x,h.y,h.z,1e-6);n.add(a);let f=new Es(16777215,wi(s).hemisphereGround,1.1);n.add(f);let p=new xi(16777215,1.6);n.add(p);let y=new xi(16777215,.5);n.add(y);let g=()=>{p.position.set(d.x+u,d.y+u*1.4,d.z+u*.8),y.position.set(d.x-u,d.y+u*.4,d.z-u*.6)};g();let m=[],C="shaded-edges",w=()=>{let B=xf(u,t.camera.aspect,t.camera.fov);t.camera.position.set(d.x+B*.7,d.y+B*.55,d.z+B*.6),t.controls.target.copy(d),t.controls.update()},_=()=>{m.length>0&&(Fs(m),n.remove(m[0])),m=mf(n,u,s),m[1].position.set(d.x,d.y,c.min.z)},S=()=>{_(),t.camera.near=u/100,t.camera.far=u*40,Tl(o,C,s),g(),w()};S();let M=!1,A=()=>{M=!0};t.renderer.domElement.addEventListener("pointerdown",A,{passive:!0}),t.renderer.domElement.addEventListener("wheel",A,{passive:!0});let v=new qr({container:i,camera:t.camera,controls:t.controls,onHome:w}),T=new Yr({domElement:t.renderer.domElement,camera:t.camera,cad:o}),I=Ds(()=>{let B=An()==="dark";B!==s&&(s=B,f.groundColor.setHex(wi(s).hemisphereGround),_(),ff(o,s))}),P=!1,F=B=>{if(!P){o.remove(a),Fs([a]),T.invalidate(),a=new Ot;for(let G of B.meshes)a.add(Al(G,s));o.add(a),c=B.bounds,h=new R(c.max.x-c.min.x,c.max.y-c.min.y,c.max.z-c.min.z),d=new R((c.max.x+c.min.x)/2,(c.max.y+c.min.y)/2,(c.max.z+c.min.z)/2),u=Math.max(h.x,h.y,h.z,1e-6),S()}},q=!1,$=B=>{fetch(`/dsh-cad/demo-scene?part=${B}`).then(G=>G.ok?G.json():Promise.reject(new Error(`HTTP ${G.status}`))).then(G=>{P||(F(G),q=!0,e.onSource?.("brep"))}).catch(()=>{P||e.onSource?.(q?"brep":"fallback")})};r||$(e.part??"bracket");let O=()=>{X=requestAnimationFrame(O),t.controls.update(),t.renderer.render(n,t.camera),v.update()},X=requestAnimationFrame(O);return{setWireframe(B){this.setRenderMode(B?"wireframe":"shaded-edges")},setRenderMode(B){C=B,Tl(o,C,s)},loadPart:$,resetView:w,dispose(){P=!0,cancelAnimationFrame(X),I(),T.dispose(),v.dispose(),Fs([o,...m,f,p,y]),t.dispose()}}}function xf(i,e,t){let n=t*Math.PI/180,s=2*Math.atan(Math.tan(n/2)*(Number.isFinite(e)&&e>0?e:1)),r=Math.min(n,s);return i/2/Math.tan(r/2)*1.5}function _f(i,e){let t=pf(i,{onResize:()=>{w||m()}}),n=new ci,s=An()==="dark",r=new Ot;n.add(r);let o=new Ot;for(let G of e.meshes)o.add(Al(G,s));r.add(o);let a=e.bounds,l=new R(a.max.x-a.min.x,a.max.y-a.min.y,a.max.z-a.min.z),c=new R((a.max.x+a.min.x)/2,(a.max.y+a.min.y)/2,(a.max.z+a.min.z)/2),h=Math.max(l.x,l.y,l.z,1e-6),d=new Es(16777215,wi(s).hemisphereGround,1.1);n.add(d);let u=new xi(16777215,1.6);n.add(u);let f=new xi(16777215,.5);n.add(f);let p=()=>{u.position.set(c.x+h,c.y+h*1.4,c.z+h*.8),f.position.set(c.x-h,c.y+h*.4,c.z-h*.6)},y=[],g="shaded-edges",m=()=>{let G=xf(h,t.camera.aspect,t.camera.fov);t.camera.position.set(c.x+G*.7,c.y+G*.55,c.z+G*.6),t.controls.target.copy(c),t.controls.update()},C=G=>{if(y.length>0&&(Fs(y),n.remove(y[0])),y=mf(n,h,s),y[1].position.set(c.x,c.y,a.min.z),p(),G)t.camera.near=h/100,t.camera.far=h*40,m();else{let le=t.camera.position.distanceTo(t.controls.target);t.camera.near=Math.min(h/100,le/1e3),t.camera.far=Math.max(h*40,le*4)}t.camera.updateProjectionMatrix(),Tl(r,g,s)};C(!0);let w=!1,_=()=>{w=!0};t.renderer.domElement.addEventListener("pointerdown",_,{passive:!0}),t.renderer.domElement.addEventListener("wheel",_,{passive:!0});let S=new qr({container:i,camera:t.camera,controls:t.controls,onHome:m}),M=new Yr({domElement:t.renderer.domElement,camera:t.camera,cad:r}),A=Ds(()=>{let G=An()==="dark";G!==s&&(s=G,d.groundColor.setHex(wi(s).hemisphereGround),C(!1),ff(r,s))}),v=!1,T=null,I=new Set,P=()=>{for(let G of o.children)G.visible=!I.has(G.name)},F=G=>{I.clear();for(let Q of G)I.add(Q);P()},q=()=>{r.traverse(G=>{let Q=G;if(!Q.isMesh)return;let le=Q.material;if(!("emissive"in le))return;let ae=le;T!==null&&Q.name===T?(ae.emissive.setHex(5073918),ae.emissiveIntensity=.45):ae.emissive.getHex()!==0&&(ae.emissive.setHex(0),ae.emissiveIntensity=1)})},$=G=>{T=G,q()},O=G=>{if(!v){r.remove(o),Fs([o]),M.invalidate(),o=new Ot;for(let Q of G.meshes)o.add(Al(Q,s));r.add(o),a=G.bounds,l=new R(a.max.x-a.min.x,a.max.y-a.min.y,a.max.z-a.min.z),c=new R((a.max.x+a.min.x)/2,(a.max.y+a.min.y)/2,(a.max.z+a.min.z)/2),h=Math.max(l.x,l.y,l.z,1e-6),C(!1),q(),P()}},X=()=>{B=requestAnimationFrame(X),t.controls.update(),t.renderer.render(n,t.camera),S.update()},B=requestAnimationFrame(X);return{setWireframe(G){this.setRenderMode(G?"wireframe":"shaded-edges")},setRenderMode(G){g=G,Tl(r,G,s)},setScene:O,highlightMesh:$,setHiddenMeshes:F,resetView(){t.camera.near=h/100,t.camera.far=h*40,t.camera.updateProjectionMatrix(),m()},get domElement(){return t.renderer.domElement},dispose(){v=!0,cancelAnimationFrame(B),A(),M.dispose(),S.dispose(),Fs([o,...y,d,u,f]),t.dispose()}}}var Gi=Ai(require("react"),1);function wh(i){let{min:e,max:t}=i.bounds,n=Math.max(t.x-e.x,1e-6),s=Math.max(t.y-e.y,1e-6),r=Math.max(n,s)*.05;return{x:e.x-r,y:-t.y-r,width:n+r*2,height:s+r*2}}function $v(i,e){return i.color===void 0?sf(e):`#${i.color.toString(16).padStart(6,"0")}`}function Jv(i){let e=[];for(let t=0;t+1<i.length;t+=2)e.push(`${i[t].toFixed(3)},${i[t+1].toFixed(3)}`);return e.join(" ")}function Kv(i,e,t,n,s){let r=n*(Math.PI/180),o=s*(Math.PI/180),a=i+t*Math.cos(r),l=e+t*Math.sin(r),c=i+t*Math.cos(o),h=e+t*Math.sin(o),d=((o-r)%(Math.PI*2)+Math.PI*2)%(Math.PI*2)>Math.PI?1:0;return`M ${a.toFixed(4)} ${l.toFixed(4)} A ${t.toFixed(4)} ${t.toFixed(4)} 0 ${d} 1 ${c.toFixed(4)} ${h.toFixed(4)}`}function vf(i,e=An()){return i.entities.map((t,n)=>{let s=`e${n}`,r=t.layer==="hidden",o=t.layer==="paper"||t.layer==="dim",a=$v(t,e),l={stroke:a,fill:"none",strokeWidth:r||o?1:1.6,vectorEffect:"non-scaling-stroke",...r?{strokeDasharray:"6 4"}:{}};switch(t.type){case"line":return Gi.default.createElement("line",{key:s,x1:t.x1,y1:t.y1,x2:t.x2,y2:t.y2,style:l});case"circle":return Gi.default.createElement("circle",{key:s,cx:t.cx,cy:t.cy,r:t.r,style:l});case"arc":return Gi.default.createElement("path",{key:s,d:Kv(t.cx,t.cy,t.r,t.startAngle,t.endAngle),style:l});case"polyline":return Gi.default.createElement("polyline",{key:s,points:Jv(t.points),fill:"none",style:l});case"text":return Gi.default.createElement("g",{key:s,transform:`translate(${t.x} ${t.y}) scale(1 -1) rotate(${(t.rotation??0)*-1})`},Gi.default.createElement("text",{x:0,y:0,fontSize:t.height,fill:a,style:{userSelect:"none"}},t.text))}})}var Th=["shaded-edges","shaded","wireframe"],jv={"shaded-edges":"Faces+Edges",shaded:"Faces",wireframe:"Wireframe"},Qv=null,Ah=new Set,yf={part:null,assembly:null,drawing:null};function bf(i){Qv={meta:i,at:Date.now()};let e=i.doc??"part";yf[e]={meta:i,at:Date.now()};for(let t of Ah)t()}function Os(i){return yf[i]}function Mf(i){return Ah.add(i),()=>{Ah.delete(i)}}function Sf(i){let e=i.meta;if(e===null||typeof e!="object")return null;let t=e;return typeof t.viewId=="string"&&(t.kind==="3d"||t.kind==="2d")?t:null}function ey(i){let e=new DataView(i);if(e.getUint32(0,!0)!==826426180)throw new Error("bad scene magic");let n=e.getUint32(4,!0),s=new TextDecoder().decode(new Uint8Array(i,8,n)).replace(/\u0000+$/,""),r=JSON.parse(s),o=8+n;return{kind:"3d",format:"model",meshes:r.meshes.map(l=>({name:l.name,...l.color===void 0?{}:{color:l.color},...l.mode===void 0?{}:{mode:l.mode},positions:new Float32Array(i,o+l.posOffset,l.posBytes/4),...l.nrmOffset===void 0?{}:{normals:new Float32Array(i,o+l.nrmOffset,(l.nrmBytes??0)/4)},indices:new Uint32Array(i,o+l.idxOffset,l.idxBytes/4),vertexCount:l.vertexCount,triangleCount:l.triangleCount})),bounds:{min:{x:r.bounds.min[0],y:r.bounds.min[1],z:r.bounds.min[2]},max:{x:r.bounds.max[0],y:r.bounds.max[1],z:r.bounds.max[2]}},units:r.units}}function Bs(i){let[e,t]=(0,ct.useState)(null),[n,s]=(0,ct.useState)(null);return(0,ct.useEffect)(()=>{if(i===void 0)return;let r=!1;s(null);let o=i.includes("/dsh-cad/bin/");return fetch(i).then(async a=>{if(!a.ok)throw new Error(`scene fetch failed: HTTP ${a.status}`);return o?ey(await a.arrayBuffer()):await a.json()}).then(a=>{r||t(a)}).catch(a=>{r||s(a instanceof Error?a.message:String(a))}),()=>{r=!0}},[i]),{scene:e,error:n}}function ks({scene:i,error:e,height:t,fill:n,lazy:s,highlight:r,hidden:o}){return i!==null?i.kind==="3d"?Ut.default.createElement(ty,{scene:i,height:t,fill:n,lazy:s,highlight:r,hidden:o}):Ut.default.createElement(ny,{scene:i,height:t,fill:n}):e!==null?Ut.default.createElement("div",{style:Qt.error},e):Ut.default.createElement("div",{style:Qt.placeholder},"loading\u2026")}function Ch(i,e,t){return{...i===!0?Cl.viewport:{...Qt.viewport,height:e??360},background:Wr(t)}}function ty({scene:i,height:e,fill:t,lazy:n,highlight:s,hidden:r}){let o=(0,ct.useRef)(null),a=(0,ct.useRef)(null),[l,c]=(0,ct.useState)("shaded-edges"),h=Ns(),d=(0,ct.useRef)(i),[u,f]=(0,ct.useState)(0),p=(0,ct.useRef)(0),[y,g]=(0,ct.useState)(n!==!0);(0,ct.useEffect)(()=>{if(n!==!0)return;let w=o.current;if(w===null)return;let _=new IntersectionObserver(S=>{g(S[0]?.isIntersecting??!0)},{rootMargin:"200px"});return _.observe(w),()=>{_.disconnect()}},[n]),(0,ct.useEffect)(()=>{if(!y)return;let w=o.current;if(w===null)return;let _=_f(w,d.current);a.current=_,_.setRenderMode(l);let S=()=>{let M=Date.now();M-p.current<1e3||(p.current=M,f(A=>A+1))};return _.domElement.addEventListener("webglcontextlost",S),()=>{_.domElement.removeEventListener("webglcontextlost",S),_.dispose(),a.current=null}},[y,u]),(0,ct.useEffect)(()=>{i!==d.current&&(d.current=i,a.current?.setScene(i))},[i]),(0,ct.useEffect)(()=>{a.current?.setRenderMode(l)},[l]),(0,ct.useEffect)(()=>{a.current?.highlightMesh(s??null)},[s]),(0,ct.useEffect)(()=>{a.current?.setHiddenMeshes(r??[])},[r]);let m=(0,ct.useCallback)(()=>{c(w=>Th[(Th.indexOf(w)+1)%Th.length])},[]),C=(0,ct.useCallback)(()=>{a.current?.resetView()},[]);return Ut.default.createElement("div",{style:t===!0?Cl.wrap:Qt.viewportWrap},Ut.default.createElement("div",{ref:o,style:Ch(t,e,h)}),Ut.default.createElement("div",{style:Qt.toolbar},Ut.default.createElement("button",{type:"button",style:Qt.button,onClick:m,"aria-pressed":l==="wireframe"},jv[l]),Ut.default.createElement("button",{type:"button",style:Qt.button,onClick:C},"Reset view")))}function ny({scene:i,height:e,fill:t}){let[n,s]=(0,ct.useState)(()=>wh(i)),r=(0,ct.useRef)(null),o=(0,ct.useCallback)(()=>s(wh(i)),[i]),a=Ns(),l=(0,ct.useCallback)(u=>{u.preventDefault();let p=u.currentTarget.getBoundingClientRect(),y=n.x+(u.clientX-p.left)/p.width*n.width,g=n.y+(u.clientY-p.top)/p.height*n.height,m=u.deltaY<0?.85:1.18;s({x:y-(y-n.x)*m,y:g-(g-n.y)*m,width:n.width*m,height:n.height*m})},[n]),c=(0,ct.useCallback)(u=>{r.current={x:u.clientX,y:u.clientY,viewBox:n},u.currentTarget.setPointerCapture(u.pointerId)},[n]),h=(0,ct.useCallback)(u=>{let f=r.current;if(f===null)return;let y=u.currentTarget.getBoundingClientRect(),g=f.viewBox.width/y.width,m=f.viewBox.height/y.height;s({...f.viewBox,x:f.viewBox.x-(u.clientX-f.x)*g,y:f.viewBox.y-(u.clientY-f.y)*m})},[]),d=(0,ct.useCallback)(()=>{r.current=null},[]);if(i.format==="svg"&&i.svgText!==void 0){let u=`data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(i.svgText)))}`;return Ut.default.createElement("div",{style:t===!0?Cl.wrap:Qt.viewportWrap},Ut.default.createElement("div",{style:{...Ch(t,e,a),display:"flex",alignItems:"center",justifyContent:"center",padding:12,boxSizing:"border-box"}},Ut.default.createElement("img",{src:u,alt:i.format,style:{maxWidth:"100%",maxHeight:"100%",background:rf(a),borderRadius:2,boxShadow:"0 1px 2px rgba(16,24,40,0.18), 0 12px 30px -16px rgba(16,24,40,0.45)"}})),Ut.default.createElement("div",{style:Qt.toolbar}))}return Ut.default.createElement("div",{style:t===!0?Cl.wrap:Qt.viewportWrap},Ut.default.createElement("svg",{viewBox:`${n.x} ${n.y} ${n.width} ${n.height}`,style:{...Ch(t,e,a),cursor:r.current===null?"default":"grabbing",touchAction:"none"},onWheel:l,onPointerDown:c,onPointerMove:h,onPointerUp:d,onPointerLeave:d},Ut.default.createElement("g",{transform:"scale(1 -1)"},vf(i,a))),Ut.default.createElement("div",{style:Qt.toolbar},Ut.default.createElement("button",{type:"button",style:Qt.button,onClick:o},"Fit")))}var Qt={viewportWrap:{position:"relative"},viewport:{width:"100%",display:"block"},toolbar:{position:"absolute",top:8,left:8,display:"flex",gap:6,zIndex:5},button:{border:"1px solid var(--dsw-alias-border-l2, #c4c9d0)",borderRadius:999,background:"var(--dsw-alias-bg-base, #fff)",color:"var(--dsw-alias-label-secondary, #374151)",fontSize:11,lineHeight:"16px",padding:"3px 10px",cursor:"pointer"},placeholder:{color:"var(--dsw-alias-label-tertiary, #6b7280)",fontSize:12,padding:"10px 12px"},error:{color:"var(--dsw-alias-state-error-primary, #b91c1c)",fontSize:12,padding:"10px 12px"}},Cl={wrap:{position:"relative",flex:"1 1 auto",minHeight:0,display:"flex",flexDirection:"column"},viewport:{flex:"1 1 auto",minHeight:0,width:"100%",display:"block"}};function Ef({block:i}){let e=i.kind==="tool-call",t=e?void 0:Sf(i)??void 0;return t!==void 0&&bf(t),t===void 0?zs.default.createElement("div",{style:Qt.placeholder},e?"Converting CAD\u2026":"CAD result"):zs.default.createElement("div",{style:Rl.row},zs.default.createElement("span",{style:Rl.title},t.title),zs.default.createElement("span",{style:Rl.stats},iy(t)),zs.default.createElement("span",{style:Rl.hint},"\u5728\u53F3\u4FA7 CAD \u9762\u677F\u67E5\u770B"))}function iy(i){if(i.kind==="3d"){let e=[];return i.stats.meshes!==void 0&&e.push(`${i.stats.meshes} part${i.stats.meshes===1?"":"s"}`),i.stats.triangles!==void 0&&e.push(`${i.stats.triangles.toLocaleString()} triangles`),e.join(" \xB7 ")}return i.stats.entities!==void 0?`${i.stats.entities.toLocaleString()} entities`:""}var Rl={row:{display:"flex",alignItems:"baseline",gap:10,margin:"4px 0",padding:"6px 12px",border:"1px solid var(--dsw-alias-border-l1, #d7dbe0)",borderRadius:8,maxWidth:720,background:"var(--dsw-alias-bg-subtle, #f7f8fa)"},title:{fontWeight:600,fontSize:12.5},stats:{fontSize:12,color:"var(--dsw-alias-label-tertiary, #6b7280)"},hint:{marginLeft:"auto",fontSize:11,color:"var(--dsw-alias-label-tertiary, #9ca3af)",whiteSpace:"nowrap"}};var Wi=Ai(require("react"),1);var k=Ai(require("react"),1);var Hs=require("react"),sy=1500,Pl=new Map,Zr=new Set,Il=null,Ll=null,$r=null,Rh=!1;function wf(){for(let i of[...Zr])i()}async function Dl(){if(!Rh){Rh=!0;try{let i=Il===null?"/dsh-cad/docs":`/dsh-cad/docs?session=${encodeURIComponent(Il)}`,e=await fetch(i,{cache:"no-store"});if(!e.ok)return;let t=await e.json(),n=!1;for(let r of t.docs??[])typeof r?.id!="string"||typeof r?.version!="number"||Pl.get(r.id)!==r.version&&(Pl.set(r.id,r.version),n=!0);let s=t.active!==void 0&&typeof t.active?.id=="string"?t.active:null;s!==null&&typeof s.version=="number"&&Pl.set(s.id,s.version),ry(Ll,s)||(Ll=s,n=!0),n&&wf()}catch{}finally{Rh=!1}}}function ry(i,e){return i===e?!0:i===null||e===null?!1:i.id===e.id&&i.version===e.version&&i.name===e.name&&i.sceneUrl===e.sceneUrl}function Tf(i){Il!==i&&(Il=i,Ll=null,wf(),Dl())}function Nl(){typeof document<"u"&&!document.hidden&&Dl()}function oy(){$r===null&&(Dl(),$r=setInterval(()=>{typeof document<"u"&&document.hidden||Dl()},sy),typeof document<"u"&&(document.addEventListener("visibilitychange",Nl),window.addEventListener("focus",Nl)))}function ay(){$r!==null&&(clearInterval($r),$r=null,typeof document<"u"&&(document.removeEventListener("visibilitychange",Nl),window.removeEventListener("focus",Nl)))}function Af(i){return Zr.add(i),Zr.size===1&&oy(),()=>{Zr.delete(i),Zr.size===0&&ay()}}function ly(i){return i===null?null:Pl.get(i)??null}function Cf(){let i=(0,Hs.useCallback)(()=>Ll,[]);return(0,Hs.useSyncExternalStore)(Af,i)}function Ph(i){let e=(0,Hs.useCallback)(()=>ly(i),[i]);return(0,Hs.useSyncExternalStore)(Af,e)}function Ul(i){let e=/[?&]v=(\d+)/.exec(i??"");return e===null?0:Number(e[1])}function Ih(i,e){if(i===void 0||e===null)return i;let t=Ul(i);return t>=e?i:t>0?i.replace(/([?&])v=\d+/,`$1v=${e}`):`${i}${i.includes("?")?"&":"?"}v=${e}`}var We=Ai(require("react"),1);function Pf(i,e){let[t,n]=(0,We.useState)(null);return(0,We.useEffect)(()=>{if(i===null){n(null);return}let s=!1;return fetch(`/dsh-cad/asm/${i}`).then(r=>r.ok?r.json():Promise.reject(new Error(`HTTP ${r.status}`))).then(r=>{s||n(r)}).catch(()=>{s||n(null)}),()=>{s=!0}},[i,e]),{tree:t}}var cy={concentric:"\u540C\u8F74",coaxial:"\u540C\u8F74",coincident:"\u91CD\u5408",collinear:"\u5171\u7EBF",parallel:"\u5E73\u884C",perpendicular:"\u5782\u76F4",tangent:"\u76F8\u5207",distance:"\u8DDD\u79BB",angle:"\u89D2\u5EA6",symmetric:"\u5BF9\u79F0",fixed:"\u56FA\u5B9A",mate:"\u8D34\u5408"};function hy(i){let e=cy[i.type.toLowerCase()],t=i.type.charAt(0).toUpperCase()+i.type.slice(1);return e===void 0?t:`${e} ${t}`}function Lh(i){return i.a!==void 0&&i.b!==void 0?`${i.a} \u2194 ${i.b}`:i.a??i.b??""}function uy(){return We.default.createElement("svg",{width:"12",height:"12",viewBox:"0 0 16 16",fill:"none","aria-hidden":!0},We.default.createElement("path",{d:"M6.5 9.5 9.5 6.5M5 8 3.6 9.4a2.3 2.3 0 0 0 3.2 3.2L8 11.4M8 4.6l1.2-1.2a2.3 2.3 0 0 1 3.2 3.2L11 8",stroke:"currentColor",strokeWidth:"1.4",strokeLinecap:"round"}))}function dy(){return We.default.createElement("svg",{width:"13",height:"13",viewBox:"0 0 16 16",fill:"none","aria-hidden":!0},We.default.createElement("path",{d:"M1.5 8S4 4.2 8 4.2 14.5 8 14.5 8 12 11.8 8 11.8 1.5 8 1.5 8Z",stroke:"currentColor",strokeWidth:"1.2",strokeLinejoin:"round"}),We.default.createElement("circle",{cx:"8",cy:"8",r:"1.9",stroke:"currentColor",strokeWidth:"1.2"}))}function fy(){return We.default.createElement("svg",{width:"13",height:"13",viewBox:"0 0 16 16",fill:"none","aria-hidden":!0},We.default.createElement("path",{d:"M3 2.5 13 13.5",stroke:"currentColor",strokeWidth:"1.3",strokeLinecap:"round"}),We.default.createElement("path",{d:"M6.4 4.7A5.6 5.6 0 0 1 8 4.2c4 0 6.5 3.8 6.5 3.8a11.6 11.6 0 0 1-1.9 2.3M4 5.6A10.9 10.9 0 0 0 1.5 8S4 11.8 8 11.8c.7 0 1.4-.1 2-.4",stroke:"currentColor",strokeWidth:"1.2",strokeLinecap:"round",strokeLinejoin:"round"}))}function Rf({title:i,open:e,onToggle:t}){return We.default.createElement("button",{type:"button",style:_t.sectionHeader,onClick:t,"aria-expanded":e},We.default.createElement("span",{style:{..._t.sectionChevron,transform:e?"rotate(0deg)":"rotate(-90deg)"}},"\u25BE"),We.default.createElement("span",{style:_t.sectionTitle},i))}function If({tree:i,selected:e,onSelect:t,hidden:n,onToggleHidden:s,onCollapse:r}){let[o,a]=(0,We.useState)(!0),[l,c]=(0,We.useState)(!0),h=i?.parts??[],d=i?.constraints??[];return We.default.createElement("div",{style:_t.root},We.default.createElement("div",{style:_t.header},We.default.createElement("span",{style:_t.headerIcon},We.default.createElement("svg",{width:"13",height:"13",viewBox:"0 0 16 16",fill:"none","aria-hidden":!0},We.default.createElement("path",{d:"M5.5 1.5 10 4v4L5.5 10.5 1 8V4l4.5-2.5Z",stroke:"currentColor",strokeWidth:"1.2",strokeLinejoin:"round",opacity:"0.75"}),We.default.createElement("path",{d:"M10.5 5.5 15 8v4l-4.5 2.5L6 12V8l4.5-2.5Z",stroke:"currentColor",strokeWidth:"1.2",strokeLinejoin:"round"}))),We.default.createElement("span",{style:_t.headerTitle,title:i?.name},"Assembly"),We.default.createElement("span",{style:_t.headerStats},h.length," parts \xB7 ",d.length," mates"),We.default.createElement("button",{type:"button",style:_t.collapse,onClick:r,"aria-label":"\u6536\u8D77\u88C5\u914D\u6811",title:"\u6536\u8D77\u88C5\u914D\u6811"},"\u2039")),We.default.createElement("div",{style:_t.scroll},We.default.createElement(Rf,{title:"PARTS",open:o,onToggle:()=>{a(u=>!u)}}),o?h.length===0?We.default.createElement("div",{style:_t.emptyRow},"\u8FD8\u6CA1\u6709\u5B9E\u4F8B \u2014 \u7528 cad_assembly_insert \u63D2\u5165"):h.map(u=>{let f=u.name===e,p=n.has(u.name);return We.default.createElement("div",{key:u.instanceId,style:{..._t.partRow,...f?_t.partRowActive:{},...u.missing?_t.partRowMissing:{},...p?_t.partRowHidden:{}}},We.default.createElement("button",{type:"button",style:_t.partMain,title:u.missing?`${u.name}\uFF08\u5F15\u7528\u7684\u4F53\u5DF2\u88AB\u5E03\u5C14\u6D88\u8017\uFF09`:u.name,onClick:()=>{t(f?null:u.name)}},We.default.createElement("span",{style:{..._t.swatch,background:`#${u.color.toString(16).padStart(6,"0")}`}}),We.default.createElement("span",{style:_t.partName},u.name)),u.missing?null:We.default.createElement("button",{type:"button","aria-label":p?`\u663E\u793A ${u.name}`:`\u9690\u85CF ${u.name}`,title:p?"\u663E\u793A":"\u9690\u85CF",style:{..._t.eye,...p?_t.eyeHidden:{}},onClick:()=>{s(u)}},p?We.default.createElement(fy,null):We.default.createElement(dy,null)))}):null,We.default.createElement(Rf,{title:"CONSTRAINTS",open:l,onToggle:()=>{c(u=>!u)}}),l?d.length===0?We.default.createElement("div",{style:_t.emptyRow},"\u8FD8\u6CA1\u6709\u7EA6\u675F \u2014 \u7528 cad_constraint \u58F0\u660E"):d.map(u=>We.default.createElement("div",{key:u.id,style:_t.constraintRow,title:u.label??Lh(u)},We.default.createElement("span",{style:_t.constraintIcon},We.default.createElement(uy,null)),We.default.createElement("span",{style:_t.constraintText},We.default.createElement("span",{style:_t.constraintTitle},u.label??hy(u)),Lh(u)!==""?We.default.createElement("span",{style:_t.constraintRefs}," ",Lh(u)):null))):null))}var _t={root:{width:218,display:"flex",flexDirection:"column",minHeight:0,maxHeight:"100%",borderRadius:10,border:"1px solid var(--dsw-alias-border-l1, #e2e5ea)",boxShadow:"0 10px 28px -12px rgba(16,24,40,0.28)",background:"var(--dsw-alias-bg-base, #fff)",overflow:"hidden"},header:{flex:"none",display:"flex",alignItems:"center",gap:6,padding:"8px 8px 7px 12px",borderBottom:"1px solid var(--dsw-alias-border-l1, #eceff3)"},headerIcon:{display:"flex",alignItems:"center",color:"var(--dsw-alias-label-primary, #4d6bfe)"},headerTitle:{fontSize:12.5,fontWeight:600,color:"var(--dsw-alias-label-primary, #1f2937)",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},headerStats:{marginLeft:"auto",fontSize:10.5,color:"var(--dsw-alias-label-tertiary, #9ca3af)",whiteSpace:"nowrap"},collapse:{flex:"none",width:18,height:18,border:"none",borderRadius:5,background:"transparent",color:"var(--dsw-alias-label-tertiary, #9ca3af)",fontSize:13,lineHeight:"16px",cursor:"pointer",padding:0,textAlign:"center"},scroll:{flex:"1 1 auto",minHeight:0,overflowY:"auto",paddingBottom:8},sectionHeader:{display:"flex",alignItems:"center",gap:4,width:"100%",border:"none",background:"transparent",padding:"9px 12px 3px",cursor:"pointer",font:"inherit",textAlign:"left"},sectionChevron:{fontSize:9,color:"var(--dsw-alias-label-tertiary, #9ca3af)",transition:"transform 120ms"},sectionTitle:{fontSize:10.5,fontWeight:600,letterSpacing:"0.06em",color:"var(--dsw-alias-label-tertiary, #6b7280)"},emptyRow:{fontSize:11,color:"var(--dsw-alias-label-tertiary, #9ca3af)",padding:"4px 12px 4px 24px"},partRow:{display:"flex",alignItems:"center",gap:2,borderRadius:6,margin:"0 6px",paddingLeft:16},partMain:{flex:"1 1 auto",display:"flex",alignItems:"center",gap:8,minWidth:0,border:"none",background:"transparent",padding:"4px 0",cursor:"pointer",font:"inherit",fontSize:12,color:"var(--dsw-alias-label-primary, #1f2937)",textAlign:"left"},partRowActive:{background:"var(--dsw-alias-bg-selected, rgba(77,107,254,0.1))",boxShadow:"inset 0 0 0 1px var(--dsw-alias-label-primary, rgba(77,107,254,0.45))"},partRowMissing:{opacity:.45,fontStyle:"italic"},partRowHidden:{opacity:.55},swatch:{flex:"none",width:10,height:10,borderRadius:3,boxShadow:"inset 0 0 0 1px rgba(16,24,40,0.18)"},partName:{flex:"1 1 auto",minWidth:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},eye:{flex:"none",display:"flex",alignItems:"center",justifyContent:"center",width:22,height:20,borderRadius:5,border:"none",background:"transparent",color:"var(--dsw-alias-label-tertiary, #9ca3af)",cursor:"pointer",padding:0},eyeHidden:{color:"var(--dsw-alias-label-primary, #4d6bfe)"},constraintRow:{display:"flex",alignItems:"flex-start",gap:7,padding:"4px 10px 4px 22px",fontSize:11.5,color:"var(--dsw-alias-label-secondary, #374151)"},constraintIcon:{flex:"none",display:"flex",alignItems:"center",marginTop:1,color:"var(--dsw-alias-label-tertiary, #9ca3af)"},constraintText:{minWidth:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},constraintTitle:{fontWeight:600},constraintRefs:{color:"var(--dsw-alias-label-tertiary, #9ca3af)"}};var Ke=Ai(require("react"),1);function Df(i,e){let[t,n]=(0,Ke.useState)(null);return(0,Ke.useEffect)(()=>{if(i===null){n(null);return}let s=!1;return fetch(`/dsh-cad/tree/${i}`).then(r=>r.ok?r.json():Promise.reject(new Error(`HTTP ${r.status}`))).then(r=>{s||n(r)}).catch(()=>{s||n(null)}),()=>{s=!0}},[i,e]),{tree:t}}function py(){return Ke.default.createElement("svg",{width:"12",height:"12",viewBox:"0 0 16 16",fill:"none","aria-hidden":!0},Ke.default.createElement("path",{d:"M2.5 12.2 11 3.7a1.8 1.8 0 0 1 2.5 2.5L5 14.7l-3.2.7.7-3.2Z",stroke:"currentColor",strokeWidth:"1.3",strokeLinejoin:"round"}),Ke.default.createElement("path",{d:"M9.6 5.1l1.8 1.8",stroke:"currentColor",strokeWidth:"1.3"}))}function Lf(){return Ke.default.createElement("svg",{width:"12",height:"12",viewBox:"0 0 16 16",fill:"none","aria-hidden":!0},Ke.default.createElement("path",{d:"M3 3h7.5L13 5.5V13H3V3Z",stroke:"currentColor",strokeWidth:"1.2",strokeLinejoin:"round",opacity:"0.8"}),Ke.default.createElement("path",{d:"M3 10.5 6.5 7l3 3L13 6.7",stroke:"currentColor",strokeWidth:"1.2",strokeLinejoin:"round"}))}function my(){return Ke.default.createElement("svg",{width:"13",height:"13",viewBox:"0 0 16 16",fill:"none","aria-hidden":!0},Ke.default.createElement("path",{d:"M1.5 8S4 4.2 8 4.2 14.5 8 14.5 8 12 11.8 8 11.8 1.5 8 1.5 8Z",stroke:"currentColor",strokeWidth:"1.2",strokeLinejoin:"round"}),Ke.default.createElement("circle",{cx:"8",cy:"8",r:"1.9",stroke:"currentColor",strokeWidth:"1.2"}))}function gy(){return Ke.default.createElement("svg",{width:"13",height:"13",viewBox:"0 0 16 16",fill:"none","aria-hidden":!0},Ke.default.createElement("path",{d:"M3 2.5 13 13.5",stroke:"currentColor",strokeWidth:"1.3",strokeLinecap:"round"}),Ke.default.createElement("path",{d:"M6.4 4.7A5.6 5.6 0 0 1 8 4.2c4 0 6.5 3.8 6.5 3.8a11.6 11.6 0 0 1-1.9 2.3M4 5.6A10.9 10.9 0 0 0 1.5 8S4 11.8 8 11.8c.7 0 1.4-.1 2-.4",stroke:"currentColor",strokeWidth:"1.2",strokeLinecap:"round",strokeLinejoin:"round"}))}function Nf({tree:i,selected:e,onSelect:t,hidden:n,onToggleHidden:s,onCollapse:r}){let o=i?.rows??[],a=o.filter(l=>l.kind==="sketch").length;return Ke.default.createElement("div",{style:Rt.root},Ke.default.createElement("div",{style:Rt.header},Ke.default.createElement("span",{style:Rt.headerIcon},Ke.default.createElement(Lf,null)),Ke.default.createElement("span",{style:Rt.headerTitle},"\u7279\u5F81\u6811"),Ke.default.createElement("span",{style:Rt.headerStats},a," \u8349\u56FE \xB7 ",o.length-a," \u7279\u5F81"),Ke.default.createElement("button",{type:"button",style:Rt.collapse,onClick:r,"aria-label":"\u6536\u8D77\u7279\u5F81\u6811",title:"\u6536\u8D77\u7279\u5F81\u6811"},"\u2039")),Ke.default.createElement("div",{style:Rt.scroll},o.length===0?Ke.default.createElement("div",{style:Rt.emptyRow},"\u8FD8\u6CA1\u6709\u7279\u5F81 \u2014 \u7528 cad_sketch_new / cad_extrude_profile \u5EFA\u6A21"):o.map(l=>{let c=l.kind==="sketch",h=c?[`sketch:${l.sketch}`,`sketch:${l.sketch}:plane`,`sketch:${l.sketch}:fill`,`sketch:${l.sketch}:pts`]:l.body!==void 0?[l.body]:[],d=h.length>0&&h.every(f=>n.has(f)),u=!c&&l.body!==void 0&&l.body===e;return Ke.default.createElement("div",{key:l.key,style:{...Rt.row,...u?Rt.rowActive:{},...d?Rt.rowHidden:{}}},Ke.default.createElement("button",{type:"button",style:{...Rt.rowMain,...c?Rt.sketchMain:{}},title:c?`\u8349\u56FE ${l.label}\uFF08\u62C9\u4F38/\u65CB\u8F6C/\u626B\u63A0\u53EF\u5F15\u7528\uFF09`:l.label,onClick:()=>{!c&&l.body!==void 0&&t(u?null:l.body)}},Ke.default.createElement("span",{style:c?Rt.sketchIcon:Rt.featureIcon},c?Ke.default.createElement(py,null):Ke.default.createElement(Lf,null)),Ke.default.createElement("span",{style:Rt.rowText},c?l.label:Ke.default.createElement(Ke.default.Fragment,null,Ke.default.createElement("span",{style:Rt.featureLabel},l.feature),Ke.default.createElement("span",{style:Rt.featureName}," ",l.label),l.uses!==void 0?Ke.default.createElement("span",{style:Rt.uses}," \u27F5 ",l.uses):null))),h.length>0?Ke.default.createElement("button",{type:"button","aria-label":d?`\u663E\u793A ${l.label}`:`\u9690\u85CF ${l.label}`,title:d?"\u663E\u793A":"\u9690\u85CF",style:{...Rt.eye,...d?Rt.eyeHidden:{}},onClick:()=>{s(h)}},d?Ke.default.createElement(gy,null):Ke.default.createElement(my,null)):null)})))}var Rt={root:{width:218,display:"flex",flexDirection:"column",minHeight:0,maxHeight:"100%",borderRadius:10,border:"1px solid var(--dsw-alias-border-l1, #e2e5ea)",boxShadow:"0 10px 28px -12px rgba(16,24,40,0.28)",background:"var(--dsw-alias-bg-base, #fff)",overflow:"hidden"},header:{flex:"none",display:"flex",alignItems:"center",gap:6,padding:"8px 8px 7px 12px",borderBottom:"1px solid var(--dsw-alias-border-l1, #eceff3)"},headerIcon:{display:"flex",alignItems:"center",color:"var(--dsw-alias-label-primary, #4d6bfe)"},headerTitle:{fontSize:12.5,fontWeight:600,color:"var(--dsw-alias-label-primary, #1f2937)",whiteSpace:"nowrap"},headerStats:{marginLeft:"auto",fontSize:10.5,color:"var(--dsw-alias-label-tertiary, #9ca3af)",whiteSpace:"nowrap"},collapse:{flex:"none",width:18,height:18,border:"none",borderRadius:5,background:"transparent",color:"var(--dsw-alias-label-tertiary, #9ca3af)",fontSize:13,lineHeight:"16px",cursor:"pointer",padding:0,textAlign:"center"},scroll:{flex:"1 1 auto",minHeight:0,overflowY:"auto",paddingBottom:8},emptyRow:{fontSize:11,color:"var(--dsw-alias-label-tertiary, #9ca3af)",padding:"4px 12px"},row:{display:"flex",alignItems:"center",gap:2,borderRadius:6,margin:"0 6px"},rowMain:{flex:"1 1 auto",display:"flex",alignItems:"center",gap:7,minWidth:0,border:"none",background:"transparent",padding:"4px 0 4px 10px",cursor:"pointer",font:"inherit",fontSize:12,color:"var(--dsw-alias-label-primary, #1f2937)",textAlign:"left"},sketchMain:{color:"#2f80d6"},sketchIcon:{flex:"none",display:"flex",alignItems:"center",color:"#2f80d6"},featureIcon:{flex:"none",display:"flex",alignItems:"center",color:"var(--dsw-alias-label-tertiary, #9ca3af)"},rowText:{flex:"1 1 auto",minWidth:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},featureLabel:{fontWeight:600,color:"var(--dsw-alias-label-secondary, #374151)"},featureName:{color:"var(--dsw-alias-label-primary, #1f2937)"},uses:{color:"#2f80d6",fontSize:11},rowActive:{background:"var(--dsw-alias-bg-selected, rgba(77,107,254,0.1))",boxShadow:"inset 0 0 0 1px var(--dsw-alias-label-primary, rgba(77,107,254,0.45))"},rowHidden:{opacity:.55},eye:{flex:"none",display:"flex",alignItems:"center",justifyContent:"center",width:22,height:20,borderRadius:5,border:"none",background:"transparent",color:"var(--dsw-alias-label-tertiary, #9ca3af)",cursor:"pointer",padding:0},eyeHidden:{color:"var(--dsw-alias-label-primary, #4d6bfe)"}};function xy(i){let e={part:void 0,assembly:void 0,drawing:void 0},t=i?.nodes??[];for(let n=t.length-1;n>=0;n--){let s=t[n];if(s===void 0)continue;let r=s.meta;if(s.kind==="tool-result"&&typeof r?.viewId=="string"&&(r.kind==="3d"||r.kind==="2d")){let o=r.doc??"part";e[o]===void 0&&(e[o]=r)}}return e}var _y=()=>()=>{},Dh={part:void 0,assembly:void 0,drawing:void 0},Vs=Dh;function vy(i,e){let t=i?.(l=>l.current),n=(0,k.useMemo)(()=>{if(!(e===void 0||t===void 0))return e.binding?.(t)?.session},[e,t]),s=(0,k.useMemo)(()=>n===void 0?_y:l=>n.subscribe(l),[n]),r=(0,k.useMemo)(()=>n===void 0?()=>Dh:()=>{let l=xy(n.getSnapshot());return Vs!==Dh&&Vs.part===l.part&&Vs.assembly===l.assembly&&Vs.drawing===l.drawing?Vs:(Vs=l,l)},[n]),o=(0,k.useSyncExternalStore)(s,r),[,a]=(0,k.useReducer)(l=>l+1,0);return(0,k.useEffect)(()=>Mf(()=>{a()}),[]),e!==void 0?{part:o.part??null,assembly:o.assembly??Os("assembly")?.meta??null,drawing:o.drawing??Os("drawing")?.meta??null}:{part:Os("part")?.meta??null,assembly:Os("assembly")?.meta??null,drawing:Os("drawing")?.meta??null}}var Uf={part:"Part Studio",assembly:"\u88C5\u914D\u4F53",drawing:"\u5DE5\u7A0B\u56FE"},zn=[{id:"part"}],Gs="part",Nh={tabs:zn,active:Gs},Uh=new Set;function Bh(){Nh={tabs:zn,active:Gs};for(let i of Uh)i()}function zf(i){zn.some(e=>e.id===i)||(zn=[...zn,{id:i}]),Gs=i,Bh()}function yy(i){let e=zn.findIndex(t=>t.id===i);e!==-1&&(zn=zn.filter(t=>t.id!==i),Gs===i&&(Gs=(zn[e-1]??zn[e])?.id??null),Bh())}function Ff(i){Gs=i,Bh()}function by(){return(0,k.useSyncExternalStore)(i=>(Uh.add(i),()=>{Uh.delete(i)}),()=>Nh,()=>Nh)}var Hf=null,Jr=Hf,Fh=new Set;function Fl(i){Hf=i,Jr=i;for(let e of Fh)e()}function My(){return(0,k.useSyncExternalStore)(i=>(Fh.add(i),()=>{Fh.delete(i)}),()=>Jr,()=>Jr)}var jn="currentColor";function Sy(){return k.default.createElement("svg",{width:"13",height:"13",viewBox:"0 0 16 16",fill:"none","aria-hidden":!0},k.default.createElement("path",{d:"M8 1.5 14 5v6L8 14.5 2 11V5l6-3.5Z",stroke:jn,strokeWidth:"1.3",strokeLinejoin:"round"}),k.default.createElement("path",{d:"M2 5l6 3.5L14 5M8 8.5v6",stroke:jn,strokeWidth:"1.3",strokeLinejoin:"round"}))}function Vf(){return k.default.createElement("svg",{width:"13",height:"13",viewBox:"0 0 16 16",fill:"none","aria-hidden":!0},k.default.createElement("path",{d:"M5.5 1.5 10 4v4L5.5 10.5 1 8V4l4.5-2.5Z",stroke:jn,strokeWidth:"1.2",strokeLinejoin:"round",opacity:"0.75"}),k.default.createElement("path",{d:"M10.5 5.5 15 8v4l-4.5 2.5L6 12V8l4.5-2.5Z",stroke:jn,strokeWidth:"1.2",strokeLinejoin:"round"}))}function Gf(){return k.default.createElement("svg",{width:"13",height:"13",viewBox:"0 0 16 16",fill:"none","aria-hidden":!0},k.default.createElement("path",{d:"M3 1.5h7l3 3V14.5H3V1.5Z",stroke:jn,strokeWidth:"1.3",strokeLinejoin:"round"}),k.default.createElement("path",{d:"M5.5 7h5M5.5 9.5h5M5.5 12h3",stroke:jn,strokeWidth:"1.2",strokeLinecap:"round"}))}function Wf({kind:i}){return i==="assembly"?k.default.createElement(Vf,null):i==="drawing"?k.default.createElement(Gf,null):k.default.createElement(Sy,null)}function Ey(){return k.default.createElement("svg",{width:"13",height:"13",viewBox:"0 0 16 16",fill:"none","aria-hidden":!0},k.default.createElement("path",{d:"M1.5 4.5A1 1 0 0 1 2.5 3.5h3.2l1.4 1.8h6.4a1 1 0 0 1 1 1v6.2a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1V4.5Z",stroke:jn,strokeWidth:"1.3",strokeLinejoin:"round"}))}function wy(){return k.default.createElement("svg",{width:"13",height:"13",viewBox:"0 0 16 16",fill:"none","aria-hidden":!0},k.default.createElement("path",{d:"M4 1.5h5l3 3v10H4v-13Z",stroke:jn,strokeWidth:"1.2",strokeLinejoin:"round"}),k.default.createElement("path",{d:"M9 1.5v3h3",stroke:jn,strokeWidth:"1.2",strokeLinejoin:"round"}))}function Xf(i){let e=i.closest("[data-shell-overlay]");if(!(e instanceof HTMLElement))return{frame:null,detailsCol:null,centerCol:null};let t=e.parentElement instanceof HTMLElement?e.parentElement:null;if(t!==null){let o=t.querySelector("[data-rightbar-col]");if(o instanceof HTMLElement){let a=o.previousElementSibling instanceof HTMLElement?o.previousElementSibling:null;return{frame:t,detailsCol:o,centerCol:a}}}let n=t!==null?t.getBoundingClientRect().width:0,s=[],r=e.previousElementSibling;for(;r instanceof HTMLElement&&s.length<2;){let o=r.getBoundingClientRect().width;n>0&&o>=n-1||s.push(r),r=r.previousElementSibling}return{frame:t,detailsCol:s[0]??null,centerCol:s[1]??null}}function Ty({frame:i,detailsCol:e,centerCol:t}){if(e!==null&&t!==null)return{right:e.getBoundingClientRect().width,centerWidth:t.getBoundingClientRect().width};if(i!==null){let n=getComputedStyle(i).gridTemplateColumns.trim().split(/\s+/).map(Number.parseFloat),s=n[1],r=n[2];if(Number.isFinite(s)&&Number.isFinite(r))return{right:r,centerWidth:s}}return{right:0,centerWidth:0}}function Ay(i){let[e,t]=(0,k.useState)({right:0,centerWidth:0});return(0,k.useLayoutEffect)(()=>{let n=i.current;if(n===null)return;let s=Xf(n),r=0,o=()=>{r=0;let c=Ty(s);t(h=>Math.abs(h.right-c.right)<.5&&Math.abs(h.centerWidth-c.centerWidth)<.5?h:c)},a=()=>{r===0&&(r=requestAnimationFrame(o))},l=new ResizeObserver(a);for(let c of[s.frame,s.detailsCol,s.centerCol])c!==null&&l.observe(c);return window.addEventListener("resize",a),o(),()=>{l.disconnect(),window.removeEventListener("resize",a),r!==0&&cancelAnimationFrame(r)}},[i]),e}var Of=280,Bf=720,Cy=460,qf="dsh-cad.panel";function Oh(){try{let i=window.localStorage.getItem(qf);return i===null?{}:JSON.parse(i)}catch{return{}}}function kf(i){try{window.localStorage.setItem(qf,JSON.stringify({...Oh(),...i}))}catch{}}var Ry=20,Py=.42,Iy=[{kind:"part",label:"\u96F6\u4EF6",hint:"Part Studio \xB7 \u4E09\u7EF4\u5EFA\u6A21"},{kind:"assembly",label:"\u88C5\u914D\u4F53",hint:"Assembly \xB7 \u5B9E\u4F8B\u88C5\u914D"},{kind:"drawing",label:"\u5DE5\u7A0B\u56FE",hint:"Drawing \xB7 \u56FE\u7EB8\u8F93\u51FA"}];function Ly({onPick:i,onClose:e}){let t=(0,k.useRef)(null);return(0,k.useEffect)(()=>{let n=r=>{t.current!==null&&r.target instanceof Node&&t.current.contains(r.target)||e()},s=r=>{r.key==="Escape"&&e()};return document.addEventListener("pointerdown",n,!0),document.addEventListener("keydown",s),()=>{document.removeEventListener("pointerdown",n,!0),document.removeEventListener("keydown",s)}},[e]),k.default.createElement("div",{ref:t,style:Ae.menu,role:"menu","aria-label":"\u65B0\u5EFA\u6587\u6863"},Iy.map(n=>k.default.createElement("button",{key:n.kind,type:"button",role:"menuitem",style:Ae.menuItem,onClick:()=>{i(n.kind)}},k.default.createElement("span",{style:Ae.menuIcon},k.default.createElement(Wf,{kind:n.kind})),k.default.createElement("span",{style:Ae.menuLabel},n.label),k.default.createElement("span",{style:Ae.menuHint},n.hint))))}function Dy(i){let e=Date.now()-Date.parse(i);if(!Number.isFinite(e))return"";let t=Math.floor(e/6e4);if(t<1)return"\u521A\u521A";if(t<60)return`${t} \u5206\u949F\u524D`;let n=Math.floor(t/60);return n<24?`${n} \u5C0F\u65F6\u524D`:`${Math.floor(n/24)} \u5929\u524D`}function Ny({activeDocId:i,onClose:e}){let t=(0,k.useRef)(null),[n,s]=(0,k.useState)(null),[r,o]=(0,k.useState)(null),[a,l]=(0,k.useState)(null),[c,h]=(0,k.useState)(null);(0,k.useEffect)(()=>{let f=y=>{t.current!==null&&y.target instanceof Node&&t.current.contains(y.target)||e()},p=y=>{y.key==="Escape"&&e()};return document.addEventListener("pointerdown",f,!0),document.addEventListener("keydown",p),()=>{document.removeEventListener("pointerdown",f,!0),document.removeEventListener("keydown",p)}},[e]);let d=(0,k.useCallback)(()=>{s(null),o(null),fetch("/dsh-cad/docs").then(f=>f.ok?f.json():Promise.reject(new Error(`HTTP ${f.status}`))).then(f=>{s(f.docs??[])}).catch(f=>{o(f instanceof Error?f.message:String(f))})},[]);(0,k.useEffect)(()=>{d()},[d]);let u=f=>{h(f),fetch(`/dsh-cad/docs/delete?id=${encodeURIComponent(f)}`,{method:"POST"}).then(()=>{l(null),Jr?.docId===f&&Fl(null),d()}).catch(p=>{o(p instanceof Error?p.message:String(p))}).finally(()=>{h(null)})};return k.default.createElement("div",{ref:t,style:Ae.menu,role:"menu","aria-label":"\u6587\u6863\u5217\u8868"},k.default.createElement("div",{style:Ae.docsHeader},"\u5DE5\u4F5C\u533A\u6587\u6863"),r!==null?k.default.createElement("div",{style:Ae.docsError},r):null,n===null&&r===null?k.default.createElement("div",{style:Ae.docsHintRow},"\u52A0\u8F7D\u4E2D\u2026"):null,n!==null&&n.length===0?k.default.createElement("div",{style:Ae.docsHintRow},"\u8FD8\u6CA1\u6709\u5EFA\u6A21\u6587\u6863 \u2014 \u5728\u5BF9\u8BDD\u4E2D\u5EFA\u6A21\u540E\u4F1A\u51FA\u73B0\u5728\u8FD9\u91CC"):null,n?.map(f=>{let p=f.id===i;return k.default.createElement("div",{key:f.id,style:Ae.docRow},k.default.createElement("button",{type:"button",role:"menuitem",style:Ae.docRowMain,onClick:()=>{f.sceneUrl!==void 0&&(Fl({docId:f.id,name:f.name,sceneUrl:f.sceneUrl}),zf("part"),e())},title:f.sceneUrl===void 0?"\u7A7A\u6587\u6863\uFF08\u65E0\u573A\u666F\uFF09":"\u70B9\u51FB\u9884\u89C8"},k.default.createElement("span",{style:Ae.menuIcon},k.default.createElement(wy,null)),k.default.createElement("span",{style:{...Ae.menuLabel,...p?{color:"var(--dsw-alias-label-primary,#4d6bfe)",fontWeight:600}:{}}},f.name,p?" \xB7 \u5F53\u524D":""),k.default.createElement("span",{style:Ae.menuHint},f.bodies," \u4F53 \xB7 ",Dy(f.updatedAt))),a===f.id?k.default.createElement("span",{style:Ae.docConfirm},k.default.createElement("button",{type:"button",style:Ae.docConfirmYes,disabled:c===f.id,onClick:()=>{u(f.id)}},"\u5220\u9664"),k.default.createElement("button",{type:"button",style:Ae.docConfirmNo,onClick:()=>{l(null)}},"\u53D6\u6D88")):k.default.createElement("button",{type:"button",style:Ae.docDelete,"aria-label":`\u5220\u9664\u6587\u6863 ${f.name}`,title:"\u5220\u9664\u6587\u6863",onClick:()=>{l(f.id)}},"\xD7"))}),k.default.createElement("div",{style:Ae.docsFooter},"\u70B9\u51FB\u9884\u89C8 \xB7 \u5207\u6362\u5EFA\u6A21\u76EE\u6807\u8BF7\u5728\u5BF9\u8BDD\u4E2D\u8BF4\u300C\u6253\u5F00 xx \u6587\u6863\u300D"))}function Yf(i){let[e,t]=(0,k.useState)(!1),[n,s]=(0,k.useState)(!1),r=vy(i.useSessions,i.sessions),o=i.useSessions?.(h=>h.current)??null;(0,k.useEffect)(()=>{Tf(o)},[o]);let{tabs:a,active:l}=by(),c=l===null?null:r[l];return k.default.createElement(k.default.Fragment,null,k.default.createElement("div",{style:Ae.tabStripRow},k.default.createElement("div",{style:Ae.tabStrip,role:"tablist","aria-label":"CAD \u6587\u6863"},a.map(h=>{let d=h.id===l;return k.default.createElement("div",{key:h.id,role:"tab","aria-selected":d,tabIndex:0,style:{...Ae.tab,...d?Ae.tabActive:{}},onClick:()=>{Ff(h.id)},onKeyDown:u=>{(u.key==="Enter"||u.key===" ")&&Ff(h.id)}},k.default.createElement("span",{style:d?Ae.tabIconActive:Ae.tabIcon},k.default.createElement(Wf,{kind:h.id})),k.default.createElement("span",{style:Ae.tabLabel},Uf[h.id]),k.default.createElement("button",{type:"button",style:Ae.tabClose,"aria-label":`\u5173\u95ED ${Uf[h.id]}`,title:"\u5173\u95ED",onClick:u=>{u.stopPropagation(),yy(h.id)}},"\xD7"))}),k.default.createElement("button",{type:"button",style:Ae.addTab,"aria-label":"\u65B0\u5EFA\u6587\u6863",title:"\u65B0\u5EFA\uFF1A\u96F6\u4EF6 / \u88C5\u914D\u4F53 / \u5DE5\u7A0B\u56FE",onClick:()=>{s(!1),t(h=>!h)}},"+")),k.default.createElement("button",{type:"button",style:Ae.fileButton,"aria-label":"\u6587\u6863\u5217\u8868","aria-expanded":n,title:"\u5DE5\u4F5C\u533A\u6587\u6863\u5217\u8868\uFF08\u9884\u89C8 / \u5220\u9664\uFF09",onClick:()=>{t(!1),s(h=>!h)}},k.default.createElement(Ey,null)),k.default.createElement("span",{style:Ae.headerStats},c===null?"":ky(c)),i.onCollapse!==void 0?k.default.createElement("button",{type:"button",style:Ae.iconButton,onClick:i.onCollapse,"aria-label":"\u6536\u8D77 CAD \u9762\u677F",title:"\u6536\u8D77"},"\xBB"):null),e?k.default.createElement(Ly,{onPick:h=>{t(!1),zf(h)},onClose:()=>{t(!1)}}):null,n?k.default.createElement(Ny,{activeDocId:r.part?.viewId??null,onClose:()=>{s(!1)}}):null,k.default.createElement("div",{style:Ae.body},l==="part"?k.default.createElement(Fy,{meta:r.part}):null,l==="assembly"?k.default.createElement(Oy,{meta:r.assembly}):null,l==="drawing"?k.default.createElement(By,{meta:r.drawing}):null))}function Zf(i){return function(t){let n=(0,k.useRef)(null),[s,r]=(0,k.useState)(()=>Oh().expanded??!0),[o,a]=(0,k.useState)(()=>Oh().width??Cy);(0,k.useEffect)(()=>{kf({expanded:s})},[s]),(0,k.useEffect)(()=>{kf({width:o})},[o]);let l=Ay(n),c=(0,k.useMemo)(()=>{let p=l.centerWidth>0?Math.max(Of,l.centerWidth*Py):Bf;return Math.round(Math.min(o,p))},[o,l.centerWidth]);Uy(n,s,c);let h=(0,k.useRef)(null),d=p=>{p.preventDefault(),h.current={startX:p.clientX,startWidth:c},p.currentTarget.setPointerCapture(p.pointerId)},u=p=>{let y=h.current;if(y===null)return;let g=y.startWidth+(y.startX-p.clientX);a(Math.round(Math.min(Bf,Math.max(Of,g))))},f=()=>{h.current=null};return k.default.createElement("div",{ref:n,"data-cad-side-panel":"",style:Ae.root},s?k.default.createElement("div",{style:{...Ae.panel,right:l.right,width:c}},k.default.createElement("div",{style:Ae.resizer,onPointerDown:d,onPointerMove:u,onPointerUp:f,onPointerCancel:f,role:"separator","aria-orientation":"vertical","aria-label":"\u8C03\u6574 CAD \u9762\u677F\u5BBD\u5EA6"}),k.default.createElement(Yf,{useSessions:t.useSessions,sessions:i,onCollapse:()=>{r(!1)}})):k.default.createElement("button",{type:"button",style:{...Ae.rail,right:l.right+10},onClick:()=>{r(!0)},"aria-label":"\u5C55\u5F00 CAD \u9762\u677F",title:"\u5C55\u5F00 CAD \u89C6\u56FE"},"\xAB\xA0\xA0CAD"))}}function $f(i){return function(t){return k.default.createElement("div",{"data-cad-pane":"",style:Ae.paneRoot},k.default.createElement(Yf,{useSessions:t.useSessions,sessions:i}))}}function Uy(i,e,t){(0,k.useLayoutEffect)(()=>{let n=i.current;if(n===null)return;let s=Xf(n).centerCol;if(s!==null)return s.style.paddingRight=e?`${Ry+t}px`:"",()=>{s.style.paddingRight=""}},[i,e,t])}function Fy({meta:i}){let e=My(),t=Cf(),n=t!==null&&t.sceneUrl!==void 0&&(i===null||t.id!==i.viewId),s=n?t.id:i?.viewId??null,r=n?t.sceneUrl:i?.sceneUrl,o=Ph(s),a=(0,k.useMemo)(()=>Ih(r,o),[r,o]),l=Bs(a),c=Bs(e?.sceneUrl),h=(0,k.useMemo)(()=>Ul(a),[a]),{tree:d}=Df(s,h),[u,f]=(0,k.useState)(!0),[p,y]=(0,k.useState)(null),[g,m]=(0,k.useState)(new Set),C=(0,k.useMemo)(()=>[...g],[g]);return(0,k.useEffect)(()=>{y(null),m(new Set)},[s]),(0,k.useEffect)(()=>{a!==void 0&&Jr!==null&&Fl(null)},[a]),e!==null?k.default.createElement("div",{style:Ae.sceneFill},k.default.createElement("div",{style:Ae.previewBar},k.default.createElement("span",{style:Ae.previewLabel},"\u9884\u89C8: ",e.name),k.default.createElement("button",{type:"button",style:Ae.previewBack,onClick:()=>{Fl(null)}},"\u8FD4\u56DE\u8DDF\u8E2A")),k.default.createElement(ks,{scene:c.scene,error:c.error,fill:!0})):i===null&&!n?k.default.createElement(zy,null):k.default.createElement("div",{style:Ae.assemblyStage},k.default.createElement("div",{style:Ae.sceneFill},k.default.createElement(ks,{scene:l.scene,error:l.error,fill:!0,highlight:p,hidden:C})),u?k.default.createElement("div",{style:Ae.treeFloat},k.default.createElement(Nf,{tree:d,selected:p,onSelect:y,hidden:g,onToggleHidden:w=>{m(_=>{let S=new Set(_),M=w.every(A=>S.has(A));for(let A of w)M?S.delete(A):S.add(A);return S})},onCollapse:()=>{f(!1)}})):k.default.createElement("button",{type:"button",style:Ae.treeRail,onClick:()=>{f(!0)},"aria-label":"\u5C55\u5F00\u7279\u5F81\u6811",title:"\u5C55\u5F00\u7279\u5F81\u6811"},"\u203A"))}function Oy({meta:i}){let e=i!==null&&i.viewId.startsWith("asm-")?i.viewId.slice(4):null,t=Ph(e),n=(0,k.useMemo)(()=>Ih(i?.sceneUrl,t),[i?.sceneUrl,t]),{scene:s,error:r}=Bs(n),o=(0,k.useMemo)(()=>Ul(n),[n]),{tree:a}=Pf(e,o),[l,c]=(0,k.useState)(!0),[h,d]=(0,k.useState)(null),[u,f]=(0,k.useState)(new Set),p=(0,k.useMemo)(()=>[...u],[u]);return(0,k.useEffect)(()=>{d(null),f(new Set)},[e]),i===null?k.default.createElement(Jf,{icon:k.default.createElement(Vf,null),title:"\u88C5\u914D\u4F53\u4E3A\u7A7A",hint:"\u5728\u5BF9\u8BDD\u4E2D\u8BF4\u300C\u628A b1 \u548C b2 \u88C5\u914D\u8D77\u6765\uFF0Cb2 \u653E\u5230 (60, 0, 0)\u300D\uFF0C\u6216\u4F7F\u7528 cad_assembly_insert \u5DE5\u5177\u63D2\u5165\u5B9E\u4F8B"}):k.default.createElement("div",{style:Ae.assemblyStage},k.default.createElement("div",{style:Ae.sceneFill},k.default.createElement(ks,{scene:s,error:r,fill:!0,highlight:h,hidden:p})),l?k.default.createElement("div",{style:Ae.treeFloat},k.default.createElement(If,{tree:a,selected:h,onSelect:d,hidden:u,onToggleHidden:y=>{f(g=>{let m=new Set(g);return m.has(y.name)?m.delete(y.name):m.add(y.name),m})},onCollapse:()=>{c(!1)}})):k.default.createElement("button",{type:"button",style:Ae.treeRail,onClick:()=>{c(!0)},"aria-label":"\u5C55\u5F00\u88C5\u914D\u6811",title:"\u5C55\u5F00\u88C5\u914D\u6811"},"\u203A"))}function By({meta:i}){let{scene:e,error:t}=Bs(i?.sceneUrl),n=Ns();return i===null?k.default.createElement(Jf,{icon:k.default.createElement(Gf,null),title:"\u8FD8\u6CA1\u6709\u5DE5\u7A0B\u56FE",hint:"\u5728\u5BF9\u8BDD\u4E2D\u8BF4\u300C\u7ED9 b1 \u51FA\u4E00\u5F20 A3 \u5DE5\u7A0B\u56FE\u300D\uFF0C\u6216\u4F7F\u7528 cad_drawing \u5DE5\u5177\u751F\u6210\u4E09\u89C6\u56FE + \u8F74\u6D4B\u56FE"}):k.default.createElement("div",{style:{...Ae.sceneFill,background:Wr(n)}},k.default.createElement(ks,{scene:e,error:t,fill:!0}))}function Jf({icon:i,title:e,hint:t}){return k.default.createElement("div",{style:Ae.emptyState},k.default.createElement("div",{style:Ae.emptyIcon},i),k.default.createElement("div",{style:Ae.emptyTitle},e),k.default.createElement("div",{style:Ae.emptyHint},t))}function ky(i){let e=[];if(i.kind==="3d"){let t=i.doc==="assembly"?" \u5B9E\u4F8B":" \u4F53";i.stats.meshes!==void 0&&e.push(`${i.stats.meshes}${t}`),i.stats.triangles!==void 0&&e.push(`${i.stats.triangles.toLocaleString()} \u4E09\u89D2\u9762`)}else i.stats.entities!==void 0&&e.push(`${i.stats.entities.toLocaleString()} \u5B9E\u4F53`);return e.join(" \xB7 ")}function zy(){let i=(0,k.useRef)(null),e=Ns();return(0,k.useEffect)(()=>{let t=i.current;if(t===null)return;let n=gf(t,{part:null});return()=>{n.dispose()}},[]),k.default.createElement("div",{style:Ae.demoRoot},k.default.createElement("div",{style:Ae.demoCaption},"Part Studio"),k.default.createElement("div",{style:{...Ae.demoViewport,background:Wr(e)}},k.default.createElement("div",{ref:i,style:{width:"100%",height:"100%"}})),k.default.createElement("div",{style:Ae.demoHint},"\u5EFA\u6A21\u533A\u4E3A\u7A7A \xB7 \u5728\u5BF9\u8BDD\u4E2D\u63CF\u8FF0\u96F6\u4EF6\uFF08\u5982\u300C\u5EFA\u4E00\u4E2A 100\xD760\xD710 \u7684\u677F\uFF0C\u4E2D\u95F4\u6253 \u230020 \u5B54\u300D\uFF09\uFF0C\u5EFA\u6A21\u540E\u6B64\u9875\u7B7E\u5B9E\u65F6\u8DDF\u8E2A\u6700\u65B0\u6A21\u578B"))}var Ae={root:{position:"absolute",inset:0,pointerEvents:"none"},paneRoot:{width:"100%",height:"100%",display:"flex",flexDirection:"column",minWidth:0,minHeight:0,background:"var(--dsw-alias-bg-base, #fff)"},panel:{position:"absolute",top:"var(--dsh-windows-titlebar-height, 0px)",bottom:0,pointerEvents:"auto",display:"flex",flexDirection:"column",minWidth:0,background:"var(--dsw-alias-bg-base, #fff)",borderLeft:"1px solid var(--dsw-alias-border-l2, #c4c9d0)",boxShadow:"-16px 0 28px -20px rgba(16,24,40,0.18)",WebkitAppRegion:"no-drag"},resizer:{position:"absolute",top:0,bottom:0,left:0,width:7,marginLeft:-3,cursor:"col-resize",zIndex:6,touchAction:"none"},tabStripRow:{display:"flex",alignItems:"center",gap:6,padding:"6px 8px 6px 12px",flex:"none",borderBottom:"1px solid var(--dsw-alias-border-l1, #eceff3)",background:"var(--dsw-alias-bg-subtle, #f7f8fa)",position:"relative"},tabStrip:{display:"flex",alignItems:"center",gap:4,flex:"1 1 auto",minWidth:0,overflow:"hidden"},tab:{display:"flex",alignItems:"center",gap:5,padding:"4px 6px 4px 9px",borderRadius:7,border:"1px solid transparent",color:"var(--dsw-alias-label-tertiary, #6b7280)",cursor:"pointer",userSelect:"none",flex:"none",maxWidth:150,lineHeight:"18px"},tabActive:{background:"var(--dsw-alias-bg-base, #fff)",borderColor:"var(--dsw-alias-border-l1, #e2e5ea)",color:"var(--dsw-alias-label-primary, #1f2937)",boxShadow:"0 1px 2px rgba(16,24,40,0.06)"},tabIcon:{display:"flex",alignItems:"center",opacity:.75,flex:"none"},tabIconActive:{display:"flex",alignItems:"center",color:"var(--dsw-alias-label-primary, #4d6bfe)",flex:"none"},tabLabel:{fontSize:12,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},tabClose:{border:"none",background:"transparent",color:"var(--dsw-alias-label-tertiary, #9ca3af)",fontSize:13,lineHeight:"16px",width:16,height:16,borderRadius:4,cursor:"pointer",padding:0,flex:"none",textAlign:"center"},addTab:{flex:"none",width:24,height:24,marginLeft:2,display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid var(--dsw-alias-border-l1, #e2e5ea)",borderRadius:7,background:"var(--dsw-alias-bg-base, #fff)",color:"var(--dsw-alias-label-secondary, #374151)",fontSize:15,lineHeight:"18px",cursor:"pointer",padding:0},menu:{position:"absolute",top:40,left:12,zIndex:20,minWidth:230,padding:5,background:"var(--dsw-alias-bg-base, #fff)",border:"1px solid var(--dsw-alias-border-l1, #e2e5ea)",borderRadius:10,boxShadow:"0 12px 32px -12px rgba(16,24,40,0.24)",display:"flex",flexDirection:"column",gap:1},menuItem:{display:"flex",alignItems:"center",gap:8,padding:"7px 9px",border:"none",borderRadius:7,background:"transparent",color:"var(--dsw-alias-label-primary, #1f2937)",cursor:"pointer",textAlign:"left",font:"inherit",fontSize:12.5},menuIcon:{display:"flex",alignItems:"center",color:"var(--dsw-alias-label-secondary, #374151)",flex:"none"},menuLabel:{fontWeight:600,flex:"none"},menuHint:{color:"var(--dsw-alias-label-tertiary, #9ca3af)",fontSize:11,marginLeft:"auto",whiteSpace:"nowrap"},fileButton:{flex:"none",display:"flex",alignItems:"center",justifyContent:"center",width:24,height:24,marginLeft:4,border:"1px solid var(--dsw-alias-border-l2, #c4c9d0)",borderRadius:6,background:"transparent",color:"var(--dsw-alias-label-secondary, #374151)",cursor:"pointer",padding:0},docsHeader:{fontSize:11,fontWeight:600,color:"var(--dsw-alias-label-tertiary, #6b7280)",padding:"5px 9px 3px",letterSpacing:"0.02em"},docsHintRow:{fontSize:12,color:"var(--dsw-alias-label-tertiary, #6b7280)",padding:"8px 9px"},docsError:{fontSize:12,color:"var(--dsw-alias-state-error-primary, #d92d20)",padding:"4px 9px"},docsFooter:{fontSize:11,color:"var(--dsw-alias-label-tertiary, #9ca3af)",padding:"5px 9px 3px",borderTop:"1px solid var(--dsw-alias-border-l1, #e2e5ea)",marginTop:3},docRow:{display:"flex",alignItems:"center",gap:2},docRowMain:{display:"flex",alignItems:"center",gap:8,flex:"1 1 auto",minWidth:0,padding:"7px 9px",border:"none",borderRadius:7,background:"transparent",color:"var(--dsw-alias-label-primary, #1f2937)",cursor:"pointer",textAlign:"left",font:"inherit",fontSize:12.5},docDelete:{flex:"none",width:22,height:22,border:"none",borderRadius:6,background:"transparent",color:"var(--dsw-alias-label-tertiary, #9ca3af)",fontSize:14,lineHeight:"20px",cursor:"pointer",padding:0},docConfirm:{display:"flex",alignItems:"center",gap:4,flex:"none",padding:"0 4px 0 0"},docConfirmYes:{border:"none",borderRadius:6,background:"var(--dsw-alias-state-error-primary, #d92d20)",color:"#fff",fontSize:11,padding:"3px 8px",cursor:"pointer"},docConfirmNo:{border:"1px solid var(--dsw-alias-border-l2, #c4c9d0)",borderRadius:6,background:"transparent",color:"var(--dsw-alias-label-secondary, #374151)",fontSize:11,padding:"3px 8px",cursor:"pointer"},previewBar:{flex:"none",display:"flex",alignItems:"center",gap:8,padding:"5px 10px",borderBottom:"1px solid var(--dsw-alias-border-l1, #e2e5ea)",background:"var(--dsw-alias-bg-subtle, #f5f6f8)"},previewLabel:{flex:"1 1 auto",minWidth:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",fontSize:12,color:"var(--dsw-alias-label-primary, #1f2937)",fontWeight:600},previewBack:{flex:"none",border:"1px solid var(--dsw-alias-border-l2, #c4c9d0)",borderRadius:6,background:"transparent",color:"var(--dsw-alias-label-secondary, #374151)",fontSize:11,padding:"2px 8px",cursor:"pointer"},headerStats:{flex:"none",fontSize:11,color:"var(--dsw-alias-label-tertiary, #6b7280)",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",maxWidth:"30%"},iconButton:{flex:"none",border:"none",background:"transparent",color:"var(--dsw-alias-label-tertiary, #6b7280)",fontSize:15,lineHeight:"20px",width:26,height:26,borderRadius:6,cursor:"pointer",padding:0},body:{flex:"1 1 auto",minHeight:0,display:"flex",flexDirection:"column"},sceneFill:{flex:"1 1 auto",minHeight:0,display:"flex",flexDirection:"column"},assemblyStage:{flex:"1 1 auto",minHeight:0,position:"relative",display:"flex",flexDirection:"column"},treeFloat:{position:"absolute",top:8,left:8,zIndex:6,maxHeight:"calc(100% - 16px)",display:"flex",flexDirection:"column"},treeRail:{position:"absolute",top:8,left:8,zIndex:6,width:22,height:22,border:"1px solid var(--dsw-alias-border-l1, #e2e5ea)",borderRadius:7,background:"var(--dsw-alias-bg-base, #fff)",color:"var(--dsw-alias-label-tertiary, #9ca3af)",fontSize:13,lineHeight:"18px",cursor:"pointer",padding:0,boxShadow:"0 4px 12px -6px rgba(16,24,40,0.25)"},emptyState:{flex:"1 1 auto",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8,padding:24,color:"var(--dsw-alias-label-tertiary, #9ca3af)",textAlign:"center"},emptyIcon:{display:"flex",color:"var(--dsw-alias-label-tertiary, #c0c6cf)",transform:"scale(2)",marginBottom:6},emptyTitle:{fontSize:13,fontWeight:600,color:"var(--dsw-alias-label-secondary, #6b7280)"},emptyHint:{fontSize:11.5,lineHeight:"18px",maxWidth:300},demoRoot:{flex:"1 1 auto",minHeight:0,display:"flex",flexDirection:"column",gap:6,padding:"10px 10px 12px"},demoCaption:{color:"var(--dsw-alias-label-tertiary, #6b7280)",fontSize:11,textTransform:"uppercase",letterSpacing:"0.05em",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",flex:"none"},demoViewport:{position:"relative",flex:"1 1 auto",minHeight:0,borderRadius:10,overflow:"hidden"},demoHint:{flex:"none",color:"var(--dsw-alias-label-tertiary, #9ca3af)",fontSize:11,lineHeight:"17px",textAlign:"center"},rail:{position:"absolute",top:72,pointerEvents:"auto",writingMode:"vertical-rl",padding:"12px 6px",borderRadius:10,border:"1px solid var(--dsw-alias-border-l2, #c4c9d0)",background:"var(--dsw-alias-bg-base, #fff)",color:"var(--dsw-alias-label-secondary, #374151)",fontSize:11,letterSpacing:"0.08em",cursor:"pointer",boxShadow:"4px 4px 12px -6px rgba(16,24,40,0.2)",WebkitAppRegion:"no-drag"}};var kh="dsh-cad",Hy="cad",Ol=[100,300,600,1200];function jf({size:i=16,className:e}){return Wi.default.createElement("svg",{width:i,height:i,viewBox:"0 0 16 16",fill:"none",className:e,"aria-hidden":"true"},Wi.default.createElement("path",{d:"M8 1.5 14 5v6L8 14.5 2 11V5L8 1.5Z",stroke:"currentColor",strokeWidth:"1.2",strokeLinejoin:"round"}),Wi.default.createElement("path",{d:"M2 5l6 3.2L14 5M8 8.2v6.3",stroke:"currentColor",strokeWidth:"1.2",strokeLinejoin:"round"}))}function Vy(i){let e=i.useTabInfo?.().tab;return Wi.default.createElement(Wi.default.Fragment,null,Wi.default.createElement(jf,{size:16}),e?.title??"CAD")}function Kf(i,e){let t=i.get?.("sidebarRightTabs");if(t==null||typeof t.register!="function")return!1;let n=i.effect??(o=>o()),s=[],r=o=>{typeof o=="function"&&s.push(o)};try{return r(t.register({id:kh,kind:Hy,title:()=>"CAD",guide:[{order:20,title:()=>"CAD \u89C6\u56FE",description:()=>"\u4E09\u7EF4\u6A21\u578B \xB7 \u88C5\u914D\u4F53 \xB7 \u5DE5\u7A0B\u56FE\uFF0C\u5B9E\u65F6\u8DDF\u8E2A\u672C\u4F1A\u8BDD\u7684\u5EFA\u6A21\u7ED3\u679C",icon:jf}]})),r(n(()=>i.slots.inject("sidebar.right.pane.tab",()=>i.slots.register({name:"sidebar.right.pane.tab",key:kh},$f(e))),"dsh-cad: rightbar pane body")),r(n(()=>i.slots.inject("sidebar.right.pane.tab.title",()=>i.slots.register({name:"sidebar.right.pane.tab.title",key:kh},Vy)),"dsh-cad: rightbar pane title")),!0}catch{for(let o of s.reverse())try{o()}catch{}return!1}}function Qf(i,e){if(Kf(i,e))return;let t=!1,n=s=>{if(t)return;if(Kf(i,e)){t=!0;return}if(s>=Ol.length){t=!0,i.slots.inject("shell.overlay",()=>i.slots.register({name:"shell.overlay",id:"cad-side-panel",order:100,label:"CAD"},Zf(e)));return}let r=()=>{n(s+1)};try{typeof i.setTimeout=="function"?i.setTimeout(r,Ol[s]):setTimeout(r,Ol[s])}catch{setTimeout(r,Ol[s])}};n(0)}var Gy=["slots"],Wy=["cad_view","cad_create_prim","cad_extrude_profile","cad_revolve","cad_chamfer","cad_shell","cad_draft","cad_pattern","cad_loft","cad_sweep","cad_boolean","cad_fillet","cad_transform","cad_export","cad_delete","cad_volume","cad_freecad","cad_image_profile","cad_drawing","cad_assembly_insert","cad_assembly_move","cad_assembly_remove","cad_doc_open","cad_constraint","cad_solve","cad_motion"];function Xy(i){i.slots.onEntryError?.((n,s,r,o)=>{try{document.documentElement.setAttribute("data-cad-slot-crash",`${n}:${String(r instanceof Error?r.message:r).slice(0,160)}:abd=${String(o.abdicated)}`)}catch{}});for(let n of Wy)i.slots.inject("tool.call.toolview",()=>i.slots.register({name:"tool.call.toolview",key:n,locale:"conversation"},Ef));let t=i.get?.("sessions");Qf(i,t)}
    return module.exports;
  }
});
//# sourceMappingURL=client.js.map
