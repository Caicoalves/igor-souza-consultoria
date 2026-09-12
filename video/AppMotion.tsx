import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {
  ArrowUpRight,
  BarChart3,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Dumbbell,
  Flame,
  Play,
  UtensilsCrossed,
} from 'lucide-react';

const colors = {
  ink: '#06171a',
  dark: '#031013',
  paper: '#f3f1eb',
  white: '#fffdfa',
  gold: '#d8bd7f',
  goldLight: '#f1dfb5',
  goldDark: '#927441',
  muted: '#6d7775',
  line: 'rgba(7, 30, 33, 0.12)',
};

const clamp = {
  extrapolateLeft: 'clamp' as const,
  extrapolateRight: 'clamp' as const,
};

const sceneOpacity = (frame: number, start: number, end: number, fade = 12) =>
  interpolate(frame, [start, start + fade, end - fade, end], [0, 1, 1, 0], clamp);

const rise = (frame: number, start: number) =>
  interpolate(frame, [start, start + 18], [34, 0], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });

const Logo = ({size = 120}: {size?: number}) => (
  <Img
    src={staticFile('assets/media/igor-logo-gold.png')}
    style={{width: size, height: size, objectFit: 'contain'}}
  />
);

const Caption = ({
  frame,
  start,
  end,
  children,
}: {
  frame: number;
  start: number;
  end: number;
  children: React.ReactNode;
}) => {
  const opacity = sceneOpacity(frame, start, end, 10);
  const y = rise(frame, start);

  return (
    <div
      style={{
        position: 'absolute',
        top: 104,
        left: 80,
        right: 80,
        textAlign: 'center',
        color: colors.white,
        opacity,
        transform: `translateY(${y}px)`,
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: 46,
        fontWeight: 500,
        lineHeight: 1.15,
        letterSpacing: '-1.8px',
      }}
    >
      {children}
    </div>
  );
};

const StatusBar = () => (
  <div style={{height: 58, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 33px', fontFamily: 'Arial, sans-serif', fontSize: 20, fontWeight: 700, color: colors.ink}}>
    <span>9:41</span>
    <span style={{fontSize: 15, letterSpacing: 3}}>● ●●</span>
  </div>
);

const AppHeader = ({label = 'CONSULTORIA'}: {label?: string}) => (
  <div style={{display: 'flex', alignItems: 'center', gap: 17, padding: '14px 38px 24px'}}>
    <div style={{width: 61, height: 61, borderRadius: 18, display: 'grid', placeItems: 'center', background: colors.ink}}>
      <Logo size={42} />
    </div>
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <small style={{fontFamily: 'Arial, sans-serif', fontSize: 13, letterSpacing: 3.2, color: colors.goldDark}}>{label}</small>
      <strong style={{fontFamily: 'Georgia, serif', fontSize: 30, fontWeight: 400, color: colors.ink}}>Ígor Souza</strong>
    </div>
    <div style={{marginLeft: 'auto', width: 52, height: 52, borderRadius: 18, background: '#e6e1d7', display: 'grid', placeItems: 'center', fontFamily: 'Arial, sans-serif', fontWeight: 700, color: colors.ink}}>MS</div>
  </div>
);

const BottomNav = ({active}: {active: 'inicio' | 'treinos' | 'dieta'}) => (
  <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 102, borderTop: `1px solid ${colors.line}`, background: 'rgba(255,253,250,.96)', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', alignItems: 'center', padding: '8px 36px 18px'}}>
    {[
      ['inicio', 'Início'],
      ['treinos', 'Treinos'],
      ['dieta', 'Dieta'],
    ].map(([id, label]) => {
      const selected = id === active;
      return (
        <div key={id} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, color: selected ? colors.ink : '#9ba2a0', fontFamily: 'Arial, sans-serif', fontSize: 15, fontWeight: selected ? 700 : 500}}>
          <i style={{display: 'block', width: selected ? 29 : 8, height: 8, borderRadius: 999, background: selected ? colors.gold : '#b9c0bd'}} />
          {label}
        </div>
      );
    })}
  </div>
);

const ScreenShell = ({children, active}: {children: React.ReactNode; active: 'inicio' | 'treinos' | 'dieta'}) => (
  <div style={{position: 'absolute', inset: 0, overflow: 'hidden', background: colors.paper}}>
    <StatusBar />
    <AppHeader />
    {children}
    <BottomNav active={active} />
  </div>
);

