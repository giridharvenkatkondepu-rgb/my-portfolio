import { useState, useEffect, useRef } from "react";

const skills = [
  { cat: "Languages", title: "Programming", tags: ["Java", "SQL", "JavaScript", "Python"],
    detail: "Java is my primary language — 5+ years of production experience in enterprise backends, APIs, and batch systems." },
  { cat: "Frameworks", title: "Spring Ecosystem", tags: ["Spring Boot", "Spring MVC", "Spring Security", "Spring Batch", "Hibernate", "JPA"],
    detail: "Deep expertise across the Spring ecosystem — from secure REST APIs to batch jobs over 100+ GB healthcare datasets." },
  { cat: "Messaging", title: "Event Streaming", tags: ["Apache Kafka", "RESTful APIs", "Feign Client", "Swagger / OpenAPI"],
    detail: "Built Kafka event-driven pipelines processing millions of events daily, achieving a 40% reduction in system latency." },
  { cat: "Databases", title: "Data Storage", tags: ["MySQL", "PostgreSQL", "Oracle", "MongoDB", "Redis"],
    detail: "Proficient across relational and NoSQL databases. Leveraged Redis caching to cut API response times by ~30%." },
  { cat: "Cloud", title: "AWS & DevOps", tags: ["EC2", "S3", "RDS", "Lambda", "ECS", "Fargate", "Docker", "Kubernetes", "Terraform"],
    detail: "Deployed auto-scaling microservices on AWS ECS maintaining 99.9% uptime under peak production loads." },
  { cat: "Observability", title: "Monitoring", tags: ["ELK Stack", "Prometheus", "Grafana", "Splunk", "Dynatrace"],
    detail: "Built centralised observability pipelines that dramatically reduced incident detection and mean time to resolution." },
  { cat: "CI/CD & QA", title: "Build & Testing", tags: ["Jenkins", "GitHub Actions", "Maven", "Gradle", "JUnit 5", "Mockito", "TestNG"],
    detail: "End-to-end CI/CD ownership from commit to production. Strong testing culture with unit and integration coverage." },
  { cat: "Security", title: "Auth & Compliance", tags: ["OAuth2", "JWT", "MFA", "HIPAA"],
    detail: "Implemented OAuth2 + JWT across HIPAA-compliant healthcare systems and MFA for financial applications." },
];

const experiences = [
  {
    company: "HCA Healthcare", role: "Senior Java Developer", period: "Feb 2024 – Present",
    detail: "Leading backend engineering for one of the largest US healthcare systems, with direct impact on patient outcomes through reliable, scalable technology.",
    bullets: [
      { text: "Led Spring Boot microservices for patient scheduling & healthcare records serving ", highlight: "10K+ daily users", suffix: "." },
      { text: "Owned REST APIs handling ", highlight: "50K+ healthcare transactions/day", suffix: " in a HIPAA-compliant environment." },
      { text: "Built Kafka event-driven pipelines processing millions of events daily — reduced latency by ", highlight: "~40%", suffix: "." },
      { text: "Optimised APIs with Redis caching & async processing — cut response times by ", highlight: "~30%", suffix: "." },
      { text: "Deployed microservices on AWS ECS with auto-scaling, maintaining ", highlight: "99.9% uptime", suffix: "." },
      { text: "Implemented OAuth2 + JWT auth; designed Spring Batch jobs processing ", highlight: "100+ GB", suffix: " healthcare datasets." },
    ],
  },
  {
    company: "ICICI Bank", role: "Java Developer", period: "Dec 2021 – Aug 2023",
    detail: "Modernised core banking infrastructure at one of India's leading private banks — from monolith to microservices, and from batch to real-time fraud detection.",
    bullets: [
      { text: "Led backend for credit card & payment systems across ", highlight: "millions of users", suffix: "." },
      { text: "Built Kafka real-time pipelines processing ", highlight: "100K+ transactions/day", suffix: "; improved fraud detection by ", highlight2: "~35%", suffix2: "." },
      { text: "Owned full migration of monolithic applications to microservices architecture.", highlight: "", suffix: "" },
      { text: "Designed OAuth2 + MFA authentication for sensitive financial applications.", highlight: "", suffix: "" },
      { text: "Automated billing & interest batch workflows, reducing manual effort and errors.", highlight: "", suffix: "" },
      { text: "Maintained ", highlight: "~99.8% uptime", suffix: " across cloud-based production environments." },
    ],
  },
  {
    company: "Tata Consultancy Services", role: "Java Developer", period: "Dec 2020 – Dec 2021",
    detail: "Built enterprise backend systems for Cisco's network monitoring ecosystem, establishing core skills in performance optimisation and CI/CD.",
    bullets: [
      { text: "Developed REST APIs for network monitoring platforms within the Cisco ecosystem.", highlight: "", suffix: "" },
      { text: "Processed real-time telemetry data streams using Kafka for faster alerting.", highlight: "", suffix: "" },
      { text: "Optimised DB queries & implemented multithreading — reduced response time by ", highlight: "~30%", suffix: "." },
      { text: "Contributed to CI/CD automation via Jenkins, improving deployment speed and reliability.", highlight: "", suffix: "" },
    ],
  },
];

