export type Journey = {
  title: string
  active?: boolean
  location: [
    {
      name: string
      url: string
    },
  ]
  goal?: [
    {
      name: string
      url?: string
    },
  ]
  news?: [
    {
      name: string
      url?: string
    },
  ]
  work?: {
    title: string
    location: string
    url: string
  }
}

export const config = {
  home_name: 'Manuele Nolli',
  home_job: 'Software Engineer',
  aboutme_description: 'Driven by a deep curiosity for the digital world, I\'ve nurtured my passion for technology from an early age.\n With a foundation in Systems Technology and ongoing studies in Computer Engineering at SUPSI, I’m always eager to learn and apply new technologies in meaningful ways.',
  journey_journeys: [
    {
      title: 'Apprenticeships',
      location: [
        {
          name: 'SPAI (CPT) Locarno',
          url: 'https://www.spailocarno.ch/',
        },
      ],
      goal: [
        {
          name: 'Informatico AFC',
          url: 'https://www.informatici.ch/web/formazione/',
        },
      ],
      work: {
        title: 'Apprenticeship',
        location: 'Clinica Hildebrand',
        url: 'https://www.clinica-hildebrand.ch/',
      },
    },
    {
      title: 'Technical professional maturity',
      location: [
        {
          name: 'CPT Locarno',
          url: 'https://www.cptlocarno.ch/',
        },
      ],
    },
    {
      title: 'Bachelor degree in Computer Science',
      location: [
        {
          name: 'SUPSI',
          url: 'https://www.supsi.ch/',
        },
      ],
      goal: [
        {
          name: 'Bachelor of Science in Computer Science',
          url: 'https://www.supsi.ch/en/bachelor-computer-science-engineering',
        },
      ],
      news: [
        {
          name: 'SUPSI Interview',
          url: 'https://www.linkedin.com/posts/supsi_la-tua-formazione-lesperienza-di-manuele-activity-7010639377055850497-6sAh?utm_source=share&utm_medium=member_desktop',
        },
      ],
    },
    {
      title: 'Master degree in Computer Science',
      active: true,
      location: [
        {
          name: 'SUPSI',
          url: 'https://www.supsi.ch/',
        },
        {
          name: 'USI',
          url: 'https://www.usi.ch/',
        },
        {
          name: 'ZHAW',
          url: 'https://www.zhaw.ch/',
        },
      ],
      goal: [
        // {
        //   name: 'Experience in state of the art technologies',
        //   url: '',
        // },
        {
          name: 'Master of Science in Engineering - Computer Science',
          url: 'https://www.msengineering.ch/profiles/engineering-and-it/computer-science',
        },
      ],
      work: {
        title: 'Assistant',
        location: 'ISIN',
        url: 'https://www.supsi.ch/en/isin',
      },
      news: [
        {
          name: 'Salesforce workshop',
          url: 'https://www.linkedin.com/posts/andreacannata_supsi-salesforce-technology-activity-7165702577341296641-WZjC?utm_source=share&utm_medium=member_desktop',
        },
        {
          name: 'Interview about my journey',
          url: 'https://www.supsi.ch/it/il-mio-percorso-verso-la-tecnologia-del-futuro',
        },
      ],
    },
  ] as Journey[],
  projects_repositories_length: 4,
  contact_phrase: 'Would you like to ask me something or just say hello? Feel free to send me a message, I will be happy to answer you.',
  contact_mail: 'manuele.nolli.01@gmail.com',
  contact_mail2: 'me@manuelenolli.ch',
  sender_mail: 'info@manuelenolli.ch',
  contact_linkedin: 'https://www.linkedin.com/in/manuele-nolli',
  contact_github: 'https://github.com/ManueleNolli',
  contact_instagram: 'https://www.instagram.com/manunolli',
  attributions: [
    {
      title: 'South-arrow icons created by Mohamed Mbarki - Flaticon',
      url: 'https://www.flaticon.com/free-icons/south-arrow',
    }, {
      title: 'Food and restaurant icons created by agus raharjo - Flaticon',
      url: 'https://www.flaticon.com/free-icons/food-and-restaurant',
    }, {
      title: 'Collaboration icons created by Freepik - Flaticon',
      url: 'https://www.flaticon.com/free-icons/collaboration',
    }, {
      title: 'Error icons created by Freepik - Flaticon',
      url: 'https://www.flaticon.com/free-icons/error',
    },
  ],
}
