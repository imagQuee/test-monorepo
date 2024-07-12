import { SxProps } from '@mui/system'
export const ButtonSuccessSx = (): SxProps => ({
  fontWeight: 600,
  borderRadius: '8px',
  background: '#000',
  color: '#fff',
  lineHeight: 1.6666,
  padding: '1rem 2.5rem',
  fontSize: '1.2rem',
  width: '10rem',
  textTransform: 'capitalize'
})
export const ButtonRejectSx = (): SxProps => ({
  fontWeight: 600,
  borderRadius: '8px',
  background: '#000',
  color: '#fff',
  lineHeight: 1.6666,
  padding: '1rem 2.5rem',
  fontSize: '1.2rem',
  width: '10rem',
  textTransform: 'capitalize'
})
export const ButtonBackSx = (): SxProps => ({
  fontSize: '1.2rem',
  color: '#fff',
  textTransform: 'capitalize',

  '& .children': {
    fontWeight: 400,
    marginLeft: '0.8rem'
  }
})
export const ButtonStatusSx = (): SxProps => ({
  fontSize: '1.2rem',
  padding: '0.3rem 0.8rem',
  borderRadius: '4px',
  color: '#fff',
  background: '#000',
  textTransform: 'capitalize'
})