const achievements = [
  { icon: "⚡", val: "40%",    desc: "Latency cut via Kafka pipelines at HCA Healthcare" },
  { icon: "🚀", val: "30%",    desc: "API response time improved with Redis caching" },
  { icon: "🛡️", val: "99.9%", desc: "Uptime on AWS ECS production systems" },
  { icon: "🏦", val: "35%",    desc: "Faster fraud detection at ICICI Bank" },
  { icon: "📦", val: "100GB+", desc: "Healthcare datasets via Spring Batch" },
  { icon: "🔥", val: "50K+",   desc: "Healthcare API transactions per day" },
  { icon: "💳", val: "100K+",  desc: "Financial transactions processed daily" },
  { icon: "👥", val: "10K+",   desc: "Daily users across distributed microservices" },
];

const certs = [
  { icon: "🔧", bg: "#e5f4fd", name: "ServiceNow Certified System Administrator (CSA)",           detail: "Validated platform administration and configuration expertise." },
  { icon: "☁️", bg: "#fff4e5", name: "AWS Academy Cloud Foundations",                             detail: "Foundational knowledge across core AWS services and cloud concepts." },
  { icon: "🏛️", bg: "#fdecea", name: "Oracle Cloud Infrastructure Developer Certified Associate",  detail: "Certified in building and deploying apps on Oracle Cloud Infrastructure." },
  { icon: "🌐", bg: "#e5f5f3", name: "Aviatrix Certified Multi-Cloud Networking Associate",        detail: "Multi-cloud networking expertise across AWS, Azure, and GCP." },
  { icon: "📊", bg: "#e8f0fe", name: "Google Cloud Certified Professional Data Engineer",          detail: "Professional-level GCP data pipeline design and implementation." },
  { icon: "🤖", bg: "#f3e8ff", name: "Automation Anywhere Certified Essentials RPA Professional", detail: "Certified in RPA fundamentals using Automation Anywhere." },
];

function useFadeIn() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.style.opacity = "1"; el.style.transform = "translateY(0)"; observer.unobserve(el); } },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function Modal({ title, body, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div onClick={onClose} style={styles.overlay}>
      <div onClick={(e) => e.stopPropagation()} style={styles.modal}>
        <button onClick={onClose} style={styles.modalX}>✕</button>
        <h3 style={styles.modalTitle}>{title}</h3>
        <p style={styles.modalBody}>{body}</p>
      </div>
    </div>
  );
}

function FadeCard({ children, style = {}, onClick }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.style.opacity = "1"; el.style.transform = "translateY(0)"; observer.unobserve(el); } },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} onClick={onClick} style={{ opacity: 0, transform: "translateY(14px)", transition: "opacity 0.42s ease, transform 0.42s ease", ...style }}>
      {children}
    </div>
  );
}

function Bullet({ item }) {
  return (
    <li style={styles.bullet}>
      <span style={styles.bulletDash}>–</span>
      <span>
        {item.text}
        {item.highlight && <strong style={styles.num}>{item.highlight}</strong>}
        {item.suffix}
        {item.highlight2 && <strong style={styles.num}>{item.highlight2}</strong>}
        {item.suffix2}
      </span>
    </li>
  );
}

