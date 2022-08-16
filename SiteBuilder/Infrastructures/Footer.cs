using System;
using Piranha.Extend;
using Piranha.Extend.Fields;

namespace SiteBuilder.Infrastructures
{
    public class Footer
    {
        [Field(Title = "Mostra Chi Siamo")]
        public CheckBoxField ShoWhoWeAre { get; set; }
        [Field(Title = "Chi Siamo")]
        public HtmlField WhoWeAre { get; set; }
        [Field(Title = "Mostra Social")]
        public CheckBoxField ShowSocial { get; set; }
        [Field(Title = "Facebook")]
        public TextField Facebook { get; set; }
        [Field(Title = "Twitter")]
        public TextField Twitter { get; set; }
        [Field(Title = "Instagram")]
        public TextField Instagram { get; set; }
    }
}

