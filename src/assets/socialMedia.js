export const socialMedia = [
  {
    id: 1,
    name: 'Facebook',
    icon: 'facebook',
    color: '#3b5998',
  },
  {
    id: 2,
    name: 'Twitter',
    icon: 'twitter',
    color: '#00acee',
  },
  {
    id: 3,
    name: 'Linkedin',
    icon: 'linkedin',
    color: '#0072b1',
  },
  {
    id: 4,
    name: 'Orcid',
    icon: 'orcid',
    color: '#bdeb34',
  },
  {
    id: 5,
    name: 'SoundClound',
    icon: 'soundcloud',
    color: '#ff7700',
  },
]

export const getSocialMedia = function(name) {
  for (const media of socialMedia) {
    if (media.name && media.name == name) {
      return media;
    }
  }
  return {};
}