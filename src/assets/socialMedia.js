export const socialMedia = [
  {
    id: 1,
    name: 'Facebook',
    icon: 'fab fa-facebook',
    color: '#3b5998',
  },
  {
    id: 2,
    name: 'Twitter',
    icon: 'fab fa-twitter',
    color: '#00acee',
  },
  {
    id: 3,
    name: 'Linkedin',
    icon: 'fab fa-linkedin',
    color: '#0072b1',
  },
  {
    id: 4,
    name: 'Orcid',
    icon: 'fab fa-orcid',
    color: '#bdeb34',
  },
  {
    id: 5,
    name: 'SoundClound',
    icon: 'fab fa-soundcloud',
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