const Phone = ({children, frame}: {children: React.ReactNode; frame: number}) => {
  const {fps} = useVideoConfig();
  const enter = spring({fps, frame, config: {damping: 20, stiffness: 85, mass: 0.9}});
  const outro = interpolate(frame, [440, 478], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const scale = interpolate(enter, [0, 1], [0.79, 1]) * interpolate(outro, [0, 1], [1, 0.55]);
  const y = interpolate(enter, [0, 1], [190, 0]) + interpolate(outro, [0, 1], [0, -320]);
  const opacity = interpolate(frame, [0, 12, 522, 539], [0, 1, 1, 0], clamp);

  return (
    <div style={{position: 'absolute', left: '50%', top: 292, width: 724, height: 1432, opacity, transform: `translateX(-50%) translateY(${y}px) scale(${scale})`, transformOrigin: '50% 50%'}}>
      <div style={{position: 'absolute', inset: -32, borderRadius: 118, background: 'rgba(216,189,127,.16)', filter: 'blur(32px)'}} />
      <div style={{position: 'absolute', inset: 0, borderRadius: 96, padding: 18, background: 'linear-gradient(145deg,#bca675 0%,#f2e4c4 30%,#634f2e 66%,#c7ae75 100%)', boxShadow: '0 58px 110px rgba(0,0,0,.48), inset 0 1px 3px rgba(255,255,255,.8)'}}>
        <div style={{position: 'relative', width: '100%', height: '100%', borderRadius: 80, overflow: 'hidden', background: colors.paper}}>
          <div style={{position: 'absolute', zIndex: 20, left: '50%', top: 17, width: 214, height: 55, transform: 'translateX(-50%)', borderRadius: 999, background: '#020606'}} />
          {children}
        </div>
      </div>
    </div>
  );
};

const HomeScreen = ({frame}: {frame: number}) => {
  const cardProgress = interpolate(frame, [74, 130], [0.18, 0.72], clamp);
  return (
    <ScreenShell active="inicio">
      <div style={{padding: '20px 44px'}}>
        <small style={{fontFamily: 'Arial, sans-serif', color: colors.goldDark, letterSpacing: 3, fontSize: 16}}>SEU PLANO</small>
        <h2 style={{fontFamily: 'Georgia, serif', fontWeight: 400, color: colors.ink, fontSize: 60, lineHeight: 1.04, letterSpacing: -2, margin: '14px 0 12px'}}>Boa tarde,<br/><i style={{color: colors.goldDark}}>Mariana.</i></h2>
        <p style={{fontFamily: 'Arial, sans-serif', fontSize: 23, color: colors.muted, margin: 0}}>Seu treino está pronto para hoje.</p>

        <div style={{marginTop: 44, borderRadius: 38, padding: '32px 32px 28px', background: colors.ink, color: colors.white, boxShadow: '0 25px 54px rgba(7,31,34,.24)'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <span style={{display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'Arial, sans-serif', fontSize: 15, letterSpacing: 2, color: colors.goldLight}}><Dumbbell size={20}/> TREINO DE HOJE</span>
            <i style={{width: 54, height: 54, borderRadius: 18, display: 'grid', placeItems: 'center', background: colors.gold, color: colors.ink}}><Play size={19} fill="currentColor"/></i>
          </div>
          <h3 style={{fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: 49, margin: '34px 0 18px'}}>Inferiores A</h3>
          <div style={{display: 'flex', gap: 26, fontFamily: 'Arial, sans-serif', fontSize: 18, color: '#b8c3c0'}}><span style={{display: 'flex', gap: 7, alignItems: 'center'}}><Clock3 size={17}/> 46 min</span><span>6 exercícios</span></div>
          <div style={{height: 9, background: 'rgba(255,255,255,.12)', borderRadius: 999, marginTop: 34, overflow: 'hidden'}}><i style={{display: 'block', width: `${cardProgress * 100}%`, height: '100%', borderRadius: 999, background: `linear-gradient(90deg,${colors.goldDark},${colors.goldLight})`}}/></div>
          <small style={{display: 'block', marginTop: 13, fontFamily: 'Arial, sans-serif', color: '#94a09d', fontSize: 16}}>Pronta para começar</small>
        </div>

        <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 42, color: colors.ink, fontFamily: 'Arial, sans-serif'}}><strong style={{fontSize: 23}}>Seu ritmo</strong><span style={{color: colors.muted, fontSize: 18}}>Esta semana</span></div>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 12, marginTop: 23}}>
          {['S','T','Q','Q','S'].map((day, index) => <div key={`${day}${index}`} style={{height: 91, borderRadius: 24, border: `1px solid ${index === 3 ? colors.gold : colors.line}`, background: index === 3 ? '#eee3c8' : colors.white, display: 'grid', placeItems: 'center', fontFamily: 'Arial, sans-serif', fontSize: 18, color: colors.ink}}><span>{day}<b style={{display: 'block', marginTop: 8}}>{index < 3 ? <Check size={16}/> : index + 2}</b></span></div>)}
        </div>
      </div>
    </ScreenShell>
  );
};

