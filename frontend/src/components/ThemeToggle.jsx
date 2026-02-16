import { useEffect, useState } from "react";

function ThemeToggle()
{
  const [theme,setTheme]= useState(localStorage.getItem("theme")||"dark");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme= () => {
    setTheme(theme==="dark"?"light":"dark");
  };
  return (
    <button onClick={toggleTheme}
    className='btn btn-ghost btn-circle'>
      {/* swap iocns */}
      {theme ==="light"? "⋆⁺₊⋆ ☾⋆⁺₊⋆" : "⋆˖⁺‧₊☀︎₊‧⁺˖⋆"}
    </button>
    // so on clickig the circle button on display on navbar,
    // toggleTheme is called , which changes the theme?
  );
}
export default ThemeToggle;