export default function App() {
  const [modal, setModal] = useState(null);
  const [hoveredNav, setHoveredNav] = useState(null);

  const openModal = (title, body) => setModal({ title, body });
  const closeModal = () => setModal(null);
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div style={styles.root}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />

      {modal && <Modal title={modal.title} body={modal.body} onClose={closeModal} />}

      {/* Topbar */}
      <header style={styles.topbar}>
        <div style={styles.topbarLogo}>Giridhar Venkat K.</div>
        <nav style={styles.topbarNav}>
          {["skills", "experience", "achievements", "certifications"].map((id) => (
            <button key={id} onClick={() => scrollTo(id)}
              onMouseEnter={() => setHoveredNav(id)} onMouseLeave={() => setHoveredNav(null)}
              style={{ ...styles.navLink, color: hoveredNav === id ? "#1a9e8f" : "#3d566e" }}>
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </button>
          ))}
          <button onClick={() => scrollTo("contact")} style={styles.navCta}>Contact</button>
        </nav>
      </header>

      {/* Hero */}
      <div style={styles.heroWrap}>
        <div style={styles.hero}>
          <div style={styles.heroLeft}>
            <div style={styles.heroEyebrow}>Senior Java Developer</div>
            <h1 style={styles.heroName}>Giridhar Venkat<br />Kondepu</h1>
            <p style={styles.heroRole}>
              Backend Engineer &nbsp;·&nbsp; <strong style={{ color: "#1e2d40", fontWeight: 600 }}>Healthcare & Fintech</strong> &nbsp;·&nbsp; Cloud
            </p>
            <p style={styles.heroBio}>
              5+ years building production-grade backend systems that handle millions of transactions daily.
              Specialising in Java, Spring Boot, Kafka, and AWS — with deep experience in HIPAA-compliant
              healthcare platforms and high-volume financial infrastructure.
            </p>
            <div style={styles.heroActions}>
              <a href="mailto:giridharvenkatkondepu@gmail.com" style={styles.btnDark}>✉ Email Me</a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={styles.btnGhost}>↗ LinkedIn</a>
              <a href="tel:+14705305381" style={styles.btnGhost}>📞 (470) 530-5381</a>
            </div>
          </div>

          <div style={styles.heroStats}>
            {[
              { num: "5+", label: "Years Exp" },
              { num: "50K+", label: "Txns / Day" },
              { num: "40%", label: "Latency Cut" },
              { num: "99.9%", label: "Uptime" },
            ].map((s, i) => (
              <div key={i}>
                {i > 0 && <div style={styles.statDiv} />}
                <div style={styles.stat}>
                  <span style={styles.statNum}>{s.num}</span>
                  <span style={styles.statLabel}>{s.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Skills */}
      <section id="skills" style={styles.sectionWhite}>
        <div style={styles.wrapper}>
          <div style={styles.secLabel}>What I Work With</div>
          <h2 style={styles.secTitle}>Technical Skills</h2>
          <div style={styles.skillsGrid}>
            {skills.map((s, i) => <SkillCard key={i} skill={s} onClick={() => openModal(s.title, s.detail)} />)}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" style={styles.sectionSnow}>
        <div style={styles.wrapper}>
          <div style={styles.secLabel}>Career</div>
          <h2 style={styles.secTitle}>Professional Experience</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
            {experiences.map((e, i) => <ExpCard key={i} exp={e} onClick={() => openModal(e.company, e.detail)} />)}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section id="achievements" style={styles.sectionWhite}>
        <div style={styles.wrapper}>
          <div style={styles.secLabel}>By The Numbers</div>
          <h2 style={styles.secTitle}>Measurable Impact</h2>
          <div style={styles.achGrid}>
            {achievements.map((a, i) => <AchCard key={i} ach={a} onClick={() => openModal(`${a.val} — Impact`, a.desc)} />)}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section id="certifications" style={styles.sectionSnow}>
        <div style={styles.wrapper}>
          <div style={styles.secLabel}>Education & Credentials</div>
          <h2 style={styles.secTitle}>Certifications</h2>
          <FadeCard style={styles.eduCard}>
            <div style={styles.eduIcon}>🎓</div>
            <div>
              <div style={styles.eduSchool}>Kennesaw State University</div>
              <div style={styles.eduDeg}>Master of Science in Computer Science</div>
            </div>
            <div style={styles.eduPeriod}>Aug 2023 – Dec 2024</div>
          </FadeCard>
          <div style={styles.certsGrid}>
            {certs.map((c, i) => <CertCard key={i} cert={c} onClick={() => openModal(c.name, c.detail)} />)}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" style={styles.contactSection}>
        <div style={styles.contactInner}>
          <div style={{ ...styles.secLabel, justifyContent: "center", color: "#1a9e8f" }}>Get In Touch</div>
          <h2 style={{ ...styles.secTitle, color: "#ffffff", marginBottom: "0.9rem" }}>Let's Work Together</h2>
          <p style={styles.contactDesc}>
            Open to Senior Backend, Tech Lead, and Cloud Architecture roles — particularly in healthcare,
            fintech, or teams building high-throughput distributed systems.
          </p>
          <div style={styles.contactLinks}>
            <a href="mailto:giridharvenkatkondepu@gmail.com" style={styles.btnWhite}>✉ Send an Email</a>
            <a href="tel:+14705305381" style={styles.btnOutlineW}>📞 (470) 530-5381</a>
          </div>
        </div>
      </section>

      <footer style={styles.footer}>© 2025 Giridhar Venkat Kondepu — Senior Java Developer</footer>
    </div>
  );
}

function SkillCard({ skill, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <FadeCard onClick={onClick}>
      <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
        style={{ ...styles.skillCard, ...(hovered ? styles.skillCardHover : {}) }}>
        <div style={styles.skillCat}>{skill.cat}</div>
        <h3 style={styles.skillTitle}>{skill.title}</h3>
        <div style={styles.tags}>
          {skill.tags.map((t, i) => <span key={i} style={styles.tag}>{t}</span>)}
        </div>
      </div>
    </FadeCard>
  );
}

function ExpCard({ exp, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <FadeCard onClick={onClick}>
      <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
        style={{ ...styles.expCard, boxShadow: hovered ? "0 4px 22px rgba(15,27,45,0.10)" : "none" }}>
        <div style={{ ...styles.expAccent, background: hovered ? "#1a9e8f" : "#dde8f0" }} />
        <div style={styles.expTop}>
          <div>
            <div style={styles.expCompany}>{exp.company}</div>
            <div style={styles.expRole}>{exp.role}</div>
          </div>
          <span style={styles.expPeriod}>{exp.period}</span>
        </div>
        <ul style={styles.bulletList}>
          {exp.bullets.map((b, i) => <Bullet key={i} item={b} />)}
        </ul>
      </div>
    </FadeCard>
  );
}

function AchCard({ ach, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <FadeCard onClick={onClick}>
      <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
        style={{ ...styles.achCard, ...(hovered ? styles.achCardHover : {}) }}>
        <span style={styles.achIcon}>{ach.icon}</span>
        <span style={styles.achVal}>{ach.val}</span>
        <span style={styles.achDesc}>{ach.desc}</span>
      </div>
    </FadeCard>
  );
}

function CertCard({ cert, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <FadeCard onClick={onClick}>
      <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
        style={{ ...styles.certCard, ...(hovered ? styles.certCardHover : {}) }}>
        <div style={{ ...styles.certBadge, background: cert.bg }}>{cert.icon}</div>
        <div style={styles.certName}>{cert.name}</div>
      </div>
    </FadeCard>
  );
}

const styles = {
  root: { fontFamily: "'Plus Jakarta Sans', sans-serif", background: "#f5f8fb", color: "#1e2d40", fontSize: "15px", lineHeight: 1.7, WebkitFontSmoothing: "antialiased" },

  topbar: { position: "sticky", top: 0, zIndex: 100, background: "rgba(255,255,255,0.94)", backdropFilter: "blur(12px)", borderBottom: "1px solid #dde8f0", padding: "0 2.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: "60px" },
  topbarLogo: { fontFamily: "'Playfair Display', serif", fontSize: "1.05rem", color: "#0f1b2d" },
  topbarNav: { display: "flex", gap: "2rem", alignItems: "center" },
  navLink: { background: "none", border: "none", fontSize: "0.77rem", fontWeight: 500, letterSpacing: "0.07em", textTransform: "uppercase", cursor: "pointer", transition: "color 0.2s", fontFamily: "'Plus Jakarta Sans', sans-serif" },
  navCta: { background: "#0f1b2d", color: "#fff", padding: "0.42rem 1.1rem", borderRadius: "6px", fontSize: "0.74rem", fontWeight: 600, border: "none", cursor: "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif" },

  heroWrap: { background: "#ffffff", borderBottom: "1px solid #dde8f0" },
  hero: { maxWidth: "1080px", margin: "0 auto", padding: "0 2.5rem 3rem", display: "grid", gridTemplateColumns: "1fr auto", gap: "4rem", alignItems: "center" },
  heroLeft: { display: "flex", flexDirection: "column" },
  heroEyebrow: { display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#1a9e8f", marginBottom: "1.1rem" },
  heroName: { fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.4rem, 5vw, 3.8rem)", fontWeight: 800, lineHeight: 1.08, color: "#0f1b2d", letterSpacing: "-0.02em", marginBottom: "0.55rem" },
  heroRole: { fontSize: "1rem", fontWeight: 300, color: "#3d566e", marginBottom: "1.5rem" },
  heroBio: { fontSize: "0.87rem", color: "#3d566e", maxWidth: "510px", lineHeight: 1.85, marginBottom: "2rem" },
  heroActions: { display: "flex", gap: "0.7rem", flexWrap: "wrap" },
  heroStats: { background: "#f5f8fb", border: "1px solid #dde8f0", borderRadius: "12px", padding: "2rem 2.2rem", display: "flex", flexDirection: "column", gap: "1.6rem", minWidth: "195px" },
  stat: { textAlign: "center" },
  statNum: { fontFamily: "'Playfair Display', serif", fontSize: "1.9rem", fontWeight: 700, color: "#0f1b2d", display: "block", lineHeight: 1 },
  statLabel: { fontSize: "0.66rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8fa3b8", display: "block", marginTop: "0.3rem" },
  statDiv: { height: "1px", background: "#dde8f0" },

  btnDark: { display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.62rem 1.4rem", borderRadius: "8px", fontSize: "0.79rem", fontWeight: 600, background: "#0f1b2d", color: "#fff", textDecoration: "none", transition: "all 0.2s" },
  btnGhost: { display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.62rem 1.4rem", borderRadius: "8px", fontSize: "0.79rem", fontWeight: 600, background: "transparent", color: "#1e2d40", border: "1.5px solid #dde8f0", textDecoration: "none", transition: "all 0.2s" },
  btnWhite: { display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.62rem 1.4rem", borderRadius: "8px", fontSize: "0.79rem", fontWeight: 600, background: "#ffffff", color: "#0f1b2d", textDecoration: "none", transition: "all 0.2s" },
  btnOutlineW: { display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.62rem 1.4rem", borderRadius: "8px", fontSize: "0.79rem", fontWeight: 600, background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.3)", textDecoration: "none", transition: "all 0.2s" },

  sectionWhite: { background: "#ffffff", borderBottom: "1px solid #dde8f0" },
  sectionSnow: { background: "#f5f8fb", borderBottom: "1px solid #dde8f0" },
  wrapper: { maxWidth: "1080px", margin: "0 auto", padding: "5rem 2.5rem" },
  secLabel: { fontSize: "0.67rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#1a9e8f", display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.45rem" },
  secTitle: { fontFamily: "'Playfair Display', serif", fontSize: "2.1rem", fontWeight: 700, color: "#0f1b2d", marginBottom: "2.5rem", lineHeight: 1.15 },

  skillsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(238px, 1fr))", gap: "1rem" },
  skillCard: { background: "#f5f8fb", border: "1px solid #dde8f0", borderRadius: "12px", padding: "1.35rem 1.5rem", cursor: "pointer", transition: "all 0.22s" },
  skillCardHover: { borderColor: "#1a9e8f", boxShadow: "0 4px 18px rgba(15,27,45,0.10)", transform: "translateY(-3px)", background: "#ffffff" },
  skillCat: { fontSize: "0.63rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#1a9e8f", marginBottom: "0.35rem" },
  skillTitle: { fontSize: "0.93rem", fontWeight: 700, color: "#0f1b2d", marginBottom: "0.85rem" },
  tags: { display: "flex", flexWrap: "wrap", gap: "0.3rem" },
  tag: { fontSize: "0.65rem", fontWeight: 500, padding: "0.2rem 0.55rem", borderRadius: "4px", background: "#dde8f0", color: "#3d566e" },

  expCard: { background: "#ffffff", border: "1px solid #dde8f0", borderRadius: "12px", padding: "1.8rem 2rem", cursor: "pointer", transition: "all 0.22s", position: "relative", overflow: "hidden" },
  expAccent: { position: "absolute", left: 0, top: 0, bottom: 0, width: "3px", transition: "background 0.2s" },
  expTop: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", flexWrap: "wrap", marginBottom: "1.1rem" },
  expCompany: { fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 700, color: "#0f1b2d" },
  expRole: { fontSize: "0.78rem", fontWeight: 500, color: "#1a9e8f", marginTop: "0.15rem" },
  expPeriod: { fontSize: "0.7rem", fontWeight: 500, color: "#8fa3b8", background: "#f5f8fb", border: "1px solid #dde8f0", padding: "0.28rem 0.75rem", borderRadius: "100px", whiteSpace: "nowrap", alignSelf: "flex-start" },
  bulletList: { listStyle: "none", display: "flex", flexDirection: "column", gap: "0.4rem" },
  bullet: { fontSize: "0.82rem", color: "#3d566e", paddingLeft: "1.05rem", position: "relative", lineHeight: 1.65, display: "flex", gap: "0.3rem" },
  bulletDash: { color: "#1a9e8f", flexShrink: 0 },
  num: { color: "#0f1b2d", fontWeight: 600 },

  achGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem" },
  achCard: { background: "#f5f8fb", border: "1px solid #dde8f0", borderRadius: "12px", padding: "1.55rem 1.3rem", textAlign: "center", cursor: "pointer", transition: "all 0.22s", display: "flex", flexDirection: "column", alignItems: "center" },
  achCardHover: { background: "#e5f5f3", borderColor: "#1a9e8f", transform: "translateY(-3px)" },
  achIcon: { fontSize: "1.5rem", display: "block", marginBottom: "0.7rem" },
  achVal: { fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", fontWeight: 700, color: "#0f1b2d", display: "block", lineHeight: 1 },
  achDesc: { fontSize: "0.71rem", color: "#3d566e", marginTop: "0.4rem", lineHeight: 1.5 },

  eduCard: { background: "#ffffff", border: "1px solid #dde8f0", borderRadius: "12px", padding: "1.6rem 1.8rem", display: "flex", alignItems: "center", gap: "1.4rem", marginBottom: "2.5rem" },
  eduIcon: { width: "48px", height: "48px", borderRadius: "10px", background: "#e5f5f3", border: "1px solid rgba(26,158,143,0.2)", display: "grid", placeItems: "center", fontSize: "1.4rem", flexShrink: 0 },
  eduSchool: { fontFamily: "'Playfair Display', serif", fontSize: "0.97rem", fontWeight: 700, color: "#0f1b2d" },
  eduDeg: { fontSize: "0.78rem", color: "#3d566e", marginTop: "0.15rem" },
  eduPeriod: { marginLeft: "auto", fontSize: "0.7rem", color: "#8fa3b8", fontWeight: 500, whiteSpace: "nowrap" },
  certsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: "0.85rem" },
  certCard: { background: "#ffffff", border: "1px solid #dde8f0", borderRadius: "12px", padding: "1rem 1.3rem", display: "flex", alignItems: "center", gap: "1rem", cursor: "pointer", transition: "all 0.22s" },
  certCardHover: { borderColor: "#c9832a", boxShadow: "0 4px 14px rgba(201,131,42,0.10)", transform: "translateX(3px)" },
  certBadge: { width: "36px", height: "36px", borderRadius: "8px", display: "grid", placeItems: "center", fontSize: "0.95rem", flexShrink: 0 },
  certName: { fontSize: "0.78rem", fontWeight: 500, color: "#1e2d40", lineHeight: 1.45 },

  contactSection: { background: "#0f1b2d", padding: "5rem 2.5rem", textAlign: "center" },
  contactInner: { maxWidth: "520px", margin: "0 auto" },
  contactDesc: { color: "#8fa3b8", fontSize: "0.85rem", lineHeight: 1.85, marginBottom: "2rem" },
  contactLinks: { display: "flex", justifyContent: "center", gap: "0.9rem", flexWrap: "wrap" },

  footer: { background: "#1e2d40", textAlign: "center", padding: "1.3rem", fontSize: "0.7rem", color: "#8fa3b8", letterSpacing: "0.06em" },

  overlay: { position: "fixed", inset: 0, background: "rgba(15,27,45,0.45)", zIndex: 500, display: "grid", placeItems: "center", backdropFilter: "blur(4px)" },
  modal: { background: "#ffffff", borderRadius: "16px", padding: "2.4rem", maxWidth: "420px", width: "90%", position: "relative", boxShadow: "0 20px 60px rgba(15,27,45,0.22)" },
  modalX: { position: "absolute", top: "1rem", right: "1.1rem", background: "#f5f8fb", border: "1px solid #dde8f0", borderRadius: "50%", width: "26px", height: "26px", display: "grid", placeItems: "center", cursor: "pointer", fontSize: "0.85rem", color: "#3d566e" },
  modalTitle: { fontFamily: "'Playfair Display', serif", fontSize: "1.15rem", color: "#0f1b2d", marginBottom: "0.7rem" },
  modalBody: { fontSize: "0.83rem", color: "#3d566e", lineHeight: 1.75 },
};