const ExerciseRow = ({index, name, detail, frame}: {index: number; name: string; detail: string; frame: number}) => {
  const start = 165 + index * 12;
  const amount = spring({fps: 30, frame: frame - start, config: {damping: 22, stiffness: 130}});
  const complete = index === 0 && frame > 215;
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: 20, background: colors.white, border: `1px solid ${colors.line}`, borderRadius: 28, padding: '22px 22px', opacity: amount, transform: `translateX(${(1 - amount) * 65}px)`, boxShadow: '0 12px 30px rgba(7,31,34,.055)'}}>
      <div style={{width: 64, height: 64, flexShrink: 0, display: 'grid', placeItems: 'center', borderRadius: 21, background: complete ? colors.ink : '#e8dfcc', color: complete ? colors.goldLight : colors.ink}}>{complete ? <CheckCircle2 size={29}/> : <Dumbbell size={27}/>}</div>
      <div style={{minWidth: 0}}><strong style={{display: 'block', fontFamily: 'Arial, sans-serif', fontSize: 23, color: colors.ink}}>{name}</strong><small style={{display: 'block', marginTop: 7, fontFamily: 'Arial, sans-serif', fontSize: 17, color: colors.muted}}>{detail}</small></div>
      <ChevronRight size={22} color={colors.goldDark} style={{marginLeft: 'auto'}}/>
    </div>
  );
};

const WorkoutScreen = ({frame}: {frame: number}) => (
  <ScreenShell active="treinos">
    <div style={{padding: '16px 42px'}}>
      <small style={{fontFamily: 'Arial, sans-serif', color: colors.goldDark, letterSpacing: 3, fontSize: 16}}>TREINO DO DIA</small>
      <h2 style={{fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: 55, color: colors.ink, margin: '12px 0 9px'}}>Inferiores A</h2>
      <p style={{fontFamily: 'Arial, sans-serif', color: colors.muted, fontSize: 21, margin: 0}}>6 exercícios · aproximadamente 46 min</p>
      <div style={{height: 9, background: '#dedbd3', borderRadius: 999, margin: '28px 0 34px', overflow: 'hidden'}}><i style={{display: 'block', width: `${interpolate(frame,[154,238],[8,72],clamp)}%`, height: '100%', background: colors.gold, borderRadius: 999}}/></div>
      <div style={{display: 'grid', gap: 16}}>
        <ExerciseRow index={0} name="Agachamento livre" detail="4 séries · 10 repetições" frame={frame}/>
        <ExerciseRow index={1} name="Leg press" detail="4 séries · 12 repetições" frame={frame}/>
        <ExerciseRow index={2} name="Cadeira extensora" detail="3 séries · 12 repetições" frame={frame}/>
        <ExerciseRow index={3} name="Elevação pélvica" detail="4 séries · 10 repetições" frame={frame}/>
        <ExerciseRow index={4} name="Panturrilha" detail="3 séries · 15 repetições" frame={frame}/>
      </div>
      <div style={{marginTop: 28, padding: '23px 25px', borderRadius: 26, background: '#e6ddc8', display: 'flex', alignItems: 'center', gap: 17, color: colors.ink, fontFamily: 'Arial, sans-serif', opacity: spring({fps: 30, frame: frame - 215, config: {damping: 22, stiffness: 120}})}}><CheckCircle2 size={27}/><strong style={{fontSize: 20}}>Primeiro exercício concluído</strong></div>
    </div>
  </ScreenShell>
);

