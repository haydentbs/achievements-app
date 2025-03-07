FROM denoland/deno:1.37.0

WORKDIR /app

# Copy dependency files
COPY deno.json* .
COPY import_map.json .

# Cache the dependencies
RUN deno cache --reload main.ts

# Copy the rest of the application
COPY . .

# Run the application
CMD ["deno", "task", "start"]
