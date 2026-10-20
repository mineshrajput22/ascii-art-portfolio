import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

function setup() {
  let frames = new Map(), next = 0, steps = 0;
  const events = new Map();
  const media = { matches: true, addEventListener(){}, removeEventListener(){} };
  const document = { hidden:false, documentElement:{addEventListener(){},removeEventListener(){}},
    addEventListener(name,fn){events.set(name,fn);}, removeEventListener(){} };
  class World { time=0; pointer={}; resize(){} step(){steps++;this.time+=1/60;} }
  class Renderer { cellWidth=8;cellHeight=12;setFontFamily(){}resize(){}render(){}setTheme(){} }
  const context = {exports:{},require:name=>name==='./world'?{World}:{AsciiRenderer:Renderer},
    window:{matchMedia:()=>media,devicePixelRatio:1,addEventListener(){},removeEventListener(){}},
    document, getComputedStyle:()=>({fontFamily:'monospace'}),
    ResizeObserver:class {observe(){}disconnect(){}},
    IntersectionObserver:class {observe(){}disconnect(){}},
    performance:{now:()=>0},
    requestAnimationFrame:fn=>{frames.set(++next,fn);return next;},
    cancelAnimationFrame:id=>frames.delete(id)};
  const source=readFileSync('src/lib/ocean/engine.ts','utf8');
  vm.runInNewContext(ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,context);
  const engine=new context.exports.OceanEngine({getBoundingClientRect:()=>({width:1000,height:800})});
  return {engine,document,events,frames,step:()=>{const [id,fn]=[...frames][0];frames.delete(id);fn(34);},steps:()=>steps};
}

test('ocean animates by default even under reduced motion; hidden tabs stop it',()=>{
  const app=setup();
  assert.equal(app.frames.size,1,'Ocean should animate immediately regardless of OS preference');
  const before=app.steps();app.step();
  assert.ok(app.steps()>before,'The scene must actually advance');
  app.engine.setPaused(true);
  assert.equal(app.frames.size,0);
  app.engine.setPaused(false);
  app.document.hidden=true;app.events.get('visibilitychange')();
  assert.equal(app.frames.size,0);
  app.document.hidden=false;app.events.get('visibilitychange')();
  assert.equal(app.frames.size,1);
  app.engine.destroy();
  assert.equal(app.frames.size,0);
});