const MealRow = ({index, title, status, icon, frame}: {index: number; title: string; status: string; icon: React.ReactNode; frame: number}) => {
  const start = 268 + index * 14;
  const amount = spring({fps: 30, frame: frame - start, config: {damping: 20, stiffness: 120}});
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: 20, borderRadius: 28, padding: '23px', background: colors.white, border: `1px solid ${colors.line}`, opacity: amount, transform: `translateY(${(1 - amount) * 42}px)`}}>
      <span style={{width: 65, height: 65, borderRadius: 22, background: index === 0 ? colors.ink : '#e8dfcc', color: index === 0 ? colors.goldLight : colors.ink, display: 'grid', placeItems: 'center'}}>{icon}</span>
      <div><strong style={{display: 'block', fontFamily: 'Arial, sans-serif', fontSize: 23, color: colors.ink}}>{title}</strong><small style={{display: 'block', marginTop: 7, fontFamily: 'Arial, sans-serif', fontSize: 17, color: index === 1 ? colors.goldDark : colors.muted}}>{status}</small></div>
      <ChevronRight size={22} color={colors.goldDark} style={{marginLeft: 'auto'}}/>
    </div>
  );
};

const DietScreen = ({frame}: {frame: number}) => (
  <ScreenShell active="dieta">
    <div style={{padding: '17px 42px'}}>
      <small style={{fontFamily: 'Arial, sans-serif', color: colors.goldDark, letterSpacing: 3, fontSize: 16}}>SUA DIETA</small>
      <h2 style={{fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: 54, color: colors.ink, lineHeight: 1.08, margin: '12px 0 28px'}}>Plano alimentar,<br/><i style={{color: colors.goldDark}}>sempre à mão.</i></h2>
      <div style={{borderRadius: 34, padding: '28px', color: colors.white, background: colors.ink, boxShadow: '0 24px 48px rgba(7,31,34,.22)'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 18}}><span style={{width: 58, height: 58, borderRadius: 19, background: colors.gold, color: colors.ink, display: 'grid', placeItems: 'center'}}><UtensilsCrossed size={25}/></span><div><small style={{display: 'block', fontFamily: 'Arial, sans-serif', color: colors.goldLight, fontSize: 14, letterSpacing: 2}}>PLANO DO DIA</small><strong style={{display: 'block', marginTop: 6, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: 29}}>Dieta personalizada</strong></div></div>
        <div style={{height: 8, borderRadius: 999, background: 'rgba(255,255,255,.12)', marginTop: 28, overflow: 'hidden'}}><i style={{display: 'block', width: `${interpolate(frame,[257,340],[28,74],clamp)}%`, height: '100%', background: colors.gold, borderRadius: 999}}/></div>
        <small style={{display: 'block', marginTop: 12, fontFamily: 'Arial, sans-serif', color: '#aeb9b6', fontSize: 16}}>Próxima refeição: almoço</small>
      </div>
      <div style={{display: 'flex', justifyContent: 'space-between', margin: '34px 0 20px', fontFamily: 'Arial, sans-serif'}}><strong style={{fontSize: 23, color: colors.ink}}>Refeições de hoje</strong><span style={{fontSize: 18, color: colors.goldDark}}>Ver dieta</span></div>
      <div style={{display: 'grid', gap: 16}}>
        <MealRow index={0} title="Café da manhã" status="Concluído" icon={<CheckCircle2 size={28}/>} frame={frame}/>
        <MealRow index={1} title="Almoço" status="Próxima refeição" icon={<UtensilsCrossed size={27}/>} frame={frame}/>
        <MealRow index={2} title="Lanche da tarde" status="Mais tarde" icon={<UtensilsCrossed size={27}/>} frame={frame}/>
        <MealRow index={3} title="Jantar" status="Mais tarde" icon={<UtensilsCrossed size={27}/>} frame={frame}/>
      </div>
    </div>
  </ScreenShell>
);

