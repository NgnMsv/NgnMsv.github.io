import { todo, type Profile } from './types.ts'

export const profile: Profile = {
  name: 'Negin Mousavi',
  role: 'Frontend Developer (Working Student)',
  pitch:
    'I build React and TypeScript interfaces, with more than two years of production experience at a cryptocurrency exchange and a background in UX research.',
  location: 'Kaiserslautern, Germany',
  workModes: ['on-site', 'hybrid', 'remote'],
  about: [
    'I’m a frontend developer and an M.Sc. Computer Science student at RPTU Kaiserslautern-Landau.',
    'At Nobitex I spent more than two years building React interfaces for real-time market, transaction, and portfolio data. Later, as a UX research intern at Aban Tether, I redesigned an onboarding flow based on user interviews and A/B tests, so I’m used to both building an interface and checking whether it works for the people using it.',
    'I’m looking for a working-student role in frontend development.',
  ],
  email: 'negin.mousavi@edu.rptu.de',
  linkedin: 'https://www.linkedin.com/in/negin-mousavii/',
  github: 'https://github.com/ngnmsv',
  // TODO(content): add the CV PDF to public/ and put its path here, e.g. '/negin-mousavi-cv.pdf'
  cv: todo('CV PDF — add the file to public/ and set its path in src/content/profile.ts'),
  photo: {
    src: '/images/negin-200.jpg',
    src2x: '/images/negin-400.jpg',
    width: 200,
    height: 200,
    alt: 'Portrait of Negin Mousavi, smiling, outdoors on a sunny day.',
  },
  languages: [
    { name: 'English', level: 'C1' },
    { name: 'German', level: 'B1' },
    { name: 'Persian', level: 'Native' },
  ],
}
