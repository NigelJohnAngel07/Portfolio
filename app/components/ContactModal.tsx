import { useState } from "react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    subject: false,
    message: false
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = {
      name: !formData.name.trim(),
      email: !formData.email.trim(),
      subject: !formData.subject.trim(),
      message: !formData.message.trim()
    };
    
    setErrors(newErrors);
    
    if (Object.values(newErrors).some(err => err)) {
      return;
    }

    const bodyText = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
    const mailtoLink = `mailto:nigeljohnangel07@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(bodyText)}`;
    window.location.href = mailtoLink;
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-background/80 backdrop-blur-2xl border border-white/10 shadow-2xl p-8 animate-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-foreground/50 hover:text-foreground transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        <h2 className="text-3xl font-bold mb-2">Get in Touch</h2>
        <p className="text-sm font-sans opacity-70 mb-6">Drop me a message or find me on my socials.</p>

        <div className="flex flex-col gap-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
            <div className="flex gap-4">
              <div className="flex flex-col gap-1.5 flex-1">
                <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider opacity-70">Name</label>
                <input 
                  id="name"
                  type="text" 
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({...formData, name: e.target.value});
                    if (errors.name) setErrors({...errors, name: false});
                  }}
                  className={`w-full bg-white/5 border ${errors.name ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-2.5 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all`}
                  placeholder="John Doe"
                />
                {errors.name && <span className="text-red-500 font-sans text-xs mt-0.5">Please fill out this field.</span>}
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider opacity-70">Email</label>
                <input 
                  id="email"
                  type="email" 
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({...formData, email: e.target.value});
                    if (errors.email) setErrors({...errors, email: false});
                  }}
                  className={`w-full bg-white/5 border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-2.5 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all`}
                  placeholder="john@example.com"
                />
                {errors.email && <span className="text-red-500 font-sans text-xs mt-0.5">Please fill out this field.</span>}
              </div>
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label htmlFor="subject" className="text-xs font-semibold uppercase tracking-wider opacity-70">Subject</label>
              <input 
                id="subject"
                type="text" 
                value={formData.subject}
                onChange={(e) => {
                  setFormData({...formData, subject: e.target.value});
                  if (errors.subject) setErrors({...errors, subject: false});
                }}
                className={`w-full bg-white/5 border ${errors.subject ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-2.5 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all`}
                placeholder="Let's build something together"
              />
              {errors.subject && <span className="text-red-500 font-sans text-xs mt-0.5">Please fill out this field.</span>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wider opacity-70">Message</label>
              <textarea 
                id="message"
                rows={4}
                value={formData.message}
                onChange={(e) => {
                  setFormData({...formData, message: e.target.value});
                  if (errors.message) setErrors({...errors, message: false});
                }}
                className={`w-full bg-white/5 border ${errors.message ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all resize-none`}
                placeholder="Hi Nigel, I'd like to talk about..."
              />
              {errors.message && <span className="text-red-500 font-sans text-xs mt-0.5">Please fill out this field.</span>}
            </div>

            <button 
              type="submit"
              className="w-full bg-foreground text-background font-bold rounded-xl py-3 mt-2 hover:opacity-90 transition-opacity"
            >
              Send Message
            </button>
          </form>

          <div className="w-full h-px bg-white/10 my-1"></div>

          <div className="flex flex-col items-center gap-3">
            <a href="mailto:nigeljohnangel07@gmail.com" className="text-sm font-medium hover:underline opacity-80 hover:opacity-100 transition-opacity">
              nigeljohnangel07@gmail.com
            </a>
            
            <div className="flex items-center gap-6">
              <a href="https://github.com/NigelJohnAngel07" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 hover:scale-110 transition-all" aria-label="GitHub">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </a>
              <a href="https://www.linkedin.com/in/nigel-john-angel-4a6186398/" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 hover:scale-110 transition-all" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="https://www.facebook.com/nigeljohn.angel/" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 hover:scale-110 transition-all" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
