using System;
using Piranha.AttributeBuilder;
using Piranha.Extend;
using Piranha.Models;

namespace SiteBuilder.Infrastructures
{
    [SiteType(Title = "Advanced Site")]
    public class AdvancedSite : SiteContent<AdvancedSite>
    {
        [Region(Title = "Footer", Display = RegionDisplayMode.Setting)]
        public Footer FooterContents { get; set; }
    }
}

