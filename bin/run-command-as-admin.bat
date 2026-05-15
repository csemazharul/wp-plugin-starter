@echo off

:: this file is a batch file that runs a command as an administrator

:: BatchGotAdmin
:-------------------------------------
REM  --> Check for permissions
    IF "%PROCESSOR_ARCHITECTURE%" EQU "amd64" (
>nul 2>&1 "%SYSTEMROOT%WPStarterKit\WPStarterKitSysWOW64WPStarterKit\WPStarterKitcacls.exe" "%SYSTEMROOT%WPStarterKit\WPStarterKitSysWOW64WPStarterKit\WPStarterKitconfigWPStarterKit\WPStarterKitsystem"
) ELSE (
>nul 2>&1 "%SYSTEMROOT%WPStarterKit\WPStarterKitsystem32WPStarterKit\WPStarterKitcacls.exe" "%SYSTEMROOT%WPStarterKit\WPStarterKitsystem32WPStarterKit\WPStarterKitconfigWPStarterKit\WPStarterKitsystem"
)

REM --> If error flag set, we do not have admin.
if '%errorlevel%' NEQ '0' (
    echo Requesting administrative privileges...
    goto UACWPStarterKitPrompt
) else ( goto gotAdmin )

:UACWPStarterKitPrompt
    echo Set UAC = CreateObject^("Shell.Application"^) > "%temp%WPStarterKit\WPStarterKitgetadmin.vbs"
    set params = %*
    echo UAC.ShellExecute "cmd.exe", "/c %~s0 %*", "", "runas", 1 >> "%temp%WPStarterKit\WPStarterKitgetadmin.vbs"

    "%temp%WPStarterKit\WPStarterKitgetadmin.vbs"
    del "%temp%WPStarterKit\WPStarterKitgetadmin.vbs"
    exit /B

:gotAdmin
    pushd "%CD%"
    CD /D "%~dp0"
:--------------------------------------

echo Running command with concatenated params: %*
:: Call all parameters %* as a command
%*

:: To keep the command prompt window open, uncomment the next line
:: pause
