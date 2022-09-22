﻿using Microsoft.EntityFrameworkCore;
using Piranha;
using Piranha.AttributeBuilder;
using Piranha.AspNetCore.Identity.PostgreSQL;
using Piranha.Data.EF.PostgreSql;
using Piranha.Manager.Localization;
using Piranha.Manager.Editor;
using SiteBuilder;
using SiteBuilder.Components;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

var cultureInfo = new System.Globalization.CultureInfo("it-IT");
System.Globalization.CultureInfo.DefaultThreadCurrentCulture = cultureInfo;
System.Globalization.CultureInfo.DefaultThreadCurrentUICulture = cultureInfo;
builder.AddPiranha(options =>
{
    /**
     * This will enable automatic reload of .cshtml
     * without restarting the application. However since
     * this adds a slight overhead it should not be
     * enabled in production.
     */

    options.AddRazorRuntimeCompilation = true;
   
    options.UseCms();
    options.UseManager();
    App.Blocks.Register<SiteBuilder.Components.CardBlock>();
    App.Modules.Manager().Scripts.Add("~/assets/js/card-block.js");
    options.UseFileStorage(naming: Piranha.Local.FileStorageNaming.UniqueFolderNames);
    options.UseImageSharp();
    options.UseTinyMCE();
    var connectionString = builder.Configuration.GetConnectionString("piranha");
    AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
    options.UseEF<PostgreSqlDb>(db =>
    {
        db.UseNpgsql(connectionString, options =>
        {
        });
    });
    options.UseIdentityWithSeed<IdentityPostgreSQLDb>(db => db.UseNpgsql(connectionString));

    /**
     * Here you can configure the different permissions
     * that you want to use for securing content in the
     * application.
    options.UseSecurity(o =>
    {
        o.UsePermission("WebUser", "Web User");
    });
     */

    /**
     * Here you can specify the login url for the front end
     * application. This does not affect the login url of
     * the manager interface.
    options.LoginUrl = "login";
     */

});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
app.UseStaticFiles(new StaticFileOptions()
{
    OnPrepareResponse = context =>
    {
        context.Context.Response.Headers.Add("Cache-Control", "no-cache, no-store");
        context.Context.Response.Headers.Add("Expires", "-1");
    }
});
app.UsePiranha(options =>
{
    // Initialize Piranha
    App.Init(options.Api);

    App.Blocks.Register<RawHtmlBlock>();
    App.Modules.Manager().Scripts.Add("~/rawhtml-block.js");

    // Build content types
    new ContentTypeBuilder(options.Api)
        .AddAssembly(typeof(Program).Assembly)
        .Build()
        .DeleteOrphans();

    // Configure Tiny MCE
    EditorConfig.FromFile("editorconfig.json");
    options.UseManager();
    options.UseTinyMCE();
    options.UseIdentity();
});

app.Run();
