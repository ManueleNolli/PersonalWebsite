export type Journey = {
  title: string
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
  work?: {
    title: string
    location: string
    url: string
  }
}

export const config = {
  home_name: 'Manuele Nolli',
  home_job: 'Software Engineer',
  aboutme_description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vel porttitor mauris. Donec mollis massa a libero mattis consequat.\n' +
    'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce et massa quis nibh venenatis porta.\n' +
    'Curabitur vulputate urna ac ex maximus, vel placerat tortor rhoncus. Phasellus tincidunt nulla nec fringilla lacinia. Aliquam scelerisque\n' +
    'molestie arcu nec pellentesque.\n',
  journey_journeys: [
    {
      title: 'Apprenticeships',
      location: [
        {
          name: 'Clinica Hildebrand',
          url: 'https://www.clinica-hildebrand.ch/',
        },
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
          name: 'SUPSI - University of Applied Sciences and Arts of Southern Switzerland',
          url: 'https://www.supsi.ch/',
        },
      ],
      goal: [
        {
          name: 'Bachelor of Science in Computer Science',
          url: 'https://www.supsi.ch/en/bachelor-computer-science-engineering',
        },
      ],
    },
    {
      title: 'Master degree in Computer Science',
      location: [
        {
          name: 'SUPSI - University of Applied Sciences and Arts of Southern Switzerland',
          url: 'https://www.supsi.ch/',
        },
        {
          name: 'USI - Università della Svizzera italiana',
          url: 'https://www.usi.ch/',
        },
        {
          name: 'ZHAW - Zurich University of Applied Sciences',
          url: 'https://www.zhaw.ch/',
        },
      ],
      goal: [
        {
          name: 'Experience in the field of computer science and engineering, with a focus on software engineering, distributed systems, and cloud computing',
          url: '',
        },
        {
          name: 'Master of Science in Engineering - Computer Science',
          url: 'https://www.msengineering.ch/profiles/engineering-and-it/computer-science',
        },
      ],
      work: {
        title: "Assistant with Bachelor's degree in Master's education",
        location: 'ISIN - Institute of Information Systems and Networking',
        url: 'https://www.supsi.ch/en/isin',
      },
    },
  ] as Journey[],
  projects_repositories_length: 4,
}
