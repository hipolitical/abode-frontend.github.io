const getSettings = () => ({
  // Layout sidenav color
  theme: 'default',
})

const initialState = getSettings()

export default function theme(state = initialState, action) {
  return state
}