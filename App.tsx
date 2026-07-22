import { useState, useRef, useEffect } from 'react'

type Screen = 'launch' | 'capture' | 'today' | 'town' | 'goal' | 'reflect'

const C = {
  paper: '#F5F0E8',
  linen: '#EAE3D8',
  stone: '#C4BAB0',
  clay: '#9E8C80',
  charcoal: '#2A2520',
  ink: '#181410',
  moss: '#5C7A58',
  mossLight: '#CFDACC',
  sky: '#A8BEC8',
  warmWhite: '#FDFAF5',
  muted: '#8B7E74',
  border: '#DDD6C8',
  surface: '#F9F4EC',
  parchment: '#EFE9DC',
}

// Shared label style — tiny, airy, barely there
const label = (extra?: object) => ({
  fontSize: 10,
  fontWeight: 500,
  color: C.stone,
  letterSpacing: '0.12em',
  textTransform: 'uppercase' as const,
  margin: 0,
  ...extra,
})

// ─── Phone Frame ──────────────────────────────────────────────────────────────

function PhoneFrame({ children, screen, onNav }: {
  children: React.ReactNode
  screen: Screen
  onNav: (s: Screen) => void
}) {
  const navItems = [
    { id: 'today' as Screen, label: 'Today', icon: <SunIcon /> },
    { id: 'capture' as Screen, label: 'Capture', icon: <PlusIcon /> },
    { id: 'town' as Screen, label: 'Town', icon: <TownIcon /> },
    { id: 'reflect' as Screen, label: 'Reflect', icon: <MoonIcon /> },
  ]
  const hideNav = screen === 'launch'
  // Status bar tint: dark on Town/night, else charcoal
  const darkStatus = screen === 'town'

  return (
    <div style={{
      width: 390,
      height: 844,
      background: C.paper,
      borderRadius: 46,
      overflow: 'hidden',
      boxShadow: '0 48px 128px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.07)',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: "'DM Sans', system-ui, sans-serif",
    }}>
      {/* Status bar */}
      <div style={{
        height: 44,
        paddingLeft: 30,
        paddingRight: 28,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
        position: 'relative',
        zIndex: 20,
        color: darkStatus ? C.warmWhite : C.charcoal,
        transition: 'color 0.4s ease',
      }}>
        <span style={{
          fontSize: 15,
          fontWeight: 600,
          color: darkStatus ? C.warmWhite : C.charcoal,
          letterSpacing: '-0.02em',
        }}>9:41</span>
        <div style={{ display: 'flex', gap: 7, alignItems: 'center', opacity: 0.7 }}>
          <SignalIcon />
          <WifiIcon />
          <BatteryIcon />
        </div>
      </div>

      <div key={screen} style={{ flex: 1, overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column', animation: 'aFadeUp 0.54s cubic-bezier(0.22, 1, 0.36, 1) both' }}>
        {children}
      </div>

      {!hideNav && (
        <div style={{
          height: 78,
          paddingBottom: 18,
          paddingTop: 12,
          background: C.warmWhite,
          borderTop: `1px solid ${C.border}`,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-around',
          flexShrink: 0,
        }}>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => onNav(item.id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 5,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '2px 18px',
                transition: 'opacity 0.25s ease',
                opacity: screen === item.id ? 1 : 0.35,
              }}
            >
              <div style={{
                color: screen === item.id ? C.moss : C.charcoal,
                transition: 'color 0.28s ease, transform 0.44s cubic-bezier(0.22, 1, 0.36, 1)',
                transform: screen === item.id ? 'scale(1.14) translateY(-1px)' : 'scale(1)',
              }}>
                {item.icon}
              </div>
              <span style={{
                fontSize: 10,
                fontWeight: screen === item.id ? 500 : 400,
                color: screen === item.id ? C.charcoal : C.clay,
                letterSpacing: '0.02em',
              }}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Screen 1: First Launch ───────────────────────────────────────────────────

function LaunchScreen({ onComplete }: { onComplete: () => void }) {
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 500)
    return () => clearTimeout(t)
  }, [])

  return (
    <div style={{
      flex: 1,
      background: C.paper,
      display: 'flex',
      flexDirection: 'column',
      padding: '52px 36px 44px',
      overflow: 'hidden',
    }}>
      {/* Avora mark */}
      <div style={{ marginBottom: 68, animation: 'aFade 0.9s ease both' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke={C.moss} strokeWidth="1.4" opacity={0.7} />
        </svg>
      </div>

      {/* Heading fills the upper space */}
      <div style={{ flex: 1 }}>
        <p style={{
          fontFamily: "'Lora', Georgia, serif",
          fontSize: 13,
          fontStyle: 'italic',
          color: C.clay,
          letterSpacing: '0.01em',
          margin: '0 0 18px',
          fontWeight: 400,
          animation: 'aFadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.18s both',
        }}>
          Good morning.
        </p>

        <h1 style={{
          fontFamily: "'Lora', Georgia, serif",
          fontSize: 42,
          fontWeight: 400,
          color: C.charcoal,
          lineHeight: 1.18,
          margin: 0,
          letterSpacing: '-0.025em',
          animation: 'aFadeUp 0.75s cubic-bezier(0.22, 1, 0.36, 1) 0.33s both',
        }}>
          Tell me what's<br />on your mind.
        </h1>
      </div>

      {/* Bare input — feels like a page, not a form */}
      <div style={{ marginBottom: 24, animation: 'aFadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.5s both' }}>
        <textarea
          ref={inputRef}
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Anything at all…"
          rows={4}
          style={{
            width: '100%',
            background: 'transparent',
            border: 'none',
            borderBottom: `1px solid ${value ? C.charcoal : C.border}`,
            outline: 'none',
            resize: 'none',
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: 18,
            fontWeight: 300,
            color: C.charcoal,
            lineHeight: 1.65,
            padding: '0 0 14px',
            transition: 'border-color 0.35s ease',
          }}
        />
      </div>

      <button
        onClick={onComplete}
        disabled={!value.trim()}
        style={{
          background: value.trim() ? C.charcoal : C.linen,
          color: value.trim() ? C.warmWhite : C.stone,
          border: 'none',
          borderRadius: 14,
          padding: '17px 24px',
          fontFamily: "'DM Sans', system-ui, sans-serif",
          fontSize: 15,
          fontWeight: 500,
          letterSpacing: '0.015em',
          cursor: value.trim() ? 'pointer' : 'default',
          transition: 'all 0.35s ease',
          width: '100%',
        }}
      >
        Begin
      </button>

    </div>
  )
}

// ─── Screen 2: Universal Capture ─────────────────────────────────────────────

function CaptureScreen() {
  const [value, setValue] = useState('')
  const [mode, setMode] = useState<'text' | 'voice'>('text')
  const [recording, setRecording] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (mode === 'text') textareaRef.current?.focus()
  }, [mode])

  const handleSubmit = () => {
    if (!value.trim()) return
    setSubmitted(true)
    setTimeout(() => { setSubmitted(false); setValue('') }, 2000)
  }

  return (
    <div style={{
      flex: 1,
      background: C.paper,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>


      {/* Input area */}
      <div key={mode} style={{ flex: 1, padding: '40px 36px 0', position: 'relative', display: 'flex', flexDirection: 'column', animation: 'aFadeUp 0.42s cubic-bezier(0.22, 1, 0.36, 1) both' }}>
        {mode === 'text' ? (
          <>
            <textarea
              ref={textareaRef}
              value={value}
              onChange={e => setValue(e.target.value)}
              placeholder="Anything at all…"
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                resize: 'none',
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: 17,
                fontWeight: 300,
                color: C.charcoal,
                lineHeight: 1.7,
                padding: 0,
                maxHeight: 320,
              }}
              onKeyDown={e => {
                if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleSubmit()
              }}
            />

          </>
        ) : (
          /* Voice mode — full open canvas */
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 28,
            paddingBottom: 40,
          }}>
            <button
              onClick={() => setRecording(r => !r)}
              style={{
                width: 88,
                height: 88,
                borderRadius: '50%',
                background: recording ? '#B84040' : C.charcoal,
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.4s ease',
                animation: recording ? 'aPulse 2.6s ease-in-out infinite' : 'none',
                boxShadow: recording ? 'none' : '0 6px 24px rgba(42,37,32,0.18)',
              }}
            >
              <MicIcon color={C.warmWhite} />
            </button>
            <p style={{
              fontSize: 15,
              color: recording ? '#B84040' : C.clay,
              fontStyle: 'italic',
              fontFamily: "'Lora', Georgia, serif",
              transition: 'color 0.3s',
              margin: 0,
            }}>
              {recording ? 'Listening…' : 'Tap to speak'}
            </p>
          </div>
        )}
      </div>

      {/* Bottom actions */}
      <div style={{ padding: '20px 36px 28px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {submitted ? (
          <div style={{
            padding: '18px 0',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            animation: 'aFadeUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) both',
          }}>
            <div style={{
              width: 20,
              height: 20,
              borderRadius: '50%',
              background: C.moss,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                <path d="M1 3.5L3.3 6L8 1" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span style={{
              fontSize: 16,
              color: C.moss,
              fontFamily: "'Lora', Georgia, serif",
              fontStyle: 'italic',
            }}>
              Avora has it.
            </span>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            {mode === 'text' && (
              <button
                onClick={handleSubmit}
                disabled={!value.trim()}
                style={{
                  flex: 1,
                  background: value.trim() ? C.charcoal : C.linen,
                  color: value.trim() ? C.warmWhite : C.stone,
                  border: 'none',
                  borderRadius: 14,
                  padding: '17px',
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: 15,
                  fontWeight: 500,
                  cursor: value.trim() ? 'pointer' : 'default',
                  transition: 'all 0.3s ease',
                }}
              >
                Save
              </button>
            )}
            {/* Mode switch — small, discreet */}
            <button
              onClick={() => { setMode(m => m === 'text' ? 'voice' : 'text'); setRecording(false) }}
              style={{
                width: 50,
                height: 50,
                borderRadius: '50%',
                background: C.linen,
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'background 0.2s',
              }}
              title={mode === 'text' ? 'Switch to voice' : 'Switch to text'}
            >
              {mode === 'text' ? <MicIcon color={C.clay} /> : <TextIcon color={C.clay} />}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Screen 3: Today ──────────────────────────────────────────────────────────

function TodayScreen({ onGoalTap }: { onGoalTap: () => void }) {
  const date = new Date()
  const dayName = date.toLocaleDateString('en-GB', { weekday: 'long' })
  const dateStr = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })

  const priorities = [
    { id: 1, text: 'Review quarterly goals with Sarah' },
    { id: 2, text: 'Write first draft of project proposal' },
    { id: 3, text: 'Call mum — she mentioned the garden' },
  ]
  const commitments = [
    { time: '2:00', label: 'Design review', note: 'Studio B' },
    { time: '5:30', label: 'Evening run', note: 'Riverside, 5km' },
  ]

  const [checked, setChecked] = useState<number[]>([1])
  const [goalPressed, setGoalPressed] = useState(false)

  return (
    <div className="no-scrollbar" style={{ flex: 1, overflowY: 'auto', background: C.paper }}>

      {/* Editorial header */}
      <div style={{ padding: '22px 36px 0' }}>
        <p style={{
          fontFamily: "'Lora', Georgia, serif",
          fontSize: 13,
          fontStyle: 'italic',
          color: C.clay,
          margin: '0 0 6px',
          letterSpacing: '0.01em',
        }}>
          {dayName}
        </p>
        <h2 style={{
          fontFamily: "'Lora', Georgia, serif",
          fontSize: 34,
          fontWeight: 400,
          color: C.charcoal,
          margin: '0 0 28px',
          letterSpacing: '-0.025em',
          lineHeight: 1.1,
        }}>
          {dateStr}
        </h2>

        {/* AI insight — no box, just a serif quote */}
        <p style={{
          fontFamily: "'Lora', Georgia, serif",
          fontSize: 15,
          fontStyle: 'italic',
          color: C.moss,
          lineHeight: 1.65,
          margin: '0 0 36px',
          paddingLeft: 18,
          borderLeft: `2px solid ${C.mossLight}`,
          fontWeight: 400,
        }}>
          "You've been building momentum this week. The proposal matters more than the perfect draft."
        </p>
      </div>

      {/* Priorities — no header label */}
      <div style={{ padding: '0 36px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {priorities.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setChecked(prev =>
                prev.includes(p.id) ? prev.filter(x => x !== p.id) : [...prev, p.id]
              )}
              style={{
                background: 'transparent',
                border: 'none',
                padding: '13px 0',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 14,
                cursor: 'pointer',
                textAlign: 'left',
                borderBottom: `1px solid ${C.border}`,
                animation: `aFadeUp 0.58s cubic-bezier(0.22, 1, 0.36, 1) ${0.06 + i * 0.09}s both`,
              }}
            >
              <div style={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                border: `1.5px solid ${checked.includes(p.id) ? C.moss : C.stone}`,
                background: checked.includes(p.id) ? C.moss : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: 2,
                transition: 'all 0.25s ease',
              }}>
                {checked.includes(p.id) && (
                  <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                    <path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
                      strokeDasharray="11" strokeDashoffset="0"
                      style={{ animation: 'aCheckIn 0.32s cubic-bezier(0.22, 1, 0.36, 1) both' }} />
                  </svg>
                )}
              </div>
              <span style={{
                fontSize: 16,
                color: checked.includes(p.id) ? C.stone : C.charcoal,
                fontWeight: 300,
                lineHeight: 1.5,
                textDecoration: checked.includes(p.id) ? 'line-through' : 'none',
                transition: 'all 0.25s ease',
              }}>
                {p.text}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Goal — dark card, no section label */}
      <div style={{ padding: '36px 36px 0' }}>
        <button
          onClick={onGoalTap}
          onPointerDown={() => setGoalPressed(true)}
          onPointerUp={() => setGoalPressed(false)}
          onPointerLeave={() => setGoalPressed(false)}
          style={{
            width: '100%',
            background: C.charcoal,
            border: 'none',
            borderRadius: 18,
            padding: '22px',
            cursor: 'pointer',
            textAlign: 'left',
            transform: goalPressed ? 'scale(0.982)' : 'scale(1)',
            transition: 'transform 0.22s cubic-bezier(0.22, 1, 0.36, 1)',
            animation: 'aFadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.26s both',
          }}
        >
          <p style={label({ color: C.stone, marginBottom: 8 })}>Writing</p>
          <p style={{
            fontFamily: "'Lora', Georgia, serif",
            fontSize: 19,
            fontWeight: 400,
            color: C.warmWhite,
            margin: '0 0 20px',
            lineHeight: 1.3,
            letterSpacing: '-0.01em',
          }}>
            Finish the novel draft
          </p>
          <div style={{
            height: 2,
            background: 'rgba(255,255,255,0.1)',
            borderRadius: 1,
            overflow: 'hidden',
            marginBottom: 10,
          }}>
            <div style={{ height: '100%', width: '34%', background: C.sky, borderRadius: 1 }} />
          </div>
          <p style={{ fontSize: 12, color: C.stone, margin: 0, fontWeight: 300 }}>14 weeks remaining</p>
        </button>
      </div>

      {/* Commitments — no header label, just time + label */}
      <div style={{ padding: '32px 36px 36px' }}>
        {commitments.map((c, i) => (
          <div key={i} style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 16,
            paddingBottom: i < commitments.length - 1 ? 18 : 0,
            borderBottom: i < commitments.length - 1 ? `1px solid ${C.border}` : 'none',
            marginBottom: i < commitments.length - 1 ? 18 : 0,
          }}>
            <span style={{
              fontSize: 12,
              color: C.clay,
              fontWeight: 400,
              minWidth: 38,
              letterSpacing: '-0.01em',
              flexShrink: 0,
            }}>
              {c.time}
            </span>
            <div>
              <p style={{ fontSize: 15, color: C.charcoal, margin: 0, fontWeight: 400 }}>{c.label}</p>
              <p style={{ fontSize: 13, color: C.stone, margin: '1px 0 0', fontWeight: 300 }}>{c.note}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Screen 4: The Town ─────────────────────────────────────────────────────

function TownScreen() {
  const now = new Date()
  const hr  = now.getHours() + now.getMinutes() / 60
  const mo  = now.getMonth()

  type Time = 'dawn'|'morning'|'afternoon'|'sunset'|'bluehour'|'night'
  const TIMES: Time[] = ['dawn','morning','afternoon','sunset','bluehour','night']
  const autoT: Time = hr<5?'night':hr<7?'dawn':hr<11?'morning':hr<17?'afternoon':hr<19?'sunset':hr<21?'bluehour':'night'
  const season = mo<3?'winter':mo<6?'spring':mo<9?'summer':'autumn'

  type Wx = 'clear'|'rain'|'fog'|'snow'
  const [tIdx,  setTIdx]  = useState(()=>TIMES.indexOf(autoT))
  const [wx,    setWx]    = useState<Wx>('clear')
  const [blend, setBlend] = useState(false)
  const [,      setPtr]   = useState({x:195,y:361})

  const t   = TIMES[tIdx]
  const isN = t==='night'||t==='bluehour'
  const isD = isN||t==='sunset'||t==='dawn'

  // ── ISO ENGINE ──────────────────────────────────────────────────────────────
  const CX=195, CY=268, TW=42, TH=21, TZ=30
  const iso=(x:number,y:number,z=0)=>({x:CX+(x-y)*TW, y:CY+(x+y)*TH-z*TZ})
  const vp=(sc:{x:number;y:number})=>`${sc.x.toFixed(1)},${sc.y.toFixed(1)}`
  const face=(...wps:number[][])=>wps.map((w,i)=>`${i===0?'M':'L'}${vp(iso(w[0],w[1],w[2]??0))}`).join(' ')+' Z'
  const blk=(x:number,y:number,z:number,w:number,d:number,h:number)=>({
    L:face([x,y,z+h],[x,y+d,z+h],[x,y+d,z],[x,y,z]),
    F:face([x,y,z+h],[x+w,y,z+h],[x+w,y,z],[x,y,z]),
    T:face([x,y,z+h],[x+w,y,z+h],[x+w,y+d,z+h],[x,y+d,z+h]),
  })
  const rfx=(x:number,y:number,z:number,w:number,d:number,bh:number,rh:number)=>{
    const zb=z+bh,zt=z+bh+rh,ym=y+d/2
    return {F:face([x,y,zb],[x+w,y,zb],[x+w,ym,zt],[x,ym,zt]), L:face([x,y,zb],[x,y+d,zb],[x,ym,zt])}
  }
  const fw=(bx:number,wy:number,wz:number,ww:number,wh:number)=>face([bx,wy,wz+wh],[bx+ww,wy,wz+wh],[bx+ww,wy,wz],[bx,wy,wz])
  const lw=(bx:number,by:number,wz:number,wd:number,wh:number)=>face([bx,by,wz+wh],[bx,by+wd,wz+wh],[bx,by+wd,wz],[bx,by,wz])
  const fLines=(x:number,y:number,bh:number,w:number,step=0.54)=>{
    const r:string[]=[]
    for(let z=step;z<bh-0.08;z+=step) r.push(face([x,y,z+0.04],[x+w,y,z+0.04],[x+w,y,z],[x,y,z]))
    return r
  }
  const lLines=(x:number,y:number,bh:number,d:number,step=0.54)=>{
    const r:string[]=[]
    for(let z=step;z<bh-0.08;z+=step) r.push(face([x,y,z+0.04],[x,y+d,z+0.04],[x,y+d,z],[x,y,z]))
    return r
  }

  // ── PALETTE ─────────────────────────────────────────────────────────────────
  type Pal = {
    skyT:string;skyM:string;skyH:string
    gA:string;gB:string;gC:string
    wT:string;wF:string;wL:string
    rF:string;rL:string;rT:string
    win:string;wgl:string;sh:string
    tH:string;tM:string;tD:string;tr:string
    wt:string;ws:string;lp:string
    rd:string;pa:string
    sun:{x:number;y:number};cel:string
    tnt:string;txt:string;glow:boolean;hz:string
  }

  const P:Record<Time,Pal>={
    dawn:{
      skyT:'#0D0918',skyM:'#7A2210',skyH:'#E8883A',
      gA:'#9A5C26',gB:'#B06C30',gC:'#844A16',
      wT:'#D6A860',wF:'#8A5228',wL:'#3C1A08',
      rF:'#7A2808',rL:'#4C1604',rT:'#8C2E10',
      win:'rgba(255,200,90,0.76)',wgl:'#FFC048',sh:'#5E1E08',
      tH:'#403E14',tM:'#282A0A',tD:'#161806',tr:'#502608',
      wt:'#884A1A',ws:'#C86016',lp:'#263610',
      rd:'#9A6422',pa:'#AA7230',
      sun:{x:56,y:208},cel:'#F09028',
      tnt:'rgba(155,52,8,0.15)',txt:'rgba(250,234,208,0.96)',glow:true,hz:'#E8883A',
    },
    morning:{
      skyT:'#163666',skyM:'#2E6088',skyH:'#82AECA',
      gA:'#74A048',gB:'#80A452',gC:'#64883A',
      wT:'#E6D28E',wF:'#A8885A',wL:'#483214',
      rF:'#9A3816',rL:'#60200C',rT:'#B2421E',
      win:'rgba(216,204,168,0.50)',wgl:'rgba(255,216,132,0.60)',sh:'#725024',
      tH:'#628232',tM:'#4A6226',tD:'#2E3E16',tr:'#664816',
      wt:'#5A8C9C',ws:'#86ACBE',lp:'#224C22',
      rd:'#BCA262',pa:'#C6AA6A',
      sun:{x:298,y:140},cel:'#FFFCE0',
      tnt:'rgba(252,246,220,0.02)',txt:'rgba(20,13,6,0.92)',glow:false,hz:'#82AECA',
    },
    afternoon:{
      skyT:'#113660',skyM:'#265A86',skyH:'#6C90A6',
      gA:'#769A4A',gB:'#80A250',gC:'#648A3A',
      wT:'#EACDA8',wF:'#AE8C58',wL:'#503814',
      rF:'#A03A18',rL:'#66220E',rT:'#B84222',
      win:'rgba(213,203,174,0.42)',wgl:'rgba(255,212,128,0.28)',sh:'#765028',
      tH:'#648032',tM:'#486022',tD:'#2C3C14',tr:'#604616',
      wt:'#4C7C8C',ws:'#6A9AAC',lp:'#1C4A20',
      rd:'#BEA262',pa:'#CAAC6E',
      sun:{x:288,y:105},cel:'#FFFCE0',
      tnt:'rgba(252,250,226,0.02)',txt:'rgba(20,13,6,0.92)',glow:false,hz:'#6C90A6',
    },
    sunset:{
      skyT:'#080414',skyM:'#4E1A0C',skyH:'#C85C14',
      gA:'#885418',gB:'#965E1E',gC:'#72420E',
      wT:'#C28838',wF:'#763C14',wL:'#340C04',
      rF:'#3C1204',rL:'#260A02',rT:'#4C1806',
      win:'rgba(255,186,72,0.84)',wgl:'#FF9A12',sh:'#3C1204',
      tH:'#262608',tM:'#161606',tD:'#0A0A02',tr:'#4A1C06',
      wt:'#6A3212',ws:'#BA4A0E',lp:'#181A06',
      rd:'#846018',pa:'#946828',
      sun:{x:70,y:216},cel:'#FF8818',
      tnt:'rgba(162,46,6,0.20)',txt:'rgba(252,230,203,0.96)',glow:true,hz:'#C85C14',
    },
    bluehour:{
      skyT:'#020206',skyM:'#0C1024',skyH:'#1A264E',
      gA:'#0E1012',gB:'#121416',gC:'#0A0C0E',
      wT:'#222636',wF:'#141828',wL:'#0A0C16',
      rF:'#0C0A0E',rL:'#06060A',rT:'#100E16',
      win:'rgba(255,170,52,0.99)',wgl:'#FF9C16',sh:'#0A080C',
      tH:'#080A06',tM:'#060704',tD:'#030402',tr:'#120A06',
      wt:'#0C1428',ws:'#1A2A58',lp:'#050706',
      rd:'#121420',pa:'#141620',
      sun:{x:24,y:240},cel:'#3A5AA2',
      tnt:'rgba(10,18,54,0.24)',txt:'rgba(198,207,228,0.96)',glow:true,hz:'#1A264E',
    },
    night:{
      skyT:'#010102',skyM:'#020304',skyH:'#030508',
      gA:'#050704',gB:'#060806',gC:'#040504',
      wT:'#0E1006',wF:'#080A06',wL:'#060804',
      rF:'#070804',rL:'#050604',rT:'#080906',
      win:'rgba(255,168,44,0.99)',wgl:'#FFAC16',sh:'#060706',
      tH:'#040604',tM:'#030404',tD:'#020303',tr:'#080702',
      wt:'#04060A',ws:'#0C142C',lp:'#030404',
      rd:'#070906',pa:'#080A06',
      sun:{x:288,y:85},cel:'#D0C4AC',
      tnt:'rgba(6,16,44,0.12)',txt:'rgba(210,202,188,0.96)',glow:true,hz:'#030508',
    },
  }

  const p = P[t]
  const lH=season==='autumn'?'#C25A1C':season==='spring'?'#8ACA38':season==='winter'?'#425826':p.tH
  const lM=season==='autumn'?'#8A3E12':season==='spring'?'#62A01A':season==='winter'?'#2A3C16':p.tM

  // ── PER-BUILDING MATERIALS ───────────────────────────────────────────────────
  // Each building has its own material character; time-of-day is handled by
  // the atmosphere overlay rather than baking it into wall colours.
  const mStone = { F:p.wF,  L:p.wL,  T:p.wT  }
  const mHoney = {
    F: isN?'#5A3C1A':'#C49A62',
    L: isN?'#2E1E0A':'#785432',
    T: isN?'#745028':'#E0B878',
  }
  const mPlstr = {
    F: isN?'#7C7668':'#D0C29C',
    L: isN?'#484238':'#807262',
    T: isN?'#9C9680':'#EAD8B2',
  }
  const mBrick = {
    F: isN?'#3C2214':'#8C5634',
    L: isN?'#1E0E08':'#4E2818',
    T: isN?'#4A2C1C':'#AC7450',
  }
  const mTimb = {
    F: isN?'#3A2414':'#6E4A2A',
    L: isN?'#1C1008':'#3C2410',
    T: isN?'#4A3020':'#8E6444',
  }
  const mGlass = {
    F: isN?'rgba(30,50,80,0.62)':'rgba(140,185,210,0.54)',
    L: isN?'rgba(20,38,64,0.70)':'rgba(90,140,165,0.66)',
    T: isN?'rgba(40,65,100,0.58)':'rgba(185,220,238,0.62)',
  }

  const rfTerra  = { F:isN?'#3C1408':'#9C3C1A', L:isN?'#260A04':'#5C2208', T:isN?'#4C1A0E':'#B8481E' }
  const rfSlate  = { F:isN?'#282A36':'#585A72', L:isN?'#181A22':'#363848', T:isN?'#343642':'#6E7086' }
  const rfThatch = { F:isN?'#463A12':'#A88C38', L:isN?'#2A2208':'#685618', T:isN?'#584A1A':'#C4A246' }

  const forgeWin  = 'rgba(255,115,22,0.88)'
  const forgeGlow = '#FF7014'

  // Belltower  x=-2.0 y=-2.0  x+y=-4.0  (slim landmark — centered at back)
  const beltow = {
    shaft: blk(-2.0,-2.0,0, 0.52,0.52,2.2),
    belfry:blk(-1.98,-1.98,2.2, 0.48,0.48,0.34),
    mA:    blk(-2.00,-2.0,2.54, 0.12,0.52,0.18),
    mB:    blk(-1.78,-2.0,2.54, 0.12,0.52,0.18),
    mC:    blk(-1.56,-2.0,2.54, 0.12,0.52,0.18),
  }

  // 2. LIBRARY  x=-2.8 y=0.4  x+y=-2.4
  const lib = {
    walls: blk(-2.8,0.4,0,   1.7,1.1,2.1),
    roof:  rfx(-2.8,0.4,0,   1.7,1.1,2.1,0.70),
    step:  blk(-2.60,0.4,-0.07, 1.3,1.1,0.07),
    wing:  blk(-2.6,1.5,0,   0.78,0.66,1.0),
    wingR: rfx(-2.6,1.5,0,   0.78,0.66,1.0,0.34),
  }

  // Hall       x=-0.6 y=-1.2  x+y=-1.8  (village hall — modest, not monument)
  const hall = {
    walls: blk(-0.6,-1.2,0, 1.0,0.8,1.3),
    roof:  rfx(-0.6,-1.2,0, 1.0,0.8,1.3,0.46),
    plat:  blk(-0.46,-1.2,-0.06, 0.72,0.8,0.06),
    pA:    blk(-0.44,-1.2,0, 0.08,0.8,1.22),
    pB:    blk(-0.04,-1.2,0, 0.08,0.8,1.22),
    pC:    blk( 0.26,-1.2,0, 0.08,0.8,1.22),
  }

  // 4. GREENHOUSE  x=-2.0 y=1.8  x+y=-0.2
  const ghouse = {
    base:  blk(-2.0,1.8,0,    0.90,0.74,0.18),
    walls: blk(-2.0,1.8,0.18, 0.90,0.74,0.88),
    roof:  rfx(-2.0,1.8,0.18, 0.90,0.74,0.88,0.38),
  }

  // 5. CAFÉ  x=1.6 y=-0.6  x+y=1.0
  const cafe = {
    walls: blk(1.6,-0.6,0,    1.1,0.88,1.44),
    roof:  rfx(1.6,-0.6,0,    1.1,0.88,1.44,0.50),
    awn:   blk(1.52,-0.68,1.22,1.26,1.0,0.07),
  }

  // 6. WELL  x=0.2 y=0.7  x+y=0.9
  const well = {
    base: blk(0.12,0.62,0,    0.30,0.30,0.30),
    rim:  blk(0.08,0.58,0.30, 0.38,0.38,0.06),
  }

  // 7. MILL  x=-0.8 y=1.8  x+y=1.0
  const mill = {
    walls: blk(-0.8,1.8,0,  1.0,0.88,1.3),
    roof:  rfx(-0.8,1.8,0,  1.0,0.88,1.3,0.48),
    chim:  blk(-0.60,2.58,1.3, 0.16,0.16,0.40),
    cap:   blk(-0.64,2.54,1.70, 0.24,0.24,0.05),
  }

  // 8. BAKERY  x=2.4 y=-0.2  x+y=2.2
  const bakery = {
    walls: blk(2.4,-0.2,0,  1.2,0.92,1.44),
    roof:  rfx(2.4,-0.2,0,  1.2,0.92,1.44,0.54),
    chim:  blk(2.62,0.60,1.44, 0.18,0.18,0.42),
    cap:   blk(2.58,0.56,1.86, 0.26,0.26,0.05),
  }

  // 9. FORGE  x=0.5 y=2.1  x+y=2.6  (always glowing)
  const forge = {
    walls: blk(0.5,2.1,0,  1.0,0.82,1.0),
    rTop:  blk(0.5,2.1,1.0,1.0,0.82,0.07),
    chim:  blk(0.72,2.80,1.0, 0.22,0.22,0.54),
    cap:   blk(0.68,2.76,1.54, 0.30,0.30,0.05),
  }

  // 10. WORKSHOP  x=1.8 y=1.7  x+y=3.5
  const wshop = {
    walls: blk(1.8,1.7,0,  1.4,1.1,1.5),
    roof:  rfx(1.8,1.7,0,  1.4,1.1,1.5,0.58),
    chim:  blk(2.02,2.68,1.5, 0.20,0.20,0.48),
    cap:   blk(1.98,2.64,1.98, 0.28,0.28,0.05),
  }

  // 11. COTTAGE A  x=3.0 y=0.9  x+y=3.9
  const cotA = {
    walls: blk(3.0,0.9,0,  1.0,0.92,1.2),
    roof:  rfx(3.0,0.9,0,  1.0,0.92,1.2,0.44),
    chim:  blk(3.18,1.66,1.2, 0.16,0.16,0.38),
    cap:   blk(3.14,1.62,1.58, 0.24,0.24,0.04),
  }

  // 12. COTTAGE B  x=2.1 y=2.5  x+y=4.6
  const cotB = {
    walls: blk(2.1,2.5,0,  0.88,0.76,1.1),
    roof:  rfx(2.1,2.5,0,  0.88,0.76,1.1,0.40),
    chim:  blk(2.28,3.16,1.1, 0.15,0.15,0.34),
    cap:   blk(2.24,3.12,1.44, 0.22,0.22,0.04),
  }

  const pondC = iso(0.2,3.4,0)

  return (
    <div style={{flex:1,overflow:'hidden',position:'relative'}}
      onPointerMove={e=>{
        const rc=e.currentTarget.getBoundingClientRect()
        setPtr({x:e.clientX-rc.left,y:e.clientY-rc.top})
      }}
    >
      <style>{`
        @keyframes tSmoke{0%{transform:translate(0,0) scale(0.36);opacity:0.9}60%{transform:translate(3px,-44px) scale(1.9);opacity:0.50}100%{transform:translate(6px,-78px) scale(3.4);opacity:0}}
        @keyframes tShimmer{0%,100%{opacity:0.55}50%{opacity:0.18}}
        @keyframes tSway{0%,100%{transform-origin:50% 100%;transform:rotate(0.5deg)}50%{transform-origin:50% 100%;transform:rotate(-0.5deg)}}
        @keyframes tTwinkle{0%,100%{opacity:0.18}50%{opacity:0.95}}
        @keyframes tBird{0%{transform:translateX(-90px) translateY(0);opacity:0}5%{opacity:0.55}95%{opacity:0.55}100%{transform:translateX(520px) translateY(-24px);opacity:0}}
        @keyframes tFirefly{0%,100%{opacity:0;transform:translate(0,0)}20%{opacity:0.92;transform:translate(11px,-20px)}55%{opacity:0.46;transform:translate(-8px,-30px)}80%{opacity:0.88;transform:translate(15px,-12px)}}
        @keyframes tCloud{from{transform:translateX(0)}to{transform:translateX(130px)}}
        @keyframes tRain{from{transform:translateY(-80px);opacity:0.72}to{transform:translateY(220px);opacity:0}}
        @keyframes tSnow{0%{transform:translateY(-22px) translateX(0);opacity:0.9}50%{transform:translateY(88px) translateX(15px);opacity:0.7}100%{transform:translateY(200px) translateX(-9px);opacity:0}}
        @keyframes tLeaf{0%{transform:translate(0,0) rotate(0deg);opacity:0.85}100%{transform:translate(60px,108px) rotate(230deg);opacity:0}}
        @keyframes tDuck{0%,100%{transform:translateX(0)}50%{transform:translateX(14px)}}
        @keyframes tBlend{0%{opacity:1;filter:brightness(1)}44%{opacity:0.09;filter:brightness(0.38) blur(2px)}100%{opacity:1;filter:brightness(1)}}
        @keyframes tFlag{0%,100%{transform-origin:0% 50%;transform:skewY(0deg)}50%{transform-origin:0% 50%;transform:skewY(4.5deg)}}
        @keyframes tPerson{0%,100%{transform:translateX(0)}50%{transform:translateX(20px)}}
        @keyframes tButterfly{0%{transform:translate(0,0)}25%{transform:translate(16px,-14px)}50%{transform:translate(28px,6px)}75%{transform:translate(12px,18px)}100%{transform:translate(0,0)}}
        @keyframes tRipple{0%{transform:scale(0.1);opacity:0.70}100%{transform:scale(1);opacity:0}}
        @keyframes tLamp{0%,100%{opacity:0.88}50%{opacity:0.68}}
      `}</style>

      <div style={{position:'absolute',inset:0,animation:blend?'tBlend 0.72s ease both':'none'}}>
        <svg width="390" height="722" viewBox="0 0 390 722" style={{display:'block'}}>
          <defs>
            <linearGradient id={`sk${t}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor={p.skyT}/>
              <stop offset="42%"  stopColor={p.skyM}/>
              <stop offset="100%" stopColor={p.skyH}/>
            </linearGradient>
            <linearGradient id={`gn${t}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor={p.gA}/>
              <stop offset="100%" stopColor={p.gB}/>
            </linearGradient>
            <radialGradient id="pd" cx="38%" cy="34%" r="64%">
              <stop offset="0%"   stopColor={p.ws} stopOpacity="0.94"/>
              <stop offset="100%" stopColor={p.wt} stopOpacity="1"/>
            </radialGradient>
            <radialGradient id={`tr${t}`} cx="36%" cy="26%" r="74%">
              <stop offset="0%"   stopColor={lH}/>
              <stop offset="100%" stopColor={lM}/>
            </radialGradient>
            <radialGradient id="vg" cx="50%" cy="50%" r="70%">
              <stop offset="28%" stopColor="transparent"/>
              <stop offset="100%" stopColor={p.skyT} stopOpacity={isN?0.75:isD?0.50:0.24}/>
            </radialGradient>
            <radialGradient id="forgeR" cx="50%" cy="100%" r="100%">
              <stop offset="0%"   stopColor={forgeGlow} stopOpacity={isN?0.48:0.16}/>
              <stop offset="100%" stopColor={forgeGlow} stopOpacity="0"/>
            </radialGradient>
            <filter id="hz"><feGaussianBlur stdDeviation="1.8"/></filter>
            <filter id="gl">
              <feGaussianBlur stdDeviation="7" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="shadow"><feGaussianBlur stdDeviation="5"/></filter>
            <pattern id="cobble" x="0" y="0" width={TW} height={TH} patternUnits="userSpaceOnUse">
              <polygon points={`${TW/2},0 ${TW},${TH/2} ${TW/2},${TH} 0,${TH/2}`}
                fill="none" stroke="rgba(0,0,0,0.09)" strokeWidth="0.8"/>
            </pattern>
            <pattern id="grid" x="0" y="0" width={TW*2} height={TH*2} patternUnits="userSpaceOnUse">
              <polygon points={`${TW},0 ${TW*2},${TH} ${TW},${TH*2} 0,${TH}`}
                fill="none" stroke="rgba(0,0,0,0.055)" strokeWidth="0.7"/>
            </pattern>
          </defs>

          {/* SKY */}
          <rect width="390" height="722" fill={`url(#sk${t})`}/>

          {/* Stars */}
          {isN&&Array.from({length:80}).map((_,i)=>(
            <circle key={i} cx={2+(i*79+i*i*3)%386} cy={1+(i*43+i*11)%234}
              r={i%9===0?1.8:i%4===0?1.0:0.55} fill="white" opacity={0.07+(i%7)*0.09}
              style={{animation:`tTwinkle ${1.2+(i%5)*0.52}s ease-in-out infinite ${(i*0.28)%4}s`}}/>
          ))}
          {t==='night'&&<ellipse cx="262" cy="76" rx="150" ry="36" fill="rgba(194,208,242,0.030)"
            style={{filter:'blur(22px)',transform:'rotate(-28deg)',transformOrigin:'262px 76px'}}/>}

          {/* Sun rays */}
          {(t==='dawn'||t==='sunset')&&(()=>{
            const sx=p.sun.x,sy=p.sun.y
            return <g opacity={0.08}>{[-55,-28,0,28,55].map((a,i)=>{
              const r=a*Math.PI/180
              return <line key={i} x1={sx} y1={sy} x2={sx+Math.cos(r)*680} y2={sy+Math.sin(r)*680}
                stroke={p.cel} strokeWidth={28} opacity={0.26-i*0.022}/>
            })}</g>
          })()}

          {/* Sun / Moon */}
          {t!=='night'&&t!=='bluehour'?(
            <g>
              <circle cx={p.sun.x} cy={p.sun.y} r={36} fill={p.cel} opacity={0.09}/>
              <circle cx={p.sun.x} cy={p.sun.y} r={21} fill={p.cel} opacity={0.16}/>
              <circle cx={p.sun.x} cy={p.sun.y} r={12} fill={p.cel} opacity={0.92}/>
            </g>
          ):t==='night'?(
            <g>
              <circle cx={292} cy={86} r={22} fill="#D2C6AE" opacity={0.90}/>
              <circle cx={303} cy={82} r={18} fill={p.skyM} opacity={0.88}/>
              <circle cx={285} cy={96} r={3.2} fill="rgba(0,0,0,0.10)"/>
              <circle cx={298} cy={79} r={2.8} fill="rgba(0,0,0,0.08)"/>
            </g>
          ):(
            <g>
              <circle cx={26} cy={244} r={12} fill={p.cel} opacity={0.52}/>
              <circle cx={35} cy={239} r={9}  fill={p.skyM} opacity={0.46}/>
            </g>
          )}

          {/* Clouds */}
          {t!=='night'&&<>
            <g style={{animation:'tCloud 62s linear infinite'}} opacity={isD?0.18:wx==='rain'||wx==='fog'?0.85:0.46}>
              <ellipse cx="80"  cy="72" rx="64" ry="24" fill="white" style={{filter:'blur(4px)'}}/>
              <ellipse cx="54"  cy="64" rx="40" ry="30" fill="white" style={{filter:'blur(4px)'}}/>
            </g>
            <g style={{animation:'tCloud 88s linear infinite 22s'}} opacity={isD?0.14:wx==='rain'||wx==='fog'?0.76:0.36}>
              <ellipse cx="268" cy="48" rx="52" ry="20" fill="white" style={{filter:'blur(4px)'}}/>
              <ellipse cx="246" cy="40" rx="34" ry="24" fill="white" style={{filter:'blur(4px)'}}/>
            </g>
            <g style={{animation:'tCloud 74s linear infinite 41s'}} opacity={isD?0.12:wx==='fog'?0.82:0.30}>
              <ellipse cx="160" cy="38" rx="48" ry="18" fill="white" style={{filter:'blur(5px)'}}/>
            </g>
          </>}

          {/* GROUND BASE */}
          <path d={[
            `M${iso(-8,-5).x},${iso(-8,-5).y}`,
            `L${iso(9,-5).x},${iso(9,-5).y}`,
            `L${iso(9,9).x},${iso(9,9).y}`,
            `L${iso(-8,9).x},${iso(-8,9).y}Z`,
          ].join(' ')} fill={`url(#gn${t})`}/>
          <path d={[
            `M${iso(-8,-5).x},${iso(-8,-5).y}`,
            `L${iso(9,-5).x},${iso(9,-5).y}`,
            `L${iso(9,9).x},${iso(9,9).y}`,
            `L${iso(-8,9).x},${iso(-8,9).y}Z`,
          ].join(' ')} fill="url(#grid)" opacity={isN?0.65:0.38}/>

          {/* District ground patches — colour-coded neighbourhoods */}
          {/* Civic plaza — warm cobblestone */}
          <path d={face([-1.0,-1.0],[2.2,-1.0],[2.2,2.0],[-1.0,2.0])} fill={p.pa} opacity={0.60}/>
          {/* Library garden — cool sage */}
          <path d={face([-3.4,-0.2],[-0.6,-0.2],[-0.6,2.4],[-3.4,2.4])} fill={p.gC} opacity={0.56}/>
          {/* Bakery/cottage — warm garden earth */}
          <path d={face([1.8,-0.8],[4.4,-0.8],[4.4,2.0],[1.8,2.0])} fill={p.gA} opacity={0.58}/>
          {/* Craft yard — muted clay */}
          <path d={face([0.0,1.4],[3.6,1.4],[3.6,3.2],[0.0,3.2])} fill={p.gC} opacity={0.52}/>
          {/* Mill yard */}
          <path d={face([-1.8,1.8],[-0.0,1.8],[-0.0,3.4],[-1.8,3.4])} fill={p.gB} opacity={0.56}/>

          {/* Low stone boundary walls — defines village edges, connects buildings */}
          <path d={face([-2.8,0.2,0.20],[-0.6,0.2,0.20],[-0.6,0.2,0],[-2.8,0.2,0])} fill={p.wF} opacity={0.38}/>
          <path d={face([0.4,-1.2,0.20],[0.4,0.0,0.20],[0.4,0.0,0],[0.4,-1.2,0])} fill={p.wL} opacity={0.34}/>
          <path d={face([1.4,2.0,0.16],[1.8,1.6,0.16],[1.8,1.6,0],[1.4,2.0,0])} fill={p.wF} opacity={0.36}/>

          <rect x="0" y={CY-70} width="390" height="140" fill={p.hz} opacity={0.06} style={{filter:'blur(28px)'}}/>

          {/* Hills */}
          <g filter="url(#hz)" opacity={0.62}>
            <ellipse cx={iso(-3.2,-5.2,0).x} cy={iso(-3.2,-5.2,1.8).y+20} rx={126} ry={52} fill={p.gC}/>
            <ellipse cx={iso(4.2,-4.8,0).x}  cy={iso(4.2,-4.8,1.4).y+16} rx={100} ry={44} fill={p.gC} opacity={0.80}/>
            <ellipse cx={iso(-1.0,-6.0,0).x}  cy={iso(-1.0,-6.0,1.2).y+12} rx={82}  ry={34} fill={p.gC} opacity={0.68}/>
          </g>

          {/* ── WINDING PATHS ── organic routes between buildings */}
          {/* Main cobblestone: hall → well */}
          <path d={face([-0.02,-1.2],[0.14,-1.2],[0.16,-0.2],[0.00,-0.2])} fill={p.rd} opacity={0.66}/>
          <path d={face([0.00,-0.2],[0.16,-0.2],[0.20,0.28],[0.04,0.28])} fill={p.rd} opacity={0.60}/>
          {/* Branch: well → market area */}
          <path d={face([0.44,0.36],[0.60,0.36],[0.95,-0.1],[0.79,-0.1])} fill={p.pa} opacity={0.54}/>
          <path d={face([0.95,-0.1],[1.11,-0.1],[1.68,-0.2],[1.52,-0.2])} fill={p.pa} opacity={0.50}/>
          <path d={face([1.68,-0.2],[1.84,-0.2],[2.4,-0.28],[2.24,-0.28])} fill={p.pa} opacity={0.46}/>
          {/* Branch: well → cottage */}
          <path d={face([0.44,0.44],[0.60,0.44],[1.4,0.36],[1.24,0.36])} fill={p.pa} opacity={0.46}/>
          <path d={face([1.4,0.36],[1.56,0.36],[2.3,0.44],[2.14,0.44])} fill={p.pa} opacity={0.42}/>
          <path d={face([2.3,0.44],[2.46,0.44],[3.2,0.62],[3.04,0.62])} fill={p.pa} opacity={0.38}/>
          {/* Branch: well → library */}
          <path d={face([0.24,0.42],[0.24,0.58],[-0.4,0.52],[-0.4,0.36])} fill={p.pa} opacity={0.44}/>
          <path d={face([-0.4,0.36],[-0.4,0.52],[-1.2,0.36],[-1.2,0.20])} fill={p.pa} opacity={0.40}/>
          <path d={face([-1.2,0.20],[-1.2,0.36],[-2.0,0.30],[-2.0,0.14])} fill={p.pa} opacity={0.36}/>
          {/* Branch: central → forge/workshop */}
          <path d={face([0.40,0.56],[0.56,0.56],[0.50,1.2],[0.34,1.2])} fill={p.pa} opacity={0.44}/>
          <path d={face([0.50,1.2],[0.66,1.2],[0.50,1.8],[0.34,1.8])} fill={p.pa} opacity={0.40}/>
          {/* Branch: central → mill */}
          <path d={face([0.18,0.44],[0.18,0.60],[-0.4,1.2],[-0.4,1.04])} fill={p.pa} opacity={0.40}/>
          <path d={face([-0.4,1.2],[-0.4,1.36],[-0.9,2.0],[-0.9,1.84])} fill={p.pa} opacity={0.36}/>
          {/* Rain wet sheen on main road */}
          {wx==='rain'&&<path d={face([0.14,-1.5],[0.30,-1.5],[0.40,0.28],[0.24,0.28])} fill={p.ws} opacity={0.28}/>}

          {/* ── BACKGROUND TREES ── */}
          {([
            [0.10,-1.4,0.28,-1.4,0.34,-0.2,0.16,-0.2],
            [0.16,-0.2,0.34,-0.2,0.38,0.6,0.20,0.6],
            [0.20,0.6, 0.38,0.6, 0.36,1.8,0.18,1.8],
          ] as number[][]).map((pts,i)=>(
            <path key={i} d={face([pts[0],pts[1]],[pts[2],pts[3]],[pts[4],pts[5]],[pts[6],pts[7]])} fill={p.rd} opacity={0.72-i*0.06}/>
          ))}
          {wx==='rain'&&<path d={face([0.10,-1.4],[0.28,-1.4],[0.36,1.8],[0.18,1.8])} fill={p.ws} opacity={0.22}/>}
          {/* Side paths */}
          <path d={face([0.26,0.62],[0.44,0.62],[1.0,-0.2],[0.82,-0.2])}   fill={p.pa} opacity={0.58}/>
          <path d={face([1.0,-0.2],[1.18,-0.2],[1.6,-0.44],[1.42,-0.44])}  fill={p.pa} opacity={0.52}/>
          <path d={face([1.6,-0.44],[1.78,-0.44],[2.4,-0.18],[2.22,-0.18])} fill={p.pa} opacity={0.50}/>
          <path d={face([0.36,0.68],[0.54,0.68],[1.6,0.58],[1.42,0.58])}   fill={p.pa} opacity={0.50}/>
          <path d={face([1.6,0.58],[1.78,0.58],[2.4,0.68],[2.22,0.68])}    fill={p.pa} opacity={0.46}/>
          <path d={face([2.4,0.68],[2.58,0.68],[3.1,0.82],[2.92,0.82])}    fill={p.pa} opacity={0.42}/>
          <path d={face([0.18,0.68],[0.18,0.86],[-0.5,0.72],[-0.5,0.54])}  fill={p.pa} opacity={0.48}/>
          <path d={face([-0.5,0.54],[-0.5,0.72],[-1.4,0.56],[-1.4,0.38])}  fill={p.pa} opacity={0.44}/>
          <path d={face([-1.4,0.38],[-1.4,0.56],[-2.1,0.50],[-2.1,0.32])}  fill={p.pa} opacity={0.40}/>
          <path d={face([0.28,0.82],[0.46,0.82],[0.52,1.6],[0.34,1.6])}    fill={p.pa} opacity={0.46}/>
          <path d={face([0.34,1.6],[0.52,1.6],[0.56,2.1],[0.38,2.1])}      fill={p.pa} opacity={0.42}/>
          <path d={face([0.18,0.72],[0.18,0.90],[-0.5,1.4],[-0.5,1.22])}   fill={p.pa} opacity={0.44}/>
          <path d={face([-0.5,1.4],[-0.5,1.58],[-0.7,1.8],[-0.7,1.62])}   fill={p.pa} opacity={0.40}/>

          {/* BACKGROUND TREES */}
          {([
            {x:-5.0,y:1.4,h:1.8,r:32},{x:-3.0,y:-1.4,h:1.6,r:28},
            {x:1.8, y:-2.8,h:1.4,r:26},{x:-1.4,y:-2.4,h:1.3,r:24},
            {x:4.4, y:-1.6,h:1.3,r:24},{x:5.2, y:1.0, h:1.2,r:22},
            {x:-4.8,y:3.0, h:1.4,r:26},
          ] as {x:number;y:number;h:number;r:number}[]).map((nt,i)=>{
            const b=iso(nt.x,nt.y,0),c=iso(nt.x,nt.y,nt.h),bare=season==='winter'
            return (
              <g key={`bt${i}`} filter="url(#hz)" opacity={0.62}
                style={{animation:`tSway ${7+i*1.5}s ease-in-out infinite ${i*0.86}s`}}>
                <line x1={b.x} y1={b.y} x2={c.x} y2={c.y+nt.r*0.36} stroke={p.tr} strokeWidth={2.8} strokeLinecap="round"/>
                {!bare&&<>
                  <ellipse cx={c.x-7} cy={c.y+8}  rx={nt.r*0.78} ry={nt.r*0.62} fill={lM} opacity={0.62}/>
                  <ellipse cx={c.x}   cy={c.y}     rx={nt.r}      ry={nt.r*0.84} fill={`url(#tr${t})`}/>
                  <ellipse cx={c.x+9} cy={c.y-8}   rx={nt.r*0.58} ry={nt.r*0.46} fill={lH} opacity={0.52}/>
                </>}
                {bare&&[-1,0,1].map(bx=>(
                  <line key={bx} x1={c.x+bx*9} y1={c.y} x2={c.x+bx*15+bx*4} y2={c.y-nt.r*0.60}
                    stroke={p.tr} strokeWidth={1.3} strokeLinecap="round" opacity={0.58}/>
                ))}
              </g>
            )
          })}

          {/* ── BUILDING SHADOWS ── */}
          {[
            {c:iso(-2.0,-2.0,0),rx:14,ry:5},  {c:iso(-1.8,1.2,0),rx:46,ry:14},
            {c:iso(0.6,0.2,0),rx:60,ry:18},    {c:iso(-2.0,1.8,0),rx:28,ry:9},
            {c:iso(3.2,0.2,0),rx:38,ry:12},    {c:iso(3.4,-0.2,0),rx:36,ry:11},
            {c:iso(1.0,2.4,0),rx:36,ry:11},    {c:iso(-0.4,2.8,0),rx:32,ry:10},
            {c:iso(2.5,2.1,0),rx:42,ry:13},    {c:iso(0.5,-1.4,0),rx:20,ry:6},
          ].map((s,i)=>(<ellipse key={i} cx={s.c.x+7} cy={s.c.y+9} rx={s.rx} ry={s.ry} fill="rgba(0,0,0,0.20)" filter="url(#shadow)"/>))}

          {/* ══ BUILDINGS ══════════════════════════════════════════════════════ */}

          {/* ── 1. BELLTOWER (x+y=-4.0, centered back — slim aspiration landmark) ── */}
          <g filter="url(#hz)" opacity={0.90}>
            <path d={beltow.shaft.L} fill={p.wL}/>
            <path d={beltow.shaft.F} fill={p.wF}/>
            {fLines(-2.0,-2.0,2.2,0.52,0.60).map((d,i)=><path key={i} d={d} fill={p.wL} opacity={0.20}/>)}
            <path d={beltow.shaft.T} fill={p.wT}/>
            <path d={beltow.belfry.L} fill={p.wL} opacity={0.85}/><path d={beltow.belfry.F} fill={p.wF} opacity={0.85}/><path d={beltow.belfry.T} fill={p.wT} opacity={0.85}/>
            {[beltow.mA,beltow.mB,beltow.mC].map((m,i)=>(<g key={i}><path d={m.L} fill={p.wL}/><path d={m.F} fill={p.wF}/><path d={m.T} fill={p.wT}/></g>))}
            {/* Bell arch opening */}
            <path d={fw(-2.0,-2.0,1.5,0.26,0.56)} fill={p.wF} opacity={0.7}/>
            <path d={fw(-2.0+0.03,-2.0,1.52,0.20,0.46)} fill={p.win} opacity={isD?0.75:0.38}/>
            {isD&&<path d={fw(-2.0+0.03,-2.0,1.52,0.20,0.46)} fill={p.wgl} opacity={0.20} filter="url(#gl)"/>}
            {/* Tower slit windows */}
            <path d={fw(-2.0+0.20,-2.0,0.8,0.09,0.42)} fill={p.win} opacity={isD?0.62:0.28}/>
            <path d={fw(-2.0+0.20,-2.0,1.4,0.09,0.36)} fill={p.win} opacity={isD?0.55:0.24}/>
            {/* Flagpole */}
            {(()=>{
              const ft=iso(-1.68,-2.0,2.72), fb=iso(-1.68,-2.0,2.24)
              return <g>
                <line x1={fb.x} y1={fb.y} x2={ft.x} y2={ft.y} stroke={isN?'#5A5868':'#9A9AB0'} strokeWidth="1.3"/>
                <polygon points={`${ft.x},${ft.y} ${ft.x+16},${ft.y+5} ${ft.x},${ft.y+10}`}
                  fill={isD?p.ws:rfTerra.F} opacity={0.68} style={{animation:'tFlag 3.8s ease-in-out infinite'}}/>
              </g>
            })()}
          </g>

          {/* 2. LIBRARY (x+y=-2.4) — honey limestone, terracotta tile */}
          <g filter="url(#hz)" opacity={0.94}>
            <path d={lib.step.L} fill={mHoney.L} opacity={0.55}/><path d={lib.step.F} fill={mHoney.F} opacity={0.55}/><path d={lib.step.T} fill={mHoney.T} opacity={0.62}/>
            <path d={lib.walls.L} fill={mHoney.L}/><path d={lib.walls.F} fill={mHoney.F}/>
            {fLines(-2.8,0.4,2.1,1.7).map((d,i)=><path key={i} d={d} fill={mHoney.L} opacity={0.22}/>)}
            {lLines(-2.8,0.4,2.1,1.1).map((d,i)=><path key={i} d={d} fill={mHoney.T} opacity={0.07}/>)}
            <path d={lib.walls.T} fill={mHoney.T}/><path d={lib.roof.L} fill={rfTerra.L}/><path d={lib.roof.F} fill={rfTerra.F}/>
            <path d={face([-2.8,0.4,2.1+0.70],[-1.1,0.4,2.1+0.70],[-1.1,0.4,2.1+0.62],[-2.8,0.4,2.1+0.62])} fill={rfTerra.T} opacity={0.70}/>
            {/* Wing annex */}
            <path d={lib.wing.L} fill={mHoney.L}/><path d={lib.wing.F} fill={mHoney.F}/><path d={lib.wing.T} fill={mHoney.T}/>
            <path d={lib.wingR.L} fill={rfTerra.L}/><path d={lib.wingR.F} fill={rfTerra.F}/>
            {/* Windows — three arched, with sills */}
            {[-2.56,-1.98,-1.42].map((bx,wi)=>(
              <g key={wi}>
                <path d={fw(bx,0.4,1.26,0.46,0.82)} fill={mHoney.F} opacity={0.85}/>
                <path d={face([bx-0.02,0.4,1.24],[bx+0.48,0.4,1.24],[bx+0.48,0.4,1.21],[bx-0.02,0.4,1.21])} fill={mHoney.T} opacity={0.74}/>
                <path d={fw(bx+0.05,0.4,1.28,0.36,0.70)} fill={p.win} opacity={isD?0.86:0.44}/>
                <path d={fw(bx-0.04,0.4,1.28,0.06,0.70)} fill={mHoney.L} opacity={0.72}/>
                <path d={fw(bx+0.42,0.4,1.28,0.06,0.70)} fill={mHoney.L} opacity={0.72}/>
                {isD&&<path d={fw(bx+0.05,0.4,1.28,0.36,0.70)} fill={p.wgl} opacity={0.22} filter="url(#gl)"/>}
              </g>
            ))}
            {[0.22,0.74].map((yo,wi)=>(
              <g key={wi}>
                <path d={lw(-2.8,0.4+yo,1.26,0.46,0.72)} fill={mHoney.L} opacity={0.85}/>
                <path d={lw(-2.8,0.4+yo+0.05,1.29,0.36,0.60)} fill={p.win} opacity={isD?0.72:0.36}/>
                {isD&&<path d={lw(-2.8,0.4+yo+0.05,1.29,0.36,0.60)} fill={p.wgl} opacity={0.16} filter="url(#gl)"/>}
              </g>
            ))}
            <path d={fw(-2.46,1.5,0.60,0.38,0.56)} fill={p.win} opacity={isD?0.74:0.38}/>
            {isD&&<path d={fw(-2.46,1.5,0.60,0.38,0.56)} fill={p.wgl} opacity={0.18} filter="url(#gl)"/>}
          </g>

          {/* ── 3. HALL (x+y=-1.8, village hall — modest, one of many buildings) ── */}
          <g>
            <path d={hall.plat.L} fill={p.wL} opacity={0.50}/><path d={hall.plat.F} fill={p.wF} opacity={0.50}/><path d={hall.plat.T} fill={p.wT} opacity={0.65}/>
            <path d={hall.walls.L} fill={p.wL}/><path d={hall.walls.F} fill={p.wF}/>
            {fLines(-0.6,-1.2,1.3,1.0).map((d,i)=><path key={i} d={d} fill={p.wL} opacity={0.17}/>)}
            {lLines(-0.6,-1.2,1.3,0.8).map((d,i)=><path key={i} d={d} fill={p.wT} opacity={0.07}/>)}
            <path d={hall.walls.T} fill={p.wT}/><path d={hall.roof.L} fill={p.rL}/><path d={hall.roof.F} fill={p.rF}/>
            <path d={face([-0.6,-1.2,1.3+0.46],[0.4,-1.2,1.3+0.46],[0.4,-1.2,1.3+0.40],[-0.6,-1.2,1.3+0.40])} fill={p.rT} opacity={0.65}/>
            {[hall.pA,hall.pB,hall.pC].map((pl,i)=>(<g key={i} opacity={0.65}><path d={pl.F} fill={p.wT}/></g>))}
            {[0.06,0.52].map((xo,wi)=>(<g key={wi}><path d={fw(-0.6+xo,-1.2,0.42,0.36,0.78)} fill={p.wF} opacity={0.82}/><path d={face([-0.6+xo-0.02,-1.2,0.40],[-0.6+xo+0.38,-1.2,0.40],[-0.6+xo+0.38,-1.2,0.37],[-0.6+xo-0.02,-1.2,0.37])} fill={p.wT} opacity={0.75}/><path d={fw(-0.6+xo+0.03,-1.2,0.44,0.30,0.68)} fill={p.win} opacity={isD?0.78:0.40}/>{isD&&<path d={fw(-0.6+xo+0.03,-1.2,0.44,0.30,0.68)} fill={p.wgl} opacity={0.18} filter="url(#gl)"/>}</g>))}
            {[0.12,0.52].map((yo,wi)=>(<g key={wi}><path d={lw(-0.6,-1.2+yo,0.42,0.36,0.72)} fill={p.wL} opacity={0.82}/><path d={lw(-0.6,-1.2+yo+0.03,0.44,0.28,0.60)} fill={p.win} opacity={isD?0.68:0.34}/>{isD&&<path d={lw(-0.6,-1.2+yo+0.03,0.44,0.28,0.60)} fill={p.wgl} opacity={0.14} filter="url(#gl)"/>}</g>))}
          </g>

          {/* 4. GREENHOUSE (x+y=-0.2) — glass panels, inner glow */}
          <g filter="url(#hz)" opacity={0.88}>
            <path d={ghouse.base.L} fill={mStone.L} opacity={0.70}/><path d={ghouse.base.F} fill={mStone.F} opacity={0.70}/><path d={ghouse.base.T} fill={mStone.T} opacity={0.82}/>
            <path d={ghouse.walls.L} fill={mGlass.L}/>
            <path d={ghouse.walls.F} fill={mGlass.F}/>
            <path d={ghouse.walls.T} fill={mGlass.T}/>
            <path d={ghouse.roof.L}  fill={mGlass.L} opacity={0.88}/>
            <path d={ghouse.roof.F}  fill={mGlass.F} opacity={0.88}/>
            {isD&&<>
              <path d={ghouse.walls.L} fill={p.wgl} opacity={0.18} filter="url(#gl)"/>
              <path d={ghouse.walls.F} fill={p.wgl} opacity={0.14} filter="url(#gl)"/>
            </>}
            {fLines(-2.0,1.8,0.88,0.90,0.44).map((d,i)=><path key={i} d={d} fill={mStone.L} opacity={0.28}/>)}
            {lLines(-2.0,1.8,0.88,0.74,0.44).map((d,i)=><path key={i} d={d} fill={mStone.T} opacity={0.14}/>)}
          </g>

          {/* ── 4b. APOTHECARY (x+y=-0.9, tiny herb shop beside hall) ── */}
          {(()=>{
            const ap=blk(0.5,-1.4,0, 0.62,0.52,1.0)
            const apr=rfx(0.5,-1.4,0, 0.62,0.52,1.0,0.34)
            return <g filter="url(#hz)" opacity={0.88}>
              <path d={ap.L} fill={p.wL}/><path d={ap.F} fill={p.wF}/>
              {fLines(0.5,-1.4,1.0,0.62,0.50).map((d,i)=><path key={i} d={d} fill={p.wL} opacity={0.18}/>)}
              <path d={ap.T} fill={p.wT}/><path d={apr.L} fill={p.rL}/><path d={apr.F} fill={p.rF}/>
              <path d={fw(0.62,-1.4,0.52,0.28,0.48)} fill={p.wF} opacity={0.82}/>
              <path d={fw(0.65,-1.4,0.54,0.22,0.40)} fill={p.win} opacity={isD?0.76:0.38}/>
              {isD&&<path d={fw(0.65,-1.4,0.54,0.22,0.40)} fill={p.wgl} opacity={0.16} filter="url(#gl)"/>}
            </g>
          })()}

          {/* ── 5. WELL (x+y=0.8, central plaza focal point) ── */}
          <g>
            <path d={cafe.walls.L} fill={mHoney.L}/><path d={cafe.walls.F} fill={mHoney.F}/>
            {fLines(1.6,-0.6,1.44,1.1,0.52).map((d,i)=><path key={i} d={d} fill={mHoney.L} opacity={0.20}/>)}
            {lLines(1.6,-0.6,1.44,0.88,0.52).map((d,i)=><path key={i} d={d} fill={mHoney.T} opacity={0.06}/>)}
            <path d={cafe.walls.T} fill={mHoney.T}/><path d={cafe.roof.L} fill={rfTerra.L}/><path d={cafe.roof.F} fill={rfTerra.F}/>
            <path d={face([1.6,-0.6,1.44+0.50],[2.7,-0.6,1.44+0.50],[2.7,-0.6,1.44+0.44],[1.6,-0.6,1.44+0.44])} fill={rfTerra.T} opacity={0.68}/>
            {/* Awning overhang */}
            <path d={cafe.awn.T} fill={isN?'#7A3418':'#C45A2C'} opacity={0.72}/>
            <path d={cafe.awn.F} fill={isN?'#5A2410':'#A04420'} opacity={0.64}/>
            <path d={cafe.awn.L} fill={isN?'#3E1808':'#7A3418'} opacity={0.64}/>
            {/* Windows */}
            <path d={fw(1.72,-0.6,0.50,0.52,0.76)} fill={mHoney.F} opacity={0.82}/>
            <path d={fw(1.72+0.05,-0.6,0.52,0.42,0.66)} fill={p.win} opacity={isD?0.80:0.42}/>
            {isD&&<path d={fw(1.72+0.05,-0.6,0.52,0.42,0.66)} fill={p.wgl} opacity={0.22} filter="url(#gl)"/>}
            <path d={lw(1.6,-0.44,0.52,0.42,0.66)} fill={p.win} opacity={isD?0.70:0.36}/>
            {/* Outdoor tables */}
            {!isN&&([[1.94,-0.44],[2.22,-0.44]] as [number,number][]).map(([tx,ty],i)=>{
              const tbl=blk(tx,ty,-0.04, 0.20,0.16,0.06)
              const ch=blk(tx-0.06,ty+0.16,-0.04, 0.12,0.10,0.10)
              return <g key={i} opacity={0.70}>
                <path d={tbl.L} fill={mTimb.L}/><path d={tbl.F} fill={mTimb.F}/><path d={tbl.T} fill={mTimb.T}/>
                <path d={ch.L}  fill={mTimb.L}/><path d={ch.F}  fill={mTimb.F}/><path d={ch.T}  fill={mTimb.T}/>
              </g>
            })}
          </g>

          {/* 6. WELL (x+y=0.9) — stone with timber arch */}
          <g>
            <path d={well.base.L} fill={mStone.L}/><path d={well.base.F} fill={mStone.F}/><path d={well.base.T} fill={p.wt}/>
            {fLines(0.12,0.62,0.30,0.30,0.28).map((d,i)=><path key={i} d={d} fill={mStone.L} opacity={0.28}/>)}
            <path d={well.rim.L} fill={mStone.L}/><path d={well.rim.F} fill={mStone.F}/><path d={well.rim.T} fill={mStone.T}/>
            {([[0.14,0.64],[0.38,0.64]] as [number,number][]).map(([px,py],i)=>{
              const base=iso(px,py,0.36),top=iso(px,py,0.66)
              return <line key={i} x1={base.x} y1={base.y} x2={top.x} y2={top.y} stroke={mTimb.F} strokeWidth="2.8" strokeLinecap="round"/>
            })}
            {(()=>{
              const lt=iso(0.14,0.64,0.66),rt=iso(0.38,0.64,0.66)
              return <line x1={lt.x} y1={lt.y} x2={rt.x} y2={rt.y} stroke={mTimb.F} strokeWidth="2.8" strokeLinecap="round"/>
            })()}
            {(()=>{
              const wc=iso(0.24,0.72,0.04)
              return <ellipse cx={wc.x} cy={wc.y} rx={9} ry={5} fill={p.ws} opacity={0.55}/>
            })()}
            {(()=>{
              const bench=blk(0.56,0.64,-0.02, 0.42,0.12,0.12)
              return <g opacity={0.68}><path d={bench.L} fill={mTimb.L}/><path d={bench.F} fill={mTimb.F}/><path d={bench.T} fill={mTimb.T}/></g>
            })()}
          </g>

          {/* 7. MILL (x+y=1.0) — honey stone, thatched roof */}
          <g filter="url(#hz)" opacity={0.93}>
            <path d={mill.walls.L} fill={mHoney.L}/><path d={mill.walls.F} fill={mHoney.F}/>
            {fLines(-0.8,1.8,1.3,1.0,0.50).map((d,i)=><path key={i} d={d} fill={mHoney.L} opacity={0.20}/>)}
            {lLines(-0.8,1.8,1.3,0.88,0.50).map((d,i)=><path key={i} d={d} fill={mHoney.T} opacity={0.07}/>)}
            <path d={mill.walls.T} fill={mHoney.T}/><path d={mill.roof.L} fill={rfThatch.L}/><path d={mill.roof.F} fill={rfThatch.F}/>
            <path d={mill.chim.L} fill={mStone.L}/><path d={mill.chim.F} fill={mStone.F}/><path d={mill.chim.T} fill={mStone.T}/>
            <path d={mill.cap.L}  fill={mStone.L}/><path d={mill.cap.F}  fill={mStone.F}/><path d={mill.cap.T}  fill={mStone.T}/>
            {[0,1.4].map((d,i)=>{
              const sp=iso(-0.60+0.08,2.58+0.08,1.78)
              return <ellipse key={i} cx={sp.x} cy={sp.y} rx={3+i*1.6} ry={5+i*2}
                fill={isN?'rgba(175,175,175,0.38)':'rgba(196,188,178,0.50)'} opacity={0.58}
                style={{animation:`tSmoke 3.8s ease-out infinite ${d}s`,transformBox:'fill-box',transformOrigin:'50% 50%'}}/>
            })}
            <path d={fw(-0.68,1.8,0.58,0.42,0.64)} fill={mHoney.F} opacity={0.82}/>
            <path d={fw(-0.68+0.05,1.8,0.60,0.32,0.54)} fill={p.win} opacity={isD?0.76:0.38}/>
            {isD&&<path d={fw(-0.68+0.05,1.8,0.60,0.32,0.54)} fill={p.wgl} opacity={0.18} filter="url(#gl)"/>}
          </g>

          {/* 8. BAKERY (x+y=2.2) — honey stone, terracotta, wide chimney */}
          <g>
            <path d={bakery.walls.L} fill={mHoney.L}/><path d={bakery.walls.F} fill={mHoney.F}/>
            {fLines(2.4,-0.2,1.44,1.2,0.52).map((d,i)=><path key={i} d={d} fill={mHoney.L} opacity={0.20}/>)}
            {lLines(2.4,-0.2,1.44,0.92,0.52).map((d,i)=><path key={i} d={d} fill={mHoney.T} opacity={0.07}/>)}
            <path d={bakery.walls.T} fill={mHoney.T}/><path d={bakery.roof.L} fill={rfTerra.L}/><path d={bakery.roof.F} fill={rfTerra.F}/>
            <path d={face([2.4,-0.2,1.44+0.54],[3.6,-0.2,1.44+0.54],[3.6,-0.2,1.44+0.48],[2.4,-0.2,1.44+0.48])} fill={rfTerra.T} opacity={0.70}/>
            <path d={bakery.chim.L} fill={mBrick.L}/><path d={bakery.chim.F} fill={mBrick.F}/><path d={bakery.chim.T} fill={mBrick.T}/>
            <path d={bakery.cap.L}  fill={mStone.L}/><path d={bakery.cap.F}  fill={mStone.F}/><path d={bakery.cap.T}  fill={mStone.T}/>
            {[0,1.5,3.1].map((d,i)=>{
              const sp=iso(2.62+0.09,0.60+0.09,1.92)
              return <ellipse key={i} cx={sp.x} cy={sp.y} rx={3.5+i*1.6} ry={5.5+i*2}
                fill={isN?'rgba(175,175,175,0.40)':'rgba(200,192,180,0.52)'} opacity={0.62}
                style={{animation:`tSmoke 4.0s ease-out infinite ${d}s`,transformBox:'fill-box',transformOrigin:'50% 50%'}}/>
            })}
            <path d={fw(2.52,-0.2,0.54,0.46,0.70)} fill={mHoney.F} opacity={0.83}/>
            <path d={face([2.50,-0.2,0.52],[2.98,-0.2,0.52],[2.98,-0.2,0.49],[2.50,-0.2,0.49])} fill={mHoney.T} opacity={0.74}/>
            <path d={fw(2.52+0.05,-0.2,0.56,0.36,0.60)} fill={p.win} opacity={isD?0.80:0.42}/>
            {isD&&<path d={fw(2.52+0.05,-0.2,0.56,0.36,0.60)} fill={p.wgl} opacity={0.22} filter="url(#gl)"/>}
            <path d={lw(2.4,-0.02,0.54,0.42,0.66)} fill={mHoney.L} opacity={0.82}/>
            <path d={lw(2.4,-0.02+0.05,0.56,0.32,0.56)} fill={p.win} opacity={isD?0.72:0.36}/>
          </g>

          {/* 9. FORGE (x+y=2.6) — dark brick, permanent orange glow */}
          <g>
            <path d={forge.walls.L} fill={mBrick.L}/><path d={forge.walls.F} fill={mBrick.F}/>
            {fLines(0.5,2.1,1.0,1.0,0.50).map((d,i)=><path key={i} d={d} fill={mBrick.L} opacity={0.22}/>)}
            <path d={forge.walls.T} fill={mBrick.T}/>
            <path d={forge.rTop.L}  fill={mBrick.L} opacity={0.74}/>
            <path d={forge.rTop.F}  fill={mBrick.F} opacity={0.74}/>
            <path d={forge.rTop.T}  fill={mBrick.T}/>
            <path d={forge.chim.L} fill={mBrick.L}/><path d={forge.chim.F} fill={mBrick.F}/><path d={forge.chim.T} fill={mBrick.T}/>
            <path d={forge.cap.L}  fill={mStone.L}/><path d={forge.cap.F}  fill={mStone.F}/><path d={forge.cap.T}  fill={mStone.T}/>
            {[0,1.0,2.2].map((d,i)=>{
              const sp=iso(0.72+0.11,2.80+0.11,1.59)
              return <ellipse key={i} cx={sp.x} cy={sp.y} rx={5+i*2.2} ry={8+i*3.2}
                fill="rgba(130,110,100,0.56)" opacity={0.68}
                style={{animation:`tSmoke 2.8s ease-out infinite ${d}s`,transformBox:'fill-box',transformOrigin:'50% 50%'}}/>
            })}
            <path d={fw(0.62,2.1,0.44,0.46,0.62)} fill={mBrick.F} opacity={0.82}/>
            <path d={fw(0.66,2.1,0.46,0.38,0.52)} fill={forgeWin} opacity={0.92}/>
            <path d={fw(0.66,2.1,0.46,0.38,0.52)} fill={forgeGlow} opacity={0.30} filter="url(#gl)"/>
            <path d={lw(0.5,2.24,0.44,0.40,0.58)} fill={mBrick.L} opacity={0.80}/>
            <path d={lw(0.5,2.24+0.05,0.46,0.30,0.48)} fill={forgeWin} opacity={0.82}/>
            {(()=>{
              const fg=iso(1.0,2.1,0)
              return <ellipse cx={fg.x} cy={fg.y+5} rx={34} ry={13} fill="url(#forgeR)" style={{filter:'blur(4px)'}}/>
            })()}
          </g>

          {/* 10. WORKSHOP (x+y=3.5) — dark timber, slate roof */}
          <g>
            <path d={wshop.walls.L} fill={mTimb.L}/><path d={wshop.walls.F} fill={mTimb.F}/>
            {fLines(1.8,1.7,1.5,1.4,0.52).map((d,i)=><path key={i} d={d} fill={mTimb.L} opacity={0.20}/>)}
            {lLines(1.8,1.7,1.5,1.1,0.52).map((d,i)=><path key={i} d={d} fill={mTimb.T} opacity={0.07}/>)}
            <path d={wshop.walls.T} fill={mTimb.T}/><path d={wshop.roof.L} fill={rfSlate.L}/><path d={wshop.roof.F} fill={rfSlate.F}/>
            <path d={face([1.8,1.7,1.5+0.58],[3.2,1.7,1.5+0.58],[3.2,1.7,1.5+0.52],[1.8,1.7,1.5+0.52])} fill={rfSlate.T} opacity={0.64}/>
            <path d={wshop.chim.L} fill={mBrick.L}/><path d={wshop.chim.F} fill={mBrick.F}/><path d={wshop.chim.T} fill={mBrick.T}/>
            <path d={wshop.cap.L}  fill={mStone.L}/><path d={wshop.cap.F}  fill={mStone.F}/><path d={wshop.cap.T}  fill={mStone.T}/>
            {[0,1.5,3.0].map((d,i)=>{
              const sp=iso(2.02+0.10,2.68+0.10,2.03)
              return <ellipse key={i} cx={sp.x} cy={sp.y} rx={3.5+i*1.8} ry={5.5+i*2.2}
                fill={isN?'rgba(175,175,175,0.38)':'rgba(196,188,176,0.50)'} opacity={0.60}
                style={{animation:`tSmoke 4.1s ease-out infinite ${d}s`,transformBox:'fill-box',transformOrigin:'50% 50%'}}/>
            })}
            <path d={fw(1.92,1.7,0.58,0.52,0.80)} fill={mTimb.F} opacity={0.82}/>
            <path d={fw(1.92+0.05,1.7,0.60,0.42,0.70)} fill={p.win} opacity={isD?0.78:0.38}/>
            {isD&&<path d={fw(1.92+0.05,1.7,0.60,0.42,0.70)} fill={p.wgl} opacity={0.20} filter="url(#gl)"/>}
            <path d={fw(1.92,1.7,1.40,0.52,0.62)} fill={mTimb.F} opacity={0.82}/>
            <path d={fw(1.92+0.05,1.7,1.42,0.42,0.52)} fill={p.win} opacity={isD?0.70:0.34}/>
            <path d={lw(1.8,1.88,0.58,0.46,0.76)} fill={mTimb.L} opacity={0.82}/>
            <path d={lw(1.8,1.88+0.05,0.60,0.36,0.66)} fill={p.win} opacity={isD?0.70:0.34}/>
          </g>

          {/* 11. COTTAGE A (x+y=3.9) — plaster, thatch, kitchen garden */}
          <g>
            <path d={cotA.walls.L} fill={mPlstr.L}/><path d={cotA.walls.F} fill={mPlstr.F}/>
            {fLines(3.0,0.9,1.2,1.0,0.50).map((d,i)=><path key={i} d={d} fill={mPlstr.L} opacity={0.18}/>)}
            {lLines(3.0,0.9,1.2,0.92,0.50).map((d,i)=><path key={i} d={d} fill={mPlstr.T} opacity={0.06}/>)}
            <path d={cotA.walls.T} fill={mPlstr.T}/><path d={cotA.roof.L} fill={rfThatch.L}/><path d={cotA.roof.F} fill={rfThatch.F}/>
            <path d={cotA.chim.L} fill={mBrick.L}/><path d={cotA.chim.F} fill={mBrick.F}/><path d={cotA.chim.T} fill={mBrick.T}/>
            <path d={cotA.cap.L}  fill={mStone.L}/><path d={cotA.cap.F}  fill={mStone.F}/><path d={cotA.cap.T}  fill={mStone.T}/>
            {isD&&[0,1.6].map((d,i)=>{
              const sp=iso(3.18+0.08,1.66+0.08,1.62)
              return <ellipse key={i} cx={sp.x} cy={sp.y} rx={3+i*1.5} ry={4.5+i*2}
                fill={isN?'rgba(175,175,175,0.36)':'rgba(195,185,175,0.48)'} opacity={0.56}
                style={{animation:`tSmoke 3.2s ease-out infinite ${d}s`,transformBox:'fill-box',transformOrigin:'50% 50%'}}/>
            })}
            <path d={fw(3.12,0.9,0.52,0.46,0.70)} fill={mPlstr.F} opacity={0.82}/>
            <path d={face([3.10,0.9,0.50],[3.58,0.9,0.50],[3.58,0.9,0.47],[3.10,0.9,0.47])} fill={mPlstr.T} opacity={0.74}/>
            <path d={fw(3.12+0.05,0.9,0.54,0.36,0.60)} fill={p.win} opacity={isD?0.80:0.42}/>
            {isD&&<path d={fw(3.12+0.05,0.9,0.54,0.36,0.60)} fill={p.wgl} opacity={0.24} filter="url(#gl)"/>}
            <path d={lw(3.0,1.08,0.52,0.42,0.64)} fill={mPlstr.L} opacity={0.82}/>
            <path d={lw(3.0,1.08+0.05,0.54,0.32,0.54)} fill={p.win} opacity={isD?0.72:0.36}/>
            {isD&&<path d={lw(3.0,1.08+0.05,0.54,0.32,0.54)} fill={p.wgl} opacity={0.16} filter="url(#gl)"/>}
            {isD&&(()=>{
              const cw=iso(3.15,0.9,0.68)
              return <g opacity={0.46}>
                <circle cx={cw.x+2}   cy={cw.y-2}   r={2.8} fill={isN?'#2A2018':'#6A5040'}/>
                <circle cx={cw.x+2}   cy={cw.y-5.2} r={2.1} fill={isN?'#2A2018':'#6A5040'}/>
                <polygon points={`${cw.x+0.2},${cw.y-7.1} ${cw.x+2},${cw.y-9} ${cw.x+3.8},${cw.y-7.1}`} fill={isN?'#2A2018':'#6A5040'}/>
              </g>
            })()}
          </g>

          {/* 12. COTTAGE B (x+y=4.6) — stone, thatch */}
          <g>
            <path d={cotB.walls.L} fill={mStone.L}/><path d={cotB.walls.F} fill={mStone.F}/>
            {fLines(2.1,2.5,1.1,0.88,0.48).map((d,i)=><path key={i} d={d} fill={mStone.L} opacity={0.20}/>)}
            <path d={cotB.walls.T} fill={mStone.T}/><path d={cotB.roof.L} fill={rfThatch.L}/><path d={cotB.roof.F} fill={rfThatch.F}/>
            <path d={cotB.chim.L} fill={mBrick.L}/><path d={cotB.chim.F} fill={mBrick.F}/><path d={cotB.chim.T} fill={mBrick.T}/>
            <path d={cotB.cap.L}  fill={mStone.L}/><path d={cotB.cap.F}  fill={mStone.F}/><path d={cotB.cap.T}  fill={mStone.T}/>
            <path d={fw(2.22,2.5,0.48,0.40,0.62)} fill={p.win} opacity={isD?0.76:0.38}/>
            {isD&&<path d={fw(2.22,2.5,0.48,0.40,0.62)} fill={p.wgl} opacity={0.20} filter="url(#gl)"/>}
          </g>

          {/* ══ BETWEEN-BUILDING LIFE ════════════════════════════════════════ */}

          {/* Library herb garden */}
          <path d={face([-2.4,1.48],[-1.68,1.48],[-1.68,2.10],[-2.4,2.10])} fill={season==='winter'?p.gC:lM} opacity={0.52}/>
          {season!=='winter'&&[-0.02,0.22,0.46].map(dy=>(
            <path key={dy} d={face([-2.36,1.50+dy],[-1.72,1.50+dy],[-1.72,1.50+dy+0.14],[-2.36,1.50+dy+0.14])} fill={lH} opacity={0.38}/>
          ))}
          {season==='spring'&&[{x:-2.2,y:1.6},{x:-2.0,y:1.8},{x:-1.9,y:1.6}].map((fl,i)=>{
            const fp=iso(fl.x,fl.y,0.16)
            return <circle key={i} cx={fp.x} cy={fp.y} r={3.5} fill="#EEA0C8" opacity={0.72}/>
          })}

          {/* Cottage A kitchen garden */}
          <path d={face([4.0,0.9],[4.5,0.9],[4.5,1.6],[4.0,1.6])} fill={season==='winter'?p.gC:p.gA} opacity={0.60}/>
          {season!=='winter'&&[0,0.16,0.32,0.48,0.64].map(dy=>(
            <path key={dy} d={face([4.02,0.92+dy],[4.48,0.92+dy],[4.48,0.92+dy+0.11],[4.02,0.92+dy+0.11])} fill={lH} opacity={0.44}/>
          ))}

          {/* Low garden hedge — hall courtyard */}
          <path d={face([-0.6,0.0,0.18],[0.4,0.0,0.18],[0.4,0.0,0],[-0.6,0.0,0])} fill={season==='winter'?p.gC:lM} opacity={0.65}/>

          {/* Washing line: bakery → cottage A */}
          {!isN&&(()=>{
            const wa=iso(2.42,-0.2,1.36),wb=iso(3.02,0.9,1.14)
            return <>
              <line x1={wa.x} y1={wa.y} x2={wb.x} y2={wb.y} stroke={mStone.T} strokeWidth="0.9" strokeDasharray="2 2" opacity={0.38}/>
              {[0.22,0.52,0.78].map((frac,i)=>{
                const lx=wa.x+frac*(wb.x-wa.x)
                const ly=wa.y+frac*(wb.y-wa.y)+Math.sin(frac*Math.PI)*6
                return <rect key={i} x={lx-3.5} y={ly-4} width={7} height={9} rx={1}
                  fill={(['#C8907A','#90A8C8','#C4C880'] as string[])[i]} opacity={0.46}/>
              })}
            </>
          })()}

          {/* Barrel near workshop */}
          {(()=>{
            const barrel=blk(1.96,1.7,-0.02, 0.18,0.16,0.24)
            return <g opacity={0.68}><path d={barrel.L} fill={mTimb.L}/><path d={barrel.F} fill={mTimb.F}/><path d={barrel.T} fill={mTimb.T}/></g>
          })()}

          {/* Low stone wall — cottage B */}
          {(()=>{
            const wall=blk(2.06,2.5,-0.02, 0.04,0.76,0.18)
            return <g opacity={0.58}><path d={wall.L} fill={mStone.L}/><path d={wall.F} fill={mStone.F}/><path d={wall.T} fill={mStone.T}/></g>
          })()}

          {/* SETTLEMENT TREES */}
          {([
            {x:-1.4,y:1.0,h:1.3,r:24},{x:0.8,y:1.5,h:1.1,r:20},
            {x:2.4,y:1.3,h:1.2,r:22},{x:3.8,y:2.2,h:1.0,r:18},
            {x:-0.4,y:3.2,h:1.1,r:20},{x:4.4,y:0.6,h:1.2,r:22},
            {x:1.2,y:3.4,h:0.9,r:16},{x:-2.4,y:3.0,h:1.0,r:18},
          ] as {x:number;y:number;h:number;r:number}[]).map((nt,i)=>{
            const b=iso(nt.x,nt.y,0),c=iso(nt.x,nt.y,nt.h),bare=season==='winter'
            return (
              <g key={`mt${i}`} style={{animation:`tSway ${8+i*1.2}s ease-in-out infinite ${i*1.1}s`}}>
                <line x1={b.x} y1={b.y} x2={c.x} y2={c.y+nt.r*0.36} stroke={p.tr} strokeWidth={2.4+i%2} strokeLinecap="round"/>
                {!bare&&<>
                  <ellipse cx={c.x-5} cy={c.y+5}  rx={nt.r*0.76} ry={nt.r*0.62} fill={lM} opacity={0.72}/>
                  <ellipse cx={c.x}   cy={c.y}     rx={nt.r}      ry={nt.r*0.84} fill={`url(#tr${t})`}/>
                  <ellipse cx={c.x+7} cy={c.y-6}   rx={nt.r*0.58} ry={nt.r*0.46} fill={lH} opacity={0.58}/>
                </>}
                {bare&&[{dx:-10,dy:-17},{dx:0,dy:-22},{dx:10,dy:-17}].map((b2,bi)=>(
                  <line key={bi} x1={c.x} y1={c.y} x2={c.x+b2.dx} y2={c.y+b2.dy}
                    stroke={p.tr} strokeWidth={1.3} strokeLinecap="round" opacity={0.58}/>
                ))}
                {season==='spring'&&i%2===0&&[-7,4,10,-2].map((ox,si)=>(
                  <circle key={si} cx={c.x+ox} cy={c.y+(si%2===0?-3:6)} r={2.4} fill="#EEA0C8" opacity={0.68}/>
                ))}
                {season==='autumn'&&i%3===0&&<circle cx={c.x+10} cy={c.y+nt.r*0.82} r={3.2}
                  fill="#C25C1A" opacity={0.82}
                  style={{animation:`tLeaf ${3.6+i*0.8}s ease-in infinite ${i*0.56}s`}}/>}
              </g>
            )
          })}

          {/* POND */}
          <ellipse cx={pondC.x} cy={pondC.y+18} rx={72} ry={29} fill={p.gB} opacity={0.60}/>
          <ellipse cx={pondC.x} cy={pondC.y+16} rx={64} ry={25} fill="url(#pd)"/>
          <ellipse cx={pondC.x-12} cy={pondC.y+10} rx={44} ry={16} fill={p.ws} opacity={0.36}
            style={{animation:'tShimmer 5.6s ease-in-out infinite'}}/>
          <ellipse cx={pondC.x}  cy={pondC.y+16} rx={64} ry={25} fill="none" stroke={p.ws} strokeWidth="1.4" opacity={0.22}/>
          {wx==='rain'&&Array.from({length:5}).map((_,i)=>(
            <circle key={i} cx={pondC.x+(i-2)*12} cy={pondC.y+16+(i%2)*8} r={14}
              fill="none" stroke={p.ws} strokeWidth="0.9" opacity={0.48}
              style={{animation:`tRipple ${1.8+i*0.4}s ease-out infinite ${i*0.28}s`,transformBox:'fill-box',transformOrigin:'50% 50%'}}/>
          ))}
          {!isN&&[{ox:-22,oy:6},{ox:5,oy:-5},{ox:28,oy:9}].map((lpi,i)=>(
            <ellipse key={i} cx={pondC.x+lpi.ox} cy={pondC.y+16+lpi.oy} rx={7.5} ry={4.5} fill={p.lp} opacity={0.60}/>
          ))}
          {!isN&&(
            <g style={{animation:'tDuck 7.8s ease-in-out infinite'}} opacity={0.62}>
              <ellipse cx={pondC.x+10} cy={pondC.y+18} rx={9}   ry={4.5} fill={mPlstr.T}/>
              <circle  cx={pondC.x+20} cy={pondC.y+15} r={4.5}           fill={mPlstr.T}/>
              <circle  cx={pondC.x+23} cy={pondC.y+14} r={1.8}           fill="#E87C0E"/>
            </g>
          )}
          {isN&&[{x:-18,y:12},{x:8,y:8},{x:24,y:16},{x:-6,y:20}].map((sr,i)=>(
            <ellipse key={i} cx={pondC.x+sr.x} cy={pondC.y+sr.y} rx={3} ry={1.2}
              fill="rgba(200,215,240,0.58)" opacity={0.50}
              style={{animation:`tShimmer ${2.2+i*0.7}s ease-in-out infinite ${i*0.5}s`}}/>
          ))}

          {/* STREET LAMPS */}
          {[iso(0.40,1.0,0),iso(-0.50,0.54,0),iso(2.04,-0.24,0),iso(-1.0,0.40,0)].map((lp2,i)=>(
            <g key={i}>
              <rect x={lp2.x-1.2} y={lp2.y-30} width={2.4} height={30} rx={1.2} fill={mTimb.F} opacity={0.68}/>
              <rect x={lp2.x-5.5} y={lp2.y-38} width={12} height={13} rx={2.5}
                fill={p.glow?'#FFD855':mStone.T} opacity={p.glow?0.94:0.58}
                style={{animation:p.glow?'tLamp 3.2s ease-in-out infinite':'none'}}/>
              {p.glow&&<circle cx={lp2.x+0.5} cy={lp2.y-32} r={20} fill="#FFE080" opacity={0.13} filter="url(#gl)"/>}
            </g>
          ))}

          {/* AMBIENT LIFE */}
          {!isN&&<>
            <g style={{animation:'tBird 28s linear infinite 4s'}}>
              <path d="M0,0 Q4,-3.5 8,0 Q12,-3.5 16,0" stroke={p.wL} strokeWidth="1.6" fill="none" transform="translate(32,108)"/>
            </g>
            <g style={{animation:'tBird 40s linear infinite 15s'}} opacity={0.58}>
              <path d="M0,0 Q3,-2.5 6,0 Q9,-2.5 12,0" stroke={p.wL} strokeWidth="1.3" fill="none" transform="translate(68,86)"/>
            </g>
            <g style={{animation:'tBird 34s linear infinite 28s'}} opacity={0.44}>
              <path d="M0,0 Q2.5,-2 5,0 Q7.5,-2 10,0" stroke={p.wL} strokeWidth="1.1" fill="none" transform="translate(112,130)"/>
            </g>
            <g style={{animation:'tPerson 15s ease-in-out infinite'}} opacity={0.52}>
              {(()=>{const pp=iso(0.22,-0.7,0.20);return <circle cx={pp.x} cy={pp.y} r={2.6} fill={mPlstr.F}/>})()}
            </g>
            {season!=='winter'&&(
              <g style={{animation:'tButterfly 9s ease-in-out infinite 3s',transformBox:'fill-box',transformOrigin:'50% 50%'}} opacity={0.58}>
                {(()=>{
                  const bp=iso(-1.8,1.8,1.22)
                  return <>
                    <ellipse cx={bp.x-4} cy={bp.y} rx={5} ry={3.5} fill={season==='spring'?'#E8A8D8':'#D4C878'} opacity={0.78}/>
                    <ellipse cx={bp.x+4} cy={bp.y} rx={5} ry={3.5} fill={season==='spring'?'#E8A8D8':'#D4C878'} opacity={0.78}/>
                    <line x1={bp.x} y1={bp.y-3} x2={bp.x} y2={bp.y+3} stroke={p.wL} strokeWidth="1.0"/>
                  </>
                })()}
              </g>
            )}
          </>}

          {/* Fireflies at night */}
          {isN&&[
            {x:pondC.x+22,  y:pondC.y-12},
            {x:pondC.x-16,  y:pondC.y+2},
            {x:iso(-2.0,1.8,0).x+10, y:iso(-2.0,1.8,0).y-16},
            {x:iso(3.0,0.9,0).x-8,   y:iso(3.0,0.9,0).y-20},
            {x:iso(0.5,2.1,0).x+18,  y:iso(0.5,2.1,0).y-10},
            {x:iso(-0.8,1.8,0).x-12, y:iso(-0.8,1.8,0).y-8},
          ].map((ff,i)=>(
            <circle key={i} cx={ff.x} cy={ff.y} r={2.4}
              fill="#A8FFA6" opacity={0.76}
              style={{animation:`tFirefly ${2.2+i*0.66}s ease-in-out infinite ${i*1.08}s`,filter:'drop-shadow(0 0 7px #80EE82)'}}/>
          ))}

          {/* WEATHER */}
          {wx==='rain'&&<g opacity={0.54}>{Array.from({length:54}).map((_,i)=>{
            const rx2=(i*83+17)%390,ry2=(i*61+33)%310+110
            return <line key={i} x1={rx2} y1={ry2} x2={rx2+3} y2={ry2+22} stroke="#7CA8C0" strokeWidth="0.9"
              style={{animation:`tRain 0.96s linear infinite ${(i*0.053)%0.96}s`}}/>
          })}</g>}
          {wx==='snow'&&<g opacity={0.78}>{Array.from({length:40}).map((_,i)=>(
            <circle key={i} cx={(i*91+25)%390} cy={(i*73+49)%370+80}
              r={i%5===0?3.2:1.9} fill="white" opacity={0.86}
              style={{animation:`tSnow ${2.4+i%3}s ease-in infinite ${(i*0.21)%2.4}s`}}/>
          ))}</g>}
          {wx==='fog'&&<g opacity={0.28}>
            <rect x="0" y="144" width="390" height="450" fill="white" style={{filter:'blur(30px)'}}/>
            <rect x="0" y="256" width="390" height="240" fill="white" style={{filter:'blur(24px)'}}/>
          </g>}

          {/* ATMOSPHERE */}
          <rect width="390" height="722" fill="url(#vg)"/>
          <rect width="390" height="722" fill={p.tnt}/>
          <rect x="0" y={CY-78} width="390" height="156" fill={p.hz} opacity={0.06} style={{filter:'blur(26px)'}}/>
        </svg>
      </div>

      {/* UI CHROME */}
      <div style={{position:'absolute',inset:0,zIndex:10,display:'flex',flexDirection:'column',justifyContent:'space-between',pointerEvents:'none'}}>
        <div style={{padding:'14px 22px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <h2 style={{fontFamily:"'Lora', Georgia, serif",fontSize:22,fontWeight:400,margin:0,letterSpacing:'-0.02em',color:p.txt,textShadow:isD?'0 1px 14px rgba(0,0,0,0.60)':'none'}}>
            Your Town
          </h2>
          <div style={{display:'flex',gap:8,pointerEvents:'auto'}}>
            <button onClick={()=>{setBlend(true);setTimeout(()=>{setTIdx(i=>(i+1)%TIMES.length);setBlend(false)},330)}}
              style={{background:'rgba(255,255,255,0.13)',backdropFilter:'blur(12px)',border:'1px solid rgba(255,255,255,0.11)',borderRadius:20,padding:'5px 11px',cursor:'pointer',display:'flex',alignItems:'center',gap:6}}>
              <span style={{fontSize:13}}>{t==='dawn'?'🌅':t==='morning'?'🌤':t==='afternoon'?'☀️':t==='sunset'?'🌇':t==='bluehour'?'🌆':'🌙'}</span>
              <span style={{fontSize:10,color:p.txt,letterSpacing:'0.06em',textTransform:'capitalize',fontFamily:"'DM Sans', system-ui, sans-serif"}}>{t==='bluehour'?'blue hour':t}</span>
            </button>
            <button onClick={()=>{const wxList:Wx[]=['clear','rain','fog','snow'];setWx(w=>wxList[(wxList.indexOf(w)+1)%wxList.length])}}
              style={{background:'rgba(255,255,255,0.13)',backdropFilter:'blur(12px)',border:'1px solid rgba(255,255,255,0.11)',borderRadius:20,padding:'5px 10px',cursor:'pointer',fontSize:14}}>
              {wx==='clear'?'☀':wx==='rain'?'🌧':wx==='fog'?'🌫':'❄'}
            </button>
          </div>
        </div>
        <div style={{padding:'0 0 22px',textAlign:'center'}}>
          <p style={{fontSize:10,margin:0,fontFamily:"'Lora', Georgia, serif",fontStyle:'italic',color:p.txt,opacity:0.25,letterSpacing:'0.05em'}}>{season}</p>
        </div>
      </div>
    </div>
  )
}


// ─── Screen 5: Goal Detail ────────────────────────────────────────────────────

function GoalScreen({ onBack }: { onBack: () => void }) {
  const milestones = [
    { label: 'Chapters 1–5 complete', done: true },
    { label: 'Character arcs mapped', done: true },
    { label: 'Act II drafted', done: false },
    { label: 'Full draft complete', done: false },
  ]
  const memories = [
    { date: 'Jul 3', text: 'Wrote 2,000 words in one sitting. The scene in the kitchen finally clicked.' },
    { date: 'Jun 18', text: 'Started the outline. Felt nervous and excited in equal measure.' },
  ]

  return (
    <div className="no-scrollbar" style={{ flex: 1, overflowY: 'auto', background: C.paper }}>

      {/* Dark hero — more generous */}
      <div style={{ background: C.charcoal, padding: '18px 36px 36px' }}>
        <button
          onClick={onBack}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: C.stone,
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            padding: 0,
            fontSize: 13,
            marginBottom: 30,
            letterSpacing: '0.01em',
          }}
        >
          <ChevronLeft />
          Today
        </button>

        <p style={label({ color: C.stone, marginBottom: 12 })}>Writing</p>

        <h1 style={{
          fontFamily: "'Lora', Georgia, serif",
          fontSize: 38,
          fontWeight: 400,
          color: C.warmWhite,
          margin: '0 0 18px',
          lineHeight: 1.15,
          letterSpacing: '-0.025em',
        }}>
          Finish the<br />novel draft
        </h1>

        <p style={{
          fontSize: 14,
          color: C.stone,
          fontStyle: 'italic',
          fontFamily: "'Lora', Georgia, serif",
          margin: '0 0 28px',
          lineHeight: 1.65,
          fontWeight: 400,
        }}>
          "Because there's a story only I can tell, and it deserves to exist in the world."
        </p>

        <div style={{ marginTop: 28 }}>
          <div style={{ height: 2, background: 'rgba(255,255,255,0.1)', borderRadius: 1, overflow: 'hidden', marginBottom: 12 }}>
            <div style={{ height: '100%', width: '34%', background: C.sky, borderRadius: 1 }} />
          </div>
          <p style={{ fontSize: 13, color: C.stone, margin: 0, fontWeight: 300 }}>14 weeks remaining · By Oct 31</p>
        </div>
      </div>

      {/* The journey — no box chrome, just text + dot markers */}
      <div style={{ padding: '36px 36px 0' }}>
        <p style={label({ marginBottom: 20 })}>Along the way</p>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {milestones.map((m, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 16,
              paddingBottom: 20,
              position: 'relative',
            }}>
              {/* Vertical line between dots */}
              {i < milestones.length - 1 && (
                <div style={{
                  position: 'absolute',
                  left: 8,
                  top: 20,
                  width: 1,
                  height: 'calc(100% - 8px)',
                  background: m.done ? C.mossLight : C.border,
                }} />
              )}
              <div style={{
                width: 17,
                height: 17,
                borderRadius: '50%',
                background: m.done ? C.moss : 'transparent',
                border: `1.5px solid ${m.done ? C.moss : C.stone}`,
                flexShrink: 0,
                marginTop: 2,
                position: 'relative',
                zIndex: 1,
                transition: 'all 0.25s',
              }} />
              <span style={{
                fontSize: 15,
                color: m.done ? C.clay : C.charcoal,
                fontWeight: 300,
                lineHeight: 1.5,
                textDecoration: m.done ? 'line-through' : 'none',
                transition: 'color 0.25s',
              }}>
                {m.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Future landmark — clean, aspirational */}
      <div style={{ padding: '8px 36px 0' }}>
        <p style={label({ marginBottom: 18 })}>Where this leads</p>
        <p style={{
          fontFamily: "'Lora', Georgia, serif",
          fontSize: 16,
          fontStyle: 'italic',
          fontWeight: 400,
          color: C.charcoal,
          lineHeight: 1.65,
          margin: 0,
          paddingLeft: 18,
          borderLeft: `2px solid ${C.sky}70`,
        }}>
          The Library — a landmark in your Town, built when this draft is complete.
        </p>
      </div>

      {/* Memories — no header, just dates and text */}
      <div style={{ padding: '32px 36px 40px' }}>
        <p style={label({ marginBottom: 20 })}>Memories</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {memories.map((m, i) => (
            <div key={i} style={{
              paddingBottom: i < memories.length - 1 ? 24 : 0,
              borderBottom: i < memories.length - 1 ? `1px solid ${C.border}` : 'none',
              marginBottom: i < memories.length - 1 ? 24 : 0,
            }}>
              <p style={{ fontSize: 11, color: C.stone, margin: '0 0 8px', letterSpacing: '0.04em' }}>{m.date}</p>
              <p style={{
                fontSize: 15,
                color: C.charcoal,
                fontStyle: 'italic',
                fontFamily: "'Lora', Georgia, serif",
                margin: 0,
                lineHeight: 1.65,
                fontWeight: 400,
              }}>
                "{m.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Screen 6: Reflect ────────────────────────────────────────────────────────

function ReflectScreen() {
  const [question, setQuestion] = useState(0)
  const questions = [
    { prompt: 'What felt most meaningful this week?', placeholder: 'Even a small thing counts…' },
    { prompt: 'What did you make space for that you\'re proud of?', placeholder: 'Something you chose…' },
    { prompt: 'What would you do differently?', placeholder: 'Gently, without judgment…' },
  ]
  const [answers, setAnswers] = useState(['', '', ''])

  // Themes as text phrases — not bars
  const themes = [
    'Being present with the people you love',
    'Creating something that might outlast you',
    'Choosing rest without guilt',
  ]

  return (
    <div className="no-scrollbar" style={{ flex: 1, overflowY: 'auto', background: C.paper }}>

      {/* Header */}
      <div style={{ padding: '22px 36px 0' }}>
        <p style={{
          fontFamily: "'Lora', Georgia, serif",
          fontSize: 13,
          fontStyle: 'italic',
          color: C.clay,
          margin: '0 0 6px',
        }}>
          Week of July 14
        </p>
        <h2 style={{
          fontFamily: "'Lora', Georgia, serif",
          fontSize: 34,
          fontWeight: 400,
          color: C.charcoal,
          margin: '0 0 36px',
          letterSpacing: '-0.025em',
          lineHeight: 1.1,
        }}>
          Reflect
        </h2>

      </div>

      {/* Themes as quiet phrases — not a dashboard */}
      <div style={{ padding: '0 36px 36px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {themes.map((t, i) => (
            <p key={i} style={{
              fontSize: 15,
              color: C.charcoal,
              fontFamily: "'Lora', Georgia, serif",
              fontStyle: 'italic',
              fontWeight: 400,
              margin: 0,
              lineHeight: 1.6,
              paddingBottom: i < themes.length - 1 ? 14 : 0,
              borderBottom: i < themes.length - 1 ? `1px solid ${C.border}` : 'none',
              marginBottom: i < themes.length - 1 ? 14 : 0,
            }}>
              {t}
            </p>
          ))}
        </div>
      </div>

      {/* Questions */}
      <div style={{ padding: '0 36px' }}>

        {/* Dot stepper — very minimal */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24, alignItems: 'center' }}>
          {questions.map((_, i) => (
            <button
              key={i}
              onClick={() => setQuestion(i)}
              style={{
                width: i === question ? 20 : 6,
                height: 6,
                borderRadius: 3,
                background: i === question ? C.charcoal : i < question ? C.moss : C.border,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: 0,
              }}
            />
          ))}
        </div>

        {/* Question + answer — open, spacious */}
        <div key={question} style={{ marginBottom: 18, animation: 'aFadeUp 0.46s cubic-bezier(0.22, 1, 0.36, 1) both' }}>
          <p style={{
            fontFamily: "'Lora', Georgia, serif",
            fontSize: 19,
            fontWeight: 400,
            fontStyle: 'italic',
            color: C.charcoal,
            margin: '0 0 20px',
            lineHeight: 1.5,
            letterSpacing: '-0.01em',
          }}>
            {questions[question].prompt}
          </p>
          <textarea
            value={answers[question]}
            onChange={e => {
              const next = [...answers]
              next[question] = e.target.value
              setAnswers(next)
            }}
            placeholder={questions[question].placeholder}
            rows={4}
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              borderBottom: `1px solid ${C.border}`,
              outline: 'none',
              resize: 'none',
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: 16,
              fontWeight: 300,
              color: C.charcoal,
              lineHeight: 1.7,
              paddingBottom: 14,
            }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 36 }}>
          {question > 0 ? (
            <button
              onClick={() => setQuestion(q => q - 1)}
              style={{
                background: 'none',
                border: 'none',
                padding: '10px 0',
                fontSize: 14,
                color: C.clay,
                cursor: 'pointer',
                fontFamily: "'Lora', Georgia, serif",
                fontStyle: 'italic',
              }}
            >
              ← Previous
            </button>
          ) : <div />}

          {question < questions.length - 1 ? (
            <button
              onClick={() => setQuestion(q => q + 1)}
              style={{
                background: 'none',
                border: 'none',
                padding: '8px 0',
                fontSize: 14,
                color: C.charcoal,
                cursor: 'pointer',
                fontFamily: "'Lora', Georgia, serif",
                fontStyle: 'italic',
                letterSpacing: '0.01em',
              }}
            >
              Continue →
            </button>
          ) : (
            <button
              style={{
                background: 'none',
                border: 'none',
                padding: '8px 0',
                fontSize: 14,
                color: C.moss,
                cursor: 'pointer',
                fontFamily: "'Lora', Georgia, serif",
                fontStyle: 'italic',
              }}
            >
              Save →
            </button>
          )}
        </div>
      </div>

      {/* Week memory — anchor at the bottom */}
      <div style={{ margin: '0 36px 36px', background: C.charcoal, borderRadius: 18, padding: '22px 22px', animation: 'aFadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.22s both' }}>
        <p style={label({ color: C.stone, marginBottom: 10 })}>A moment from this week</p>
        <p style={{
          fontFamily: "'Lora', Georgia, serif",
          fontSize: 15,
          fontStyle: 'italic',
          color: '#D8D0C4',
          margin: 0,
          lineHeight: 1.7,
          fontWeight: 400,
        }}>
          "Tuesday evening walk. The air smelled like rain and cut grass. Felt genuinely present for the first time in weeks."
        </p>
      </div>
    </div>
  )
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function SunIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.4" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map(a => (
        <line key={a}
          x1={10 + Math.cos(a * Math.PI / 180) * 5.8} y1={10 + Math.sin(a * Math.PI / 180) * 5.8}
          x2={10 + Math.cos(a * Math.PI / 180) * 8.2} y2={10 + Math.sin(a * Math.PI / 180) * 8.2}
          stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      ))}
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10 6.5V13.5M6.5 10H13.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

function TownIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M2 17L2 9L6.5 5.5L11 9L11 17" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M11 17L11 12L18 12L18 17" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M11 12L14.5 8.5L18 12" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M2 17H18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M16.5 13A7 7 0 0 1 8 4.5a7 7 0 1 0 8.5 8.5Z"
        stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  )
}

function MicIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="7.5" y="1.5" width="5" height="10" rx="2.5" stroke={color} strokeWidth="1.4" />
      <path d="M4 9.5c0 3.3 2.7 6 6 6s6-2.7 6-6" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      <line x1="10" y1="15.5" x2="10" y2="19" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

function TextIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M4 6H16M4 10H14M4 14H11" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

function ChevronLeft() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M9 3L5 7L9 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function SignalIcon() {
  return (
    <svg width="15" height="11" viewBox="0 0 15 11" fill="currentColor">
      <rect x="0" y="7.5" width="2.5" height="3.5" rx="0.5" />
      <rect x="4" y="4.5" width="2.5" height="6.5" rx="0.5" />
      <rect x="8" y="1.5" width="2.5" height="9.5" rx="0.5" />
      <rect x="12" y="0" width="2.5" height="11" rx="0.5" opacity="0.25" />
    </svg>
  )
}

function WifiIcon() {
  return (
    <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
      <path d="M0.5 4C3 1.5 12 1.5 14.5 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M3 6.5C4.7 5 10.3 5 12 6.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M5.5 9C6.3 8.3 8.7 8.3 9.5 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="7.5" cy="10.8" r="0.9" fill="currentColor" />
    </svg>
  )
}

function BatteryIcon() {
  return (
    <svg width="21" height="11" viewBox="0 0 21 11" fill="currentColor">
      <rect x="0.5" y="0.5" width="17" height="10" rx="2.5" stroke="currentColor" strokeWidth="0.9" fill="none" />
      <rect x="2" y="2" width="13" height="7" rx="1.5" />
      <path d="M18.5 3.5V7.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState<Screen>('launch')

  return (
    <div style={{
      minHeight: '100dvh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0C0B09',
      padding: '20px',
      fontFamily: "'DM Sans', system-ui, sans-serif",
    }}>
      <PhoneFrame screen={screen} onNav={setScreen}>
        {screen === 'launch' && <LaunchScreen onComplete={() => setScreen('today')} />}
        {screen === 'capture' && <CaptureScreen />}
        {screen === 'today' && <TodayScreen onGoalTap={() => setScreen('goal')} />}
        {screen === 'town' && <TownScreen />}
        {screen === 'goal' && <GoalScreen onBack={() => setScreen('today')} />}
        {screen === 'reflect' && <ReflectScreen />}
      </PhoneFrame>
    </div>
  )
}
