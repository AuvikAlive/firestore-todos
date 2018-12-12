export const setFeedback = component => ({ error = "", loading = false }) => {
  component.setState({
    error,
    loading,
  })
}