const ProgressScreen = ({frame}: {frame: number}) => {
  const progress = interpolate(frame, [354, 430], [0.28, 0.84], clamp);
  return (
    <ScreenShell active="inicio">
      <div style={{padding: '18px 42px'}}>
        <small style={{fontFamily: 'Arial, sans-serif', color: colors.goldDark, letterSpacing: 3, fontSize: 16}}>ACOMPANHAMENTO</small>
        <h2 style={{fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: 54, color: colors.ink, lineHeight: 1.08, margin: '12px 0 12px'}}>Seu progresso,<br/><i style={{color: colors.goldDark}}>bem organizado.</i></h2>
        <p style={{fontFamily: 'Arial, sans-serif', fontSize: 21, color: colors.muted, lineHeight: 1.45, margin: 0}}>Registre a execução e acompanhe a evolução do seu plano.</p>

        <div style={{marginTop: 34, padding: '31px', borderRadius: 36, background: colors.ink, color: colors.white}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}><div><small style={{display: 'block', color: colors.goldLight, fontFamily: 'Arial, sans-serif', letterSpacing: 2, fontSize: 14}}>SEMANA ATUAL</small><strong style={{display: 'block', fontFamily: 'Georgia, serif', fontSize: 38, fontWeight: 400, marginTop: 8}}>4 de 5 treinos</strong></div><span style={{width: 72, height: 72, borderRadius: 24, background: colors.gold, color: colors.ink, display: 'grid', placeItems: 'center'}}><BarChart3 size={32}/></span></div>
          <div style={{height: 170, display: 'flex', alignItems: 'flex-end', gap: 18, marginTop: 28}}>{[.42,.66,.52,.88,.74,.96].map((height,index)=><i key={index} style={{display: 'block', flex: 1, height: `${height * progress * 100}%`, minHeight: 16, borderRadius: '12px 12px 5px 5px', background: index === 5 ? colors.goldLight : 'rgba(216,189,127,.42)'}}/>)}</div>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 20}}>
          <div style={{padding: '25px', borderRadius: 29, background: colors.white, border: `1px solid ${colors.line}`}}><Flame size={27} color={colors.goldDark}/><strong style={{display: 'block', marginTop: 22, color: colors.ink, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: 32}}>Treino</strong><small style={{display: 'block', marginTop: 8, color: colors.muted, fontFamily: 'Arial, sans-serif', fontSize: 16}}>Execução registrada</small></div>
          <div style={{padding: '25px', borderRadius: 29, background: colors.white, border: `1px solid ${colors.line}`}}><UtensilsCrossed size={27} color={colors.goldDark}/><strong style={{display: 'block', marginTop: 22, color: colors.ink, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: 32}}>Dieta</strong><small style={{display: 'block', marginTop: 8, color: colors.muted, fontFamily: 'Arial, sans-serif', fontSize: 16}}>Plano disponível</small></div>
        </div>

        <div style={{marginTop: 20, padding: '25px', borderRadius: 29, display: 'flex', alignItems: 'center', gap: 18, background: '#e7deca', color: colors.ink}}><span style={{width: 56, height: 56, borderRadius: 19, background: colors.ink, color: colors.goldLight, display: 'grid', placeItems: 'center'}}><Check size={28}/></span><div style={{fontFamily: 'Arial, sans-serif'}}><strong style={{display: 'block', fontSize: 21}}>Progresso registrado</strong><small style={{display: 'block', fontSize: 16, color: colors.muted, marginTop: 5}}>Informações organizadas no aplicativo</small></div></div>
      </div>
    </ScreenShell>
  );
};

const Intro = ({frame}: {frame: number}) => {
  const {fps} = useVideoConfig();
  const reveal = spring({fps, frame, config: {damping: 20, stiffness: 80}});
  const opacity = sceneOpacity(frame, 0, 61, 13);
  return (
    <div style={{position: 'absolute', inset: 0, zIndex: 30, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingBottom: 160, opacity, color: colors.white, textAlign: 'center', background: 'radial-gradient(circle at 50% 48%, rgba(3,16,19,.48), rgba(3,16,19,.76) 66%)'}}>
      <div style={{width: 186, height: 186, borderRadius: 58, background: 'rgba(3,16,19,.82)', border: '1px solid rgba(216,189,127,.38)', display: 'grid', placeItems: 'center', boxShadow: '0 28px 90px rgba(0,0,0,.42)', transform: `scale(${interpolate(reveal,[0,1],[.72,1])})`}}><Logo size={132}/></div>
      <h1 style={{fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: 68, lineHeight: 1.08, letterSpacing: -2, margin: '46px 0 0'}}>Seu plano<br/><i style={{color: colors.gold}}>sempre com você.</i></h1>
    </div>
  );
};

