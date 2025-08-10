FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base

# Install Microsoft TrueType fonts for PdfSharp
RUN apt-get update && apt-get install -y \
    fontconfig \
    ttf-mscorefonts-installer \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*


WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY . .
RUN dotnet restore
RUN dotnet publish -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "BusReservationNET.dll"]