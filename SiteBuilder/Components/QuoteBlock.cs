using Piranha.Extend;
using Piranha.Extend.Fields;

namespace SiteBuilder.Components
{
    [BlockType(Name = "My Quote", Category = "Content",
    Icon = "fas fa-quote-right", Component = "quote-block")]
    public class MyQuoteBlock : Block
    {
        /// <summary>
        /// Gets/sets the text body.
        /// </summary>
        public TextField Body { get; set; }
        public TextField Title { get; set; }
    }
}