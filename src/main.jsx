import React from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, AtSign, BriefcaseBusiness, GraduationCap, MapPin, MessageCircle, Sparkles } from 'lucide-react';
import Matter from 'matter-js';
import Lanyard from './components/Lanyard';
import './styles.css';

const projects = [
  {
    title: '贵州通信主题视觉设计',
    type: 'Brand Visual',
    year: '2025',
    desc: '围绕地域文化与通信科技感，建立主题视觉、版式秩序与延展物料。',
    tone: 'cyan'
  },
  {
    title: '云南白药口腔创意海报设计',
    type: 'Poster Campaign',
    year: '2025',
    desc: '以产品功效和口腔健康场景为核心，完成系列创意海报表达。',
    tone: 'silver'
  },
  {
    title: '喜茶快闪店空间设计',
    type: 'Spatial Design',
    year: '2025',
    desc: '结合品牌年轻化语境，探索快闪空间动线、视觉氛围与陈列体验。',
    tone: 'green'
  },
  {
    title: '品牌VI设计课程项目',
    type: 'Identity System',
    year: '2024',
    desc: '完成品牌基础识别、辅助图形、应用物料与视觉规范初步搭建。',
    tone: 'amber'
  }
];

const skills = ['Photoshop', 'Illustrator', 'Rhino', 'AutoCAD', 'Blender', 'Figma', 'Midjourney', 'ChatGPT'];
const marqueeSkills = Array.from({ length: 5 }, () => skills).flat();
const assetPath = (path) => `${import.meta.env.BASE_URL}${path}`;

const strengths = [
  {
    title: '品牌视觉设计',
    body: '能够从品牌调性、视觉识别、版式系统和应用场景出发，建立统一的视觉表达。'
  },
  {
    title: 'AI辅助创意',
    body: '关注AI工具在视觉设计中的应用，能够用Midjourney、ChatGPT辅助发散、提案和效率提升。'
  },
  {
    title: 'UI与平面表达',
    body: '具备UI界面、海报、视觉物料的基础设计能力，重视信息层级与画面完成度。'
  },
  {
    title: '三维与空间意识',
    body: '熟悉Rhino、CAD、Blender等工具，可完成基础三维建模、空间概念和视觉呈现。'
  }
];

function HeroLanyard({ lanyardRef }) {
  return (
    <div className="heroLanyard" ref={lanyardRef} aria-label="Designer lanyard card">
      <svg className="lanyardBand" viewBox="0 0 300 560" role="img" aria-hidden="true">
        <defs>
          <pattern id="lanyardPattern" width="22" height="22" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
            <rect width="22" height="22" fill="#2f3a29" />
            <path d="M0 11H22" stroke="#d6b46e" strokeWidth="4" strokeOpacity="0.74" />
            <path d="M0 2H22M0 20H22" stroke="#8aa0ad" strokeWidth="1.3" strokeOpacity="0.5" />
          </pattern>
          <linearGradient id="bandEdge" x1="0" x2="1">
            <stop offset="0" stopColor="#efe1c6" stopOpacity="0.38" />
            <stop offset="0.38" stopColor="#d6b46e" stopOpacity="0.1" />
            <stop offset="1" stopColor="#0d0f0b" stopOpacity="0.48" />
          </linearGradient>
        </defs>
        <path className="lanyardStrap" d="M130 -54C130 28 130 95 130 184" />
        <path className="lanyardStrapEdge" d="M130 -54C130 28 130 95 130 184" />
      </svg>

      <div className="lanyardClip" aria-hidden="true">
        <span />
      </div>

      <section className="lanyardCard">
        <div className="lanyardPatternMark" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="lanyardCardLabel">VISUAL / AI / BRAND</div>
        <dl className="lanyardInfo">
          <div>
            <dt>姓名</dt>
            <dd>诗附存</dd>
          </div>
          <div>
            <dt>邮箱</dt>
            <dd>guchixsh@163.com</dd>
          </div>
        </dl>
      </section>
    </div>
  );
}

