import { MaterialIcons, FontAwesome ,Fontisto,FontAwesome5} from '@expo/vector-icons';

export const options = [
  {
    id: 1,
    name: 'Tablet',
    icon: <Fontisto name="tablets" size={24} color="#4361ee" />,
  },
  {
    id: 2,
    name: 'Syrup',
    icon: <MaterialIcons name="local-drink" size={24} color="#4361ee" />,
  },
  {
    id: 3,
    name: 'Capsule',
    icon: <FontAwesome5 name="capsules" size={24} color="#4361ee" />,
  },
  {
    id: 4,
    name: 'Injection',
    icon: <Fontisto name="injection-syringe" size={24} color="#4361ee" />,
  },
  {
    id: 5,
    name: 'Ointment',
    icon: <FontAwesome name="magic" size={24} color="#4361ee" />,
  },
  {
    id: 6,
    name: 'Drops',
    icon: <MaterialIcons name="water-drop" size={24} color="#4361ee" />,
  },
  {
    id: 7,
    name: 'Others',
    icon: <FontAwesome name="dot-circle-o" size={24} color="#4361ee" />,
  },
];

export const when =[
 "morning","after Morning","Noon"
]

export const TypeList=[
  {
    id: 1,
      name:'Tablet',
      icon:'https://cdn-icons-png.flaticon.com/128/2002/2002580.png'
  },
  {
    id: 2,
      name:'Capsules',
      icon:'https://cdn-icons-png.flaticon.com/128/5419/5419454.png'
  },
  {
    id: 3,
      name:'Drops',
      icon:'https://cdn-icons-png.flaticon.com/128/12285/12285293.png'
  },
  {
    id: 4,
      name:'Syrup',
      icon:'https://cdn-icons-png.flaticon.com/128/11496/11496783.png'
  },
  {
    id: 5,
      name:'Injection',
      icon:'https://cdn-icons-png.flaticon.com/128/3217/3217557.png'
  },
  {
    id: 6,
      name:'Other',
      icon:'https://cdn-icons-png.flaticon.com/128/11496/11496770.png'
  }
]

export const WhenToTake=[
  
  'Morning',
  'Before Lunch',
  'After Lunch',
  'Afternoon',
  'Evening',
  'Before Dinner',
  'After Dinner',
  'Before Sleeping'
]