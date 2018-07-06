import React, { Component } from 'react';

// note: withClassFunc is not a react component, just a js function which returns a react component (functional or class based) and hence, the naming convention will be camel case

// const withClassFunc = (WrappedElements, className) => {
//     const WrapperWithClasses = (props) => (
//         <div className={className}>
//             <WrappedElements {...props} />
//         </div>
//     );

//     return WrapperWithClasses;
// }
// note: we are passing on the respective props from 'App.js' and 'Person.js' by using spread operator; thus resulting in reusable HOC

// class way:
const withClassFunc = (WrappedElements, className) => {
    // note: passing class or function anonimously will result in 'Unknown' as component name in React dev tools
    const WrapperWithClasses = class extends Component {
        render() {
            return (
                <div className={className}>
                    <WrappedElements ref={this.props.forwardedRef} {...this.props} />
                </div>
            );
        }
    }

    // ref forwarding along with props, since this HOC wraps 'Person' which has 'PersonList' as parent | lecture 102**
    return React.forwardRef((props, ref) => {
        return <WrapperWithClasses {...props} forwardedRef={ref}/>
    });

}

export default withClassFunc;