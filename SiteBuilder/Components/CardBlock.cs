using System;
using System.Text.Json;
using Piranha.Extend;
using Piranha.Extend.Blocks;
using Piranha.Extend.Fields;

namespace SiteBuilder.Components
{
    [BlockType(Name = "Card", Category = "Content", Icon = "fas fa-address-card", Component = "card-block")]
    public class CardBlock : Block
    {
        public ImageField ImgBody { get; set; }
        public SelectField<ImageAspect> Aspect { get; set; } = new SelectField<ImageAspect>();
        public HtmlField Title { get; set; }
        public HtmlField Body { get; set; }
        public ColorField Color { get; set; } = new ColorField { Value = "FFFFFF" };
        public bool HasBody => !string.IsNullOrEmpty(Body.Value);
        public override string GetTitle()
        {
            if (ImgBody != null && ImgBody.Media != null)
            {
                return ImgBody.Media.Filename;
            }
            return "No image selected";
        }
    }
}