const Outro = ({frame}: {frame: number}) => {
  const opacity = sceneOpacity(frame, 462, 540, 13);
  const y = rise(frame, 462);
  return (
    <div style={{position: 'absolute', zIndex: 40, left: 70, right: 70, bottom: 115, textAlign: 'center', color: colors.white, opacity, transform: `translateY(${y}px)`}}>
      <div style={{display: 'flex', justifyContent: 'center', marginBottom: 21}}><Logo size={82}/></div>
      <h2 style={{fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: 54, lineHeight: 1.08, letterSpacing: -1.8, margin: 0}}>Todos os alunos recebem<br/><i style={{color: colors.gold}}>acesso ao aplicativo.</i></h2>
      <p style={{fontFamily: 'Arial, sans-serif', fontSize: 24, color: '#c5cecb', margin: '25px 0 30px'}}>Seu plano organizado para você executar.</p>
      <div style={{margin: '0 auto', width: 520, height: 88, borderRadius: 28, background: `linear-gradient(90deg,${colors.gold},${colors.goldLight})`, color: colors.ink, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 18px 0 31px', fontFamily: 'Arial, sans-serif', fontSize: 23, fontWeight: 700}}>Preencha sua aplicação <i style={{width: 57, height: 57, borderRadius: 19, background: colors.white, display: 'grid', placeItems: 'center'}}><ArrowUpRight size={26}/></i></div>
    </div>
  );
};

export const AppMotion = () => {
  const frame = useCurrentFrame();
  const shimmer = interpolate(frame, [0, 539], [-340, 1240], clamp);
  const homeOpacity = sceneOpacity(frame, 43, 157, 13);
  const workoutOpacity = sceneOpacity(frame, 140, 262, 13);
  const dietOpacity = sceneOpacity(frame, 245, 362, 13);
  const progressOpacity = sceneOpacity(frame, 345, 540, 13);

  return (
    <AbsoluteFill style={{background: colors.dark, overflow: 'hidden'}}>
      <AbsoluteFill style={{backgroundImage: 'radial-gradient(circle at 50% 45%, rgba(96,118,91,.26), transparent 42%), radial-gradient(circle at 8% 78%, rgba(216,189,127,.11), transparent 30%), linear-gradient(180deg,#06181b 0%,#020b0d 100%)'}}/>
      <div style={{position: 'absolute', inset: 28, border: '1px solid rgba(216,189,127,.16)', borderRadius: 58}}/>
      <div style={{position: 'absolute', top: 0, bottom: 0, left: shimmer, width: 160, transform: 'skewX(-12deg)', background: 'linear-gradient(90deg,transparent,rgba(238,217,169,.055),transparent)', filter: 'blur(14px)'}}/>
      {[118, 540, 960].map((left,index)=><div key={left} style={{position: 'absolute', left, top: 0, bottom: 0, width: 1, background: `linear-gradient(180deg,transparent,rgba(216,189,127,${.05 + index*.015}),transparent)`}}/>)}

      <Caption frame={frame} start={47} end={154}>Abra o aplicativo e veja<br/><i style={{fontFamily: 'Georgia, serif', color: colors.gold, fontWeight: 400}}>o treino do dia.</i></Caption>
      <Caption frame={frame} start={145} end={259}>Saiba exatamente o que<br/><i style={{fontFamily: 'Georgia, serif', color: colors.gold, fontWeight: 400}}>fazer na academia.</i></Caption>
      <Caption frame={frame} start={250} end={359}>Consulte sua dieta<br/><i style={{fontFamily: 'Georgia, serif', color: colors.gold, fontWeight: 400}}>durante toda a rotina.</i></Caption>
      <Caption frame={frame} start={350} end={452}>Treino, dieta e acompanhamento<br/><i style={{fontFamily: 'Georgia, serif', color: colors.gold, fontWeight: 400}}>em um só lugar.</i></Caption>

      <Phone frame={frame}>
        <div style={{position: 'absolute', inset: 0, opacity: homeOpacity}}><HomeScreen frame={frame}/></div>
        <div style={{position: 'absolute', inset: 0, opacity: workoutOpacity}}><WorkoutScreen frame={frame}/></div>
        <div style={{position: 'absolute', inset: 0, opacity: dietOpacity}}><DietScreen frame={frame}/></div>
        <div style={{position: 'absolute', inset: 0, opacity: progressOpacity}}><ProgressScreen frame={frame}/></div>
      </Phone>

      <Intro frame={frame}/>
      <Outro frame={frame}/>
    </AbsoluteFill>
  );
};
