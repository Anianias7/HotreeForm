import React, {Fragment} from 'react'

const FormItem = ({
                      error,
                      name,
                      required,
                      children
                  }) => {
    return <Fragment>
        {React.Children.map(children, (child) => {
            return {
                ...child,
                props: {
                    ...child.props,
                    required,
                    name,
                    error
                }
            }
        })}
    </Fragment>
}


export default FormItem;
