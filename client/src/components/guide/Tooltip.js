import React from 'react'

const Tooltip = () => {
    const [active,setActive] = React.useState(false)
    const onActive = () => {
        setActive(!active)
    }
    return (
        <div className="tooltip__html tooltip__body">
            <main className="tooltip__main">
    <div className="example-elements">
      <p data-tooltip={active ? "Example Tooltip" : null}>
          Hover over me to see a tooltip
    </p>
    <a href="#" 
       data-tooltip={active ? "Example Tooltip" : null}
       data-tooltip-location="right">
          A typical anchor element
    </a>
    <button className="tooltip__button"
    onClick={onActive}
       data-tooltip={active ? "Example Tooltip" : null}
       data-tooltip-location="left">
          Cool button
    </button>
  </div>
  <div className="info-wrapper">
    <p>
      <span className="title-question">
        You want a simple, animated & easy-to-use tooltip?
      </span>
      <span>
        Just copy all the CSS declarations blocks starting with
        <code>[data-tooltip].</code>
      </span>
    </p>
    <p 
       data-tooltip="This is an example of a super long tooltip text that goes over multiple lines. &#xa; &#xa; Note: The tooltip size is dynamically adjusted to the content. However, a minimum and a maximum width are defined."
       data-tooltip-location="bottom">
      To use the tooltip, simply add the attribute »data-tooltip« with the desired text to an element. P.S. Hover over me to see a long tooltip.
    </p>
  </div>
</main>
        </div>
    )
}

export default Tooltip
