# PowerShell script to start and manage the application

# Function to start the application
function Start-Application {
    Write-Host "Starting the application..."
    
    # Start the application using npm start in the background
    Start-Process "npm" -ArgumentList "start" -NoNewWindow -PassThru
}

# Function to restart the application
function Restart-Application {
    Write-Host "Restarting the application..."
    
    # Stop the application
    Stop-Application
    
    # Start the application
    Start-Application
}

# Function to stop the application
function Stop-Application {
    Write-Host "Stopping the application..."
    
    # Stop the application by terminating the process
    Get-Process -Name "node" | Stop-Process -Force
}

# Main loop
while ($true) {
    # Check if the application is running
    $isRunning = Get-Process -Name "node" -ErrorAction SilentlyContinue
    
    if ($isRunning) {
        Write-Host "Application running. Press:"
        Write-Host "  'r' to restart the application,"
        Write-Host "  'p' to stop the application,"
        Write-Host "  'enter' to start the application if it's not running."
        
        $choice = Read-Host "Your choice"
        
        switch ($choice) {
            'r' { Restart-Application }
            'p' { Stop-Application }
            ''  { Write-Host "Starting the application..." }
            default { Write-Host "Invalid choice. Please try again." }
        }
    }
    else {
        # If the application is not running, start it
        Start-Application
    }
    
    # Add a delay to avoid excessive looping
    Start-Sleep -Seconds 1
}
