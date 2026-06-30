/**
 * CLEANER PRO – script.js  v4
 * Modules : Lang | Navbar | Scroll | Reveal | Counter | Slider
 *           Gallery | Form | WAChat | BackToTop | FAQ | Misc
 */

'use strict';

/* ═══════════════════════════════════
   STORE – état global partagé
═══════════════════════════════════ */
const Store = {
  lang: localStorage.getItem('cp_lang') || 'fr',
  set(lang) {
    this.lang = lang;
    localStorage.setItem('cp_lang', lang);
  }
};


/* ═══════════════════════════════════
   MODULE 1 – MOTEUR MULTILINGUE v5
   FR complet / EN complet – zéro mélange
═══════════════════════════════════ */
const LangModule = (() => {

  /* ── Dictionnaire complet EN / FR ── */
  const DICT = {
    'topbar-hours':   { fr: 'Lun–Sam : 7h–20h | Dim : Sur RDV', en: 'Mon–Sat: 7am–8pm | Sun: By appt.' },
    'hero-title-line':{ fr: "L'excellence du nettoyage professionnel", en: 'The excellence of professional cleaning' },
    'hero-gold':      { fr: 'à votre service',    en: 'at your service' },
    'hero-slogan':    { fr: 'Votre propreté, notre priorité.', en: 'Your cleanliness, our priority.' },
    'hero-subtitle':  { fr: "Des espaces impeccables, une équipe professionnelle et expérimentée, une fiabilité sans compromis partout à Abidjan et en Côte d'Ivoire.", en: "Spotless spaces, a professional and experienced team, uncompromising reliability throughout Abidjan and Côte d'Ivoire." },
    'hero-badge-satis':  { fr: 'Satisfaction garantie', en: 'Guaranteed satisfaction' },
    'hero-badge-dispo':  { fr: 'Disponible 7j/7',       en: 'Available 7 days/7' },
    'hero-badge-equipe': { fr: 'Équipe expérimentée',   en: 'Experienced team' },
    'hero-cta1':      { fr: 'Demander un devis gratuit', en: 'Get a free quote' },
    'hero-cta2':      { fr: 'Nos 10 prestations',        en: 'Our 10 services' },
    'svc-label':      { fr: 'Nos 10 prestations', en: 'Our 10 services' },
    'svc-title1':     { fr: 'Des services adaptés à', en: 'Services tailored to' },
    'svc-title2':     { fr: 'chaque besoin',      en: 'every need' },
    'svc-desc':       { fr: "De la résidence privée aux grands immeubles commerciaux, nous intervenons avec la même rigueur et le même professionnalisme partout à Abidjan.", en: 'From private residences to large commercial buildings, we deliver the same rigor and professionalism across all of Abidjan.' },
    'svc1-name':  { fr: 'Nettoyage Résidentiel',        en: 'Residential Cleaning' },
    'svc1-desc':  { fr: "Appartements, villas et maisons individuelles à Abidjan. Résultats impeccables avec des produits écologiques de qualité.", en: 'Apartments, villas and houses in Abidjan. Flawless results with quality eco-friendly products.' },
    'svc2-name':  { fr: 'Nettoyage Commercial',          en: 'Commercial Cleaning' },
    'svc2-desc':  { fr: "Boutiques, centres commerciaux et espaces de vente à Abidjan. Un espace propre booste votre image et vos ventes.", en: 'Shops, malls and retail spaces in Abidjan. A clean space boosts your image and sales.' },
    'svc3-name':  { fr: 'Nettoyage de Bureaux',          en: 'Office Cleaning' },
    'svc3-desc':  { fr: "Open spaces, salles de réunion, espaces communs à Abidjan. Un cadre de travail sain améliore la productivité.", en: 'Open spaces, meeting rooms, common areas in Abidjan. A healthy work environment improves productivity.' },
    'svc4-name':  { fr: "Nettoyage d'Immeubles",         en: 'Building Cleaning' },
    'svc4-desc':  { fr: "Halls d'entrée, escaliers et façades d'immeubles à Abidjan. Valorisez votre patrimoine immobilier.", en: "Entrance halls, staircases and building facades in Abidjan. Enhance your real estate value." },
    'svc5-name':  { fr: 'Nettoyage Fin de Chantier',     en: 'Post-Construction Cleaning' },
    'svc5-desc':  { fr: "Poussières, gravats et résidus de construction à Abidjan. Locaux livrés impeccables, prêts à être occupés.", en: 'Dust, rubble and construction residue in Abidjan. Premises delivered spotless and ready to occupy.' },
    'svc6-name':  { fr: 'Nettoyage Événementiel',        en: 'Event Cleaning' },
    'svc6-desc':  { fr: "Avant, pendant et après vos événements à Abidjan. Congrès, mariages, réceptions : profitez sans vous soucier de la propreté.", en: 'Before, during and after your events in Abidjan. Conferences, weddings, receptions: enjoy without worrying about cleanliness.' },
    'svc7-name':  { fr: 'Nettoyage Après Déménagement',  en: 'Post-Move Cleaning' },
    'svc7-desc':  { fr: "Nettoyage en profondeur à Abidjan pour une transition sereine. Récupérez votre dépôt de garantie, locaux prêts à emménager.", en: 'Deep cleaning in Abidjan for a smooth transition. Get your security deposit back, premises ready to move in.' },
    'svc8-name':  { fr: 'Nettoyage de Vitres & Façades', en: 'Window & Facade Cleaning' },
    'svc8-desc':  { fr: "Façades vitrées, baies vitrantes et fenêtres à Abidjan. Éclat cristallin garanti pour une luminosité maximale.", en: 'Glass facades, bay windows and windows in Abidjan. Crystal brilliance guaranteed for maximum luminosity.' },
    'svc9-name':  { fr: 'Nettoyage Canapé, Moquette & Tapis', en: 'Sofa, Carpet & Rug Cleaning' },
    'svc9-desc':  { fr: "Détachage, dégraissage et désinfection en profondeur à Abidjan. Mobilier et textiles comme neufs, résultats spectaculaires.", en: 'Stain removal, degreasing and deep disinfection in Abidjan. Furniture and textiles like new, spectacular results.' },
    'svc10-name': { fr: 'Nettoyage &amp; Entretien des Climatiseurs', en: 'Air Conditioning Cleaning &amp; Maintenance' },
    'svc10-desc': { fr: "Nettoyage, désinfection et entretien de vos systèmes de climatisation à Abidjan. Un air sain, une performance optimale et une durée de vie prolongée pour vos équipements.", en: "Cleaning, disinfection and maintenance of your air conditioning systems in Abidjan. Clean air, optimal performance and extended equipment lifespan." },
    'svc-cta':    { fr: 'Demander un devis', en: 'Request a quote' },
    'team-label': { fr: 'Notre équipe',   en: 'Our team' },
    'team-title1':{ fr: 'Nos agents en',  en: 'Our agents in' },
    'team-title2':{ fr: 'action',         en: 'action' },
    'team-desc':  { fr: "Une équipe soudée, formée et passionnée qui met tout son cœur dans chaque intervention pour vous offrir un résultat parfait.", en: 'A united, trained and passionate team that puts all its heart into each intervention to deliver a perfect result.' },
    'team-agent1':{ fr: 'Nettoyage de bureaux',  en: 'Office cleaning' },
    'team-agent2':{ fr: 'Service résidentiel',   en: 'Residential service' },
    'team-agent3':{ fr: 'Nettoyage commercial',  en: 'Commercial cleaning' },
    'team-agent4':{ fr: 'Nettoyage de vitres',   en: 'Window cleaning' },
    'team-b1t':   { fr: 'Formation continue',      en: 'Ongoing training' },
    'team-b1d':   { fr: 'Chaque agent est formé aux dernières techniques', en: 'Each agent is trained in the latest techniques' },
    'team-b2t':   { fr: 'Tenue professionnelle',   en: 'Professional uniform' },
    'team-b2d':   { fr: 'Uniformes, gants et équipements de protection fournis', en: 'Uniforms, gloves and protective equipment provided' },
    'team-b3t':   { fr: 'Équipe supervisée',       en: 'Supervised team' },
    'team-b3d':   { fr: 'Un responsable qualité veille à chaque intervention', en: 'A quality manager oversees each intervention' },
    'why-label':  { fr: 'Notre différence', en: 'Our difference' },
    'why-title1': { fr: 'Pourquoi choisir', en: 'Why choose' },
    'why-desc':   { fr: "Depuis notre création, nous nous engageons à offrir une qualité de service irréprochable à Abidjan et dans toute la Côte d'Ivoire.", en: "Since our founding, we are committed to providing impeccable service quality in Abidjan and throughout Côte d'Ivoire." },
    'why1-t': { fr: 'Sérieux & Professionnalisme', en: 'Seriousness & Professionalism' },
    'why1-d': { fr: "Équipe formée aux meilleures techniques et équipements homologués.", en: 'Team trained in best techniques with approved equipment.' },
    'why2-t': { fr: "Rapidité d'intervention",    en: 'Fast response' },
    'why2-d': { fr: "Nous répondons présents rapidement partout à Abidjan.",   en: 'We respond quickly everywhere in Abidjan.' },
    'why3-t': { fr: 'Satisfaction garantie',      en: 'Guaranteed satisfaction' },
    'why3-d': { fr: "Pas satisfait ? Nous revenons sans frais supplémentaires.", en: 'Not satisfied? We come back at no extra charge.' },
    'why4-t': { fr: 'Personnel qualifié',         en: 'Qualified staff' },
    'why4-d': { fr: "Chaque agent est sélectionné, formé et supervisé.",        en: 'Each agent is selected, trained and supervised.' },
    'why5-t': { fr: 'Produits écologiques',       en: 'Eco-friendly products' },
    'why5-d': { fr: "Produits respectueux de l'environnement, sûrs pour votre famille.", en: 'Environmentally friendly products, safe for your family.' },
    'why6-t': { fr: 'Disponibilité 7j/7',         en: 'Available 7 days/7' },
    'why6-d': { fr: "En semaine, week-end ou jours fériés – nous sommes là.", en: 'Weekdays, weekends or holidays – we are here.' },
    'why-badge': { fr: 'Entreprise de confiance', en: 'Trusted company' },
    'why-stat1': { fr: 'Clients satisfaits',      en: 'Happy clients' },
    'why-stat2': { fr: 'Satisfaction',             en: 'Satisfaction' },
    'why-stat3': { fr: 'Services',                 en: 'Services' },
    'gal-label':   { fr: 'Nos réalisations',          en: 'Our work' },
    'gal-title1':  { fr: 'Des résultats qui',          en: 'Results that' },
    'gal-title2':  { fr: "parlent d'eux-mêmes",        en: 'speak for themselves' },
    'gal-desc':    { fr: "Glissez le curseur pour comparer l'avant et l'après de nos interventions à Abidjan.", en: 'Slide the cursor to compare before and after our interventions in Abidjan.' },
    'gal-tab-all': { fr: 'Tous',         en: 'All' },
    'gal-tab-bur': { fr: 'Bureaux',      en: 'Offices' },
    'gal-tab-res': { fr: 'Résidentiel',  en: 'Residential' },
    'gal-tab-vit': { fr: 'Vitres',       en: 'Windows' },
    'gal-tab-tex': { fr: 'Textiles',     en: 'Textiles' },
    'gal-before':  { fr: 'Avant',        en: 'Before' },
    'gal-after':   { fr: 'Après',        en: 'After' },
    'gal-item1':   { fr: 'Nettoyage Open Space',       en: 'Open Space Cleaning' },
    'gal-tag1':    { fr: 'Bureaux',                    en: 'Offices' },
    'gal-item2':   { fr: 'Villa Haut Standing',        en: 'High-End Villa' },
    'gal-tag2':    { fr: 'Résidentiel',                en: 'Residential' },
    'gal-item3':   { fr: 'Nettoyage de Vitres',        en: 'Window Cleaning' },
    'gal-tag3':    { fr: 'Vitres',                     en: 'Windows' },
    'gal-item4':   { fr: 'Canapé Détachage Complet',   en: 'Full Sofa Stain Removal' },
    'gal-tag4':    { fr: 'Textiles',                   en: 'Textiles' },
    'testi-label':  { fr: 'Avis clients vérifiés', en: 'Verified customer reviews' },
    'testi-title1': { fr: 'Ce que disent',         en: 'What' },
    'testi-title2': { fr: 'nos clients',           en: 'our clients say' },
    'testi-rating': { fr: 'basé sur 87 avis Google', en: 'based on 87 Google reviews' },
    'testi-leave':  { fr: 'Laisser un avis Google',   en: 'Leave a Google review' },
    'testi1-author':{ fr: 'Directeur, Cabinet Juridique · Plateau, Abidjan', en: 'Director, Law Firm · Plateau, Abidjan' },
    'testi1-text':  { fr: '"CLEANER PRO a transformé nos bureaux. L\'équipe est ponctuelle, discrète et le résultat est toujours impeccable. Je recommande vivement."', en: '"CLEANER PRO transformed our offices. The team is punctual, discreet and the result is always impeccable. Highly recommend."' },
    'testi2-author':{ fr: 'Propriétaire, Résidence Cocody · Abidjan', en: 'Owner, Cocody Residence · Abidjan' },
    'testi2-text':  { fr: '"Service exceptionnel pour ma villa après travaux. L\'équipe a été ultra-professionnelle, rapide et le rendu dépasse mes attentes."', en: '"Exceptional service for my villa after renovation. The team was ultra-professional, fast and the result exceeded my expectations."' },
    'testi3-author':{ fr: 'Gérant, Centre Commercial · Marcory, Abidjan', en: 'Manager, Shopping Centre · Marcory, Abidjan' },
    'testi3-text':  { fr: '"Nous collaborons depuis plus d\'un an. Sérieux, réactifs et d\'une efficacité remarquable. Un partenaire de confiance pour notre centre."', en: '"We have been working together for over a year. Serious, responsive and remarkably efficient. A trusted partner for our centre."' },
    'testi4-author':{ fr: 'Promoteur Immobilier · Abidjan', en: 'Real Estate Developer · Abidjan' },
    'testi4-text':  { fr: '"Pour la livraison de mes immeubles, je fais systématiquement appel à CLEANER PRO. Les locaux sont livrés dans un état irréprochable."', en: '"For delivering my buildings, I systematically use CLEANER PRO. The premises are delivered in impeccable condition."' },
    'faq-label':  { fr: 'Questions fréquentes', en: 'Frequently asked questions' },
    'faq-title':  { fr: 'FAQ', en: 'FAQ' },
    'faq1-q': { fr: 'Quels sont vos tarifs pour le nettoyage à Abidjan ?', en: 'What are your cleaning rates in Abidjan?' },
    'faq1-a': { fr: "Nos tarifs varient selon le type de service, la surface et la fréquence. Contactez-nous au 07 18 83 75 81 pour un devis gratuit et personnalisé sous 24h.", en: 'Our rates vary depending on the type of service, surface area and frequency. Contact us at 07 18 83 75 81 for a free personalized quote within 24h.' },
    'faq2-q': { fr: "CLEANER PRO intervient-il dans tout Abidjan ?", en: 'Does CLEANER PRO operate throughout Abidjan?' },
    'faq2-a': { fr: "Oui, nous intervenons dans tous les quartiers : Cocody, Plateau, Treichville, Marcory, Yopougon, Abobo, Koumassi, Port-Bouet et toute la Côte d'Ivoire.", en: "Yes, we operate in all districts: Cocody, Plateau, Treichville, Marcory, Yopougon, Abobo, Koumassi, Port-Bouet and all of Côte d'Ivoire." },
    'faq3-q': { fr: "Quelle est votre disponibilité ?", en: 'What is your availability?' },
    'faq3-a': { fr: "Lundi au samedi de 7h à 20h, dimanche sur rendez-vous. Service d'urgence disponible 7j/7 pour les besoins urgents.", en: "Monday to Saturday 7am–8pm, Sunday by appointment. Emergency service available 7 days/7 for urgent needs." },
    'faq4-q': { fr: "Quels produits utilisez-vous ?", en: 'What products do you use?' },
    'faq4-a': { fr: "Nous utilisons uniquement des produits écologiques et sans danger pour votre santé, vos enfants et vos animaux domestiques.", en: 'We use only eco-friendly products that are safe for your health, children and pets.' },
    'faq5-q': { fr: "Proposez-vous des contrats d'entretien régulier ?", en: 'Do you offer regular maintenance contracts?' },
    'faq5-a': { fr: "Oui, nous proposons des contrats hebdomadaires, bi-hebdomadaires et mensuels adaptés aux entreprises et résidences avec des tarifs préférentiels.", en: 'Yes, we offer weekly, bi-weekly and monthly contracts for businesses and residences with preferential rates.' },
    'faq6-q': { fr: "Comment obtenir un devis rapidement ?", en: 'How to get a quote quickly?' },
    'faq6-a': { fr: "Remplissez notre formulaire en ligne ou contactez-nous directement sur WhatsApp au 07 18 83 75 81. Réponse garantie sous 2 heures.", en: 'Fill in our online form or contact us directly on WhatsApp at 07 18 83 75 81. Response guaranteed within 2 hours.' },
    'cta-title1': { fr: 'Prêt à transformer',        en: 'Ready to transform' },  // fixed: now uses two <span> nodes
    'cta-title2': { fr: 'vos espaces ?',             en: 'your spaces?' },
    'cta-sub':    { fr: 'Contactez-nous pour un devis gratuit et sans engagement. Réponse garantie en 2 heures.', en: 'Contact us for a free no-obligation quote. Response guaranteed within 2 hours.' },
    'cta-btn1':   { fr: 'Demander un devis gratuit', en: 'Get a free quote' },
    'cta-btn2':   { fr: 'Écrire sur WhatsApp',       en: 'Message on WhatsApp' },
    'contact-label':   { fr: 'Nous contacter',       en: 'Contact us' },
    'contact-title1':  { fr: 'Obtenez votre',        en: 'Get your' },
    'contact-title2':  { fr: 'devis gratuit',        en: 'free quote' },
    'contact-subdesc': { fr: "Notre équipe vous rappelle sous 2h avec une proposition adaptée à vos besoins à Abidjan.", en: 'Our team calls you back within 2h with a proposal tailored to your needs in Abidjan.' },
    'contact-tel':     { fr: 'Téléphone',            en: 'Phone' },
    'contact-addr':    { fr: 'Adresse',              en: 'Address' },
    'contact-hours':   { fr: 'Horaires',             en: 'Hours' },
    'contact-hours-val':{ fr: 'Lun–Sam : 7h–20h | Dim : Sur RDV', en: 'Mon–Sat: 7am–8pm | Sun: By appt.' },
    'contact-mgr':     { fr: 'Responsable',          en: 'Manager' },
    'contact-social':  { fr: 'Suivez-nous sur',      en: 'Follow us on' },
    'form-title':      { fr: 'Demande de devis gratuit', en: 'Free quote request' },
    'form-name':       { fr: 'Nom complet',          en: 'Full name' },
    'form-phone':      { fr: 'Téléphone',            en: 'Phone' },
    'form-service':    { fr: 'Service souhaité',     en: 'Service needed' },
    'form-zone':       { fr: 'Zone / Quartier à Abidjan', en: 'Area / District in Abidjan' },
    'form-msg':        { fr: 'Message / Détails',    en: 'Message / Details' },
    'form-submit':     { fr: 'Envoyer ma demande',   en: 'Send my request' },
    'form-ok-title':   { fr: 'Demande envoyée avec succès !', en: 'Request sent successfully!' },
    'form-ok-desc':    { fr: 'Notre équipe vous contactera sous 2h. Merci de votre confiance.', en: 'Our team will contact you within 2h. Thank you for your trust.' },
    'footer-svc-title':{ fr: 'Nos 10 prestations',   en: 'Our 10 services' },
    'footer-nav-title':{ fr: 'Navigation',           en: 'Navigation' },
    'footer-cnt-title':{ fr: 'Contact',              en: 'Contact' },
    'footer-svc1': { fr: 'Nettoyage Résidentiel',    en: 'Residential Cleaning' },
    'footer-svc2': { fr: 'Nettoyage Commercial',     en: 'Commercial Cleaning' },
    'footer-svc3': { fr: 'Nettoyage de Bureaux',     en: 'Office Cleaning' },
    'footer-svc4': { fr: "Nettoyage d'Immeubles",    en: 'Building Cleaning' },
    'footer-svc5': { fr: 'Nettoyage de fin de chantier', en: 'Post-Construction Cleaning' },
    'footer-svc6': { fr: 'Nettoyage Événementiel',   en: 'Event Cleaning' },
    'footer-svc7': { fr: 'Après Déménagement',       en: 'Post-Move' },
    'footer-svc8': { fr: 'Nettoyage de Vitres',      en: 'Window Cleaning' },
    'footer-svc9': { fr: 'Canapé, Moquette & Tapis', en: 'Sofa, Carpet & Rug' },
    'footer-svc10': { fr: 'Entretien des Climatiseurs', en: 'Air Conditioning Maintenance' },
    'footer-nav1': { fr: 'Accueil',                  en: 'Home' },
    'footer-nav2': { fr: 'Services',                 en: 'Services' },
    'footer-nav3': { fr: 'Notre Équipe',             en: 'Our Team' },
    'footer-nav4': { fr: 'Pourquoi Nous',            en: 'Why Us' },
    'footer-nav5': { fr: 'Galerie',                  en: 'Gallery' },
    'footer-nav6': { fr: 'Avis Clients',             en: 'Reviews' },
    'footer-nav7': { fr: 'FAQ',                      en: 'FAQ' },
    'footer-nav8': { fr: 'Contact & Devis',          en: 'Contact & Quote' },
    'footer-zones-title': { fr: 'Zones desservies :', en: 'Service areas:' },
    'footer-cta':    { fr: 'Devis gratuit',          en: 'Free quote' },
    'footer-desc':   { fr: "Leader du nettoyage professionnel à Abidjan. 10 prestations disponibles partout en Côte d'Ivoire.", en: "Leader in professional cleaning in Abidjan. 9 services available throughout Côte d'Ivoire." },
    'footer-rights': { fr: 'Tous droits réservés.',  en: 'All rights reserved.' },
    'footer-bottom2':{ fr: "Zone 3, Treichville, Abidjan · Nettoyage professionnel · Côte d'Ivoire", en: "Zone 3, Treichville, Abidjan · Professional cleaning · Côte d'Ivoire" },
    'wa-online': { fr: 'En ligne · Répond en 2h',    en: 'Online · Responds in 2h' },
    'wa-msg':    { fr: '👋 Bonjour ! Je suis disponible pour répondre à vos questions sur nos services de nettoyage à Abidjan. Comment puis-je vous aider ?', en: '👋 Hello! I am available to answer your questions about our cleaning services in Abidjan. How can I help you?' },
    'wa-q1':     { fr: '💰 Demander un devis',        en: '💰 Request a quote' },
    'wa-q2':     { fr: '📋 Voir nos services',        en: '📋 See our services' },
    'wa-q3':     { fr: '🚨 Urgence nettoyage',        en: '🚨 Cleaning emergency' },
    'trust1': { fr: 'Équipe professionnelle',         en: 'Professional team' },
    'trust2': { fr: 'Réponse rapide',                 en: 'Fast response' },
    'trust3': { fr: 'Satisfaction garantie',          en: 'Guaranteed satisfaction' },
    'trust4': { fr: 'Disponible 7j/7',                en: 'Available 7 days/7' },  // trust bar item 4
    'rating-reviews': { fr: 'basé sur 87 avis Google', en: 'based on 87 Google reviews' },
    'rating-leave':   { fr: 'Laisser un avis Google',  en: 'Leave a Google review' },
    'nav-home':   { fr: 'Accueil',       en: 'Home' },
    'nav-svc':    { fr: 'Services',      en: 'Services' },
    'nav-team':   { fr: 'Notre Équipe',  en: 'Our Team' },
    'nav-why':    { fr: 'Pourquoi Nous', en: 'Why Us' },
    'nav-gal':    { fr: 'Galerie',       en: 'Gallery' },
    'nav-rev':    { fr: 'Avis Clients',  en: 'Reviews' },
    'nav-faq':    { fr: 'FAQ',           en: 'FAQ' },
    'nav-cnt':    { fr: 'Contact',       en: 'Contact' },
    'nav-quote':  { fr: 'Devis Gratuit', en: 'Free Quote' },
    'logo-tagline': { fr: 'Nettoyage Professionnel · Abidjan', en: 'Professional Cleaning · Abidjan' },
    'topbar-rating': { fr: '(87 avis Google)', en: '(87 Google reviews)' },
  };

  /**
   * translatePage(lang)
   * Stratégie : data-fr / data-en sur CHAQUE nœud texte feuille.
   * Les éléments avec enfants (btn+SVG) ont leur texte dans un <span data-fr data-en>.
   * Zéro exception, zéro mélange de langues.
   */
  const translatePage = (lang) => {

    /* 1. Tous les éléments [data-fr] – traite UNIQUEMENT les feuilles (sans enfants) */
    document.querySelectorAll('[data-fr]').forEach(el => {
      const txt = el.getAttribute('data-' + lang);
      if (txt === null || txt === undefined) return;
      if (el.children.length === 0) {
        el.innerHTML = txt;   // innerHTML gère <br>, &amp;, etc.
      }
      // Éléments avec enfants : on ne touche pas – leurs <span> enfants ont leur propre data-fr/data-en
    });

    /* 2. Placeholders formulaire */
    const ph = {
      fr: { name:'Ex : Kouamé Martin', phone:'07 XX XX XX XX', email:'votre@email.com',
            zone:'Ex : Cocody, Plateau, Treichville…',
            message:'Décrivez votre besoin (surface, fréquence, contraintes particulières…)' },
      en: { name:'Ex: Martin Smith',   phone:'07 XX XX XX XX', email:'your@email.com',
            zone:'Ex: Cocody, Plateau, Treichville…',
            message:'Describe your need (area, frequency, specific constraints…)' }
    }[lang] || {};
    const sp = (id, v) => { const e = document.getElementById(id); if (e && v) e.placeholder = v; };
    sp('name', ph.name); sp('phone', ph.phone); sp('email', ph.email);
    sp('zone', ph.zone); sp('message', ph.message);

    /* 3. Select service options */
    const fOpt = document.querySelector('#service option[disabled]');
    if (fOpt) fOpt.textContent = lang === 'en' ? 'Choose a service…' : 'Choisissez un service…';
    document.querySelectorAll('#service option:not([disabled])').forEach(o => {
      const v = o.getAttribute('data-' + lang); if (v) o.textContent = v;
    });

    /* 4. SEO metas */
    const mT = document.getElementById('meta-title');
    const mD = document.getElementById('meta-desc');
    if (lang === 'en') {
      if (mT) mT.textContent = 'CLEANER PRO – Professional Cleaning Company in Abidjan | Côte d\'Ivoire';
      if (mD) mD.setAttribute('content', 'CLEANER PRO: professional cleaning in Abidjan. Offices, buildings, post-construction, windows, sofas & carpets. Free quote ☎ 07 18 83 75 81');
      document.getElementById('html-root')?.setAttribute('lang', 'en');
    } else {
      if (mT) mT.textContent = 'CLEANER PRO – Entreprise de Nettoyage Professionnel à Abidjan | Côte d\'Ivoire';
      if (mD) mD.setAttribute('content', 'CLEANER PRO : société de nettoyage professionnel à Abidjan. 10 prestations : bureaux, immeubles, chantier, vitres, canapés, tapis, climatiseurs. Devis gratuit ☎ 07 18 83 75 81');
      document.getElementById('html-root')?.setAttribute('lang', 'fr');
    }

    /* 5. Boutons langue – labels STRICTS "Français" / "English" uniquement */
    document.querySelectorAll('.lang-btn').forEach(btn => {
      const bLang    = btn.getAttribute('data-lang');
      const isActive = bLang === lang;
      btn.classList.toggle('lang-btn--active', isActive);
      btn.setAttribute('aria-pressed', String(isActive));

      const flag  = btn.querySelector('.lang-flag');
      const label = bLang === 'fr' ? 'Français' : 'English';

      if (flag) {
        // Reconstruction sûre : on vide le bouton puis on réinsère flag + texte.
        // (Aucune boucle conditionnelle sur childNodes : évite tout risque de
        //  blocage du thread JS sur mobile, qui empêchait jusqu'ici TOUS les
        //  boutons du site de répondre au clic.)
        btn.innerHTML = '';
        btn.appendChild(flag);
        btn.appendChild(document.createTextNode(' ' + label));
      } else {
        // Menu mobile : pas de flag séparé, texte simple avec emoji
        btn.textContent = (bLang === 'fr' ? '🇫🇷 ' : '🇬🇧 ') + label;
      }
    });

    /* 6. Aria-labels traduits pour éléments fixes */
    const ariaMap = {
      fr: { backToTop:'Retour en haut de page', waFab:'Ouvrir le chat WhatsApp CLEANER PRO', waBubbleClose:'Fermer le chat' },
      en: { backToTop:'Back to top',            waFab:'Open CLEANER PRO WhatsApp chat',     waBubbleClose:'Close chat' }
    }[lang] || {};
    Object.entries(ariaMap).forEach(([id, val]) => { document.getElementById(id)?.setAttribute('aria-label', val); });

    Store.set(lang);
  };

  const init = () => {
    translatePage(Store.lang);
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const l = btn.getAttribute('data-lang');
        if (l !== Store.lang) translatePage(l);
      });
    });
  };

  return { init, translatePage };
})();



