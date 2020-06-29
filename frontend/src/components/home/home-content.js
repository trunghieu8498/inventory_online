import React, { Component } from 'react'
import { connect } from 'react-redux'

export class HomeContent extends Component {
    render() {
        return (
            <div>
                <p>Home content</p>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContent)
