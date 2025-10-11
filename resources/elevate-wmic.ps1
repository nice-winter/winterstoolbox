Start-Process wmic -ArgumentList "process where `"name='LeagueClientUx.exe'`" get CommandLine" -Verb RunAs