/* ═══════════════════════════════════
   MODULE 2 – NAVBAR
═══════════════════════════════════ */
const NavbarModule = (() => {
  const navbar     = document.getElementById('navbar');
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = mobileMenu?.querySelectorAll('.mobile__link, .btn, .mob-soc, .mobile__lang .lang-btn');

  const handleScroll = () => {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  };

  const toggleMenu = (forceClose = false) => {
    if (!hamburger || !mobileMenu) return;
    const isOpen = !forceClose && !hamburger.classList.contains('open');
    hamburger.classList.toggle('open', isOpen);
    mobileMenu.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    mobileMenu.setAttribute('aria-hidden', String(!isOpen));
    if (isOpen) mobileMenu.querySelector('a, button')?.focus();
  };

  const updateActiveLinks = () => {
    const sections = document.querySelectorAll('section[id]');
    const links    = document.querySelectorAll('.nav__link');
    const scrollY  = window.scrollY + 120;
    sections.forEach(sec => {
      const top = sec.offsetTop, bot = top + sec.offsetHeight;
      const id  = sec.getAttribute('id');
      if (scrollY >= top && scrollY < bot) {
        links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${id}`));
      }
    });
  };

  const init = () => {
    if (!navbar) return;
    hamburger?.addEventListener('click', () => toggleMenu());
    document.addEventListener('keydown', e => { if (e.key === 'Escape') toggleMenu(true); });
    mobileLinks?.forEach(l => {
      if (!l.classList.contains('lang-btn')) {
        l.addEventListener('click', () => toggleMenu(true));
      }
    });
    window.addEventListener('scroll', handleScroll,      { passive: true });
    window.addEventListener('scroll', updateActiveLinks, { passive: true });
    handleScroll();
    updateActiveLinks();
  };

  return { init };
})();


/* ═══════════════════════════════════
   MODULE 3 – SMOOTH SCROLL
═══════════════════════════════════ */
const SmoothScrollModule = (() => {
  const init = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', e => {
        const href = anchor.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  };
  return { init };
})();


/* ═══════════════════════════════════
   MODULE 4 – SCROLL REVEAL
═══════════════════════════════════ */
const RevealModule = (() => {
  const init = () => {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    els.forEach(el => observer.observe(el));
  };
  return { init };
})();


/* ═══════════════════════════════════
   MODULE 5 – ANIMATED COUNTERS
═══════════════════════════════════ */
const CounterModule = (() => {
  const easeOut = t => 1 - Math.pow(1 - t, 4);
  const animate = (el, target, dur = 1800) => {
    const start = performance.now();
    const tick  = now => {
      const p = Math.min((now - start) / dur, 1);
      el.textContent = Math.round(easeOut(p) * target);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const init = () => {
    const counters = document.querySelectorAll('[data-target]');
    if (!counters.length) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          animate(e.target, parseInt(e.target.getAttribute('data-target'), 10));
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.6 });
    counters.forEach(c => observer.observe(c));
  };
  return { init };
})();


/* ═══════════════════════════════════
   MODULE 6 – TESTIMONIALS SLIDER
═══════════════════════════════════ */
const SliderModule = (() => {
  let idx = 0, timer, dragging = false, startX = 0;
  let track, cards, dots, btnP, btnN;

  const perView = () => window.innerWidth <= 640 ? 1 : window.innerWidth <= 1024 ? 2 : 3;
  const maxIdx  = () => Math.max(0, (cards?.length || 0) - perView());

  const goTo = i => {
    idx = Math.max(0, Math.min(i, maxIdx()));
    if (!track || !cards?.length) return;
    const gap = parseInt(getComputedStyle(track).gap) || 24;
    track.style.transform = `translateX(-${idx * (cards[0].offsetWidth + gap)}px)`;
    dots?.forEach((d, j) => { d.classList.toggle('sdot--on', j === idx); d.setAttribute('aria-selected', String(j === idx)); });
  };

  const next = () => goTo(idx + 1 > maxIdx() ? 0 : idx + 1);
  const prev = () => goTo(idx - 1 < 0 ? maxIdx() : idx - 1);
  const startAuto = () => { timer = setInterval(next, 5500); };
  const stopAuto  = () => clearInterval(timer);

  const onDown = e => { dragging = true; startX = e.touches?.[0].clientX ?? e.clientX; stopAuto(); };
  const onUp   = e => {
    if (!dragging) return;
    dragging = false;
    const diff = startX - (e.changedTouches?.[0].clientX ?? e.clientX);
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
    startAuto();
  };

  const init = () => {
    track = document.getElementById('testimonialsTrack');
    cards = track?.querySelectorAll('.tcard');
    dots  = document.querySelectorAll('.sdot');
    btnP  = document.getElementById('sliderPrev');
    btnN  = document.getElementById('sliderNext');
    if (!track || !cards?.length) return;

    btnP?.addEventListener('click', () => { prev(); stopAuto(); startAuto(); });
    btnN?.addEventListener('click', () => { next(); stopAuto(); startAuto(); });
    dots?.forEach((d, i) => d.addEventListener('click', () => { goTo(i); stopAuto(); startAuto(); }));
    track.addEventListener('touchstart', onDown, { passive: true });
    track.addEventListener('touchend',   onUp);
    track.addEventListener('mousedown',  onDown);
    document.addEventListener('mouseup', onUp);
    track.addEventListener('mouseenter', stopAuto);
    track.addEventListener('mouseleave', startAuto);
    window.addEventListener('resize',    () => goTo(0), { passive: true });
    goTo(0);
    startAuto();
  };
  return { init };
})();


/* ═══════════════════════════════════
   MODULE 7 – GALLERY TABS + BEFORE/AFTER
═══════════════════════════════════ */
const GalleryModule = (() => {

  const initTabs = () => {
    const tabs  = document.querySelectorAll('.gallery__tab');
    const items = document.querySelectorAll('.gallery-item');
    if (!tabs.length) return;
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const filter = tab.getAttribute('data-tab');
        tabs.forEach(t => { t.classList.remove('gallery__tab--active'); t.setAttribute('aria-selected', 'false'); });
        tab.classList.add('gallery__tab--active'); tab.setAttribute('aria-selected', 'true');
        items.forEach(item => {
          const match = filter === 'all' || item.getAttribute('data-category') === filter;
          if (match) {
            item.classList.remove('hidden');
            item.style.opacity = '0'; item.style.transform = 'translateY(12px)';
            requestAnimationFrame(() => {
              item.style.transition = 'opacity .4s ease, transform .4s ease';
              item.style.opacity = '1'; item.style.transform = 'translateY(0)';
            });
          } else { item.classList.add('hidden'); }
        });
      });
    });
  };

  const initBA = () => {
    document.querySelectorAll('.gba').forEach(container => {
      const sl = container.querySelector('.gba__slider');
      const bp = container.querySelector('.gba__pane--before');
      if (!sl || !bp) return;
      let active = false;

      const update = clientX => {
        const rect = container.getBoundingClientRect();
        const pct  = Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100));
        sl.style.left     = `${pct}%`;
        bp.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
        sl.setAttribute('aria-valuenow', Math.round(pct));
      };

      sl.addEventListener('mousedown',  e => { active = true; e.preventDefault(); });
      document.addEventListener('mousemove',  e => { if (active) update(e.clientX); });
      document.addEventListener('mouseup',    () => { active = false; });
      sl.addEventListener('touchstart', e => { active = true; e.preventDefault(); }, { passive: false });
      document.addEventListener('touchmove',  e => { if (active) update(e.touches[0].clientX); }, { passive: true });
      document.addEventListener('touchend',   () => { active = false; });
      sl.addEventListener('keydown', e => {
        const rect  = container.getBoundingClientRect();
        const currX = rect.left + (parseFloat(sl.style.left || '50') / 100) * rect.width;
        if (e.key === 'ArrowLeft')  update(currX - 16);
        if (e.key === 'ArrowRight') update(currX + 16);
      });

      // Intro auto au premier hover
      let played = false;
      container.addEventListener('mouseenter', () => {
        if (played || sl.style.left !== '') return;
        played = true;
        let pct = 50;
        const iv = setInterval(() => {
          pct -= 2;
          sl.style.left     = `${pct}%`;
          bp.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
          if (pct <= 38) clearInterval(iv);
        }, 20);
      });
    });
  };

  const init = () => { initTabs(); initBA(); };
  return { init };
})();


/* ═══════════════════════════════════
   MODULE 8 – FORM VALIDATION
═══════════════════════════════════ */
const FormModule = (() => {
  const rules = {
    name:    { required: true,  minLength: 2,  msg: { fr: 'Nom complet requis (min. 2 caractères).', en: 'Full name required (min. 2 characters).' } },
    phone:   { required: true,  pattern: /^[0-9\s\+\-\.]{8,15}$/, msg: { fr: 'Numéro invalide (ex: 07 18 83 75 81).', en: 'Invalid number (e.g. 07 18 83 75 81).' } },
    email:   { required: false, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, msg: { fr: 'Adresse email invalide.', en: 'Invalid email address.' } },
    service: { required: true,  msg: { fr: 'Veuillez sélectionner un service.', en: 'Please select a service.' } },
  };

  const setError = (id, msgObj) => {
    document.getElementById(id)?.classList.add('error');
    const el = document.getElementById(`${id}Error`);
    if (el) el.textContent = msgObj[Store.lang] || msgObj.fr;
  };
  const clearError = id => {
    document.getElementById(id)?.classList.remove('error');
    const el = document.getElementById(`${id}Error`);
    if (el) el.textContent = '';
  };
  const validate = (id, value) => {
    const r = rules[id];
    if (!r) return true;
    if (r.required && !value.trim())                      { setError(id, r.msg); return false; }
    if (!r.required && !value.trim())                     { clearError(id); return true; }
    if (r.minLength && value.trim().length < r.minLength) { setError(id, r.msg); return false; }
    if (r.pattern  && !r.pattern.test(value.trim()))      { setError(id, r.msg); return false; }
    clearError(id); return true;
  };

  const simulate = (btn, success) => {
    btn.classList.add('loading'); btn.disabled = true;
    setTimeout(() => {
      btn.classList.remove('loading'); btn.disabled = false;

      // Retirer hidden et relancer l'animation vert à chaque fois
      success.setAttribute('hidden', '');       // reset d'abord
      success.classList.remove('form-success--green');
      // Forcer un reflow pour relancer l'animation
      void success.offsetWidth;
      success.classList.add('form-success--green');
      success.removeAttribute('hidden');
      success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      // Masquer après 7 secondes et remettre le formulaire à zéro
      setTimeout(() => {
        document.getElementById('contactForm')?.reset();
        success.setAttribute('hidden', '');
      }, 7000);
    }, 1400);
  };

  const init = () => {
    const form    = document.getElementById('contactForm');
    const btn     = document.getElementById('submitBtn');
    const success = document.getElementById('formSuccess');
    if (!form) return;
    Object.keys(rules).forEach(id => {
      const el = document.getElementById(id);
      el?.addEventListener('blur',  () => validate(id, el.value));
      el?.addEventListener('input', () => { if (el.classList.contains('error')) validate(id, el.value); });
    });
    form.addEventListener('submit', e => {
      e.preventDefault();
      const ok = ['name','phone','email','service'].map(id => {
        const el = document.getElementById(id);
        return el ? validate(id, el.value) : true;
      }).every(Boolean);
      if (!ok) { form.querySelector('.error')?.focus(); return; }
      simulate(btn, success);
    });
  };
  return { init };
})();


/* ═══════════════════════════════════
   MODULE 9 – WHATSAPP CHAT AUTOMATISÉ
═══════════════════════════════════ */
const WAChatModule = (() => {
  const init = () => {
    const chat       = document.getElementById('waChat');
    const fab        = document.getElementById('waFab');
    const closeBtn   = document.getElementById('waBubbleClose');
    const badge      = document.getElementById('waBadge');
    if (!chat || !fab) return;

    let opened = false;

    const openChat = () => {
      chat.classList.add('open');
      fab.setAttribute('aria-expanded', 'true');
      if (badge) badge.style.display = 'none';
      opened = true;
    };
    const closeChat = () => {
      chat.classList.remove('open');
      fab.setAttribute('aria-expanded', 'false');
    };

    fab.addEventListener('click', () => {
      chat.classList.contains('open') ? closeChat() : openChat();
    });
    closeBtn?.addEventListener('click', closeChat);

    // Ouvrir automatiquement après 8 secondes si pas encore interagi
    setTimeout(() => {
      if (!opened && !sessionStorage.getItem('cp_chat_dismissed')) {
        openChat();
      }
    }, 8000);

    // Fermer le chat quand on clique ailleurs
    document.addEventListener('click', e => {
      if (!chat.contains(e.target) && !fab.contains(e.target)) {
        if (chat.classList.contains('open')) {
          closeChat();
          sessionStorage.setItem('cp_chat_dismissed', '1');
        }
      }
    });

    // Échap ferme le chat
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && chat.classList.contains('open')) {
        closeChat();
      }
    });
  };
  return { init };
})();


/* ═══════════════════════════════════
   MODULE 10 – BACK TO TOP
═══════════════════════════════════ */
const BackToTopModule = (() => {
  const init = () => {
    const btn = document.getElementById('backToTop');
    if (!btn) return;
    window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 500), { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  };
  return { init };
})();


/* ═══════════════════════════════════
   MODULE 11 – FAQ ACCORDION
═══════════════════════════════════ */
const FAQModule = (() => {
  const init = () => {
    const items = document.querySelectorAll('.faq-item');
    items.forEach(item => {
      item.addEventListener('toggle', () => {
        if (item.open) {
          // Fermer les autres
          items.forEach(other => { if (other !== item && other.open) other.removeAttribute('open'); });
        }
      });
    });
  };
  return { init };
})();


/* ═══════════════════════════════════
   MODULE 12 – MISC (année, lazy, parallax, perf)
═══════════════════════════════════ */
const MiscModule = (() => {

  /* Parallax léger hero */
  const initParallax = () => {
    const chevrons = document.querySelectorAll('.hero__chevron');
    const heroBg   = document.querySelector('.hero__img-bg img');
    if (!chevrons.length || window.matchMedia('(max-width:768px)').matches) return;
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        chevrons.forEach((c, i) => { c.style.transform = `translateY(${y * (.05 + i * .03)}px)`; });
        if (heroBg) heroBg.style.transform = `translateY(${y * .14}px)`;
        ticking = false;
      });
      ticking = true;
    }, { passive: true });
  };

  /* Mini analytics stub – à brancher sur Google Analytics / Matomo */
  const initAnalytics = () => {
    // Tracking clic WhatsApp
    document.querySelectorAll('a[href*="wa.me"]').forEach(a => {
      a.addEventListener('click', () => {
        if (typeof gtag !== 'undefined') {
          gtag('event', 'click', { event_category: 'WhatsApp', event_label: 'Contact CTA' });
        }
      });
    });
    // Tracking soumission formulaire
    document.getElementById('contactForm')?.addEventListener('submit', () => {
      if (typeof gtag !== 'undefined') {
        gtag('event', 'generate_lead', { event_category: 'Formulaire', event_label: 'Devis CLEANER PRO' });
      }
    });
    // Tracking clic téléphone
    document.querySelectorAll('a[href^="tel:"]').forEach(a => {
      a.addEventListener('click', () => {
        if (typeof gtag !== 'undefined') {
          gtag('event', 'click', { event_category: 'Téléphone', event_label: a.href });
        }
      });
    });
  };

  /* Service Worker stub pour PWA / cache offline */
  const initSW = () => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        // Décommenter après avoir créé sw.js :
        // navigator.serviceWorker.register('/sw.js').catch(() => {});
      });
    }
  };

  const init = () => {
    const yearEl = document.getElementById('currentYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Lazy load images non marquées
    document.querySelectorAll('img:not([loading])').forEach(img => img.setAttribute('loading', 'lazy'));

    initParallax();
    initAnalytics();
    initSW();

    console.log(
      '%c✓ CLEANER PRO v4 | SEO | Multilingue FR/EN | Chat WA | FAQ | Maps',
      'color:#D4A017;font-weight:bold;font-size:12px;background:#0D1B4B;padding:5px 10px;border-radius:6px;'
    );
  };
  return { init };
})();


/* ═══════════════════════════════════
   INIT – Bootstrap résilient
   Chaque module est isolé : une erreur dans
   l'un ne bloque jamais l'initialisation des autres.
═══════════════════════════════════ */
const App = {
  init() {
    const modules = [
      ['LangModule',         LangModule],
      ['NavbarModule',       NavbarModule],
      ['SmoothScrollModule', SmoothScrollModule],
      ['RevealModule',       RevealModule],
      ['CounterModule',      CounterModule],
      ['SliderModule',       SliderModule],
      ['GalleryModule',      GalleryModule],
      ['FormModule',         FormModule],
      ['WAChatModule',       WAChatModule],
      ['BackToTopModule',    BackToTopModule],
      ['FAQModule',          FAQModule],
      ['MiscModule',         MiscModule],
    ];

    modules.forEach(([name, mod]) => {
      try {
        mod.init();
      } catch (err) {
        // On isole l'erreur : les modules suivants s'initialisent normalement
        console.error(`[CLEANER PRO] Erreur dans ${name}:`, err);
      }
    });
  }
};

document.readyState === 'loading'
  ? document.addEventListener('DOMContentLoaded', () => App.init())
  : App.init();
