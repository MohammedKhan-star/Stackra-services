// ==========================================
// STACKRA Premium Contact Form
// Lead Generation + Founder CTA + Validation UI
// ==========================================

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, CheckCircle2 } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
  name: '',
  email: '',
  phone: '',
  company: '',
  service: '',
  budget: '',
  message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

const handleSubmit = async (e) => {

  e.preventDefault();

  setIsSubmitting(true);


  try {

    const response = await fetch("/api/contact", {

      method:"POST",

      headers:{
        "Content-Type":"application/json",
      },

      body:JSON.stringify(formData),

    });


    const data = await response.json();


    if(data.success){

      setIsSubmitted(true);

      setFormData({
        name:"",
        email:"",
        phone:"",
        company:"",
        service:"",
        budget:"",
        message:""
      });


      setTimeout(()=>{
        setIsSubmitted(false);
      },4000);


    }
    else{

      alert(data.message);

    }


  }

  catch(error){

    console.log(error);

    alert("Something went wrong");

  }


  finally{

    setIsSubmitting(false);

  }

};

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'stackratechnologies@gmail.com',
      href: 'mailto:stackratechnologies@gmail.com'
    },
    {
      icon: Phone,
      title: 'WhatsApp',
      value: '+91 9618563743',
      href: 'https://wa.me/919618563743'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Hyderabad, Telangana, India',
      href: 'https://maps.app.goo.gl/X7AvWUirH3k2Gmtf8'
    },
    {   
      icon: Clock,
      title: 'Response Time',
      value: 'Within 24 Hours',
      href: '#contact'
    }
  ];

  return (
    <section id='contact' className='py-24 bg-gray-950 text-white'>
      <div className='max-w-7xl mx-auto px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className='text-center mb-16'
        >
          <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6'>
            <MessageSquare className='w-4 h-4' />
            Let’s Build Something Exceptional
          </div>

          <h2 className='text-4xl md:text-5xl font-bold mb-4'>
            Start Your Project Today
          </h2>

          <p className='text-gray-400 max-w-3xl mx-auto text-lg'>
            Whether you need a business website, full-stack application, AI integration, school ERP, or a custom software solution, I’d love to discuss your goals and create a scalable technology roadmap.
          </p>
        </motion.div>

        <div className='grid lg:grid-cols-2 gap-10 items-start'>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className='space-y-6'
          >
            <div className='p-8 rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700'>
              <h3 className='text-2xl font-bold text-white mb-3'>Why Work With Me?</h3>
              <p className='text-gray-300 leading-relaxed mb-6'>
                As the founder of STACKRA TECHNOLOGIES, I personally handle strategy, development, AI integration, deployment, and optimization. You communicate directly with the developer building your product—no middle layers, no communication gaps.
              </p>

              <div className='space-y-4'>
                {[
                  'Direct founder communication',
                  'Modern Next.js & MERN architecture',
                  'AI-powered feature integration',
                  'SEO & performance optimization',
                  'Deployment and post-launch support'
                ].map((item) => (
                  <div key={item} className='flex items-center gap-3 text-gray-300'>
                    <CheckCircle2 className='w-5 h-5 text-cyan-400 flex-shrink-0' />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className='grid sm:grid-cols-2 gap-4'>
              {contactInfo.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.a
                    key={item.title}
                    href={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className='group p-5 rounded-2xl bg-gray-900 border border-gray-800 hover:border-cyan-500/40 transition-all duration-300'
                  >
                    <div className='w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform'>
                      <Icon className='w-6 h-6 text-white' />
                    </div>

                    <div className='text-sm text-gray-400 mb-1'>{item.title}</div>
                    <div className='font-semibold text-white group-hover:text-cyan-300 transition-colors'>
                      {item.value}
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            className='relative'
          >
            <div className='absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 blur-3xl rounded-3xl' />

            <form onSubmit={handleSubmit} className='relative p-8 rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 space-y-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <h3 className='text-2xl font-bold text-white'>Send a Project Inquiry</h3>
                  <p className='text-gray-400 text-sm mt-1'>Tell me what you want to build.</p>
                </div>

                {isSubmitted && (
                  <div className='flex items-center gap-2 px-3 py-2 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium'>
                    <CheckCircle2 className='w-4 h-4' />
                    Sent
                  </div>
                )}
              </div>

              <div className='grid sm:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-gray-300'>Full Name</label>
                  <input
                    type='text'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder='Your Name'
                    className='w-full px-4 py-3 rounded-2xl bg-black/40 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all'
                  />
                </div>

                <div className='space-y-2'>
                  <label className='text-sm font-medium text-gray-300'>Email Address</label>
                  <input
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder='you@example.com'
                    className='w-full px-4 py-3 rounded-2xl bg-black/40 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all'
                  />
                </div>
              </div>
              <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-300'>
                Phone Number
              </label>

              <input
                type='tel'
                name='phone'
                value={formData.phone}
                onChange={handleChange}
                placeholder='+91 9876543210'
                className='w-full px-4 py-3 rounded-2xl bg-black/40 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all'
              />
            </div>


            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-300'>
                Company Name
              </label>

              <input
                type='text'
                name='company'
                value={formData.company}
                onChange={handleChange}
                placeholder='Company Name'
                className='w-full px-4 py-3 rounded-2xl bg-black/40 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all'
              />
            </div>
            <div className='space-y-2'>

<label className='text-sm font-medium text-gray-300'>
Project Budget
</label>

<select
name='budget'
value={formData.budget}
onChange={handleChange}
className='w-full px-4 py-3 rounded-2xl bg-black/40 border border-gray-700 text-white focus:outline-none focus:border-cyan-500'
>

<option value='' className='bg-gray-900'>
Select Budget
</option>

<option value='₹5,000 - ₹10,000' className='bg-gray-900'>
₹5,000 - ₹10,000
</option>

<option value='₹10,000 - ₹25,000' className='bg-gray-900'>
₹10,000 - ₹25,000
</option>

<option value='₹25,000 - ₹50,000' className='bg-gray-900'>
₹25,000 - ₹50,000
</option>

<option value='₹50,000+' className='bg-gray-900'>
₹50,000+
</option>

</select>

</div>  

              <div className='space-y-2'>
                <label className='text-sm font-medium text-gray-300'>Service Needed</label>
                <select
                  name='service'
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className='w-full px-4 py-3 rounded-2xl bg-black/40 border border-gray-700 text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all'
                >
                  <option value='' className='bg-gray-900'>Select a service</option>
                  <option value='business-website' className='bg-gray-900'>Business Website</option>
                  <option value='portfolio' className='bg-gray-900'>Portfolio Website</option>
                  <option value='full-stack' className='bg-gray-900'>Full Stack Application</option>
                  <option value='ai-integration' className='bg-gray-900'>AI Integration</option>
                  <option value='school-erp' className='bg-gray-900'>School ERP / Result Portal</option>
                  <option value='custom-software' className='bg-gray-900'>Custom Software Solution</option>
                </select>
              </div>

              <div className='space-y-2'>
                <label className='text-sm font-medium text-gray-300'>Project Details</label>
                <textarea
                  name='message'
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder='Describe your project, business goals, features you need, target audience, and timeline...'
                  className='w-full px-4 py-3 rounded-2xl bg-black/40 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all resize-none'
                />
              </div>

              <button
                type='submit'
                disabled={isSubmitting}
                className='w-full inline-flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:from-cyan-400 hover:to-blue-500 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-cyan-500/25'
              >
                {isSubmitting ? (
                  <>
                    <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin' />
                    Sending Inquiry...
                  </>
                ) : (
                  <>
                    <Send className='w-5 h-5' />
                    Send Project Inquiry
                  </>
                )}
              </button>

              <p className='text-xs text-gray-500 text-center leading-relaxed'>
                By submitting this form, you agree to be contacted regarding your project inquiry. I typically respond within 24 hours with next steps and a proposed discussion schedule.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
