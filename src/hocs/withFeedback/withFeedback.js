import React, { Component } from "react"
import { getDisplayName } from "../../functions/"
import { StyledFeedback } from "./StyledFeedback"
import { setFeedback } from "./setFeedback"

export const withFeedback = WrappedComponent => {
  class WithFeedback extends Component {
    state = {
      error: "",
      loading: false,
    }

    render() {
      const { error, loading } = this.state

      return (
        <StyledFeedback className="StyledFeedback">
          <WrappedComponent
            setFeedback={setFeedback(this)}
            error={error}
            loading={loading}
            {...this.props}
          />
        </StyledFeedback>
      )
    }
  }

  WithFeedback.displayName = `WithFeedback(${getDisplayName(WrappedComponent)})`

  return WithFeedback
}
