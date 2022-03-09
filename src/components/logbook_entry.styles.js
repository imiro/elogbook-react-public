
export const colourStyles = {
    control: styles => ({ ...styles, border: '1px solid #C5C9D7', borderTopLeftRadius: '6px',
    borderBottomLeftRadius: '6px',  boxShadow: 'none', '&:hover': {
      border: '1px solid #096D6F',
    }}),
    // option: styles => ({ ...styles,'&:visited': {backgroundColor:'#096D6F'}}),
    placeholder: base => ({
      ...base,
      color: '#C5C9D7',
    }),
  }

export const colourStylesMulti = {
      control: styles => ({ ...styles, maxWidth:'326px', marginBottom:'16px', border: '1px solid #C5C9D7',  boxShadow: 'none', '&:hover': {
        border: '1px solid #096D6F',
    }}),
      placeholder: base => ({
        ...base,
        color: '#C5C9D7',
      }),
      multiValue: (styles) => ({
          ...styles,
          // display:'flex',
          // flexDirection:'row',
          // flexWrap:'wrap',
          alignItems:'center',
          // justifyContent:'space-around',
          backgroundColor: '#008C8F',
          borderRadius: '16px',
          padding:'3px 6px 3px 6px',
          cursor: 'pointer',
          whiteSpace: 'pre-wrap'
      }),
      multiValueLabel: (styles) => ({
        ...styles,
        color: '#FFFDFF',
        whiteSpace: 'pre-wrap'
      }),
      multiValueRemove: (styles) => ({
        ...styles,
        // position:'absolute',
        float:'right',
        right:'16px',
        // marginTop:'3px',
        backgroundColor: '#FFFDFF',
        color: '#008C8F',
        borderRadius: '50%',
        width:'24px',
        height: '24px',
        cursor:'pointer',
      }),
    };