function App() {
  const [softwareDropped, setSoftwareDropped] = React.useState(false);
  const heroRef = React.useRef(null);
  const softwareRailRef = React.useRef(null);
  const lanyardRef = React.useRef(null);

  React.useEffect(() => {
    const hero = heroRef.current;
    if (!hero || !softwareDropped) return undefined;

    const keepWheelScrolling = (event) => {
      event.stopImmediatePropagation();
    };

    hero.addEventListener('wheel', keepWheelScrolling, { capture: true, passive: true });
    return () => hero.removeEventListener('wheel', keepWheelScrolling, { capture: true });
  }, [softwareDropped]);

  React.useEffect(() => {
    if (!softwareDropped || !softwareRailRef.current || !heroRef.current) return undefined;

    const { Engine, Runner, Bodies, Composite, Body, Events, Query } = Matter;
    const rail = softwareRailRef.current;
    const hero = heroRef.current;
    const heroRect = hero.getBoundingClientRect();
    const width = heroRect.width;
    const height = heroRect.height;
    const pills = [...rail.querySelectorAll('.softwarePill')].slice(0, marqueeSkills.length);

    const engine = Engine.create();
    engine.gravity.y = 0.92;
    engine.positionIterations = 6;
    engine.velocityIterations = 4;

    const boundaries = [
      Bodies.rectangle(width / 2, height + 34, width + 160, 68, { isStatic: true }),
      Bodies.rectangle(-34, height / 2, 68, height * 2, { isStatic: true }),
      Bodies.rectangle(width + 34, height / 2, 68, height * 2, { isStatic: true })
    ];

    const pillBodies = pills.map((pill) => {
      const left = Number.parseFloat(pill.style.getPropertyValue('--start-left')) || 0;
      const top = Number.parseFloat(pill.style.getPropertyValue('--start-top')) || 0;
      const pillWidth = Number.parseFloat(pill.style.getPropertyValue('--start-width')) || pill.offsetWidth;
      const pillHeight = Number.parseFloat(pill.style.getPropertyValue('--start-height')) || pill.offsetHeight;

      const body = Bodies.rectangle(left + pillWidth / 2, top + pillHeight / 2, pillWidth, pillHeight, {
        restitution: 0.28,
        friction: 0.5,
        frictionAir: 0.018,
        chamfer: { radius: 18 }
      });

      Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 2.2,
        y: Math.random() * 1.4
      });
      Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.06);

      return { pill, body, width: pillWidth, height: pillHeight };
    });

    Composite.add(engine.world, [...boundaries, ...pillBodies.map(({ body }) => body)]);

    const runner = Runner.create();
    Runner.run(runner, engine);

    const syncPills = () => {
      pillBodies.forEach(({ pill, body, width: pillWidth, height: pillHeight }) => {
        pill.style.left = `${body.position.x - pillWidth / 2}px`;
        pill.style.top = `${body.position.y - pillHeight / 2}px`;
        pill.style.transform = `rotate(${body.angle}rad)`;
      });
    };

    Events.on(engine, 'afterUpdate', syncPills);
    syncPills();

    let activeDrag = null;
    const draggableBodies = pillBodies.map(({ body }) => body);
    const getHeroPoint = (event) => {
      const rect = hero.getBoundingClientRect();
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      };
    };

    const handlePointerDown = (event) => {
      if (event.button !== undefined && event.button !== 0) return;

      const point = getHeroPoint(event);
      const hitBody = Query.point(draggableBodies, point)[0];
      if (!hitBody) return;

      event.preventDefault();
      activeDrag = {
        body: hitBody,
        offsetX: hitBody.position.x - point.x,
        offsetY: hitBody.position.y - point.y,
        targetX: hitBody.position.x,
        targetY: hitBody.position.y,
        pointerId: event.pointerId
      };
      event.stopPropagation();
      hero.classList.add('hero--draggingSoftware');
      hero.setPointerCapture?.(event.pointerId);
      Body.setVelocity(hitBody, { x: 0, y: 0 });
      Body.setAngularVelocity(hitBody, 0);
    };

    const handlePointerMove = (event) => {
      if (!activeDrag) return;

      event.preventDefault();
      const point = getHeroPoint(event);
      activeDrag.targetX = point.x + activeDrag.offsetX;
      activeDrag.targetY = point.y + activeDrag.offsetY;
      Body.setPosition(activeDrag.body, { x: activeDrag.targetX, y: activeDrag.targetY });
      Body.setVelocity(activeDrag.body, { x: 0, y: 0 });
      Body.setAngularVelocity(activeDrag.body, 0);
      syncPills();
    };

    const pinDraggedBody = () => {
      if (!activeDrag) return;

      Body.setPosition(activeDrag.body, {
        x: activeDrag.targetX,
        y: activeDrag.targetY
      });
      Body.setVelocity(activeDrag.body, { x: 0, y: 0 });
      Body.setAngularVelocity(activeDrag.body, 0);
    };

    const endDrag = (event) => {
      if (!activeDrag) return;

      hero.releasePointerCapture?.(activeDrag.pointerId ?? event.pointerId);
      Body.setVelocity(activeDrag.body, { x: 0, y: 0 });
      Body.setAngularVelocity(activeDrag.body, 0);
      activeDrag = null;
      hero.classList.remove('hero--draggingSoftware');
    };

    Events.on(engine, 'beforeUpdate', pinDraggedBody);
    hero.addEventListener('pointerdown', handlePointerDown, { capture: true });
    hero.addEventListener('pointermove', handlePointerMove);
    hero.addEventListener('pointerup', endDrag);
    hero.addEventListener('pointercancel', endDrag);

    return () => {
      hero.removeEventListener('pointerdown', handlePointerDown, { capture: true });
      hero.removeEventListener('pointermove', handlePointerMove);
      hero.removeEventListener('pointerup', endDrag);
      hero.removeEventListener('pointercancel', endDrag);
      hero.classList.remove('hero--draggingSoftware');
      Events.off(engine, 'beforeUpdate', pinDraggedBody);
      Events.off(engine, 'afterUpdate', syncPills);
      Runner.stop(runner);
      Composite.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, [softwareDropped]);

  React.useEffect(() => {
    const lanyard = lanyardRef.current;
    const hero = heroRef.current;
    if (!lanyard || !hero || !softwareDropped) return undefined;

    const { Engine, Runner, Bodies, Body, Composite, Constraint, Events, Query, Vector } = Matter;
    const heroRect = hero.getBoundingClientRect();
    const wrapperWidth = 300;
    const cardWidth = 264;
    const cardHeight = 322;
    const cardCenterLocal = { x: 150, y: 331 };
    const clipAttachLocal = { x: 0, y: -180 };
    const anchor = {
      x: Math.min(heroRect.width - 500, Math.max(440, heroRect.width * 0.38)),
      y: -92
    };

    const engine = Engine.create();
    engine.gravity.y = 0.7;
    engine.positionIterations = 20;
    engine.velocityIterations = 16;

    // 绳子最大拉伸距离
    const MAX_ROPE_STRETCH = heroRect.height * 1.0;

    const cardBody = Bodies.rectangle(anchor.x, -18, cardWidth, cardHeight, {
      frictionAir: 0.1,
      friction: 0.54,
      restitution: 0.04,
      density: 0.002,
      chamfer: { radius: 26 }
    });

    // 绳段连接：高刚度模拟 useRopeJoint 的默认刚性
    const jointOptions = {
      stiffness: 0.3,
      damping: 0.2,
      render: { visible: false }
    };
    // 绳节：高阻尼模拟 angularDamping: 4, linearDamping: 4
    const segmentOptions = {
      frictionAir: 0.15,
      friction: 0.35,
      restitution: 0,
      density: 0.006
    };
    const j1 = Bodies.circle(anchor.x, -32, 8, segmentOptions);
    const j2 = Bodies.circle(anchor.x, 52, 8, segmentOptions);
    const j3 = Bodies.circle(anchor.x, 136, 8, segmentOptions);
    const ropeA = Constraint.create({
      pointA: anchor,
      bodyB: j1,
      length: 70,
      ...jointOptions
    });
    const ropeB = Constraint.create({
      bodyA: j1,
      bodyB: j2,
      length: 70,
      ...jointOptions
    });
    const ropeC = Constraint.create({
      bodyA: j2,
      bodyB: j3,
      length: 70,
      ...jointOptions
    });
    // 卡片连接：极短 + 高刚度，模拟 useSphericalJoint 的固定偏移连接
    const ropeD = Constraint.create({
      bodyA: j3,
      bodyB: cardBody,
      pointB: clipAttachLocal,
      length: 25,
      stiffness: 0.5,
      damping: 0.3,
      render: { visible: false }
    });

    const boundaries = [
      Bodies.rectangle(-50, heroRect.height / 2, 100, heroRect.height * 2, { isStatic: true }),
      Bodies.rectangle(heroRect.width + 50, heroRect.height / 2, 100, heroRect.height * 2, { isStatic: true }),
      // 底部边界：防止吊牌掉出屏幕
      Bodies.rectangle(heroRect.width / 2, heroRect.height + 120, heroRect.width + 160, 240, { isStatic: true })
    ];

    Body.setVelocity(cardBody, { x: 0, y: 6 });
    Body.setAngularVelocity(cardBody, 0.015);
    Composite.add(engine.world, [j1, j2, j3, cardBody, ropeA, ropeB, ropeC, ropeD, ...boundaries]);

    const runner = Runner.create();
    Runner.run(runner, engine);

    const strap = lanyard.querySelector('.lanyardStrap');
    const strapEdge = lanyard.querySelector('.lanyardStrapEdge');
    const lanyardCard = lanyard.querySelector('.lanyardCard');
    const lanyardClip = lanyard.querySelector('.lanyardClip');
    let dragState = null;
    let lastPointer = null;
    let smoothedRope = [j1, j2, j3].map((body) => Vector.clone(body.position));
    let ropeRecovering = false;

    const getClipAttachWorld = () => Vector.add(cardBody.position, Vector.rotate(clipAttachLocal, cardBody.angle));

    const renderLanyard = () => {
      const wrapperLeft = cardBody.position.x - cardCenterLocal.x;
      const wrapperTop = cardBody.position.y - cardCenterLocal.y;
      const anchorLocalX = anchor.x - wrapperLeft;
      const anchorLocalY = anchor.y - wrapperTop;
      const attachWorld = getClipAttachWorld();
      const attachLocalX = attachWorld.x - wrapperLeft;
      const attachLocalY = attachWorld.y - wrapperTop;

      // 检测卡片是否超出安全范围，超出时平滑拉回
      const currentLength = Math.hypot(anchor.x - attachWorld.x, anchor.y - attachWorld.y);
      if (currentLength > MAX_ROPE_STRETCH && !ropeRecovering) {
        ropeRecovering = true;
        const angle = Math.atan2(attachWorld.y - anchor.y, attachWorld.x - anchor.x);
        const targetX = anchor.x + Math.cos(angle) * MAX_ROPE_STRETCH * 0.7;
        const targetY = anchor.y + Math.sin(angle) * MAX_ROPE_STRETCH * 0.7;
        Body.setPosition(cardBody, { x: targetX, y: targetY });
        Body.setVelocity(cardBody, { x: 0, y: 0 });
        Body.setAngularVelocity(cardBody, 0);
        smoothedRope = [j1, j2, j3].map((body) => Vector.clone(body.position));
        setTimeout(() => { ropeRecovering = false; }, 600);
      }

      // 参考 react-bits Lanyard: 速度自适应的绳段平滑（距离越大追赶越快）
      [j1, j2, j3].forEach((body, index) => {
        const dx = body.position.x - smoothedRope[index].x;
        const dy = body.position.y - smoothedRope[index].y;
        const distance = Math.hypot(dx, dy);
        const clamped = Math.max(0.1, Math.min(1, distance / 30));
        const blend = clamped * 0.75;
        smoothedRope[index].x += dx * blend;
        smoothedRope[index].y += dy * blend;
      });
      const p1 = { x: smoothedRope[0].x - wrapperLeft, y: smoothedRope[0].y - wrapperTop };
      const p2 = { x: smoothedRope[1].x - wrapperLeft, y: smoothedRope[1].y - wrapperTop };
      const p3 = { x: smoothedRope[2].x - wrapperLeft, y: smoothedRope[2].y - wrapperTop };
      const ropePath = `M ${anchorLocalX.toFixed(1)} ${anchorLocalY.toFixed(1)} C ${p1.x.toFixed(1)} ${p1.y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}, ${p3.x.toFixed(1)} ${p3.y.toFixed(1)} S ${attachLocalX.toFixed(1)} ${attachLocalY.toFixed(1)}, ${attachLocalX.toFixed(1)} ${attachLocalY.toFixed(1)}`;
      const pull = Math.max(0, Math.min(1, (currentLength - 300) / 210));
      const cardAngle = Math.max(-20, Math.min(20, cardBody.angle * 57.2958));

      lanyard.style.left = `${wrapperLeft}px`;
      lanyard.style.top = `${wrapperTop}px`;
      lanyard.style.opacity = '1';
      lanyard.style.transform = 'none';
      lanyard.style.setProperty('--rope-tension', pull.toFixed(3));
      lanyard.style.setProperty('--card-rotate', `${cardAngle.toFixed(2)}deg`);
      if (strap) strap.setAttribute('d', ropePath);
      if (strapEdge) strapEdge.setAttribute('d', ropePath);
      if (lanyardCard) lanyardCard.style.transform = `rotate(${cardAngle.toFixed(2)}deg)`;
      if (lanyardClip) lanyardClip.style.transform = `rotate(${(cardAngle * 0.45).toFixed(2)}deg)`;
      // 增强角速度阻尼，减少晃动
      Body.setAngularVelocity(cardBody, cardBody.angularVelocity * 0.88 - cardBody.angle * 0.003);
    };

    Events.on(engine, 'afterUpdate', renderLanyard);
    renderLanyard();

    const handlePointerDown = (event) => {
      if (event.button !== undefined && event.button !== 0) return;

      const rect = hero.getBoundingClientRect();
      const point = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      };
      const hitBody = Query.point([cardBody], point)[0];
      if (!hitBody) return;

      event.preventDefault();
      event.stopPropagation();
      dragState = {
        pointerId: event.pointerId,
        offsetX: cardBody.position.x - point.x,
        offsetY: cardBody.position.y - point.y
      };
      lastPointer = { x: point.x, y: point.y, time: performance.now() };
      lanyard.classList.add('heroLanyard--dragging');
      lanyard.setPointerCapture?.(event.pointerId);
      Body.setVelocity(cardBody, { x: 0, y: 0 });
      Body.setAngularVelocity(cardBody, 0);
      [j1, j2, j3].forEach((body) => Body.setVelocity(body, { x: body.velocity.x * 0.25, y: body.velocity.y * 0.25 }));
    };

    const handlePointerMove = (event) => {
      if (!dragState) return;

      event.preventDefault();
      const rect = hero.getBoundingClientRect();
      const point = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      };
      const now = performance.now();
      Body.setPosition(cardBody, {
        x: point.x + dragState.offsetX,
        y: point.y + dragState.offsetY
      });
      const dt = Math.max(16, now - (lastPointer?.time ?? now));
      const velocity = {
        x: ((point.x - (lastPointer?.x ?? point.x)) / dt) * 11,
        y: ((point.y - (lastPointer?.y ?? point.y)) / dt) * 11
      };
      Body.setVelocity(cardBody, velocity);
      Body.setAngularVelocity(cardBody, Math.max(-0.045, Math.min(0.045, velocity.x * 0.004)));
      lastPointer = { x: point.x, y: point.y, time: now };
      renderLanyard();
    };

    const endDrag = (event) => {
      if (!dragState) return;

      lanyard.releasePointerCapture?.(dragState.pointerId ?? event.pointerId);
      Body.setVelocity(cardBody, { x: cardBody.velocity.x * 0.3, y: cardBody.velocity.y * 0.3 });
      dragState = null;
      lastPointer = null;
      lanyard.classList.remove('heroLanyard--dragging');
    };

    lanyard.addEventListener('pointerdown', handlePointerDown);
    lanyard.addEventListener('pointermove', handlePointerMove);
    lanyard.addEventListener('pointerup', endDrag);
    lanyard.addEventListener('pointercancel', endDrag);

    return () => {
      lanyard.removeEventListener('pointerdown', handlePointerDown);
      lanyard.removeEventListener('pointermove', handlePointerMove);
      lanyard.removeEventListener('pointerup', endDrag);
      lanyard.removeEventListener('pointercancel', endDrag);
      lanyard.classList.remove('heroLanyard--dragging');
      Events.off(engine, 'afterUpdate', renderLanyard);
      Runner.stop(runner);
      Composite.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, [softwareDropped]);

  const triggerSoftwareDrop = (event) => {
    // 排除导航链接和吊牌区域的点击，防止误触
    const target = event.target;
    if (target.closest('.navActions a') || target.closest('.heroLanyard') || target.closest('.lanyardBand')) return;

    setSoftwareDropped((current) => {
      if (current) return current;

      const hero = heroRef.current;
      const rail = softwareRailRef.current;
      if (hero && rail) {
        const heroRect = hero.getBoundingClientRect();
        rail.querySelectorAll('.softwarePill').forEach((pill) => {
          const rect = pill.getBoundingClientRect();
          const visibleLeft = Math.max(rect.left, heroRect.left);
          const visibleRight = Math.min(rect.right, heroRect.right);
          const visibleWidth = Math.max(0, visibleRight - visibleLeft);
          const isPartiallyVisible = visibleWidth > 0 && visibleWidth < rect.width;
          const startLeft = isPartiallyVisible ? visibleLeft - heroRect.left : rect.left - heroRect.left;
          const startWidth = isPartiallyVisible ? Math.max(44, visibleWidth) : rect.width;

          pill.style.setProperty('--start-left', `${startLeft}px`);
          pill.style.setProperty('--start-top', `${rect.top - heroRect.top}px`);
          pill.style.setProperty('--start-width', `${startWidth}px`);
          pill.style.setProperty('--start-height', `${rect.height}px`);
        });
      }

      return true;
    });
  };

  return (
    <main>
      <section
        className={`hero ${softwareDropped ? 'hero--softwareDropped' : ''}`}
        id="home"
        ref={heroRef}
        onPointerDown={triggerSoftwareDrop}
      >
        <div className="heroImage" aria-hidden="true" style={{ backgroundImage: `url("${assetPath('atelier-hero.jpg')}")` }}>
          <div className="lightWash" />
        </div>
        <nav className="nav">
          <div className="navActions" aria-label="Primary navigation">
            <a href="#about">STUDIO</a>
            <a href="#work">WORK</a>
            <a href="#skills">WRITING</a>
            <a href="#contact">CONTACT</a>
            <a className="enterStudio" href="#contact">ENTER STUDIO</a>
          </div>
        </nav>
        <div className="lanyardStage" aria-label="Interactive lanyard">
          <Lanyard
            position={[0, 0, 20]}
            gravity={[0, -40, 0]}
            groupPosition={[-2, 4, 0]}
            frontImage={assetPath('lanyard-card-front.svg')}
            backImage={assetPath('lanyard-card-back.svg')}
            lanyardImage={assetPath('lanyard-band.png')}
            imageFit="cover"
            cardTint="#d6b46e"
            metalColor="#8f8370"
            lanyardWidth={1}
          />
        </div>
        <div className="heroSoftwareRail" ref={softwareRailRef} aria-label="Software skills">
          <div className="softwareMarquee">
            {[...marqueeSkills, ...marqueeSkills].map((skill, index) => (
              <span
                className={`softwarePill ${index >= marqueeSkills.length ? 'softwarePill--clone' : ''}`}
                key={`${skill}-${index}`}
                draggable="false"
                style={{
                  '--fall-delay': '0s',
                  '--fall-x': `${((index % 9) - 4) * 16}px`,
                  '--fall-rotate': `${((index % 7) - 3) * 8}deg`
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>
      <section className="about pageFrame" id="about">
        <div className="portraitPanel">
          <div className="portrait">
            <span>DESIGNER</span>
          </div>
          <div className="contactLines">
            <p><MapPin size={18} /> 贵州 / 中国</p>
            <p><AtSign size={18} /> yourname@email.com</p>
            <p><MessageCircle size={18} /> WeChat ID</p>
          </div>
        </div>

        <div className="aboutText">
          <p className="sectionKicker">Education & Practice</p>
          <h2>黔南民族师范学院<br />产品设计（本科）</h2>
          <p className="date">2024.09 - 2028.06</p>
          <p className="bio">
            本人为黔南民族师范学院产品设计专业本科在读学生，具备扎实的设计基础与良好的审美能力。熟练使用Photoshop、Illustrator、Rhino、CAD等设计软件，能够独立完成平面视觉设计、UI界面设计及三维建模工作。具有较强的学习能力和责任心，善于利用AI工具辅助设计，提高创意表达与工作效率。
          </p>

          <div className="experienceGrid">
            <article>
              <GraduationCap />
              <h3>主修课程</h3>
              <p>产品设计基础、视觉传达设计、UI界面设计、Photoshop、Illustrator、Rhino、CAD、Blender等。</p>
            </article>
            <article>
              <BriefcaseBusiness />
              <h3>专业学习与项目实践</h3>
              <p>系统学习产品设计相关理论与设计流程，参与品牌视觉、海报设计、UI设计、三维建模等课程项目，熟悉从创意构思、草图绘制到视觉呈现的完整设计流程。</p>
            </article>
          </div>

          <div className="metrics">
            <div><strong>4</strong><span>精选项目</span></div>
            <div><strong>8</strong><span>软件技能</span></div>
            <div><strong>2026</strong><span>Portfolio</span></div>
          </div>
        </div>
      </section>

      <section className="work pageFrame" id="work">
        <div className="sectionHeader">
          <p className="sectionKicker">Selected Work</p>
          <h2>精选项目</h2>
        </div>
        <div className="projectGrid">
          {projects.map((project) => (
            <article className={`projectCard ${project.tone}`} key={project.title}>
              <div className="projectVisual">
                <div className="visualMark">{project.type}</div>
              </div>
              <div className="projectCopy">
                <span>{project.year}</span>
                <h3>{project.title}</h3>
                <p>{project.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="skills pageFrame" id="skills">
        <div className="sectionHeader">
          <p className="sectionKicker">Capabilities</p>
          <h2>个人优势</h2>
        </div>
        <div className="strengthGrid">
          {strengths.map((item) => (
            <article className="strengthCard" key={item.title}>
              <Sparkles size={22} />
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
        <div className="softwareBar" aria-label="软件技能">
          {skills.map((skill) => <span key={skill}>{skill}</span>)}
        </div>
      </section>

      <section className="finale" id="contact">
        <div className="pageFrame finaleInner">
          <p className="sectionKicker">Contact</p>
          <h2>期待参与真实项目，持续打磨视觉表达与设计执行。</h2>
          <a className="bigContact" href="mailto:yourname@email.com">
            yourname@email.com
            <ArrowUpRight size={30} />
          </a>
        </div>
      </section>
    </main>
  );
}

export default App;

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
